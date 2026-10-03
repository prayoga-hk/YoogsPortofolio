export default function Footer({ profile, settings }) {
    const siteName = settings?.site_name || profile?.name;

    return (
        <footer className="py-8 px-6 border-t border-[#2d3342] bg-[#0a0e16] text-center">
            <p className="text-[#64748b] font-mono text-sm">
                <span className="text-white"></span>
            </p>
            <p className="text-[#94a3b8] text-sm mt-3">
                © 2026 {siteName}.  &amp; modern software engineering discipline.
            </p>
        </footer>
    );
}
