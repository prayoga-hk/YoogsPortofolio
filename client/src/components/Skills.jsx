import FadeContent from './react-bits/FadeContent';
import AnimatedContent from './react-bits/AnimatedContent';
import SpotlightCard from './react-bits/SpotlightCard';
import BlurText from './react-bits/BlurText';

const SECTION =
    'scroll-mt-16 min-h-screen h-screen flex items-center px-4 sm:px-6 pt-16 pb-8 bg-[#0a0e16] overflow-hidden';

export default function Skills({ skills, settings }) {
    const accentColor = settings?.accent_color || '#ef4444';

    // =====================================================
    // LEVEL → PERSENTASE + WARNA
    // =====================================================
    const LEVEL_STYLES = {
        Beginner: {
            percentage: 25,
            text: 'text-[#64748b]',
            bar: '#64748b',
        },

        Intermediate: {
            percentage: 50,
            text: 'text-[#ef4444]',
            bar: '#ef4444',
        },

        Advanced: {
            percentage: 75,
            text: 'text-[#ef4444]',
            bar: '#ef4444',
        },

        Expert: {
            percentage: 100,
            text: 'text-[#ef4444]',
            bar: '#ef4444',
        },
    };

    // =====================================================
    // MENGAMBIL STYLE BERDASARKAN LEVEL
    // =====================================================
    const getLevelStyle = (level) => {
        return (
            LEVEL_STYLES[level] || {
                percentage: 50,
                text: 'text-[#ef4444]',
                bar: '#ef4444',
            }
        );
    };

    // Warna spotlight mengikuti accent color dari settings
    const spotlight = `${accentColor}40`;

    // =====================================================
    // JIKA BELUM ADA DATA SKILL
    // =====================================================
    if (!skills || skills.length === 0) {
        return (
            <section id="skills" className={SECTION}>
                <div className="max-w-6xl mx-auto w-full text-center">
                    <p className="text-[#64748b] font-mono text-xs sm:text-sm">
                        // 02. KEAHLIAN & TECH STACK
                    </p>

                    <p className="text-[#94a3b8] mt-4 text-sm">
                        Belum ada data skill.
                    </p>
                </div>
            </section>
        );
    }

    // =====================================================
    // MAIN SECTION
    // =====================================================
    return (
        <section id="skills" className={SECTION}>
            <div className="max-w-6xl mx-auto w-full h-full flex flex-col justify-center">

                {/* =================================================
                    HEADER
                ================================================= */}
                <div className="mb-6 sm:mb-8">

                    <FadeContent
                        blur
                        duration={700}
                        threshold={0.1}
                    >
                        <p className="text-[#ef4444] font-mono text-xs sm:text-sm mb-2">
                            // 02. KEAHLIAN & TECH STACK
                        </p>
                    </FadeContent>

                    <BlurText
                        text="Keahlian & Tech Stack"
                        delay={70}
                        animateBy="words"
                        className="
                            text-3xl
                            sm:text-4xl
                            lg:text-5xl
                            font-bold
                            text-white
                        "
                    />
                </div>

                {/* =================================================
                    SKILLS LIST
                ================================================= */}
                <div
                    className="
                        space-y-3
                        sm:space-y-4
                        max-h-[65vh]
                        overflow-y-auto
                        pr-1
                        no-scrollbar
                    "
                >
                    {skills.map((skill, index) => {

                        // Ambil level dari database
                        const level = skill.level || 'Intermediate';

                        // Ambil warna + persentase berdasarkan level
                        const style = getLevelStyle(level);

                        // Persentase otomatis dari level
                        const percentage = style.percentage;

                        return (
                            <AnimatedContent
                                key={skill.id}
                                distance={40}
                                delay={index * 0.08}
                                duration={0.7}
                                threshold={0.05}
                            >
                                <SpotlightCard
                                    className="
                                        !rounded-md
                                        !border-[#2d3342]
                                        !bg-[#0f131c]
                                        !p-4
                                        hover:!border-[#3d4456]
                                        transition-colors
                                    "
                                    spotlightColor={spotlight}
                                >
                                    <div className="relative z-10">

                                        {/* =================================
                                            NAMA + LEVEL + PERSENTASE
                                        ================================= */}
                                        <div
                                            className="
                                                flex
                                                justify-between
                                                items-center
                                                gap-4
                                                mb-2
                                            "
                                        >
                                            {/* Nama skill */}
                                            <span
                                                className="
                                                    text-white
                                                    font-medium
                                                    truncate
                                                "
                                            >
                                                {skill.name}
                                            </span>

                                            {/* Level + percentage */}
                                            <span
                                                className={`
                                                    text-xs
                                                    sm:text-sm
                                                    font-mono
                                                    whitespace-nowrap
                                                    ${style.text}
                                                `}
                                            >
                                                {level} ({percentage}%)
                                            </span>
                                        </div>

                                        {/* =================================
                                            PROGRESS BAR
                                        ================================= */}
                                        <div
                                            className="
                                                w-full
                                                bg-[#181c24]
                                                rounded-full
                                                h-1.5
                                                overflow-hidden
                                            "
                                        >
                                            <div
                                                className="
                                                    h-1.5
                                                    rounded-full
                                                    transition-all
                                                    duration-1000
                                                    ease-out
                                                "
                                                style={{
                                                    width: `${percentage}%`,
                                                    backgroundColor:
                                                        style.bar,
                                                }}
                                            />
                                        </div>

                                        {/* =================================
                                            CATEGORY
                                        ================================= */}
                                        {skill.category && (
                                            <p
                                                className="
                                                    text-[#64748b]
                                                    text-xs
                                                    font-mono
                                                    mt-1.5
                                                "
                                            >
                                                {skill.category}
                                            </p>
                                        )}

                                    </div>
                                </SpotlightCard>
                            </AnimatedContent>
                        );
                    })}
                </div>

            </div>
        </section>
    );
}
