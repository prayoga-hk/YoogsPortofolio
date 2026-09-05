import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'

function AdminLogin() {
  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')


  const handleLogin = async (e) => {
    e.preventDefault()

    setLoading(true)
    setError('')

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      setError(error.message)
    } else {
      navigate('/admin')
    }

    setLoading(false)
  }

  return (
    <main className="min-h-screen bg-black text-white flex items-center justify-center px-4">
      <form
        onSubmit={handleLogin}
        className="w-full max-w-md space-y-5 rounded-2xl border border-zinc-800 bg-zinc-950 p-8"
      >
        <div>
          <h1 className="text-3xl font-bold">Admin Login</h1>
          <p className="mt-2 text-zinc-400">
            Masuk ke panel admin portfolio
          </p>
        </div>

        <div>
          <label className="mb-2 block text-sm text-zinc-300">
            Email
          </label>

          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="admin@email.com"
            required
            className="w-full rounded-lg border border-zinc-700 bg-zinc-900 px-4 py-3 outline-none focus:border-red-500"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm text-zinc-300">
            Password
          </label>

          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            required
            className="w-full rounded-lg border border-zinc-700 bg-zinc-900 px-4 py-3 outline-none focus:border-red-500"
          />
        </div>

        {error && (
          <p className="text-sm text-red-400">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-lg bg-red-600 px-4 py-3 font-semibold transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>
    </main>
  )
}

export default AdminLogin
