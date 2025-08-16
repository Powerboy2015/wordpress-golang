import { useEffect, useRef, useState } from 'react';
import '../css/Chapter.css';
import { useNavigate, useParams } from 'react-router-dom';
import ChapterHeader from './ChapterHeader';
import ChapterPages from './ChapterPages';
function Chapter() {
    const { manga, chapter } = useParams();
    const navigate = useNavigate();

    const [chapters, setChapters] = useState([Number(parseFloat(chapter ?? "0"))]);
    const loadingRef = useRef(false);
    const chaptersRef = useRef(chapters);
    const tapref = useRef<HTMLDivElement>(null);

    // Keep refs in sync with state
    useEffect(() => {
        chaptersRef.current = chapters;
    }, [chapters]);

    const setLoading = (value:boolean) => {
        loadingRef.current = value;
        // setLoadingState(value); // call actual useState setter below
    };
    // const [loadingState, setLoadingState] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const pixelOffset = 200;
            const isAtBottom =
                document.body.clientHeight - window.innerHeight <= Math.round(window.scrollY) + pixelOffset;

            if (isAtBottom && !loadingRef.current) {
                console.log('Reached the bottom!');
                setLoading(true);

                setChapters(prev => {
                    const nextChapter = prev[prev.length - 1] + 1;
                    navigate(`/read/${manga}/${nextChapter}`, { replace: true });
                    return [...prev, nextChapter];
                });


                setTimeout(() => {
                    setLoading(false);
                }, 1000);
            }
        };

        window.addEventListener('scroll', handleScroll);
        console.log("scroller added");

        return () => {
            window.removeEventListener('scroll', handleScroll);
            console.log("scroller removed");
        };
    }, [manga, navigate]);

    return (
        <>
            <ChapterHeader currentChapter={chapters[chapters.length - 1].toString()} main={manga ?? "none"} tapRef={tapref} />
            <div className="chapter-container" ref={tapref}>
                {chapters.map(chap => (<>
                    <ChapterPages key={chap} chapterNum={chap.toString() ?? "0"} manga={manga ??  "none"} />
                </>
                ))}
            </div>
        </>
    );
}

export default Chapter;
