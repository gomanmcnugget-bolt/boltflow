import React from 'react';
import { Database, AlertCircle, ExternalLink } from 'lucide-react';

export function DatabaseSetup() {
  const hasSupabaseConfig = 
    import.meta.env.VITE_SUPABASE_URL && 
    import.meta.env.VITE_SUPABASE_URL !== 'https://placeholder.supabase.co' &&
    import.meta.env.VITE_SUPABASE_ANON_KEY && 
    import.meta.env.VITE_SUPABASE_ANON_KEY !== 'placeholder-key';

  if (hasSupabaseConfig) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-cyan-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 text-center">
          <div className="flex justify-center mb-6">
            <div className="p-4 bg-amber-100 rounded-2xl">
              <Database className="h-12 w-12 text-amber-600" />
            </div>
          </div>
          
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Database Setup Required</h1>
          
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6">
            <div className="flex items-start space-x-3">
              <AlertCircle className="h-5 w-5 text-amber-600 mt-0.5 flex-shrink-0" />
              <div className="text-left">
                <p className="text-sm text-amber-800 font-medium mb-2">
                  To use authentication and task management features, you need to connect to Supabase.
                </p>
                <p className="text-sm text-amber-700">
                  Click the "Connect to Supabase" button in the top right corner to set up your database.
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-4 text-sm text-gray-600">
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <span>✅ User Authentication</span>
              <span className="text-amber-600">Pending Setup</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <span>✅ Task Management</span>
              <span className="text-amber-600">Pending Setup</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <span>✅ Profile Management</span>
              <span className="text-amber-600">Pending Setup</span>
            </div>
          </div>

          <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-sm text-blue-800">
              <strong>Demo Mode:</strong> The app interface is ready to explore, but database features require Supabase connection.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}