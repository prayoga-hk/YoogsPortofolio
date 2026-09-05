export default function Hero({ profile, settings }) {
    const accentColor = settings?.accent_color || '#ef4444';

    return (
        <section id="home" className="min-h-screen flex items-center px-6 pt-20 pb-16 bg-[#0a0e16]">
            <div className="max-w-6xl mx-auto w-full">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    {/* Left Column */}
                    <div>
                        {/* Status Badge */}
                        <div className="flex items-center gap-2 mb-4">
                            <span className="w-2 h-2 rounded-full bg-[#ef4444] animate-pulse"></span>
                            <span className="text-[#94a3b8] text-sm font-mono">
                                ● AVAILABLE FOR INTERNSHIP / FREELANCE
                            </span>
                        </div>

                        {/* Name */}
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-2">
                            {profile?.name || 'Ahmad Rizky Pratama'}
                        </h1>

                        {/* Sub-headline */}
                        <p className="text-xl md:text-2xl text-[#94a3b8] font-mono mb-4">
                            &gt; {profile?.title || 'Junior Full-Stack & Back-End Developer'}
                        </p>

                        {/* Description */}
                        {profile?.description && (
                            <p className="text-[#94a3b8] max-w-lg mb-6">
                                {profile.description}
                            </p>
                        )}

                        {/* Tags */}
                        <div className="flex flex-wrap gap-2 mb-8">
                            <span className="px-3 py-1 bg-[#181c24] border border-[#2d3342] rounded text-xs text-[#94a3b8] font-mono">
                                #Back-End
                            </span>
                            <span className="px-3 py-1 bg-[#181c24] border border-[#2d3342] rounded text-xs text-[#94a3b8] font-mono">
                                #CleanCode
                            </span>
                            <span className="px-3 py-1 bg-[#181c24] border border-[#2d3342] rounded text-xs text-[#94a3b8] font-mono">
                                #Linux
                            </span>
                            <span className="px-3 py-1 bg-[#181c24] border border-[#2d3342] rounded text-xs text-[#94a3b8] font-mono">
                                #OpenSource
                            </span>
                        </div>

                        {/* CTAs */}
                        <div className="flex flex-wrap gap-4">
                            <a
                                href="#projects"
                                className="px-6 py-3 rounded text-white font-mono transition hover:opacity-80"
                                style={{ backgroundColor: accentColor }}
                            >
                                [&gt;] Lihat Proyek
                            </a>
                            <a
                                href="#contact"
                                className="px-6 py-3 rounded border border-[#2d3342] text-white font-mono hover:bg-[#181c24] transition"
                            >
                                [#] Hubungi Saya
                            </a>
                        </div>
                    </div>

                    {/* Right Column: Terminal Mockup */}
                    <div className="bg-[#0f131c] border border-[#2d3342] rounded-lg overflow-hidden">
                        {/* Terminal Header */}
                        <div className="flex items-center gap-2 px-4 py-2 bg-[#181c24] border-b border-[#2d3342]">
                            <span className="w-3 h-3 rounded-full bg-[#ef4444]"></span>
                            <span className="w-3 h-3 rounded-full bg-[#eab308]"></span>
                            <span className="w-3 h-3 rounded-full bg-[#22c55e]"></span>
                            <span className="text-[#64748b] text-xs font-mono ml-2">developer.rpl_id v2.4</span>
                        </div>

                        {/* Terminal Body */}
                        <div className="p-4 font-mono text-sm">
                            <p className="text-[#94a3b8]">
                                <span className="text-[#ef4444]">└─</span> STATUS: <span className="text-[#22c55e]">ONLINE_DEV</span>
                            </p>
                            <p className="text-[#94a3b8]">
                                <span className="text-[#ef4444]">└─</span> ARCH: <span className="text-white">Linux x86_64</span>
                            </p>
                            <p className="text-[#94a3b8]">
                                <span className="text-[#ef4444]">└─</span> COMMIT_STREAK: <span className="text-white">142 Days</span>
                            </p>
                            <p className="text-[#94a3b8] mt-3">
                                <span className="text-[#ef4444]">└─</span> <span className="text-white">$ whoami</span>
                            </p>
                            <p className="text-white ml-4">
                                &gt; {profile?.name || 'Ahmad Rizky Pratama'}
                            </p>
                            <p className="text-[#94a3b8] mt-2">
                                <span className="text-[#ef4444]">└─</span> <span className="text-white">$</span> <span className="animate-pulse">▊</span>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
