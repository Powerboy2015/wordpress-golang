import { BookmarksOutlined, FormatListBulleted, Home } from "@mui/icons-material";
import NavRouteComponent from "./NavRouteComponent";
import { NavIconStyle } from "../styles/NavIconStyle";


export default function NavComponent() {
    return<div id="Navigation" className="flex flex-col gap-4 rounded">
        <Home className="opacity-0" style={NavIconStyle}/>
        <div className="inner fixed flex flex-col gap-4 rounded">
        <NavRouteComponent route="/"><Home style={NavIconStyle}/></NavRouteComponent>
        <NavRouteComponent route="/mangas"><FormatListBulleted style={NavIconStyle}/></NavRouteComponent>
        <NavRouteComponent route="/bookmarked"><BookmarksOutlined style={NavIconStyle}/></NavRouteComponent>
        </div>
    </div>
}