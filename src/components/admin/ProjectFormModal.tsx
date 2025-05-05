"use client";

import { useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { PROJECT_CATEGORIES, Project, ProjectCategory, } from "@/types/project";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { UploadButton } from '@/utils/uploadthing';
import Image from 'next/image';

const imageSchema = z.object({
  src: z.string().url({ message: "Image URL required" }),
  alt: z.string().min(1, "Alt text required"),
  width: z.coerce.number().int().positive(),
  height: z.coerce.number().int().positive(),
});

const formSchema = z.object({
  title: z.string().min(1),
  slug: z.string().min(1),
  category: z.custom<ProjectCategory>(),
  tags: z.array(z.string().min(1)),
  thumbnail: imageSchema,
  images: z.array(imageSchema).min(1),
  client: z.string().optional(),
  year: z.coerce.number().int().min(1900).max(2100).optional(),
  description: z.string().min(1),
  challenge: z.string().optional(),
  solution: z.string().optional(),
  featured: z.boolean(),
});

type FormValues = z.infer<typeof formSchema>;

interface ProjectFormModalProps {
  open: boolean;
  mode: "add" | "edit";
  project: Project | null;
  onClose: () => void;
  onSubmit: (data: Omit<Project, "id" | "createdAt">, id?: string) => void;
}

export function ProjectFormModal({ open, mode, project, onClose, onSubmit }: ProjectFormModalProps) {
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: project
      ? {
          ...project,
          tags: project.tags,
          year: project.year ?? undefined,
          client: project.client ?? undefined,
        }
      : {
          title: "",
          slug: "",
          category: "branding",
          tags: [],
          thumbnail: { src: "", alt: "", width: 800, height: 600 },
          images: [{ src: "", alt: "", width: 800, height: 600 }],
          client: undefined,
          year: undefined,
          description: "",
          challenge: "",
          solution: "",
          featured: false,
        },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "images",
  });

  useEffect(() => {
    if (project) {
      reset({
        ...project,
        tags: project.tags,
        year: project.year ?? undefined,
        client: project.client ?? undefined,
      });
    } else {
      reset({
        title: "",
        slug: "",
        category: "branding",
        tags: [],
        thumbnail: { src: "", alt: "", width: 800, height: 600 },
        images: [{ src: "", alt: "", width: 800, height: 600 }],
        client: undefined,
        year: undefined,
        description: "",
        challenge: "",
        solution: "",
        featured: false,
      });
    }
  }, [project, reset, open]);

  return (
    <Dialog open={open} onOpenChange={v => !v && onClose()}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>{mode === "add" ? "Add Project" : "Edit Project"}</DialogTitle>
        </DialogHeader>
        <form
          onSubmit={handleSubmit((data) => {
            onSubmit(
              {
                ...data,
                client: data.client ?? null,
                year: data.year ?? null,
              },
              project?.id
            );
          })}
          className="space-y-4"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block font-medium mb-1">Title</label>
              <Input {...register("title")} />
              {errors.title && <div className="text-destructive text-xs">{errors.title.message}</div>}
            </div>
            <div>
              <label className="block font-medium mb-1">Slug</label>
              <Input {...register("slug")} />
              {errors.slug && <div className="text-destructive text-xs">{errors.slug.message}</div>}
            </div>
            <div>
              <label className="block font-medium mb-1">Category</label>
              <select {...register("category")} className="w-full border rounded px-2 py-1">
                {PROJECT_CATEGORIES.filter(c => c.value !== "all").map(c => (
                  <option key={c.value} value={c.value}>{c.label}</option>
                ))}
              </select>
              {errors.category && <div className="text-destructive text-xs">{errors.category.message as string}</div>}
            </div>
            <div>
              <label className="block font-medium mb-1">Tags (comma separated)</label>
              <Controller
                name="tags"
                control={control}
                render={({ field }) => (
                  <Input
                    placeholder="Comma separated"
                    value={field.value.join(", ")}
                    onChange={e =>
                      field.onChange(
                        e.target.value.split(",").map(t => t.trim()).filter(Boolean)
                      )
                    }
                  />
                )}
              />
              {errors.tags && <div className="text-destructive text-xs">{errors.tags.message as string}</div>}
            </div>
            <div>
              <label className="block font-medium mb-1">Year</label>
              <Input type="number" {...register("year")} />
              {errors.year && <div className="text-destructive text-xs">{errors.year.message as string}</div>}
            </div>
            <div>
              <label className="block font-medium mb-1">Client</label>
              <Input {...register("client")} />
              {errors.client && <div className="text-destructive text-xs">{errors.client.message as string}</div>}
            </div>
          </div>
          <div>
            <label className="block font-medium mb-1">Description</label>
            <Textarea {...register("description")} rows={3} />
            {errors.description && <div className="text-destructive text-xs">{errors.description.message}</div>}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block font-medium mb-1">Challenge</label>
              <Textarea {...register("challenge")} rows={2} />
              {errors.challenge && <div className="text-destructive text-xs">{errors.challenge.message as string}</div>}
            </div>
            <div>
              <label className="block font-medium mb-1">Solution</label>
              <Textarea {...register("solution")} rows={2} />
              {errors.solution && <div className="text-destructive text-xs">{errors.solution.message as string}</div>}
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block font-medium mb-1">Featured</label>
              <Controller
                name="featured"
                control={control}
                render={({ field }) => (
                  <Switch checked={field.value} onCheckedChange={field.onChange} />
                )}
              />
            </div>
            <div>
              <label className="block font-medium mb-1">Thumbnail</label>
              <div className="grid grid-cols-2 gap-2 items-center">
                <Controller
                  name="thumbnail"
                  control={control}
                  render={({ field }) => (
                    <div className="flex flex-col gap-2 w-full">
                      {field.value?.src && (
                        <Image src={field.value.src} alt={field.value.alt || ''} width={field.value.width || 100} height={field.value.height || 100} className="rounded border" />
                      )}
                      <UploadButton
                        endpoint="imageUploader"
                        onClientUploadComplete={(res) => {
                          if (res && res[0]) {
                            field.onChange({
                              ...field.value,
                              src: res[0].url,
                              width: field.value.width || 800,
                              height: field.value.height || 600,
                            });
                          }
                        }}
                        onUploadError={(error) => {
                          alert(`Upload failed: ${error.message}`);
                        }}
                      />
                      <Input placeholder="Alt text" value={field.value?.alt || ''} onChange={e => field.onChange({ ...field.value, alt: e.target.value })} />
                      <div className="flex gap-2">
                        <Input placeholder="Width" type="number" value={field.value?.width || ''} onChange={e => field.onChange({ ...field.value, width: Number(e.target.value) })} />
                        <Input placeholder="Height" type="number" value={field.value?.height || ''} onChange={e => field.onChange({ ...field.value, height: Number(e.target.value) })} />
                      </div>
                    </div>
                  )}
                />
              </div>
              {errors.thumbnail && <div className="text-destructive text-xs">{errors.thumbnail.message as string}</div>}
            </div>
          </div>
          <div>
            <label className="block font-medium mb-1">Images</label>
            {fields.map((field, idx) => (
              <div key={field.id} className="grid grid-cols-1 md:grid-cols-5 gap-2 items-end mb-2">
                <Controller
                  name={`images.${idx}`}
                  control={control}
                  render={({ field: imgField }) => (
                    <div className="flex flex-col gap-2 w-full">
                      {imgField.value?.src && (
                        <Image src={imgField.value.src} alt={imgField.value.alt || ''} width={imgField.value.width || 100} height={imgField.value.height || 100} className="rounded border" />
                      )}
                      <UploadButton
                        endpoint="imageUploader"
                        onClientUploadComplete={(res) => {
                          if (res && res[0]) {
                            imgField.onChange({
                              ...imgField.value,
                              src: res[0].url,
                              width: imgField.value.width || 800,
                              height: imgField.value.height || 600,
                            });
                          }
                        }}
                        onUploadError={(error) => {
                          alert(`Upload failed: ${error.message}`);
                        }}
                      />
                      <Input placeholder="Alt text" value={imgField.value?.alt || ''} onChange={e => imgField.onChange({ ...imgField.value, alt: e.target.value })} />
                      <div className="flex gap-2">
                        <Input placeholder="Width" type="number" value={imgField.value?.width || ''} onChange={e => imgField.onChange({ ...imgField.value, width: Number(e.target.value) })} />
                        <Input placeholder="Height" type="number" value={imgField.value?.height || ''} onChange={e => imgField.onChange({ ...imgField.value, height: Number(e.target.value) })} />
                      </div>
                      <Button type="button" variant="destructive" size="icon" onClick={() => remove(idx)} title="Remove image">&times;</Button>
                    </div>
                  )}
                />
              </div>
            ))}
            <Button type="button" variant="outline" onClick={() => append({ src: '', alt: '', width: 800, height: 600 })} className="mt-2">+ Add Image</Button>
            {errors.images && <div className="text-destructive text-xs">{errors.images.message as string}</div>}
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose} disabled={isSubmitting}>Cancel</Button>
            <Button type="submit" disabled={isSubmitting}>{isSubmitting ? "Saving..." : mode === "add" ? "Add Project" : "Save Changes"}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
} 