import { useEffect } from 'react';

// ==================== KONFIGURASI ====================
const ACCENT_COLOR = '#F85149';
const LOGO_TEXT = 'pryg';

// key  = tombol hotkey (angka)
// id   = id section di Home.jsx (harus sama dengan id di tiap komponen)
const NAV_LINKS = [
    { key: '0', label: 'Home', id: 'home' },
    { key: '1', label: 'About', id: 'about' },
    { key: '2', label: 'Skill', id: 'skills' },
    { key: '3', label: 'Project', id: 'projects' },
    { key: '4', label: 'Experience', id: 'experience' },
    { key: '5', label: 'Contact', id: 'contact' },
];
// =====================================================

// Hotkey dilewati kalau user sedang mengetik
function isTypingTarget(el) {
    if (!el) return false;
    const tag = el.tagName;
    return (
        tag === 'INPUT' ||
        tag === 'TEXTAREA' ||
        tag === 'SELECT' ||
        el.isContentEditable
    );
}

function scrollToSection(id) {
    const el = document.getElementById(id);
    if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

// profile & settings tetap diterima supaya Home.jsx tidak perlu diubah
// eslint-disable-next-line no-unused-vars
export default function Navbar({ profile, settings }) {
    useEffect(() => {
        const handleKeyDown = (e) => {
            // Jangan bentrok dengan shortcut browser (Ctrl+1, Cmd+1, Alt+1, dll)
            if (e.ctrlKey || e.metaKey || e.altKey || e.shiftKey) return;
            // Skip kalau fokus di input / textarea
            if (isTypingTarget(e.target)) return;
            // Skip kalau ada modal terbuka (mis. detail project)
            if (document.querySelector('[aria-modal="true"]')) return;

            const link = NAV_LINKS.find((item) => item.key === e.key);
            if (!link) return;

            e.preventDefault();
            scrollToSection(link.id);
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    return (
        <header
            className="
                fixed
                top-0
                left-0
                right-0
                z-50

                border-b
                border-[#F85149]/80

                bg-[#090D16]/60
                backdrop-blur-md
                supports-[backdrop-filter]:bg-[#090D16]/40
            "
        >
            <div
                className="
                    flex
                    items-center
                    justify-between
                    gap-3
                    sm:gap-6

                    w-full
                    h-14
                    sm:h-16

                    px-4
                    sm:px-8
                "
            >
                {/* LOGO */}
                <a
                    href="#home"
                    className="
                        shrink-0
                        font-mono
                        text-base
                        sm:text-xl
                        font-medium
                        tracking-tight
                        text-white
                        whitespace-nowrap
                    "
                >
                    <span style={{ color: ACCENT_COLOR }}>@</span>
                    {LOGO_TEXT}
                </a>

                {/* MENU */}
                <nav
                    aria-label="Navigasi utama"
                    className="
                        flex
                        items-center
                        gap-1
                        sm:gap-4

                        min-w-0
                        overflow-x-auto
                        no-scrollbar
                    "
                >
                    {NAV_LINKS.map((link) => (
                        <a
                            key={link.id}
                            href={`#${link.id}`}
                            aria-keyshortcuts={link.key}
                            title={`Tekan ${link.key}`}
                            className="
                                shrink-0
                                whitespace-nowrap

                                px-1.5
                                py-1

                                font-mono
                                text-[11px]
                                sm:text-sm
                                text-white

                                transition-colors
                                duration-200

                                hover:text-[#F85149]
                                focus-visible:text-[#F85149]
                                focus-visible:outline-none
                            "
                        >
                            [{link.key}]{link.label}
                        </a>
                    ))}
                </nav>
            </div>
        </header>
    );
}
