import FadeContent from './react-bits/FadeContent';
import AnimatedContent from './react-bits/AnimatedContent';
import SpotlightCard from './react-bits/SpotlightCard';
import BlurText from './react-bits/BlurText';
import Magnet from './react-bits/Magnet';

const SECTION =
  'scroll-mt-16 min-h-screen flex items-start px-6 pt-20 pb-10 bg-[#0a0e16]';
export default function Projects({ projects, settings }) {
    const accentColor = settings?.accent_color || '#ef4444';
    const spotlight = 'rgba(239, 68, 68, 0.2)';

    console.log('PROJECTS DATA:', projects);

    if (!projects || projects.length === 0) {
        return (
            <section id="projects" className={SECTION}>
                <div className="max-w-6xl mx-auto w-full text-center">
                    <p className="text-[#64748b] font-mono">// 03. KARYA PILIHAN — Deployed Projects</p>
                    <p className="text-[#94a3b8] mt-4">Belum ada project.</p>
                </div>
            </section>
        );
    }

    return (
        <section id="projects" className={SECTION}>
            <div className="max-w-6xl mx-auto w-full">
                <FadeContent duration={700}>
                    <p className="text-[#ef4444] font-mono text-sm mb-2">// 03. KARYA PILIHAN — Deployed Projects</p>
                </FadeContent>
                <BlurText
                    text="Karya Pilihan"
                    delay={70}
                    animateBy="words"
                    className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-8"
                />

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-h-[65vh] overflow-y-auto pr-1 no-scrollbar">
                    {projects.map((project, index) => (
                        <AnimatedContent
                            key={project.id}
                            distance={50}
                            delay={index * 0.1}
                            duration={0.75}
                            threshold={0.05}
                        >
                            <SpotlightCard
                                className={`!rounded-md !p-0 overflow-hidden h-full transition-all duration-300 hover:-translate-y-1 ${
                                    project.published
                                        ? '!border-[#2d3342] hover:!border-[#ef4444]'
                                        : '!border-[#2d3342]/50 opacity-60'
                                } !bg-[#0f131c]`}
                                spotlightColor={spotlight}
                            >
                                <div className="relative z-10 group">
                                    <div className="h-40 overflow-hidden bg-[#181c24]">
                                        {project.image_url ? (
                                            <img
                                                src={project.image_url}
                                                alt={project.title}
                                                className="w-full h-40 object-cover transition-transform duration-500 group-hover:scale-105"
                                                onError={(e) => { e.target.style.display = 'none'; }}
                                            />
                                        ) : (
                                            <div className="w-full h-40 flex items-center justify-center text-[#64748b] font-mono text-sm">
                                                no image
                                            </div>
                                        )}
                                    </div>
                                    <div className="p-4">
                                        <div className="flex items-center justify-between mb-1">
                                            <h3 className="text-white font-semibold transition-colors group-hover:text-[#ef4444]">
                                                {project.title}
                                            </h3>
                                            {!project.published && (
                                                <span className="text-xs px-2 py-0.5 bg-[#eab308]/20 text-[#eab308] rounded font-mono">
                                                    Draft
                                                </span>
                                            )}
                                        </div>
                                        {project.description && (
                                            <p className="text-[#94a3b8] text-sm mb-3 line-clamp-2">
                                                {project.description}
                                            </p>
                                        )}
                                        {project.technologies && Array.isArray(project.technologies) && (
                                            <div className="flex flex-wrap gap-1 mb-3">
                                                {project.technologies.slice(0, 3).map((tech, idx) => (
                                                    <span key={idx} className="text-xs px-2 py-0.5 bg-[#181c24] rounded text-[#64748b] font-mono">
                                                        {tech}
                                                    </span>
                                                ))}
                                                {project.technologies.length > 3 && (
                                                    <span className="text-xs px-2 py-0.5 bg-[#181c24] rounded text-[#64748b] font-mono">
                                                        +{project.technologies.length - 3}
                                                    </span>
                                                )}
                                            </div>
                                        )}
                                        <div className="flex gap-3">
                                            {project.demo_url && project.demo_url !== 'not available' && (
                                                <Magnet padding={20} magnetStrength={4}>
                                                    <a
                                                        href={project.demo_url}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="text-xs font-mono"
                                                        style={{ color: accentColor }}
                                                    >
                                                        Live Demo
                                                    </a>
                                                </Magnet>
                                            )}
                                            {project.github_url && (
                                                <Magnet padding={20} magnetStrength={4}>
                                                    <a
                                                        href={project.github_url}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="text-xs text-[#94a3b8] hover:text-white font-mono"
                                                    >
                                                        GitHub
                                                    </a>
                                                </Magnet>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </SpotlightCard>
                        </AnimatedContent>
                    ))}
                </div>
            </div>
        </section>
    );
}
