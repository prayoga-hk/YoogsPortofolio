import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { Plus, Edit, Trash2, X } from 'lucide-react';

export default function Skills() {
    const [skills, setSkills] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [editingSkill, setEditingSkill] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        level: '',
        icon: '',
        order_index: 0,
        is_active: true
    });
    const [deleteConfirm, setDeleteConfirm] = useState(null);

    // Fetch skills - BEST PRACTICE: di dalam useEffect
    useEffect(() => {
        const fetchSkills = async () => {
            setLoading(true);
            setError(null);
            try {
                const { data, error } = await supabase
                    .from('skills')
                    .select('*')
                    .order('order_index', { ascending: true });

                if (error) throw error;
                setSkills(data || []);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchSkills();
    }, []);

    // Open modal for create/edit
    const openModal = (skill = null) => {
        if (skill) {
            setEditingSkill(skill);
            setFormData({
                name: skill.name,
                level: skill.level || '',
                icon: skill.icon || '',
                order_index: skill.order_index || 0,
                is_active: skill.is_active !== undefined ? skill.is_active : true
            });
        } else {
            setEditingSkill(null);
            setFormData({
                name: '',
                level: '',
                icon: '',
                order_index: skills.length,
                is_active: true
            });
        }
        setShowModal(true);
        setError(null);
        setSuccess(null);
    };

    const closeModal = () => {
        setShowModal(false);
        setEditingSkill(null);
        setFormData({
            name: '',
            level: '',
            icon: '',
            order_index: 0,
            is_active: true
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
            if (editingSkill) {
                const { error } = await supabase
                    .from('skills')
                    .update({
                        ...formData,
                        updated_at: new Date().toISOString()
                    })
                    .eq('id', editingSkill.id);

                if (error) throw error;
                setSuccess('Skill berhasil diperbarui!');
            } else {
                const { error } = await supabase
                    .from('skills')
                    .insert([{
                        ...formData,
                        created_at: new Date().toISOString(),
                        updated_at: new Date().toISOString()
                    }]);

                if (error) throw error;
                setSuccess('Skill berhasil ditambahkan!');
            }

            closeModal();
            // Refresh data
            const { data, error } = await supabase
                .from('skills')
                .select('*')
                .order('order_index', { ascending: true });

            if (error) throw error;
            setSkills(data || []);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        try {
            const { error } = await supabase
                .from('skills')
                .delete()
                .eq('id', id);

            if (error) throw error;
            setSuccess('Skill berhasil dihapus!');
            setDeleteConfirm(null);

            // Refresh data
            const { data, error: fetchError } = await supabase
                .from('skills')
                .select('*')
                .order('order_index', { ascending: true });

            if (fetchError) throw fetchError;
            setSkills(data || []);
        } catch (err) {
            setError(err.message);
        }
    };

    const toggleActive = async (skill) => {
        try {
            const { error } = await supabase
                .from('skills')
                .update({
                    is_active: !skill.is_active,
                    updated_at: new Date().toISOString()
                })
                .eq('id', skill.id);

            if (error) throw error;

            // Refresh data
            const { data, error: fetchError } = await supabase
                .from('skills')
                .select('*')
                .order('order_index', { ascending: true });

            if (fetchError) throw fetchError;
            setSkills(data || []);
        } catch (err) {
            setError(err.message);
        }
    };

    const getLevelColor = (level) => {
        const colors = {
            'Beginner': 'bg-blue-500/20 text-blue-500',
            'Intermediate': 'bg-yellow-500/20 text-yellow-500',
            'Advanced': 'bg-green-500/20 text-green-500',
            'Expert': 'bg-red-500/20 text-red-500'
        };
        return colors[level] || 'bg-zinc-500/20 text-zinc-400';
    };

    if (loading && skills.length === 0) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="text-zinc-400">Loading skills...</div>
            </div>
        );
    }

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-white">Skills</h1>
                    <p className="text-zinc-400">Kelola skills portfolio</p>
                </div>
                <button
                    onClick={() => openModal()}
                    className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition"
                >
                    <Plus size={20} />
                    Add Skill
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

            {skills.length === 0 ? (
                <div className="bg-zinc-800/50 border border-zinc-700 rounded-lg p-12 text-center">
                    <p className="text-zinc-400">Belum ada skill. Tambahkan skill pertama!</p>
                </div>
            ) : (
                <div className="bg-zinc-800/50 border border-zinc-700 rounded-lg overflow-hidden">
                    <table className="w-full">
                        <thead className="bg-zinc-800 border-b border-zinc-700">
                            <tr>
                                <th className="text-left text-zinc-400 font-medium px-6 py-3">Name</th>
                                <th className="text-left text-zinc-400 font-medium px-6 py-3">Level</th>
                                <th className="text-left text-zinc-400 font-medium px-6 py-3">Order</th>
                                <th className="text-left text-zinc-400 font-medium px-6 py-3">Status</th>
                                <th className="text-right text-zinc-400 font-medium px-6 py-3">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {skills.map((skill) => (
                                <tr key={skill.id} className="border-b border-zinc-700/50 hover:bg-zinc-700/30 transition">
                                    <td className="px-6 py-4 text-white">{skill.name}</td>
                                    <td className="px-6 py-4">
                                        <span className={`px-3 py-1 rounded-full text-sm ${getLevelColor(skill.level)}`}>
                                            {skill.level || '-'}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-zinc-300">{skill.order_index}</td>
                                    <td className="px-6 py-4">
                                        <button
                                            onClick={() => toggleActive(skill)}
                                            className={`px-3 py-1 rounded-full text-sm transition ${
                                                skill.is_active
                                                    ? 'bg-green-500/20 text-green-500 hover:bg-green-500/30'
                                                    : 'bg-zinc-600/30 text-zinc-400 hover:bg-zinc-600/50'
                                            }`}
                                        >
                                            {skill.is_active ? 'Active' : 'Inactive'}
                                        </button>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex justify-end gap-2">
                                            <button
                                                onClick={() => openModal(skill)}
                                                className="p-2 text-blue-400 hover:text-blue-300 hover:bg-blue-500/10 rounded-lg transition"
                                            >
                                                <Edit size={18} />
                                            </button>
                                            <button
                                                onClick={() => setDeleteConfirm(skill.id)}
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

            {/* Delete Confirmation Modal */}
            {deleteConfirm && (
                <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
                    <div className="bg-zinc-800 rounded-lg p-6 max-w-md w-full border border-zinc-700">
                        <h3 className="text-xl font-bold text-white mb-2">Hapus Skill?</h3>
                        <p className="text-zinc-400 mb-6">Skill ini akan dihapus secara permanen. Apakah Anda yakin?</p>
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

            {/* Create/Edit Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
                    <div className="bg-zinc-800 rounded-lg p-6 max-w-md w-full border border-zinc-700 max-h-[90vh] overflow-y-auto">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-xl font-bold text-white">
                                {editingSkill ? 'Edit Skill' : 'Tambah Skill'}
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
                                        Name *
                                    </label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                        className="w-full bg-zinc-700 border border-zinc-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-red-500 transition"
                                        placeholder="e.g. React"
                                    />
                                </div>

                                <div>
                                    <label className="block text-zinc-300 text-sm font-medium mb-1">
                                        Level
                                    </label>
                                    <select
                                        name="level"
                                        value={formData.level}
                                        onChange={handleChange}
                                        className="w-full bg-zinc-700 border border-zinc-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-red-500 transition"
                                    >
                                        <option value="">Pilih Level</option>
                                        <option value="Beginner">Beginner</option>
                                        <option value="Intermediate">Intermediate</option>
                                        <option value="Advanced">Advanced</option>
                                        <option value="Expert">Expert</option>
                                    </select>
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
                                        placeholder="e.g. SiReact"
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
                                        name="is_active"
                                        checked={formData.is_active}
                                        onChange={handleChange}
                                        className="w-5 h-5 rounded bg-zinc-700 border-zinc-600 text-red-600 focus:ring-red-500"
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
                                    {loading ? 'Menyimpan...' : editingSkill ? 'Update' : 'Tambah'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
