import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { LayoutDashboard, User, Code, FolderGit2, GraduationCap, Briefcase, Share2, Settings, LogOut } from 'lucide-react'
import { supabase } from '../lib/supabase'

function AdminLayout() {
  const navigate = useNavigate()

  const handleLogout = async () => {
    await supabase.auth.signOut()
    navigate('/admin/login')
  }

  const menuItems = [
    {
      name: 'Dashboard',
      path: '/admin',
      icon: LayoutDashboard,
      end: true,
    },
    {
      name: 'Profile',
      path: '/admin/profile',
      icon: User,
    },
    {
      name: 'Skills',
      path: '/admin/skills',
      icon: Code,
    },
    {
      name: 'Projects',
      path: '/admin/projects',
      icon: FolderGit2,
    },
    {
      name: 'Education',
      path: '/admin/education',
      icon: GraduationCap,
    },
    {
      name: 'Experience',
      path: '/admin/experience',
      icon: Briefcase,
    },
    {
      name: 'Social Links',
      path: '/admin/social-links',
      icon: Share2,
    },
    {
      name: 'Settings',
      path: '/admin/settings',
      icon: Settings,
    },
  ]

  return (
    <div className="min-h-screen bg-black text-white md:flex">

      {/* Sidebar */}
      <aside className="w-full border-b border-zinc-800 bg-zinc-950 md:min-h-screen md:w-64 md:border-b-0 md:border-r">

        <div className="p-6">
          <h1 className="text-xl font-bold">
            Admin Panel
          </h1>

          <p className="mt-1 text-sm text-zinc-500">
            Portfolio
          </p>
        </div>

        <nav className="px-3">
          {menuItems.map((item) => {
            const Icon = item.icon

            return (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.end}
                className={({ isActive }) =>
                  `mb-1 flex items-center gap-3 rounded-lg px-4 py-3 text-sm transition ${
                    isActive
                      ? 'bg-red-600 text-white'
                      : 'text-zinc-400 hover:bg-zinc-900 hover:text-white'
                  }`
                }
              >
                <Icon size={18} />
                {item.name}
              </NavLink>
            )
          })}
        </nav>

        <div className="mt-6 border-t border-zinc-800 p-3">
          <button
            onClick={handleLogout}
            className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-sm text-zinc-400 transition hover:bg-red-600 hover:text-white"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>

      </aside>

      {/* Content */}
      <main className="flex-1 p-6 md:p-8">
        <Outlet />
      </main>

    </div>
  )
}

export default AdminLayout
