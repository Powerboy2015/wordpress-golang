import "../css/Overview.css";
import { useState, useEffect } from "react";

function Overview() {
    const [data, setData] = useState(null);

    let origin = new URL(window.location);
    origin.pathname = "/getRecents";
    origin.port = "8080";

    useEffect(() => {
        const fetchData = async () => {
            const res = await fetch(origin);
            const json = await res.json();
            setData(json);
        };

        fetchData();
    }, []);

    if (!data) return (<h1>Loading....</h1>);
    return (
        <>
            <div className="recentsOverview">
                {Object.entries(data).map(([link, data]) => (
                    <a href={"/read/" + link}>
                        <img src={origin.origin + "/getImage?url=" + data.Img}></img>
                        <h2 href={link}>{data.Name}</h2>
                    </a>
                ))}
            </div>
        </>

    );
}

export default Overview;
