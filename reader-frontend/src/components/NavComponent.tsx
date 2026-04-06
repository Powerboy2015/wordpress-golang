import { BookmarksOutlined, FormatListBulleted, Home } from "@mui/icons-material";
import NavRouteComponent from "./NavRouteComponent";
import { NavIconStyle } from "../styles/NavIconStyle";
import { useOptionContext } from "../context/OptionContext";


export default function NavComponent() {
    const {InReader} = useOptionContext();

    return<div id="Navigation" className={`flex-col gap-4 rounded ${InReader ? "hidden": "flex"}`}>
        <Home className="opacity-0" style={NavIconStyle}/>
        <div className="inner fixed flex flex-col gap-4 rounded">
        <NavRouteComponent route="/"><Home style={NavIconStyle}/></NavRouteComponent>
        <NavRouteComponent route="/mangas"><FormatListBulleted style={NavIconStyle}/></NavRouteComponent>
        <NavRouteComponent route="/bookmarked"><BookmarksOutlined style={NavIconStyle}/></NavRouteComponent>
        </div>
    </div>
}