import type { ReactElement } from "react";
import "../css/NavUI.css";
import HomeIcon from "@mui/icons-material/Home";
import GridIcon from "@mui/icons-material/GridView"
import HistoryIcon from "@mui/icons-material/History"
import FavoriteIcon from "@mui/icons-material/Favorite"

interface NavUIProps {
    children: Element| ReactElement;
}
export default function NavUI({children}: NavUIProps) {

    return (<>
        <div className="menu-header">
            <h2>ZochiReader</h2>
        </div>
            {children}
        <div className="menu-mobile-buttons">
            <div className="inner">
                <div className="mobile-btn" id="home-menu-btn">
                    <HomeIcon sx={{fontSize: 32, color: "#3340CC"}}/>
                </div>
                <div className="mobile-btn" id="categories-menu-btn">
                    <GridIcon sx={{fontSize: 32, color: "#404040" }}/>
                </div>
                <div className="mobile-btn" id="favorites-menu-btn">
                    <HistoryIcon sx={{fontSize: 32, color: "#404040"}}/>
                </div>
                <div className="mobile-btn" id="recents-menu-btn">
                    <FavoriteIcon sx={{fontSize: 32, color: "#404040"}}/>
                </div>
            </div>
        </div>
    </>)
}