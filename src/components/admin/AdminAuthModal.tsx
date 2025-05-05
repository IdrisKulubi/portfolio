'use client';

import { useState, useTransition } from 'react';
import { checkAdminCode } from '@/lib/actions/admin-auth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

interface AdminAuthModalProps {
  open: boolean;
  onSuccess: () => void;
}

export function AdminAuthModal({ open, onSuccess }: AdminAuthModalProps) {
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const [isPending, startTransition] = useTransition();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    startTransition(async () => {
      const ok = await checkAdminCode(code);
      if (ok) {
        setCode('');
        onSuccess();
      } else {
        setError('Incorrect code. Please try again.');
      }
    });
  };

  return (
    <Dialog open={open}>
      <DialogContent className="max-w-sm">
        <DialogHeader>
          <DialogTitle>Admin Access</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            type="password"
            inputMode="numeric"
            pattern="[0-9]{4}"
            maxLength={4}
            minLength={4}
            autoFocus
            placeholder="Enter 4-digit code"
            value={code}
            onChange={e => setCode(e.target.value.replace(/\D/g, ''))}
            disabled={isPending}
          />
          {error && <div className="text-destructive text-sm">{error}</div>}
          <Button type="submit" className="w-full" disabled={isPending || code.length !== 4}>
            {isPending ? 'Checking...' : 'Enter'}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
} 