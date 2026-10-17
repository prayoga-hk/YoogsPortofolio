import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { motion } from 'motion/react';
import ScanLine from './ScanLine';
import { ArrowUpRight } from 'lucide-react'; // Ikon aman dari lucide
import { SiGithub } from 'react-icons/si'; // Ikon Github dari react-icons

function hasUrl(url) {
    if (typeof url !== 'string') return false;
    const value = url.trim().toLowerCase();
    return value !== '' && value !== '#' && value !== 'not available';
}

export default function ProjectModal({ project, onClose }) {
    const closeRef = useRef(null);

    useEffect(() => {
        const previouslyFocused = document.activeElement;
        const previousOverflow = document.body.style.overflow;
        document.body.style.overflow = 'hidden';
        closeRef.current?.focus();

        const onKeyDown = (e) => {
            if (e.key === 'Escape') onClose();
        };
        window.addEventListener('keydown', onKeyDown);

        return () => {
            window.removeEventListener('keydown', onKeyDown);
            document.body.style.overflow = previousOverflow;
            previouslyFocused?.focus?.();
        };
    }, [onClose]);

    // Pengaman jika project undefined
    if (!project) return null;

    const showDemo = hasUrl(project.demo_url);
    const showGithub = hasUrl(project.github_url);

    // Cek gambar dengan optional chaining agar tidak crash
    const projectImage = project.image_url || project.thumbnail || project.cover_image;

    return createPortal(
        <motion.div
            className="fixed inset-0 z-[60] flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm sm:p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
        >
            <motion.div
                role="dialog"
                aria-modal="true"
                aria-labelledby="project-modal-title"
                className="relative flex max-h-[90vh] w-full max-w-2xl flex-col overflow-hidden border border-[#F85149] bg-[#090D16] shadow-2xl"
                initial={{ opacity: 0, scale: 0.95, y: 16 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 16 }}
                transition={{ duration: 0.2 }}
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex items-center justify-between border-b border-[#F85149]/30 bg-[#151A23] px-4 py-3">
                    <div className="flex items-center gap-2">
                        <div className="flex gap-1.5">
                            <span className="h-3 w-3 rounded-full bg-[#FF5F56]"></span>
                            <span className="h-3 w-3 rounded-full bg-[#FFBD2E]"></span>
                            <span className="h-3 w-3 rounded-full bg-[#27C93F]"></span>
                        </div>
                        <span className="ml-2 hidden font-mono text-xs text-white/50 sm:inline-block">
                            project_detail.sh
                        </span>
                    </div>

                    <button
                        ref={closeRef}
                        type="button"
                        onClick={onClose}
                        aria-label="Tutup detail project"
                        className="shrink-0 font-mono text-xs text-white/60 transition-colors duration-200 hover:text-[#F85149] focus-visible:text-[#F85149] focus-visible:outline-none"
                    >
                        [esc] close
                    </button>
                </div>

                <div className="relative flex-1 overflow-y-auto custom-scrollbar">
                    <ScanLine className="w-full" />


                    {projectImage && (
                        <div className="relative aspect-video w-full border-b border-white/10 bg-black/50">
                            <img
                                src={projectImage}
                                alt={`Thumbnail ${project.title}`}
                                className="h-full w-full object-cover opacity-90 hover:opacity-100 transition-opacity"
                                loading="lazy"
                            />
                        </div>
                    )}


                    <div className="p-5 sm:p-6 font-mono">
                        <h3 id="project-modal-title" className="text-2xl sm:text-3xl font-bold text-white mb-4">
                            {project.title}
                        </h3>

                        <div className="mb-6">
                            <p className="mb-2 text-sm text-[#F85149]">$ cat description.txt</p>
                            <p className="whitespace-pre-line text-sm leading-relaxed text-white/80">
                                {project.longDescription || project.description}
                            </p>
                        </div>

                        {project.tech?.length > 0 && (
                            <div className="mb-6 border-t border-dashed border-white/20 pt-4">
                                <p className="mb-3 text-sm text-[#F85149]">$ ls tech-stack/</p>
                                <ul className="flex flex-wrap gap-2" aria-label="Tech stack">
                                    {project.tech.map((tech) => (
                                        <li
                                            key={tech}
                                            className="border border-[#F85149]/50 bg-[#F85149]/10 px-2.5 py-1 text-xs text-white"
                                        >
                                            #{tech}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                </div>

                <div className="border-t border-white/10 bg-[#090D16] p-4 sm:px-6">
                    <div className="flex flex-wrap items-center gap-3">
                        {showDemo && (
                            <a
                                href={project.demo_url}
                                target="_blank"
                                rel="noreferrer"
                                className="group flex items-center gap-2 border border-[#F85149] bg-[#F85149] px-4 py-2 text-sm text-white transition-all duration-200 hover:bg-[#F85149]/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                            >
                                <ArrowUpRight size={16} className="group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform" />
                                <span className="font-mono font-bold">Live Demo</span>
                            </a>
                        )}
                        {showGithub && (
                            <a
                                href={project.github_url}
                                target="_blank"
                                rel="noreferrer"
                                className="group flex items-center gap-2 border border-white/30 px-4 py-2 text-sm text-white transition-colors duration-200 hover:border-white hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                            >
                                <SiGithub size={16} />
                                <span className="font-mono">GitHub Repo</span>
                            </a>
                        )}
                        {!showDemo && !showGithub && (
                            <p className="text-sm font-mono text-white/50">[!] Details coming soon</p>
                        )}
                    </div>
                </div>
            </motion.div>
        </motion.div>,
        document.body
    );
}
