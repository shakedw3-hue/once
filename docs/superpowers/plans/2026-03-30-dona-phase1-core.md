# DONA Phase 1: Core Voice Loop — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the foundation — "Hey Dona" wake word detection, voice recording, Whisper transcription, Claude intent parsing, TTS voice response, and Electron menubar UI.

**Architecture:** Electron menubar app (TypeScript) communicates with a Python background process (Porcupine wake word) via JSON-over-stdin/stdout IPC. Voice goes to OpenAI Whisper, text goes to Claude for intent parsing, response goes to OpenAI TTS for voice playback. Floating frameless window shows status and response text.

**Tech Stack:** Electron 40+, TypeScript, Python 3.11+, Porcupine (pvporcupine), OpenAI API (Whisper + TTS), Anthropic Claude API, menubar npm package

**Spec:** `docs/superpowers/specs/2026-03-30-varda-voice-assistant-design.md`

**Phases overview:**
- **Phase 1 (this plan):** Core voice loop — wake word → record → transcribe → Claude → TTS → UI
- **Phase 2:** Actions — Gmail, Calendar, Tasks, macOS, WhatsApp
- **Phase 3:** Brain — learning, context, prediction
- **Phase 4:** Platforms — ALAALA, ROSAYO, ONCE, LEVER
- **Phase 5:** Proactive — morning brief, protocol break

---

## File Structure

```
dona/
├── package.json                    # Electron app + dependencies
├── tsconfig.json                   # TypeScript config
├── .env                            # API keys (gitignored)
├── .env.example                    # Template for API keys
├── .gitignore
├── electron/
│   ├── main.ts                     # Electron entry — tray, window, Python spawn
│   ├── tray.ts                     # Tray icon + state management
│   ├── window.ts                   # Floating response window
│   ├── ipc-bridge.ts              # Spawn Python, JSON stdin/stdout communication
│   └── preload.ts                  # contextBridge for renderer
├── renderer/
│   ├── index.html                  # Response window HTML
│   ├── styles.css                  # Floating window styles (dark, minimal)
│   └── renderer.ts                 # UI state updates from main process
├── python/
│   ├── requirements.txt            # pvporcupine, pyaudio
│   ├── main.py                     # Entry — wake word listener loop
│   ├── listener.py                 # Porcupine wake word detection
│   └── recorder.py                 # Record audio after wake word detected
├── src/
│   ├── voice/
│   │   ├── whisper.ts              # OpenAI Whisper API — audio → text
│   │   └── tts.ts                  # OpenAI TTS API — text → audio playback
│   ├── brain/
│   │   └── claude.ts               # Claude API — intent parsing + response
│   ├── pipeline.ts                 # Full pipeline: audio → whisper → claude → tts → ui
│   └── config.ts                   # Load env vars, validate keys
├── assets/
│   ├── tray-idle.png               # 20x20 menubar icon — sleeping (purple)
│   ├── tray-idle@2x.png            # 40x40 retina
│   ├── tray-listening.png          # Listening state
│   ├── tray-listening@2x.png
│   ├── tray-processing.png         # Processing state
│   ├── tray-processing@2x.png
│   ├── tray-error.png              # Error state
│   └── tray-error@2x.png
├── hey-dona.ppn                    # Porcupine custom wake word model
└── scripts/
    └── setup.sh                    # One-time: Python venv, pip install, key check
```

---

## Task 1: Project Scaffolding

**Files:**
- Create: `dona/package.json`
- Create: `dona/tsconfig.json`
- Create: `dona/.gitignore`
- Create: `dona/.env.example`
- Create: `dona/scripts/setup.sh`

- [ ] **Step 1: Create project directory and init**

```bash
mkdir -p ~/Desktop/dona
cd ~/Desktop/dona
npm init -y
```

- [ ] **Step 2: Install Electron and TypeScript dependencies**

```bash
npm install electron menubar
npm install -D typescript @types/node electron-builder ts-node
```

- [ ] **Step 3: Create tsconfig.json**

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "commonjs",
    "lib": ["ES2022"],
    "outDir": "./dist",
    "rootDir": ".",
    "strict": true,
    "esModuleInterop": true,
    "resolveJsonModule": true,
    "declaration": true,
    "sourceMap": true,
    "skipLibCheck": true
  },
  "include": ["electron/**/*", "src/**/*", "renderer/**/*"],
  "exclude": ["node_modules", "dist", "python"]
}
```

- [ ] **Step 4: Create .gitignore**

```
node_modules/
dist/
.env
python/__pycache__/
python/venv/
*.pyc
.DS_Store
```

- [ ] **Step 5: Create .env.example**

```bash
# OpenAI — Whisper (transcription) + TTS (voice)
OPENAI_API_KEY=sk-...

