import "../css/Overview.css";
import {useMemo } from "react";
import type { MangaOverview } from "../types";
import { MangaAPI } from "../classes/mangaAPI";
import { useApi } from "../hooks/useApi";

function Overview() {
    // stops useEffect from reloading because of mangaAPI, because it reuses the mangaAPI object if dependencies didn't change.
    const mangaApi = useMemo(() => new MangaAPI(window.location.href),[]);
    
    const [data, loading] = useApi<Record<string,MangaOverview>>(
        () => mangaApi.fetchOverview()
    )

    if (loading || !data) return (<h1>Loading....</h1>);
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
