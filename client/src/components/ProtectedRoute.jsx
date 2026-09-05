import { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'

function ProtectedRoute({ children }) {
  const [session, setSession] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const getSession = async () => {
      const { data } = await supabase.auth.getSession()

      setSession(data.session)
      setLoading(false)
    }

    getSession()
  }, [])

  if (loading) {
    return (
      <main className="min-h-screen bg-black text-white flex items-center justify-center">
        <p>Checking authentication...</p>
      </main>
    )
  }

  if (!session) {
    return <Navigate to="/admin/login" replace />
  }

  return children
}

export default ProtectedRoute
