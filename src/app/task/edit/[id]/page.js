import TaskForm from '@/components/TaskEdit';

export default function EditTaskPage({ params }) {
  return <TaskForm taskId={params.id} />;
}