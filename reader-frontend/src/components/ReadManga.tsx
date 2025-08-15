import { useParams } from "react-router-dom";
import { MangaAPI } from "../classes/mangaAPI";
import { useMemo, useRef} from "react";
import type { MangaData } from "../types";
import ChapterHeader from "./ChapterHeader";
import { useApi } from "../hooks/useApi";

function ReadManga() {
    const {manga,chapter} = useParams();
    const mangaAPI = useMemo(() => new MangaAPI,[]);
    const chapterContainter = useRef<HTMLDivElement>(null);
    
    const [mangaData] = useApi<MangaData>(
        () => mangaAPI.fetchMangaData(manga ?? "none")
    )

    console.log(mangaData);


    return (<>
        <ChapterHeader currentChapter={chapter ?? "0"} main={manga ?? "none"} tapRef={chapterContainter} />
        <div ref={chapterContainter} className="chapter-container">

        </div>

    </>);

}

export default ReadManga;