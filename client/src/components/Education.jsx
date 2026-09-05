export default function Education({ educations, settings }) {
    if (!educations || educations.length === 0) {
        return (
            <section id="education" className="py-16 px-6 border-t border-[#2d3342] bg-[#0a0e16]">
                <div className="max-w-4xl mx-auto text-center">
                    <p className="text-[#64748b] font-mono">// 04. PENDIDIKAN FORMAL</p>
                    <p className="text-[#94a3b8] mt-4">Belum ada data pendidikan.</p>
                </div>
            </section>
        );
    }

    return (
        <section id="education" className="py-16 px-6 border-t border-[#2d3342] bg-[#0a0e16]">
            <div className="max-w-4xl mx-auto">
                <p className="text-[#ef4444] font-mono text-sm mb-2">// 04. PENDIDIKAN FORMAL — Latar Belakang Akademik & Vokasi</p>
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-8">Pendidikan Formal</h2>

                <div className="space-y-4">
                    {educations.map((edu) => (
                        <div key={edu.id} className="bg-[#0f131c] border border-[#2d3342] rounded-lg p-6">
                            <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-2">
                                <div>
                                    <h3 className="text-white text-lg font-semibold">{edu.school}</h3>
                                    <p className="text-[#94a3b8]">
                                        {edu.degree} - {edu.field_of_study}
                                    </p>
                                    <p className="text-[#64748b] text-sm font-mono">
                                        {edu.start_date && new Date(edu.start_date).getFullYear()} — {edu.end_date ? new Date(edu.end_date).getFullYear() : 'Present'}
                                    </p>
                                </div>
                                {edu.status && (
                                    <span className="px-3 py-1 bg-[#22c55e]/20 text-[#22c55e] text-xs rounded-full font-mono whitespace-nowrap">
                                        {edu.status}
                                    </span>
                                )}
                            </div>
                            {edu.description && (
                                <p className="text-[#94a3b8] text-sm mt-3">{edu.description}</p>
                            )}
                        </div>
                    ))}
                </div>

                {/* Metrics */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8">
                    <div className="bg-[#0f131c] border border-[#2d3342] rounded-lg p-4 text-center">
                        <p className="text-2xl font-bold text-white">92.8</p>
                        <p className="text-[#94a3b8] text-sm font-mono">Nilai Rata-rata Kejuruan</p>
                    </div>
                    <div className="bg-[#0f131c] border border-[#2d3342] rounded-lg p-4 text-center">
                        <p className="text-2xl font-bold text-white">✓</p>
                        <p className="text-[#94a3b8] text-sm font-mono">BNSP Certified</p>
                    </div>
                    <div className="bg-[#0f131c] border border-[#2d3342] rounded-lg p-4 text-center">
                        <p className="text-2xl font-bold text-white">Aktif</p>
                        <p className="text-[#94a3b8] text-sm font-mono">Siap Magang</p>
                    </div>
                </div>
            </div>
        </section>
    );
}
