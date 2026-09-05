import BlurText from './react-bits/BlurText';
import DecryptedText from './react-bits/DecryptedText';
import FadeContent from './react-bits/FadeContent';
import AnimatedContent from './react-bits/AnimatedContent';
import Magnet from './react-bits/Magnet';
import PhotoCarousel, { resolveGalleryImages } from './PhotoCarousel';

export default function Hero({ profile, settings }) {
    const accentColor = settings?.accent_color || '#ef4444';
    const name = profile?.name || 'Ahmad Rizky Pratama';
    const title = profile?.title || 'Junior Full-Stack & Back-End Developer';
    const images = resolveGalleryImages(profile);

    return (
        <section
            id="home"
            className="
                scroll-mt-16
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
            <div className="max-w-6xl mx-auto w-full h-full flex items-center">

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
                                w-full
                                max-w-[220px]
                                sm:max-w-[260px]
                                md:max-w-[300px]
                                lg:max-w-none
                                mx-auto
                            "
                        >
                            <PhotoCarousel
                                images={images}
                                alt={name}
                                accentColor={accentColor}
                            />
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

                        {/* STATUS */}
                        <FadeContent duration={600} delay={0}>
                            <div className="hidden lg:flex items-center gap-2 mb-3">
                                <span className="w-2 h-2 rounded-full bg-[#ef4444] animate-pulse"></span>

                                <span className="text-[#94a3b8] text-sm font-mono">
                                    <DecryptedText
                                        text="Now Still Learning About Programming"
                                        animateOn="view"
                                        speed={35}
                                        maxIterations={10}
                                        className="text-[#94a3b8]"
                                        encryptedClassName="text-[#64748b]"
                                    />
                                </span>
                            </div>
                        </FadeContent>

                        {/* NAME */}
                        <BlurText
                            text={name}
                            delay={60}
                            animateBy="words"
                            direction="top"
                            className="
                                text-2xl
                                sm:text-3xl
                                md:text-4xl
                                lg:text-6xl
                                font-bold
                                text-white
                                mb-1
                                sm:mb-2
                            "
                        />

                        {/* TITLE */}
                        <FadeContent
                            duration={700}
                            delay={150}
                            blur
                        >
                            <p
                                className="
                                    text-xs
                                    sm:text-sm
                                    md:text-base
                                    lg:text-2xl
                                    text-[#94a3b8]
                                    font-mono
                                    mb-2
                                    sm:mb-3
                                "
                            >
                                &gt; {title}
                            </p>
                        </FadeContent>

                        {/* DESCRIPTION */}
                        {profile?.description && (
                            <AnimatedContent
                                distance={20}
                                delay={0.2}
                                duration={0.7}
                            >
                                <p
                                    className="
                                        text-xs
                                        sm:text-sm
                                        md:text-base
                                        text-[#94a3b8]
                                        max-w-lg
                                        mb-3
                                        sm:mb-4
                                        leading-snug
                                        line-clamp-3
                                    "
                                >
                                    {profile.description}
                                </p>
                            </AnimatedContent>
                        )}

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
                                    #RPL
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
                                    #Fedora Linux
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
                                        href="#projects"
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
