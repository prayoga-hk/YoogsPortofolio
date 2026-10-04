import FadeContent from './react-bits/FadeContent';
import BlurText from './react-bits/BlurText';
import ChromaGrid from './react-bits/ChromaGrid';

const SECTION =
    'scroll-mt-16 min-h-screen flex items-center px-4 sm:px-6 pt-16 pb-8 bg-[#0a0e16]';

// =====================================================
// DATA SKILL STATIS (TANPA DATABASE)
// =====================================================
// Silakan sesuaikan nama, kategori, dan path gambarnya
const SKILLS_DATA = [
    {
        id: 1,
        name: 'Laravel',
        category: 'Backend',
        image: '/images/skill/laravel.svg',
    },
    {
        id: 2,
        name: 'Bootstrap',
        category: 'Frontend',
        image: '/images/skill/bootstrap.svg',
    },
    {
        id: 3,
        name: 'React.js',
        category: 'Frontend',
        image: '/images/skill/react.svg',
    },
    {
        id: 4,
        name: 'Tailwind CSS',
        category: 'Frontend',
        image: '/images/skill/tailwind.svg',
    },
    {
        id: 5,
        name: 'Java',
        category: 'Backend',
        image: '/images/skill/java.svg',
    },
    {
        id: 6,
        name: 'MySQL',
        category: 'Database',
        image: '/images/skill/mysql.svg',
    },
    {
        id: 7,
        name: 'Git',
        category: 'Tools',
        image: '/images/skill/git.svg',
    },
    {
        id: 8,
        name: 'Figma',
        category: 'Tools',
        image: '/images/skill/figma.svg',
    },
    {
        id: 9,
        name: 'Fedora',
        category: 'OS',
        image: '/images/skill/fedora.svg',
    },
    {
        id: 10,
        name: 'Windows',
        category: 'OS',
        image: '/images/skill/windows.svg',
    },
];

export default function Skills() {
    const accentColor = '#ef4444'; // Warna aksen merah statis

    // =====================================================
    // MAPPING DATA SKILL KE FORMAT CHROMAGRID
    // =====================================================
    const gridItems = SKILLS_DATA.map((skill) => ({
        image: skill.image,
        title: skill.name,
        subtitle: skill.category,
        handle: '',
        borderColor: accentColor,
        gradient: 'linear-gradient(145deg, #1e293b, #0f172a)',
        url: '#',
    }));

    return (
        <section id="skills" className={SECTION}>
            <div className="max-w-6xl mx-auto w-full h-full flex flex-col justify-center">

                {/* =================================================
                    HEADER
                ================================================= */}
                <div className="mb-6 sm:mb-8">
                    <FadeContent blur duration={700} threshold={0.1}>
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
                    CHROMAGRID SECTION
                ================================================= */}
                <div className="w-full flex-1 flex items-center justify-center">
                    <ChromaGrid
                        items={gridItems}
                        columns={4} // 4 kolom untuk 8 skill (2 baris)
                        radius={300}
                        damping={0.45}
                        fadeOut={0.6}
                        className="w-full"
                    />
                </div>

            </div>
        </section>
    );
}
