import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { Plus, Edit, Trash2, X, Eye, EyeOff } from 'lucide-react';

export default function SocialLinks() {
    const [socialLinks, setSocialLinks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [editingLink, setEditingLink] = useState(null);
    const [formData, setFormData] = useState({
        platform: '',
        url: '',
        icon: '',
        is_active: true,
        order_index: 0
    });
    const [deleteConfirm, setDeleteConfirm] = useState(null);

    useEffect(() => {
        const fetchSocialLinks = async () => {
            setLoading(true);
            setError(null);
            try {
                const { data, error } = await supabase
                    .from('social_links')
                    .select('*')
                    .order('order_index', { ascending: true });

                if (error) throw error;
                setSocialLinks(data || []);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchSocialLinks();
    }, []);

    const openModal = (link = null) => {
        if (link) {
            setEditingLink(link);
            setFormData({
                platform: link.platform || '',
                url: link.url || '',
                icon: link.icon || '',
                is_active: link.is_active !== undefined ? link.is_active : true,
                order_index: link.order_index || 0
            });
        } else {
            setEditingLink(null);
            setFormData({
                platform: '',
                url: '',
                icon: '',
                is_active: true,
                order_index: socialLinks.length
            });
        }
        setShowModal(true);
        setError(null);
        setSuccess(null);
    };

    const closeModal = () => {
        setShowModal(false);
        setEditingLink(null);
        setFormData({
            platform: '',
            url: '',
            icon: '',
            is_active: true,
            order_index: 0
        });
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSave = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setSuccess(null);

        try {
            const linkData = {
                platform: formData.platform,
                url: formData.url,
                icon: formData.icon,
                is_active: formData.is_active,
                order_index: parseInt(formData.order_index) || 0,
                updated_at: new Date().toISOString()
            };

            if (editingLink) {
                const { error } = await supabase
                    .from('social_links')
                    .update(linkData)
                    .eq('id', editingLink.id);

                if (error) throw error;
                setSuccess('Social link berhasil diperbarui!');
            } else {
                const { error } = await supabase
                    .from('social_links')
                    .insert([{
                        ...linkData,
                        created_at: new Date().toISOString()
                    }]);

                if (error) throw error;
                setSuccess('Social link berhasil ditambahkan!');
            }

            closeModal();

            const { data, error: fetchError } = await supabase
                .from('social_links')
                .select('*')
                .order('order_index', { ascending: true });

            if (fetchError) throw fetchError;
            setSocialLinks(data || []);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        try {
            const { error } = await supabase
                .from('social_links')
                .delete()
                .eq('id', id);

            if (error) throw error;
            setSuccess('Social link berhasil dihapus!');
            setDeleteConfirm(null);

            const { data, error: fetchError } = await supabase
                .from('social_links')
                .select('*')
                .order('order_index', { ascending: true });

            if (fetchError) throw fetchError;
            setSocialLinks(data || []);
        } catch (err) {
            setError(err.message);
        }
    };

    const toggleActive = async (link) => {
        try {
            const { error } = await supabase
                .from('social_links')
                .update({
                    is_active: !link.is_active,
                    updated_at: new Date().toISOString()
                })
                .eq('id', link.id);

            if (error) throw error;

            const { data, error: fetchError } = await supabase
                .from('social_links')
                .select('*')
                .order('order_index', { ascending: true });

            if (fetchError) throw fetchError;
            setSocialLinks(data || []);
        } catch (err) {
            setError(err.message);
        }
    };

    if (loading && socialLinks.length === 0) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="text-zinc-400">Loading social links...</div>
            </div>
        );
    }

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-white">Social Links</h1>
                    <p className="text-zinc-400">Kelola link sosial media</p>
                </div>
                <button
                    onClick={() => openModal()}
                    className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition"
                >
                    <Plus size={20} />
                    Add Social Link
                </button>
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

            {socialLinks.length === 0 ? (
                <div className="bg-zinc-800/50 border border-zinc-700 rounded-lg p-12 text-center">
                    <p className="text-zinc-400">Belum ada social link. Tambahkan link pertama!</p>
                </div>
            ) : (
                <div className="bg-zinc-800/50 border border-zinc-700 rounded-lg overflow-x-auto">
                    <table className="w-full min-w-[600px]">
                        <thead className="bg-zinc-800 border-b border-zinc-700">
                            <tr>
                                <th className="text-left text-zinc-400 font-medium px-4 py-3">Platform</th>
                                <th className="text-left text-zinc-400 font-medium px-4 py-3">URL</th>
                                <th className="text-left text-zinc-400 font-medium px-4 py-3">Status</th>
                                <th className="text-right text-zinc-400 font-medium px-4 py-3">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {socialLinks.map((link) => (
                                <tr key={link.id} className="border-b border-zinc-700/50 hover:bg-zinc-700/30 transition">
                                    <td className="px-4 py-4">
                                        <span className="text-white font-medium">{link.platform}</span>
                                    </td>
                                    <td className="px-4 py-4">
                                        <a
                                            href={link.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-blue-400 hover:text-blue-300 hover:underline text-sm truncate max-w-xs block"
                                        >
                                            {link.url}
                                        </a>
                                    </td>
                                    <td className="px-4 py-4">
                                        <button
                                            onClick={() => toggleActive(link)}
                                            className={`flex items-center gap-1 px-3 py-1 rounded-full text-sm transition ${
                                                link.is_active
                                                    ? 'bg-green-500/20 text-green-500 hover:bg-green-500/30'
                                                    : 'bg-zinc-600/30 text-zinc-400 hover:bg-zinc-600/50'
                                            }`}
                                        >
                                            {link.is_active ? <Eye size={14} /> : <EyeOff size={14} />}
                                            {link.is_active ? 'Active' : 'Inactive'}
                                        </button>
                                    </td>
                                    <td className="px-4 py-4">
                                        <div className="flex justify-end gap-2">
                                            <button
                                                onClick={() => openModal(link)}
                                                className="p-2 text-blue-400 hover:text-blue-300 hover:bg-blue-500/10 rounded-lg transition"
                                            >
                                                <Edit size={18} />
                                            </button>
                                            <button
                                                onClick={() => setDeleteConfirm(link.id)}
                                                className="p-2 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition"
                                            >
                                                <Trash2 size={18} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {deleteConfirm && (
                <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
                    <div className="bg-zinc-800 rounded-lg p-6 max-w-md w-full border border-zinc-700">
                        <h3 className="text-xl font-bold text-white mb-2">Hapus Social Link?</h3>
                        <p className="text-zinc-400 mb-6">Social link ini akan dihapus secara permanen. Apakah Anda yakin?</p>
                        <div className="flex justify-end gap-3">
                            <button
                                onClick={() => setDeleteConfirm(null)}
                                className="px-4 py-2 text-zinc-400 hover:text-white transition"
                            >
                                Batal
                            </button>
                            <button
                                onClick={() => handleDelete(deleteConfirm)}
                                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition"
                            >
                                Hapus
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {showModal && (
                <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
                    <div className="bg-zinc-800 rounded-lg p-6 max-w-2xl w-full border border-zinc-700 max-h-[90vh] overflow-y-auto">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-xl font-bold text-white">
                                {editingLink ? 'Edit Social Link' : 'Tambah Social Link'}
                            </h3>
                            <button
                                onClick={closeModal}
                                className="text-zinc-400 hover:text-white transition"
                            >
                                <X size={24} />
                            </button>
                        </div>

                        <form onSubmit={handleSave}>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-zinc-300 text-sm font-medium mb-1">
                                        Platform *
                                    </label>
                                    <select
                                        name="platform"
                                        value={formData.platform}
                                        onChange={handleChange}
                                        required
                                        className="w-full bg-zinc-700 border border-zinc-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-red-500 transition"
                                    >
                                        <option value="">Pilih Platform</option>
                                        <option value="GitHub">GitHub</option>
                                        <option value="Instagram">Instagram</option>
                                        <option value="LinkedIn">LinkedIn</option>
                                        <option value="Email">Email</option>
                                        <option value="Website">Website</option>
                                        <option value="Twitter">Twitter</option>
                                        <option value="YouTube">YouTube</option>
                                        <option value="Facebook">Facebook</option>
                                        <option value="TikTok">TikTok</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-zinc-300 text-sm font-medium mb-1">
                                        URL *
                                    </label>
                                    <input
                                        type="url"
                                        name="url"
                                        value={formData.url}
                                        onChange={handleChange}
                                        required
                                        className="w-full bg-zinc-700 border border-zinc-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-red-500 transition"
                                        placeholder="https://github.com/username"
                                    />
                                </div>

                                <div>
                                    <label className="block text-zinc-300 text-sm font-medium mb-1">
                                        Icon (optional)
                                    </label>
                                    <input
                                        type="text"
                                        name="icon"
                                        value={formData.icon}
                                        onChange={handleChange}
                                        className="w-full bg-zinc-700 border border-zinc-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-red-500 transition"
                                        placeholder="e.g. SiGithub"
                                    />
                                    <p className="text-zinc-500 text-xs mt-1">
                                        Nama icon dari library yang digunakan
                                    </p>
                                </div>

                                <div>
                                    <label className="block text-zinc-300 text-sm font-medium mb-1">
                                        Order
                                    </label>
                                    <input
                                        type="number"
                                        name="order_index"
                                        value={formData.order_index}
                                        onChange={handleChange}
                                        className="w-full bg-zinc-700 border border-zinc-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-red-500 transition"
                                    />
                                </div>

                                <div className="flex items-center gap-3">
                                    <input
                                        type="checkbox"
                                        name="is_active"
                                        checked={formData.is_active}
                                        onChange={handleChange}
                                        className="w-5 h-5 rounded bg-zinc-700 border-zinc-600 text-green-500 focus:ring-green-500"
                                    />
                                    <label className="text-zinc-300 text-sm font-medium">
                                        Active
                                    </label>
                                </div>
                            </div>

                            <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-zinc-700">
                                <button
                                    type="button"
                                    onClick={closeModal}
                                    className="px-4 py-2 text-zinc-400 hover:text-white transition"
                                >
                                    Batal
                                </button>
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {loading ? 'Menyimpan...' : editingLink ? 'Update' : 'Tambah'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
