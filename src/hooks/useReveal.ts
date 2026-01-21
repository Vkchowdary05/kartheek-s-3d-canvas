import { useEffect, useRef, useState } from 'react';

/**
 * Custom hook for calm scroll-reveal animations
 * Uses Intersection Observer to add 'visible' class when element enters viewport
 */
export const useReveal = (options?: IntersectionObserverInit) => {
    const ref = useRef<HTMLDivElement>(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const element = ref.current;
        if (!element) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.unobserve(element); // Only animate once
                }
            },
            {
                threshold: 0.1,
                rootMargin: '-50px',
                ...options,
            }
        );

        observer.observe(element);

        return () => observer.disconnect();
    }, [options]);

    return { ref, isVisible };
};

/**
 * Simple className helper for reveal animations
 */
export const revealClass = (isVisible: boolean, delay?: number) => {
    const base = 'reveal';
    const visible = isVisible ? 'visible' : '';
    const delayClass = delay ? `reveal-delay-${delay}` : '';
    return `${base} ${visible} ${delayClass}`.trim();
};

export default useReveal;
