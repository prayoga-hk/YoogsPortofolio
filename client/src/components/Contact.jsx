export default function Contact({ socialLinks, settings, profile }) {
    const email = profile?.email || settings?.contact_email || '';

    return (
        <section id="contact" className="py-16 px-6 border-t border-[#2d3342] bg-[#0a0e16]">
            <div className="max-w-4xl mx-auto">
                <p className="text-[#ef4444] font-mono text-sm mb-2">// 06. HUBUNGI & KOLABORASI</p>
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-8">Hubungi & Kolaborasi</h2>

                <div className="grid md:grid-cols-2 gap-8">
                    {/* Left: Contact Info */}
                    <div className="space-y-4">
                        {email && (
                            <div className="bg-[#0f131c] border border-[#2d3342] rounded-lg p-4">
                                <p className="text-[#64748b] text-sm font-mono">Email</p>
                                <a href={`mailto:${email}`} className="text-white hover:text-[#ef4444] transition">
                                    {email}
                                </a>
                            </div>
                        )}

                        {socialLinks && socialLinks.length > 0 && (
                            <div className="bg-[#0f131c] border border-[#2d3342] rounded-lg p-4">
                                <p className="text-[#64748b] text-sm font-mono mb-2">Social</p>
                                <div className="flex flex-wrap gap-2">
                                    {socialLinks.map((link) => (
                                        <a
                                            key={link.id}
                                            href={link.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="px-3 py-1.5 bg-[#181c24] border border-[#2d3342] rounded text-[#94a3b8] hover:text-white hover:border-[#ef4444] transition text-sm font-mono"
                                        >
                                            {link.platform}
                                        </a>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Right: Terminal Form */}
                    <div className="bg-[#0f131c] border border-[#2d3342] rounded-lg overflow-hidden">
                        <div className="flex items-center gap-2 px-4 py-2 bg-[#181c24] border-b border-[#2d3342]">
                            <span className="w-3 h-3 rounded-full bg-[#ef4444]"></span>
                            <span className="w-3 h-3 rounded-full bg-[#eab308]"></span>
                            <span className="w-3 h-3 rounded-full bg-[#22c55e]"></span>
                            <span className="text-[#64748b] text-xs font-mono ml-2">~/terminal/send_message.sh</span>
                        </div>
                        <div className="p-4 font-mono text-sm">
                            <p className="text-[#94a3b8]">
                                <span className="text-[#ef4444]">└─</span> <span className="text-white">$</span> ./send_message.sh
                            </p>
                            <form className="space-y-3 mt-3">
                                <div>
                                    <label className="text-[#64748b] text-xs">Nama Pengirim</label>
                                    <input
                                        type="text"
                                        placeholder="your_name"
                                        className="w-full bg-[#0a0e16] border border-[#2d3342] rounded px-3 py-2 text-white text-sm focus:border-[#ef4444] outline-none transition"
                                    />
                                </div>
                                <div>
                                    <label className="text-[#64748b] text-xs">Email</label>
                                    <input
                                        type="email"
                                        placeholder="email@domain.com"
                                        className="w-full bg-[#0a0e16] border border-[#2d3342] rounded px-3 py-2 text-white text-sm focus:border-[#ef4444] outline-none transition"
                                    />
                                </div>
                                <div>
                                    <label className="text-[#64748b] text-xs">Kategori</label>
                                    <select className="w-full bg-[#0a0e16] border border-[#2d3342] rounded px-3 py-2 text-white text-sm focus:border-[#ef4444] outline-none transition">
                                        <option>Tawaran Magang</option>
                                        <option>Proyek Freelance</option>
                                        <option>Kolaborasi</option>
                                        <option>Lainnya</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="text-[#64748b] text-xs">Pesan</label>
                                    <textarea
                                        rows="3"
                                        placeholder="Tulis pesan Anda..."
                                        className="w-full bg-[#0a0e16] border border-[#2d3342] rounded px-3 py-2 text-white text-sm focus:border-[#ef4444] outline-none transition resize-none"
                                    ></textarea>
                                </div>
                                <button
                                    type="submit"
                                    className="w-full py-2 bg-[#ef4444] text-white rounded font-mono text-sm hover:opacity-80 transition"
                                >
                                    KIRIM PESAN [&gt;]
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
