import { useMemo } from "react";
import { MangaAPI } from "../classes/mangaAPI";
import { useApi } from "../hooks/useApi";

interface ChapterPagesProps {
  chapterNum: string;        // number of the chapter.
  manga: string;      // name of the manga
}

function ChapterPages({ chapterNum, manga}: ChapterPagesProps) {

	const mangaApi = useMemo(() => new MangaAPI(window.location.href),[]);
	const [data,loading] = useApi<string[]>(
		() => mangaApi.fetchChapter(manga,chapterNum)
		)

	if (!data || loading) return <div>Loading...</div>;
	return (<>
		<div className="chapter-imgs">
			{data.map((url) => (<img loading="lazy" src={mangaApi.baseUrl.origin + "/getImage?url=" + url} />))}
		</div>
	</>)
}

export default ChapterPages;