# Anthropic — Claude (brain)
ANTHROPIC_API_KEY=sk-ant-...

# Picovoice — Porcupine wake word
PICOVOICE_ACCESS_KEY=...
```

- [ ] **Step 6: Create setup.sh**

```bash
#!/bin/bash
set -e

echo "=== DONA Setup ==="

# Python venv
if [ ! -d "python/venv" ]; then
  echo "Creating Python virtual environment..."
  python3 -m venv python/venv
fi

echo "Installing Python dependencies..."
source python/venv/bin/activate
pip install -r python/requirements.txt

# Check .env
if [ ! -f ".env" ]; then
  echo ""
  echo "ERROR: .env file missing. Copy .env.example to .env and fill in your API keys."
  echo "  cp .env.example .env"
  exit 1
fi

echo ""
echo "=== Setup complete. Run: npm start ==="
```

```bash
chmod +x scripts/setup.sh
```

- [ ] **Step 7: Create python/requirements.txt**

```
pvporcupine==3.0.*
pyaudio==0.2.*
```

- [ ] **Step 8: Update package.json scripts**

Edit `package.json` — set main entry and scripts:

```json
{
  "name": "dona",
  "version": "1.0.0",
  "description": "DONA — Your Ultimate Voice Assistant",
  "main": "dist/electron/main.js",
  "scripts": {
    "build": "tsc",
    "start": "npm run build && electron .",
    "dev": "tsc && electron .",
    "setup": "./scripts/setup.sh"
  }
}
```

- [ ] **Step 9: Commit**

```bash
git init
git add -A
git commit -m "chore: scaffold Dona project — Electron + Python + TypeScript"
```

---

## Task 2: Python Wake Word Listener

**Files:**
- Create: `dona/python/listener.py`
- Create: `dona/python/main.py`

**Prerequisite:** Create a Picovoice Console account at https://console.picovoice.ai/, train custom wake word "Hey Dona", download the `.ppn` file, and place it at `dona/hey-dona.ppn`. Get the AccessKey from Console.

- [ ] **Step 1: Create listener.py — Porcupine wake word detection**

```python
import pvporcupine
import struct
import os

class WakeWordListener:
    def __init__(self, access_key: str, keyword_path: str):
        self.porcupine = pvporcupine.create(
            access_key=access_key,
            keyword_paths=[keyword_path]
        )
        self.frame_length = self.porcupine.frame_length
        self.sample_rate = self.porcupine.sample_rate

    def process_frame(self, audio_frame: bytes) -> bool:
        """Process a single audio frame. Returns True if wake word detected."""
        pcm = struct.unpack_from("h" * self.frame_length, audio_frame)
        keyword_index = self.porcupine.process(pcm)
        return keyword_index >= 0

    def cleanup(self):
        if self.porcupine:
            self.porcupine.delete()
```

- [ ] **Step 2: Create main.py — main loop that listens and sends events to Electron**

```python
import json
import sys
import os
import pyaudio
import struct

from listener import WakeWordListener

def send_event(event_type: str, data: dict = None):
    """Send JSON event to Electron via stdout."""
    payload = {"event": event_type}
    if data:
        payload["data"] = data
    print(json.dumps(payload), flush=True)

def read_command() -> dict | None:
    """Non-blocking read from stdin (Electron commands)."""
    import select
    if select.select([sys.stdin], [], [], 0)[0]:
        line = sys.stdin.readline().strip()
        if line:
            return json.loads(line)
    return None

def main():
    access_key = os.environ.get("PICOVOICE_ACCESS_KEY", "")
    keyword_path = os.path.join(os.path.dirname(__file__), "..", "hey-dona.ppn")

    if not access_key:
        send_event("error", {"message": "PICOVOICE_ACCESS_KEY not set"})
        sys.exit(1)

    if not os.path.exists(keyword_path):
        send_event("error", {"message": f"Wake word file not found: {keyword_path}"})
        sys.exit(1)

    listener = WakeWordListener(access_key, keyword_path)

    pa = pyaudio.PyAudio()
    audio_stream = pa.open(
        rate=listener.sample_rate,
        channels=1,
        format=pyaudio.paInt16,
        input=True,
        frames_per_buffer=listener.frame_length
    )

    send_event("ready")

    try:
        while True:
            audio_frame = audio_stream.read(listener.frame_length, exception_on_overflow=False)

            if listener.process_frame(audio_frame):
                send_event("wake_detected")

                # Record audio until silence or max duration
                send_event("recording_start")
                recorded_frames = record_until_silence(audio_stream, listener)
                send_event("recording_end", {"frames": len(recorded_frames)})

                # Save to temp WAV and send path
                wav_path = save_wav(recorded_frames, listener.sample_rate)
                send_event("audio_ready", {"path": wav_path})

    except KeyboardInterrupt:
        pass
    finally:
        audio_stream.close()
        pa.terminate()
        listener.cleanup()

