import { useCallback, useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

/**
 * Swipeable + Auto photo carousel
 * - Auto slide setiap 5 detik
 * - Swipe / drag
 * - Touch
 * - Arrow navigation
 * - Dots navigation
 */
export default function PhotoCarousel({
    images = [],
    alt = 'Gallery photo',
    accentColor = '#ef4444',
    className = '',
    autoPlay = true,
    autoPlayInterval = 5000,
}) {
    const slides = images.filter(Boolean);

    const [index, setIndex] = useState(0);
    const [dragX, setDragX] = useState(0);
    const [dragging, setDragging] = useState(false);

    const startX = useRef(0);
    const startY = useRef(0);
    const lockAxis = useRef(null);
    const trackRef = useRef(null);

    const count = slides.length;

    const safeIndex = count
        ? ((index % count) + count) % count
        : 0;

    /*
     * Reset ke foto pertama jika daftar foto berubah
     */
    useEffect(() => {
        setIndex(0);
    }, [slides.join('|')]);

    /*
     * Pindah ke slide tertentu
     */
    const goTo = useCallback(
        (nextIndex) => {
            if (!count) return;

            setIndex(
                ((nextIndex % count) + count) % count
            );
        },
        [count]
    );

    /*
     * Foto sebelumnya
     */
    const prev = useCallback(() => {
        goTo(safeIndex - 1);
    }, [goTo, safeIndex]);

    /*
     * Foto berikutnya
     */
    const next = useCallback(() => {
        goTo(safeIndex + 1);
    }, [goTo, safeIndex]);

    /*
     * ==========================================
     * AUTO SLIDE
     * ==========================================
     */
    useEffect(() => {
        if (!autoPlay || count <= 1 || dragging) {
            return;
        }

        const timer = setInterval(() => {
            setIndex((current) => {
                return (current + 1) % count;
            });
        }, autoPlayInterval);

        return () => clearInterval(timer);
    }, [
        autoPlay,
        autoPlayInterval,
        count,
        dragging,
    ]);

    /*
     * ==========================================
     * POINTER / SWIPE
     * ==========================================
     */

    const onPointerDown = (e) => {
        if (!count || count < 2) return;

        setDragging(true);

        lockAxis.current = null;

        startX.current = e.clientX;
        startY.current = e.clientY;

        e.currentTarget.setPointerCapture?.(
            e.pointerId
        );
    };

    const onPointerMove = (e) => {
        if (!dragging) return;

        const dx = e.clientX - startX.current;
        const dy = e.clientY - startY.current;

        /*
         * Tentukan arah gesture
         */
        if (!lockAxis.current) {
            if (
                Math.abs(dx) < 6 &&
                Math.abs(dy) < 6
            ) {
                return;
            }

            lockAxis.current =
                Math.abs(dx) > Math.abs(dy)
                    ? 'x'
                    : 'y';
        }

        /*
         * Jika gesture vertikal,
         * jangan ganggu scroll halaman
         */
        if (lockAxis.current !== 'x') {
            return;
        }

        e.preventDefault?.();

        setDragX(dx);
    };

    const endDrag = () => {
        if (!dragging) return;

        const threshold =
            (trackRef.current?.offsetWidth || 280) *
            0.2;

        /*
         * Swipe ke kiri
         */
        if (dragX < -threshold) {
            next();
        }

        /*
         * Swipe ke kanan
         */
        else if (dragX > threshold) {
            prev();
        }

        setDragX(0);
        setDragging(false);
        lockAxis.current = null;
    };

    /*
     * ==========================================
     * EMPTY STATE
     * ==========================================
     */

    if (!count) {
        return (
            <div
                className={`
                    relative
                    aspect-[4/5]
                    max-h-[70vh]
                    rounded-2xl
                    overflow-hidden
                    border
                    border-[#2d3342]
                    bg-[#0f131c]
                    flex
                    flex-col
                    items-center
                    justify-center
                    gap-3
                    text-[#64748b]
                    font-mono
                    text-sm
                    px-6
                    text-center
                    ${className}
                `}
            >
                <span className="text-4xl text-[#2d3342]">
                    [ ]
                </span>

                <span>
                    Tambahkan foto gallery di /admin/profile
                </span>
            </div>
        );
    }

    /*
     * ==========================================
     * CAROUSEL
     * ==========================================
     */

    return (
        <div
            className={`
                relative
                w-full
                ${className}
            `}
        >

            {/* Glow */}
            <div
                className="
                    absolute
                    -inset-1
                    rounded-2xl
                    bg-gradient-to-br
                    from-[#ef4444]/40
                    via-transparent
                    to-[#ef4444]/10
                    opacity-60
                    blur-sm
                    pointer-events-none
                "
            />

            {/* Image Track */}
            <div
                ref={trackRef}
                className="
                    relative
                    aspect-[4/5]
                    max-h-[70vh]
                    rounded-2xl
                    overflow-hidden
                    border
                    border-[#2d3342]
                    bg-[#0f131c]
                    touch-pan-y
                    select-none
                    cursor-grab
                    active:cursor-grabbing
                "
                onPointerDown={onPointerDown}
                onPointerMove={onPointerMove}
                onPointerUp={endDrag}
                onPointerCancel={endDrag}
                role="region"
                aria-roledescription="carousel"
                aria-label="Photo gallery"
            >

                {/* Slides */}
                <div
                    className="flex h-full"
                    style={{
                        width: `${count * 100}%`,

                        transform: `
                            translateX(
                                calc(
                                    ${(-safeIndex * 100) / count}%
                                    + ${dragX}px
                                )
                            )
                        `,

                        transition: dragging
                            ? 'none'
                            : 'transform 420ms cubic-bezier(0.22, 1, 0.36, 1)',
                    }}
                >

                    {slides.map((src, i) => (
                        <div
                            key={`${src}-${i}`}
                            className="
                                relative
                                h-full
                                shrink-0
                            "
                            style={{
                                width: `${100 / count}%`,
                            }}
                        >

                            <img
                                src={src}
                                alt={`${alt} ${i + 1}`}
                                draggable={false}
                                className="
                                    w-full
                                    h-full
                                    object-cover
                                    pointer-events-none
                                "
                            />

                            {/* Image overlay */}
                            <div
                                className="
                                    absolute
                                    inset-0
                                    bg-gradient-to-t
                                    from-[#0a0e16]/50
                                    via-transparent
                                    to-transparent
                                    pointer-events-none
                                "
                            />

                        </div>
                    ))}

                </div>


                {/* =====================================
                    ARROW BUTTONS
                ====================================== */}

                {count > 1 && (
                    <>
                        {/* Previous */}
                        <button
                            type="button"
                            onPointerDown={(e) =>
                                e.stopPropagation()
                            }
                            onPointerUp={(e) =>
                                e.stopPropagation()
                            }
                            onClick={(e) => {
                                e.stopPropagation();
                                prev();
                            }}
                            className="
                                absolute
                                left-3
                                top-1/2
                                -translate-y-1/2
                                z-20
                                w-10
                                h-10
                                rounded-full
                                border
                                border-[#2d3342]
                                bg-[#0a0e16]/70
                                backdrop-blur
                                flex
                                items-center
                                justify-center
                                text-white
                                hover:border-[#ef4444]
                                transition
                            "
                            aria-label="Previous photo"
                        >
                            <ChevronLeft size={20} />
                        </button>


                        {/* Next */}
                        <button
                            type="button"
                            onPointerDown={(e) =>
                                e.stopPropagation()
                            }
                            onPointerUp={(e) =>
                                e.stopPropagation()
                            }
                            onClick={(e) => {
                                e.stopPropagation();
                                next();
                            }}
                            className="
                                absolute
                                right-3
                                top-1/2
                                -translate-y-1/2
                                z-20
                                w-10
                                h-10
                                rounded-full
                                border
                                border-[#2d3342]
                                bg-[#0a0e16]/70
                                backdrop-blur
                                flex
                                items-center
                                justify-center
                                text-white
                                hover:border-[#ef4444]
                                transition
                            "
                            aria-label="Next photo"
                        >
                            <ChevronRight size={20} />
                        </button>
                    </>
                )}

            </div>


            {/* =====================================
                DOTS
            ====================================== */}

            {count > 1 && (
                <div className="flex items-center justify-center gap-2 mt-4">

                    {slides.map((_, i) => (
                        <button
                            key={i}
                            type="button"
                            onClick={() => goTo(i)}
                            aria-label={`Go to photo ${i + 1}`}
                            className="
                                h-1.5
                                rounded-full
                                transition-all
                                duration-300
                            "
                            style={{
                                width:
                                    i === safeIndex
                                        ? 28
                                        : 8,

                                backgroundColor:
                                    i === safeIndex
                                        ? accentColor
                                        : '#2d3342',
                            }}
                        />
                    ))}

                </div>
            )}


            {/* =====================================
                INFO
            ====================================== */}

            <p
                className="
                    text-center
                    text-[#64748b]
                    font-mono
                    text-xs
                    mt-3
                "
            >
                {count > 1
                    ? 'Swipe / geser ke samping'
                    : '1 foto'}
                {' · '}
                {safeIndex + 1}/{count}
            </p>

        </div>
    );
}


/*
 * ==========================================
 * GALLERY URL HELPERS
 * ==========================================
 */

function pushUrls(urls, raw) {
    if (!raw) return;

    if (Array.isArray(raw)) {
        raw.forEach((value) => {
            if (
                typeof value === 'string' &&
                value.trim()
            ) {
                urls.push(value.trim());
            }
        });

        return;
    }

    if (
        typeof raw === 'string' &&
        raw.trim()
    ) {
        raw.split(/[\n,]+/).forEach((value) => {
            const trimmed = value.trim();

            if (trimmed) {
                urls.push(trimmed);
            }
        });
    }
}


/**
 * Parse photo_url + gallery_urls
 * menjadi URL gambar yang unik.
 */
export function resolveGalleryImages(profile) {
    const urls = [];

    pushUrls(
        urls,
        profile?.photo_url
    );

    pushUrls(
        urls,
        profile?.gallery_urls
    );

    return [
        ...new Set(urls),
    ];
}


/**
 * Foto pertama.
 * Digunakan oleh About section.
 */
export function resolvePrimaryPhoto(profile) {
    return (
        resolveGalleryImages(profile)[0] ||
        ''
    );
}
