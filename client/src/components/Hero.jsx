import BlurText from './react-bits/BlurText';
import AnimatedContent from './react-bits/AnimatedContent';
import Magnet from './react-bits/Magnet';
import DotGrid from './react-bits/DotGrid';
import TiltedCard from './react-bits/TiltedCard';
import { resolvePrimaryPhoto } from './PhotoCarousel';

export default function Hero({ profile, settings }) {
    const accentColor = settings?.accent_color || '#ef4444';
    const name = profile?.name || 'Ahmad Rizky Pratama';
    const photoUrl = resolvePrimaryPhoto(profile);

    return (
        <section
            id="home"
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

        {/* ================= DOTFIELD BACKGROUND ================= */}
        <div className="absolute inset-0 z-0 pointer-events-none">
            <DotGrid
            dotSize={4}
                gap={16}
                baseColor="#1e293b"
                activeColor="#ef4444"
                proximity={120}
                shockRadius={200}
                shockStrength={4}
                resistance={750}
                returnDuration={1.5}
            />
        </div>

            <div className="relative z-10 max-w-6xl mx-auto w-full h-full flex items-center">

                <div
                    className="
                        w-full
                        grid
                        grid-cols-1
                        lg:grid-cols-2
                        gap-4
                        sm:gap-6
                        lg:gap-12
                        items-center
                        max-h-full
                    "
                >

                    {/* ================= PHOTO ================= */}
                    <AnimatedContent
                        distance={50}
                        direction="horizontal"
                        delay={0.15}
                        duration={0.9}
                        className="order-1 lg:order-2"
                    >
                        <div
                            className="
                                relative
                                w-full
                                max-w-[220px]
                                sm:max-w-[260px]
                                md:max-w-[300px]
                                lg:max-w-none
                                lg:ml-20
                                mx-auto
                            "
                        >

                            <div
                                className="
                                    relative
                                    aspect-[4/5]
                                    max-h-[70vh]
                                    rounded-2xl
                                "
                            >
                                {photoUrl ? (
                                    <TiltedCard
                                        imageSrc={photoUrl}
                                        altText={name}
                                        captionText={name}
                                        containerHeight="90%"
                                        containerWidth="90%"
                                        imageHeight="90%"
                                        imageWidth="90%"
                                        rotateAmplitude={12}
                                        scaleOnHover={1.05}
                                        showMobileWarning={false}
                                        showTooltip={true}
                                        displayOverlayContent={false}
                                    />
                                ) : (
                                    <div className="w-full h-full flex flex-col items-center justify-center gap-3 text-[#64748b] font-mono text-xs sm:text-sm px-6 text-center">
                                        <span className="text-4xl text-[#2d3342]">
                                            [ ]
                                        </span>

                                        <span>
                                            Tambahkan foto gallery di /admin/profile
                                        </span>
                                    </div>
                                )}
                            </div>
                        </div>
                    </AnimatedContent>

                    {/* ================= TEXT ================= */}
                    <div
                        className="
                            order-2
                            lg:order-1
                            text-center
                            lg:text-left
                            flex
                            flex-col
                            items-center
                            lg:items-start
                        "
                    >

                        {/* NAME */}
                        <BlurText
                            text={name}
                            delay={60}
                            animateBy="words"
                            direction="top"
                            className="
                                text-2xl
                                sm:text-4xl
                                md:text-5xl
                                lg:text-7xl
                                font-bold
                                text-white
                                mb-1
                                sm:mb-2
                            "
                        />

                        {/* TAGS */}
                        <AnimatedContent
                            distance={15}
                            delay={0.3}
                            duration={0.6}
                        >
                            <div
                                className="
                                    flex
                                    flex-wrap
                                    justify-center
                                    lg:justify-start
                                    gap-1.5
                                    sm:gap-2
                                    mb-3
                                    sm:mb-4
                                    lg:mb-6
                                "
                            >
                                <span className="
                                    px-2
                                    py-1
                                    sm:px-2.5
                                    sm:py-1
                                    bg-[#181c24]
                                    border
                                    border-[#2d3342]
                                    rounded
                                    text-[9px]
                                    sm:text-[11px]
                                    lg:text-xs
                                    text-[#94a3b8]
                                    font-mono
                                ">
                                    #Student
                                </span>

                                <span className="
                                    px-2
                                    py-1
                                    sm:px-2.5
                                    sm:py-1
                                    bg-[#181c24]
                                    border
                                    border-[#2d3342]
                                    rounded
                                    text-[9px]
                                    sm:text-[11px]
                                    lg:text-xs
                                    text-[#94a3b8]
                                    font-mono
                                ">
                                    #Tech Enthusiast
                                </span>

                                <span className="
                                    hidden
                                    sm:inline-block
                                    px-2
                                    py-1
                                    sm:px-2.5
                                    sm:py-1
                                    bg-[#181c24]
                                    border
                                    border-[#2d3342]
                                    rounded
                                    text-[9px]
                                    sm:text-[11px]
                                    lg:text-xs
                                    text-[#94a3b8]
                                    font-mono
                                ">
                                    #Programmer
                                </span>
                            </div>
                        </AnimatedContent>

                        {/* BUTTONS */}
                        <AnimatedContent
                            distance={15}
                            delay={0.4}
                            duration={0.6}
                        >
                            <div
                                className="
                                    flex
                                    flex-wrap
                                    justify-center
                                    lg:justify-start
                                    gap-2
                                    sm:gap-3
                                    lg:gap-4
                                "
                            >

                                {/* PROJECT BUTTON */}
                                <Magnet
                                    padding={25}
                                    magnetStrength={2}
                                >
                                    <a
                                        href="https://github.com/prayoga-hk"
                                        className="
                                            inline-block
                                            px-3.5
                                            sm:px-4
                                            lg:px-6
                                            py-2
                                            sm:py-2.5
                                            lg:py-3
                                            rounded
                                            text-white
                                            text-xs
                                            sm:text-sm
                                            lg:text-base
                                            font-mono
                                            transition
                                            hover:opacity-80
                                        "
                                        style={{
                                            backgroundColor: accentColor
                                        }}
                                    >
                                        [&gt;] Lihat Proyek
                                    </a>
                                </Magnet>

                                {/* CONTACT BUTTON */}
                                <Magnet
                                    padding={25}
                                    magnetStrength={2}
                                >
                                    <a
                                        href="#contact"
                                        className="
                                            inline-block
                                            px-3.5
                                            sm:px-4
                                            lg:px-6
                                            py-2
                                            sm:py-2.5
                                            lg:py-3
                                            rounded
                                            border
                                            border-[#2d3342]
                                            text-white
                                            text-xs
                                            sm:text-sm
                                            lg:text-base
                                            font-mono
                                            hover:bg-[#181c24]
                                            transition
                                        "
                                    >
                                        [#] Hubungi Saya
                                    </a>
                                </Magnet>

                            </div>
                        </AnimatedContent>

                    </div>

                </div>
            </div>
        </section>
    );
}
