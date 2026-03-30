# דונה — עוזרת קולית אישית

> "היי דונה" — שליטה מלאה במחשב, באפליקציות, ובחיים — דרך הקול.

---

## מה זה

אפליקציית דסקטופ שרצה תמיד ברקע על המק. מזהה את מילת ההפעלה "היי דונה", מקליטה פקודה קולית בעברית, מבינה מה צריך לעשות, מבצעת, ועונה בקול + טקסט על המסך.

---

## חוויית משתמש

1. המק נדלק — דונה עולה אוטומטית
2. אייקון סגול קטן ב-menubar (ליד השעון)
3. המשתמש אומר **"היי דונה"** — האייקון נדלק, דונה מקשיבה
4. המשתמש אומר פקודה בעברית:
   - "תשלחי מייל לגולן שהפגישה מחר ב-3"
   - "תפתחי וואטסאפ לאבי ותגידי לו שאני מאחר"
   - "תוסיפי פגישה ביום רביעי ב-10 בבוקר עם עו״ד כהן"
   - "יש לי רעיון לעסק חדש — תקליטי"
   - "תפתחי כרום"
   - "תזכירי לי בשש להתקשר לספק"
5. דונה מבצעת את הפעולה
6. דונה עונה בקול (TTS) + מציגה טקסט בחלון קטן על המסך
7. החלון נעלם אחרי כמה שניות — דונה חוזרת להאזנה

### מצבים ויזואליים

| מצב | אייקון menubar | חלון |
|-----|----------------|------|
| שינה (ממתינה ל-wake word) | סגול כהה, שקט | מוסתר |
| מקשיבה (אחרי "היי דונה") | סגול בוהק, פועם | "מקשיבה..." |
| מעבדת (שלחה ל-Whisper/Claude) | סגול מסתובב | "מעבדת..." |
| מגיבה (מבצעת + עונה) | ירוק | תוצאה + קול |
| שגיאה | אדום | הודעת שגיאה |

---

## ארכיטקטורה

### סטאק טכנולוגי

| רכיב | טכנולוגיה | תפקיד |
|-------|----------|--------|
| UI | Electron | menubar app + חלון תגובה צף |
| Wake word listener | Python + Porcupine (Picovoice) | זיהוי "היי דונה" — רץ מקומי, בלי אינטרנט |
| תמלול | OpenAI Whisper API | speech-to-text בעברית |
| הבנת כוונה + ביצוע | Claude API (Anthropic) | מפרש פקודה, מחזיר structured JSON |
| קול חזרה | OpenAI TTS API | text-to-speech — תגובה קולית |
| פעולות macOS | AppleScript / osascript | שליטה באפליקציות מקומיות |
| Google APIs | Gmail, Calendar, Tasks | מייל, יומן, משימות |
| WhatsApp | WhatsApp Desktop + AppleScript | הודעות |

### זרימת נתונים

```
[מיקרופון] → Porcupine (מקומי)
    ↓ wake word detected
[הקלטת פקודה] → OpenAI Whisper API
    ↓ טקסט בעברית
[Claude API] → הבנת כוונה → structured JSON
    ↓ { action: "send_email", to: "golan", subject: "...", body: "..." }
[Action Executor] → Gmail API / Calendar API / AppleScript / etc.
    ↓ תוצאה
[OpenAI TTS API] → קול חזרה
[Electron UI] → טקסט על המסך
```

### מבנה תהליכים

```
┌─────────────────────────────────────┐
│  Electron Main Process              │
│  ├── Menubar tray icon              │
│  ├── Floating response window       │
│  ├── IPC bridge to Python           │
│  └── Action executor (AppleScript)  │
├─────────────────────────────────────┤
│  Python Background Process          │
│  ├── Porcupine wake word listener   │
│  ├── Audio recorder (after wake)    │
│  └── Sends audio to Electron via IPC│
└─────────────────────────────────────┘
```

Electron ו-Python מתקשרים דרך IPC (stdin/stdout pipe). Python שולח אירועים: `wake_detected`, `audio_ready`. Electron שולח: `start_listening`, `stop`.

---

## אינטגרציות — פירוט

### Gmail API

