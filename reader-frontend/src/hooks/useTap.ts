import { useEffect } from "react";

/**
 * fires when an user has tapped on the given element.
 * @param _ref The object where the hook is attached to.
 * @param _onTap function that fires
 * @param _maxDuration maximum time of tap in ms
 * @param _maxMovement maximum movement of tap in px
 */
export function useTap(
    _ref: React.RefObject<HTMLElement | null> ,
    _onTap: () => void,
    _maxDuration: number = 300, 
    _maxMovement: number = 10
) {
    useEffect(() => {
        const el = _ref.current;
        if (!el) return;

        let touchStartTime = 0;
        let startX= 0;
        let startY= 0;

        const handleTouchStart = (e:TouchEvent) => {
            const touch = e.touches[0];
            touchStartTime = Date.now();

            startX = touch.clientX;
            startY = touch.clientY;
        };

        const handleTouchEnd = (e:TouchEvent) => {
            const duration = Date.now() - touchStartTime;
            const touch = e.changedTouches[0];
            const deltaX = Math.abs(touch.clientX - startX);
            const deltaY = Math.abs(touch.clientY - startY);

            if (duration < _maxDuration && deltaX < _maxMovement && deltaY < _maxMovement)
                _onTap();
        }

        el.addEventListener("touchstart",handleTouchStart);
        el.addEventListener("touchend",handleTouchEnd);

        return () => {
            el.removeEventListener("touchstart", handleTouchStart);
            el.removeEventListener("touchend", handleTouchEnd);
        };

    },[_ref,_onTap,_maxDuration,_maxMovement]);
}