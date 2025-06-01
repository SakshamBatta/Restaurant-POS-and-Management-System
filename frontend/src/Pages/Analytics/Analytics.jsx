import LeftNav from "../../components/LeftNav/LeftNav";
import "./Analytics.css";
import chef from "../../assets/chef.png";
import order from "../../assets/order.png";
import client from "../../assets/client.png";
import currency from "../../assets/currency.png";
import { useContext, useEffect, useState } from "react";
import { TableContext } from "../../context/TableContext";
import axios from "axios";
import { OrderContext } from "../../context/OrderContext";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
} from "recharts";

export default function Analytics() {
  const { tables } = useContext(TableContext);
  const { orderStatusDetails } = useContext(OrderContext);
  const [chefs, setChefs] = useState([]);
  const [userCount, setUserCount] = useState(0);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [timeRange, setTimeRange] = useState("Daily");
  const [chartData, setChartData] = useState([]);
  const [filter, setFilter] = useState("daily");
  const [summary, setSummary] = useState({
    served: 0,
    dineIn: 0,
    takeAway: 0,
  });
  const [percentages, setPercentages] = useState({
    served: 0,
    dineIn: 0,
    takeAway: 0,
  });
  const [chartType, setChartType] = useState("All");

  useEffect(() => {
    const fetchSummaryData = async () => {
      try {
        const res = await axios.get(
          `https://restaurant-pos-and-management-system.onrender.com/api/analytics/summary?filter=${filter}`
        );
        setSummary(res.data.summary);
        setPercentages(res.data.percentages);
      } catch (err) {
        console.error("Failed to fetch order summary", err);
      }
    };

    fetchSummaryData();
  }, [filter]);

  const data = [
    { name: "Served", value: summary.served },
    { name: "Dine In", value: summary.dineIn },
    { name: "Take Away", value: summary.takeAway },
  ];

  const COLORS = ["#333", "#999", "#ccc"];

  const getChefs = async () => {
    const response = await axios.get(
      `https://restaurant-pos-and-management-system.onrender.com/api/chefs/get`
    );
    setChefs(response.data.chefs);
  };

  const getUserCount = async () => {
    const response = await axios.get(
      `https://restaurant-pos-and-management-system.onrender.com/api/analytics/get-users`
    );
    setUserCount(response.data.result[0].uniqueNumberCount);
  };

  const getTotalRevenue = async () => {
    const response = await axios.get(
      `https://restaurant-pos-and-management-system.onrender.com/api/analytics/total-revenue`
    );
    setTotalRevenue(response.data.totalRevenue);
  };
  const getWeekNumber = (date) => {
    const startOfYear = new Date(date.getFullYear(), 0, 1);
    const pastDaysOfYear =
      (date -
        startOfYear +
        (startOfYear.getTimezoneOffset() - date.getTimezoneOffset()) * 60000) /
      86400000;
    return Math.ceil((pastDaysOfYear + startOfYear.getDay() + 1) / 7);
  };

  const getFullRange = (range) => {
    switch (range) {
      case "Daily":
        return ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
      case "Weekly": {
        const currentDate = new Date();
        const currentWeek = getWeekNumber(currentDate); // helper below
        return Array.from(
          { length: 7 },
          (_, i) => `Week ${currentWeek - 6 + i}`
        );
      }
      case "Monthly":
        return ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"];
      case "Yearly": {
        const currentYear = new Date().getFullYear();
        return Array.from(
          { length: 7 },
          (_, i) => `${currentYear - i}`
        ).reverse();
      }
      default:
        return [];
    }
  };

  const fetchData = async (range) => {
    try {
      const res = await axios.get(
        `https://restaurant-pos-and-management-system.onrender.com/api/analytics/revenue?range=${range}`
      );
      const rawData = res.data;
      const expectedKeys = getFullRange(range);

      const dataMap = rawData.reduce((acc, cur) => {
        acc[cur.name] = cur.total;
        return acc;
      }, {});

      const fullData = expectedKeys.map((key) => ({
        name: key,
        total: dataMap[key] || 0,
      }));

      setChartData(fullData);
    } catch (err) {
      console.error("Failed to fetch revenue data:", err);
    }
  };

  useEffect(() => {
    fetchData(timeRange);
  }, [timeRange]);

  useEffect(() => {
    getChefs();
    getUserCount();
    getTotalRevenue();
  }, []);

  return (
    <div className="container-analytics">
      <div className="top-navbar-analytics">
        <div className="left-logo-div-analytics"></div>
        <div className="right-search-bar-div-analytics">
          <select
            id="chartFilter"
            className="chart-filter-dropdown"
            value={chartType}
            onChange={(e) => setChartType(e.target.value)}
          >
            <option>All</option>
            <option>Order Summary</option>
            <option>Revenue</option>
            <option>Tables</option>
          </select>
        </div>
      </div>
      <div className="main-content-table-analytics">
        <LeftNav />
        <div className="right-area-main-content-analytics">
          <h2>Analytics </h2>
          <div className="main-area-analytics">
            <div className="different-analytics-values">
              <div className="total-analytics">
                <img src={chef} alt="" />
                <div className="value-analytics">
                  <p className="number-analytics">0{chefs.length}</p>
                  <p className="tag-analytics">TOTAL CHEF</p>
                </div>
              </div>
              <div className="total-analytics">
                <div className="currency-div">
                  <img src={currency} alt="" />
                </div>
                <div className="value-analytics">
                  <p className="number-analytics">{totalRevenue}</p>
                  <p className="tag-analytics">TOTAL REVENUE</p>
                </div>
              </div>
              <div className="total-analytics">
                <img src={order} alt="" />
                <div className="value-analytics">
                  <p className="number-analytics">
                    {orderStatusDetails.length > 9
                      ? orderStatusDetails.length
                      : `0${orderStatusDetails.length}`}
                  </p>
                  <p className="tag-analytics">TOTAL ORDERS</p>
                </div>
              </div>
              <div className="total-analytics">
                <img src={client} alt="" />
                <div className="value-analytics">
                  <p className="number-analytics">
                    {userCount > 9 ? userCount : `0${userCount}`}
                  </p>
                  <p className="tag-analytics">TOTAL CLIENTS</p>
                </div>
              </div>
            </div>
            <div className="different-analytics-charts">
              {(chartType === "All" || chartType === "Order Summary") && (
                <div className="summary-chart">
                  <div className="order-summary-card">
                    <div className="order-summary-card-header">
                      <h2>Order Summary</h2>
                      <select
                        value={filter}
                        onChange={(e) => setFilter(e.target.value)}
                      >
                        <option value="daily">Daily</option>
                        <option value="weekly">Weekly</option>
                        <option value="monthly">Monthly</option>
                        <option value="yearly">Yearly</option>
                      </select>
                    </div>
                    <div className="horizontal-table-line"></div>

                    <div className="summary-grid">
                      <div>
                        <p className="count">{summary.served}</p>
                        <p className="label">Served</p>
                      </div>
                      <div>
                        <p className="count">{summary.dineIn}</p>
                        <p className="label">Dine In</p>
                      </div>
                      <div>
                        <p className="count">{summary.takeAway}</p>
                        <p className="label">Take Away</p>
                      </div>
                    </div>

                    <div className="chart-progress-row">
                      <div className="order-summary-chart-container">
                        <PieChart width={180} height={180}>
                          <Pie
                            data={data}
                            dataKey="value"
                            innerRadius={43}
                            outerRadius={68}
                            paddingAngle={5}
                          >
                            {data.map((entry, index) => (
                              <Cell
                                key={`cell-${index}`}
                                fill={COLORS[index]}
                              />
                            ))}
                          </Pie>
                        </PieChart>
                      </div>

                      <div className="progress-section">
                        <div className="progress-item">
                          <div className="progress-label">
                            <span>Take Away</span>
                            <span>({percentages.takeAway}%)</span>
                          </div>
                          <div className="progress-bar">
                            <div
                              className="progress-fill"
                              style={{
                                width: `${percentages.takeAway}%`,
                                backgroundColor: COLORS[2],
                              }}
                            ></div>
                          </div>
                        </div>

                        <div className="progress-item">
                          <div className="progress-label">
                            <span>Served</span>
                            <span>({percentages.served}%)</span>
                          </div>
                          <div className="progress-bar">
                            <div
                              className="progress-fill"
                              style={{
                                width: `${percentages.served}%`,
                                backgroundColor: COLORS[0],
                              }}
                            ></div>
                          </div>
                        </div>

                        <div className="progress-item">
                          <div className="progress-label">
                            <span>Dine In</span>
                            <span>({percentages.dineIn}%)</span>
                          </div>
                          <div className="progress-bar">
                            <div
                              className="progress-fill"
                              style={{
                                width: `${percentages.dineIn}%`,
                                backgroundColor: COLORS[1],
                              }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              {(chartType === "All" || chartType === "Revenue") && (
                <div className="summary-chart">
                  <div className="revenue-card">
                    <div className="revenue-header">
                      <h3>Revenue</h3>
                      <select
                        className="dropdown"
                        value={timeRange}
                        onChange={(e) => setTimeRange(e.target.value)}
                      >
                        <option>Daily</option>
                        <option>Weekly</option>
                        <option>Monthly</option>
                        <option>Yearly</option>
                      </select>
                    </div>
                    <div className="horizontal-table-line"></div>

                    <div className="chart-container">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart
                          data={chartData}
                          margin={{ top: 20, right: 20, left: 20, bottom: 20 }}
                        >
                          <CartesianGrid
                            strokeDasharray="3 3"
                            vertical={false}
                          />
                          <XAxis
                            dataKey="name"
                            interval={0}
                            tick={{
                              fontSize: 10,
                              fill: "#333",
                              fontFamily: "Inter, sans-serif",
                            }}
                          />

                          <Tooltip />
                          <Line
                            type="monotone"
                            dataKey="total"
                            stroke="#000000"
                            strokeWidth={2}
                            dot={{ r: 3 }}
                            activeDot={{ r: 6 }}
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </div>
              )}
              {(chartType === "All" || chartType === "Tables") && (
                <div className="summary-chart">
                  <div className="table-summary-chart">
                    <h2>Tables</h2>
                    <div className="table-status-div">
                      <div className="reserved-table-status">
                        <div className="reserved-dot"></div>
                        <div className="reserved-tag">Reserved</div>
                      </div>
                      <div className="available-table-status">
                        <div className="available-dot"></div>
                        <div className="available-tag">Available</div>
                      </div>
                    </div>
                    <div className="horizontal-table-line"></div>
                    <div className="table-numbers-div">
                      {tables?.map((table) => (
                        <div
                          className={`indi-table-div ${
                            table.status === "Reserved" ? "is-reserved" : ""
                          }`}
                        >
                          <p className="indi-table-tag">Table</p>
                          <p className="indi-table-name">{table.name}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div className="chefs-analytics">
              <table>
                <thead>
                  <tr>
                    <th>Chef Name</th>
                    <th>Order Taken</th>
                  </tr>
                </thead>
                <tbody>
                  {chefs.map((chef) => (
                    <tr key={chef._id}>
                      <td>{chef.name}</td>
                      <td>
                        {chef.orders > 9 ? chef.orders : `0${chef.orders}`}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
