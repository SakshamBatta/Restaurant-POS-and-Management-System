import LeftNav from "../../components/LeftNav/LeftNav";
import "./Status.css";
import orderHeader from "../../assets/orderHeader.png";
import time from "../../assets/time.png";
import doneBlack from "../../assets/done-black.png";
import doneGreen from "../../assets/done-green.png";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import moment from "moment-timezone";
import { toast } from "react-toastify";
import { OrderContext } from "../../context/OrderContext";

export default function Status() {
  const { orderStatusDetails, fetchOrderDetails } = useContext(OrderContext);
  const [dropdownStatus, setDropdownStatus] = useState("Not Picked up");

  const timeToIST = (time) => {
    const istTime = moment(time).tz("Asia/Kolkata").format("hh:mm A");
    return istTime;
  };

  const getTimeLeft = (orderTime, deliveryTime) => {
    const deliveryMinutes = parseInt(deliveryTime.split(" ")[0], 10) || 0;

    const deliveryEndTime = moment(orderTime)
      .tz("Asia/Kolkata")
      .add(deliveryMinutes, "minutes");
    const now = moment().tz("Asia/Kolkata");

    const duration = moment.duration(deliveryEndTime.diff(now));

    if (duration.asMilliseconds() <= 0) return "0 min";

    const minutes = Math.floor(duration.asMinutes());

    return `${minutes} min`;
  };

  const handleStatusChange = async (orderId, e) => {
    const orderStatus = e.target.value;
    setDropdownStatus(e.target.value);
    await axios.post(
      `http://localhost:3000/api/orders/updateTakeAway/${orderId}`,
      {
        orderStatus: orderStatus,
      }
    );
    setDropdownStatus("Not Picked up");
    fetchOrderDetails();
    toast.success("Order status updated successfully!");
  };

  useEffect(() => {
    const interval = setInterval(() => {
      orderStatusDetails.forEach((order) => {
        const minutesLeft = getTimeLeft(order.orderTime, order.deliveryTime);

        if (
          parseInt(minutesLeft.split(" ")[0], 10) <= 0 &&
          order.orderType !== "Done" &&
          order.orderStatus !== "Served" &&
          order.orderType === "Dine In"
        ) {
          axios
            .post(`http://localhost:3000/api/orders/update/${order._id}`)
            .then(() => fetchOrderDetails())
            .then(() => toast.success("Order served successfully!"))
            .catch((err) =>
              console.error(`Failed to update order ${order._id}`, err)
            );
        }
      });
    }, 10000);

    return () => clearInterval(interval);
  }, [orderStatusDetails]);

  return (
    <div className="container-status">
      <div className="top-navbar-status">
        <div className="left-logo-div-status"></div>
        <div className="right-search-bar-div-status">
          <div className="search-dot-status"></div>
          <input
            type="text"
            placeholder="Search"
            className="search-area-table-status"
          />
        </div>
      </div>
      <div className="main-content-table-status">
        <LeftNav />
        <div className="right-area-main-content-status">
          <h2>Order Line</h2>
          <div className="order-status">
            {orderStatusDetails.map((order) => (
              <div
                className="order-card"
                style={{
                  backgroundColor: `${
                    order.orderStatus === "Ongoing" &&
                    order.orderType === "Dine In"
                      ? "#FFE3BC"
                      : order.orderStatus === "Served"
                      ? "#B9F8C9"
                      : "#C2D4D9"
                  }`,
                }}
              >
                <div className="order-card-header">
                  <div className="left-header-div">
                    <div className="imageAndTitle">
                      <img src={orderHeader} alt="" />
                      <div className="order-number"># {order.orderNumber}</div>
                    </div>
                    <div className="table-details">
                      <div className="table-details-name">
                        {order.orderType !== "Take Away" && order.tableName}
                      </div>
                      <div className="order-time">
                        {timeToIST(order.orderTime)}
                      </div>
                    </div>
                    <div className="item-numbers">{order.noOfItems} Item</div>
                  </div>
                  <div className="right-header-div">
                    <div
                      className="status-div"
                      style={{
                        backgroundColor: `${
                          order.orderType === "Dine In"
                            ? "#FFE3BC"
                            : order.orderType === "Done"
                            ? "#B9F8C9"
                            : "#C2D4D9"
                        }`,
                      }}
                    >
                      <div
                        className="order-type"
                        style={{
                          color: `${
                            order.orderType === "Dine In"
                              ? "#FF9500"
                              : order.orderType === "Done"
                              ? "#34C759"
                              : "#3181A3"
                          }`,
                        }}
                      >
                        {order.orderType}
                      </div>
                      <div className="order-status-time">
                        {order.orderType === "Dine In" ||
                          (order.orderType === "Done" && (
                            <div className="order-status-div-status">
                              {order.orderStatus}
                            </div>
                          ))}
                        {order.orderStatus === "Ongoing" &&
                          order.orderType === "Dine In" && (
                            <div className="time-left-status-div">
                              :{" "}
                              {getTimeLeft(order.orderTime, order.deliveryTime)}
                            </div>
                          )}
                        {order.orderType === "Take Away" &&
                          (parseInt(
                            getTimeLeft(
                              order.orderTime,
                              order.deliveryTime
                            ).split(" ")[0],
                            10
                          ) > 0 ? (
                            <div>
                              <div className="order-status-div-status">
                                {order.orderStatus}
                              </div>{" "}
                              <div className="time-left-status-div">
                                :{" "}
                                {getTimeLeft(
                                  order.orderTime,
                                  order.deliveryTime
                                )}
                              </div>
                            </div>
                          ) : (
                            <select
                              className="takeaway-status-dropdown"
                              value={dropdownStatus}
                              onChange={(e) => handleStatusChange(order._id, e)}
                            >
                              <option value="Not Picked Up">
                                Not Picked up
                              </option>
                              <option value="Served">Served</option>
                            </select>
                          ))}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="order-item-details">
                  <p className="item-detail-header">
                    <span>1 x</span>
                    <span>Value Set Meals</span>
                  </p>
                  <div className="item-orders-div">
                    {order.items.map((item) => (
                      <p className="indi-order-item">
                        {item.quantity} x {item.name}
                      </p>
                    ))}
                  </div>
                </div>
                <div className="order-status-btn">
                  {order.orderStatus === "Ongoing" &&
                    order.orderType === "Dine In" && (
                      <div
                        className="indi-group-status"
                        style={{ backgroundColor: "#FDC474" }}
                      >
                        <span style={{ color: "#D87300" }}>Processing</span>
                        <img src={time} alt="" className="done-time" />
                      </div>
                    )}
                  {order.orderStatus === "Served" && (
                    <div
                      className="indi-group-status"
                      style={{ backgroundColor: "#31FF65" }}
                    >
                      <span style={{ color: "#0E912F" }}>Order Done</span>
                      <img src={doneGreen} alt="" className="done-green" />
                    </div>
                  )}
                  {order.orderType === "Take Away" && (
                    <div
                      className="indi-group-status"
                      style={{ backgroundColor: "#9BAEB3" }}
                    >
                      <span style={{ color: "#3B413D" }}>Order Done</span>
                      <img src={doneBlack} alt="" className="done-black" />
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
