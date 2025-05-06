import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import type { Omit } from 'utility-types';
import type { Project } from '@/types/project';

interface ProjectFormStepPreviewProps {
  values: Omit<Project, 'id' | 'createdAt'>;
}

export function ProjectFormStepPreview({ values }: ProjectFormStepPreviewProps) {
  return (
    <div className="space-y-6 max-h-[70vh] overflow-y-auto px-1">
      <div>
        <h3 className="font-semibold text-lg mb-2">Basic Info</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div><span className="font-medium">Title:</span> {values.title}</div>
          <div><span className="font-medium">Slug:</span> {values.slug}</div>
          <div><span className="font-medium">Category:</span> {values.category}</div>
          <div><span className="font-medium">Year:</span> {values.year ?? '-'}</div>
          <div><span className="font-medium">Client:</span> {values.client ?? '-'}</div>
          <div className="col-span-2">
            <span className="font-medium">Tags:</span> {values.tags.length > 0 ? values.tags.map(tag => <Badge key={tag} className="mr-1">{tag}</Badge>) : '-'}
          </div>
        </div>
      </div>
      <div>
        <h3 className="font-semibold text-lg mb-2">Media</h3>
        <div className="flex flex-col md:flex-row gap-6">
          <div>
            <div className="font-medium mb-1">Thumbnail</div>
            {values.thumbnail?.src ? (
              <Image src={values.thumbnail.src} alt={values.thumbnail.alt || ''} width={120} height={90} className="rounded border" />
            ) : (
              <div className="text-muted-foreground">No thumbnail</div>
            )}
            <div className="text-xs text-muted-foreground mt-1">{values.thumbnail?.alt}</div>
          </div>
          <div className="flex-1">
            <div className="font-medium mb-1">Images</div>
            <div className="flex flex-wrap gap-2">
              {values.images && values.images.length > 0 ? values.images.map((img, i) => (
                <div key={i} className="flex flex-col items-center">
                  <Image src={img.src} alt={img.alt || ''} width={80} height={60} className="rounded border" />
                  <div className="text-xs text-muted-foreground mt-1">{img.alt}</div>
                </div>
              )) : <div className="text-muted-foreground">No images</div>}
            </div>
          </div>
        </div>
      </div>
      <div>
        <h3 className="font-semibold text-lg mb-2">Details</h3>
        <div className="mb-2"><span className="font-medium">Description:</span> <span className="text-muted-foreground">{values.description}</span></div>
        <div className="mb-2"><span className="font-medium">Challenge:</span> <span className="text-muted-foreground">{values.challenge || '-'}</span></div>
        <div className="mb-2"><span className="font-medium">Solution:</span> <span className="text-muted-foreground">{values.solution || '-'}</span></div>
        <div className="flex items-center gap-2"><span className="font-medium">Featured:</span> <Switch checked={values.featured} disabled /></div>
      </div>
    </div>
  );
} 