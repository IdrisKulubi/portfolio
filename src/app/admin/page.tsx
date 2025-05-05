'use client';

import { useState } from 'react';
import { AdminAuthModal } from '@/components/admin/AdminAuthModal';
import { AdminDashboard } from '@/components/admin/AdminDashboard';

export default function AdminPage() {
  const [isAuthed, setIsAuthed] = useState(false);

  return (
    <>
      <AdminAuthModal open={!isAuthed} onSuccess={() => setIsAuthed(true)} />
      {isAuthed && <AdminDashboard />}
    </>
  );
} 