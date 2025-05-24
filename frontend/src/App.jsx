import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import TableView from "./Pages/TableView/TableView";
import Analytics from "./Pages/Analytics/Analytics";
import Status from "./Pages/Status/Status";
import Menu from "./Pages/Menu/Menu";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Order from "./Pages/User/Order/Order";
import { OrderProvider } from "./context/OrderContext";
import Checkout from "./Pages/User/Checkout/Checkout";

function App() {
  return (
    <OrderProvider>
      <BrowserRouter>
        <ToastContainer />
        <Routes>
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/tableview" element={<TableView />} />
          <Route path="/status" element={<Status />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/user/order" element={<Order />} />
          <Route path="/user/checkout" element={<Checkout />} />
        </Routes>
      </BrowserRouter>
    </OrderProvider>
  );
}

export default App;
