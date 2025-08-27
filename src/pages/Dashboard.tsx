import React from 'react';
import { Layout } from '../components/Layout';
import { TaskTable } from '../components/TaskTable';
import { TaskForm } from '../components/TaskForm';
import { useTasks } from '../hooks/useTasks';
import { CheckSquare } from 'lucide-react';

export function Dashboard() {
  const { 
    tasks, 
    loading, 
    sortField, 
    sortDirection, 
    handleSort, 
    createTask, 
    updateTask, 
    deleteTask, 
    updateTaskStatus 
  } = useTasks();

  const activeTasks = tasks.filter(task => task.status !== 'completed');

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-indigo-100 rounded-lg">
              <CheckSquare className="h-6 w-6 text-indigo-600" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Your Tasks</h1>
              <p className="text-sm text-gray-600">Helping you keep track of your onboarding journey with Bolt</p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-indigo-600">{activeTasks.length}</div>
            <div className="text-xs text-gray-500 uppercase tracking-wide">Active Tasks</div>
          </div>
        </div>

        <div className="max-w-4xl mx-auto">
          <TaskForm onSubmit={createTask} />
        </div>

        <div className="max-w-4xl mx-auto">
          {loading ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600 mx-auto mb-3"></div>
              <p className="text-sm text-gray-600">Loading tasks...</p>
            </div>
          ) : activeTasks.length === 0 ? (
            <div className="text-center py-8">
              <div className="p-3 bg-gray-100 rounded-xl inline-block mb-3">
                <CheckSquare className="h-8 w-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-1">No tasks yet</h3>
              <p className="text-sm text-gray-600">Create your first task to get started!</p>
            </div>
          ) : (
            <TaskTable
              tasks={activeTasks}
              sortField={sortField}
              sortDirection={sortDirection}
              onSort={handleSort}
              onUpdate={updateTask}
              onDelete={deleteTask}
              onStatusChange={updateTaskStatus}
            />
          )}
        </div>
      </div>
    </Layout>
  );
}