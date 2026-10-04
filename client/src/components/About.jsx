import BlurText from './react-bits/BlurText';
import FadeContent from './react-bits/FadeContent';
import AnimatedContent from './react-bits/AnimatedContent';
import DecryptedText from './react-bits/DecryptedText';
import CountUp from './react-bits/CountUp';

// ==================== HARDCODE DATA ====================
const PROFILE = {
    name: 'Prayoga',
    about: 'Saya adalah siswa SMK jurusan Rekayasa Perangkat Lunak. Saya mulai belajar tentang programming sejak kelas 9 smp melalui salah satu video youtube, saat itu saya masih menggunakan HTML compiler online.',
    school: 'SKARIGA',
    major: 'RPL',
    location: 'Malang',
};

const STATS = {
    age: 16,
    startYear: 2021,
};

const FASTFETCH_DATA = [
    { label: 'OS', value: 'Fedora Linux 44 (Workstation Edition) x86_64' },
    { label: 'Host', value: 'IdeaPad Slim 3 14IAH8' },
    { label: 'Kernel', value: 'Linux 7.2.5-200.fc44.x86_64' },
    { label: 'Uptime', value: '1 year ago' },
    { label: 'Shell', value: 'zsh 5.9' },
    { label: 'WM', value: 'Mutter (Wayland)' },
    { label: 'Terminal', value: 'ghostty 1.3.1-4.fc44' },
];
// ========================================================

