# 🌐 Restaurant POS and Management System

---

## 🔗 Deployment Links

- **Frontend**: [https://restaurant-virid-chi-38.vercel.app/](https://restaurant-virid-chi-38.vercel.app/)
- **Backend**: [https://restaurant-pos-and-management-system.onrender.com](https://restaurant-pos-and-management-system.onrender.com)
- **Admin Analytics Dashboard**: [https://restaurant-virid-chi-38.vercel.app/](https://restaurant-virid-chi-38.vercel.app/)
- **User Order Page (Mobile View)**: [https://restaurant-virid-chi-38.vercel.app/user/order](https://restaurant-virid-chi-38.vercel.app/user/order)

---

## 🚀 Features

### 📊 Analytics Dashboard

- View overall analytics of the restaurant:
  - Total number of **Chefs**
  - Total **Revenue**
  - Total **Orders**
  - Total **Clients**
- 🔍 **Search Bar** to quickly find specific charts.
- **Order Summary Chart** with order types: _Served_, _Dine In_, _Take Away_.
- **Revenue Chart** displaying revenue by _Daily_, _Weekly_, _Monthly_, and _Yearly_ views.
- **Tables Overview** indicating whether a table is _Reserved_ or _Available_.
- **Chef Summary Table** showing chefs and their respective number of orders.

---

### 🍽️ Table Management

- Displays all tables with their **names** and **number of chairs**.
- Add new tables using the **"Add Table"** button.

---

### 📦 Order Line

- View all orders placed to date:
  - **Ongoing**
  - **Not Picked Up**
  - **Served**

---

### 🛒 User Order Page

- View all menu items available for ordering.
- Add items to the **cart** and proceed to **checkout**.

---

### 💳 Checkout Page

- Choose order type: **Dine In** or **Take Away**.
- Fill in personal details.
- **Swipe to place** the order.

---

## 🛠️ **Setup Instructions**

1. **Clone** the GitHub repository to your local machine.
2. Navigate to both `frontend` and `backend` folders and run:

   ```bash
   npm install
   ```

3. Navigate to the `frontend` folder and run:

   ```bash
   npm run dev
   ```

4. Navigate to the `backend` folder and run:

   ```bash
   node app.js
   ```

5. Create an .env file in the backend folder with the following details:

- Port
- MongoDB url
