'use client';

import AuthGuard from '@/components/AuthGuard';
import TaskAssignForm from '@/components/TaskAssignForm';

export default function AssignTaskPage({ params }) {
  return (
    <AuthGuard requiredRole="Supervisor">
      <TaskAssignForm taskId={params.id} />
    </AuthGuard>
  );
}