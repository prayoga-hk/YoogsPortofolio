import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'
import {
  Code,
  FolderGit2,
  GraduationCap,
  Briefcase,
} from 'lucide-react'

function AdminDashboard() {
  const [stats, setStats] = useState({
    skills: 0,
    projects: 0,
    education: 0,
    experience: 0,
  })

  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadStats = async () => {
      const [
        skillsResult,
        projectsResult,
        educationResult,
        experienceResult,
      ] = await Promise.all([
        supabase
          .from('skills')
          .select('*', { count: 'exact', head: true }),

        supabase
          .from('projects')
          .select('*', { count: 'exact', head: true }),

        supabase
          .from('educations')
          .select('*', { count: 'exact', head: true }),

        supabase
          .from('experiences')
          .select('*', { count: 'exact', head: true }),
      ])

      setStats({
        skills: skillsResult.count ?? 0,
        projects: projectsResult.count ?? 0,
        education: educationResult.count ?? 0,
        experience: experienceResult.count ?? 0,
      })

      setLoading(false)
    }

    loadStats()
  }, [])

  const cards = [
    {
      name: 'Skills',
      value: stats.skills,
      icon: Code,
    },
    {
      name: 'Projects',
      value: stats.projects,
      icon: FolderGit2,
    },
    {
      name: 'Education',
      value: stats.education,
      icon: GraduationCap,
    },
    {
      name: 'Experience',
      value: stats.experience,
      icon: Briefcase,
    },
  ]

  return (
    <div>

      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">
          Dashboard
        </h1>

        <p className="mt-2 text-zinc-400">
          Kelola konten portfolio kamu dari sini.
        </p>
      </div>

      {/* Statistics */}
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

        {cards.map((card) => {
          const Icon = card.icon

          return (
            <div
              key={card.name}
              className="rounded-xl border border-zinc-800 bg-zinc-950 p-6"
            >
              <div className="flex items-center justify-between">

                <div>
                  <p className="text-sm text-zinc-400">
                    {card.name}
                  </p>

                  <p className="mt-2 text-3xl font-bold">
                    {loading ? '...' : card.value}
                  </p>
                </div>

                <div className="rounded-lg bg-red-600/10 p-3 text-red-500">
                  <Icon size={24} />
                </div>

              </div>
            </div>
          )
        })}

      </div>

    </div>
  )
}

export default AdminDashboard
