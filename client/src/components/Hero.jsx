export default function Hero({ profile, settings }) {
    const accentColor = settings?.accent_color || '#ef4444';

    return (
        <section id="home" className="min-h-screen flex items-center justify-center px-6 pt-20 pb-16">
            <div className="max-w-4xl mx-auto text-center">
                {profile?.photo_url && (
                    <img
                        src={profile.photo_url}
                        alt={profile.name}
                        className="w-32 h-32 rounded-full mx-auto mb-6 object-cover border-4"
                        style={{ borderColor: accentColor }}
                    />
                )}
                {/* Nama lengkap di sini */}
                <h1 className="text-4xl md:text-6xl font-bold mb-4">
                    {profile?.name || 'Portfolio'}
                </h1>
                {profile?.title && (
                    <p className="text-xl md:text-2xl text-zinc-300 mb-2">
                        {profile.title}
                    </p>
                )}
                {profile?.subtitle && (
                    <p className="text-lg text-zinc-400 mb-6">
                        {profile.subtitle}
                    </p>
                )}
                {profile?.description && (
                    <p className="text-zinc-400 max-w-2xl mx-auto mb-8">
                        {profile.description}
                    </p>
                )}
                <div className="flex flex-wrap justify-center gap-4">
                    <a
                        href="#projects"
                        className="px-6 py-3 rounded-lg text-white font-medium transition hover:opacity-80"
                        style={{ backgroundColor: accentColor }}
                    >
                        View Projects
                    </a>
                    <a
                        href="#contact"
                        className="px-6 py-3 rounded-lg border border-zinc-700 text-white font-medium hover:bg-zinc-800 transition"
                    >
                        Contact Me
                    </a>
                </div>
            </div>
        </section>
    );
}