def record_until_silence(stream, listener, max_seconds=15, silence_threshold=500, silence_duration=1.5):
    """Record audio until silence detected or max duration reached."""
    frames = []
    silent_frames = 0
    frames_per_second = listener.sample_rate / listener.frame_length
    max_frames = int(max_seconds * frames_per_second)
    silence_frames_needed = int(silence_duration * frames_per_second)

    for _ in range(max_frames):
        audio_frame = stream.read(listener.frame_length, exception_on_overflow=False)
        frames.append(audio_frame)

        # Check volume for silence detection
        pcm = struct.unpack_from("h" * listener.frame_length, audio_frame)
        rms = (sum(x * x for x in pcm) / len(pcm)) ** 0.5

        if rms < silence_threshold:
            silent_frames += 1
            if silent_frames >= silence_frames_needed:
                break
        else:
            silent_frames = 0

    return frames

def save_wav(frames: list, sample_rate: int) -> str:
    """Save recorded frames to a temporary WAV file."""
    import wave
    import tempfile

    wav_path = os.path.join(tempfile.gettempdir(), "dona_recording.wav")
    with wave.open(wav_path, "wb") as wf:
        wf.setnchannels(1)
        wf.setsampwidth(2)  # 16-bit
        wf.setframerate(sample_rate)
        wf.writeframes(b"".join(frames))
    return wav_path

if __name__ == "__main__":
    main()
```

- [ ] **Step 3: Test Python listener locally**

```bash
cd dona
source python/venv/bin/activate
PICOVOICE_ACCESS_KEY=your_key_here python python/main.py
```

Expected: See `{"event": "ready"}` printed. Say "Hey Dona" — see `{"event": "wake_detected"}`. Speak, then stop — see `{"event": "audio_ready", "data": {"path": "/tmp/dona_recording.wav"}}`.

- [ ] **Step 4: Commit**

```bash
git add python/
git commit -m "feat: Python wake word listener with Porcupine + audio recording"
```

---

## Task 3: Electron Main Process + IPC Bridge

**Files:**
- Create: `dona/electron/main.ts`
- Create: `dona/electron/ipc-bridge.ts`
- Create: `dona/src/config.ts`

- [ ] **Step 1: Create config.ts — load and validate env vars**

```typescript
import { config } from 'dotenv';
import * as path from 'path';

config({ path: path.join(__dirname, '..', '.env') });

export interface AppConfig {
  openaiApiKey: string;
  anthropicApiKey: string;
  picovoiceAccessKey: string;
}

export function loadConfig(): AppConfig {
  const openaiApiKey = process.env.OPENAI_API_KEY;
  const anthropicApiKey = process.env.ANTHROPIC_API_KEY;
  const picovoiceAccessKey = process.env.PICOVOICE_ACCESS_KEY;

  const missing: string[] = [];
  if (!openaiApiKey) missing.push('OPENAI_API_KEY');
  if (!anthropicApiKey) missing.push('ANTHROPIC_API_KEY');
  if (!picovoiceAccessKey) missing.push('PICOVOICE_ACCESS_KEY');

  if (missing.length > 0) {
    throw new Error(`Missing environment variables: ${missing.join(', ')}. Check your .env file.`);
  }

  return {
    openaiApiKey: openaiApiKey!,
    anthropicApiKey: anthropicApiKey!,
    picovoiceAccessKey: picovoiceAccessKey!,
  };
}
```

- [ ] **Step 2: Install dotenv**

```bash
npm install dotenv
```

- [ ] **Step 3: Create ipc-bridge.ts — spawn Python + JSON communication**

```typescript
import { spawn, ChildProcess } from 'child_process';
import * as path from 'path';
import { EventEmitter } from 'events';

export interface PythonEvent {
  event: string;
  data?: Record<string, unknown>;
}

export class PythonBridge extends EventEmitter {
  private process: ChildProcess | null = null;
  private buffer: string = '';

