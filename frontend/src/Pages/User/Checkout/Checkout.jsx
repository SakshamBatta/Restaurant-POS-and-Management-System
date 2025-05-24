import "./Checkout.css";
import search from "../../../assets/search.png";
// import { useContext } from "react";
import { OrderContext } from "../../../context/OrderContext";
import burger10 from "../../../assets/burger10.jpeg";
import Back from "../../../assets/Back.png";
import { useContext, useEffect, useRef, useState } from "react";
import delivery from "../../../assets/delivery.png";
import clock from "../../../assets/clock.png";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { FaArrowRightLong } from "react-icons/fa6";

import pizza3 from "../../../assets/pizza3.jpeg";
import drink5 from "../../../assets/drink5.jpeg";

export default function Checkout() {
  const [orderType, setOrderType] = useState("Dine In");
  const deliveryCharge = 50;
  const { selectedOrder, setSelectedOrder } = useContext(OrderContext);
  const x = useMotionValue(0);
  const background = useTransform(
    x,
    [-100, 0, 100],
    ["#ccc", "#eee", "#b8f5b1"]
  );
  const [ordered, setOrdered] = useState(false);

  console.log("selectedOrder", selectedOrder);

  const handleDragEnd = (_, info) => {
    if (info.point.x > 120) {
      setOrdered(true);
    }
  };

  //   const selectedOrder = [
  //     {
  //       name: "Double Patty",
  //       price: 220,
  //       image: burger10,
  //       time: 15,
  //     },
  //     {
  //       name: "Marinara",
  //       price: 90,
  //       image: pizza3,
  //       time: 25,
  //     },
  //     {
  //       name: "Mojito",
  //       price: 70,
  //       image: drink5,
  //       time: 15,
  //     },
  //   ];
  const swipeContainerRef = useRef(null);
  const [maxDrag, setMaxDrag] = useState(0);

  useEffect(() => {
    if (swipeContainerRef.current) {
      setMaxDrag(swipeContainerRef.current.offsetWidth - 70);
    }
  }, []);
  return (
    <div className="order-container-checkout">
      <div className="greet-message">
        <h3>Good evening</h3>
        <p>Place your order here</p>
      </div>
      <div className="search-bar-div-order">
        <img src={search} alt="" />
        <input type="text" placeholder="Search" />
      </div>
      <div className="selected-order-div">
        <div className="selected-orders">
          {selectedOrder.map((item, index) => (
            <div className="indi-selected-order" key={index}>
              <img src={item.image} alt="" className="indi-order-img" />
              <div className="indi-selected-order-details">
                <p>{item.name}</p>
                <div className="price-add-dec-quan">
                  <h3>₹ {item.price}</h3>
                  <div className="add-dec-quan">
                    <button>-</button>
                    <span>1</span>
                    <button>+</button>
                  </div>
                </div>
              </div>
              <img src={Back} alt="" className="back-img" />
            </div>
          ))}
        </div>
      </div>
      <input
        type="text"
        placeholder="Add cooking instructions (optional)"
        className="cooking-inst"
      />
      <div className="selected-order-type">
        <button
          className={`${orderType === "Dine In" ? "active-type" : ""}`}
          onClick={() => setOrderType("Dine In")}
        >
          Dine In
        </button>
        <button
          className={`${orderType === "Take Away" ? "active-type" : ""}`}
          onClick={() => setOrderType("Take Away")}
        >
          Take Away
        </button>
      </div>
      <div className="grand-total-div">
        <div className="item-total">
          <p className="item-total-tag">Item Total</p>
          <p className="item-total-amount">₹200.00</p>
        </div>
        <div className="delivery-charge">
          <p className="delivery-charge-tag">Delivery Charge</p>
          <p className="delivery-charge-amount">₹{deliveryCharge}</p>
        </div>
        <div className="taxes-charge">
          <p className="taxes-charge-tag">Taxes</p>
          <p className="taxes-charge-amount">₹5.00</p>
        </div>

        <div className="grand-total">
          <p className="grand-total-tag">Grand Total</p>
          <div className="grand-total-amount">₹255.00</div>
        </div>
      </div>
      <div className="your-details">
        <h2>Your details</h2>
        <div className="details-input-div">
          <input type="text" placeholder="Name" />,
          <input type="text" placeholder="Phone" />
        </div>
      </div>
      <div className="delivery-add-time-div">
        <div className="delivery-address">
          <img src={delivery} alt="" />
          <p>
            Delivery at Home - Flat no: 301, SVR Enclave, Hyper Nagar, vasavi...
          </p>
        </div>
        <div className="delivery-time">
          <img src={clock} alt="" />
          <p>
            Delivery in <b>42 mins</b>
          </p>
        </div>
      </div>
      <div className="swipe-container" ref={swipeContainerRef}>
        {!ordered ? (
          <div className="swipe-div">
            <motion.div
              className="swipe-button"
              drag="x"
              dragConstraints={{ left: 0, right: maxDrag }}
              style={{ x, background }}
              onDragEnd={handleDragEnd}
            >
              <span className="swipe-label">
                <FaArrowRightLong />
              </span>
            </motion.div>
            <span>Swipe to Order</span>
          </div>
        ) : (
          <div className="swipe-complete">Order Placed ✅</div>
        )}
      </div>
    </div>
  );
}
