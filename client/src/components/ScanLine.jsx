const SCAN_COLOR = '#22C55E';

export default function ScanLine({ className = '', onlyOnHover = false }) {
    return (
        <div
            aria-hidden="true"
            className={`relative h-[2px] w-full overflow-hidden transition-opacity duration-300 ${
                onlyOnHover ? 'opacity-0 group-hover:opacity-100' : ''
            } ${className}`}
            style={{ backgroundColor: `${SCAN_COLOR}26` }}
        >
            <span
                className={`absolute inset-y-0 left-0 w-full origin-left motion-reduce:animate-none ${
                    onlyOnHover ? 'group-hover:animate-scan-x' : 'animate-scan-x'
                }`}
                style={{
                    backgroundColor: SCAN_COLOR,
                    boxShadow: `0 0 8px ${SCAN_COLOR}`,
                }}
            />
        </div>
    );
}
