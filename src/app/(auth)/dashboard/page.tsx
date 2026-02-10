"use client";

import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import axios from "axios";
import { Plus, Trash2, LogOut, Pencil, Eye, EyeOff, X } from "lucide-react";
import { IProject } from "@/models/Project";
import Image from "next/image";
import { toast } from "sonner";

type ProjectForm = {
  title: string;
  description: string;
  thumbnailImage: string;
  posterImage: string;
  accessibleLink?: string;
};

export default function Dashboard() {
  const { status } = useSession();
  const router = useRouter();
  const [projects, setProjects] = useState<IProject[]>([]);
  const { register, handleSubmit, reset } = useForm<ProjectForm>();
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [elementsImages, setElementsImages] = useState<string[]>([]);
  const [elementInput, setElementInput] = useState("");
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [deletePassword, setDeletePassword] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  const loadProjects = async (signal?: AbortSignal) => {
    const { data } = await axios.get<IProject[]>("/api/projects", { signal });
    return data;
  };

  useEffect(() => {
    if (status !== "authenticated") return;
    const controller = new AbortController();
    loadProjects(controller.signal)
      .then((data) => setProjects(data))
      .catch(() => {});
    return () => controller.abort();
  }, [status]);

  const onSubmit: SubmitHandler<ProjectForm> = async (data) => {
    try {
      if (!data.title?.trim()) {
        toast.error("Title is required");
        return;
      }
      if (!data.description?.trim()) {
        toast.error("Description is required");
        return;
      }
      if (!data.thumbnailImage?.trim() && !data.posterImage?.trim()) {
        toast.error("Please provide at least a thumbnail or a poster image");
        return;
      }
      if (editingId) {
        await axios.patch("/api/projects", {
          id: editingId,
          ...data,
          elementsImages,
        });
      } else {
        await axios.post("/api/projects", {
          ...data,
          published: true,
          elementsImages,
        });
      }
      setIsAdding(false);
      setEditingId(null);
      setElementsImages([]);
      setElementInput("");
      reset();
      const updated = await loadProjects();
      setProjects(updated);
    } catch (error) {
      const message =
        axios.isAxiosError(error)
          ? (error.response?.data as { error?: string; details?: string })?.error ||
            (error.response?.data as { details?: string })?.details
          : undefined;
      console.error("Failed to save project", error);
      toast.error(message || "Failed to save project");
    }
  };

  const handleAddElementImage = () => {
    const url = elementInput.trim();
    if (!url) return;
    setElementsImages((prev) => [...prev, url]);
    setElementInput("");
  };

  const handleRemoveElementImage = (idx: number) => {
    setElementsImages((prev) => prev.filter((_, i) => i !== idx));
  };

  const startEdit = (project: IProject) => {
    setIsAdding(true);
    setEditingId(project._id || null);
    setElementsImages(project.elementsImages || []);
    setElementInput("");
    reset({
      title: project.title,
      description: project.description,
      thumbnailImage: project.thumbnailImage,
      posterImage: project.posterImage,
      accessibleLink: project.accessibleLink,
    });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setIsAdding(false);
    setElementsImages([]);
    setElementInput("");
    reset();
  };

  const togglePublish = async (project: IProject) => {
    try {
      await axios.patch("/api/projects", {
        id: project._id,
        published: !project.published,
      });
      const updated = await loadProjects();
      setProjects(updated);
    } catch (error) {
      console.error("Failed to update publish status", error);
      toast.error("Failed to update publish status");
    }
  };

  const confirmDelete = (project: IProject) => {
    setDeleteId(project._id || null);
    setDeletePassword("");
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    setIsDeleting(true);
    try {
      await axios.delete("/api/projects", {
        data: { id: deleteId, password: deletePassword },
      });
      setDeleteId(null);
      setDeletePassword("");
      const updated = await loadProjects();
      setProjects(updated);
    } catch (error) {
      const statusCode = axios.isAxiosError(error) ? error.response?.status : undefined;
      console.error("Failed to delete project", error);
      if (statusCode === 403) {
        toast.error("Wrong password. You have been logged out.");
        await signOut({ callbackUrl: "/login" });
      } else {
        toast.error("Failed to delete project. Check your password.");
      }
    } finally {
      setIsDeleting(false);
    }
  };

  if (status === "loading") return <div className="p-8">Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <button 
            onClick={() => signOut()}
            className="flex items-center gap-2 px-4 py-2 bg-red-500/10 text-red-500 rounded-lg hover:bg-red-500/20"
          >
            <LogOut className="w-4 h-4" /> Sign Out
          </button>
        </div>

        {/* Add Project Form */}
        <div className="mb-8">
          <button 
            onClick={() => (isAdding ? cancelEdit() : setIsAdding(true))}
            className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90"
          >
            <Plus className="w-4 h-4" /> {isAdding ? "Cancel" : "Add New Project"}
          </button>

          {isAdding && (
            <form onSubmit={handleSubmit(onSubmit)} className="mt-4 bg-white dark:bg-black p-6 rounded-xl shadow-sm space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input {...register("title", { required: true })} placeholder="Project Title" className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg" />
                <input {...register("description", { required: true })} placeholder="Description" className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg" />
                <input {...register("thumbnailImage")} placeholder="Thumbnail URL (Optional)" className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg" />
                <input {...register("posterImage")} placeholder="Poster URL (Optional)" className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg" />
                <input {...register("accessibleLink")} placeholder="Live Link (Optional)" className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg" />
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium mb-2">Elements Images</label>
                  <div className="flex gap-2">
                    <input
                      value={elementInput}
                      onChange={(e) => setElementInput(e.target.value)}
                      placeholder="Paste image URL and click Add"
                      className="flex-1 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg"
                    />
                    <button
                      type="button"
                      onClick={handleAddElementImage}
                      className="px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800"
                    >
                      Add
                    </button>
                  </div>
                  {elementsImages.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-2">
                      {elementsImages.map((url, idx) => (
                        <span key={`${url}-${idx}`} className="inline-flex items-center gap-2 px-3 py-1 bg-gray-100 dark:bg-gray-800 rounded-full text-xs">
                          <span className="max-w-[180px] truncate">{url}</span>
                          <button
                            type="button"
                            onClick={() => handleRemoveElementImage(idx)}
                            className="text-gray-500 hover:text-red-500"
                            aria-label="Remove image"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-3">
                <button type="submit" className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
                  {editingId ? "Update Project" : "Save Project"}
                </button>
                {editingId && (
                  <button type="button" onClick={cancelEdit} className="px-6 py-2 bg-gray-200 dark:bg-gray-800 rounded-lg">
                    Cancel Edit
                  </button>
                )}
              </div>
            </form>
          )}
        </div>

        {/* Project List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
             <div key={project._id} className="bg-white dark:bg-black rounded-xl overflow-hidden shadow-sm border border-gray-200 dark:border-gray-800">
               <div className="relative h-48 w-full bg-gray-100 dark:bg-gray-800">
                 {(project.thumbnailImage || project.posterImage) ? (
                   <Image
                     src={project.thumbnailImage || project.posterImage || ""}
                     alt={project.title}
                     fill
                     sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                     className="object-cover"
                   />
                 ) : (
                   <div className="absolute inset-0 flex items-center justify-center text-sm text-gray-400">
                     No image
                   </div>
                 )}
               </div>
               <div className="p-4">
                 <h3 className="font-bold mb-1">{project.title}</h3>
                 <p className="text-gray-500 text-sm mb-4 truncate">{project.description}</p>
                 <div className="flex flex-wrap justify-between items-center gap-2 text-sm">
                    <span className={`px-2 py-1 rounded-full ${project.published ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                      {project.published ? 'Published' : 'Draft'}
                    </span>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => togglePublish(project)}
                        className="px-2 py-1 rounded-lg bg-gray-100 dark:bg-gray-800"
                      >
                        {project.published ? (
                          <span className="inline-flex items-center gap-1"><EyeOff className="w-4 h-4" />Unpublish</span>
                        ) : (
                          <span className="inline-flex items-center gap-1"><Eye className="w-4 h-4" />Publish</span>
                        )}
                      </button>
                      <button onClick={() => startEdit(project)} className="text-blue-600 hover:text-blue-700">
                        <Pencil className="w-4 h-4" />
                      </button>
                      <button onClick={() => confirmDelete(project)} className="text-red-500 hover:text-red-700">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                 </div>
               </div>
             </div>
          ))}
        </div>

        {deleteId && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
            <div className="w-full max-w-md rounded-xl bg-white dark:bg-black p-6 border border-gray-200 dark:border-gray-800">
              <h3 className="text-lg font-bold mb-2">Confirm Delete</h3>
              <p className="text-sm text-gray-500 mb-4">
                Enter your admin password to delete this project.
              </p>
              <input
                type="password"
                value={deletePassword}
                onChange={(e) => setDeletePassword(e.target.value)}
                className="w-full p-3 rounded-lg bg-gray-50 dark:bg-gray-800"
                placeholder="Admin password"
              />
              <div className="mt-4 flex items-center gap-3 justify-end">
                <button
                  onClick={() => setDeleteId(null)}
                  className="px-4 py-2 rounded-lg bg-gray-200 dark:bg-gray-800"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDelete}
                  disabled={!deletePassword || isDeleting}
                  className="px-4 py-2 rounded-lg bg-red-600 text-white disabled:opacity-60"
                >
                  {isDeleting ? "Deleting..." : "Delete"}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
