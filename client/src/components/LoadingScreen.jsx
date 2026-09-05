export default function LoadingScreen() {
    return (
        <main className="fixed inset-0 z-[9999] bg-[#0a0e16] flex items-center justify-center overflow-hidden">
            {/* Ambient glow */}
            <div className="absolute w-72 h-72 bg-red-600/10 rounded-full blur-3xl animate-pulse" />

            <div className="relative flex flex-col items-center">

                {/* Logo / Initial */}
                <div className="relative w-24 h-24 flex items-center justify-center">

                    {/* Outer spinning ring */}
                    <div className="absolute inset-0 rounded-full border border-red-500/20" />

                    <div
                        className="
                            absolute inset-0
                            rounded-full
                            border-2
                            border-transparent
                            border-t-red-500
                            border-r-red-500
                            animate-spin
                        "
                    />

                    {/* Inner ring */}
                    <div
                        className="
                            absolute
                            w-16 h-16
                            rounded-full
                            border
                            border-red-500/30
                            animate-[spin_3s_linear_infinite_reverse]
                        "
                    />

                    {/* Initial */}
                    <span className="relative z-10 text-2xl font-bold text-white font-mono">
                        PHK
                    </span>
                </div>

                {/* Name */}
                <h1 className="mt-7 text-lg sm:text-xl font-bold text-white tracking-widest">
                    PRAYOGA
                </h1>

                {/* Developer text */}
                <p className="mt-1 text-xs text-red-500 font-mono tracking-[0.25em]">
                    RPL STUDENT
                </p>

                {/* Loading bar */}
                <div className="mt-7 w-48 h-[2px] bg-[#1b2230] overflow-hidden">
                    <div
                        className="
                            h-full
                            w-1/2
                            bg-red-500
                            animate-[loading_1.5s_ease-in-out_infinite]
                        "
                    />
                </div>

                {/* Loading text */}
                <p className="mt-3 text-[10px] text-slate-500 font-mono tracking-widest">
                    INITIALIZING...
                </p>
            </div>

            {/* Corner decorations */}
            <div className="absolute top-6 left-6 w-8 h-8 border-l border-t border-red-500/30" />
            <div className="absolute top-6 right-6 w-8 h-8 border-r border-t border-red-500/30" />
            <div className="absolute bottom-6 left-6 w-8 h-8 border-l border-b border-red-500/30" />
            <div className="absolute bottom-6 right-6 w-8 h-8 border-r border-b border-red-500/30" />
        </main>
    );
}
