'use client';

import { useState } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { AdminAboutForm } from './AdminAboutForm';
import { AdminProjectsPanel } from './AdminProjectsPanel';
import { AdminContactForm } from './AdminContactForm';

export function AdminDashboard() {
  const [tab, setTab] = useState('about');

  return (
    <div className="min-h-screen bg-muted/30 py-12">
      <div className="container max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center">Admin Dashboard</h1>
        <Tabs value={tab} onValueChange={setTab} className="w-full">
          <TabsList className="flex justify-center gap-4 mb-8">
            <TabsTrigger value="about">About</TabsTrigger>
            <TabsTrigger value="projects">Projects</TabsTrigger>
            <TabsTrigger value="contact">Contact</TabsTrigger>
          </TabsList>
          <TabsContent value="about">
            <AdminAboutForm />
          </TabsContent>
          <TabsContent value="projects">
            <AdminProjectsPanel />
          </TabsContent>
          <TabsContent value="contact">
            <AdminContactForm />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
} 