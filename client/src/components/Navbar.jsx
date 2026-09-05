const NAV_LINKS = [
    { label: 'Overview', href: '#home' },
    { label: 'About', href: '#about' },
    { label: 'Skills', href: '#skills' },
    { label: 'Projects', href: '#projects' },
    { label: 'Education', href: '#education' },
    { label: 'Contact', href: '#contact' },
];

export default function Navbar({ profile, settings }) {
    const accentColor = settings?.accent_color || '#ef4444';
    const nickname = profile?.name?.trim()?.split(' ')[0] || 'Rizky';

    return (
        <header className="fixed top-3 sm:top-4 left-0 right-0 z-50 px-3 sm:px-6">
            <div
                className="
                    max-w-6xl
                    mx-auto
                    w-full
                    flex
                    items-center
                    gap-3
                    sm:gap-5
                    px-3
                    sm:px-4
                    py-2
                    sm:py-2.5

                    rounded-2xl
                    border
                    border-white/10

                    bg-[#0a0e16]/60
                    backdrop-blur-xl

                    shadow-lg
                    shadow-black/20

                    supports-[backdrop-filter]:bg-[#0a0e16]/40
                "
            >
                {/* LOGO */}
                <a
                    href="#home"
                    className="
                        shrink-0
                        font-mono
                        text-sm
                        sm:text-base
                        font-semibold
                        tracking-tight
                        whitespace-nowrap
                    "
                >
                    <span style={{ color: accentColor }}>
                        &lt;
                    </span>

                    <span className="text-white">
                        {nickname}
                    </span>

                    <span style={{ color: accentColor }}>
                        /&gt;
                    </span>
                </a>

                {/* NAVIGATION */}
                <nav
                    className="
                        flex-1
                        flex
                        items-center
                        gap-1
                        sm:gap-1.5

                        overflow-x-auto
                        no-scrollbar

                        sm:justify-center
                    "
                >
                    {NAV_LINKS.map((link) => (
                        <a
                            key={link.href}
                            href={link.href}
                            className="
                                shrink-0
                                whitespace-nowrap

                                px-2.5
                                sm:px-3

                                py-1.5

                                rounded-lg

                                text-[11px]
                                sm:text-sm

                                font-mono
                                text-[#94a3b8]

                                transition-all
                                duration-200

                                hover:text-white
                                hover:bg-white/5
                            "
                        >
                            {link.label}
                        </a>
                    ))}
                </nav>

                {/* RIGHT SPACER */}
                <div
                    className="
                        hidden
                        sm:block
                        w-6
                        shrink-0
                    "
                    aria-hidden="true"
                />
            </div>
        </header>
    );
}
