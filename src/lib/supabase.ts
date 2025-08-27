import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://placeholder.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'placeholder-key';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Database = {
  public: {
    Tables: {
      tasks: {
        Row: {
          id: string;
          title: string;
          description: string | null;
          priority: 'low' | 'medium' | 'high';
          status: 'to_do' | 'in_progress' | 'completed';
          user_id: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          description?: string | null;
          priority?: 'low' | 'medium' | 'high';
          status?: 'to_do' | 'in_progress' | 'completed';
          user_id: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          title?: string;
          description?: string | null;
          priority?: 'low' | 'medium' | 'high';
          status?: 'to_do' | 'in_progress' | 'completed';
          user_id?: string;
          created_at?: string;
          updated_at?: string;
        };
      };
    };
  };
};