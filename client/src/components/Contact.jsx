import FadeContent from './react-bits/FadeContent';
import AnimatedContent from './react-bits/AnimatedContent';
import BlurText from './react-bits/BlurText';
import Magnet from './react-bits/Magnet';
import SpotlightCard from './react-bits/SpotlightCard';

const SECTION =
    'scroll-mt-16 min-h-screen flex items-center px-6 pt-16 pb-16';

export default function Contact({ socialLinks, settings, profile }) {
    const email = profile?.email || settings?.contact_email || '';
    const accentColor = settings?.accent_color || '#ef4444';

    return (
        <section id="contact" className={SECTION}>
            <div className="max-w-6xl mx-auto w-full">
                <FadeContent duration={700}>
                    <p className="text-[#ef4444] font-mono text-sm mb-2">// 06. HUBUNGI & KOLABORASI</p>
                </FadeContent>
                <BlurText
                    text="Hubungi & Kolaborasi"
                    delay={70}
                    animateBy="words"
                    className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-8"
                />

                <div className="grid md:grid-cols-2 gap-8">
                    <AnimatedContent distance={40} duration={0.8}>
                        <div className="space-y-4">
                            {email && (
                                <SpotlightCard
                                    className="!rounded-md !border-[#2d3342] !bg-[#0f131c] !p-4"
                                    spotlightColor="rgba(239, 68, 68, 0.2)"
                                >
                                    <p className="relative z-10 text-[#64748b] text-sm font-mono">Email</p>
                                    <a
                                        href={`mailto:${email}`}
                                        className="relative z-10 text-white hover:text-[#ef4444] transition"
                                    >
                                        {email}
                                    </a>
                                </SpotlightCard>
                            )}

                            {socialLinks && socialLinks.length > 0 && (
                                <SpotlightCard
                                    className="!rounded-md !border-[#2d3342] !bg-[#0f131c] !p-4"
                                    spotlightColor="rgba(239, 68, 68, 0.2)"
                                >
                                    <p className="relative z-10 text-[#64748b] text-sm font-mono mb-2">Social</p>
                                    <div className="relative z-10 flex flex-wrap gap-2">
                                        {socialLinks.map((link) => (
                                            <Magnet key={link.id} padding={24} magnetStrength={4}>
                                                <a
                                                    href={link.url}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="inline-block px-3 py-1.5 bg-[#181c24] border border-[#2d3342] rounded text-[#94a3b8] hover:text-white hover:border-[#ef4444] transition text-sm font-mono"
                                                >
                                                    {link.platform}
                                                </a>
                                            </Magnet>
                                        ))}
                                    </div>
                                </SpotlightCard>
                            )}
                        </div>
                    </AnimatedContent>

                    <AnimatedContent distance={40} direction="horizontal" duration={0.9} delay={0.1}>
                        <div className="bg-[#0f131c] border border-[#2d3342] rounded-md overflow-hidden shadow-[0_0_40px_-16px_rgba(239,68,68,0.3)]">
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
                                    <Magnet padding={30} magnetStrength={3} wrapperClassName="w-full" innerClassName="w-full">
                                        <button
                                            type="submit"
                                            className="w-full py-2 text-white rounded font-mono text-sm hover:opacity-80 transition"
                                            style={{ backgroundColor: accentColor }}
                                        >
                                            KIRIM PESAN [&gt;]
                                        </button>
                                    </Magnet>
                                </form>
                            </div>
                        </div>
                    </AnimatedContent>
                </div>
            </div>
        </section>
    );
}
