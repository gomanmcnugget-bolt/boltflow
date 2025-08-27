import React from 'react';
import { Layout } from '../components/Layout';
import { TaskTable } from '../components/TaskTable';
import { useTasks } from '../hooks/useTasks';
import { CheckCircle } from 'lucide-react';

export function Completed() {
  const { 
    tasks, 
    loading, 
    sortField, 
    sortDirection, 
    handleSort, 
    updateTask, 
    deleteTask, 
    updateTaskStatus 
  } = useTasks();

  const completedTasks = tasks.filter(task => task.status === 'completed');

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-green-100 rounded-lg">
              <CheckCircle className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Completed Tasks</h1>
              <p className="text-sm text-gray-600">Celebrate your achievements</p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-green-600">{completedTasks.length}</div>
            <div className="text-xs text-gray-500 uppercase tracking-wide">Completed</div>
          </div>
        </div>

        <div className="max-w-4xl mx-auto">
          {loading ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600 mx-auto mb-3"></div>
              <p className="text-sm text-gray-600">Loading completed tasks...</p>
            </div>
          ) : completedTasks.length === 0 ? (
            <div className="text-center py-8">
              <div className="p-3 bg-gray-100 rounded-xl inline-block mb-3">
                <CheckCircle className="h-8 w-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-1">No completed tasks yet</h3>
              <p className="text-sm text-gray-600">Complete some tasks to see them here!</p>
            </div>
          ) : (
            <TaskTable
              tasks={completedTasks}
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