- **שליחת מייל:** `"תשלחי מייל ל-X על Y"` → Claude מזהה נמען, נושא, גוף → Gmail API sends
- **קריאת מייל:** `"יש לי מיילים חדשים?"` → Gmail API list → Claude מסכם → TTS
- **OAuth2:** פעם אחת — המשתמש מאשר גישה לחשבון Google. Token נשמר מקומית

### Google Calendar API

- **יצירת אירוע:** `"פגישה מחר ב-3 עם עו״ד כהן"` → Claude מפרש תאריך/שעה/משתתפים → Calendar API creates
- **שליפת אירועים:** `"מה יש לי היום?"` → Calendar API list → Claude מסכם → TTS
- **עדכון/מחיקה:** `"תבטלי את הפגישה של מחר"` → Calendar API delete

### Google Tasks API

- **יצירת משימה:** `"תוסיפי משימה: לסגור חוזה עד חמישי"` → Tasks API creates
- **רשימת משימות:** `"מה המשימות שלי?"` → Tasks API list → Claude מסכם

### WhatsApp Desktop

- **שליחת הודעה:** AppleScript פותח WhatsApp Desktop → מנווט לאיש קשר → מדביק הודעה → שולח
- **מגבלה:** WhatsApp Desktop חייב להיות פתוח ומחובר

### macOS Native

- **פתיחת אפליקציות:** `open -a "Google Chrome"` דרך shell
- **חיפוש קבצים:** `mdfind` (Spotlight CLI) → Claude מסנן תוצאות
- **העתקה ללוח:** `pbcopy` — דונה יכולה להעתיק תוצאות ל-clipboard

---

## Claude — הבנת כוונה

Claude מקבל את הטקסט המתומלל ומחזיר structured JSON:

```json
{
  "intent": "send_email",
  "confidence": 0.95,
  "params": {
    "to": "golan",
    "subject": "פגישה מחר",
    "body": "היי גולן, הפגישה מחר ב-3. נתראה."
  },
  "response_text": "שלחתי מייל לגולן על הפגישה מחר ב-3",
  "needs_confirmation": true
}
```

### Intent types

| Intent | פרמטרים | דורש אישור? |
|--------|---------|-------------|
| `send_email` | to, subject, body | כן — מציג לפני שליחה |
| `send_whatsapp` | to, message | כן |
| `create_event` | title, date, time, attendees | לא |
| `create_task` | title, due_date | לא |
| `create_reminder` | title, remind_at | לא |
| `open_app` | app_name | לא |
| `search_files` | query | לא |
| `save_idea` | content, tags | לא |
| `read_email` | query/filter | לא |
| `list_events` | date_range | לא |
| `list_tasks` | filter | לא |
| `general_question` | question | לא |

### אישור לפני ביצוע

הודעות (מייל, WhatsApp) דורשות אישור. דונה אומרת:
> "אני עומדת לשלוח מייל לגולן: 'הפגישה מחר ב-3. נתראה.' — לשלוח?"

המשתמש אומר "כן" / "שלחי" → דונה שולחת.
המשתמש אומר "לא" / "בטלי" → דונה מבטלת.

---

## Claude Memory — רעיונות ומחשבות

כשהמשתמש אומר "יש לי רעיון" / "תקליטי" / "תזכרי ש...", דונה:

