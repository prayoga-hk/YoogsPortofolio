import BlurText from './react-bits/BlurText';
import FadeContent from './react-bits/FadeContent';
import AnimatedContent from './react-bits/AnimatedContent';
import DecryptedText from './react-bits/DecryptedText';
import CountUp from './react-bits/CountUp';
import Magnet from './react-bits/Magnet';
import { resolvePrimaryPhoto } from './PhotoCarousel';

export default function About({ profile }) {
    console.log('ABOUT PROFILE:', profile);

    const photoUrl = resolvePrimaryPhoto(profile);
    const name = profile?.name;
    const title = profile?.title;
    if (!profile) {
        return (
            <section
                id="about"
                className="scroll-mt-16 h-screen min-h-0 flex items-center px-4 sm:px-6"
            >
            <div className="max-w-6xl mx-auto w-full text-center">
              <p className="text-[#64748b] font-mono text-xs sm:text-sm">
                  // 01. TENTANG SAYA — Profil Siswa
              </p>
              <p className="text-[#94a3b8] mt-3 text-sm">
                  Belum ada data profile.
              </p>
            </div>
            </section>
        );
    }

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
                border-t
                border-[#2d3342]
                bg-[#0a0e16]
                overflow-hidden
            "
        >
            {/* Ambient glow */}
            <div
                className="pointer-events-none absolute inset-0 opacity-40"
                style={{
                    background:
                        'radial-gradient(ellipse 50% 60% at 75% 50%, rgba(239,68,68,0.12), transparent 70%)',
                }}
            />

            <div className="relative max-w-6xl mx-auto w-full h-full flex items-center">
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
                    {/* ================= PHOTO ================= */}
                    <div className="order-1 lg:order-1">

                        {/* Label di atas gambar */}
                        <FadeContent blur duration={600} threshold={0.15}>
                            <p className="
                                text-[#ef4444]
                                font-mono
                                text-[10px]
                                sm:text-xs
                                lg:text-sm
                                mb-2
                                sm:mb-3
                                text-left
                            ">
                                // 01. TENTANG SAYA — Profil Siswa
                            </p>
                        </FadeContent>

                        <AnimatedContent
                            distance={40}
                            duration={0.8}
                            delay={0.1}
                        >
                            <Magnet
                                padding={20}
                                magnetStrength={6}
                                wrapperClassName="w-full"
                                innerClassName="w-full"
                            >
                            <div className="relative group mx-auto w-full max-w-[260px] sm:max-w-[300px] lg:max-w-none">
                                <div className="absolute -inset-1 rounded-2xl bg-gradient-to-br from-[#ef4444]/40 via-transparent to-[#ef4444]/10 opacity-60 blur-sm group-hover:opacity-90 transition-opacity duration-500" />

                                <div
                                    className="
                                        relative
                                        aspect-[4/5]
                                        max-h-[38vh]
                                        sm:max-h-[42vh]
                                        lg:max-h-[70vh]
                                        rounded-2xl
                                        overflow-hidden
                                        border
                                        border-[#2d3342]
                                        bg-[#0f131c]
                                    "
                                >
                                    {photoUrl ? (
                                        <img
                                            src={photoUrl}
                                            alt={name}
                                            className="
                                                w-full
                                                h-full
                                                object-cover
                                                transition-transform
                                                duration-700
                                                group-hover:scale-105
                                            "
                                        />
                                    ) : (
                                        <div className="w-full h-full flex flex-col items-center justify-center gap-3 text-[#64748b] font-mono text-xs sm:text-sm px-6 text-center">
                                            <span className="text-3xl text-[#2d3342]">
                                                [ ]
                                            </span>

                                            <span>
                                                Tambahkan photo_url di admin panel
                                            </span>
                                        </div>
                                    )}

                                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a0e16]/80 via-transparent to-transparent" />

                                    <div className="absolute bottom-3 left-3 right-3 sm:bottom-4 sm:left-4 sm:right-4">
                                        <p className="font-mono text-[10px] sm:text-xs text-[#ef4444] mb-1">
                                            <DecryptedText
                                                text="// profile.photo"
                                                animateOn="view"
                                                speed={40}
                                                maxIterations={8}
                                                className="text-[#ef4444]"
                                                encryptedClassName="text-[#64748b]"
                                            />
                                        </p>

                                        <p className="text-white font-semibold text-base sm:text-lg leading-tight">
                                            {name}
                                        </p>

                                        <p className="text-[#94a3b8] text-xs sm:text-sm font-mono mt-0.5 truncate">
                                            {title}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </Magnet>
                    </AnimatedContent>
                    </div>
                    {/* ================= CONTENT ================= */}
                    <div
                        className="
                            order-2
                            lg:order-2
                            text-left
                            flex
                            flex-col
                            items-start
                            w-full
                            pl-0
                            lg:pl-4
                        "
                    >

                        {/* Title */}
                        <BlurText
                            text="Tentang Saya"
                            delay={80}
                            animateBy="words"
                            direction="top"
                            className="
                                text-2xl
                                sm:text-3xl
                                md:text-4xl
                                lg:text-6xl
                                font-bold
                                text-white
                                mb-2
                                sm:mb-3
                                text-left
                                w-full
                            "
                        />

                        {/* Description */}
                        <AnimatedContent
                            distance={25}
                            delay={0.15}
                            duration={0.7}
                        >
                            {profile.about ? (
                                <p
                                    className="
                                        text-[#94a3b8]
                                        leading-snug
                                        text-xs
                                        sm:text-sm
                                        md:text-base
                                        lg:text-lg
                                        mb-3
                                        sm:mb-5
                                        w-full
                                        text-left
                                    "
                                >
                                    {profile.about}
                                </p>
                            ) : (
                                <p className="text-[#64748b] italic text-xs sm:text-sm mb-3 sm:mb-5 text-left w-full">
                                    Belum ada deskripsi. Tambahkan di admin panel.
                                </p>
                            )}
                        </AnimatedContent>

                        {/* ================= META ================= */}
                        <AnimatedContent
                            distance={20}
                            delay={0.25}
                            duration={0.6}
                        >
                            <div className="flex flex-wrap justify-start gap-1.5 sm:gap-2 mb-3 sm:mb-5 w-full">
                                {profile.school && (
                                    <span className="px-2 py-1 sm:px-3 sm:py-1.5 bg-[#181c24] border border-[#2d3342] rounded text-[9px] sm:text-xs text-[#94a3b8] font-mono">
                                        {profile.school}
                                    </span>
                                )}

                                {profile.major && (
                                    <span className="px-2 py-1 sm:px-3 sm:py-1.5 bg-[#181c24] border border-[#2d3342] rounded text-[9px] sm:text-xs text-[#94a3b8] font-mono">
                                        {profile.major}
                                    </span>
                                )}

                                {profile.location && (
                                    <span className="px-2 py-1 sm:px-3 sm:py-1.5 bg-[#181c24] border border-[#2d3342] rounded text-[9px] sm:text-xs text-[#94a3b8] font-mono">
                                        {profile.location}
                                    </span>
                                )}
                            </div>
                        </AnimatedContent>

                        {/* ================= STATS ================= */}
                        <AnimatedContent
                            distance={20}
                            delay={0.35}
                            duration={0.6}
                        >
                            <div
                                className="
                                    grid
                                    grid-cols-3
                                    gap-1.5
                                    sm:gap-3
                                    w-full
                                    max-w-md
                                "
                            >
                                {/* Age */}
                                <div className="bg-[#0f131c] border border-[#2d3342] rounded-md p-2 sm:p-3 text-center">
                                    <p className="text-lg sm:text-2xl font-bold text-white font-mono">
                                        <CountUp
                                            to={16}
                                            duration={1.5}
                                        />
                                    </p>

                                    <p className="text-[8px] sm:text-[10px] uppercase tracking-wider text-[#64748b] font-mono mt-0.5 sm:mt-1">
                                        Usia
                                    </p>
                                </div>

                                {/* Start */}
                                <div className="bg-[#0f131c] border border-[#2d3342] rounded-md p-2 sm:p-3 text-center">
                                    <p className="text-lg sm:text-2xl font-bold text-white font-mono">
                                        <CountUp
                                            to={2021}
                                            duration={1.8}
                                            separator=""
                                        />
                                    </p>

                                    <p className="text-[8px] sm:text-[10px] uppercase tracking-wider text-[#64748b] font-mono mt-0.5 sm:mt-1">
                                        Mulai
                                    </p>
                                </div>

                                {/* Ready */}
                                <div className="bg-[#0f131c] border border-[#2d3342] rounded-md p-2 sm:p-3 text-center">
                                    <p className="text-lg sm:text-2xl font-bold text-[#22c55e] font-mono">
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
