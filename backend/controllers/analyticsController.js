const userSchema = require("../models/userSchema");
const orderSchema = require("../models/orderSchema");
const Order = require("../models/orderSchema");
const moment = require("moment");

exports.getUsersCount = async (req, res) => {
  try {
    const result = await userSchema.aggregate([
      { $group: { _id: "$number", count: { $sum: 1 } } },
      { $match: { count: 1 } },
      { $count: "uniqueNumberCount" },
    ]);
    res.status(200).json({
      result,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

exports.getTotalRevenue = async (req, res) => {
  try {
    const orders = await orderSchema.find({});
    const totalRevenue = orders.reduce((acc, order) => {
      return acc + order.grandTotal;
    }, 0);
    res.status(200).json({
      totalRevenue,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

exports.getRevenueStats = async (req, res) => {
  try {
    const { range = "Daily" } = req.query;

    const orders = await Order.find({}, { grandTotal: 1, orderTime: 1 });

    const grouped = {};

    const getWeek = (date) => {
      const firstDay = new Date(date.getFullYear(), 0, 1);
      const days = Math.floor((date - firstDay) / (24 * 60 * 60 * 1000));
      return Math.ceil((days + firstDay.getDay() + 1) / 7);
    };

    orders.forEach((order) => {
      const date = new Date(order.orderTime);
      let key;

      switch (range) {
        case "Daily":
          key = date.toLocaleDateString("en-US", { weekday: "short" });
          break;
        case "Weekly":
          key = `Week ${getWeek(date)}`;
          break;
        case "Monthly":
          key = date.toLocaleDateString("en-US", { month: "short" });
          break;
        case "Yearly":
          key = date.getFullYear();
          break;
        default:
          key = "Unknown";
      }

      if (!grouped[key]) grouped[key] = 0;
      grouped[key] += order.grandTotal;
    });

    const result = Object.entries(grouped).map(([name, total]) => ({
      name,
      total: parseFloat(total.toFixed(2)),
    }));

    res.status(200).json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const getStartDateForFilter = (filter) => {
  const now = new Date();
  switch (filter) {
    case "weekly":
      return new Date(now.setDate(now.getDate() - 7));
    case "monthly":
      return new Date(now.setMonth(now.getMonth() - 1));
    case "yearly":
      return new Date(now.setFullYear(now.getFullYear() - 1));
    default:
      return new Date(now.setHours(0, 0, 0, 0));
  }
};

exports.getOrderSummary = async (req, res) => {
  const filter = req.query.filter || "daily";
  const startDate = getStartDateForFilter(filter);

  try {
    const orders = await Order.find({ orderTime: { $gte: startDate } });

    const summary = {
      served: orders.filter((o) => o.orderStatus === "Served").length,
      dineIn: orders.filter(
        (o) => o.orderType === "Dine In" && o.orderStatus !== "Served"
      ).length,
      takeAway: orders.filter(
        (o) => o.orderType === "Take Away" && o.orderStatus !== "Served"
      ).length,
    };

    const total = Object.values(summary).reduce((a, b) => a + b, 0) || 1;

    const percentages = {
      served: Math.round((summary.served / total) * 100),
      dineIn: Math.round((summary.dineIn / total) * 100),
      takeAway: Math.round((summary.takeAway / total) * 100),
    };

    res.json({ summary, percentages });
  } catch (error) {
    res.status(500).json({ message: "Error fetching order summary" });
  }
};
