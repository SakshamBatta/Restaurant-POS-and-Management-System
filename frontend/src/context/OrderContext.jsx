import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const OrderContext = createContext();

export function OrderProvider({ children }) {
  const [selectedOrder, setSelectedOrder] = useState([]);
  const [orderStatusDetails, setOrderStatusDetails] = useState([]);

  const fetchOrderDetails = async () => {
    const response = await axios.get(
      `https://restaurant-pos-and-management-system.onrender.com/api/orders/all`
    );
    setOrderStatusDetails(response.data.orders);
  };

  useEffect(() => {
    fetchOrderDetails();
  }, []);
  return (
    <OrderContext.Provider
      value={{
        selectedOrder,
        setSelectedOrder,
        orderStatusDetails,
        setOrderStatusDetails,
        fetchOrderDetails,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
}