  start(picovoiceAccessKey: string): void {
    const pythonPath = path.join(__dirname, '..', 'python', 'venv', 'bin', 'python3');
    const scriptPath = path.join(__dirname, '..', 'python', 'main.py');

    this.process = spawn(pythonPath, [scriptPath], {
      env: {
        ...process.env,
        PICOVOICE_ACCESS_KEY: picovoiceAccessKey,
      },
      stdio: ['pipe', 'pipe', 'pipe'],
    });

    this.process.stdout!.on('data', (data: Buffer) => {
      this.buffer += data.toString();
      const lines = this.buffer.split('\n');
      this.buffer = lines.pop() || '';

      for (const line of lines) {
        if (line.trim()) {
          try {
            const event: PythonEvent = JSON.parse(line.trim());
            this.emit(event.event, event.data);
          } catch {
            console.error('[PythonBridge] Invalid JSON:', line);
          }
        }
      }
    });

    this.process.stderr!.on('data', (data: Buffer) => {
      console.error('[Python]', data.toString());
    });

    this.process.on('close', (code) => {
      console.log(`[PythonBridge] Process exited with code ${code}`);
      this.emit('exit', code);
    });
  }

  send(command: Record<string, unknown>): void {
    if (this.process?.stdin) {
      this.process.stdin.write(JSON.stringify(command) + '\n');
    }
  }

  stop(): void {
    if (this.process) {
      this.process.kill();
      this.process = null;
    }
  }
}
```

- [ ] **Step 4: Create main.ts — Electron entry point with tray**

```typescript
import { app, Tray, nativeImage, BrowserWindow } from 'electron';
import * as path from 'path';
import { PythonBridge } from './ipc-bridge';
import { loadConfig } from '../src/config';

let tray: Tray | null = null;
let responseWindow: BrowserWindow | null = null;
let pythonBridge: PythonBridge | null = null;

app.dock?.hide(); // Hide dock icon — tray only

app.whenReady().then(() => {
  const config = loadConfig();

  // Create tray
  const iconPath = path.join(__dirname, '..', 'assets', 'tray-idle.png');
  const icon = nativeImage.createFromPath(iconPath);
  tray = new Tray(icon.resize({ width: 20, height: 20 }));
  tray.setToolTip('DONA — מקשיבה');

  // Create floating response window (hidden initially)
  responseWindow = new BrowserWindow({
    width: 400,
    height: 120,
    frame: false,
    alwaysOnTop: true,
    transparent: true,
    skipTaskbar: true,
    show: false,
    webPreferences: {
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js'),
    },
  });
  responseWindow.loadFile(path.join(__dirname, '..', 'renderer', 'index.html'));

  // Start Python listener
  pythonBridge = new PythonBridge();

  pythonBridge.on('ready', () => {
    console.log('[DONA] Python listener ready. Waiting for "Hey Dona"...');
  });

  pythonBridge.on('wake_detected', () => {
    console.log('[DONA] Wake word detected!');
    updateState('listening');
  });

  pythonBridge.on('recording_start', () => {
    console.log('[DONA] Recording...');
  });

  pythonBridge.on('audio_ready', async (data: { path: string }) => {
    console.log('[DONA] Audio ready:', data.path);
    updateState('processing');

    // Pipeline will be connected in Task 7
    // For now, just log and reset
    setTimeout(() => updateState('idle'), 3000);
  });

  pythonBridge.on('error', (data: { message: string }) => {
    console.error('[DONA] Python error:', data.message);
    updateState('error');
  });

  pythonBridge.start(config.picovoiceAccessKey);
});

function updateState(state: 'idle' | 'listening' | 'processing' | 'responding' | 'error') {
  const iconMap: Record<string, string> = {
    idle: 'tray-idle.png',
    listening: 'tray-listening.png',
    processing: 'tray-processing.png',
    responding: 'tray-processing.png',
    error: 'tray-error.png',
  };

  if (tray) {
    const iconPath = path.join(__dirname, '..', 'assets', iconMap[state]);
    const icon = nativeImage.createFromPath(iconPath);
    tray.setImage(icon.resize({ width: 20, height: 20 }));
  }

  if (responseWindow) {
    if (state === 'idle') {
      responseWindow.hide();
    } else {
      responseWindow.webContents.send('state-update', { state });
      responseWindow.show();
    }
  }
}

app.on('before-quit', () => {
  pythonBridge?.stop();
});
```

- [ ] **Step 5: Create placeholder tray icons**

```bash
mkdir -p dona/assets
```

Create simple 20x20 PNG icons (purple circle for idle, bright purple for listening, spinning for processing, red for error). For now, use simple colored squares — replace with designed icons later.

```bash
# Use sips to create placeholder icons (macOS)
cd dona/assets
# Create a 20x20 purple square as placeholder
python3 -c "
from PIL import Image
colors = {
    'tray-idle': (80, 60, 120),
    'tray-listening': (140, 80, 220),
    'tray-processing': (100, 70, 170),
    'tray-error': (200, 60, 60),
}
for name, color in colors.items():
    for size, suffix in [(20, ''), (40, '@2x')]:
        img = Image.new('RGBA', (size, size), (*color, 255))
        img.save(f'{name}{suffix}.png')
