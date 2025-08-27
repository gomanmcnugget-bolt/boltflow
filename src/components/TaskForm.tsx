import React, { useState } from 'react';
import { Plus, X } from 'lucide-react';

interface TaskFormProps {
  onSubmit: (data: {
    title: string;
    description?: string;
    priority: 'low' | 'medium' | 'high';
  }) => Promise<void>;
}

export function TaskForm({ onSubmit }: TaskFormProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState<'low' | 'medium' | 'high'>('medium');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    setLoading(true);
    try {
      await onSubmit({
        title: title.trim(),
        description: description.trim() || undefined,
        priority,
      });
      
      // Reset form
      setTitle('');
      setDescription('');
      setPriority('medium');
      setIsOpen(false);
    } catch (error) {
      console.error('Error creating task:', error);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="w-full bg-indigo-600 text-white rounded-lg p-3 hover:bg-indigo-700 transition-colors flex items-center justify-center space-x-2 shadow-sm"
      >
        <Plus className="h-5 w-5" />
        <span className="font-medium">Add New Task</span>
      </button>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-base font-semibold text-gray-900">Create New Task</h3>
        <button
          onClick={() => setIsOpen(false)}
          className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X className="h-5 w-5" />
        </button>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-3">
        <div>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Task title"
            className="w-full text-base font-medium border-0 border-b-2 border-gray-200 focus:border-indigo-500 outline-none bg-transparent pb-2"
            required
          />
        </div>
        
        <div>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Task description (optional)"
            className="w-full text-sm text-gray-600 border border-gray-200 rounded-lg p-2 focus:border-indigo-500 outline-none resize-none"
            rows={2}
          />
        </div>
        
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">Priority</label>
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value as 'low' | 'medium' | 'high')}
            className="w-full border border-gray-200 rounded-lg px-2 py-1.5 text-sm focus:border-indigo-500 outline-none"
          >
            <option value="low">🌱 Low Priority</option>
            <option value="medium">⚡ Medium Priority</option>
            <option value="high">🔥 High Priority</option>
          </select>
        </div>
        
        <div className="flex items-center space-x-2 pt-2">
          <button
            type="submit"
            disabled={loading || !title.trim()}
            className="flex-1 bg-indigo-600 text-white rounded-lg py-2 text-sm font-medium hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {loading ? 'Creating...' : 'Create Task'}
          </button>
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            className="px-4 py-2 border border-gray-300 text-gray-700 text-sm rounded-lg hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}