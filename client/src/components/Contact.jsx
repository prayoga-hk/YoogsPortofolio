import { useEffect, useRef, useState } from 'react';
import { Mail } from 'lucide-react';
import { SiDiscord, SiGithub, SiInstagram } from 'react-icons/si';

const CONTACT = {
    email: 'prayogahk26@gmail.com',
};

const CONTACT_LINKS = [
    { id: 'github', label: 'Github', url: 'https://github.com/prayoga-hk', Icon: SiGithub },
    { id: 'email', label: 'Email', url: `mailto:${CONTACT.email}`, Icon: Mail },
    { id: 'instagram', label: 'Instagram', url: 'https://instagram.com/pryg_266', Icon: SiInstagram },
    { id: 'discord', label: 'Discord', url: 'https://discord.com/users/1425481770127851641', Icon: SiDiscord },
];

const ARROW_STEP = { ArrowLeft: 1, ArrowRight: -1 };

const MIN_NAME = 2;
const MIN_MESSAGE = 10;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function isTypingTarget(el) {
    if (!el) return false;
    return (
        el.tagName === 'INPUT' ||
        el.tagName === 'TEXTAREA' ||
        el.tagName === 'SELECT' ||
        el.isContentEditable
    );
}

function openLink(url) {
    if (!url || url === '#') return;
    if (url.startsWith('mailto:')) {
        window.location.href = url;
    } else {
        window.open(url, '_blank', 'noopener,noreferrer');
    }
}

function TerminalField({
    id,
    label,
    type = 'text',
    multiline = false,
    value,
    onChange,
    onKeyDown,
    focused,
    onFocus,
    onBlur,
    disabled,
    valid,
    hint,
    inputRef,
}) {
    const Control = multiline ? 'textarea' : 'input';

    return (
        <div>
            <div className="flex gap-2 font-mono text-lg">
                <label
                    htmlFor={id}
                    className={`shrink-0 ${disabled ? 'text-white/30' : 'text-white'}`}
                >
                    {label} :
                </label>

                <div className={`relative min-w-0 flex-1 ${multiline ? 'min-h-32' : ''}`}>
                    <span
                        className={`whitespace-pre-wrap break-words ${
                            disabled ? 'text-white/25' : 'text-white'
                        }`}
                    >
                        {value || (disabled ? '(locked)' : '')}
                    </span>
                    {focused && !disabled && (
                        <span aria-hidden="true" className="animate-blink text-[#F85149]">
                            ▌
                        </span>
                    )}

                    <Control
                        ref={inputRef}
                        id={id}
                        name={id}
                        {...(multiline ? {} : { type })}
                        value={value}
                        onChange={onChange}
                        onKeyDown={onKeyDown}
                        onFocus={onFocus}
                        onBlur={onBlur}
                        disabled={disabled}
                        autoComplete={id === 'name' ? 'name' : id === 'email' ? 'email' : 'off'}
                        spellCheck={false}
                        className="absolute inset-0 h-full w-full resize-none bg-transparent opacity-0 disabled:cursor-not-allowed"
                    />
                </div>

                {valid && !focused && (
                    <span aria-label="valid" className="shrink-0 text-[#22C55E]">
                        ✓
                    </span>
                )}
            </div>

            {focused && value && !valid && (
                <p className="mt-1 font-mono text-xs text-yellow-400/80">! {hint}</p>
            )}
        </div>
    );
}

