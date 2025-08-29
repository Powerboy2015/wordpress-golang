import type { MangaOverview } from "../types";
import "../css/MangaCard.css"
import { MangaAPI } from "../classes/mangaAPI";

interface MangaCardProps{
    manga: MangaOverview;
    link: string
}

export default function MangaCard({manga, link}:MangaCardProps)
{
    const mangaAPI = new MangaAPI;
    return(<>
    <div className="manga-card">
        <a href={"/manga/" + link}className="manga-card-inner">
        <div className="manga-image">
            <img src={mangaAPI.baseUrl.origin + "/getImage?url=" + manga.Img} alt="" />
        </div>
        <div className="manga-title">
            <p className="font-LowresPixel">{manga.Name}</p>
        </div>
        </a>
    </div>
    </>)
}