print('Icons created.')
"
```

Note: If PIL not available, create any 20x20 PNG files manually. They're placeholders.

- [ ] **Step 6: Commit**

```bash
git add electron/ src/config.ts assets/
git commit -m "feat: Electron main process with tray, floating window, Python IPC bridge"
```

---

## Task 4: Electron Renderer — Floating Response Window

**Files:**
- Create: `dona/renderer/index.html`
- Create: `dona/renderer/styles.css`
- Create: `dona/renderer/renderer.ts`
- Create: `dona/electron/preload.ts`

- [ ] **Step 1: Create preload.ts — secure context bridge**

```typescript
import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('dona', {
  onStateUpdate: (callback: (data: { state: string; text?: string }) => void) => {
    ipcRenderer.on('state-update', (_event, data) => callback(data));
  },
  onResponse: (callback: (data: { text: string }) => void) => {
    ipcRenderer.on('response', (_event, data) => callback(data));
  },
});
```

- [ ] **Step 2: Create index.html**

```html
<!DOCTYPE html>
<html lang="he" dir="rtl">
<head>
  <meta charset="UTF-8">
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <div id="container">
    <div id="status"></div>
    <div id="response"></div>
  </div>
  <script src="renderer.js"></script>
</body>
</html>
```

- [ ] **Step 3: Create styles.css — dark floating window**

```css
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  background: transparent;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  color: #e0e0e0;
  -webkit-app-region: drag;
  user-select: none;
}

#container {
  background: rgba(20, 15, 30, 0.92);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(140, 80, 220, 0.3);
  border-radius: 12px;
  padding: 16px 20px;
  min-height: 60px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

#status {
  font-size: 13px;
  color: rgba(180, 140, 255, 0.8);
  font-weight: 500;
}

#response {
  font-size: 15px;
  color: #f0f0f0;
  line-height: 1.5;
  direction: rtl;
  text-align: right;
}

/* States */
.state-listening #status::before {
  content: '●';
  color: #b48cff;
  margin-left: 6px;
  animation: pulse 1s ease-in-out infinite;
}

.state-processing #status::before {
  content: '◌';
  color: #b48cff;
  margin-left: 6px;
  animation: spin 1s linear infinite;
}

.state-responding #status::before {
  content: '●';
  color: #4ade80;
  margin-left: 6px;
}

.state-error #status::before {
  content: '●';
  color: #f87171;
  margin-left: 6px;
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.3; }
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}
```

- [ ] **Step 4: Create renderer.ts — UI logic**

```typescript
declare global {
  interface Window {
    dona: {
      onStateUpdate: (callback: (data: { state: string; text?: string }) => void) => void;
      onResponse: (callback: (data: { text: string }) => void) => void;
    };
  }
}

const container = document.getElementById('container')!;
const statusEl = document.getElementById('status')!;
const responseEl = document.getElementById('response')!;

const stateLabels: Record<string, string> = {
  listening: 'מקשיבה...',
  processing: 'מעבדת...',
  responding: '',
  error: 'שגיאה',
};

window.dona.onStateUpdate((data) => {
  container.className = `state-${data.state}`;
  statusEl.textContent = data.text || stateLabels[data.state] || '';
  if (data.state !== 'responding') {
    responseEl.textContent = '';
  }
});

window.dona.onResponse((data) => {
  container.className = 'state-responding';
  statusEl.textContent = '';
  responseEl.textContent = data.text;
});

export {};
```

- [ ] **Step 5: Compile and test Electron app launches**

```bash
cd dona
npm run build
npm start
```

Expected: Purple tray icon appears in menubar. No dock icon. Console logs "[DONA] Python listener ready." Say "Hey Dona" — icon changes, console shows wake_detected.

- [ ] **Step 6: Commit**

```bash
git add renderer/ electron/preload.ts
git commit -m "feat: floating response window with dark UI and state animations"
```

---

## Task 5: Whisper Transcription Service

**Files:**
- Create: `dona/src/voice/whisper.ts`

- [ ] **Step 1: Install OpenAI SDK**

```bash
npm install openai
```

- [ ] **Step 2: Create whisper.ts — audio file to Hebrew text**

```typescript
import OpenAI from 'openai';
import * as fs from 'fs';

export class WhisperService {
  private client: OpenAI;

  constructor(apiKey: string) {
    this.client = new OpenAI({ apiKey });
  }

