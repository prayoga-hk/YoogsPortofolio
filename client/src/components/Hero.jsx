import { motion, useReducedMotion } from 'motion/react';
import { FaDownload } from 'react-icons/fa6';
import FaultyTerminal from './react-bits/FaultyTerminal';

// ==================== KONFIGURASI ====================
const ACCENT_COLOR = '#F85149';
const NAME = 'PRAYOGA';
const SUBTITLE =
    'I am a software engineering student who is still learning and developing my skills.';
const RESUME_URL = '#';

const TERMINAL_OPACITY = 0.85;
const PIXEL_STEPS = 8;
const pixelEase = (t) =>
    Math.min(1, Math.floor(t * PIXEL_STEPS) / (PIXEL_STEPS - 1));
// =====================================================

export default function Hero() {
    const reduceMotion = useReducedMotion();
    const hasResume = RESUME_URL !== '#';

    return (
        <section
            id="home"
            className="relative flex min-h-screen scroll-mt-16 items-center justify-center overflow-hidden bg-[#090D16] px-4 pt-16"
      >
        <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 z-0"
                style={{ opacity: TERMINAL_OPACITY }}
            >
              <FaultyTerminal
                  scale={3.1}
                  gridMul={[2, 1]}
                  digitSize={2.5}
                  timeScale={0.5}
                  scanlineIntensity={0.5}
                  glitchAmount={3}
                  flickerAmount={1.5}
                  noiseAmp={0.8}
                  curvature={0.34}
                  tint={ACCENT_COLOR}
                  mouseReact
                  mouseStrength={0.4}
                  pageLoadAnimation
                  brightness={0.4}
              />
            </div>

            <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_center,rgba(9,13,22,0.6)_0%,rgba(9,13,22,0.1)_75%)]"
            />

            <div className="relative z-10 flex flex-col items-center text-center">
                <motion.h1
                    className="select-none font-pixel leading-none text-white"
                    style={{ fontSize: 'clamp(1.5rem, 9vw, 6.5rem)' }}
                    initial={
                        reduceMotion ? false : { clipPath: 'inset(100% 0% 0% 0%)' }
                    }
                    animate={{ clipPath: 'inset(0% 0% 0% 0%)' }}
                    transition={{ duration: 1.2, ease: pixelEase, delay: 0.2 }}
                >
                    {NAME}
                </motion.h1>

                <motion.p
                    className="mt-8 max-w-xl font-mono text-sm text-white/90 sm:text-lg"
                    initial={reduceMotion ? false : { opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: 1.3 }}
                >
                    {SUBTITLE}
                </motion.p>

                <motion.div
                    className="mt-8 flex flex-wrap items-center justify-center gap-4 sm:gap-8"
                    initial={reduceMotion ? false : { opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: 1.5 }}
                >
                    <a
                        href={RESUME_URL}
                        {...(hasResume
                            ? { download: true, target: '_blank', rel: 'noreferrer' }
                            : {})}
                        className="inline-flex items-center gap-2 border-2 border-[#F85149] px-5 py-2 font-mono text-lg text-white transition-colors duration-200 hover:bg-[#F85149]/15 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                    >
                        <FaDownload aria-hidden="true" className="size-4" />
                        RESUME
                    </a>

                    <a
                        href="#contact"
                        className="inline-flex items-center gap-1 border-2 border-[#F85149] bg-[#F85149] px-5 py-2 font-mono text-lg text-white transition-[filter] duration-200 hover:brightness-110 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                    >
                        <span aria-hidden="true">&gt;</span>
                        CONTACT
                    </a>
                </motion.div>
            </div>
        </section>
    );
}
