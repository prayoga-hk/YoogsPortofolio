export default function Footer({ profile, settings }) {
    const siteName = settings?.site_name || profile?.name || 'Ahmad Rizky Pratama';

    return (
        <footer className="py-8 px-6 border-t border-[#2d3342] bg-[#0a0e16] text-center">
            <p className="text-[#64748b] font-mono text-sm">
                developer@dev-rpl:~$ <span className="text-white">status --active</span>
            </p>
            <p className="text-[#94a3b8] text-sm mt-3">
                © 2025 {siteName}. Built with rigor, precision &amp; modern software engineering discipline.
            </p>
        </footer>
    );
}
