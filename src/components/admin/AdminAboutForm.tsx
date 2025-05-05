'use client';

import { useEffect, useState, useTransition } from 'react';
import { getAbout, updateAbout, createAbout, AboutData } from '@/lib/actions/about-actions';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';

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
          <label className="block font-medium mb-1">Image URL</label>
          <Input value={image} onChange={e => setImage(e.target.value)} />
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