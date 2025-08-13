import { useEffect, useRef, useState } from "react";
import "../css/ChapterHeader.css";

interface ChapterHeaderProp{
    currentChapter: number;
    main:string;
}

function ChapterHeader({ currentChapter, main }: ChapterHeaderProp) {

    const [chapterNum, setChapterNum] = useState(currentChapter);

    const readerEl = useRef<HTMLElement>(null);

    useEffect(() => {
        let touchStartTime = 0;
        let startX = 0;
        let startY = 0;
        const maxDuration = 300; // milliseconds
        const maxMovement = 10;  // pixels
        const container = document.querySelector(".chapter-container") as HTMLElement;

        const handleTouchStart = (e: TouchEvent) => {
            const touch = e.touches[0];
            touchStartTime = Date.now();
            startX = touch.clientX;
            startY = touch.clientY;
        };

        const handleTouchEnd = (e: TouchEvent) => {
            const duration = Date.now() - touchStartTime;
            const touch = e.changedTouches[0];
            const deltaX = Math.abs(touch.clientX - startX);
            const deltaY = Math.abs(touch.clientY - startY);

            if (duration < maxDuration && deltaX < maxMovement && deltaY < maxMovement) {
                if (readerEl.current) {
                    readerEl.current.classList.toggle("hidden");
                }

            }
        };

        container.addEventListener('touchstart', handleTouchStart as EventListener);
        container.addEventListener('touchend', handleTouchEnd);

        return () => {
            container.removeEventListener('touchstart', handleTouchStart as EventListener);
            container.removeEventListener('touchend', handleTouchEnd);
        };
    }, []);

    useEffect(() => {
        setChapterNum(currentChapter);
        console.log(currentChapter);
    }, [currentChapter])


    return (<>
        <section ref={readerEl} className="reader-header">
            <a href={window.origin + "/read/" + main} className="text-underline">Back</a>
            <span>Chapter {chapterNum}</span>
        </section>
    </>)
}
export default ChapterHeader;