  async transcribe(audioPath: string): Promise<string> {
    const audioFile = fs.createReadStream(audioPath);

    const response = await this.client.audio.transcriptions.create({
      model: 'whisper-1',
      file: audioFile,
      language: 'he',
    });

    // Clean up temp file
    fs.unlink(audioPath, () => {});

    return response.text;
  }
}
```

- [ ] **Step 3: Commit**

```bash
git add src/voice/whisper.ts
git commit -m "feat: Whisper transcription service — audio to Hebrew text"
```

---

## Task 6: Claude Intent Parsing

**Files:**
- Create: `dona/src/brain/claude.ts`

- [ ] **Step 1: Install Anthropic SDK**

```bash
npm install @anthropic-ai/sdk
```

- [ ] **Step 2: Create claude.ts — intent parser with Dona personality**

```typescript
import Anthropic from '@anthropic-ai/sdk';

export interface DonaIntent {
  intent: string;
  params: Record<string, unknown>;
  response_text: string;
  needs_confirmation: boolean;
}

const DONA_SYSTEM_PROMPT = `את דונה — העוזרת האישית של שקד וינקלר.

## האישיות שלך
את מבוססת על דונה פאולסן מ-Suits. את בטוחה, אלגנטית, ישירה וחמה.
- קצרה כי את בטוחה בעצמך
- גוף ראשון: "שלחתי", "בדקתי", "הכנתי"
- אפס סימני קריאה
- לא מתנצלת — מתקנת
- מוסיפה ערך כשרואה משהו רלוונטי

## התפקיד שלך
המשתמש מדבר אליך בעברית. את צריכה:
1. להבין מה הוא רוצה
2. להחזיר JSON מובנה עם הפעולה הנדרשת
3. לנסח תגובה קצרה ואלגנטית בעברית

## פורמט תגובה
תמיד החזירי JSON תקין בלבד (בלי markdown, בלי הסבר):
{
  "intent": "one of: send_email, send_whatsapp, create_event, create_task, create_reminder, open_app, search_files, save_idea, read_email, list_events, list_tasks, general_question, unknown",
  "params": { },
  "response_text": "תגובה קצרה בעברית בסגנון דונה",
  "needs_confirmation": true/false
}

## כללי אישור
needs_confirmation = true רק כשמשהו יוצא החוצה לאדם: מייל, הודעת WhatsApp.
כל השאר = false.

## דוגמאות
קלט: "תשלחי מייל לגולן שהפגישה מחר ב-3"
{"intent":"send_email","params":{"to":"גולן","subject":"פגישה מחר","body":"היי גולן, הפגישה שלנו מחר ב-15:00. נתראה."},"response_text":"כתבתי לגולן. לשלוח?","needs_confirmation":true}

קלט: "תפתחי כרום"
{"intent":"open_app","params":{"app_name":"Google Chrome"},"response_text":"פותחת.","needs_confirmation":false}

קלט: "יש לי רעיון — שירות ניהול חשבוניות לעסקים קטנים ב-99 שקל לחודש"
{"intent":"save_idea","params":{"content":"שירות ניהול חשבוניות לעסקים קטנים — SaaS, 99 ש״ח לחודש","tags":["business","saas"]},"response_text":"תפסתי. שירות חשבוניות SaaS, ₪99 לחודש. שמור.","needs_confirmation":false}

קלט: "מה דעתך על השוק הפיליפיני"
{"intent":"general_question","params":{"question":"מה דעתך על השוק הפיליפיני"},"response_text":"השוק הפיליפיני...","needs_confirmation":false}
`;

export class ClaudeService {
  private client: Anthropic;

  constructor(apiKey: string) {
    this.client = new Anthropic({ apiKey });
  }

  async parseIntent(transcribedText: string): Promise<DonaIntent> {
    const response = await this.client.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 1024,
      system: DONA_SYSTEM_PROMPT,
      messages: [
        { role: 'user', content: transcribedText },
      ],
    });

    const text = response.content[0].type === 'text' ? response.content[0].text : '';

    try {
      return JSON.parse(text) as DonaIntent;
    } catch {
      return {
        intent: 'general_question',
        params: { question: transcribedText },
        response_text: text,
        needs_confirmation: false,
      };
    }
  }
}
```

- [ ] **Step 3: Commit**

```bash
git add src/brain/claude.ts
git commit -m "feat: Claude intent parser with Dona personality system prompt"
```

---

## Task 7: TTS Voice Response

**Files:**
- Create: `dona/src/voice/tts.ts`

- [ ] **Step 1: Create tts.ts — text to speech + playback**

```typescript
import OpenAI from 'openai';
import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';
import { exec } from 'child_process';

export class TTSService {
  private client: OpenAI;

  constructor(apiKey: string) {
    this.client = new OpenAI({ apiKey });
  }

