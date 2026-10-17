import { Mail } from 'lucide-react';
import { SiDiscord, SiGithub, SiInstagram } from 'react-icons/si';

const NAV_LINKS = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Skill', href: '#skills' },
    { name: 'Project', href: '#projects' },
    { name: 'Experience', href: '#experience' },
    { name: 'Contact', href: '#contact' },
];

const SOCIAL_LINKS = [
    { id: 'discord', href: 'https://discord.com/users/1425481770127851641', Icon: SiDiscord },
    { id: 'github', href: 'https://github.com/prayoga-hk', Icon: SiGithub },
    { id: 'instagram', href: 'https://instagram.com/pryg_266', Icon: SiInstagram },
];

const EMAIL = 'prayogahk26@gmail.com';

export default function Footer() {
    return (
        <footer className="w-full bg-[#090D16] text-white pt-16 pb-8 px-6 sm:px-12 lg:px-20 border-t border-white/5">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">


              <div className="flex flex-col justify-between h-full order-2 md:order-1">
                    <div className="flex flex-col">
                        <h2 className="font-pixel text-3xl sm:text-4xl text-white tracking-widest mt-2">
                            PRAYOGA
                        </h2>



                        <div className="mt-6 w-full max-w-sm aspect-[3/1] bg-zinc-900/30 border border-white/5 overflow-hidden group">
                            <img
                              src="/images/footer.webp"
                                alt="Footer Banner"
                                loading="lazy"
                                className="w-full h-full object-cover opacity-70 group-hover:opacity-100 transition-opacity duration-300"
                            />
                        </div>
                    </div>

                    <p className="font-mono text-xs sm:text-sm text-white/80 mt-8 md:mt-6">
                        2026 Prayoga Husnul Khitam, All Rights Reserved
                    </p>
                </div>


                <div className="flex flex-col md:items-center order-1 md:order-2">
                    <div className="w-full max-w-[200px]">
                        <h3 className="font-mono text-lg text-white mb-6">
                            Navigation
                        </h3>
                        <ul className="flex flex-col gap-3">
                            {NAV_LINKS.map((link) => (
                                <li key={link.name}>
                                    <a
                                        href={link.href}
                                        className="font-mono text-sm text-white/80 hover:text-[#F85149] transition-colors duration-200"
                                    >
                                        {link.name}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>


                <div className="flex flex-col md:items-end order-3">
                    <div className="w-full max-w-[250px]">
                        <h3 className="font-mono text-lg text-white mb-6 text-left">
                            Contact
                        </h3>

                        <a
                            href={`mailto:${EMAIL}`}
                            className="flex items-center gap-3 font-mono text-sm text-white/80 hover:text-[#F85149] transition-colors duration-200 mb-6"
                        >
                            <Mail size={18} />
                            {EMAIL}
                        </a>

                        <div className="flex items-center gap-4">
                            {SOCIAL_LINKS.map((social) => {
                                const Icon = social.Icon;
                                return (
                                    <a
                                        key={social.id}
                                        href={social.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        aria-label={social.id}
                                        className="text-white/80 hover:text-[#F85149] transition-colors duration-200"
                                    >
                                        <Icon size={22} />
                                    </a>
                                );
                            })}
                        </div>
                    </div>
                </div>

            </div>
        </footer>
    );
}
