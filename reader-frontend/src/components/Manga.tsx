import "../css/Manga.css";
import { useMemo } from "react";
import { useParams } from "react-router-dom";
import { MangaAPI } from "../classes/mangaAPI";
import type { MangaData } from "../types";
import { useApi } from "../hooks/useApi";

function Manga() {
    const { manga } = useParams();
    
    const mangaApi = useMemo(() => new MangaAPI(window.location.href),[]);

    const [data,loading] = useApi<MangaData>(
        () => mangaApi.fetchMangaData(manga ?? "none")
    );

    if (data) console.log(data);
    if (loading ||!data) return <div>Loading...</div>;
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
