import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabase'
import { Save, Image, Images, MapPin, GraduationCap, User } from 'lucide-react'

function Profile() {
  const [profileId, setProfileId] = useState(null)

  const [form, setForm] = useState({
    name: '',
    title: '',
    subtitle: '',
    description: '',
    photo_url: '',
    gallery_urls: '',
    location: '',
    school: '',
    major: '',
    about: '',
  })

  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

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
          gallery_urls: data.gallery_urls ?? '',
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

  const handleChange = (e) => {
    const { name, value } = e.target

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

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
        gallery_urls: form.gallery_urls,
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
      <div className="flex items-center justify-center min-h-[400px] text-slate-400">
        Memuat profile...
      </div>
    )
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6">

      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center">
            <User size={20} className="text-red-500" />
          </div>

          <div>
            <h1 className="text-2xl font-bold text-white">
              Profile
            </h1>
            <p className="text-sm text-slate-400">
              Kelola informasi profile dan foto portfolio
            </p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">

        {/* Informasi Utama */}
        <section className="bg-[#0f131c] border border-[#2d3342] rounded-2xl p-5 sm:p-6">
          <div className="flex items-center gap-3 mb-5">
            <User size={18} className="text-red-500" />

            <div>
              <h2 className="font-semibold text-white">
                Informasi Utama
              </h2>
              <p className="text-xs text-slate-500">
                Informasi yang ditampilkan pada halaman utama
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

            <Input
              label="Nama"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Nama lengkap"
            />

            <Input
              label="Title"
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="Junior Web Developer"
            />

            <Input
              label="Subtitle"
              name="subtitle"
              value={form.subtitle}
              onChange={handleChange}
              placeholder="Siswa SMK RPL"
            />

            <Input
              label="Lokasi"
              name="location"
              value={form.location}
              onChange={handleChange}
              placeholder="Malang, Indonesia"
              icon={<MapPin size={15} />}
            />

            <Input
              label="Sekolah"
              name="school"
              value={form.school}
              onChange={handleChange}
              placeholder="Nama sekolah"
              icon={<GraduationCap size={15} />}
            />

            <Input
              label="Jurusan"
              name="major"
              value={form.major}
              onChange={handleChange}
              placeholder="Rekayasa Perangkat Lunak"
            />

          </div>

          <div className="mt-5">
            <Textarea
              label="Deskripsi Singkat"
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="Deskripsi singkat tentang diri kamu..."
            />
          </div>
        </section>


        {/* Foto Profile */}
        <section className="bg-[#0f131c] border border-[#2d3342] rounded-2xl p-5 sm:p-6">

          <div className="flex items-center gap-3 mb-6">
            <div className="w-9 h-9 rounded-lg bg-red-500/10 flex items-center justify-center">
              <Image size={18} className="text-red-500" />
            </div>

            <div>
              <h2 className="font-semibold text-white">
                Foto Profile
              </h2>
              <p className="text-xs text-slate-500">
                Foto utama yang digunakan pada bagian About
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[180px_1fr] gap-6 items-start">

            {/* Preview */}
            <div className="w-full max-w-[180px] mx-auto lg:mx-0">
              <div className="aspect-[4/5] rounded-xl overflow-hidden border border-[#2d3342] bg-[#0a0e16]">
                {form.photo_url ? (
                  <img
                    src={form.photo_url}
                    alt="Profile preview"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none'
                    }}
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center text-slate-600 gap-2">
                    <Image size={28} />
                    <span className="text-xs">
                      Belum ada foto
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* URL */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                URL Foto Utama
              </label>

              <input
                type="url"
                name="photo_url"
                value={form.photo_url}
                onChange={handleChange}
                placeholder="https://example.com/profile.jpg"
                className="w-full px-4 py-3 rounded-xl bg-[#0a0e16] border border-[#2d3342] text-white placeholder:text-slate-600 outline-none focus:border-red-500 transition"
              />

              <p className="text-xs text-slate-500 mt-2">
                Foto ini menjadi foto utama profile.
              </p>
            </div>

          </div>
        </section>


        {/* Gallery */}
        <section className="bg-[#0f131c] border border-[#2d3342] rounded-2xl p-5 sm:p-6">

          <div className="flex items-center gap-3 mb-6">
            <div className="w-9 h-9 rounded-lg bg-red-500/10 flex items-center justify-center">
              <Images size={18} className="text-red-500" />
            </div>

            <div>
              <h2 className="font-semibold text-white">
                Gallery Profile
              </h2>

              <p className="text-xs text-slate-500">
                Foto tambahan yang ditampilkan sebagai carousel di Hero
              </p>
            </div>
          </div>

          <label className="block text-sm font-medium text-slate-300 mb-2">
            URL Foto Gallery
          </label>

          <textarea
            name="gallery_urls"
            value={form.gallery_urls}
            onChange={handleChange}
            rows={6}
            placeholder={`https://example.com/foto-1.jpg
https://example.com/foto-2.jpg
https://example.com/foto-3.jpg`}
            className="w-full px-4 py-3 rounded-xl bg-[#0a0e16] border border-[#2d3342] text-white placeholder:text-slate-600 outline-none focus:border-red-500 transition resize-none font-mono text-sm"
          />

          <div className="mt-3 flex items-start gap-2 text-xs text-slate-500">
            <span className="text-red-500">●</span>
            <p>
              Satu URL untuk setiap baris. Foto utama tidak perlu
              dimasukkan lagi ke sini.
            </p>
          </div>
        </section>


        {/* About */}
        <section className="bg-[#0f131c] border border-[#2d3342] rounded-2xl p-5 sm:p-6">

          <div className="mb-5">
            <h2 className="font-semibold text-white">
              About
            </h2>

            <p className="text-xs text-slate-500 mt-1">
              Informasi lengkap tentang profile kamu
            </p>
          </div>

          <Textarea
            label="Tentang Saya"
            name="about"
            value={form.about}
            onChange={handleChange}
            placeholder="Ceritakan tentang diri kamu..."
            rows={8}
          />
        </section>


        {/* Pesan */}
        {message && (
          <div className="px-4 py-3 rounded-xl border border-green-500/20 bg-green-500/10 text-green-400 text-sm">
            {message}
          </div>
        )}

        {error && (
          <div className="px-4 py-3 rounded-xl border border-red-500/20 bg-red-500/10 text-red-400 text-sm">
            {error}
          </div>
        )}


        {/* Save */}
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={saving}
            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-red-500 hover:bg-red-600 disabled:opacity-50 disabled:cursor-not-allowed text-white font-medium transition"
          >
            <Save size={17} />

            {saving ? 'Menyimpan...' : 'Simpan Profile'}
          </button>
        </div>

      </form>
    </div>
  )
}


/* =========================
   Reusable Components
========================= */

function Input({
  label,
  name,
  value,
  onChange,
  placeholder,
  icon,
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-slate-300 mb-2">
        {label}
      </label>

      <div className="relative">
        {icon && (
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500">
            {icon}
          </span>
        )}

        <input
          type="text"
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={`w-full ${
            icon ? 'pl-10' : 'px-4'
          } py-3 rounded-xl bg-[#0a0e16] border border-[#2d3342] text-white placeholder:text-slate-600 outline-none focus:border-red-500 transition`}
        />
      </div>
    </div>
  )
}


function Textarea({
  label,
  name,
  value,
  onChange,
  placeholder,
  rows = 5,
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-slate-300 mb-2">
        {label}
      </label>

      <textarea
        name={name}
        value={value}
        onChange={onChange}
        rows={rows}
        placeholder={placeholder}
        className="w-full px-4 py-3 rounded-xl bg-[#0a0e16] border border-[#2d3342] text-white placeholder:text-slate-600 outline-none focus:border-red-500 transition resize-none"
      />
    </div>
  )
}

export default Profile
