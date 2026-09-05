import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { Plus, Edit, Trash2, X, Eye, EyeOff } from 'lucide-react';

export default function Experience() {
    const [experiences, setExperiences] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [editingExperience, setEditingExperience] = useState(null);
    const [formData, setFormData] = useState({
        title: '',           // ← diubah dari position
        company: '',
        start_date: '',
        end_date: '',
        description: '',
        technologies: '',
        order_index: 0,
        published: true
    });
    const [deleteConfirm, setDeleteConfirm] = useState(null);

    // Fetch experiences
    const fetchExperiences = async () => {
        setLoading(true);
        setError(null);
        try {
            const { data, error } = await supabase
                .from('experiences')
                .select('*')
                .order('order_index', { ascending: true });

            if (error) throw error;
            setExperiences(data || []);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchExperiences();
    }, []);

    // Open modal for create/edit
    const openModal = (experience = null) => {
        if (experience) {
            setEditingExperience(experience);
            setFormData({
                title: experience.title || '',           // ← diubah
                company: experience.company || '',
                start_date: experience.start_date || '',
                end_date: experience.end_date || '',
                description: experience.description || '',
                technologies: experience.technologies ? JSON.stringify(experience.technologies) : '',
                order_index: experience.order_index || 0,
                published: experience.published !== undefined ? experience.published : true
            });
        } else {
            setEditingExperience(null);
            setFormData({
                title: '',           // ← diubah
                company: '',
                start_date: '',
                end_date: '',
                description: '',
                technologies: '',
                order_index: experiences.length,
                published: true
            });
        }
        setShowModal(true);
        setError(null);
        setSuccess(null);
    };

    const closeModal = () => {
        setShowModal(false);
        setEditingExperience(null);
        setFormData({
            title: '',           // ← diubah
            company: '',
            start_date: '',
            end_date: '',
            description: '',
            technologies: '',
            order_index: 0,
            published: true
        });
    };

    // Handle form input change
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    // Save experience
    const handleSave = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setSuccess(null);

        try {
            // Parse technologies from string to array
            let techArray = [];
            if (formData.technologies.trim()) {
                try {
                    // Try to parse as JSON array
                    techArray = JSON.parse(formData.technologies);
                    if (!Array.isArray(techArray)) {
                        throw new Error('Must be an array');
                    }
                } catch {
                    // If not valid JSON, split by comma
                    techArray = formData.technologies.split(',').map(t => t.trim()).filter(Boolean);
                }
            }

            const experienceData = {
                title: formData.title,           // ← diubah
                company: formData.company,
                start_date: formData.start_date || null,
                end_date: formData.end_date || null,
                description: formData.description,
                technologies: techArray,         // ← ARRAY
                order_index: parseInt(formData.order_index) || 0,
                published: formData.published,
                updated_at: new Date().toISOString()
            };

            if (editingExperience) {
                // Update
                const { error } = await supabase
                    .from('experiences')
                    .update(experienceData)
                    .eq('id', editingExperience.id);

                if (error) throw error;
                setSuccess('Experience berhasil diperbarui!');
            } else {
                // Create
                const { error } = await supabase
                    .from('experiences')
                    .insert([{
                        ...experienceData,
                        created_at: new Date().toISOString()
                    }]);

                if (error) throw error;
                setSuccess('Experience berhasil ditambahkan!');
            }

            closeModal();
            fetchExperiences();
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    // Delete experience
    const handleDelete = async (id) => {
        try {
            const { error } = await supabase
                .from('experiences')
                .delete()
                .eq('id', id);

            if (error) throw error;
            setSuccess('Experience berhasil dihapus!');
            setDeleteConfirm(null);
            fetchExperiences();
        } catch (err) {
            setError(err.message);
        }
    };

    // Toggle published status
    const togglePublished = async (experience) => {
        try {
            const { error } = await supabase
                .from('experiences')
                .update({
                    published: !experience.published,
                    updated_at: new Date().toISOString()
                })
                .eq('id', experience.id);

            if (error) throw error;
            fetchExperiences();
        } catch (err) {
            setError(err.message);
        }
    };

    // Format date for display
    const formatDate = (date) => {
        if (!date) return 'Present';
        return new Date(date).toLocaleDateString('id-ID', {
            year: 'numeric',
            month: 'short'
        });
    };

    if (loading && experiences.length === 0) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="text-zinc-400">Loading experiences...</div>
            </div>
        );
    }

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-white">Experience</h1>
                    <p className="text-zinc-400">Kelola riwayat pengalaman</p>
                </div>
                <button
                    onClick={() => openModal()}
                    className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition"
                >
                    <Plus size={20} />
                    Add Experience
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

            {experiences.length === 0 ? (
                <div className="bg-zinc-800/50 border border-zinc-700 rounded-lg p-12 text-center">
                    <p className="text-zinc-400">Belum ada data pengalaman. Tambahkan pengalaman pertama!</p>
                </div>
            ) : (
                <div className="bg-zinc-800/50 border border-zinc-700 rounded-lg overflow-x-auto">
                    <table className="w-full min-w-[700px]">
                        <thead className="bg-zinc-800 border-b border-zinc-700">
                            <tr>
                                <th className="text-left text-zinc-400 font-medium px-4 py-3">Title</th>  {/* ← diubah */}
                                <th className="text-left text-zinc-400 font-medium px-4 py-3">Company</th>
                                <th className="text-left text-zinc-400 font-medium px-4 py-3">Period</th>
                                <th className="text-left text-zinc-400 font-medium px-4 py-3">Technologies</th>
                                <th className="text-left text-zinc-400 font-medium px-4 py-3">Status</th>
                                <th className="text-right text-zinc-400 font-medium px-4 py-3">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {experiences.map((experience) => (
                                <tr key={experience.id} className="border-b border-zinc-700/50 hover:bg-zinc-700/30 transition">
                                    <td className="px-4 py-4">
                                        <div>
                                            <div className="text-white font-medium">{experience.title}</div>  {/* ← diubah */}
                                            {experience.description && (
                                                <div className="text-zinc-400 text-sm truncate max-w-xs">
                                                    {experience.description}
                                                </div>
                                            )}
                                        </div>
                                    </td>
                                    <td className="px-4 py-4 text-zinc-300">{experience.company}</td>
                                    <td className="px-4 py-4 text-zinc-300">
                                        {formatDate(experience.start_date)} - {formatDate(experience.end_date)}
                                    </td>
                                    <td className="px-4 py-4">
                                        <div className="flex flex-wrap gap-1">
                                            {experience.technologies && Array.isArray(experience.technologies) ? (
                                                experience.technologies.map((tech, idx) => (
                                                    <span
                                                        key={idx}
                                                        className="px-2 py-0.5 bg-zinc-700 text-zinc-300 text-xs rounded-full"
                                                    >
                                                        {tech}
                                                    </span>
                                                ))
                                            ) : (
                                                <span className="text-zinc-500 text-sm">-</span>
                                            )}
                                        </div>
                                    </td>
                                    <td className="px-4 py-4">
                                        <button
                                            onClick={() => togglePublished(experience)}
                                            className={`flex items-center gap-1 px-3 py-1 rounded-full text-sm transition ${
                                                experience.published
                                                    ? 'bg-green-500/20 text-green-500 hover:bg-green-500/30'
                                                    : 'bg-zinc-600/30 text-zinc-400 hover:bg-zinc-600/50'
                                            }`}
                                        >
                                            {experience.published ? <Eye size={14} /> : <EyeOff size={14} />}
                                            {experience.published ? 'Published' : 'Draft'}
                                        </button>
                                    </td>
                                    <td className="px-4 py-4">
                                        <div className="flex justify-end gap-2">
                                            <button
                                                onClick={() => openModal(experience)}
                                                className="p-2 text-blue-400 hover:text-blue-300 hover:bg-blue-500/10 rounded-lg transition"
                                            >
                                                <Edit size={18} />
                                            </button>
                                            <button
                                                onClick={() => setDeleteConfirm(experience.id)}
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
                        <h3 className="text-xl font-bold text-white mb-2">Hapus Experience?</h3>
                        <p className="text-zinc-400 mb-6">Data pengalaman ini akan dihapus secara permanen. Apakah Anda yakin?</p>
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
                                {editingExperience ? 'Edit Experience' : 'Tambah Experience'}
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
                                        Title *
                                    </label>
                                    <input
                                        type="text"
                                        name="title"
                                        value={formData.title}
                                        onChange={handleChange}
                                        required
                                        className="w-full bg-zinc-700 border border-zinc-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-red-500 transition"
                                        placeholder="e.g. Frontend Developer"
                                    />
                                </div>

                                <div>
                                    <label className="block text-zinc-300 text-sm font-medium mb-1">
                                        Company *
                                    </label>
                                    <input
                                        type="text"
                                        name="company"
                                        value={formData.company}
                                        onChange={handleChange}
                                        required
                                        className="w-full bg-zinc-700 border border-zinc-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-red-500 transition"
                                        placeholder="e.g. PT Tech Indonesia"
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
                                        <p className="text-zinc-500 text-xs mt-1">
                                            Kosongkan jika masih berjalan
                                        </p>
                                    </div>
                                </div>

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
                                        placeholder="Deskripsi pengalaman..."
                                    />
                                </div>

                                <div>
                                    <label className="block text-zinc-300 text-sm font-medium mb-1">
                                        Technologies
                                    </label>
                                    <input
                                        type="text"
                                        name="technologies"
                                        value={formData.technologies}
                                        onChange={handleChange}
                                        className="w-full bg-zinc-700 border border-zinc-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-red-500 transition"
                                        placeholder='["React", "Tailwind"] atau React, Tailwind'
                                    />
                                    <p className="text-zinc-500 text-xs mt-1">
                                        Bisa menggunakan format JSON array atau dipisahkan koma
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
                                    {loading ? 'Menyimpan...' : editingExperience ? 'Update' : 'Tambah'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