  async speak(text: string): Promise<void> {
    const response = await this.client.audio.speech.create({
      model: 'tts-1',
      voice: 'nova', // Female, warm voice — closest to Dona
      input: text,
      response_format: 'mp3',
    });

    // Save to temp file
    const tempPath = path.join(os.tmpdir(), 'dona_response.mp3');
    const buffer = Buffer.from(await response.arrayBuffer());
    fs.writeFileSync(tempPath, buffer);

    // Play audio using macOS afplay
    await new Promise<void>((resolve, reject) => {
      exec(`afplay "${tempPath}"`, (error) => {
        fs.unlink(tempPath, () => {});
        if (error) reject(error);
        else resolve();
      });
    });
  }
}
```

- [ ] **Step 2: Commit**

```bash
git add src/voice/tts.ts
git commit -m "feat: TTS service — OpenAI text-to-speech with macOS afplay"
```

---

## Task 8: Full Pipeline — End to End

**Files:**
- Create: `dona/src/pipeline.ts`
- Modify: `dona/electron/main.ts` — connect pipeline to audio_ready event

- [ ] **Step 1: Create pipeline.ts — orchestrates the full flow**

```typescript
import { WhisperService } from './voice/whisper';
import { ClaudeService, DonaIntent } from './brain/claude';
import { TTSService } from './voice/tts';

export interface PipelineResult {
  transcription: string;
  intent: DonaIntent;
}

export class DonaPipeline {
  private whisper: WhisperService;
  private claude: ClaudeService;
  private tts: TTSService;

  constructor(openaiKey: string, anthropicKey: string) {
    this.whisper = new WhisperService(openaiKey);
    this.claude = new ClaudeService(anthropicKey);
    this.tts = new TTSService(openaiKey);
  }

  async process(audioPath: string, onStateChange: (state: string, text?: string) => void): Promise<PipelineResult> {
    // Step 1: Transcribe
    onStateChange('processing', 'מתמללת...');
    const transcription = await this.whisper.transcribe(audioPath);
    console.log('[Pipeline] Transcribed:', transcription);

    // Step 2: Parse intent
    onStateChange('processing', 'מעבדת...');
    const intent = await this.claude.parseIntent(transcription);
    console.log('[Pipeline] Intent:', intent.intent);

    // Step 3: Respond with voice + text
    onStateChange('responding', intent.response_text);
    await this.tts.speak(intent.response_text);

    // Step 4: Execute action (Phase 2 — for now just log)
    if (!intent.needs_confirmation) {
      console.log('[Pipeline] Would execute:', intent.intent, intent.params);
    } else {
      console.log('[Pipeline] Waiting for confirmation:', intent.intent);
    }

    return { transcription, intent };
  }
}
```

- [ ] **Step 2: Update main.ts — connect pipeline to audio_ready event**

Replace the `audio_ready` handler in `electron/main.ts`:

```typescript
// Add import at top
import { DonaPipeline } from '../src/pipeline';

// Add after config is loaded (inside app.whenReady)
const pipeline = new DonaPipeline(config.openaiApiKey, config.anthropicApiKey);

// Replace the existing pythonBridge.on('audio_ready', ...) handler:
pythonBridge.on('audio_ready', async (data: { path: string }) => {
  console.log('[DONA] Audio ready:', data.path);

  try {
    const result = await pipeline.process(data.path, (state, text) => {
      updateState(state as any);
      if (text && responseWindow) {
        responseWindow.webContents.send('state-update', { state, text });
      }
    });

    // Show response text
    if (responseWindow) {
      responseWindow.webContents.send('response', { text: result.intent.response_text });
    }

    // Auto-hide after 5 seconds
    setTimeout(() => updateState('idle'), 5000);
  } catch (error) {
    console.error('[DONA] Pipeline error:', error);
    updateState('error');
    setTimeout(() => updateState('idle'), 3000);
  }
});
```

- [ ] **Step 3: Build and test end-to-end**

```bash
cd dona
npm run build
npm start
```

Test sequence:
1. Say "Hey Dona" → tray icon changes to listening
2. Say "תפתחי כרום" → tray shows processing
3. Hear Dona respond "פותחת." → see text in floating window
4. Window disappears after 5 seconds

- [ ] **Step 4: Commit**

```bash
git add src/pipeline.ts electron/main.ts
git commit -m "feat: complete voice pipeline — wake word → whisper → claude → tts → UI"
```

---

## Task 9: Basic macOS Action — Open App

**Files:**
- Create: `dona/src/actions/executor.ts`
- Create: `dona/src/actions/macos.ts`
- Modify: `dona/src/pipeline.ts` — connect executor

- [ ] **Step 1: Create macos.ts — open apps via shell**

```typescript
import { exec } from 'child_process';

