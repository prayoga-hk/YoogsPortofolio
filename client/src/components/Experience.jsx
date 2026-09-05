import FadeContent from './react-bits/FadeContent';
import AnimatedContent from './react-bits/AnimatedContent';
import SpotlightCard from './react-bits/SpotlightCard';
import BlurText from './react-bits/BlurText';

const SECTION =
  'scroll-mt-16 min-h-screen flex items-start px-6 pt-20 pb-10 bg-[#0a0e16]';
export default function Experience({ experiences }) {
    if (!experiences || experiences.length === 0) {
        return (
            <section id="experience" className={SECTION}>
                <div className="max-w-6xl mx-auto w-full text-center">
                    <p className="text-[#64748b] font-mono">// 05. PENGALAMAN KERJA & ORGANISASI</p>
                    <p className="text-[#94a3b8] mt-4">Belum ada data pengalaman.</p>
                </div>
            </section>
        );
    }

    return (
        <section id="experience" className={SECTION}>
            <div className="max-w-6xl mx-auto w-full">
                <FadeContent duration={700}>
                    <p className="text-[#ef4444] font-mono text-sm mb-2">// 05. PENGALAMAN KERJA & ORGANISASI</p>
                </FadeContent>
                <BlurText
                    text="Pengalaman Kerja & Organisasi"
                    delay={60}
                    animateBy="words"
                    className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-8"
                />

                <div className="space-y-4 max-h-[65vh] overflow-y-auto pr-1 no-scrollbar">
                    {experiences.map((exp, index) => (
                        <AnimatedContent key={exp.id} distance={40} delay={index * 0.1} duration={0.75}>
                            <SpotlightCard
                                className="!rounded-md !border-[#2d3342] !bg-[#0f131c] !p-6"
                                spotlightColor="rgba(239, 68, 68, 0.2)"
                            >
                                <div className="relative z-10 flex flex-col md:flex-row md:justify-between md:items-start gap-2">
                                    <div>
                                        <h3 className="text-white text-lg font-semibold">{exp.title}</h3>
                                        <p className="text-[#94a3b8]">{exp.company}</p>
                                        <p className="text-[#64748b] text-sm font-mono">
                                            {exp.start_date && new Date(exp.start_date).toLocaleDateString('id-ID', { year: 'numeric', month: 'short' })} — {exp.end_date ? new Date(exp.end_date).toLocaleDateString('id-ID', { year: 'numeric', month: 'short' }) : 'Present'}
                                        </p>
                                    </div>
                                    {exp.status && (
                                        <span className="px-3 py-1 bg-[#ef4444]/20 text-[#ef4444] text-xs rounded-full font-mono whitespace-nowrap">
                                            {exp.status}
                                        </span>
                                    )}
                                </div>
                                {exp.description && (
                                    <p className="relative z-10 text-[#94a3b8] text-sm mt-3">{exp.description}</p>
                                )}
                                {exp.technologies && Array.isArray(exp.technologies) && exp.technologies.length > 0 && (
                                    <div className="relative z-10 flex flex-wrap gap-1 mt-3">
                                        {exp.technologies.map((tech, idx) => (
                                            <span key={idx} className="text-xs px-2 py-0.5 bg-[#181c24] rounded text-[#64748b] font-mono">
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
                                )}
                            </SpotlightCard>
                        </AnimatedContent>
                    ))}
                </div>
            </div>
        </section>
    );
}
