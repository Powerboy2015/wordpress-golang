import { useState, useEffect } from 'react';
import '../css/Chapter.css';

function Chapter() {
    const [data, setData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const res = await fetch("http://localhost:8080/getChapter?manga=the-useless-tamer-will-turn-into-the-top-unconsciously-by-my-previous-life-knowledge&chapter=1");
            const json = await res.json();
            setData(json);
        };

        fetchData();
    }, []);

    if (!data) return <div>Loading...</div>;
    return (
        <div className='chapter-container'>
            {data.map((chapter, index) => (
                <div className='chapter'>
                    <img src={'http://localhost:8080/getImage?url=' + chapter} alt={index} />
                </div>))}
        </div>
    )
}
export default Chapter;
