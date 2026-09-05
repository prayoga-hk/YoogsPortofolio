export default function Projects({ projects, settings }) {
    if (!projects || projects.length === 0) {
        return (
            <section id="projects" className="py-16 px-6 border-t border-[#2d3342] bg-[#0a0e16]">
                <div className="max-w-5xl mx-auto text-center">
                    <p className="text-[#64748b] font-mono">// 03. KARYA PILIHAN — Deployed Projects</p>
                    <p className="text-[#94a3b8] mt-4">Belum ada project.</p>
                </div>
            </section>
        );
    }

    return (
        <section id="projects" className="py-16 px-6 border-t border-[#2d3342] bg-[#0a0e16]">
            <div className="max-w-5xl mx-auto">
                <p className="text-[#ef4444] font-mono text-sm mb-2">// 03. KARYA PILIHAN — Deployed Projects</p>
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-8">Karya Pilihan</h2>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {projects.map((project) => (
                        <div
                            key={project.id}
                            className={`bg-[#0f131c] border ${project.published ? 'border-[#2d3342] hover:border-[#ef4444]' : 'border-[#2d3342]/50 opacity-60'} rounded-lg overflow-hidden transition`}
                        >
                            {project.image_url ? (
                                <img
                                    src={project.image_url}
                                    alt={project.title}
                                    className="w-full h-40 object-cover"
                                    onError={(e) => { e.target.style.display = 'none'; }}
                                />
                            ) : (
                                <div className="w-full h-40 bg-[#181c24] flex items-center justify-center text-[#64748b] font-mono text-sm">
                                    no image
                                </div>
                            )}
                            <div className="p-4">
                                <div className="flex items-center justify-between mb-1">
                                    <h3 className="text-white font-semibold">{project.title}</h3>
                                    {!project.published && (
                                        <span className="text-xs px-2 py-0.5 bg-[#eab308]/20 text-[#eab308] rounded font-mono">
                                            Draft
                                        </span>
                                    )}
                                </div>
                                {project.description && (
                                    <p className="text-[#94a3b8] text-sm mb-3 line-clamp-2">
                                        {project.description}
                                    </p>
                                )}
                                {project.technologies && Array.isArray(project.technologies) && (
                                    <div className="flex flex-wrap gap-1 mb-3">
                                        {project.technologies.slice(0, 3).map((tech, idx) => (
                                            <span key={idx} className="text-xs px-2 py-0.5 bg-[#181c24] rounded text-[#64748b] font-mono">
                                                {tech}
                                            </span>
                                        ))}
                                        {project.technologies.length > 3 && (
                                            <span className="text-xs px-2 py-0.5 bg-[#181c24] rounded text-[#64748b] font-mono">
                                                +{project.technologies.length - 3}
                                            </span>
                                        )}
                                    </div>
                                )}
                                <div className="flex gap-3">
                                    {project.demo_url && project.demo_url !== 'not available' && (
                                        <a
                                            href={project.demo_url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-xs text-[#ef4444] hover:underline font-mono"
                                        >
                                            Live Demo
                                        </a>
                                    )}
                                    {project.github_url && (
                                        <a
                                            href={project.github_url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-xs text-[#94a3b8] hover:text-white font-mono"
                                        >
                                            GitHub
                                        </a>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
