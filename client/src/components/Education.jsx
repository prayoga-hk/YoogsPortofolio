import FadeContent from './react-bits/FadeContent';
import AnimatedContent from './react-bits/AnimatedContent';
import SpotlightCard from './react-bits/SpotlightCard';
import BlurText from './react-bits/BlurText';

const SECTION =
     'scroll-mt-16 min-h-screen flex items-start px-6 pt-20 pb-10 bg-[#0a0e16]';

export default function Education({ educations }) {
    if (!educations || educations.length === 0) {
        return (
            <section id="education" className={SECTION}>
                <div className="max-w-6xl mx-auto w-full text-center">
                    <p className="text-[#64748b] font-mono">// 04. PENDIDIKAN FORMAL</p>
                    <p className="text-[#94a3b8] mt-4">Belum ada data pendidikan.</p>
                </div>
            </section>
        );
    }

    return (
        <section id="education" className={SECTION}>
            <div className="max-w-6xl mx-auto w-full">
                <FadeContent duration={700}>
                    <p className="text-[#ef4444] font-mono text-sm mb-2">// 04. PENDIDIKAN FORMAL — Latar Belakang Akademik & Vokasi</p>
                </FadeContent>
                <BlurText
                    text="Pendidikan Formal"
                    delay={70}
                    animateBy="words"
                    className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-8"
                />

                <div className="space-y-4 max-h-[65vh] overflow-y-auto pr-1 no-scrollbar">
                    {educations.map((edu, index) => (
                        <AnimatedContent key={edu.id} distance={40} delay={index * 0.1} duration={0.75}>
                            <SpotlightCard
                                className="!rounded-md !border-[#2d3342] !bg-[#0f131c] !p-6"
                                spotlightColor="rgba(34, 197, 94, 0.18)"
                            >
                                <div className="relative z-10 flex flex-col md:flex-row md:justify-between md:items-start gap-2">
                                    <div>
                                        <h3 className="text-white text-lg font-semibold">{edu.school}</h3>
                                        <p className="text-[#94a3b8]">
                                            {edu.degree} - {edu.field_of_study}
                                        </p>
                                        <p className="text-[#64748b] text-sm font-mono">
                                            {edu.start_date && new Date(edu.start_date).getFullYear()} — {edu.end_date ? new Date(edu.end_date).getFullYear() : 'Present'}
                                        </p>
                                    </div>
                                    {edu.status && (
                                        <span className="px-3 py-1 bg-[#22c55e]/20 text-[#22c55e] text-xs rounded-full font-mono whitespace-nowrap">
                                            {edu.status}
                                        </span>
                                    )}
                                </div>
                                {edu.description && (
                                    <p className="relative z-10 text-[#94a3b8] text-sm mt-3">{edu.description}</p>
                                )}
                            </SpotlightCard>
                        </AnimatedContent>
                    ))}
                </div>
            </div>
        </section>
    );
}
