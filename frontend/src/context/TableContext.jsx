import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const TableContext = createContext();

export function TableProvider({ children }) {
  const [tables, setTables] = useState([]);

  const fetchTables = async () => {
    try {
      const response = await axios.get(
        `https://restaurant-pos-and-management-system.onrender.com/api/tables/all`
      );
      setTables(response.data.tables);
    } catch (error) {
      console.error("Error fetching tables:", error);
    }
  };
  useEffect(() => {
    fetchTables();
  }, []);

  return (
    <TableContext.Provider value={{ tables, setTables, fetchTables }}>
      {children}
    </TableContext.Provider>
  );
}
