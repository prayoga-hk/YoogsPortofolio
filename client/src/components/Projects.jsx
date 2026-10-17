import { useCallback, useState } from 'react';
import { AnimatePresence } from 'motion/react';
import ScanLine from './ScanLine';
import ProjectModal from './ProjectModal';

const SECTION =
    'flex min-h-screen scroll-mt-16 flex-col justify-center bg-[#090D16] px-4 py-24 sm:px-8';

function normalizeProject(project) {
    const rawTech = project.tech ?? project.technologies ?? project.tech_stack;
    let tech = [];
    if (Array.isArray(rawTech)) tech = rawTech;
    else if (typeof rawTech === 'string') {
        tech = rawTech.split(',').map((t) => t.trim()).filter(Boolean);
    }

    return {
        id: project.id,
        title: project.title,
        description: project.description,
        longDescription:
            project.longDescription ??
            project.long_description ??
            project.content ??
            project.description,
        tech,
        demo_url: project.demo_url ?? project.live_url,
        github_url: project.github_url,
        published: project.published,
        image_url: project.image_url,
    };
}

export default function Projects({ projects, settings }) {
    const [selected, setSelected] = useState(null);
    const handleClose = useCallback(() => setSelected(null), []);

    if (!projects || projects.length === 0) {
        return (
            <section id="projects" className={SECTION}>
                <h2 className="text-center font-mono text-4xl text-[#F85149] md:text-5xl">
                    My Project
                </h2>
                <p className="mt-10 text-center font-mono text-white/60">
                    No projects yet.
                </p>
            </section>
        );
    }

    const items = projects.map(normalizeProject);

    return (
        <section id="projects" className={SECTION}>
            <div className="mx-auto w-full lg:w-[74%]">
                <h2 className="text-center font-mono text-6xl font-semibold text-[#F85149] md:text-6xl font-semibold">
                    My Project
                </h2>


                <div className="mt-14 grid pl-px pt-px md:grid-cols-3">
                    {items.map((project) => (
                        <article
                            key={project.id}
                            className={`group -ml-px -mt-px flex min-h-[19rem] flex-col border border-[#F85149] p-[clamp(0.75rem,1.1vw,1.5rem)] md:aspect-[1/1.05] ${
                                project.published === false ? 'opacity-60' : ''
                            }`}
                        >
                            <ScanLine
                                onlyOnHover
                                className="mb-[clamp(0.5rem,1vw,1.25rem)]"
                            />

                            <h3 className="font-mono text-[clamp(1.125rem,1.85vw,2.75rem)] text-white">
                                {project.title}
                                {project.published === false && (
                                    <span className="ml-2 text-[0.55em] text-white/50">[draft]</span>
                                )}
                            </h3>
                            <hr className="my-[clamp(0.5rem,1vw,1.25rem)] border-white/30" />
                            <p className="line-clamp-5 font-mono text-[clamp(0.875rem,1.35vw,2rem)] text-white/90">
                                {project.description}
                            </p>


                            {project.tech.length > 0 && (
                                <div className="mt-auto flex flex-wrap gap-x-3 gap-y-1 pb-[clamp(0.75rem,1.2vw,1.5rem)] font-mono text-[clamp(0.75rem,1.1vw,1.25rem)] text-white/70">
                                    {project.tech.map((t) => (
                                        <span key={t}># {t}</span>
                                    ))}
                                </div>
                            )}
                            {/* ============================================== */}

                            <button
                                type="button"
                                onClick={() => setSelected(project)}
                                className="w-full border border-[#F85149]/60 py-[clamp(0.5rem,0.8vw,1.25rem)] font-mono text-[clamp(1rem,1.85vw,2.75rem)] text-white transition-colors duration-200 hover:border-[#F85149] hover:bg-[#F85149] hover:text-white focus-visible:border-[#F85149] focus-visible:bg-[#F85149] focus-visible:outline-none"
                            >
                                View Details
                            </button>
                        </article>
                    ))}
                </div>
            </div>

            <AnimatePresence>
                {selected && (
                    <ProjectModal
                        key={selected.id}
                        project={selected}
                        onClose={handleClose}
                    />
                )}
            </AnimatePresence>
        </section>
    );
}
