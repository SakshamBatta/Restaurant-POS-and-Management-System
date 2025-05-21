import LeftNav from "../../components/LeftNav/LeftNav";
import "./Menu.css";

export default function Menu() {
  return (
    <div className="container">
      <div className="top-navbar">
        <div className="left-logo-div"></div>
        <div className="right-search-bar-div">
          <div className="search-dot"></div>
          <input
            type="text"
            placeholder="Search"
            className="search-area-table"
          />
        </div>
      </div>
      <div className="main-content-table">
        <LeftNav />
        <div className="right-area-main-content"></div>
      </div>
    </div>
  );
}
