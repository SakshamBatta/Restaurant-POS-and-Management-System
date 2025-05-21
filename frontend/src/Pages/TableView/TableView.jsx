import LeftNav from "../../components/LeftNav/LeftNav";
import "./TableView.css";
import deleteTable from "../../assets/deleteTable.png";
import chair from "../../assets/chair.png";
import add from "../../assets/add.png";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";

export default function TableView() {
  const [addTableModal, setAddTableModal] = useState(false);
  const [tables, setTables] = useState([
    { name: "1", number: 1, chairs: 2 },
    { name: "2", number: 2, chairs: 3 },
    { name: "3", number: 3, chairs: 5 },
    { name: "4", number: 4, chairs: 7 },
    { name: "5", number: 5, chairs: 1 },
    { name: "6", number: 6, chairs: 4 },
    { name: "7", number: 7, chairs: 2 },
    { name: "8", number: 8, chairs: 3 },
    { name: "9", number: 9, chairs: 4 },
    { name: "10", number: 10, chairs: 5 },
    { name: "11", number: 11, chairs: 2 },
    { name: "12", number: 12, chairs: 3 },
    { name: "13", number: 13, chairs: 5 },
    { name: "14", number: 14, chairs: 7 },
    { name: "15", number: 15, chairs: 1 },
    { name: "16", number: 16, chairs: 4 },
    { name: "17", number: 17, chairs: 2 },
    { name: "18", number: 18, chairs: 3 },
    { name: "19", number: 19, chairs: 4 },
    { name: "20", number: 20, chairs: 5 },
    { name: "21", number: 21, chairs: 2 },
    { name: "22", number: 22, chairs: 3 },
    { name: "23", number: 23, chairs: 5 },
    { name: "24", number: 24, chairs: 7 },
    { name: "25", number: 25, chairs: 1 },
    { name: "26", number: 26, chairs: 4 },
    { name: "27", number: 27, chairs: 2 },
    { name: "28", number: 28, chairs: 3 },
    { name: "29", number: 29, chairs: 4 },
    { name: "30", number: 30, chairs: 5 },
  ]);
  const modalRef = useRef(null);
  const [newTable, setNewTable] = useState({ name: "", number: 0, chairs: 1 });

  useEffect(() => {
    if (addTableModal) {
      const nextNum = getNextTableNumber();
      setNewTable({
        name: nextNum < 10 ? `0${nextNum}` : `${nextNum}`,
        number: nextNum,
        chairs: 1,
      });
    }
  }, [addTableModal]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setAddTableModal(false);
      }
    }

    if (addTableModal) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [addTableModal]);

  const handleCreateTable = () => {
    if (newTable.name === "") {
      toast.error("Table name cannot be empty");
      return;
    }

    const tableExists = tables.some((table) => table.name === newTable.name);
    if (tableExists) {
      toast.error("Table name already exists");
      return;
    }
    setTables((prev) => [...prev, newTable]);
    setAddTableModal(false);
  };

  const getNextTableNumber = () => {
    if (tables.length === 0) return 1;
    const max = Math.max(...tables.map((t) => t.number));
    return max + 1;
  };

  return (
    <div className="container-tableview">
      <div className="top-navbar-tableview">
        <div className="left-logo-div-tableview"></div>
        <div className="right-search-bar-div-tableview">
          <div className="search-dot-tableview"></div>
          <input
            type="text"
            placeholder="Search"
            className="search-area-table-tableview"
          />
        </div>
      </div>
      <div className="main-content-table-tableview">
        <LeftNav />
        <div className="right-area-main-content-table-tableview">
          <h2>Tables</h2>
          <div className="tables-view">
            {tables.map((table) => (
              <div className="indi-table" key={table.number}>
                <img src={deleteTable} alt="" className="delete-img" />
                <div className="table-name">
                  <h3>Table</h3>
                  <h4>{table.name < 10 ? `0${table.name}` : table.name}</h4>
                </div>
                <div className="chair-info">
                  <img src={chair} alt="" className="chair-img" />
                  <p>{table.chairs < 10 ? `0${table.chairs}` : table.chairs}</p>
                </div>
              </div>
            ))}

            <button
              className="add-table-btn"
              onClick={() => setAddTableModal(true)}
            >
              <img src={add} alt="" />
            </button>
          </div>
          {addTableModal && (
            <div className="add-table-modal" ref={modalRef}>
              <h2>Table name (optional)</h2>
              <input
                type="text"
                value={newTable.name}
                onChange={(e) =>
                  setNewTable((prev) => ({ ...prev, name: e.target.value }))
                }
              />
              <h3>Chair</h3>
              <select
                className="chair-dropdown"
                value={newTable.chairs}
                onChange={(e) =>
                  setNewTable((prev) => ({
                    ...prev,
                    chairs: parseInt(e.target.value),
                  }))
                }
              >
                <option value="01">01</option>
                <option value="02">02</option>
                <option value="03">03</option>
                <option value="04">04</option>
                <option value="05">05</option>
                <option value="06">06</option>
              </select>
              <button className="create-table-btn" onClick={handleCreateTable}>
                Create
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