export default function About() {
    const name = PROFILE.name;

    return (
        <section
            id="about"
            className="
                scroll-mt-16
                relative
                h-screen
                min-h-0
                flex
                items-center
                px-4
                sm:px-6
                bg-[#0a0e16]
                overflow-hidden
            "
        >
            {/* ================= MAIN CONTAINER ================= */}
            <div
                className="
                    relative
                    max-w-6xl
                    mx-auto
                    w-full
                    h-full
                    flex
                    flex-col
                    justify-center
                    lg:flex-row
                    lg:items-center
                "
            >
                {/* ================= HEADER MOBILE & TABLET ================= */}
                <div className="w-full flex flex-col mb-1 lg:hidden">
                    <FadeContent blur duration={600} threshold={0.15}>
                        <p className="w-full text-left text-[#ef4444] font-mono text-xs sm:text-sm">
                            // 01. TENTANG SAYA — Profil Siswa
                        </p>
                    </FadeContent>
                </div>

                {/* ================= GRID ================= */}
                <div
                    className="
                        w-full
                        grid
                        grid-cols-1
                        lg:grid-cols-2
                        gap-4
                        sm:gap-6
                        lg:gap-14
                        items-center
                        max-h-full
                    "
                >
                    {/* ================================================= */}
                    {/* TERMINAL FASTFETCH SECTION */}
                    {/* ================================================= */}
                    <div className="order-1 w-full flex flex-col items-center">

                        {/* Label khusus Desktop */}
                        <div className="hidden lg:block w-full">
                            <FadeContent blur duration={600} threshold={0.15}>
                                <p className="w-full text-left text-[#ef4444] font-mono text-sm mb-3">
                                    // 01. TENTANG SAYA — Profil Siswa
                                </p>
                            </FadeContent>
                        </div>

                        {/* ================= TERMINAL FASTFETCH ================= */}
                        <AnimatedContent
                            distance={40}
                            duration={0.8}
                            delay={0.1}
                            className="w-full flex justify-center"
                        >
                            <div className="w-full max-w-md">
                                <div className="bg-[#0f131c] border border-[#2d3342] rounded-md overflow-hidden shadow-[0_0_40px_-16px_rgba(239,68,68,0.3)]">

                                    {/* ==== TITLE BAR ==== */}
                                    <div className="flex items-center gap-2 px-4 py-2 bg-[#181c24] border-b border-[#2d3342]">
                                        <span className="w-3 h-3 rounded-full bg-[#ef4444]"></span>
                                        <span className="w-3 h-3 rounded-full bg-[#eab308]"></span>
                                        <span className="w-3 h-3 rounded-full bg-[#22c55e]"></span>
                                        <span className="text-[#64748b] text-xs font-mono ml-2">
                                            ~
                                        </span>
                                    </div>

                                    {/* ==== BODY TERMINAL ==== */}
                                    <div className="p-4 font-mono text-xs sm:text-sm leading-none">

                                        {/* Prompt */}
                                        <p className="m-0 text-[#94a3b8] mb-3">
                                            <span className="text-[#ef4444]">└─</span>{' '}
                                            <span className="text-white">$</span> fastfetch
                                        </p>

                                        {/* Header user@host + ASCII Art */}
                                        <div className="flex gap-3 sm:gap-4 mb-3">

                                            {/* ASCII Art Fedora (Kiri) */}
                                            <pre className="text-[#3c6eb4] font-bold m-0 p-0 text-[8px] sm:text-[10px] leading-[1.1] whitespace-pre">
{`
     0@@@@@@@@@@
   @:            :@
  @       %@@@@@   @
 @        @     @   @
 @        %   ::@   @
 @   @  @@@@@@      @
 @ **     %         @
 @ @      +        @
 @  @ @@@@       .@
 @:           :@@
   @@@@@@@@@@@          `}
                                            </pre>

                                            {/* Info Sistem (Kanan) */}
                                            <div className="flex-1">
                                                <p className="m-0 text-white font-bold">
                                                    {name.toLowerCase().split(' ')[0]}@fedora
                                                </p>
                                                <p className="m-0 text-[#64748b] mb-2">
                                                    ------------------
                                                </p>
                                                {FASTFETCH_DATA.map((item, i) => (
                                                    <p key={i} className="m-0">
                                                        <span className="text-[#ef4444] font-bold">{item.label}:</span>{' '}
                                                        <span className="text-[#94a3b8]">{item.value}</span>
                                                    </p>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Color Palette */}
                                        <div className="flex gap-1 mt-3">
                                            <span className="w-4 h-3 bg-[#0a0e16] border border-[#2d3342]"></span>
                                            <span className="w-4 h-3 bg-[#ef4444]"></span>
                                            <span className="w-4 h-3 bg-[#eab308]"></span>
                                            <span className="w-4 h-3 bg-[#22c55e]"></span>
                                            <span className="w-4 h-3 bg-[#06b6d4]"></span>
                                            <span className="w-4 h-3 bg-[#8b5cf6]"></span>
                                            <span className="w-4 h-3 bg-[#ec4899]"></span>
                                            <span className="w-4 h-3 bg-[#94a3b8]"></span>
                                        </div>

                                        {/* Kursor Berkedip */}
                                        <p className="m-0 mt-3 text-[#94a3b8]">
                                            <span className="text-[#ef4444]">└─</span>{' '}
                                            <span className="text-white">$</span>{' '}
                                            <span className="inline-block w-2 h-3 bg-[#ef4444] animate-pulse align-middle"></span>
                                        </p>
                                    </div>
                                </div>

                                {/* Caption Bawah */}
                                <div className="mt-2 text-center">
                                    <p className="font-mono text-[10px] sm:text-xs text-[#ef4444] mb-0.5">
                                        <DecryptedText
                                            text="// system.info"
                                            animateOn="view"
                                            speed={40}
                                            maxIterations={8}
                                            className="text-[#ef4444]"
                                            encryptedClassName="text-[#64748b]"
                                        />
                                    </p>
                                </div>
                            </div>
                        </AnimatedContent>
                    </div>

                    {/* ================================================= */}
                    {/* CONTENT SECTION */}
                    {/* ================================================= */}
                    <div
                        className="
                            order-2
                            text-center
                            flex
                            flex-col
                            items-center
                            w-full
                        "
                    >
                        {/* ================= JUDUL TENTANG SAYA ================= */}
                        <div className="w-full my-1 sm:my-2 flex justify-center items-center text-center">
                            <BlurText
                                text="Tentang Saya"
                                delay={80}
                                animateBy="words"
                                direction="top"
                                className="
                                    text-2xl
                                    sm:text-4xl
                                    lg:text-5xl
                                    font-bold
                                    text-white
                                    mb-1
                                    lg:mb-4
                                    text-center
                                    w-full
                                    flex
                                    justify-center
                                "
                            />
                        </div>

                        {/* ================= DESCRIPTION ================= */}
                        <AnimatedContent
                            distance={25}
                            delay={0.15}
                            duration={0.7}
                            className="w-full"
                        >
                            <p
                                className="
                                    text-[#94a3b8]
                                    leading-relaxed
                                    text-xs
                                    sm:text-sm
                                    md:text-base
                                    lg:text-lg
                                    mb-2
                                    sm:mb-4
                                    w-full
                                    max-w-2xl
                                    text-center
                                    mx-auto
                                "
                            >
                                {PROFILE.about}
                            </p>
                        </AnimatedContent>

                        {/* ================= META ================= */}
                        <AnimatedContent
                            distance={20}
                            delay={0.25}
                            duration={0.6}
                            className="w-full"
                        >
                            <div
                                className="
                                    flex
                                    flex-wrap
                                    justify-center
                                    gap-1.5
                                    sm:gap-2
                                    mb-3
                                    sm:mb-5
                                    w-full
                                "
                            >
                                {PROFILE.school && (
                                    <span className="px-2 py-1 sm:px-3 sm:py-1.5 bg-[#181c24] border border-[#2d3342] rounded text-[9px] sm:text-xs text-[#94a3b8] font-mono">
                                        {PROFILE.school}
                                    </span>
                                )}

                                {PROFILE.major && (
                                    <span className="px-2 py-1 sm:px-3 sm:py-1.5 bg-[#181c24] border border-[#2d3342] rounded text-[9px] sm:text-xs text-[#94a3b8] font-mono">
                                        {PROFILE.major}
                                    </span>
                                )}

                                {PROFILE.location && (
                                    <span className="px-2 py-1 sm:px-3 sm:py-1.5 bg-[#181c24] border border-[#2d3342] rounded text-[9px] sm:text-xs text-[#94a3b8] font-mono">
                                        {PROFILE.location}
                                    </span>
                                )}
                            </div>
                        </AnimatedContent>

                        {/* ================= STATS ================= */}
                        <AnimatedContent
                            distance={20}
                            delay={0.35}
                            duration={0.6}
                            className="w-full"
                        >
                            <div
                                className="
                                    grid
                                    grid-cols-3
                                    gap-1.5
                                    sm:gap-3
                                    w-full
                                    max-w-md
                                    mx-auto
                                "
                            >
                                {/* Usia */}
                                <div className="bg-[#0f131c] border border-[#2d3342] rounded-md p-2 sm:p-3 text-center">
                                    <p className="text-base sm:text-2xl font-bold text-white font-mono">
                                        <CountUp to={STATS.age} duration={1.5} />
                                    </p>
                                    <p className="text-[8px] sm:text-[10px] uppercase tracking-wider text-[#64748b] font-mono mt-0.5 sm:mt-1">
                                        Usia
                                    </p>
                                </div>

                                {/* Mulai */}
                                <div className="bg-[#0f131c] border border-[#2d3342] rounded-md p-2 sm:p-3 text-center">
                                    <p className="text-base sm:text-2xl font-bold text-white font-mono">
                                        <CountUp to={STATS.startYear} duration={1.8} separator="" />
                                    </p>
                                    <p className="text-[8px] sm:text-[10px] uppercase tracking-wider text-[#64748b] font-mono mt-0.5 sm:mt-1">
                                        Mulai
                                    </p>
                                </div>

                                {/* Ready */}
                                <div className="bg-[#0f131c] border border-[#2d3342] rounded-md p-2 sm:p-3 text-center">
                                    <p className="text-base sm:text-2xl font-bold text-[#22c55e] font-mono">
                                        ON
                                    </p>
                                    <p className="text-[8px] sm:text-[10px] uppercase tracking-wider text-[#64748b] font-mono mt-0.5 sm:mt-1">
                                        Ready
                                    </p>
                                </div>
                            </div>
                        </AnimatedContent>
                    </div>
                </div>
            </div>
        </section>
    );
}
