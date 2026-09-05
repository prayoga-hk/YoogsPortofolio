import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { Plus, Edit, Trash2, X, Eye, EyeOff } from 'lucide-react';

export default function Projects() {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [editingProject, setEditingProject] = useState(null);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        image_url: '',
        text: '',
        github_url: '',
        demo_url: '',
        technologies: '',
        published: true
    });
    const [deleteConfirm, setDeleteConfirm] = useState(null);

    // Fetch projects - BEST PRACTICE: di dalam useEffect
    useEffect(() => {
        const fetchProjects = async () => {
            setLoading(true);
            setError(null);
            try {
                const { data, error } = await supabase
                    .from('projects')
                    .select('*')
                    .order('created_at', { ascending: false });

                if (error) throw error;
                setProjects(data || []);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchProjects();
    }, []);

    const openModal = (project = null) => {
        if (project) {
            setEditingProject(project);
            setFormData({
                title: project.title || '',
                description: project.description || '',
                image_url: project.image_url || '',
                text: project.text || '',
                github_url: project.github_url || '',
                demo_url: project.demo_url || '',
                technologies: project.technologies ? JSON.stringify(project.technologies) : '',
                published: project.published !== undefined ? project.published : true
            });
        } else {
            setEditingProject(null);
            setFormData({
                title: '',
                description: '',
                image_url: '',
                text: '',
                github_url: '',
                demo_url: '',
                technologies: '',
                published: true
            });
        }
        setShowModal(true);
        setError(null);
        setSuccess(null);
    };

    const closeModal = () => {
        setShowModal(false);
        setEditingProject(null);
        setFormData({
            title: '',
            description: '',
            image_url: '',
            text: '',
            github_url: '',
            demo_url: '',
            technologies: '',
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
            let techArray = [];
            if (formData.technologies.trim()) {
                try {
                    techArray = JSON.parse(formData.technologies);
                    if (!Array.isArray(techArray)) {
                        throw new Error('Must be an array');
                    }
                } catch {
                    techArray = formData.technologies.split(',').map(t => t.trim()).filter(Boolean);
                }
            }

            const projectData = {
                title: formData.title,
                description: formData.description,
                image_url: formData.image_url,
                text: formData.text,
                github_url: formData.github_url,
                demo_url: formData.demo_url,
                technologies: techArray,
                published: formData.published,
                updated_at: new Date().toISOString()
            };

            if (editingProject) {
                const { error } = await supabase
                    .from('projects')
                    .update(projectData)
                    .eq('id', editingProject.id);

                if (error) throw error;
                setSuccess('Project berhasil diperbarui!');
            } else {
                const { error } = await supabase
                    .from('projects')
                    .insert([{
                        ...projectData,
                        created_at: new Date().toISOString()
                    }]);

                if (error) throw error;
                setSuccess('Project berhasil ditambahkan!');
            }

            closeModal();

            // Refresh data
            const { data, error: fetchError } = await supabase
                .from('projects')
                .select('*')
                .order('created_at', { ascending: false });

            if (fetchError) throw fetchError;
            setProjects(data || []);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        try {
            const { error } = await supabase
                .from('projects')
                .delete()
                .eq('id', id);

            if (error) throw error;
            setSuccess('Project berhasil dihapus!');
            setDeleteConfirm(null);

            const { data, error: fetchError } = await supabase
                .from('projects')
                .select('*')
                .order('created_at', { ascending: false });

            if (fetchError) throw fetchError;
            setProjects(data || []);
        } catch (err) {
            setError(err.message);
        }
    };

    const togglePublished = async (project) => {
        try {
            const { error } = await supabase
                .from('projects')
                .update({
                    published: !project.published,
                    updated_at: new Date().toISOString()
                })
                .eq('id', project.id);

            if (error) throw error;

            const { data, error: fetchError } = await supabase
                .from('projects')
                .select('*')
                .order('created_at', { ascending: false });

            if (fetchError) throw fetchError;
            setProjects(data || []);
        } catch (err) {
            setError(err.message);
        }
    };

    if (loading && projects.length === 0) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="text-zinc-400">Loading projects...</div>
            </div>
        );
    }

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-white">Projects</h1>
                    <p className="text-zinc-400">Kelola project portfolio</p>
                </div>
                <button
                    onClick={() => openModal()}
                    className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition"
                >
                    <Plus size={20} />
                    Add Project
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

            {projects.length === 0 ? (
                <div className="bg-zinc-800/50 border border-zinc-700 rounded-lg p-12 text-center">
                    <p className="text-zinc-400">Belum ada project. Tambahkan project pertama!</p>
                </div>
            ) : (
                <div className="bg-zinc-800/50 border border-zinc-700 rounded-lg overflow-x-auto">
                    <table className="w-full min-w-[600px]">
                        <thead className="bg-zinc-800 border-b border-zinc-700">
                            <tr>
                                <th className="text-left text-zinc-400 font-medium px-4 py-3">Title</th>
                                <th className="text-left text-zinc-400 font-medium px-4 py-3">Technologies</th>
                                <th className="text-left text-zinc-400 font-medium px-4 py-3">Status</th>
                                <th className="text-right text-zinc-400 font-medium px-4 py-3">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {projects.map((project) => (
                                <tr key={project.id} className="border-b border-zinc-700/50 hover:bg-zinc-700/30 transition">
                                    <td className="px-4 py-4">
                                        <div>
                                            <div className="text-white font-medium">{project.title}</div>
                                            {project.description && (
                                                <div className="text-zinc-400 text-sm truncate max-w-xs">
                                                    {project.description}
                                                </div>
                                            )}
                                        </div>
                                    </td>
                                    <td className="px-4 py-4">
                                        <div className="flex flex-wrap gap-1">
                                            {project.technologies && Array.isArray(project.technologies) ? (
                                                project.technologies.map((tech, idx) => (
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
                                            onClick={() => togglePublished(project)}
                                            className={`flex items-center gap-1 px-3 py-1 rounded-full text-sm transition ${
                                                project.published
                                                    ? 'bg-green-500/20 text-green-500 hover:bg-green-500/30'
                                                    : 'bg-zinc-600/30 text-zinc-400 hover:bg-zinc-600/50'
                                            }`}
                                        >
                                            {project.published ? <Eye size={14} /> : <EyeOff size={14} />}
                                            {project.published ? 'Published' : 'Draft'}
                                        </button>
                                    </td>
                                    <td className="px-4 py-4">
                                        <div className="flex justify-end gap-2">
                                            <button
                                                onClick={() => openModal(project)}
                                                className="p-2 text-blue-400 hover:text-blue-300 hover:bg-blue-500/10 rounded-lg transition"
                                            >
                                                <Edit size={18} />
                                            </button>
                                            <button
                                                onClick={() => setDeleteConfirm(project.id)}
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
                        <h3 className="text-xl font-bold text-white mb-2">Hapus Project?</h3>
                        <p className="text-zinc-400 mb-6">Project ini akan dihapus secara permanen. Apakah Anda yakin?</p>
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
                                {editingProject ? 'Edit Project' : 'Tambah Project'}
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
                                        placeholder="e.g. MyAndroidApp"
                                    />
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
                                        placeholder="Deskripsi project..."
                                    />
                                </div>

                                <div>
                                    <label className="block text-zinc-300 text-sm font-medium mb-1">
                                        Image URL
                                    </label>
                                    <input
                                        type="url"
                                        name="image_url"
                                        value={formData.image_url}
                                        onChange={handleChange}
                                        className="w-full bg-zinc-700 border border-zinc-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-red-500 transition"
                                        placeholder="https://example.com/image.jpg"
                                    />
                                    {formData.image_url && (
                                        <div className="mt-2">
                                            <img
                                                src={formData.image_url}
                                                alt="Preview"
                                                className="h-24 w-auto object-cover rounded-lg border border-zinc-700"
                                                onError={(e) => e.target.style.display = 'none'}
                                            />
                                        </div>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-zinc-300 text-sm font-medium mb-1">
                                        Text / Detail
                                    </label>
                                    <textarea
                                        name="text"
                                        value={formData.text}
                                        onChange={handleChange}
                                        rows="3"
                                        className="w-full bg-zinc-700 border border-zinc-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-red-500 transition resize-y"
                                        placeholder="Konten detail project..."
                                    />
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-zinc-300 text-sm font-medium mb-1">
                                            GitHub URL
                                        </label>
                                        <input
                                            type="url"
                                            name="github_url"
                                            value={formData.github_url}
                                            onChange={handleChange}
                                            className="w-full bg-zinc-700 border border-zinc-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-red-500 transition"
                                            placeholder="https://github.com/..."
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-zinc-300 text-sm font-medium mb-1">
                                            Demo URL
                                        </label>
                                        <input
                                            type="url"
                                            name="demo_url"
                                            value={formData.demo_url}
                                            onChange={handleChange}
                                            className="w-full bg-zinc-700 border border-zinc-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-red-500 transition"
                                            placeholder="https://example.com"
                                        />
                                    </div>
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
                                    {loading ? 'Menyimpan...' : editingProject ? 'Update' : 'Tambah'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
