import { useEffect, useRef, useState } from 'react';
import '../css/Chapter.css';
import { useNavigate, useParams } from 'react-router-dom';
import ChapterHeader from './ChapterHeader';
import ChapterPages from './ChapterPages';

function Chapter() {
    const { manga, chapter } = useParams();
    const navigate = useNavigate();

    const [chapters, setChapters] = useState([Number(chapter)]);
    const loadingRef = useRef(false);
    const chaptersRef = useRef(chapters);

    // Keep refs in sync with state
    useEffect(() => {
        chaptersRef.current = chapters;
    }, [chapters]);

    const setLoading = (value) => {
        loadingRef.current = value;
        setLoadingState(value); // call actual useState setter below
    };
    const [loadingState, setLoadingState] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const pixelOffset = 50;
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
                }, 2000);
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
            <ChapterHeader currentChapter={chapters[chapters.length - 1]} main={manga} />
            <div className="chapter-container">
                {chapters.map(chap => (
                    <ChapterPages key={chap} chapterNum={chap} manga={manga} />
                ))}
                {loadingState && <div className="loading">Loading next chapter...</div>}
            </div>
        </>
    );
}

export default Chapter;
