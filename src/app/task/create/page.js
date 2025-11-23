'use client';

import AuthGuard from '@/components/AuthGuard';
import TaskForm from '@/components/TaskForm';

export default function CreateTaskPage() {
  return (
    <AuthGuard requiredRole="Supervisor">
      <TaskForm />
    </AuthGuard>
  );
}