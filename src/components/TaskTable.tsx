import React from 'react';
import { Task, SortField, SortDirection } from '../hooks/useTasks';
import { ChevronUp, ChevronDown, Edit2, Trash2, Calendar, Flag } from 'lucide-react';

interface TaskTableProps {
  tasks: Task[];
  sortField: SortField;
  sortDirection: SortDirection;
  onSort: (field: SortField) => void;
  onUpdate: (id: string, updates: Partial<Task>) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
  onStatusChange: (id: string, status: 'to_do' | 'in_progress' | 'completed') => Promise<void>;
}

export function TaskTable({ 
  tasks, 
  sortField, 
  sortDirection, 
  onSort, 
  onUpdate, 
  onDelete, 
  onStatusChange 
}: TaskTableProps) {
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'text-red-600 bg-red-50 border-red-200';
      case 'medium':
        return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'low':
        return 'text-green-600 bg-green-50 border-green-200';
      default:
        return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getPriorityEmoji = (priority: string) => {
    switch (priority) {
      case 'high': return '🔥';
      case 'medium': return '⚡';
      case 'low': return '🌱';
      default: return '📝';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'text-green-600 bg-green-50 border-green-200';
      case 'in_progress':
        return 'text-blue-600 bg-blue-50 border-blue-200';
      case 'to_do':
        return 'text-gray-600 bg-gray-50 border-gray-200';
      default:
        return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getStatusEmoji = (status: string) => {
    switch (status) {
      case 'completed': return '✅';
      case 'in_progress': return '🔄';
      case 'to_do': return '📋';
      default: return '📋';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'completed': return 'Completed';
      case 'in_progress': return 'In Progress';
      case 'to_do': return 'To Do';
      default: return 'To Do';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const SortButton = ({ field, children }: { field: SortField; children: React.ReactNode }) => (
    <button
      onClick={() => onSort(field)}
      className="flex items-center justify-between w-full text-left font-medium text-gray-700 hover:text-indigo-600 transition-colors group"
    >
      <span>{children}</span>
      <div className="flex flex-col">
        <ChevronUp 
          className={`h-3 w-3 transition-colors ${
            sortField === field && sortDirection === 'asc' 
              ? 'text-indigo-600' 
              : 'text-gray-400 group-hover:text-gray-600'
          }`} 
        />
        <ChevronDown 
          className={`h-3 w-3 -mt-1 transition-colors ${
            sortField === field && sortDirection === 'desc' 
              ? 'text-indigo-600' 
              : 'text-gray-400 group-hover:text-gray-600'
          }`} 
        />
      </div>
    </button>
  );

  if (tasks.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="p-4 bg-gray-100 rounded-2xl inline-block mb-4">
          <Flag className="h-12 w-12 text-gray-400" />
        </div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">No tasks found</h3>
        <p className="text-gray-600">Create your first task to get started!</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-4 text-left cursor-pointer hover:bg-gray-100 transition-colors">
                <SortButton field="title">Task</SortButton>
              </th>
              <th className="px-6 py-4 text-left cursor-pointer hover:bg-gray-100 transition-colors">
                <SortButton field="priority">Priority</SortButton>
              </th>
              <th className="px-6 py-4 text-left cursor-pointer hover:bg-gray-100 transition-colors">
                <SortButton field="status">Status</SortButton>
              </th>
              <th className="px-6 py-4 text-left cursor-pointer hover:bg-gray-100 transition-colors">
                <SortButton field="created_at">Date Added</SortButton>
              </th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {tasks.map((task) => (
              <tr key={task.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4">
                  <div>
                    <h3 className="font-medium text-gray-900">{task.title}</h3>
                    {task.description && (
                      <p className="text-sm text-gray-600 mt-1">{task.description}</p>
                    )}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${getPriorityColor(task.priority)}`}>
                    <Flag className="h-3 w-3 mr-1" />
                    {getPriorityEmoji(task.priority)} {task.priority}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <select
                    value={task.status}
                    onChange={(e) => onStatusChange(task.id, e.target.value as 'to_do' | 'in_progress' | 'completed')}
                    className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border cursor-pointer ${getStatusColor(task.status)}`}
                  >
                    <option value="to_do">📋 To Do</option>
                    <option value="in_progress">🔄 In Progress</option>
                    <option value="completed">✅ Completed</option>
                  </select>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center text-sm text-gray-600">
                    <Calendar className="h-4 w-4 mr-2" />
                    {formatDate(task.created_at)}
                  </div>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end space-x-2">
                    <button
                      onClick={() => {
                        const newTitle = prompt('Edit task title:', task.title);
                        if (newTitle && newTitle.trim()) {
                          onUpdate(task.id, { title: newTitle.trim() });
                        }
                      }}
                      className="p-2 text-gray-400 hover:text-indigo-600 transition-colors rounded-lg hover:bg-indigo-50"
                    >
                      <Edit2 className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => {
                        if (confirm('Are you sure you want to delete this task?')) {
                          onDelete(task.id);
                        }
                      }}
                      className="p-2 text-gray-400 hover:text-red-600 transition-colors rounded-lg hover:bg-red-50"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}