import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { Plus, Edit, Trash2, X, Eye, EyeOff } from 'lucide-react';

export default function Timeline() {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [editingItem, setEditingItem] = useState(null);

    const [formData, setFormData] = useState({
        type: 'study',
        title: '',
        subtitle: '',
        start_date: '',
        end_date: '',
        description: '',
        tags: '',
        status: '',
        order_index: 0,
        published: true
    });

    const [deleteConfirm, setDeleteConfirm] = useState(null);

    useEffect(() => {
        fetchTimeline();
    }, []);

    const fetchTimeline = async () => {
        setLoading(true);
        setError(null);
        try {
            const { data, error } = await supabase
                .from('timelines')
                .select('*')
                .order('order_index', { ascending: true });

            if (error) throw error;
            setItems(data || []);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const openModal = (item = null) => {
        if (item) {
            setEditingItem(item);
            setFormData({
                type: item.type || 'study',
                title: item.title || '',
                subtitle: item.subtitle || '',
                start_date: item.start_date || '',
                end_date: item.end_date || '',
                description: item.description || '',
                tags: Array.isArray(item.tags) ? item.tags.join(', ') : '',
                status: item.status || '',
                order_index: item.order_index || 0,
                published: item.published !== undefined ? item.published : true
            });
        } else {
            setEditingItem(null);
            setFormData({
                type: 'study',
                title: '',
                subtitle: '',
                start_date: '',
                end_date: '',
                description: '',
                tags: '',
                status: '',
                order_index: items.length,
                published: true
            });
        }
        setShowModal(true);
        setError(null);
        setSuccess(null);
    };

    const closeModal = () => {
        setShowModal(false);
        setEditingItem(null);
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
            const tagsArray = formData.tags
                ? formData.tags.split(',').map(tag => tag.trim()).filter(Boolean)
                : [];

            const timelineData = {
                type: formData.type,
                title: formData.title,
                subtitle: formData.subtitle,
                start_date: formData.start_date || null,
                end_date: formData.end_date || null,
                description: formData.description,
                tags: tagsArray,
                status: formData.status || null,
                order_index: parseInt(formData.order_index) || 0,
                published: formData.published,
                updated_at: new Date().toISOString()
            };

            if (editingItem) {
                const { error } = await supabase
                    .from('timelines')
                    .update(timelineData)
                    .eq('id', editingItem.id);

                if (error) throw error;
                setSuccess('Data berhasil diperbarui!');
            } else {
                const { error } = await supabase
                    .from('timelines')
                    .insert([{
                        ...timelineData,
                        created_at: new Date().toISOString()
                    }]);

                if (error) throw error;
                setSuccess('Data berhasil ditambahkan!');
            }

            closeModal();
            fetchTimeline();
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        try {
            const { error } = await supabase
                .from('timelines')
                .delete()
                .eq('id', id);

            if (error) throw error;
            setSuccess('Data berhasil dihapus!');
            setDeleteConfirm(null);
            fetchTimeline();
        } catch (err) {
            setError(err.message);
        }
    };

    const togglePublished = async (item) => {
        try {
            const { error } = await supabase
                .from('timelines')
                .update({
                    published: !item.published,
                    updated_at: new Date().toISOString()
                })
                .eq('id', item.id);

            if (error) throw error;
            fetchTimeline();
        } catch (err) {
            setError(err.message);
        }
    };

    const formatDate = (date) => {
        if (!date) return 'Present';
        return new Date(date).toLocaleDateString('id-ID', {
            year: 'numeric',
            month: 'short'
        });
    };

    if (loading && items.length === 0) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="text-zinc-400">Loading timeline...</div>
            </div>
        );
    }

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-white">Timeline (CV)</h1>
                    <p className="text-zinc-400">Kelola riwayat pendidikan, pekerjaan, dan prestasi</p>
                </div>
                <button
                    onClick={() => openModal()}
                    className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition"
                >
                    <Plus size={20} />
                    Add Timeline
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

            {items.length === 0 ? (
                <div className="bg-zinc-800/50 border border-zinc-700 rounded-lg p-12 text-center">
                    <p className="text-zinc-400">Belum ada data. Tambahkan data pertama!</p>
                </div>
            ) : (
                <div className="bg-zinc-800/50 border border-zinc-700 rounded-lg overflow-x-auto">
                    <table className="w-full min-w-[800px]">
                        <thead className="bg-zinc-800 border-b border-zinc-700">
                            <tr>
                                <th className="text-left text-zinc-400 font-medium px-4 py-3">Type</th>
                                <th className="text-left text-zinc-400 font-medium px-4 py-3">Title</th>
                                <th className="text-left text-zinc-400 font-medium px-4 py-3">Subtitle</th>
                                <th className="text-left text-zinc-400 font-medium px-4 py-3">Period</th>
                                <th className="text-left text-zinc-400 font-medium px-4 py-3">Status</th>
                                <th className="text-right text-zinc-400 font-medium px-4 py-3">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {items.map((item) => (
                                <tr key={item.id} className="border-b border-zinc-700/50 hover:bg-zinc-700/30 transition">
                                    <td className="px-4 py-4">
                                        <span className={`px-2 py-1 rounded text-xs font-bold uppercase ${
                                            item.type === 'study' ? 'bg-blue-500/20 text-blue-400' :
                                            item.type === 'work' ? 'bg-green-500/20 text-green-400' :
                                            'bg-yellow-500/20 text-yellow-400'
                                        }`}>
                                            {item.type}
                                        </span>
                                    </td>
                                    <td className="px-4 py-4">
                                        <div>
                                            <div className="text-white font-medium">{item.title}</div>
                                            {item.description && (
                                                <div className="text-zinc-400 text-sm truncate max-w-xs">
                                                    {item.description}
                                                </div>
                                            )}
                                        </div>
                                    </td>
                                    <td className="px-4 py-4 text-zinc-300">{item.subtitle || '-'}</td>
                                    <td className="px-4 py-4 text-zinc-300">
                                        {formatDate(item.start_date)} - {formatDate(item.end_date)}
                                    </td>
                                    <td className="px-4 py-4">
                                        <button
                                            onClick={() => togglePublished(item)}
                                            className={`flex items-center gap-1 px-3 py-1 rounded-full text-sm transition ${
                                                item.published
                                                    ? 'bg-green-500/20 text-green-500 hover:bg-green-500/30'
                                                    : 'bg-zinc-600/30 text-zinc-400 hover:bg-zinc-600/50'
                                            }`}
                                        >
                                            {item.published ? <Eye size={14} /> : <EyeOff size={14} />}
                                            {item.published ? 'Published' : 'Draft'}
                                        </button>
                                    </td>
                                    <td className="px-4 py-4">
                                        <div className="flex justify-end gap-2">
                                            <button
                                                onClick={() => openModal(item)}
                                                className="p-2 text-blue-400 hover:text-blue-300 hover:bg-blue-500/10 rounded-lg transition"
                                            >
                                                <Edit size={18} />
                                            </button>
                                            <button
                                                onClick={() => setDeleteConfirm(item.id)}
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
                        <h3 className="text-xl font-bold text-white mb-2">Hapus Data?</h3>
                        <p className="text-zinc-400 mb-6">Data ini akan dihapus secara permanen. Apakah Anda yakin?</p>
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
                                {editingItem ? 'Edit Timeline' : 'Tambah Timeline'}
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
                                        Kategori (Type) *
                                    </label>
                                    <select
                                        name="type"
                                        value={formData.type}
                                        onChange={handleChange}
                                        required
                                        className="w-full bg-zinc-700 border border-zinc-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-red-500 transition"
                                    >
                                        <option value="study">Study (Pendidikan)</option>
                                        <option value="work">Work (Pengalaman Kerja)</option>
                                        <option value="credential">Credential (Prestasi/Sertifikat)</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-zinc-300 text-sm font-medium mb-1">
                                        Title *
                                    </label>
                                    <input
                                        type="text"
                                        name="title"
                                        value={formData.title}
                                        onChange={handleChange}
                                        required
                                        className="w-full bg-zinc-700 border border-zinc-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-red-500 transition"
                                        placeholder="e.g. SMK PGRI 3 Malang / Frontend Dev / Juara 1"
                                    />
                                </div>

                                <div>
                                    <label className="block text-zinc-300 text-sm font-medium mb-1">
                                        Subtitle
                                    </label>
                                    <input
                                        type="text"
                                        name="subtitle"
                                        value={formData.subtitle}
                                        onChange={handleChange}
                                        className="w-full bg-zinc-700 border border-zinc-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-red-500 transition"
                                        placeholder="e.g. Rekayasa Perangkat Lunak / PT. Teknologi / Dicoding"
                                    />
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-zinc-300 text-sm font-medium mb-1">
                                            Start Date *
                                        </label>
                                        <input
                                            type="date"
                                            name="start_date"
                                            value={formData.start_date}
                                            onChange={handleChange}
                                            required
                                            className="w-full bg-zinc-700 border border-zinc-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-red-500 transition"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-zinc-300 text-sm font-medium mb-1">
                                            End Date
                                        </label>
                                        <input
                                            type="date"
                                            name="end_date"
                                            value={formData.end_date}
                                            onChange={handleChange}
                                            className="w-full bg-zinc-700 border border-zinc-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-red-500 transition"
                                        />
                                        <p className="text-zinc-500 text-xs mt-1">Kosongkan jika masih berjalan</p>
                                    </div>
                                </div>

                                {(formData.type === 'work' || formData.type === 'credential') && (
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-zinc-300 text-sm font-medium mb-1">
                                                Status
                                            </label>
                                            <input
                                                type="text"
                                                name="status"
                                                value={formData.status}
                                                onChange={handleChange}
                                                className="w-full bg-zinc-700 border border-zinc-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-red-500 transition"
                                                placeholder="e.g. Active, Completed, Graduated"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-zinc-300 text-sm font-medium mb-1">
                                                Tags (Pisahkan dengan koma)
                                            </label>
                                            <input
                                                type="text"
                                                name="tags"
                                                value={formData.tags}
                                                onChange={handleChange}
                                                className="w-full bg-zinc-700 border border-zinc-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-red-500 transition"
                                                placeholder="e.g. React, Laravel, Figma"
                                            />
                                        </div>
                                    </div>
                                )}

                                <div>
                                    <label className="block text-zinc-300 text-sm font-medium mb-1">
                                        Description
                                    </label>
                                    <textarea
                                        name="description"
                                        value={formData.description}
                                        onChange={handleChange}
                                        rows="3"
                                        className="w-full bg-zinc-700 border border-zinc-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-red-500 transition resize-y"
                                        placeholder="Deskripsi detail..."
                                    />
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
                                        name="published"
                                        checked={formData.published}
                                        onChange={handleChange}
                                        className="w-5 h-5 rounded bg-zinc-700 border-zinc-600 text-green-500 focus:ring-green-500"
                                    />
                                    <label className="text-zinc-300 text-sm font-medium">
                                        Published
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
                                    {loading ? 'Menyimpan...' : editingItem ? 'Update' : 'Tambah'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
