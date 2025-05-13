'use client';

import { useEffect, useState, useTransition } from 'react';
import { getAbout, updateAbout, createAbout, AboutData } from '@/lib/actions/about-actions';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { UploadButton } from '@/utils/uploadthing';
import Image from 'next/image';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Trash2 } from 'lucide-react';

interface ExperienceItem {
  company: string;
  role: string;
  start: string;
  end?: string;
  description?: string;
}

export function AdminAboutForm() {
  const [about, setAbout] = useState<AboutData & { id?: string } | null>(null);
  const [bio, setBio] = useState('');
  const [skills, setSkills] = useState('');
  const [headline, setHeadline] = useState('');
  const [subheadline, setSubheadline] = useState('');
  const [image, setImage] = useState('');
  const [experience, setExperience] = useState<ExperienceItem[]>([]);
  const [isPending, startTransition] = useTransition();
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);

  useEffect(() => {
    getAbout().then(data => {
      setAbout(
        data
          ? {
              ...data,
              experience: data.experience ?? [],
              hero: data.hero ?? undefined,
            }
          : null
      );
      setBio(data?.bio || '');
      setSkills((data?.skills || []).join(', '));
      setHeadline(data?.hero?.headline || '');
      setSubheadline(data?.hero?.subheadline || '');
      setImage(data?.hero?.image || '');
      setExperience(data?.experience ?? []);
    });
  }, []);

  const handleExpChange = (idx: number, field: keyof ExperienceItem, value: string) => {
    setExperience(exp => exp.map((item, i) => i === idx ? { ...item, [field]: value } : item));
  };
  const handleExpAdd = () => {
    setExperience(exp => [...exp, { company: '', role: '', start: '', end: '', description: '' }]);
  };
  const handleExpRemove = (idx: number) => {
    setExperience(exp => exp.filter((_, i) => i !== idx));
  };

  // Handle image deletion with confirmation
  const handleImageDelete = () => {
    setImage('');
    setConfirmDialogOpen(false);
    
    // Save the changes immediately after deletion
    if (about?.id) {
      startTransition(async () => {
        try {
          // Update DB with empty image
          const payload: AboutData = {
            bio,
            skills: skills.split(',').map(s => s.trim()).filter(Boolean),
            hero: { headline, subheadline, image: '' },
            experience: experience.filter(e => e.company && e.role && e.start),
          };
          
          const result = await updateAbout(about.id, payload);
          setAbout(
            result
              ? {
                  ...result,
                  experience: result.experience ?? [],
                  hero: result.hero ?? undefined,
                }
              : null
          );
          toast.success('Image deleted successfully');
        } catch (err) {
          console.error(err);
          toast.error('Failed to delete image');
        }
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSuccess('');
    setError('');
    startTransition(async () => {
      try {
        const payload: AboutData = {
          bio,
          skills: skills.split(',').map(s => s.trim()).filter(Boolean),
          hero: { headline, subheadline, image },
          experience: experience.filter(e => e.company && e.role && e.start),
        };
        let result;
        if (about?.id) {
          result = await updateAbout(about.id, payload);
        } else {
          result = await createAbout(payload);
        }
        setAbout(
          result
            ? {
                ...result,
                experience: result.experience ?? [],
                hero: result.hero ?? undefined,
              }
            : null
        );
        setSuccess('About info saved!');
        toast.success('About info saved!');
      } catch (err) {
        console.error(err);
        setError('Failed to save.');
        toast.error('Failed to save.');
      }
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block font-medium mb-1">Bio</label>
        <Textarea value={bio} onChange={e => setBio(e.target.value)} rows={5} required />
      </div>
      <div>
        <label className="block font-medium mb-1">Skills (comma separated)</label>
        <Input value={skills} onChange={e => setSkills(e.target.value)} required />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block font-medium mb-1">Headline</label>
          <Input value={headline} onChange={e => setHeadline(e.target.value)} />
        </div>
        <div>
          <label className="block font-medium mb-1">Subheadline</label>
          <Input value={subheadline} onChange={e => setSubheadline(e.target.value)} />
        </div>
        <div>
          <label className="block font-medium mb-1">Hero Image</label>
          <div className="flex flex-col gap-3">
            {image ? (
              <div className="space-y-3">
                <div className="relative">
                  <div className="w-full h-48 bg-muted/40 rounded-md border overflow-hidden relative">
                    <Image 
                      src={image} 
                      alt="Hero Image Preview" 
                      fill
                      className="object-contain"
                    />
                  </div>
                  
                  <AlertDialog open={confirmDialogOpen} onOpenChange={setConfirmDialogOpen}>
                    <AlertDialogTrigger asChild>
                      <Button
                        type="button"
                        size="icon"
                        variant="destructive"
                        className="absolute top-2 right-2 h-8 w-8 rounded-full"
                        title="Remove image"
                        aria-label="Remove image"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Delete Image?</AlertDialogTitle>
                        <AlertDialogDescription>
                          Are you sure you want to delete this image? This action cannot be undone.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={handleImageDelete}>Delete</AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
                
                <div className="grid grid-cols-1 gap-2">
                  <div>
                    <label className="text-xs text-muted-foreground">Image URL</label>
                    <Input 
                      value={image} 
                      onChange={(e) => setImage(e.target.value)}
                      className="text-sm" 
                      placeholder="Image URL"
                    />
                  </div>
                  <div className="flex justify-between">
                    <Button 
                      type="button" 
                      variant="outline" 
                      size="sm"
                      onClick={() => setImage("")}
                    >
                      Replace
                    </Button>
                    <Button 
                      type="submit" 
                      variant="secondary" 
                      size="sm"
                    >
                      Save Changes
                    </Button>
                  </div>
                </div>
              </div>
            ) : (
              <div>
                <UploadButton
                  endpoint="imageUploader"
                  onClientUploadComplete={(res) => {
                    if (res && res[0]) {
                      setImage(res[0].url);
                      toast.success('Image uploaded!');
                      
                      // Auto-save the image after upload if we have an existing record
                      if (about?.id) {
                        startTransition(async () => {
                          try {
                            const payload: AboutData = {
                              bio,
                              skills: skills.split(',').map(s => s.trim()).filter(Boolean),
                              hero: { headline, subheadline, image: res[0].url },
                              experience: experience.filter(e => e.company && e.role && e.start),
                            };
                            
                            const result = await updateAbout(about.id, payload);
                            if (result) {
                              setAbout({
                                ...result,
                                experience: result.experience ?? [],
                                hero: result.hero ?? undefined,
                              });
                              toast.success('Image saved to database!');
                            }
                          } catch (err) {
                            console.error(err);
                            toast.error('Failed to save image to database');
                          }
                        });
                      }
                    }
                  }}
                  onUploadError={(error) => {
                    toast.error(`Upload failed: ${error.message}`);
                  }}
                />
                <p className="text-xs text-muted-foreground mt-2">
                  Upload your profile/hero image. Recommended size: 800x800 pixels. Images will be displayed using object-contain to ensure they fit properly.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
      <div>
        <label className="block font-medium mb-2">Experience</label>
        <div className="space-y-4">
          {experience.map((exp, idx) => (
            <div key={idx} className="grid grid-cols-1 md:grid-cols-5 gap-2 items-end bg-muted/40 p-4 rounded-lg border">
              <Input
                className="md:col-span-1"
                placeholder="Company"
                value={exp.company}
                onChange={e => handleExpChange(idx, 'company', e.target.value)}
                required
              />
              <Input
                className="md:col-span-1"
                placeholder="Role"
                value={exp.role}
                onChange={e => handleExpChange(idx, 'role', e.target.value)}
                required
              />
              <Input
                className="md:col-span-1"
                placeholder="Start (e.g. Jan 2020)"
                value={exp.start}
                onChange={e => handleExpChange(idx, 'start', e.target.value)}
                required
              />
              <Input
                className="md:col-span-1"
                placeholder="End (optional)"
                value={exp.end || ''}
                onChange={e => handleExpChange(idx, 'end', e.target.value)}
              />
              <div className="flex gap-2 md:col-span-1">
                <Input
                  className="flex-1"
                  placeholder="Description (optional)"
                  value={exp.description || ''}
                  onChange={e => handleExpChange(idx, 'description', e.target.value)}
                />
                <Button type="button" variant="destructive" size="icon" onClick={() => handleExpRemove(idx)} title="Remove experience">
                  &times;
                </Button>
              </div>
            </div>
          ))}
          <Button type="button" variant="outline" onClick={handleExpAdd} className="mt-2">+ Add Experience</Button>
        </div>
      </div>
      {success && <div className="text-green-600 text-sm">{success}</div>}
      {error && <div className="text-destructive text-sm">{error}</div>}
      <Button type="submit" disabled={isPending}>{isPending ? 'Saving...' : 'Save'}</Button>
    </form>
  );
} 