export default function Contact() {
    const sectionRef = useRef(null);
    const listRef = useRef(null);
    const nameRef = useRef(null);
    const emailRef = useRef(null);
    const messageRef = useRef(null);

    const [inView, setInView] = useState(false);
    const [active, setActive] = useState(0);

    const [form, setForm] = useState({ name: '', email: '', message: '' });
    const [focused, setFocused] = useState(null);

    const nameValid = form.name.trim().length >= MIN_NAME;
    const emailValid = nameValid && EMAIL_REGEX.test(form.email.trim());
    const messageValid = emailValid && form.message.trim().length >= MIN_MESSAGE;

    const setField = (field) => (e) =>
        setForm((prev) => ({ ...prev, [field]: e.target.value }));

    useEffect(() => {
        const el = sectionRef.current;
        if (!el) return undefined;
        const observer = new IntersectionObserver(
            ([entry]) => setInView(entry.isIntersecting),
            { threshold: 0.35 }
        );
        observer.observe(el);
        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        if (!inView) return undefined;

        const onKeyDown = (e) => {
            if (e.ctrlKey || e.metaKey || e.altKey || e.shiftKey) return;
            if (isTypingTarget(e.target)) return;
            if (document.querySelector('[aria-modal="true"]')) return;

            if (e.key in ARROW_STEP) {
                e.preventDefault();
                const total = CONTACT_LINKS.length;
                setActive((i) => (i + ARROW_STEP[e.key] + total) % total);
                return;
            }

            if (e.key === 'Enter') {
                const el = document.activeElement;
                const insideList = listRef.current?.contains(el);
                if (el !== document.body && !insideList) return;
                e.preventDefault();
                openLink(CONTACT_LINKS[active].url);
            }
        };

        window.addEventListener('keydown', onKeyDown);
        return () => window.removeEventListener('keydown', onKeyDown);
    }, [inView, active]);

    const handleNameKeyDown = (e) => {
        if (e.key !== 'Enter') return;
        e.preventDefault();
        if (nameValid) emailRef.current?.focus();
    };

    const handleEmailKeyDown = (e) => {
        if (e.key !== 'Enter') return;
        e.preventDefault();
        if (emailValid) messageRef.current?.focus();
    };

    return (
        <section
            id="contact"
            ref={sectionRef}
            className="flex min-h-screen scroll-mt-16 flex-col justify-center bg-[#090D16] px-4 py-24 sm:px-8"
        >
            <div className="mx-auto w-full lg:w-[74%]">
                <h2 className="text-center font-mono text-4xl text-[#F85149] md:text-6xl font-semibold">
                    Contact Me
                </h2>

                <div className="mt-14 grid gap-10 md:grid-cols-2 md:gap-16">
                    <div>
                        <p className="font-mono text-sm text-white">
                            Use [ ←/→ ] to navigate
                        </p>
                        <ul ref={listRef} className="mt-4 space-y-2">
                            {CONTACT_LINKS.map((link, index) => {
                                const isActive = active === index;
                                const isMail = link.url.startsWith('mailto:');
                                return (
                                    <li key={link.id}>
                                        <a
                                            href={link.url}
                                            {...(isMail || link.url === '#'
                                                ? {}
                                                : { target: '_blank', rel: 'noreferrer' })}
                                            onMouseEnter={() => setActive(index)}
                                            onFocus={() => setActive(index)}
                                            aria-current={isActive ? 'true' : undefined}
                                            className={`flex items-center gap-3 font-mono text-xl transition-colors duration-200 focus-visible:outline-none ${
                                                isActive ? 'text-[#F85149]' : 'text-white'
                                            }`}
                                        >
                                            <span
                                                aria-hidden="true"
                                                className={`w-3 ${isActive ? 'opacity-100' : 'opacity-0'}`}
                                            >
                                                &gt;
                                            </span>
                                            <link.Icon aria-hidden="true" className="size-5 shrink-0" />
                                            {link.label}
                                        </a>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>

                    <form
                        action={`https://formsubmit.co/${CONTACT.email}`}
                        method="POST"
                        onSubmit={(e) => {
                            if (!messageValid) e.preventDefault();
                        }}
                        className="flex min-h-[17rem] flex-col border border-[#F85149] bg-[#151A23] p-4"
                    >
                        <input type="hidden" name="_subject" value="New message from portfolio" />
                        <input type="hidden" name="_captcha" value="false" />
                        <input type="hidden" name="_template" value="table" />
                        <input type="text" name="_honey" style={{ display: 'none' }} />

                        <p className="font-mono text-xl text-[#F85149]">$ send message</p>

                        <div className="mt-3 flex flex-1 flex-col gap-2">
                            <TerminalField
                                id="name"
                                label="Name"
                                inputRef={nameRef}
                                value={form.name}
                                onChange={setField('name')}
                                onKeyDown={handleNameKeyDown}
                                focused={focused === 'name'}
                                onFocus={() => setFocused('name')}
                                onBlur={() => setFocused(null)}
                                valid={nameValid}
                                hint={`minimal ${MIN_NAME} karakter`}
                            />

                            <TerminalField
                                id="email"
                                label="Email"
                                type="email"
                                inputRef={emailRef}
                                value={form.email}
                                onChange={setField('email')}
                                onKeyDown={handleEmailKeyDown}
                                focused={focused === 'email'}
                                onFocus={() => setFocused('email')}
                                onBlur={() => setFocused(null)}
                                disabled={!nameValid}
                                valid={emailValid}
                                hint="format email tidak valid"
                            />

                            <TerminalField
                                id="message"
                                label="Message"
                                multiline
                                inputRef={messageRef}
                                value={form.message}
                                onChange={setField('message')}
                                focused={focused === 'message'}
                                onFocus={() => setFocused('message')}
                                onBlur={() => setFocused(null)}
                                disabled={!emailValid}
                                valid={messageValid}
                                hint={`minimal ${MIN_MESSAGE} karakter`}
                            />
                        </div>

                        <div className="mt-4 flex justify-end">
                            <button
                                type="submit"
                                disabled={!messageValid}
                                className="border border-[#F85149] bg-[#F85149] px-5 py-2 font-mono text-base text-white transition-[filter,opacity] duration-200 hover:brightness-110 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white disabled:cursor-not-allowed disabled:opacity-35 disabled:hover:brightness-100"
                            >
                                &gt; Send
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    );
}
