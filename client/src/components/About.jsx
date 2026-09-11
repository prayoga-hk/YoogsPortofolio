import BlurText from './react-bits/BlurText';
import FadeContent from './react-bits/FadeContent';
import AnimatedContent from './react-bits/AnimatedContent';
import DecryptedText from './react-bits/DecryptedText';
import CountUp from './react-bits/CountUp';
import Stack from './react-bits/Stack';
import { resolveGalleryImages } from './PhotoCarousel';

export default function About({ profile }) {
    console.log('ABOUT PROFILE:', profile);

    const galleryImages = resolveGalleryImages(profile);

    const stackCards = galleryImages.map((img, index) => ({
        id: index + 1,
        img
    }));

    const name = profile?.name;
    const title = profile?.title;

    if (!profile) {
        return (
            <section
                id="about"
                className="
                    scroll-mt-16
                    h-screen
                    min-h-0
                    flex
                    items-center
                    px-4
                    sm:px-6
                "
            >
                <div className="max-w-6xl mx-auto w-full text-center">
                    <p className="text-[#64748b] font-mono text-xs sm:text-sm text-left">
                        // 01. TENTANG SAYA — Profil Siswa
                    </p>

                    <p className="text-[#94a3b8] mt-3 text-sm text-center">
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
                        gap-2
                        sm:gap-6
                        lg:gap-14
                        items-center
                        max-h-full
                    "
                >
                    {/* ================================================= */}
                    {/* PHOTO SECTION */}
                    {/* ================================================= */}
                    <div
                        className="
                            order-1
                            w-full
                            flex
                            flex-col
                            items-center
                        "
                    >
                        {/* Label khusus Desktop */}
                        <div className="hidden lg:block w-full">
                            <FadeContent blur duration={600} threshold={0.15}>
                                <p className="w-full text-left text-[#ef4444] font-mono text-sm mb-3">
                                    // 01. TENTANG SAYA — Profil Siswa
                                </p>
                            </FadeContent>
                        </div>

                        {/* ================= PHOTO + INFO ================= */}
                        <AnimatedContent
                            distance={40}
                            duration={0.8}
                            delay={0.1}
                            className="w-full flex justify-center"
                        >
                            <div
                                className="
                                    relative
                                    group
                                    mx-auto
                                    w-full
                                    max-w-[120px]
                                    sm:max-w-[180px]
                                    lg:max-w-[320px]
                                "
                            >
                              {/* ================= PHOTO CARD ================= */}
                              <div
                                  className="
                                      relative
                                      bg-transparent
                                      aspect-[3/4]
                                      w-full
                                      max-w-[180px]
                                      sm:max-w-[220px]
                                      lg:max-w-[300px]
                                      mx-auto
                                      rounded-2xl
                                      flex
                                      items-center
                                      justify-center
                                  "
                              >
                                  {stackCards.length ? (
                                      <Stack
                                          randomRotation
                                          sensitivity={150}
                                          sendToBackOnClick
                                          cardsData={stackCards}
                                      />
                                  ) : (
                                      <div className="w-full h-full flex flex-col items-center justify-center gap-3 text-[#64748b] font-mono text-xs sm:text-sm px-6 text-center">
                                          <span className="text-3xl text-[#2d3342]">[ ]</span>
                                          <span>Tambahkan photo_url di admin panel</span>
                                      </div>
                                  )}
                              </div>

                                {/* ================= PHOTO INFO ================= */}
                                <div className="mt-1.5 sm:mt-3 text-center">
                                    <p className="font-mono text-[10px] sm:text-xs text-[#ef4444] mb-0.5">
                                        <DecryptedText
                                            text="// profile.photo"
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
                            {profile.about ? (
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
                                    {profile.about}
                                </p>
                            ) : (
                                <p
                                    className="
                                        text-[#64748b]
                                        italic
                                        text-xs
                                        sm:text-sm
                                        mb-2
                                        sm:mb-4
                                        text-center
                                        w-full
                                    "
                                >
                                    Belum ada deskripsi. Tambahkan di admin panel.
                                </p>
                            )}
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
                                {/* ================= AGE ================= */}
                                <div className="bg-[#0f131c] border border-[#2d3342] rounded-md p-2 sm:p-3 text-center">
                                    <p className="text-base sm:text-2xl font-bold text-white font-mono">
                                        <CountUp to={16} duration={1.5} />
                                    </p>
                                    <p className="text-[8px] sm:text-[10px] uppercase tracking-wider text-[#64748b] font-mono mt-0.5 sm:mt-1">
                                        Usia
                                    </p>
                                </div>

                                {/* ================= START ================= */}
                                <div className="bg-[#0f131c] border border-[#2d3342] rounded-md p-2 sm:p-3 text-center">
                                    <p className="text-base sm:text-2xl font-bold text-white font-mono">
                                        <CountUp to={2021} duration={1.8} separator="" />
                                    </p>
                                    <p className="text-[8px] sm:text-[10px] uppercase tracking-wider text-[#64748b] font-mono mt-0.5 sm:mt-1">
                                        Mulai
                                    </p>
                                </div>

                                {/* ================= READY ================= */}
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
