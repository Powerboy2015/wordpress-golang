import { useEffect, useState } from "react";
function ChapterPages({ chapterNum, manga }) {

	let origin = new URL(window.location);
	origin.pathname = "/getChapter";
	origin.searchParams.append("manga", manga);
	origin.searchParams.append("chapter", chapterNum.replace(".", "-"));

	origin.port = "8080";
	console.log(origin);

	const [data, setData] = useState(null);
	useEffect(() => {
		const fetchData = async () => {
			const res = await fetch(origin);
			const json = await res.json();
			console.log(json);
			setData(json);
		};

		fetchData();
	}, []);

	return (<>
		{data.map((url) => (<img src={origin.origin + "/getImage?url=" + url} />))}
	</>)
}

export default ChapterPages;
