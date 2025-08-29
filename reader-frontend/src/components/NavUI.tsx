import { type ReactElement } from "react";
import "../css/NavUI.css";
import HomeIcon from "@mui/icons-material/Home";
import GridIcon from "@mui/icons-material/GridView"
import HistoryIcon from "@mui/icons-material/History"
import FavoriteIcon from "@mui/icons-material/Favorite"
import { useLocation, useNavigate } from "react-router-dom";

interface NavUIProps {
    children: Element| ReactElement;
}
export default function NavUI({children}: NavUIProps) {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { path: "/", icon: <HomeIcon sx={{ fontSize: 32 , color: "#404040" }} />, id: "home-menu-btn" },
    { path: "/categories", icon: <GridIcon sx={{ fontSize: 32 , color: "#404040" }} />, id: "categories-menu-btn" },
    { path: "/favorites", icon: <FavoriteIcon sx={{ fontSize: 32 , color: "#404040" }} />, id: "favorites-menu-btn" },
    { path: "/recentRead", icon: <HistoryIcon sx={{ fontSize: 32 , color: "#404040" }} />, id: "recents-menu-btn" },
  ];

  return (
    <>

      {/* <div className="menu-header">
        <h2>ZochiReader</h2>
      </div> */}
      {children}
      <div className="menu-mobile-buttons">
        <div className="inner">
          {menuItems.map((item) => (
            <div
              key={item.id}
              onClick={() => navigate(item.path, { replace: true })}
              className={`mobile-menu-btn ${
                location.pathname === item.path ? "active" : ""
              }`}
              id={item.id}
            >
              {item.icon}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}