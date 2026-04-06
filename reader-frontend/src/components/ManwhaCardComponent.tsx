import type { manwhaData } from "../types/types"

interface ManwhaCardProps {
    manwhaData: manwhaData
}
export default function ManwhaCardComponent({manwhaData}: ManwhaCardProps) {
    return<a className="card max-w-full" href={"/mangas/" + manwhaData.name.replaceAll(" ","")}>
        <img src={manwhaData.coverURL} alt="" className="max-w-full max-h-[137px]" />
        <div className="info">
            <h3 className="title text-[16px]/4 text-start Jersey10">{manwhaData.name}</h3>
            <p className="author text-[10px] text-start Jersey10">{manwhaData.author}</p>
        </div>
    </a>
}