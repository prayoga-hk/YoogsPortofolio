import PixelTransition from './react-bits/PixelTransition';

// ==================== DATA ====================
const PROFILE = {
    photo: '/images/profile/profile.webp',
    photo2: '/images/profile/profile2.webp',
    alt: 'Foto Prayoga',
    about: 'Hello, I’m Prayoga Husnul Khitam—you can call me Yoga, Yoogs, Yogas, or whatever you prefer. I am a 16-year-old student at SMK PGRI 3, majoring in Software Engineering. Currently, I am studying programming and software development, with the goal of creating products that can help many people and are easily accessible.',
};
// ==============================================

export default function About() {
    return (
        <section
            id="about"
            className="flex min-h-screen scroll-mt-16 flex-col justify-center bg-[#090D16] px-4 py-24 sm:px-8"
        >
        <div className="mx-auto grid w-full items-start gap-10 md:grid-cols-2 md:gap-16 lg:w-[74%]">

                <div className="mx-auto w-full max-w-sm md:mx-0">
                    <PixelTransition
                        firstContent={
                            <img
                                src={PROFILE.photo}
                                alt={PROFILE.alt}
                                className="w-full h-full object-cover"
                            />
                        }
                        secondContent={
                            <img
                                src={PROFILE.photo2}
                                alt={PROFILE.alt}
                                className="w-full h-full object-cover"
                            />
                        }
                        aspectRatio="125%"
                        gridSize={10}
                        pixelColor="#000000"
                        pixelShape="square"
                        gap={0.5}
                        pattern="random"
                        pixelAnimation="pop"
                        randomness={0.55}
                        animationStepDuration={0.3}
                        trigger="hover"
                        once={false}
                        style={{ width: '100%' }}
                        className="!rounded-none"
                    />
                </div>

                <div>
                    <h2 className="text-center font-mono text-6xl font-semibold  text-[#F85149] md:text-6xl font-semibold">
                        &gt; About Me
                    </h2>
                    <p className="mt-8 font-mono text-base leading-relaxed text-white md:text-lg">
                        {PROFILE.about}
                    </p>
                </div>
            </div>
        </section>
    );
}
