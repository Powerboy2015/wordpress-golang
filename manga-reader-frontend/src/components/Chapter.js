import { useState, useEffect, useRef } from 'react';
import '../css/Chapter.css';
import { useParams } from 'react-router-dom';
import ChapterHeader from './ChapterHeader';
import ChapterPages from './ChapterPages';

function Chapter() {
	const [data, setData] = useState(null);
	const { manga, chapterNum } = useParams();

	const [chapter, setChapter] = useState(null);
	setChapter(chapterNum);

	let origin = new URL(window.location);
	origin.pathname = "/getChapter";
	origin.searchParams.append("manga", manga);
	origin.searchParams.append("chapter", chapter.replace(".", "-"));

	origin.port = "8080";
	console.log(origin);

	const containerRef = useRef(null);

	//Check to see if you have scrolled until the end of the website
	useEffect(() => {
		const container = containerRef;

		const handleScroll = () => {

			const isAtBottom =
				document.querySelector("body").clientHeight - window.innerHeight === window.scrollY;
			if (isAtBottom) {
				console.log('Reached the bottom!');
				// You could trigger a callback or load more content here
			}
		};

		if (container) {
			window.addEventListener('scroll', handleScroll);
			console.log("scroller added");
		}

		return () => {
			if (container) {
				window.removeEventListener('scroll', handleScroll);
				console.log("scroller removed");
			}
		};
	}, [containerRef]);

	if (!data) return <div>Loading...</div>;
	return (<>
		<ChapterHeader currentChapter={chapter} main={manga} />
		<div ref={containerRef} className={'chapter-container chapter-' + chapter}>
			<ChapterPages chaperNumber={chapterNum} />
		</div>
	</>
	)
}
export default Chapter;
