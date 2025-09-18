import { useNavigate, useParams } from "react-router-dom";
import { MangaAPI } from "../classes/mangaAPI";
import { useApi } from "../hooks/useApi";
// import ReaderUI from "../components/ReaderUI";
import ChapterPages from "../components/ChapterPages";
import "../css/ReadMangaPage.css";
import { useScrollEnd } from "../hooks/useScrollEnd";
import type { MangaData } from "../types";
import { useState } from "react";
// import ReaderUI from "../components/ReaderUI";

export default function ReadMangaPage() {
    const mangaAPI = new MangaAPI;
    const params = useParams();
    const chapter = parseFloat(params.chapter ?? "0") ; //the chapter that we have selected
    const manga = params.title ?? "none"; //title of the manwha/manga
    const navigate = useNavigate();
    
    
    const [mangaData,loading] = useApi<MangaData>(() => (
        mangaAPI.fetchMangaData(manga)
    ))
    const [chapterList, setChapterList] = useState<number[]>([chapter]);
    console.log(chapterList);

    useScrollEnd(async() => {
        if(!mangaData) return;
        const currentChapter = mangaData.Chapters.findIndex(c => c.number === chapter);
        console.log("current chapter", currentChapter);
        if(currentChapter === -1) return;

        const nextChapter = mangaData?.Chapters[currentChapter + 1].number || 0;
        setChapterList(prev => [...prev, nextChapter]);
        navigate(`/manga/${manga}/${nextChapter}`);

    },600);

    if(loading || !mangaData) return (<h1>loading....</h1>);
    return (
        <main className="chapter-container">
            {/* <ReaderUI> */}
                {chapterList.map(index => (
                    <ChapterPages key={index} manga={manga} chapterNum={index.toString()}/>
                ))}
            {/* </ReaderUI> */}
        </main>
    );
}