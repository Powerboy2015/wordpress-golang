import "../css/Overview.css";
import { useState, useEffect, useMemo } from "react";
import type { MangaOverview } from "../types";
import { MangaAPI } from "../classes/mangaAPI";

function Overview() {
    const [data, setData] = useState<Record<string,MangaOverview>>({});

    // stops useEffect from reloading because of mangaAPI, because it reuses the mangaAPI object if dependencies didn't change.
    const mangaApi = useMemo(() => new MangaAPI(window.location.href),[]);
    
    useEffect(() => {
        const fetchData = async () => {
            const _data = await mangaApi.fetchOverview();
            if(_data)
            {
                setData(_data);
                return;
            }
            console.error("no overview found!");

        };

        fetchData();
    },[mangaApi]);

    if (!data) return (<h1>Loading....</h1>);
    return (
        <>
            <div className="recentsOverview">
                {Object.entries(data).map(([link, data]) => (
                    <a href={"/read/" + link}>
                        <img src={mangaApi.baseUrl.origin + "/getImage?url=" + data.Img}></img>
                        <h2>{data.Name}</h2>
                    </a>
                ))}
            </div>
        </>

    );
}

export default Overview;
