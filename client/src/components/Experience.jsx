export default function Experience({ experiences, settings }) {
    if (!experiences || experiences.length === 0) {
        return (
            <section id="experience" className="py-16 px-6 border-t border-[#2d3342] bg-[#0a0e16]">
                <div className="max-w-4xl mx-auto text-center">
                    <p className="text-[#64748b] font-mono">// 05. PENGALAMAN KERJA & ORGANISASI</p>
                    <p className="text-[#94a3b8] mt-4">Belum ada data pengalaman.</p>
                </div>
            </section>
        );
    }

    return (
        <section id="experience" className="py-16 px-6 border-t border-[#2d3342] bg-[#0a0e16]">
            <div className="max-w-4xl mx-auto">
                <p className="text-[#ef4444] font-mono text-sm mb-2">// 05. PENGALAMAN KERJA & ORGANISASI</p>
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-8">Pengalaman Kerja & Organisasi</h2>

                <div className="space-y-4">
                    {experiences.map((exp) => (
                        <div key={exp.id} className="bg-[#0f131c] border border-[#2d3342] rounded-lg p-6">
                            <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-2">
                                <div>
                                    <h3 className="text-white text-lg font-semibold">{exp.title}</h3>
                                    <p className="text-[#94a3b8]">{exp.company}</p>
                                    <p className="text-[#64748b] text-sm font-mono">
                                        {exp.start_date && new Date(exp.start_date).toLocaleDateString('id-ID', { year: 'numeric', month: 'short' })} — {exp.end_date ? new Date(exp.end_date).toLocaleDateString('id-ID', { year: 'numeric', month: 'short' }) : 'Present'}
                                    </p>
                                </div>
                                {exp.status && (
                                    <span className="px-3 py-1 bg-[#ef4444]/20 text-[#ef4444] text-xs rounded-full font-mono whitespace-nowrap">
                                        {exp.status}
                                    </span>
                                )}
                            </div>
                            {exp.description && (
                                <p className="text-[#94a3b8] text-sm mt-3">{exp.description}</p>
                            )}
                            {exp.technologies && Array.isArray(exp.technologies) && exp.technologies.length > 0 && (
                                <div className="flex flex-wrap gap-1 mt-3">
                                    {exp.technologies.map((tech, idx) => (
                                        <span key={idx} className="text-xs px-2 py-0.5 bg-[#181c24] rounded text-[#64748b] font-mono">
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
