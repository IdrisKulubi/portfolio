"use client";

import { useEffect, useState, useTransition } from "react";
import { getProjects, createProject, updateProject, deleteProject } from "@/lib/actions/project-actions";
import type { Project } from "@/types/project";
import { Button } from "@/components/ui/button";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { ProjectFormModal } from "./ProjectFormModal";
import { DeleteProjectDialog } from "./DeleteProjectDialog";
import { toast } from "sonner";

export function AdminProjectsPanel() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [selected, setSelected] = useState<Project | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [formMode, setFormMode] = useState<"add" | "edit">("add");
  const [deleteId, setDeleteId] = useState<string | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    getProjects().then(setProjects);
  }, []);

  const handleAdd = () => {
    setFormMode("add");
    setSelected(null);
    setShowForm(true);
  };

  const handleEdit = (project: Project) => {
    setFormMode("edit");
    setSelected(project);
    setShowForm(true);
  };

  const handleDelete = (id: string) => {
    setDeleteId(id);
  };

  const handleFormSubmit = async (data: Omit<Project, "id" | "createdAt">, id?: string) => {
    setShowForm(false);
    startTransition(async () => {
      try {
        let updated: Project | undefined;
        if (formMode === "add") {
          updated = await createProject(data);
          setProjects((prev) => [...prev, updated as Project]);
          toast.success("Project created");
        } else if (formMode === "edit" && id) {
          updated = await updateProject(id, data);
          setProjects((prev) => prev.map((p) => (p.id === id && updated ? updated : p)));
          toast.success("Project updated");
        }
      } catch (err) {
        console.error(err);
        toast.error("Failed to save project");
      }
    });
  };

  const handleDeleteConfirm = async () => {
    if (!deleteId) return;
    startTransition(async () => {
      try {
        await deleteProject(deleteId);
        setProjects((prev) => prev.filter((p) => p.id !== deleteId));
        toast.success("Project deleted");
      } catch (err) {
        console.error(err);
        toast.error("Failed to delete project");
      } finally {
        setDeleteId(null);
      }
    });
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Projects</h2>
        <Button onClick={handleAdd}>+ Add Project</Button>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Year</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Featured</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {projects.map((project) => (
            <TableRow key={project.id}>
              <TableCell>{project.title}</TableCell>
              <TableCell>{project.year ?? "-"}</TableCell>
              <TableCell>{project.category}</TableCell>
              <TableCell>{project.featured ? "Yes" : "No"}</TableCell>
              <TableCell>
                <Button size="sm" variant="outline" onClick={() => handleEdit(project)} className="mr-2">Edit</Button>
                <Button size="sm" variant="destructive" onClick={() => handleDelete(project.id)}>Delete</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <ProjectFormModal
        open={showForm}
        mode={formMode}
        project={selected}
        onClose={() => setShowForm(false)}
        onSubmit={handleFormSubmit}
      />
      <DeleteProjectDialog
        open={!!deleteId}
        onConfirm={handleDeleteConfirm}
        onCancel={() => setDeleteId(null)}
      />
    </div>
  );
} 