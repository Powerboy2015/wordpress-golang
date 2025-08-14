import { useEffect, useRef, useState, type RefObject } from "react";
import "../css/ChapterHeader.css";
import { useTap } from "../hooks/useTap";

interface ChapterHeaderProp{
    currentChapter: number;
    main:string;
    tapRef: RefObject<HTMLElement | null> ;
}

function ChapterHeader({ currentChapter, main, tapRef }: ChapterHeaderProp) {


    const [chapterNum, setChapterNum] = useState(currentChapter);

    const readerEl = useRef<HTMLElement>(null);

    useTap(tapRef,() => {
        readerEl.current?.classList.toggle("hidden");
    })

    useEffect(() => {
        setChapterNum(currentChapter);
    }, [currentChapter])


    return (<>
        <section ref={readerEl} className="reader-header">
            <a href={window.origin + "/read/" + main} className="text-underline">Back</a>
            <span>Chapter {chapterNum}</span>
        </section>
    </>)
}
export default ChapterHeader;
