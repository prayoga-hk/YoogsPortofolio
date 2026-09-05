export default function Skills({ skills, settings }) {
    if (!skills || skills.length === 0) {
        return (
            <section id="skills" className="py-16 px-6 border-t border-[#2d3342] bg-[#0a0e16]">
                <div className="max-w-4xl mx-auto text-center">
                    <p className="text-[#64748b] font-mono">// 02. KEAHLIAN & TECH STACK</p>
                    <p className="text-[#94a3b8] mt-4">Belum ada data skill.</p>
                </div>
            </section>
        );
    }

    // Skill level mapping
    const getLevelColor = (level) => {
        const colors = {
            'Beginner': 'text-[#64748b]',
            'Intermediate': 'text-[#eab308]',
            'Advanced': 'text-[#22c55e]',
            'Expert': 'text-[#ef4444]'
        };
        return colors[level] || 'text-[#94a3b8]';
    };

    const getLevelWidth = (level) => {
        const widths = {
            'Beginner': 'w-1/4',
            'Intermediate': 'w-1/2',
            'Advanced': 'w-3/4',
            'Expert': 'w-full'
        };
        return widths[level] || 'w-1/2';
    };

    return (
        <section id="skills" className="py-16 px-6 border-t border-[#2d3342] bg-[#0a0e16]">
            <div className="max-w-4xl mx-auto">
                <p className="text-[#ef4444] font-mono text-sm mb-2">// 02. KEAHLIAN & TECH STACK</p>
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-8">Keahlian & Tech Stack</h2>

                <div className="space-y-4">
                    {skills.map((skill) => (
                        <div key={skill.id} className="bg-[#0f131c] border border-[#2d3342] rounded-lg p-4">
                            <div className="flex justify-between items-center mb-1">
                                <span className="text-white font-medium">{skill.name}</span>
                                <span className={`text-sm font-mono ${getLevelColor(skill.level)}`}>
                                    {skill.level || 'Intermediate'} ({skill.percentage || 80}%)
                                </span>
                            </div>
                            <div className="w-full bg-[#181c24] rounded-full h-1.5">
                                <div
                                    className="h-1.5 rounded-full transition-all duration-500"
                                    style={{
                                        width: skill.percentage ? `${skill.percentage}%` : '80%',
                                        backgroundColor: skill.level === 'Expert' ? '#ef4444' : '#ef4444'
                                    }}
                                ></div>
                            </div>
                            {skill.category && (
                                <p className="text-[#64748b] text-xs font-mono mt-1">{skill.category}</p>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
