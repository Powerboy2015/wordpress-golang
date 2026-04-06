import { Link } from "react-router-dom"
import type { manwhaData } from "../types/types"

interface ManwhaCardProps {
    manwhaData: manwhaData
}
export default function ManwhaCardComponent({manwhaData}: ManwhaCardProps) {
    return<Link className="card max-w-full" to={"/manwhas/" + manwhaData.slugName}>
        <img src={manwhaData.coverURL} alt="" className="max-w-full max-h-34.25" />
        <div className="info">
            <h3 className="title text-[16px]/4 text-start Jersey10 text-[#D2D0C3]">{manwhaData.name}</h3>
            <p className="author text-[10px] text-start Jersey10 text-[#A6A59B]">{manwhaData.author}</p>
        </div>
    </Link>
}