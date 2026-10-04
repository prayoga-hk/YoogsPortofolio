// ==================== HARDCODE DATA ====================
const FOOTER = {
    siteName: 'Prayoga Husnul Khitam',
    year: 2026,
};
// ========================================================

export default function Footer() {
    return (
        <footer className="py-8 px-6 border-t border-[#2d3342] bg-[#0a0e16] text-center">
            <p className="text-[#64748b] font-mono text-sm">
                <span className="text-white"></span>
            </p>
            <p className="text-[#94a3b8] text-sm mt-3">
                © {FOOTER.year} dibuat oleh {FOOTER.siteName}. Malang, Indonesia
            </p>
        </footer>
    );
}
