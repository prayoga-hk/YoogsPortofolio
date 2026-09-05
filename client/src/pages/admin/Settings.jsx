import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { Save } from 'lucide-react';

export default function Settings() {
    const [settingsId, setSettingsId] = useState(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const [formData, setFormData] = useState({
        site_name: '',
        site_description: '',
        contact_email: '',
        location: '',
        footer_text: ''
    });

    // Fetch settings
    useEffect(() => {
        const fetchSettings = async () => {
            setLoading(true);
            setError(null);
            try {
                const { data, error } = await supabase
                    .from('site_settings')
                    .select('*')
                    .limit(1)
                    .single();

                if (error && error.code !== 'PGRST116') {
                    throw error;
                }

                if (data) {
                    setSettingsId(data.id);
                    setFormData({
                        site_name: data.site_name || '',
                        site_description: data.site_description || '',
                        contact_email: data.contact_email || '',
                        location: data.location || '',
                        footer_text: data.footer_text || ''
                    });
                }
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchSettings();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSave = async (e) => {
        e.preventDefault();
        setSaving(true);
        setError(null);
        setSuccess(null);

        try {
            const settingsData = {
                site_name: formData.site_name,
                site_description: formData.site_description,
                contact_email: formData.contact_email,
                location: formData.location,
                footer_text: formData.footer_text,
                updated_at: new Date().toISOString()
            };

            if (settingsId) {
                // Update
                const { error } = await supabase
                    .from('site_settings')
                    .update(settingsData)
                    .eq('id', settingsId);

                if (error) throw error;
                setSuccess('Settings berhasil diperbarui!');
            } else {
                // Create
                const { error } = await supabase
                    .from('site_settings')
                    .insert([{
                        ...settingsData,
                        created_at: new Date().toISOString()
                    }]);

                if (error) throw error;
                setSuccess('Settings berhasil dibuat!');

                // Ambil ID yang baru dibuat
                const { data, error: fetchError } = await supabase
                    .from('site_settings')
                    .select('id')
                    .limit(1)
                    .single();

                if (data) setSettingsId(data.id);
            }
        } catch (err) {
            setError(err.message);
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="text-zinc-400">Loading settings...</div>
            </div>
        );
    }

    return (
        <div className="p-6 max-w-4xl">
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-white">Settings</h1>
                <p className="text-zinc-400">Konfigurasi website portfolio</p>
            </div>

            {error && (
                <div className="bg-red-500/10 border border-red-500 text-red-500 px-4 py-3 rounded-lg mb-4">
                    {error}
                </div>
            )}
            {success && (
                <div className="bg-green-500/10 border border-green-500 text-green-500 px-4 py-3 rounded-lg mb-4">
                    {success}
                </div>
            )}

            <form onSubmit={handleSave} className="space-y-6">
                <div className="bg-zinc-800/50 border border-zinc-700 rounded-lg p-6">
                    <h3 className="text-white font-medium mb-4">Website Information</h3>

                    <div className="space-y-4">
                        <div>
                            <label className="block text-zinc-300 text-sm font-medium mb-1">
                                Site Name *
                            </label>
                            <input
                                type="text"
                                name="site_name"
                                value={formData.site_name}
                                onChange={handleChange}
                                required
                                className="w-full bg-zinc-700 border border-zinc-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-red-500 transition"
                                placeholder="Prayoga Husnul Khitam"
                            />
                        </div>

                        <div>
                            <label className="block text-zinc-300 text-sm font-medium mb-1">
                                Site Description
                            </label>
                            <textarea
                                name="site_description"
                                value={formData.site_description}
                                onChange={handleChange}
                                rows="2"
                                className="w-full bg-zinc-700 border border-zinc-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-red-500 transition resize-y"
                                placeholder="Personal portfolio of Prayoga Husnul Khitam"
                            />
                        </div>

                        <div>
                            <label className="block text-zinc-300 text-sm font-medium mb-1">
                                Contact Email
                            </label>
                            <input
                                type="email"
                                name="contact_email"
                                value={formData.contact_email}
                                onChange={handleChange}
                                className="w-full bg-zinc-700 border border-zinc-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-red-500 transition"
                                placeholder="prayoga@example.com"
                            />
                        </div>

                        <div>
                            <label className="block text-zinc-300 text-sm font-medium mb-1">
                                Location
                            </label>
                            <input
                                type="text"
                                name="location"
                                value={formData.location}
                                onChange={handleChange}
                                className="w-full bg-zinc-700 border border-zinc-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-red-500 transition"
                                placeholder="Jakarta, Indonesia"
                            />
                        </div>

                        <div>
                            <label className="block text-zinc-300 text-sm font-medium mb-1">
                                Footer Text
                            </label>
                            <input
                                type="text"
                                name="footer_text"
                                value={formData.footer_text}
                                onChange={handleChange}
                                className="w-full bg-zinc-700 border border-zinc-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-red-500 transition"
                                placeholder="© 2024 Prayoga Husnul Khitam"
                            />
                        </div>
                    </div>
                </div>

                <button
                    type="submit"
                    disabled={saving}
                    className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    <Save size={18} />
                    {saving ? 'Menyimpan...' : 'Simpan Settings'}
                </button>
            </form>
        </div>
    );
}
