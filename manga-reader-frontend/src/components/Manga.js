import "../css/Manga.css";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function Manga() {
    const [data, setData] = useState(null);
    const { manga } = useParams();

    let origin = new URL(window.location);
    origin.pathname = "/getManwhaData";
    origin.searchParams.append("url", manga);
    origin.port = "8080";

    useEffect(() => {
        const fetchData = async () => {
            const res = await fetch(origin);
            const json = await res.json();
            setData(json);
        };

        fetchData();
    }, []);

    if (data) console.log(data);
    if (!data) return <div>Loading...</div>;
    return (<>
        <h1 className="pixel-h1">{data.Name}</h1>
        <img className="img-thumb" src={origin.origin + "/getImage?url=" + data.Img}></img>
        <div className="chapters">
            <ul>
                {data.Chapters.map((chapter) => (
                    <li className="chapter font-LowresPixel" key={chapter.number}>
                        <a href={window.location + "/" + chapter.number}>Chapter {chapter.number}</a>
                    </li>
                ))}

            </ul>
        </div>
    </>
    );
}

export default Manga;