export async function openApp(appName: string): Promise<string> {
  return new Promise((resolve, reject) => {
    exec(`open -a "${appName}"`, (error) => {
      if (error) {
        reject(new Error(`לא הצלחתי לפתוח את ${appName}.`));
      } else {
        resolve(`פתחתי את ${appName}.`);
      }
    });
  });
}
```

- [ ] **Step 2: Create executor.ts — routes intent to action**

```typescript
import { DonaIntent } from '../brain/claude';
import { openApp } from './macos';

export async function executeAction(intent: DonaIntent): Promise<string | null> {
  switch (intent.intent) {
    case 'open_app': {
      const appName = intent.params.app_name as string;
      return openApp(appName);
    }

    case 'save_idea': {
      // Phase 3 — for now just acknowledge
      console.log('[Executor] Saving idea:', intent.params.content);
      return null; // response_text already set by Claude
    }

    case 'general_question': {
      return null; // response_text already set by Claude
    }

    default: {
      console.log(`[Executor] Action '${intent.intent}' not implemented yet (Phase 2)`);
      return null;
    }
  }
}
```

- [ ] **Step 3: Update pipeline.ts — call executor after response**

Add to `pipeline.ts`, after step 3 (TTS), replace step 4:

```typescript
// Add import at top
import { executeAction } from './actions/executor';

// Replace step 4 in process():
    // Step 4: Execute action (if no confirmation needed)
    if (!intent.needs_confirmation) {
      try {
        await executeAction(intent);
      } catch (error) {
        console.error('[Pipeline] Action failed:', error);
      }
    }
```

- [ ] **Step 4: Build and test**

```bash
npm run build && npm start
```

Say: "היי דונה, תפתחי כרום"
Expected: Dona says "פותחת." → Chrome opens.

- [ ] **Step 5: Commit**

```bash
git add src/actions/
git commit -m "feat: action executor + macOS open app — first real action"
```

---

## Task 10: Polish + Error Handling

**Files:**
- Modify: `dona/electron/main.ts` — position window near tray
- Modify: `dona/src/pipeline.ts` — error handling with Dona personality

- [ ] **Step 1: Position floating window near tray icon**

Add to `main.ts`, in the `updateState` function, when showing window:

```typescript
function updateState(state: 'idle' | 'listening' | 'processing' | 'responding' | 'error') {
  // ... existing icon update code ...

  if (responseWindow) {
    if (state === 'idle') {
      responseWindow.hide();
    } else {
      // Position near tray
      if (tray) {
        const trayBounds = tray.getBounds();
        const windowBounds = responseWindow.getBounds();
        const x = Math.round(trayBounds.x + (trayBounds.width / 2) - (windowBounds.width / 2));
        const y = Math.round(trayBounds.y + trayBounds.height + 4);
        responseWindow.setPosition(x, y);
      }
      responseWindow.webContents.send('state-update', { state });
      responseWindow.show();
    }
  }
}
```

- [ ] **Step 2: Add error handling with Dona personality to pipeline**

Update the catch block in `main.ts` audio_ready handler:

```typescript
  } catch (error: any) {
    console.error('[DONA] Pipeline error:', error);
    updateState('error');

    const errorMessage = error.message?.includes('API')
      ? 'בעיה בחיבור. אבדוק שוב בעוד רגע.'
      : 'לא הצלחתי. תנסה שוב.';

    if (responseWindow) {
      responseWindow.webContents.send('response', { text: errorMessage });
    }

    setTimeout(() => updateState('idle'), 4000);
  }
```

- [ ] **Step 3: Final build and full test**

```bash
npm run build && npm start
```

Full test:
1. "היי דונה" → listening state, purple icon
2. "מה שלומך?" → processing → Dona responds in voice + text
3. "תפתחי כרום" → Chrome opens, Dona says "פותחת."
4. "תשלחי מייל לגולן" → Dona says "כתבתי לגולן. לשלוח?" (no action — Phase 2)
5. Window auto-hides after response

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "feat: DONA Phase 1 complete — core voice loop working end-to-end"
```

---

## Phase 1 Complete — What Works

After completing all 10 tasks:

- **"Hey Dona"** wake word detection (Porcupine, offline)
- **Hebrew voice transcription** (Whisper API)
- **Intent parsing** with Dona personality (Claude API)
- **Voice response** in natural voice (OpenAI TTS)
- **Floating UI** with dark theme, state animations
- **Menubar tray** with state-aware icons
- **Open apps** on macOS
- **Error handling** with Dona-style responses

## What's Next

- **Phase 2:** Gmail, Calendar, Tasks, WhatsApp, more macOS actions
- **Phase 3:** Conversation context, learning engine, prediction
- **Phase 4:** ALAALA, ROSAYO, ONCE, LEVER platform integrations
- **Phase 5:** Morning brief, protocol breaking, evening summary
