import LeftNav from "../../components/LeftNav/LeftNav";
import "./Status.css";
import orderHeader from "../../assets/orderHeader.png";
import time from "../../assets/time.png";
import doneBlack from "../../assets/done-black.png";
import doneGreen from "../../assets/done-green.png";

export default function Status() {
  const menuDetails = [
    {
      orderNumber: 1,
      tableName: "Table 01",
      orderTime: "9:37 AM",
      noOfItems: "3 Item",
      orderType: "Dine In",
      orderStatus: "Ongoing",
      timeLeft: "4 Min",
      items: [
        {
          name: "Double Cheeseburger",
          quantity: 1,
        },
        {
          name: "Apple Pie",
          quantity: 1,
        },
        {
          name: "Coca-Cola L",
          quantity: 1,
        },
      ],
    },
    {
      orderNumber: 1,
      tableName: "Table 01",
      orderTime: "9:37 AM",
      noOfItems: "3 Item",
      orderType: "Done",
      orderStatus: "Served",
      timeLeft: "4 Min",
      items: [
        {
          name: "Double Cheeseburger",
          quantity: 1,
        },
        {
          name: "Apple Pie",
          quantity: 1,
        },
        {
          name: "Coca-Cola L",
          quantity: 1,
        },
      ],
    },
    {
      orderNumber: 1,
      tableName: "Table 01",
      orderTime: "9:37 AM",
      noOfItems: "3 Item",
      orderType: "Take Away",
      orderStatus: "Not Picked up",
      timeLeft: "4 Min",
      items: [
        {
          name: "Double Cheeseburger",
          quantity: 1,
        },
        {
          name: "Apple Pie",
          quantity: 1,
        },
        {
          name: "Coca-Cola L",
          quantity: 1,
        },
      ],
    },
    {
      orderNumber: 1,
      tableName: "Table 01",
      orderTime: "9:37 AM",
      noOfItems: "3 Item",
      orderType: "Dine In",
      orderStatus: "Ongoing",
      timeLeft: "4 Min",
      items: [
        {
          name: "Double Cheeseburger",
          quantity: 1,
        },
        {
          name: "Apple Pie",
          quantity: 1,
        },
        {
          name: "Coca-Cola L",
          quantity: 1,
        },
      ],
    },
    {
      orderNumber: 1,
      tableName: "Table 01",
      orderTime: "9:37 AM",
      noOfItems: "3 Item",
      orderType: "Dine In",
      orderStatus: "Ongoing",
      timeLeft: "4 Min",
      items: [
        {
          name: "Double Cheeseburger",
          quantity: 1,
        },
        {
          name: "Apple Pie",
          quantity: 1,
        },
        {
          name: "Coca-Cola L",
          quantity: 1,
        },
      ],
    },
    {
      orderNumber: 1,
      tableName: "Table 01",
      orderTime: "9:37 AM",
      noOfItems: "3 Item",
      orderType: "Take Away",
      orderStatus: "Not Picked up",
      timeLeft: "4 Min",
      items: [
        {
          name: "Double Cheeseburger",
          quantity: 1,
        },
        {
          name: "Apple Pie",
          quantity: 1,
        },
        {
          name: "Coca-Cola L",
          quantity: 1,
        },
      ],
    },
    {
      orderNumber: 1,
      tableName: "Table 01",
      orderTime: "9:37 AM",
      noOfItems: "3 Item",
      orderType: "Done",
      orderStatus: "Served",
      timeLeft: "4 Min",
      items: [
        {
          name: "Double Cheeseburger",
          quantity: 1,
        },
        {
          name: "Apple Pie",
          quantity: 1,
        },
        {
          name: "Coca-Cola L",
          quantity: 1,
        },
      ],
    },
    {
      orderNumber: 1,
      tableName: "Table 01",
      orderTime: "9:37 AM",
      noOfItems: "3 Item",
      orderType: "Dine In",
      orderStatus: "Ongoing",
      timeLeft: "4 Min",
      items: [
        {
          name: "Double Cheeseburger",
          quantity: 1,
        },
        {
          name: "Apple Pie",
          quantity: 1,
        },
        {
          name: "Coca-Cola L",
          quantity: 1,
        },
      ],
    },
  ];
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
            {menuDetails.map((order) => (
              <div
                className="order-card"
                style={{
                  backgroundColor: `${
                    order.orderStatus === "Ongoing"
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
                      <div className="order-time">{order.orderTime}</div>
                    </div>
                    <div className="item-numbers">{order.noOfItems}</div>
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
                        <div className="order-status-div-status">
                          {order.orderStatus}
                        </div>
                        {order.orderStatus === "Ongoing" && (
                          <div className="time-left-status-div">
                            : {order.timeLeft}
                          </div>
                        )}
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
                  {order.orderStatus === "Ongoing" && (
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
                  {order.orderStatus === "Not Picked up" && (
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
