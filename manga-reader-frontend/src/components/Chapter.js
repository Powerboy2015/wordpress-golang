import { useState, useEffect, useRef } from 'react';
import '../css/Chapter.css';
import { useParams } from 'react-router-dom';
import ChapterHeader from './ChapterHeader';

function Chapter() {
    const [data, setData] = useState(null);
    const { manga, chapter } = useParams();

    let origin = new URL(window.location);
    origin.pathname = "/getChapter";
    origin.searchParams.append("manga", manga);
    origin.searchParams.append("chapter", chapter);

    origin.port = "8080";
    console.log(origin);

    const containerRef = useRef(null);

    useEffect(() => {
        const container = containerRef.current;

        const handleScroll = () => {
            if (!container) return;

            const isAtBottom =
                container.scrollHeight - container.scrollTop === container.clientHeight;
            console.log(container.scrollHeight - container.scrollTop);

            if (isAtBottom) {
                console.log('Reached the bottom!');
                // You could trigger a callback or load more content here
            }
        };

        if (container) {
            window.addEventListener('scroll', handleScroll);
            console.log("scroller added");
        }

        return () => {
            if (container) {
                window.removeEventListener('scroll', handleScroll);
                console.log("scroller removed");
            }
        };
    }, []);



    useEffect(() => {
        const fetchData = async () => {
            const res = await fetch(origin);
            const json = await res.json();
            setData(json);
        };

        fetchData();
    }, []);

    if (!data) return <div>Loading...</div>;
    return (
        <div ref={containerRef} className={'chapter-container chapter-' + chapter}>
            <ChapterHeader currentChapter={chapter} />
            {data.map((chapter, index) => (
                <div className='chapter'>
                    <img src={origin.origin + '/getImage?url=' + chapter} alt={index} />
                </div>))}
        </div>
    )
}
export default Chapter;
