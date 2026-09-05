import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { Plus, Edit, Trash2, X, Eye, EyeOff } from 'lucide-react';

export default function Education() {
    const [educations, setEducations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [editingEducation, setEditingEducation] = useState(null);
    const [formData, setFormData] = useState({
        school: '',
        degree: '',
        field_of_study: '',
        start_date: '',
        end_date: '',
        description: '',
        order_index: 0,
        published: true
    });
    const [deleteConfirm, setDeleteConfirm] = useState(null);

    useEffect(() => {
        const fetchEducations = async () => {
            setLoading(true);
            setError(null);
            try {
                const { data, error } = await supabase
                    .from('educations')
                    .select('*')
                    .order('order_index', { ascending: true });

                if (error) throw error;
                setEducations(data || []);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchEducations();
    }, []);

    const openModal = (education = null) => {
        if (education) {
            setEditingEducation(education);
            setFormData({
                school: education.school || '',
                degree: education.degree || '',
                field_of_study: education.field_of_study || '',
                start_date: education.start_date || '',
                end_date: education.end_date || '',
                description: education.description || '',
                order_index: education.order_index || 0,
                published: education.published !== undefined ? education.published : true
            });
        } else {
            setEditingEducation(null);
            setFormData({
                school: '',
                degree: '',
                field_of_study: '',
                start_date: '',
                end_date: '',
                description: '',
                order_index: educations.length,
                published: true
            });
        }
        setShowModal(true);
        setError(null);
        setSuccess(null);
    };

    const closeModal = () => {
        setShowModal(false);
        setEditingEducation(null);
        setFormData({
            school: '',
            degree: '',
            field_of_study: '',
            start_date: '',
            end_date: '',
            description: '',
            order_index: 0,
            published: true
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
            const educationData = {
                school: formData.school,
                degree: formData.degree,
                field_of_study: formData.field_of_study,
                start_date: formData.start_date || null,
                end_date: formData.end_date || null,
                description: formData.description,
                order_index: parseInt(formData.order_index) || 0,
                published: formData.published,
                updated_at: new Date().toISOString()
            };

            if (editingEducation) {
                const { error } = await supabase
                    .from('educations')
                    .update(educationData)
                    .eq('id', editingEducation.id);

                if (error) throw error;
                setSuccess('Education berhasil diperbarui!');
            } else {
                const { error } = await supabase
                    .from('educations')
                    .insert([{
                        ...educationData,
                        created_at: new Date().toISOString()
                    }]);

                if (error) throw error;
                setSuccess('Education berhasil ditambahkan!');
            }

            closeModal();

            const { data, error: fetchError } = await supabase
                .from('educations')
                .select('*')
                .order('order_index', { ascending: true });

            if (fetchError) throw fetchError;
            setEducations(data || []);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        try {
            const { error } = await supabase
                .from('educations')
                .delete()
                .eq('id', id);

            if (error) throw error;
            setSuccess('Education berhasil dihapus!');
            setDeleteConfirm(null);

            const { data, error: fetchError } = await supabase
                .from('educations')
                .select('*')
                .order('order_index', { ascending: true });

            if (fetchError) throw fetchError;
            setEducations(data || []);
        } catch (err) {
            setError(err.message);
        }
    };

    const togglePublished = async (education) => {
        try {
            const { error } = await supabase
                .from('educations')
                .update({
                    published: !education.published,
                    updated_at: new Date().toISOString()
                })
                .eq('id', education.id);

            if (error) throw error;

            const { data, error: fetchError } = await supabase
                .from('educations')
                .select('*')
                .order('order_index', { ascending: true });

            if (fetchError) throw fetchError;
            setEducations(data || []);
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

    if (loading && educations.length === 0) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="text-zinc-400">Loading education...</div>
            </div>
        );
    }

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-white">Education</h1>
                    <p className="text-zinc-400">Kelola riwayat pendidikan</p>
                </div>
                <button
                    onClick={() => openModal()}
                    className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition"
                >
                    <Plus size={20} />
                    Add Education
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

            {educations.length === 0 ? (
                <div className="bg-zinc-800/50 border border-zinc-700 rounded-lg p-12 text-center">
                    <p className="text-zinc-400">Belum ada data pendidikan. Tambahkan pendidikan pertama!</p>
                </div>
            ) : (
                <div className="bg-zinc-800/50 border border-zinc-700 rounded-lg overflow-x-auto">
                    <table className="w-full min-w-[700px]">
                        <thead className="bg-zinc-800 border-b border-zinc-700">
                            <tr>
                                <th className="text-left text-zinc-400 font-medium px-4 py-3">School</th>
                                <th className="text-left text-zinc-400 font-medium px-4 py-3">Degree</th>
                                <th className="text-left text-zinc-400 font-medium px-4 py-3">Field of Study</th>
                                <th className="text-left text-zinc-400 font-medium px-4 py-3">Period</th>
                                <th className="text-left text-zinc-400 font-medium px-4 py-3">Status</th>
                                <th className="text-right text-zinc-400 font-medium px-4 py-3">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {educations.map((education) => (
                                <tr key={education.id} className="border-b border-zinc-700/50 hover:bg-zinc-700/30 transition">
                                    <td className="px-4 py-4">
                                        <div>
                                            <div className="text-white font-medium">{education.school}</div>
                                            {education.description && (
                                                <div className="text-zinc-400 text-sm truncate max-w-xs">
                                                    {education.description}
                                                </div>
                                            )}
                                        </div>
                                    </td>
                                    <td className="px-4 py-4 text-zinc-300">{education.degree || '-'}</td>
                                    <td className="px-4 py-4 text-zinc-300">{education.field_of_study || '-'}</td>
                                    <td className="px-4 py-4 text-zinc-300">
                                        {formatDate(education.start_date)} - {formatDate(education.end_date)}
                                    </td>
                                    <td className="px-4 py-4">
                                        <button
                                            onClick={() => togglePublished(education)}
                                            className={`flex items-center gap-1 px-3 py-1 rounded-full text-sm transition ${
                                                education.published
                                                    ? 'bg-green-500/20 text-green-500 hover:bg-green-500/30'
                                                    : 'bg-zinc-600/30 text-zinc-400 hover:bg-zinc-600/50'
                                            }`}
                                        >
                                            {education.published ? <Eye size={14} /> : <EyeOff size={14} />}
                                            {education.published ? 'Published' : 'Draft'}
                                        </button>
                                    </td>
                                    <td className="px-4 py-4">
                                        <div className="flex justify-end gap-2">
                                            <button
                                                onClick={() => openModal(education)}
                                                className="p-2 text-blue-400 hover:text-blue-300 hover:bg-blue-500/10 rounded-lg transition"
                                            >
                                                <Edit size={18} />
                                            </button>
                                            <button
                                                onClick={() => setDeleteConfirm(education.id)}
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
                        <h3 className="text-xl font-bold text-white mb-2">Hapus Education?</h3>
                        <p className="text-zinc-400 mb-6">Data pendidikan ini akan dihapus secara permanen. Apakah Anda yakin?</p>
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
                                {editingEducation ? 'Edit Education' : 'Tambah Education'}
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
                                        School *
                                    </label>
                                    <input
                                        type="text"
                                        name="school"
                                        value={formData.school}
                                        onChange={handleChange}
                                        required
                                        className="w-full bg-zinc-700 border border-zinc-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-red-500 transition"
                                        placeholder="e.g. SMK Negeri 1 Jakarta"
                                    />
                                </div>

                                <div>
                                    <label className="block text-zinc-300 text-sm font-medium mb-1">
                                        Degree *
                                    </label>
                                    <input
                                        type="text"
                                        name="degree"
                                        value={formData.degree}
                                        onChange={handleChange}
                                        required
                                        className="w-full bg-zinc-700 border border-zinc-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-red-500 transition"
                                        placeholder="e.g. SMK, S1, D3"
                                    />
                                </div>

                                <div>
                                    <label className="block text-zinc-300 text-sm font-medium mb-1">
                                        Field of Study *
                                    </label>
                                    <input
                                        type="text"
                                        name="field_of_study"
                                        value={formData.field_of_study}
                                        onChange={handleChange}
                                        required
                                        className="w-full bg-zinc-700 border border-zinc-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-red-500 transition"
                                        placeholder="e.g. Rekayasa Perangkat Lunak"
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
                                        rows="2"
                                        className="w-full bg-zinc-700 border border-zinc-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-red-500 transition resize-y"
                                        placeholder="Deskripsi pendidikan..."
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
                                    {loading ? 'Menyimpan...' : editingEducation ? 'Update' : 'Tambah'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
