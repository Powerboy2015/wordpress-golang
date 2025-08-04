import "../css/ChapterHeader.css";

function ChapterHeader({ currentChapter }) {
    return (<>
        <section className="reader-header">
            <span>Current Chapter {currentChapter}</span>
        </section>
    </>)
}
export default ChapterHeader;
