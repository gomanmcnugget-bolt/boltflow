import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { CheckSquare, User, LogOut, ExternalLink, Youtube, HelpCircle } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const { user, signOut } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      await signOut();
      navigate('/login');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const getUserName = () => {
    return user?.user_metadata?.name || user?.email?.split('@')[0] || 'User';
  };

  const getUserInitials = () => {
    const name = getUserName();
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-cyan-50">
      <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-8">
              <Link to="/dashboard" className="flex items-center space-x-2 text-indigo-600 hover:text-indigo-700 transition-colors">
                <CheckSquare className="h-8 w-8" />
                <span className="text-xl font-bold">BoltFlow</span>
              </Link>
              
              <nav className="hidden md:flex space-x-6">
                <Link
                  to="/dashboard"
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    location.pathname === '/dashboard'
                      ? 'bg-indigo-100 text-indigo-700'
                      : 'text-gray-600 hover:text-indigo-600'
                  }`}
                >
                  To Do
                </Link>
                <Link
                  to="/completed"
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    location.pathname === '/completed'
                      ? 'bg-indigo-100 text-indigo-700'
                      : 'text-gray-600 hover:text-indigo-600'
                  }`}
                >
                  Completed
                </Link>
                
                <div className="relative group">
                  <button className="px-3 py-2 rounded-md text-sm font-medium text-gray-600 hover:text-indigo-600 transition-colors flex items-center space-x-1">
                    <span>Resources</span>
                    <ExternalLink className="h-3 w-3" />
                  </button>
                  
                  <div className="absolute left-0 mt-2 w-56 bg-white rounded-md shadow-lg py-2 invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-all duration-200 z-50 border border-gray-100">
                    <a
                      href="https://www.youtube.com/@BoltDotNew"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                      <Youtube className="h-4 w-4 text-red-600" />
                      <div>
                        <div className="font-medium">YouTube Channel</div>
                        <div className="text-xs text-gray-500">Tutorials & updates</div>
                      </div>
                    </a>
                    <a
                      href="https://support.bolt.new/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                      <HelpCircle className="h-4 w-4 text-indigo-600" />
                      <div>
                        <div className="font-medium">Help Center</div>
                        <div className="text-xs text-gray-500">Support & documentation</div>
                      </div>
                    </a>
                  </div>
                </div>
              </nav>
            </div>

            <div className="flex items-center space-x-4">
              <div className="relative group">
                <Link 
                  to="/profile"
                  className="flex items-center space-x-2 text-gray-700 hover:text-indigo-600 transition-colors"
                >
                  <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center">
                    <span className="text-xs font-medium text-indigo-600">{getUserInitials()}</span>
                  </div>
                  <span className="hidden sm:block text-sm font-medium">{getUserName()}</span>
                </Link>
                
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-all duration-200">
                  <Link
                    to="/profile"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                  >
                    My Profile
                  </Link>
                  <button
                    onClick={handleSignOut}
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors flex items-center space-x-2"
                  >
                    <LogOut className="h-4 w-4" />
                    <span>Sign Out</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="min-h-[calc(100vh-8rem)]">
          {children}
        </div>
      </main>
    </div>
  );
}