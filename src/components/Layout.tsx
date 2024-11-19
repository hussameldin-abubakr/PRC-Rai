import React from 'react';
import { Link, Outlet } from '@tanstack/react-router';
import { BarChart3, Database, Map, Settings } from 'lucide-react';
import { cn } from '../lib/utils';

const navItems = [
  { icon: BarChart3, label: 'Overview', to: '/' },
  { icon: Database, label: 'Production', to: '/production' },
  { icon: Map, label: 'Field Map', to: '/map' },
  { icon: Settings, label: 'Settings', to: '/settings' },
];

export function Layout() {
  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <nav className="w-64 bg-white border-r border-gray-200 p-4">
        <div className="mb-8">
          <h1 className="text-xl font-bold text-gray-900">Murzuq Basin</h1>
          <p className="text-sm text-gray-500">Oil Field Dashboard</p>
        </div>
        <ul className="space-y-2">
          {navItems.map((item) => (
            <li key={item.to}>
              <Link
                to={item.to}
                className={({ isActive }) =>
                  cn(
                    'flex items-center gap-3 px-4 py-2 rounded-lg text-sm font-medium transition-colors',
                    isActive
                      ? 'bg-blue-50 text-blue-600'
                      : 'text-gray-600 hover:bg-gray-100'
                  )
                }
              >
                <item.icon size={20} />
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* Main content */}
      <main className="flex-1 p-8">
        <Outlet />
      </main>
    </div>
  );
}