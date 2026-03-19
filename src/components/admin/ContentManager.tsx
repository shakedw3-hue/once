"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  createModule,
  updateModule,
  deleteModule,
  createLesson,
  updateLesson,
  deleteLesson,
} from "@/app/admin/content/actions";

interface Path {
  id: string;
  pillar: string;
  title: string;
  order: number;
}

interface Module {
  id: string;
  path_id: string;
  title: string;
  description: string;
  order: number;
}

interface Lesson {
  id: string;
  module_id: string;
  title: string;
  description: string;
  action_step: string;
  reflection_prompt: string;
  order: number;
}

interface ContentManagerProps {
  paths: Path[];
  modules: Module[];
  lessons: Lesson[];
}

export default function ContentManager({
  paths,
  modules,
  lessons,
}: ContentManagerProps) {
  const [selectedPath, setSelectedPath] = useState<string>(
    paths[0]?.id ?? ""
  );
  const [expandedModule, setExpandedModule] = useState<string | null>(null);

  const pathModules = modules.filter((m) => m.path_id === selectedPath);
  const currentPath = paths.find((p) => p.id === selectedPath);

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold tracking-tight text-foreground">
        Content Management
      </h1>

      {/* Pillar tabs */}
      <div className="mb-6 flex flex-wrap gap-2">
        {paths.map((path) => (
          <Button
            key={path.id}
            variant={selectedPath === path.id ? "default" : "outline"}
            size="sm"
            onClick={() => {
              setSelectedPath(path.id);
              setExpandedModule(null);
            }}
            className={`capitalize ${selectedPath !== path.id ? "text-muted-foreground" : ""}`}
          >
            {path.title}
          </Button>
        ))}
      </div>

      {/* Module list */}
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-foreground">
          {currentPath?.title} Modules
          <Badge variant="secondary" className="ml-2">
            {pathModules.length}
          </Badge>
        </h2>
        <ModuleDialog
          pathId={selectedPath}
          trigger={<Button size="sm">Add Module</Button>}
        />
      </div>

      <div className="space-y-3">
        {pathModules.map((mod) => {
          const modLessons = lessons.filter(
            (l) => l.module_id === mod.id
          );
          const isExpanded = expandedModule === mod.id;

          return (
            <Card key={mod.id}>
              <CardContent className="p-0">
                {/* Module header */}
                <div
                  className="flex cursor-pointer items-center gap-3 p-4"
                  onClick={() =>
                    setExpandedModule(isExpanded ? null : mod.id)
                  }
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className={`shrink-0 text-muted-foreground/50 transition-transform ${
                      isExpanded ? "rotate-90" : ""
                    }`}
                  >
                    <path d="M9 18l6-6-6-6" />
                  </svg>
                  <div className="min-w-0 flex-1">
                    <p className="font-medium text-foreground">
                      <span className="text-muted-foreground">
                        {mod.order}.
                      </span>{" "}
                      {mod.title}
                    </p>
                    <p className="truncate text-sm text-muted-foreground">
                      {mod.description}
                    </p>
                  </div>
                  <Badge variant="outline" className="shrink-0">
                    {modLessons.length} lessons
                  </Badge>
                  <div
                    className="flex gap-1"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <ModuleDialog
                      pathId={selectedPath}
                      existing={mod}
                      trigger={
                        <Button variant="ghost" size="sm">
                          Edit
                        </Button>
                      }
                    />
                    <DeleteButton
                      label="module"
                      onDelete={() => deleteModule(mod.id)}
                    />
                  </div>
                </div>

                {/* Expanded: lessons */}
                {isExpanded && (
                  <div className="border-t bg-muted/50 p-4">
                    <div className="mb-3 flex items-center justify-between">
                      <p className="text-sm font-medium text-muted-foreground">
                        Lessons
                      </p>
                      <LessonDialog
                        moduleId={mod.id}
                        trigger={
                          <Button variant="outline" size="sm">
                            Add Lesson
                          </Button>
                        }
                      />
                    </div>
                    {modLessons.length === 0 ? (
                      <p className="py-4 text-center text-sm text-muted-foreground">
                        No lessons yet. Add your first lesson.
                      </p>
                    ) : (
                      <div className="space-y-2">
                        {modLessons.map((lesson) => (
                          <div
                            key={lesson.id}
                            className="flex items-center gap-3 rounded-lg border p-3"
                          >
                            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-muted text-xs font-bold text-muted-foreground">
                              {lesson.order}
                            </span>
                            <div className="min-w-0 flex-1">
                              <p className="text-sm font-medium text-foreground">
                                {lesson.title}
                              </p>
                              <p className="truncate text-xs text-muted-foreground">
                                {lesson.description}
                              </p>
                            </div>
                            <div className="flex gap-1">
                              <LessonDialog
                                moduleId={mod.id}
                                existing={lesson}
                                trigger={
                                  <Button variant="ghost" size="sm">
                                    Edit
                                  </Button>
                                }
                              />
                              <DeleteButton
                                label="lesson"
                                onDelete={() => deleteLesson(lesson.id)}
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}

        {pathModules.length === 0 && (
          <Card>
            <CardContent className="py-12 text-center text-muted-foreground">
              No modules for this pillar yet.
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}

// --- Module Dialog ---

function ModuleDialog({
  pathId,
  existing,
  trigger,
}: {
  pathId: string;
  existing?: Module;
  trigger: React.ReactNode;
}) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState(existing?.title ?? "");
  const [description, setDescription] = useState(existing?.description ?? "");
  const [saving, setSaving] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);

    const result = existing
      ? await updateModule(existing.id, title, description)
      : await createModule(pathId, title, description);

    if (result.success) {
      setOpen(false);
      if (!existing) {
        setTitle("");
        setDescription("");
      }
      router.refresh();
    }
    setSaving(false);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger render={<span />}>{trigger}</DialogTrigger>
      <DialogContent>
        <form onSubmit={handleSubmit} className="space-y-4 p-6">
          <h3 className="text-lg font-semibold text-foreground">
            {existing ? "Edit Module" : "New Module"}
          </h3>
          <div className="space-y-2">
            <Label htmlFor="mod-title" className="text-muted-foreground">Title</Label>
            <Input
              id="mod-title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="mod-desc" className="text-muted-foreground">Description</Label>
            <Textarea
              id="mod-desc"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
            />
          </div>
          <div className="flex justify-end gap-2">
            <Button
              type="button"
              variant="ghost"
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={saving} className="font-semibold">
              {saving ? "Saving..." : existing ? "Update" : "Create"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

// --- Lesson Dialog ---

function LessonDialog({
  moduleId,
  existing,
  trigger,
}: {
  moduleId: string;
  existing?: Lesson;
  trigger: React.ReactNode;
}) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState(existing?.title ?? "");
  const [description, setDescription] = useState(existing?.description ?? "");
  const [actionStep, setActionStep] = useState(existing?.action_step ?? "");
  const [reflectionPrompt, setReflectionPrompt] = useState(
    existing?.reflection_prompt ?? ""
  );
  const [saving, setSaving] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);

    const data = { title, description, actionStep, reflectionPrompt };
    const result = existing
      ? await updateLesson(existing.id, data)
      : await createLesson(moduleId, data);

    if (result.success) {
      setOpen(false);
      if (!existing) {
        setTitle("");
        setDescription("");
        setActionStep("");
        setReflectionPrompt("");
      }
      router.refresh();
    }
    setSaving(false);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger render={<span />}>{trigger}</DialogTrigger>
      <DialogContent>
        <form onSubmit={handleSubmit} className="space-y-4 p-6">
          <h3 className="text-lg font-semibold text-foreground">
            {existing ? "Edit Lesson" : "New Lesson"}
          </h3>
          <div className="space-y-2">
            <Label htmlFor="les-title" className="text-muted-foreground">Title</Label>
            <Input
              id="les-title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="les-desc" className="text-muted-foreground">Description</Label>
            <Textarea
              id="les-desc"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
              placeholder="The main teaching content of this lesson..."
            />
          </div>

          <Separator />

          <div className="space-y-2">
            <Label htmlFor="les-action" className="text-muted-foreground">Action Step</Label>
            <Textarea
              id="les-action"
              value={actionStep}
              onChange={(e) => setActionStep(e.target.value)}
              rows={3}
              placeholder="What should the user do after reading?"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="les-reflect" className="text-muted-foreground">Reflection Prompt</Label>
            <Textarea
              id="les-reflect"
              value={reflectionPrompt}
              onChange={(e) => setReflectionPrompt(e.target.value)}
              rows={2}
              placeholder="A question to prompt deeper thinking..."
            />
          </div>
          <div className="flex justify-end gap-2">
            <Button
              type="button"
              variant="ghost"
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={saving} className="font-semibold">
              {saving ? "Saving..." : existing ? "Update" : "Create"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

// --- Delete Button ---

function DeleteButton({
  label,
  onDelete,
}: {
  label: string;
  onDelete: () => Promise<{ error?: string; success?: boolean }>;
}) {
  const router = useRouter();
  const [confirming, setConfirming] = useState(false);

  async function handleDelete() {
    await onDelete();
    setConfirming(false);
    router.refresh();
  }

  if (confirming) {
    return (
      <div className="flex gap-1">
        <Button variant="destructive" size="sm" onClick={handleDelete}>
          Confirm
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setConfirming(false)}
        >
          Cancel
        </Button>
      </div>
    );
  }

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={() => setConfirming(true)}
    >
      Delete
    </Button>
  );
}
