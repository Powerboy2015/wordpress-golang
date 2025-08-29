import "../css/HomePage.css";
import MangaCard from "../components/MangaCard";
import { useApi } from "../hooks/useApi";
import { MangaAPI } from "../classes/mangaAPI";
import type { MangaOverview } from "../types";

export default function HomePage()
{
    const mangaAPI = new MangaAPI;
    const [data,loading] = useApi<Record<string,MangaOverview>>(() => 
        mangaAPI.fetchOverview()
    )
    

    if (loading || !data) return (<h1>Loading....</h1>);
    return(<>
    <main className="manga-latest">
        <h3>Latest</h3>
        <div className="manga-latest-container">
            {Object.entries(data).map(([link,data]) => (
                <MangaCard manga={data} link={link}/>
            ))}
        </div>
    </main>
    </>)
}