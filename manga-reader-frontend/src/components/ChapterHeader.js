import { useEffect, useRef, useState } from "react";
import "../css/ChapterHeader.css";

function ChapterHeader({ currentChapter, main }) {

	const [chapterNum, setChapterNum] = useState(currentChapter);

	const readerEl = useRef(null);

	useEffect(() => {
		let touchStartTime = 0;
		let startX = 0;
		let startY = 0;
		const maxDuration = 300; // milliseconds
		const maxMovement = 10;  // pixels
		const container = document.querySelector(".chapter-container");

		const handleTouchStart = (e) => {
			const touch = e.touches[0];
			touchStartTime = Date.now();
			startX = touch.clientX;
			startY = touch.clientY;
		};

		const handleTouchEnd = (e) => {
			const duration = Date.now() - touchStartTime;
			const touch = e.changedTouches[0];
			const deltaX = Math.abs(touch.clientX - startX);
			const deltaY = Math.abs(touch.clientY - startY);

			if (duration < maxDuration && deltaX < maxMovement && deltaY < maxMovement) {
				if (readerEl.current) {
					readerEl.current.classList.toggle("hidden");
				}

			}
		};

		container.addEventListener('touchstart', handleTouchStart);
		container.addEventListener('touchend', handleTouchEnd);

		return () => {
			container.removeEventListener('touchstart', handleTouchStart);
			container.removeEventListener('touchend', handleTouchEnd);
		};
	}, []);

	useEffect(() => {
		setChapterNum(currentChapter);
		console.log(currentChapter);
	}, [currentChapter])


	return (<>
		<section ref={readerEl} className="reader-header">
			<a href={window.origin + "/read/" + main} className="text-underline">Back</a>
			<span>Chapter {chapterNum}</span>
		</section>
	</>)
}
export default ChapterHeader;
