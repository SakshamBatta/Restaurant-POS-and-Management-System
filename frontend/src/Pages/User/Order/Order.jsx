import "./Order.css";
import search from "../../../assets/search.png";
import burger from "../../../assets/burger.png";
import drink from "../../../assets/drink.png";
import french from "../../../assets/french.png";
import veggies from "../../../assets/veggies.png";
import burger1 from "../../../assets/burger1.jpg";
import burger4 from "../../../assets/burger4.jpeg";
import burger5 from "../../../assets/burger5.jpeg";
import burger6 from "../../../assets/burger6.jpeg";
import burger10 from "../../../assets/burger10.jpeg";
import burger8 from "../../../assets/burger8.jpeg";
import addQuan from "../../../assets/addQuan.png";
import Pizza1 from "../../../assets/Pizza1.jpeg";
import pizza2 from "../../../assets/pizza2.jpeg";
import pizza3 from "../../../assets/pizza3.jpeg";
import pizza4 from "../../../assets/pizza4.jpeg";
import pizza5 from "../../../assets/pizza5.jpeg";
import pizza6 from "../../../assets/pizza6.jpeg";
import drink1 from "../../../assets/drink1.jpeg";
import drink2 from "../../../assets/drink2.jpeg";
import drink3 from "../../../assets/drink3.jpeg";
import drink4 from "../../../assets/drink4.jpeg";
import drink5 from "../../../assets/drink5.jpeg";
import drink6 from "../../../assets/drink6.jpeg";
import fries1 from "../../../assets/fries1.jpeg";
import fries2 from "../../../assets/fries2.jpeg";
import fries3 from "../../../assets/fries3.jpeg";
import fries4 from "../../../assets/fries4.jpeg";
import fries5 from "../../../assets/fries5.jpeg";
import fries6 from "../../../assets/fries6.jpeg";
import veggies1 from "../../../assets/veggies1.webp";
import veggies2 from "../../../assets/veggies2.jpeg";
import veggies3 from "../../../assets/veggies3.jpeg";
import veggies4 from "../../../assets/veggies4.jpeg";
import veggies5 from "../../../assets/veggies5.jpeg";
import veggies6 from "../../../assets/veggies6.jpeg";
import { OrderContext } from "../../../context/OrderContext";
import { Link } from "react-router-dom";

import { GiFullPizza } from "react-icons/gi";
import { useContext, useState } from "react";

