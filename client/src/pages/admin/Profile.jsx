import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabase'
import { Save } from 'lucide-react'

function Profile() {
  const [profileId, setProfileId] = useState(null)

  const [form, setForm] = useState({
    name: '',
    title: '',
    subtitle: '',
    description: '',
    photo_url: '',
    location: '',
    school: '',
    major: '',
    about: '',
  })

  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  // Mengambil data profile
  useEffect(() => {
    const loadProfile = async () => {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .limit(1)
        .single()

      if (error) {
        setError(error.message)
      } else {
        setProfileId(data.id)

        setForm({
          name: data.name ?? '',
          title: data.title ?? '',
          subtitle: data.subtitle ?? '',
          description: data.description ?? '',
          photo_url: data.photo_url ?? '',
          location: data.location ?? '',
          school: data.school ?? '',
          major: data.major ?? '',
          about: data.about ?? '',
        })
      }

      setLoading(false)
    }

    loadProfile()
  }, [])

  // Mengubah nilai form
  const handleChange = (e) => {
    const { name, value } = e.target

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  // Menyimpan perubahan
  const handleSubmit = async (e) => {
    e.preventDefault()

    setSaving(true)
    setMessage('')
    setError('')

    const { error } = await supabase
      .from('profiles')
      .update({
        name: form.name,
        title: form.title,
        subtitle: form.subtitle,
        description: form.description,
        photo_url: form.photo_url,
        location: form.location,
        school: form.school,
        major: form.major,
        about: form.about,
        updated_at: new Date().toISOString(),
      })
      .eq('id', profileId)

    if (error) {
      setError(error.message)
    } else {
      setMessage('Profile berhasil disimpan!')
    }

    setSaving(false)
  }

  if (loading) {
    return (
      <div>
        <h1 className="text-3xl font-bold">Profile</h1>
        <p className="mt-4 text-zinc-400">
          Memuat data profile...
        </p>
      </div>
    )
  }

  if (error && !profileId) {
    return (
      <div>
        <h1 className="text-3xl font-bold">Profile</h1>

        <div className="mt-6 rounded-lg border border-red-900 bg-red-950/30 p-4 text-red-400">
          {error}
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-4xl">

      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">
          Profile
        </h1>

        <p className="mt-2 text-zinc-400">
          Kelola informasi profile portfolio.
        </p>
      </div>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="mt-8 space-y-6 rounded-xl border border-zinc-800 bg-zinc-950 p-6"
      >

        {/* Name */}
        <div>
          <label className="mb-2 block text-sm font-medium text-zinc-300">
            Nama
          </label>

          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            className="w-full rounded-lg border border-zinc-700 bg-zinc-900 px-4 py-3 text-white outline-none focus:border-red-500"
            required
          />
        </div>

        {/* Title */}
        <div>
          <label className="mb-2 block text-sm font-medium text-zinc-300">
            Title
          </label>

          <input
            type="text"
            name="title"
            value={form.title}
            onChange={handleChange}
            className="w-full rounded-lg border border-zinc-700 bg-zinc-900 px-4 py-3 text-white outline-none focus:border-red-500"
          />
        </div>

        {/* Subtitle */}
        <div>
          <label className="mb-2 block text-sm font-medium text-zinc-300">
            Subtitle
          </label>

          <input
            type="text"
            name="subtitle"
            value={form.subtitle}
            onChange={handleChange}
            className="w-full rounded-lg border border-zinc-700 bg-zinc-900 px-4 py-3 text-white outline-none focus:border-red-500"
          />
        </div>

        {/* Description */}
        <div>
          <label className="mb-2 block text-sm font-medium text-zinc-300">
            Description
          </label>

          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            rows="4"
            className="w-full resize-none rounded-lg border border-zinc-700 bg-zinc-900 px-4 py-3 text-white outline-none focus:border-red-500"
          />
        </div>

        {/* Photo URL */}
        <div>
          <label className="mb-2 block text-sm font-medium text-zinc-300">
            Photo URL
          </label>

          <input
            type="url"
            name="photo_url"
            value={form.photo_url}
            onChange={handleChange}
            placeholder="https://..."
            className="w-full rounded-lg border border-zinc-700 bg-zinc-900 px-4 py-3 text-white outline-none focus:border-red-500"
          />
        </div>

        {/* Location */}
        <div>
          <label className="mb-2 block text-sm font-medium text-zinc-300">
            Location
          </label>

          <input
            type="text"
            name="location"
            value={form.location}
            onChange={handleChange}
            className="w-full rounded-lg border border-zinc-700 bg-zinc-900 px-4 py-3 text-white outline-none focus:border-red-500"
          />
        </div>

        {/* School */}
        <div>
          <label className="mb-2 block text-sm font-medium text-zinc-300">
            School
          </label>

          <input
            type="text"
            name="school"
            value={form.school}
            onChange={handleChange}
            className="w-full rounded-lg border border-zinc-700 bg-zinc-900 px-4 py-3 text-white outline-none focus:border-red-500"
          />
        </div>

        {/* Major */}
        <div>
          <label className="mb-2 block text-sm font-medium text-zinc-300">
            Major
          </label>

          <input
            type="text"
            name="major"
            value={form.major}
            onChange={handleChange}
            className="w-full rounded-lg border border-zinc-700 bg-zinc-900 px-4 py-3 text-white outline-none focus:border-red-500"
          />
        </div>

        {/* About */}
        <div>
          <label className="mb-2 block text-sm font-medium text-zinc-300">
            About
          </label>

          <textarea
            name="about"
            value={form.about}
            onChange={handleChange}
            rows="6"
            className="w-full resize-none rounded-lg border border-zinc-700 bg-zinc-900 px-4 py-3 text-white outline-none focus:border-red-500"
          />
        </div>

        {/* Error */}
        {error && (
          <div className="rounded-lg border border-red-900 bg-red-950/30 p-4 text-sm text-red-400">
            {error}
          </div>
        )}

        {/* Success */}
        {message && (
          <div className="rounded-lg border border-green-900 bg-green-950/30 p-4 text-sm text-green-400">
            {message}
          </div>
        )}

        {/* Save */}
        <button
          type="submit"
          disabled={saving}
          className="flex items-center gap-2 rounded-lg bg-red-600 px-5 py-3 font-semibold transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <Save size={18} />

          {saving ? 'Menyimpan...' : 'Simpan Perubahan'}
        </button>

      </form>

    </div>
  )
}

export default Profile
