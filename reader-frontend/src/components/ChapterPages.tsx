import { useEffect, useState, useMemo } from "react";
import { MangaAPI } from "../classes/mangaAPI";

interface ChapterPagesProps {
  chapterNum: number;        // number of the chapter.
  manga: string;      // name of the manga
}

function ChapterPages({ chapterNum, manga}: ChapterPagesProps) {

	const mangaApi = useMemo(() => new MangaAPI(window.location.href),[]);
	const [data, setData] = useState<string[]>([]);
	useEffect(() => {
		const fetchData = async () => {
			const _data: string[] | false = await mangaApi.fetchChapter(manga,chapterNum);
            if(!_data)
            {
                return console.error("couldn't find chapters");
            }
            setData(_data);
		};

		fetchData();
	},[mangaApi,chapterNum,manga]);

	if (!data) return <div>Loading...</div>;
	return (<>
		<div className="chapter-imgs">
			{data.map((url) => (<img loading="lazy" src={mangaApi.baseUrl.origin + "/getImage?url=" + url} />))}
		</div>
	</>)
}

export default ChapterPages;
