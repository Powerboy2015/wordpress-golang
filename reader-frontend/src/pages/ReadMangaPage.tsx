import { useNavigate, useParams } from "react-router-dom";
import { MangaAPI } from "../classes/mangaAPI";
import { useApi } from "../hooks/useApi";
// import ReaderUI from "../components/ReaderUI";
import ChapterPages from "../components/ChapterPages";
import "../css/ReadMangaPage.css";
import { useScrollEnd } from "../hooks/useScrollEnd";

export default function ReadMangaPage() {
    const mangaAPI = new MangaAPI;
    const params = useParams();
    const navigate = useNavigate();
    const chapter = params.chapter ?? "0";
    const manga = params.title ?? "none";

    const [data,loading] = useApi<string[]>(() => (
        mangaAPI.fetchChapter(manga,chapter)
    ))

    useScrollEnd(async () => {
        const chapterNum = parseInt(chapter) + 1;
        navigate(`/manga/${manga}/${chapterNum}`)
    },300)

    if(loading || !data) return (<h1>loading....</h1>);
    console.log(data);
    return (
        <main className="chapter-container">
            <ChapterPages manga={manga} chapterNum={chapter}/>
        </main>
    );
}