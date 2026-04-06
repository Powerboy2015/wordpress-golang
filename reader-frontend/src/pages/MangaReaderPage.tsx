import { useQuery } from "@tanstack/react-query";
import { Link, useParams } from "react-router-dom"
import { manwhaAPI } from "../api/manwhaData";
import { useOptionContext } from "../context/OptionContext";
import { useEffect } from "react";

export default function MangaReaderPage() {
    const params = useParams();
    const {setReaderMode} = useOptionContext();

    useEffect(() => {
    setReaderMode(true);      // entering reader
    return () => {            // leaving reader
        setReaderMode(false);
        scrollTo({top:0});
    } 
    }, [setReaderMode]);


    const chapter = params.chapter ?? "";
    const slug = params.slug ?? "";

    const manwhaQuery = useQuery({ queryKey: ['manwhaTitle',slug], queryFn: () => manwhaAPI.getDetailedManwha(slug) });
    const chapterQuery = useQuery({ queryKey: ['manwhaTitle',slug,chapter], queryFn: () => manwhaAPI.getManwhaChapter(slug,chapter) })

    const manwhaFailLoad = manwhaQuery.error || manwhaQuery.isLoading || !manwhaQuery.data;
    const chapterFailLoad = chapterQuery.error || chapterQuery.isLoading || !chapterQuery.data;
    
    if (manwhaFailLoad || chapterFailLoad) {
        return <h1>loading....</h1>
    }

 

    
    return<div id="Reader" className="flex flex-col">
            <div className="sticky top-0 header flex-row items-center flex Jersey10 bg-[#252525] z-10 px-4">
                <Link to={"/manwhas/" + slug}>
                <h1 className="text-xl w-full text-start py-2">Chapter {manwhaQuery.data.name}</h1>
                </Link>
                <select name="" id="chapter-select" className="w-fit h-fit px-2 py-1 bg-[#E2DCB3] text-[#252525]">
                    {manwhaQuery.data.chapters.map((chapter) => <option value={chapter.number.toString()}>Chapter {chapter.number}</option>)}
                </select>
            </div>
            <div className="separator w-full h-2">
                <span className=" absolute left-0 inner block w-full h-2 bg-[#1A1A1A]"></span>
            </div>
            <div className="reader-pages w-full h-full">
                {chapterQuery.data.images.map((image,idx) => <div key={idx} className="w-full">
                    <img src={image} alt="" className="w-full" unselectable="on" />
                </div>
                )}
            </div>
        </div>
}