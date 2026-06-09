"use client";

import { useSession, signOut } from "next-auth/react";
import { useCallback, useEffect, useState, useRef } from "react";
import axios from "axios";
import type { IProject } from "@/models/Project";
import type { IContactMessage } from "@/models/ContactMessage";
import Image from "next/image";

const fetchProjects = async () => {
  const { data } = await axios.get<IProject[]>("/api/projects");
  return data;
};

const fetchMessages = async () => {
  const { data } = await axios.get<IContactMessage[]>("/api/messages");
  return data;
};

export default function Dashboard() {
  const { status } = useSession();
  const isLoggedIn = status === "authenticated";
  const [projects, setProjects] = useState<IProject[]>([]);
  const [messages, setMessages] = useState<IContactMessage[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    id: '',
    title: '',
    category: '',
    cover: '',
    images: '',
    description: '',
    highlights: '',
    featured: false,
    youtubeVideoLink: '',
  });
  const toastContainerRef = useRef<HTMLDivElement>(null);

  // Toast function
  const showToast = (msg: string) => {
    if (!toastContainerRef.current) return;

    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = msg;
    toast.style.position = 'fixed';
    toast.style.bottom = '20px';
    toast.style.right = '20px';
    toast.style.background = 'var(--green)';
    toast.style.color = '#fff';
    toast.style.padding = '12px 18px';
    toast.style.borderRadius = '8px';
    toast.style.fontSize = '14px';
    toast.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.4)';
    toast.style.zIndex = '100';
    toast.style.animation = 'slideIn 0.3s ease';
    toastContainerRef.current.appendChild(toast);

    setTimeout(() => {
      toast.remove();
    }, 2500);
  };

  // Escape function for HTML
  const escapeHtml = (str: string) => {
    return String(str ?? '').replace(/[&<>"']/g, (c) => ({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#39;'
    }[c]!));
  };

  const refreshProjects = useCallback(async () => {
    try {
      setProjects(await fetchProjects());
    } catch (error) {
      console.error("Failed to load projects", error);
    }
  }, []);

  const refreshMessages = useCallback(async () => {
    try {
      setMessages(await fetchMessages());
    } catch (error) {
      console.error("Failed to load messages", error);
    }
  }, []);

  // Load dashboard data after NextAuth confirms the session.
  useEffect(() => {
    if (!isLoggedIn) {
      return;
    }

    let ignore = false;

    void fetchProjects()
      .then((data) => {
        if (!ignore) {
          setProjects(data);
        }
      })
      .catch((error) => {
        console.error("Failed to load projects", error);
      });

    void fetchMessages()
      .then((data) => {
        if (!ignore) {
          setMessages(data);
        }
      })
      .catch((error) => {
        console.error("Failed to load messages", error);
      });

    return () => {
      ignore = true;
    };
  }, [isLoggedIn]);

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const target = e.target as HTMLInputElement;
    const { name, value, type, checked } = target;
    setFormData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  // Handle project form submit
  const handleProjectSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = {
      id: (form.elements.namedItem('id') as HTMLInputElement).value,
      title: (form.elements.namedItem('title') as HTMLInputElement).value,
      category: (form.elements.namedItem('category') as HTMLInputElement).value,
      cover: (form.elements.namedItem('cover') as HTMLInputElement).value,
      images: (form.elements.namedItem('images') as HTMLTextAreaElement).value,
      description: (form.elements.namedItem('description') as HTMLTextAreaElement).value,
      highlights: (form.elements.namedItem('highlights') as HTMLTextAreaElement).value,
      featured: (form.elements.namedItem('featured') as HTMLInputElement).checked,
      isFeatured: (form.elements.namedItem('featured') as HTMLInputElement).checked,
      youtubeVideoLink: (form.elements.namedItem('youtubeVideoLink') as HTMLInputElement).value,
    };

    if (!data.title) {
      showToast("Title is required");
      return;
    }

    try {
      if (editingId) {
        await axios.patch("/api/projects", { ...data, id: editingId });
        showToast("Project updated");
      } else {
        await axios.post("/api/projects", data);
        showToast("Project added");
      }

      setEditingId(null);
      setFormData(blankForm());
      refreshProjects();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (error) {
      console.error("Failed to save project", error);
      showToast("Failed to save project");
    }
  };

  // Blank form
  const blankForm = () => ({
    id: '',
    title: '',
    category: '',
    cover: '',
    images: '',
    description: '',
    highlights: '',
    featured: false,
    youtubeVideoLink: '',
  });

  // Project to form data
  const projectToForm = (project: IProject) => {
    return {
      id: project._id || project.id || '',
      title: project.title || '',
      category: project.category || '',
      cover: project.cover || project.thumbnailImage || '',
      images: (project.images || []).join('\n'),
      description: project.description || '',
      highlights: (project.highlights || []).join('\n'),
      featured: project.isFeatured === true,
      youtubeVideoLink: project.youtubeVideoLink || '',
    };
  };

  // Handle edit
  const handleEdit = (project: IProject) => {
    setEditingId(project._id || project.id || null);
    setFormData(projectToForm(project));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Handle delete
  const handleDelete = async (id: string) => {
    if (confirm('Delete this project?')) {
      try {
        await axios.delete("/api/projects", { data: { id } });
        showToast("Deleted");
        refreshProjects();
      } catch (error) {
        console.error("Failed to delete project", error);
        showToast("Failed to delete project");
      }
    }
  };

  // Handle message delete
  const handleDeleteMessage = async (id: string) => {
    if (confirm('Delete this message?')) {
      try {
        await axios.delete("/api/messages", { data: { id } });
        showToast("Message deleted");
        refreshMessages();
      } catch (error) {
        console.error("Failed to delete message", error);
        showToast("Failed to delete message");
      }
    }
  };

  // Handle reset
  const handleReset = async () => {
    if (confirm('Reset to default 7 projects?')) {
      try {
        await axios.post("/api/projects/reset");
        showToast("Reset done");
        setEditingId(null);
        setFormData(blankForm());
        refreshProjects();
      } catch (error) {
        console.error("Failed to reset projects", error);
        showToast("Failed to reset projects");
      }
    }
  };

  // Handle cancel
  const handleCancel = () => {
    setEditingId(null);
    setFormData(blankForm());
  };

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: 'var(--bg)' }}>
        <div style={{ color: 'var(--text)' }}>Loading...</div>
      </div>
    );
  }

  return (
    <div className="admin" style={{ background: 'var(--bg)', minHeight: '100vh' }}>
      <div ref={toastContainerRef}></div>

      {/* If not logged in, but NextAuth should handle login, so we'll redirect to login */}
      {!isLoggedIn ? null : (
        <div className="admin-wrap" style={{ maxWidth: '1100px', margin: '0 auto', padding: '40px 24px' }}>
          <div className="admin-head" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
            <div>
              <h1 style={{ fontSize: '24px', color: 'var(--text)' }}>Admin Panel</h1>
              <p style={{ color: 'var(--muted)', fontSize: '14px' }}>Manage projects shown on your portfolio</p>
            </div>
            <div style={{ display: 'flex', gap: '8px' }}>
              <a
                className="btn btn-ghost"
                href="/"
                target="_blank"
                style={{
                  background: 'transparent',
                  color: 'var(--text)',
                  border: '1px solid var(--border)',
                  padding: '10px 18px',
                  borderRadius: '8px',
                  fontWeight: '600',
                  fontSize: '14px',
                  cursor: 'pointer',
                  transition: 'all 0.25s',
                  textDecoration: 'none',
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.borderColor = 'var(--green-2)';
                  e.currentTarget.style.color = 'var(--green-2)';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.borderColor = 'var(--border)';
                  e.currentTarget.style.color = 'var(--text)';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                View Site
              </a>
              <button
                className="btn btn-ghost"
                onClick={handleReset}
                style={{
                  background: 'transparent',
                  color: 'var(--text)',
                  border: '1px solid var(--border)',
                  padding: '10px 18px',
                  borderRadius: '8px',
                  fontWeight: '600',
                  fontSize: '14px',
                  cursor: 'pointer',
                  transition: 'all 0.25s',
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.borderColor = 'var(--green-2)';
                  e.currentTarget.style.color = 'var(--green-2)';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.borderColor = 'var(--border)';
                  e.currentTarget.style.color = 'var(--text)';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                Reset to defaults
              </button>
              <button
                className="btn btn-primary"
                onClick={() => signOut()}
                style={{
                  background: 'var(--green)',
                  color: '#fff',
                  padding: '10px 18px',
                  borderRadius: '8px',
                  fontWeight: '600',
                  fontSize: '14px',
                  cursor: 'pointer',
                  border: 'none',
                  transition: 'all 0.25s cubic-bezier(0.4, 1, 0.4, 1)',
                  position: 'relative',
                  overflow: 'hidden',
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.background = 'var(--green-2)';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 8px 24px rgba(34, 197, 94, 0.35)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.background = 'var(--green)';
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                Logout
              </button>
            </div>
          </div>

          <div className="admin-card" style={{ background: 'var(--card-2)', border: '1px solid var(--border)', borderRadius: '14px', padding: '22px', marginBottom: '20px', transition: 'all 0.3s ease' }} onMouseOver={(e) => e.currentTarget.style.borderColor = 'var(--green-2)'} onMouseOut={(e) => e.currentTarget.style.borderColor = 'var(--border)'}>
            <h3 style={{ marginBottom: '14px', color: 'var(--green-2)' }}>{editingId ? 'Edit Project' : 'Add New Project'}</h3>
            <form id="projForm" onSubmit={handleProjectSubmit}>
              <input type="hidden" name="id" value={formData.id} />
              <div className="form-row" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '12px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', color: 'var(--muted)', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Title</label>
                  <input
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    required
                    style={{
                      width: '100%',
                      background: 'var(--card)',
                      border: '1px solid var(--border)',
                      color: 'var(--text)',
                      padding: '10px 12px',
                      borderRadius: '8px',
                      fontFamily: 'inherit',
                      fontSize: '14px',
                      transition: 'all 0.2s ease',
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = 'var(--green-2)';
                      e.target.style.boxShadow = '0 0 0 2px rgba(34, 197, 94, 0.15)';
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = 'var(--border)';
                      e.target.style.boxShadow = 'none';
                    }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', color: 'var(--muted)', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Category</label>
                  <input
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    placeholder="e.g. Poster Design"
                    style={{
                      width: '100%',
                      background: 'var(--card)',
                      border: '1px solid var(--border)',
                      color: 'var(--text)',
                      padding: '10px 12px',
                      borderRadius: '8px',
                      fontFamily: 'inherit',
                      fontSize: '14px',
                      transition: 'all 0.2s ease',
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = 'var(--green-2)';
                      e.target.style.boxShadow = '0 0 0 2px rgba(34, 197, 94, 0.15)';
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = 'var(--border)';
                      e.target.style.boxShadow = 'none';
                    }}
                  />
                </div>
              </div>
              <div className="form-row" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '12px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', color: 'var(--muted)', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Cover image URL</label>
                  <input
                    name="cover"
                    value={formData.cover}
                    onChange={handleInputChange}
                    placeholder="/assets/projects/p1.jpg or https://..."
                    style={{
                      width: '100%',
                      background: 'var(--card)',
                      border: '1px solid var(--border)',
                      color: 'var(--text)',
                      padding: '10px 12px',
                      borderRadius: '8px',
                      fontFamily: 'inherit',
                      fontSize: '14px',
                      transition: 'all 0.2s ease',
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = 'var(--green-2)';
                      e.target.style.boxShadow = '0 0 0 2px rgba(34, 197, 94, 0.15)';
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = 'var(--border)';
                      e.target.style.boxShadow = 'none';
                    }}
                  />
                </div>
              </div>
              <div className="form-row" style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '12px', marginBottom: '12px' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--text)', fontSize: '14px' }}>
                  <input
                    type="checkbox"
                    name="featured"
                    checked={formData.featured}
                    onChange={handleInputChange}
                    style={{ width: '16px', height: '16px', accentColor: 'var(--green-2)' }}
                  />
                  <span style={{ fontWeight: 600 }}>Show this project on home page</span>
                </label>
              </div>
              <div className="form-row" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '12px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', color: 'var(--muted)', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>YouTube video link</label>
                  <input
                    name="youtubeVideoLink"
                    value={formData.youtubeVideoLink}
                    onChange={handleInputChange}
                    placeholder="https://www.youtube.com/watch?v=..."
                    style={{
                      width: '100%',
                      background: 'var(--card)',
                      border: '1px solid var(--border)',
                      color: 'var(--text)',
                      padding: '10px 12px',
                      borderRadius: '8px',
                      fontFamily: 'inherit',
                      fontSize: '14px',
                      transition: 'all 0.2s ease',
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = 'var(--green-2)';
                      e.target.style.boxShadow = '0 0 0 2px rgba(34, 197, 94, 0.15)';
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = 'var(--border)';
                      e.target.style.boxShadow = 'none';
                    }}
                  />
                </div>
              </div>
              <div className="form-row" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '12px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', color: 'var(--muted)', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Gallery images (one URL per line)</label>
                  <textarea
                    name="images"
                    value={formData.images}
                    onChange={handleInputChange}
                    placeholder="One image URL per line"
                    style={{
                      width: '100%',
                      background: 'var(--card)',
                      border: '1px solid var(--border)',
                      color: 'var(--text)',
                      padding: '10px 12px',
                      borderRadius: '8px',
                      fontFamily: 'inherit',
                      fontSize: '14px',
                      transition: 'all 0.2s ease',
                      minHeight: '90px',
                      resize: 'vertical',
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = 'var(--green-2)';
                      e.target.style.boxShadow = '0 0 0 2px rgba(34, 197, 94, 0.15)';
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = 'var(--border)';
                      e.target.style.boxShadow = 'none';
                    }}
                  />
                </div>
              </div>
              <div className="form-row full" style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '12px', marginBottom: '12px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', color: 'var(--muted)', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Description</label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    style={{
                      width: '100%',
                      background: 'var(--card)',
                      border: '1px solid var(--border)',
                      color: 'var(--text)',
                      padding: '10px 12px',
                      borderRadius: '8px',
                      fontFamily: 'inherit',
                      fontSize: '14px',
                      transition: 'all 0.2s ease',
                      minHeight: '90px',
                      resize: 'vertical',
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = 'var(--green-2)';
                      e.target.style.boxShadow = '0 0 0 2px rgba(34, 197, 94, 0.15)';
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = 'var(--border)';
                      e.target.style.boxShadow = 'none';
                    }}
                  />
                </div>
              </div>
              <div className="form-row full" style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '12px', marginBottom: '12px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', color: 'var(--muted)', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Highlights (one per line)</label>
                  <textarea
                    name="highlights"
                    value={formData.highlights}
                    onChange={handleInputChange}
                    style={{
                      width: '100%',
                      background: 'var(--card)',
                      border: '1px solid var(--border)',
                      color: 'var(--text)',
                      padding: '10px 12px',
                      borderRadius: '8px',
                      fontFamily: 'inherit',
                      fontSize: '14px',
                      transition: 'all 0.2s ease',
                      minHeight: '90px',
                      resize: 'vertical',
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = 'var(--green-2)';
                      e.target.style.boxShadow = '0 0 0 2px rgba(34, 197, 94, 0.15)';
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = 'var(--border)';
                      e.target.style.boxShadow = 'none';
                    }}
                  />
                </div>
              </div>
              <div style={{ display: 'flex', gap: '10px', marginTop: '12px' }}>
                <button
                  className="btn btn-primary"
                  type="submit"
                  style={{
                    background: 'var(--green)',
                    color: '#fff',
                    padding: '10px 18px',
                    borderRadius: '8px',
                    fontWeight: '600',
                    fontSize: '14px',
                    cursor: 'pointer',
                    border: 'none',
                    transition: 'all 0.25s cubic-bezier(0.4, 1, 0.4, 1)',
                    position: 'relative',
                    overflow: 'hidden',
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.background = 'var(--green-2)';
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = '0 8px 24px rgba(34, 197, 94, 0.35)';
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.background = 'var(--green)';
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  {editingId ? 'Update Project' : 'Add Project'}
                </button>
                {editingId ? (
                  <button
                    className="btn btn-ghost"
                    type="button"
                    onClick={handleCancel}
                    style={{
                      background: 'transparent',
                      color: 'var(--text)',
                      border: '1px solid var(--border)',
                      padding: '10px 18px',
                      borderRadius: '8px',
                      fontWeight: '600',
                      fontSize: '14px',
                      cursor: 'pointer',
                      transition: 'all 0.25s',
                    }}
                    onMouseOver={(e) => {
                      e.currentTarget.style.borderColor = 'var(--green-2)';
                      e.currentTarget.style.color = 'var(--green-2)';
                      e.currentTarget.style.transform = 'translateY(-2px)';
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.borderColor = 'var(--border)';
                      e.currentTarget.style.color = 'var(--text)';
                      e.currentTarget.style.transform = 'translateY(0)';
                    }}
                  >
                    Cancel
                  </button>
                ) : ''}
              </div>
            </form>
          </div>

          <div className="admin-card" style={{ background: 'var(--card-2)', border: '1px solid var(--border)', borderRadius: '14px', padding: '22px', marginBottom: '20px', transition: 'all 0.3s ease' }} onMouseOver={(e) => e.currentTarget.style.borderColor = 'var(--green-2)'} onMouseOut={(e) => e.currentTarget.style.borderColor = 'var(--border)'}>
            <h3 style={{ marginBottom: '14px', color: 'var(--green-2)' }}>Messages ({messages.length})</h3>
            <div className="admin-list" style={{ display: 'grid', gap: '12px' }}>
              {messages.length > 0 ? messages.map((message) => (
                <article key={message._id || ''} style={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: '12px', padding: '14px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', gap: '12px', alignItems: 'flex-start', marginBottom: '6px' }}>
                    <div>
                      <h4 style={{ color: 'var(--text)', marginBottom: '2px', fontSize: '15px' }}>{message.name}</h4>
                      <p style={{ color: 'var(--muted)', fontSize: '12px', marginBottom: '0' }}>{message.email}</p>
                    </div>
                    <button
                      onClick={() => handleDeleteMessage(message._id || '')}
                      style={{ background: '#3a1a1a', color: '#ff6b6b', fontSize: '12px', padding: '6px 10px', borderRadius: '6px', border: 'none', cursor: 'pointer' }}
                    >
                      Delete
                    </button>
                  </div>
                  <p style={{ color: 'var(--text)', fontSize: '13px', lineHeight: 1.6, marginBottom: '8px', whiteSpace: 'pre-wrap' }}>{message.message}</p>
                  <p style={{ color: 'var(--muted)', fontSize: '11px', marginBottom: 0 }}>
                    {new Date(message.createdAt).toLocaleString()}
                  </p>
                </article>
              )) : (
                <p style={{ color: 'var(--muted)' }}>No messages yet.</p>
              )}
            </div>
          </div>

          <div className="admin-card" style={{ background: 'var(--card-2)', border: '1px solid var(--border)', borderRadius: '14px', padding: '22px', marginBottom: '20px', transition: 'all 0.3s ease' }} onMouseOver={(e) => e.currentTarget.style.borderColor = 'var(--green-2)'} onMouseOut={(e) => e.currentTarget.style.borderColor = 'var(--border)'}>
            <h3 style={{ marginBottom: '14px', color: 'var(--green-2)' }}>All Projects ({projects.length})</h3>
            <div className="admin-list" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '14px' }}>
              {projects.length > 0 ? projects.map((project) => {
                const projectId = project._id || project.id || '';
                const cover = project.cover || project.thumbnailImage || project.posterImage || '';
                return (
                  <div key={projectId} className="admin-item" style={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: '12px', padding: '14px', display: 'flex', gap: '12px', transition: 'all 0.25s ease' }} onMouseOver={(e) => {
                    e.currentTarget.style.borderColor = 'var(--green-2)';
                    e.currentTarget.style.transform = 'translateY(-2px)';
                  }} onMouseOut={(e) => {
                    e.currentTarget.style.borderColor = 'var(--border)';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}>
                    <Image
                      src={cover}
                      alt=""
                      height={80}
                      width={80}
                      onError={(e) => { (e.target as HTMLImageElement).style.opacity = '0.2'; }}
                      style={{ width: '80px', height: '80px', objectFit: 'cover', borderRadius: '8px', background: '#111' }}
                    />
                    <div className="info" style={{ flex: '1', minWidth: '0' }}>
                      <h4 style={{ fontSize: '14px', marginBottom: '4px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', color: 'var(--text)' }}>{escapeHtml(project.title)}</h4>
                      <p style={{ color: 'var(--muted)', fontSize: '12px', marginBottom: '8px' }}>{escapeHtml(project.category || '')}</p>
                      {project.isFeatured && (
                        <span style={{ display: 'inline-block', fontSize: '11px', padding: '4px 8px', borderRadius: '999px', background: 'rgba(34,197,94,.12)', color: 'var(--green-2)', fontWeight: 600, marginBottom: '8px' }}>
                          Featured
                        </span>
                      )}
                      <div className="row" style={{ display: 'flex', gap: '6px' }}>
                        <button
                          className="btn-edit"
                          onClick={() => handleEdit(project)}
                          style={{ background: 'var(--green-soft)', color: 'var(--green-2)', fontSize: '12px', padding: '6px 10px', borderRadius: '6px', border: 'none', cursor: 'pointer', transition: 'all 0.2s ease' }}
                          onMouseOver={(e) => {
                            e.currentTarget.style.background = 'var(--green)';
                            e.currentTarget.style.color = '#fff';
                          }}
                          onMouseOut={(e) => {
                            e.currentTarget.style.background = 'var(--green-soft)';
                            e.currentTarget.style.color = 'var(--green-2)';
                          }}
                        >
                          Edit
                        </button>
                        <button
                          className="btn-del"
                          onClick={() => handleDelete(projectId)}
                          style={{ background: '#3a1a1a', color: '#ff6b6b', fontSize: '12px', padding: '6px 10px', borderRadius: '6px', border: 'none', cursor: 'pointer', transition: 'all 0.2s ease' }}
                          onMouseOver={(e) => {
                            e.currentTarget.style.background = '#ff6b6b';
                            e.currentTarget.style.color = '#fff';
                          }}
                          onMouseOut={(e) => {
                            e.currentTarget.style.background = '#3a1a1a';
                            e.currentTarget.style.color = '#ff6b6b';
                          }}
                        >
                          Delete
                        </button>
                        <a
                          className="btn-edit"
                          href={`/projects/${projectId}`}
                          target="_blank"
                          style={{ background: 'var(--green-soft)', color: 'var(--green-2)', fontSize: '12px', padding: '6px 10px', borderRadius: '6px', border: 'none', cursor: 'pointer', transition: 'all 0.2s ease', textDecoration: 'none', display: 'inline-block' }}
                          onMouseOver={(e) => {
                            e.currentTarget.style.background = 'var(--green)';
                            e.currentTarget.style.color = '#fff';
                          }}
                          onMouseOut={(e) => {
                            e.currentTarget.style.background = 'var(--green-soft)';
                            e.currentTarget.style.color = 'var(--green-2)';
                          }}
                        >
                          View
                        </a>
                      </div>
                    </div>
                  </div>
                );
              }) : (
                <p style={{ color: 'var(--muted)' }}>No projects yet.</p>
              )}
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes slideIn {
          from {
            transform: translateY(20px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
        @media (max-width: 880px) {
          .admin-list {
            grid-template-columns: 1fr !important;
          }
        }
        @media (max-width: 560px) {
          .form-row {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}
