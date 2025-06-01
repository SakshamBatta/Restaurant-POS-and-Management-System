import "./LeftNav.css";
import analytics from "../../assets/analytics.png";
import menu from "../../assets/menu.png";
import status from "../../assets/status.png";
import table from "../../assets/table.png";
import { useLocation, useNavigate } from "react-router-dom";

export default function LeftNav() {
  const navigate = useNavigate();
  const location = useLocation();

  const navImages = [
    {
      src: analytics,
      index: "analytics",
      path: "/",
    },
    { src: table, index: "table", path: "/tableview" },
    { src: status, index: "status", path: "/status" },
    { src: menu, index: "menu", path: "/user/order" },
  ];

  const currentPath = location.pathname;
  const activeNav = navImages.find((img) => img.path === currentPath)?.index;

  return (
    <div className="left-area-main-content">
      <div className="nav-images">
        {navImages.map((img) => (
          <div
            key={img.index}
            className={`nav-img ${
              activeNav === img.index ? "active-left-nav" : ""
            }`}
            onClick={() => {
              navigate(img.path);
            }}
          >
            <img src={img.src} />
          </div>
        ))}
      </div>
      <div className="nav-dot"></div>
    </div>
  );
}
