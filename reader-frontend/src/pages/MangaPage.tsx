import { useParams } from "react-router-dom"
import { useApi } from "../hooks/useApi";
import { MangaAPI } from "../classes/mangaAPI";
import type { MangaData } from "../types";
import "../css/MangaPage.css";
import {ArrowBack} from "@mui/icons-material";

export default function MangaPage()
{
    const params = useParams();
    const mangaTitle = params.title ?? "";

    const mangaAPI = new MangaAPI;
    const [data,loading] = useApi<MangaData>(()=> (
        mangaAPI.fetchMangaData(mangaTitle)
    ))


    if (loading || !data) return (<h1>Loading...</h1>)
    console.log(data);

    
    return(<> 
        <div className="manga">
            <div className="banner">
                <div className="banner-img">
                    <img src={mangaAPI.baseUrl.origin + "/api/getImage?url=" + data.Img} alt="" />
                    <div className="banner-overlay">
                        <a href="/" className="back-btn"><ArrowBack fontSize={"large"} /></a>
                        <div className="title">
                            <h1 className="font-LowresPixel manga-title">{data.Name}</h1>
                        </div>
                    </div>
                </div>
            </div>
            <div className="summary font-FsPixel">
                <div className="inner">
                    <h2>Summary</h2>
                    <div className="summary-text">
                        <p>{data.Summary}</p>
                    </div>
                </div>
            </div>
            <div className="chapter-box font-FsPixel">
                <div className="inner">
                    <h3>Chapters</h3>
                    <div className="chapter-list">
                        {data.Chapters.map((chapter) => (
                            <a className="chapter" href={mangaTitle+"/" + chapter.number}>chapter {chapter.number}</a>
                        ))}
                    </div>
                </div>
            </div>
            <div className="ui-space"></div>
        </div>
    </>)
}