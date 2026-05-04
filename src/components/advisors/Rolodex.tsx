import { useState, useRef, useCallback } from 'react';
import type { Advisor } from '../../mocks/advisors';

/* ─────────────────────────────────────────────────────────────────────────────
   Rolodex
   
   Renders a physical rolodex metaphor: a visible stack of cards.
   - The "deck" always shows VISIBLE_COUNT cards peeking from behind the active one.
   - Clicking the deck (or the ▼ / ▲ buttons) flips to the next/previous card with
     a CSS 3-D rotation on the Y-axis, like a real rolodex card spinning on its
     central spindle.
   - Cards behind the active one slide down in a staggered stack.
   ───────────────────────────────────────────────────────────────────────────── */

const VISIBLE_COUNT = 4;   // how many cards peek out behind the active one
const FLIP_DURATION = 360; // ms — matches the CSS transition

interface RolodexProps {
    advisors: Advisor[];
    activeIndex: number;
    onFlip: (nextIndex: number) => void;
}

export function Rolodex({ advisors, activeIndex, onFlip }: RolodexProps) {
    const [flipping, setFlipping] = useState<'forward' | 'backward' | null>(null);
    const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const total = advisors.length;

    const flip = useCallback(
        (dir: 'forward' | 'backward') => {
            if (flipping) return; // already mid-flip

            setFlipping(dir);

            timerRef.current = setTimeout(() => {
                const next =
                    dir === 'forward'
                        ? (activeIndex + 1) % total
                        : (activeIndex - 1 + total) % total;
                onFlip(next);
                setFlipping(null);
            }, FLIP_DURATION);
        },
        [flipping, activeIndex, total, onFlip],
    );

    /* Build the visible card stack.
       Index 0 = topmost (active), indices 1-N = peeking behind. */
    const visibleAdvisors = Array.from({ length: Math.min(VISIBLE_COUNT + 1, total) }, (_, i) => {
        const idx = (activeIndex + i) % total;
        return { advisor: advisors[idx], stackPos: i };
    });

    return (
        <div className="rolodex-root" aria-label="Advisor rolodex">
            {/* Navigation controls */}
            <div className="rolodex-controls">
                <button
                    className="rolodex-ctrl-btn"
                    onClick={() => flip('backward')}
                    disabled={!!flipping}
                    aria-label="Previous advisor"
                >
                    ▲
                </button>
                <span className="rolodex-counter">
                    {String(activeIndex + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
                </span>
                <button
                    className="rolodex-ctrl-btn"
                    onClick={() => flip('forward')}
                    disabled={!!flipping}
                    aria-label="Next advisor"
                >
                    ▼
                </button>
            </div>

            {/* Card stack — rendered back-to-front so active is on top */}
            <div
                className="rolodex-stack"
                onClick={() => flip('forward')}
                role="button"
                tabIndex={0}
                aria-label="Click to advance rolodex"
                onKeyDown={(e) => e.key === 'Enter' && flip('forward')}
            >
                {[...visibleAdvisors].reverse().map(({ advisor, stackPos }) => {
                    const isActive = stackPos === 0;
                    const isFlipping = isActive && !!flipping;

                    return (
                        <div
                            key={advisor.id}
                            className={[
                                'rolodex-card-item',
                                isActive ? 'rolodex-card-item--active' : '',
                                isFlipping ? `rolodex-card-item--flip-${flipping}` : '',
                            ]
                                .filter(Boolean)
                                .join(' ')}
                            style={{
                                '--stack-pos': stackPos,
                                /* Peek offset: each card behind shifts down */
                                transform: isActive
                                    ? undefined
                                    : `translateY(${stackPos * 10}px) scale(${1 - stackPos * 0.018})`,
                                zIndex: VISIBLE_COUNT - stackPos,
                            } as React.CSSProperties}
                            aria-hidden={!isActive}
                        >
                            {/* Card tab — the visible strip at the top */}
                            <div className="rolodex-card-tab">
                                <div className="rolodex-card-avatar">
                                    {advisor.fullName.split(' ').map((n) => n[0]).slice(0, 2).join('')}
                                </div>
                                <div className="rolodex-card-info">
                                    <span className="rolodex-card-name">{advisor.fullName}</span>
                                    <span className="rolodex-card-role">
                                        {advisor.headline.split(',')[0]}
                                    </span>
                                </div>
                                {isActive && (
                                    <span className="rolodex-card-active-pip" aria-hidden="true" />
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Spindle — the visual axle cards rotate around */}
            <div className="rolodex-spindle" aria-hidden="true">
                <div className="rolodex-spindle-bar" />
            </div>
        </div>
    );
}