export default function Order() {
  const [activeMenu, setActiveMenu] = useState("Burger");
  const { selectedOrder, setSelectedOrder } = useContext(OrderContext);

  const menu = [
    {
      name: "Burger",
      img: burger,
    },
    {
      name: "Pizza",
    },
    {
      name: "Drink",
      img: drink,
    },
    {
      name: "French fries",
      img: french,
    },
    {
      name: "Veggies",
      img: veggies,
    },
  ];

  const burgerMenu = [
    {
      name: "Classic Burger",
      price: 180,
      image: burger1,
      time: 15,
    },
    {
      name: "Double Patty",
      price: 220,
      image: burger10,
      time: 15,
    },
    {
      name: "Veggie Delight",
      price: 150,
      image: burger8,
      time: 15,
    },
    {
      name: "Chicken Zinger",
      price: 200,
      image: burger4,
      time: 15,
    },
    {
      name: "Spicy Jalapeno",
      price: 210,
      image: burger5,
      time: 15,
    },
    {
      name: "BBQ Bacon Burger",
      price: 240,
      image: burger6,
      time: 15,
    },
  ];

  const pizzaMenu = [
    {
      name: "Capricciosa",
      price: 200,
      image: Pizza1,
      time: 25,
    },
    {
      name: "Sicilian",
      price: 150,
      image: pizza2,
      time: 25,
    },
    {
      name: "Marinara",
      price: 90,
      image: pizza3,
      time: 25,
    },
    {
      name: "Pepperoni",
      price: 300,
      image: pizza4,
      time: 25,
    },
    {
      name: "Four Cheese",
      price: 250,
      image: pizza5,
      time: 25,
    },
    {
      name: "BBQ Chicken",
      price: 270,
      image: pizza6,
      time: 25,
    },
  ];

  const drinkMenu = [
    {
      name: "Coca-Cola",
      price: 50,
      image: drink1,
      time: 15,
    },
    {
      name: "Lemonade",
      price: 40,
      image: drink2,
      time: 15,
    },
    {
      name: "Orange Juice",
      price: 60,
      image: drink3,
      time: 15,
    },
    {
      name: "Iced Tea",
      price: 55,
      image: drink4,
      time: 15,
    },
    {
      name: "Mojito",
      price: 70,
      image: drink5,
      time: 15,
    },
    {
      name: "Cold Coffee",
      price: 75,
      image: drink6,
      time: 15,
    },
  ];

  const frenchFriesMenu = [
    {
      name: "Classic Fries",
      price: 70,
      image: fries1,
      time: 20,
    },
    {
      name: "Cheesy Fries",
      price: 90,
      image: fries2,
      time: 20,
    },
    {
      name: "Spicy Fries",
      price: 80,
      image: fries3,
      time: 20,
    },
    {
      name: "Curly Fries",
      price: 100,
      image: fries4,
      time: 20,
    },
    {
      name: "Garlic Fries",
      price: 95,
      image: fries5,
      time: 20,
    },
    {
      name: "Peri Peri Fries",
      price: 85,
      image: fries6,
      time: 20,
    },
  ];

  const veggiesMenu = [
    {
      name: "Grilled Veggies",
      price: 120,
      image: veggies1,
      time: 25,
    },
    {
      name: "Veg Salad",
      price: 100,
      image: veggies2,
      time: 25,
    },
    {
      name: "Stuffed Bell Peppers",
      price: 140,
      image: veggies3,
      time: 25,
    },
    {
      name: "Mixed Veg Stir Fry",
      price: 130,
      image: veggies4,
      time: 25,
    },
    {
      name: "Baked Broccoli",
      price: 110,
      image: veggies5,
      time: 25,
    },
    {
      name: "Paneer Tikka",
      price: 150,
      image: veggies6,
      time: 25,
    },
  ];

  const menuToMap =
    activeMenu === "Burger"
      ? burgerMenu
      : activeMenu === "Pizza"
      ? pizzaMenu
      : activeMenu === "Drink"
      ? drinkMenu
      : activeMenu === "French fries"
      ? frenchFriesMenu
      : veggiesMenu;

  console.log(selectedOrder);

  // const addToOrder = (item) => {
  //   selectedOrder
  // }
  return (
    <div className="order-container">
      <div className="greet-message">
        <h3>Good evening</h3>
        <p>Place your order here</p>
      </div>
      <div className="search-bar-div-order">
        <img src={search} alt="" />
        <input type="text" placeholder="Search" />
      </div>
      <div className="order-menu">
        {menu.map((item, index) => (
          <div
            className={`order-item ${activeMenu === item.name ? "active" : ""}`}
            key={index}
            onClick={() => setActiveMenu(item.name)}
          >
            {item.name !== "Pizza" ? (
              <img
                src={item.img}
                alt=""
                className={`${
                  item.name === "Drink" ? "drink-img" : "order-img"
                }`}
              />
            ) : (
              <GiFullPizza color="grey" className="pizza-img" size={27} />
            )}
            <p>{item.name}</p>
          </div>
        ))}
      </div>
      <div className="order-category-items">
        <h2>{activeMenu}</h2>
        <div className="all-items">
          {menuToMap.map((item, index) => (
            <div className="indi-item-div" key={index}>
              <img src={item.image} alt="" />
              <div className="name-price">
                <p>{item.name}</p>
                <div className="quantity-div">
                  <h3>₹{item.price}</h3>
                  <button className="increase-quan">
                    <img
                      src={addQuan}
                      alt=""
                      onClick={() =>
                        setSelectedOrder((prev) => [...prev, item])
                      }
                    />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Link to="/user/checkout" className="order-next-btn">
        Next
      </Link>
    </div>
  );
}
