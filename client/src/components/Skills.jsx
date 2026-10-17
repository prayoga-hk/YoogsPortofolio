import { FaCss3 } from 'react-icons/fa';
import { VscVscode } from 'react-icons/vsc';
import {
    SiHtml5,
    SiJavascript,
    SiPhp,
    SiAndroidstudio,
    SiZedindustries,
} from 'react-icons/si';

const SKILLS_DATA = [
    { name: 'HTML', category: 'Frontend', image: '/images/skill/HTML5.svg', color: '#E34F26' },
    { name: 'CSS', category: 'Frontend', image: '/images/skill/CSS3.svg', color: '#1572B6' },
    { name: 'JavaScript', category: 'Frontend', image: './images/skill/JavaScript.svg', color: '#F7DF1E' },
    { name: 'PHP', category: 'Backend', image: '/images/skill/PHP.svg', color: '#777BB4' },
    { name: 'Java', category: 'Backend', image: '/images/skill/java.svg' },
    { name: 'Bootstrap', category: 'Frontend', image: '/images/skill/bootstrap.svg' },
    { name: 'Tailwind CSS', category: 'Frontend', image: '/images/skill/tailwind.svg' },
    { name: 'React', category: 'Frontend', image: '/images/skill/react.svg' },
    { name: 'Laravel', category: 'Backend', image: '/images/skill/laravel.svg' },
    { name: 'MySQL', category: 'Database', image: '/images/skill/mysql.svg' },
    { name: 'XAMPP', category: 'Local Server Testing', image: '/images/skill/xampp.svg' },
    { name: 'VS Code', category: 'Code Editor', image: '/images/skill/VSCode.svg', color: '#007ACC' },
    { name: 'Zed', category: 'Code Editor', Icon: SiZedindustries, color: '#FFFFFF' },
    { name: 'Android Studio', category: 'Code Editor', image: '/images/skill/AndroidStudio.svg', color: '#3DDC84' },
    { name: 'Figma', category: 'Design Tools', image: '/images/skill/figma.svg' },
];

export default function Skills({ settings }) {
    return (
        <section
            id="skills"
            className="flex min-h-screen scroll-mt-16 flex-col justify-center bg-[#090D16] px-4 py-24 sm:px-8"
        >

          <div className="mx-auto w-full lg:w-[74%]">
                <h2 className="text-center font-mono text-6xl font-semibold  text-[#F85149] md:text-6xl font-semibold">
                    My Skill &amp; Tool
                </h2>

                <ul className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {SKILLS_DATA.map((skill) => (
                        <li
                            key={skill.name}
                            className="flex items-center gap-4 border border-[#F85149] px-4 py-3"
                        >
                            {skill.image ? (
                                <img
                                    src={skill.image}
                                    alt=""
                                    aria-hidden="true"
                                    loading="lazy"
                                    className="size-10 shrink-0 object-contain"
                                />
                            ) : (
                                <skill.Icon
                                    aria-hidden="true"
                                    className="size-10 shrink-0"
                                    style={{ color: skill.color }}
                                />
                            )}
                            <div className="min-w-0 font-mono">
                                <p className="truncate text-lg text-white">{skill.name}</p>
                                <p className="truncate text-sm text-white/80">
                                    [{skill.category}]
                                </p>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    );
}
