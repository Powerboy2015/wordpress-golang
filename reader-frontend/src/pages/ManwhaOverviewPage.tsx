import { useQuery } from "@tanstack/react-query";
import { manwhaAPI } from "../api/manwhaData";
import { Link, useParams } from "react-router-dom";
import type { ChapterInfo } from "../types/types";

export default function ManwhaOverviewPage() {
    const params = useParams();
    const slug = params.slug ?? "";

    const manwhaQuery = useQuery({ queryKey: ['manwhaTitle',slug], queryFn: () => manwhaAPI.getDetailedManwha(slug) });
    if (manwhaQuery.error || manwhaQuery.isLoading || !manwhaQuery.data) return<h1>Loading....</h1>

    return <div id="ManwhaOverviewPage" className="flex flex-row w-full gap-4 Jersey10">
            <div className="mangaInfo w-full flex flex-col gap-1">
                <div className="img-container w-full">
                    <img src={manwhaQuery.data.coverURL} className="max-w-full" alt="" />
                </div>
                <div className="flex flex-col text-start gap-2">
                    <h1 className="text-2xl/4 text-[#E2DCB3]">{manwhaQuery.data.name}</h1>
                    <p className="text-xl/2 text-[#A6A59B]">{manwhaQuery.data.author}</p>
                    <p className="text-xl/4 text-[#A6A59B]">Romance, Fantasy, thriller, isekai</p>
                    <p className="text-xl/4 text-[#A6A59B] pt-3">{manwhaQuery.data.desc}</p>
                </div>
            </div>
            <div className="chapterList w-full">
                <h2 className="text-3xl w-full text-[#E2DCB3]">Chapter list</h2>
                <ol className="List flex flex-col text-[16px]/3">
                {manwhaQuery.data.chapters.map((chapter,idx) => <ChapterRow key={idx} chapter={chapter} />)}
                </ol>
            </div>
    </div>
}

function ChapterRow({chapter}:{chapter: ChapterInfo}) {
    const chapterPath = chapter.number.toString();
    return(
        <li className="list-none text-[#E2DCB3]">
            <Link to={chapterPath} className="flex flex-row items-center justify-between Jersey10 focus:bg-[rgba(255,255,255,0.06)] px-1 py-2 rounded">
            <p>Chapter {chapter.number}</p>
            <p className="text-sm">{chapter.uploadDate}</p>
            </Link>
        </li>
    );
}