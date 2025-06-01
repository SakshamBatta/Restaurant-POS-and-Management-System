/* eslint-disable no-unused-vars */
import "./Checkout.css";
import search from "../../../assets/search.png";

import { OrderContext } from "../../../context/OrderContext";
import Back from "../../../assets/Back.png";
import { useContext, useEffect, useRef, useState } from "react";
import delivery from "../../../assets/delivery.png";
import clock from "../../../assets/clock.png";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { FaArrowRightLong } from "react-icons/fa6";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import cancel from "../../../assets/cancel.png";

export default function Checkout() {
  const [orderType, setOrderType] = useState("Dine In");
  const [inputValue, setInputValue] = useState("");
  const [deliveryTime, setDeliveryTime] = useState("");
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [itemTotal, setItemTotal] = useState(0);
  const [grandTotal, setGrandTotal] = useState(0);
  const [instructions, setInstructions] = useState("");
  const [instructionModal, setInstructionModal] = useState(false);
  const deliveryCharge = 50;
  const { selectedOrder, setSelectedOrder } = useContext(OrderContext);
  const navigate = useNavigate();
  const x = useMotionValue(0);
  const background = useTransform(
    x,
    [-100, 0, 100],
    ["#ccc", "#eee", "#b8f5b1"]
  );
  const [ordered, setOrdered] = useState(false);

  console.log("selectedOrder", selectedOrder);

  const handleDragEnd = async (_, info) => {
    if (info.point.x > 120) {
      await axios.post(
        `https://restaurant-pos-and-management-system.onrender.com/api/orders/create`,
        {
          items: selectedOrder.map((item) => ({
            name: item.name,
            quantity: item.quantity,
          })),
          orderType,
          grandTotal,
          user: {
            name,
            number,
            address: orderType === "Take Away" ? inputValue || "" : "",
            people: orderType === "Dine In" ? parseInt(inputValue) || 1 : 1,
          },
          instructions: instructions || "",
          deliveryTime,
        }
      ),
        setOrdered(true);
      setSelectedOrder([]);
      setInputValue("");
      setName("");
      setNumber("");
      setDeliveryTime("");
      setItemTotal(0);
      setGrandTotal(0);
      setInstructions("");
      x.set(0);
      navigate("/user/order");
    }
  };

  const swipeContainerRef = useRef(null);
  const [maxDrag, setMaxDrag] = useState(0);

  useEffect(() => {
    if (swipeContainerRef.current) {
      setMaxDrag(swipeContainerRef.current.offsetWidth - 70);
    }
  }, []);

  const increaseQuantity = (name) => {
    setSelectedOrder((prevOrders) =>
      prevOrders.map((item) =>
        item.name === name ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decreaseQuantity = (name) => {
    setSelectedOrder((prevOrders) =>
      prevOrders.map((item) =>
        item.name === name && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  const removeItem = (name) => {
    setSelectedOrder((prevOrders) =>
      prevOrders.filter((item) => item.name !== name)
    );
  };
  useEffect(() => {
    const delivery = selectedOrder.reduce((total, item) => {
      return total + item.time * item.quantity;
    }, 0);
    setDeliveryTime(delivery);
  }, [selectedOrder]);

  useEffect(() => {
    const total = selectedOrder.reduce((total, item) => {
      return total + item.price * item.quantity;
    }, 0);
    setItemTotal(total);
  }, [selectedOrder]);

  useEffect(() => {
    const grand =
      itemTotal + (orderType === "Take Away" ? deliveryCharge : 0) + 5;
    setGrandTotal(grand);
  });
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
                    <button onClick={() => decreaseQuantity(item.name)}>
                      -
                    </button>
                    <span>{item.quantity}</span>
                    <button onClick={() => increaseQuantity(item.name)}>
                      +
                    </button>
                  </div>
                </div>
              </div>
              <img
                src={Back}
                alt=""
                className="back-img"
                onClick={() => removeItem(item.name)}
              />
            </div>
          ))}
        </div>
      </div>
      <input
        type="text"
        placeholder="Add cooking instructions (optional)"
        className="cooking-inst"
        onClick={() => setInstructionModal(true)}
        readOnly
        value={instructions}
      />
      {instructionModal && (
        <div className="modal-overlay">
          <div className="instruction-modal-div">
            <img
              src={cancel}
              alt=""
              onClick={() => setInstructionModal(false)}
            />
            <h2>Add Cooking instructions</h2>
            <textarea
              value={instructions}
              onChange={(e) => setInstructions(e.target.value)}
            ></textarea>
            <p>
              The restaurant will try its best to follow your request. However,
              refunds or cancellations in this regard won’t be possible
            </p>
            <div className="modal-btns">
              <button
                className="cancel-modal"
                onClick={() => {
                  setInstructionModal(false);
                  setInstructions("");
                }}
              >
                Cancel
              </button>
              <button
                className="next-modal"
                onClick={() => setInstructionModal(false)}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      )}
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
          <p className="item-total-amount">₹{itemTotal}</p>
        </div>
        {orderType === "Take Away" && (
          <div className="delivery-charge">
            <p className="delivery-charge-tag">Delivery Charge</p>
            <p className="delivery-charge-amount">₹{deliveryCharge}</p>
          </div>
        )}
        <div className="taxes-charge">
          <p className="taxes-charge-tag">Taxes</p>
          <p className="taxes-charge-amount">₹5.00</p>
        </div>

        <div className="grand-total">
          <p className="grand-total-tag">Grand Total</p>
          <div className="grand-total-amount">₹ {grandTotal}</div>
        </div>
      </div>
      <div className="your-details">
        <h2>Your details</h2>
        <div className="details-input-div">
          <input
            type="text"
            placeholder="Name"
            onChange={(e) => setName(e.target.value)}
          />
          ,
          <input
            type="text"
            placeholder="Phone"
            onChange={(e) => setNumber(e.target.value)}
          />
          ,
          {orderType === "Take Away" ? (
            <input
              type="text"
              placeholder="Address"
              onChange={(e) => setInputValue(e.target.value)}
            />
          ) : (
            <input
              type="number"
              placeholder="People (Max 6)"
              onChange={(e) => setInputValue(e.target.value)}
            />
          )}
        </div>
      </div>
      <div className="delivery-add-time-div">
        {orderType === "Take Away" ? (
          <div className="delivery-address">
            <img src={delivery} alt="" />
            <p>{`Delivery at Home - ${inputValue}`}</p>
          </div>
        ) : (
          <div className="delivery-address">
            <p>{`No of People - ${inputValue}`}</p>
          </div>
        )}
        <div className="delivery-time">
          <img src={clock} alt="" />
          <p>
            Delivery in <b>{deliveryTime} mins</b>
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
