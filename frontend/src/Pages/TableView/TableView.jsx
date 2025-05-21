import LeftNav from "../../components/LeftNav/LeftNav";
import "./TableView.css";
import deleteTable from "../../assets/deleteTable.png";
import chair from "../../assets/chair.png";
import add from "../../assets/add.png";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";

export default function TableView() {
  const [addTableModal, setAddTableModal] = useState(false);
  const [tables, setTables] = useState([]);
  const [tableToDelete, setTableToDelete] = useState(null);

  const fetchTables = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/api/tables/all`);
      setTables(response.data.tables);
    } catch (error) {
      console.error("Error fetching tables:", error);
    }
  };

  const handleTableDelete = async () => {
    if (tableToDelete) {
      try {
        const id = tableToDelete;
        console.log(id);
        await axios.delete(`http://localhost:3000/api/tables/delete/${id}`);
        toast.success("Table deleted successfully");
        setTableToDelete(null);
        fetchTables();
      } catch (error) {
        console.error("Error deleting table:", error);
        toast.error("Error deleting table");
      }
    }
  };

  useEffect(() => {
    fetchTables();
  }, []);
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

  const handleCreateTable = async () => {
    if (newTable.name === "") {
      toast.error("Table name cannot be empty");
      return;
    }

    const tableExists = tables.some((table) => table.name === newTable.name);
    if (tableExists) {
      toast.error("Table name already exists");
      return;
    }

    console.log(newTable);
    await axios.post(`http://localhost:3000/api/tables/create`, {
      name: newTable.name,
      number: newTable.number,
      chairs: newTable.chairs,
    });
    toast.success("Table created successfully");
    setAddTableModal(false);
    fetchTables();
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
            {tables?.map((table) => (
              <div className="indi-table" key={table.number}>
                <img
                  src={deleteTable}
                  alt=""
                  className="delete-img"
                  onClick={() => {
                    setTableToDelete(table._id);
                    handleTableDelete();
                  }}
                />
                <div className="table-name">
                  <h3>Table</h3>
                  <h4>{table.name}</h4>
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