1. מתמללת את כל מה שנאמר (Whisper)
2. שולחת לקלוד עם הוראה: סכם, תייג, ושמור ב-memory
3. קלוד שומר כקובץ memory עם metadata:
   - תאריך ושעה
   - תגיות (עסק, מוצר, אישי, פיתוח, וכו')
   - סיכום קצר
   - התמלול המלא
4. ניתן לשליפה: "מה הרעיונות שהיו לי על X?" → Claude מחפש ב-memory ומסכם

### מבנה קובץ memory

```markdown
---
name: רעיון — שירות מנויים לעסקים קטנים
description: רעיון לשירות SaaS חודשי שמנהל חשבוניות אוטומטית לעסקים קטנים
type: idea
tags: [business, saas, billing]
source: voice
date: 2026-03-30T14:22:00+03:00
---

## סיכום
רעיון לפלטפורמה שמנהלת חשבוניות אוטומטית לעסקים קטנים...

## תמלול מלא
"אני חושב שיש פה הזדמנות ענקית בעסקים קטנים שמנהלים חשבוניות ידנית..."
```

---

## אנשי קשר

דונה צריכה לדעת מי זה "גולן", "אבי" וכו'. מקורות:

1. **Google Contacts API** — סנכרון אנשי קשר (שם, מייל, טלפון)
2. **למידה מתמשכת** — אם המשתמש אומר "תשלחי לגולן" ואין גולן באנשי קשר, דונה שואלת: "מי זה גולן? מה המייל שלו?" ושומרת

---

## מבנה קבצים

```
dona/
├── package.json              # Electron app
├── electron/
│   ├── main.ts               # Electron main process
│   ├── tray.ts               # Menubar tray icon + states
│   ├── window.ts             # Floating response window
│   ├── ipc-bridge.ts         # Communication with Python
│   └── preload.ts            # Secure bridge to renderer
├── renderer/
│   ├── index.html            # Response window HTML
│   ├── styles.css            # Minimal floating window styles
│   └── renderer.ts           # UI logic
├── python/
│   ├── requirements.txt      # porcupine, pyaudio, websocket
│   ├── listener.py           # Wake word detection (Porcupine)
│   ├── recorder.py           # Audio recording after wake
│   └── main.py               # Entry point — runs listener loop
├── src/
│   ├── actions/
│   │   ├── executor.ts       # Routes intent → action handler
│   │   ├── gmail.ts          # Gmail API integration
│   │   ├── calendar.ts       # Google Calendar API integration
│   │   ├── tasks.ts          # Google Tasks API integration
│   │   ├── whatsapp.ts       # WhatsApp Desktop AppleScript
│   │   ├── macos.ts          # Open apps, Spotlight, clipboard
│   │   └── memory.ts         # Save/retrieve ideas via Claude
│   ├── services/
│   │   ├── whisper.ts        # OpenAI Whisper API call
│   │   ├── claude.ts         # Claude API — intent parsing
│   │   ├── tts.ts            # OpenAI TTS API call
│   │   └── google-auth.ts    # Google OAuth2 flow + token storage
│   └── config/
│       ├── intents.ts        # Intent definitions + schemas
│       └── contacts.ts       # Contact resolution logic
├── assets/
│   ├── tray-idle.png         # Menubar icon — sleeping
│   ├── tray-listening.png    # Menubar icon — listening
│   ├── tray-processing.png   # Menubar icon — processing
│   └── tray-error.png        # Menubar icon — error
└── scripts/
    ├── setup.sh              # One-time setup (Python venv, deps, Porcupine key)
    └── build.sh              # Package Electron app for macOS
```

---

## הגדרה ראשונית (פעם אחת)

1. התקנת האפליקציה (drag to Applications)
2. דונה מבקשת הרשאת מיקרופון (macOS permission)
3. דונה מבקשת הרשאת Accessibility (לשליטה באפליקציות)
4. הכנסת API keys: OpenAI + Anthropic (Claude)
5. התחברות לחשבון Google (OAuth — מאשר Gmail + Calendar + Tasks + Contacts)
6. דונה מוכנה

---

## API Keys נדרשים

| שירות | משתנה | שימוש |
|-------|-------|-------|
| OpenAI | `OPENAI_API_KEY` | Whisper (תמלול) + TTS (קול) |
| Anthropic | `ANTHROPIC_API_KEY` | Claude (הבנת כוונה + memory) |
| Picovoice | `PICOVOICE_ACCESS_KEY` | Porcupine wake word (חינם עד 3 מכשירים) |
| Google | `GOOGLE_CLIENT_ID` + `GOOGLE_CLIENT_SECRET` | Gmail, Calendar, Tasks, Contacts |

---

## אבטחה

- API keys נשמרים ב-macOS Keychain (לא בקובץ טקסט)
- Google OAuth tokens נשמרים מוצפנים מקומית
- הקלטות אודיו לא נשמרות — נמחקות אחרי תמלול
- כל התקשורת עם APIs דרך HTTPS
- אישור לפני שליחת הודעות (מייל/WhatsApp)

---

## מגבלות ידועות (v1)

- Wake word באנגלית בלבד ("Hey Dona") — Porcupine לא תומך בעברית ל-custom wake words
- WhatsApp דרוש פתוח ומחובר על המק
- אין תמיכה ב-SMS (אין API פשוט ל-SMS בישראל)
- קול TTS באנגלית/ניטרלי — OpenAI TTS עברית סבירה אבל לא מושלמת
- דורש חיבור אינטרנט (חוץ מ-wake word detection)
