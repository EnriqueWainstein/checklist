'use client';

import AuthGuard from '@/components/AuthGuard';
import TaskForm from '@/components/TaskForm';

export default function EditTaskPage({ params }) {
  return (
    <AuthGuard requiredRole="Supervisor">
      <TaskForm taskId={params.id} />
    </AuthGuard>
  );
}