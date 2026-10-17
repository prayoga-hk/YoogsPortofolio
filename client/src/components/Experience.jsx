import { useEffect, useState } from 'react';
import { Award, Briefcase, GraduationCap } from 'lucide-react';
import ScanLine from './ScanLine';

const TABS = [
    { id: 'study', key: 's', label: 'Study' },
    { id: 'credential', key: 'c', label: 'Credential' },
    { id: 'work', key: 'w', label: 'Work' },
];

const NEWEST_FIRST = false;

const EMPTY_STATES = {
    study: { Icon: GraduationCap, text: 'No education yet' },
    credential: { Icon: Award, text: 'No credentials yet' },
    work: { Icon: Briefcase, text: 'No work experience yet' },
};

function isTypingTarget(el) {
    if (!el) return false;
    return (
        el.tagName === 'INPUT' ||
        el.tagName === 'TEXTAREA' ||
        el.tagName === 'SELECT' ||
        el.isContentEditable
    );
}

const formatYear = (date) => (date ? new Date(date).getFullYear() : null);
const formatMonth = (date) =>
    date
        ? new Date(date).toLocaleDateString('id-ID', { year: 'numeric', month: 'short' })
        : null;

function mapTimelineItem(item) {
    let timeline = '';

    if (item.start_date || item.end_date) {
        const isStudy = item.type === 'study';
        const start = isStudy ? formatYear(item.start_date) : formatMonth(item.start_date);
        const end = item.end_date
            ? (isStudy ? formatYear(item.end_date) : formatMonth(item.end_date))
            : 'Present';

        if (start && end) timeline = `${start} — ${end}`;
        else if (start) timeline = `${start} — Present`;
        else if (end) timeline = `— ${end}`;
    }

    return {
        id: item.id,
        title: item.title,
        subtitle: item.subtitle,
        timeline,
        description: item.description,
        status: item.status,
        tags: item.tags || [],
    };
}

function TimelineCard({ item }) {
    return (
        <article className="group w-full border border-[#F85149] p-[clamp(0.75rem,0.9vw,1.25rem)] lg:w-[66%]">
            <ScanLine
                onlyOnHover
                className="mb-[clamp(0.5rem,0.8vw,1rem)]"
            />

            <div className="flex items-start justify-between gap-3">
                <h3 className="font-mono text-[clamp(1.125rem,1.7vw,2.5rem)] text-white">{item.title}</h3>
                {item.status && (
                    <span className="shrink-0 border border-[#22C55E]/60 px-2 py-0.5 font-mono text-xs text-[#22C55E]">
                        {item.status}
                    </span>
                )}
            </div>

            <hr className="my-[clamp(0.5rem,0.8vw,1rem)] border-white/30" />

            {item.timeline && (
                <p className="font-mono text-[clamp(0.8rem,1vw,1.5rem)] text-white/50">{item.timeline}</p>
            )}
            {item.subtitle && (
                <p className="mt-1 font-mono text-[clamp(0.8rem,1vw,1.5rem)] text-white/80">{item.subtitle}</p>
            )}
            {item.description && (
                <p className="mt-3 font-mono text-[clamp(0.95rem,1.3vw,2rem)] text-white">{item.description}</p>
            )}

            {item.tags.length > 0 && (
                <ul className="mt-3 flex flex-wrap gap-2">
                    {item.tags.map((tag) => (
                        <li
                            key={tag}
                            className="border border-[#F85149]/60 px-2 py-0.5 font-mono text-xs text-white"
                        >
                            {tag}
                        </li>
                    ))}
                </ul>
            )}
        </article>
    );
}

function EmptyState({ tabId }) {
    const { Icon, text } = EMPTY_STATES[tabId];
    return (
        <div className="flex flex-col items-center gap-3 border border-dashed border-[#F85149]/50 py-14 font-mono text-white/60">
            <Icon aria-hidden="true" className="size-8" strokeWidth={1.5} />
            <p>{text}</p>
        </div>
    );
}

export default function Experience({ timelines = [], settings }) {
    const [activeTab, setActiveTab] = useState('study');

    useEffect(() => {
        const onKeyDown = (e) => {
            if (e.ctrlKey || e.metaKey || e.altKey || e.shiftKey) return;
            if (isTypingTarget(e.target)) return;
            if (document.querySelector('[aria-modal="true"]')) return;

            const tab = TABS.find((t) => t.key === e.key.toLowerCase());
            if (tab) setActiveTab(tab.id);
        };
        window.addEventListener('keydown', onKeyDown);
        return () => window.removeEventListener('keydown', onKeyDown);
    }, []);

    const items = timelines
        .filter((item) => item.type === activeTab)
        .map(mapTimelineItem);

    const sortedItems = NEWEST_FIRST ? [...items].reverse() : items;

    return (
        <section
            id="experience"
            className="flex min-h-screen scroll-mt-16 flex-col justify-center bg-[#090D16] px-4 py-24 sm:px-8"
        >
            <div className="mx-auto w-full lg:w-[74%]">
                <h2 className="text-center font-mono text-6xl font-semibold  text-[#F85149] text-6xl font-semibold">
                    My Experience
                </h2>


                <div
                    role="tablist"
                    aria-label="Kategori experience"
                    className="mt-14 flex flex-wrap gap-x-8 gap-y-2"
                >
                    {TABS.map((tab) => {
                        const isActive = activeTab === tab.id;
                        return (
                            <button
                                key={tab.id}
                                type="button"
                                role="tab"
                                id={`tab-${tab.id}`}
                                aria-selected={isActive}
                                aria-controls="experience-panel"
                                aria-keyshortcuts={tab.key}
                                onClick={() => setActiveTab(tab.id)}
                                className={`font-mono text-[clamp(1rem,1.2vw,1.75rem)] transition-colors duration-200 hover:text-[#F85149] focus-visible:text-[#F85149] focus-visible:outline-none ${
                                    isActive ? 'text-[#F85149]' : 'text-white'
                                }`}
                            >
                                [{tab.key}] {tab.label}
                            </button>
                        );
                    })}
                </div>


                <div
                    role="tabpanel"
                    id="experience-panel"
                    aria-labelledby={`tab-${activeTab}`}
                    className="mt-8"
                >
                    {sortedItems.length === 0 ? (
                        <EmptyState tabId={activeTab} />
                    ) : (
                        <div className="flex flex-col gap-4">
                            {sortedItems.map((item) => (
                                <TimelineCard key={item.id} item={item} />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}
