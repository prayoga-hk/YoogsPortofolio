export default function About({ profile }) {
    if (!profile) {
        return (
            <section id="about" className="py-16 px-6 border-t border-[#2d3342] bg-[#0a0e16]">
                <div className="max-w-4xl mx-auto text-center">
                    <p className="text-[#64748b] font-mono">// 01. TENTANG SAYA — Profil Siswa</p>
                    <p className="text-[#94a3b8] mt-4">Belum ada data profile.</p>
                </div>
            </section>
        );
    }

    return (
        <section id="about" className="py-16 px-6 border-t border-[#2d3342] bg-[#0a0e16]">
            <div className="max-w-4xl mx-auto">
                <p className="text-[#ef4444] font-mono text-sm mb-2">// 01. TENTANG SAYA — Profil Siswa</p>
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">Tentang Saya</h2>

                <div className="grid md:grid-cols-2 gap-8">
                    <div>
                        {profile.about ? (
                            <p className="text-[#94a3b8] leading-relaxed">
                                {profile.about}
                            </p>
                        ) : (
                            <p className="text-[#64748b] italic">
                                Belum ada deskripsi. Tambahkan di admin panel.
                            </p>
                        )}
                    </div>

                    {/* JSON Block */}
                    <div className="bg-[#0f131c] border border-[#2d3342] rounded-lg p-4 font-mono text-sm">
                        <p className="text-[#94a3b8]">{'{'}</p>
                        <p className="text-[#94a3b8] ml-4">
                            <span className="text-[#ef4444]">"developer"</span>: <span className="text-white">"{profile.name || 'Ahmad Rizky Pratama'}"</span>,
                        </p>
                        <p className="text-[#94a3b8] ml-4">
                            <span className="text-[#ef4444]">"role"</span>: <span className="text-white">"{profile.title || 'Junior Full-Stack & Back-End Developer'}"</span>,
                        </p>
                        <p className="text-[#94a3b8] ml-4">
                            <span className="text-[#ef4444]">"principles"</span>: <span className="text-white">["Readable over clever code", "Normalize database, optimize indexed queries"]</span>,
                        </p>
                        <p className="text-[#94a3b8] ml-4">
                            <span className="text-[#ef4444]">"readiness"</span>: <span className="text-[#22c55e]">true</span>
                        </p>
                        <p className="text-[#94a3b8]">{'}'}</p>
                    </div>
                </div>

                {/* Highlight Metrics */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8">
                    <div className="bg-[#0f131c] border border-[#2d3342] rounded-lg p-4 text-center">
                        <p className="text-2xl font-bold text-white">2+</p>
                        <p className="text-[#94a3b8] text-sm font-mono">Thn Belajar Coding</p>
                    </div>
                    <div className="bg-[#0f131c] border border-[#2d3342] rounded-lg p-4 text-center">
                        <p className="text-2xl font-bold text-white">15+</p>
                        <p className="text-[#94a3b8] text-sm font-mono">Repositori Selesai</p>
                    </div>
                    <div className="bg-[#0f131c] border border-[#2d3342] rounded-lg p-4 text-center">
                        <p className="text-2xl font-bold text-white">Juara 2</p>
                        <p className="text-[#94a3b8] text-sm font-mono">LKS Web Tech 2024</p>
                    </div>
                </div>
            </div>
        </section>
    );
}
