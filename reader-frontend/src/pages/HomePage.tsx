import { useQuery } from "@tanstack/react-query";
import { manwhaAPI } from "../api/manwhaData";
import ManwhaCardComponent from "../components/ManwhaCardComponent";

export default function HomePage() {
    const query = useQuery({ queryKey: ['getmanwhas'], queryFn: manwhaAPI.getManwhas });

    if (query.error|| query.isLoading) return<h1>Loading....</h1>
    return (
        <div>
            <h1 className="Jersey10 text-[32px] text-start text-[#E2DCB3]">Zochi mangareader</h1>
            <div className="category grid grid-cols-3 gap-4" id="latest">
                {query.data?.map((manwha,idx) => <ManwhaCardComponent key={idx} manwhaData={manwha}/>)}
            </div>
        </div>
    );
}
