import { useEffect, useState } from "react";
function ChapterPages({ chapterNum, manga }) {

	let origin = new URL(window.location);
	origin.pathname = "/getChapter";
	origin.searchParams.append("manga", manga);
	origin.searchParams.append("chapter", chapterNum);

	origin.port = "8080";

	const [data, setData] = useState(null);
	useEffect(() => {
		const fetchData = async () => {
			const res = await fetch(origin);
			const json = await res.json();
			setData(json);
		};

		fetchData();
	}, []);

	if (!data) return <div>Loading...</div>;
	return (<>
		<div className="chapter-imgs">
			{data.map((url) => (<img src={origin.origin + "/getImage?url=" + url} />))}
		</div>
	</>)
}

export default ChapterPages;
