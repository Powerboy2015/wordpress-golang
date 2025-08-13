import "../css/Manga.css";
import { useState, useEffect, useMemo } from "react";
import { useParams } from "react-router-dom";
import { MangaAPI } from "../classes/mangaAPI";
import type { MangaData } from "../types";

function Manga() {
    const [data, setData] = useState<MangaData>();
    const { manga } = useParams();
    
    const mangaApi = useMemo(() => new MangaAPI(window.location.href),[]);

    useEffect(() => {
        const fetchData = async () => {
            if(!manga)
                return console.error("Manga not found!");

            const _data = await mangaApi.fetchMangaData(manga);

            if (!_data)
                return console.error("Manga data not found!");
            
            setData(_data);

        };

        fetchData();
    },[mangaApi,manga]);

    if (data) console.log(data);
    if (!data) return <div>Loading...</div>;
    return (<>
        <h1 className="pixel-h1">{data.Name}</h1>
        <img className="img-thumb" src={mangaApi.baseUrl.origin + "/getImage?url=" + data.Img}></img>
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
