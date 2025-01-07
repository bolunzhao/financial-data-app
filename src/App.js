import React, { useState, useEffect } from "react";
import axios from "axios";

function App() {
  // Define State
  const [incomeStatements, setIncomeStatements] = useState([]);
  const [filteredStatements, setFilteredStatements] = useState([]);

  // Filter states
  const [minYear, setMinYear] = useState("");
  const [maxYear, setMaxYear] = useState("");
  const [minRevenue, setMinRevenue] = useState("");
  const [maxRevenue, setMaxRevenue] = useState("");
  const [minNetIncome, setMinNetIncome] = useState("");
  const [maxNetIncome, setMaxNetIncome] = useState("");

  // Sorting states
  const [sortKey, setSortKey] = useState("date"); // Initially use date as sort key
  const [sortOrder, setSortOrder] = useState("asc"); // "asc" or "desc"

  // Fetch Data on Mount
  useEffect(() => {
    const fetchIncomeStatements = async () => {
      try {
        const apiKey = process.env.REACT_APP_FMP_API_KEY;
        const url = `https://financialmodelingprep.com/api/v3/income-statement/AAPL?period=annual&apikey=${apiKey}`;
        
        const response = await axios.get(url);

        setIncomeStatements(response.data);
        setFilteredStatements(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchIncomeStatements();
  }, []);

  // Filter Logic
  useEffect(() => {
    let data = [...incomeStatements];

    // Filter by year
    if (minYear) {
      data = data.filter((item) => parseInt(item.date.slice(0, 4)) >= parseInt(minYear));
    }
    if (maxYear) {
      data = data.filter((item) => parseInt(item.date.slice(0, 4)) <= parseInt(maxYear));
    }

    // Filter by revenue range
    if (minRevenue) {
      data = data.filter((item) => item.revenue >= parseFloat(minRevenue));
    }
    if (maxRevenue) {
      data = data.filter((item) => item.revenue <= parseFloat(maxRevenue));
    }

    // Filter by net income range
    if (minNetIncome) {
      data = data.filter((item) => item.netIncome >= parseFloat(minNetIncome));
    }
    if (maxNetIncome) {
      data = data.filter((item) => item.netIncome <= parseFloat(maxNetIncome));
    }

    setFilteredStatements(data);
  }, [minYear, maxYear, minRevenue, maxRevenue, minNetIncome, maxNetIncome, incomeStatements]);

  // Sorting Logic
  const handleSort = (key) => {
    // If the user clicks the same column header, flip the sort order
    if (sortKey === key) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortKey(key);
      setSortOrder("asc");
    }
  };

  const sortedData = [...filteredStatements].sort((a, b) => {
    let valA, valB;

    switch (sortKey) {
      case "revenue":
        valA = a.revenue;
        valB = b.revenue;
        break;
      case "netIncome":
        valA = a.netIncome;
        valB = b.netIncome;
        break;
      case "date":
      default:
        // We can just compare date as string
        valA = a.date;
        valB = b.date;
        break;
    }

    if (valA < valB) return sortOrder === "asc" ? -1 : 1;
    if (valA > valB) return sortOrder === "asc" ? 1 : -1;
    return 0;
  });

  // Render the App
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Apple Annual Income Statement</h1>

      {/* Filter Section */}
      <div className="flex flex-col md:flex-row gap-4 mb-4">
        {/* Date Range Filters */}
        <div className="flex flex-col">
          <label className="mb-1 font-semibold">Min Year</label>
          <input
            type="number"
            value={minYear}
            onChange={(e) => setMinYear(e.target.value)}
            placeholder="e.g. 2020"
            className="border p-2 rounded"
          />
        </div>
        <div className="flex flex-col">
          <label className="mb-1 font-semibold">Max Year</label>
          <input
            type="number"
            value={maxYear}
            onChange={(e) => setMaxYear(e.target.value)}
            placeholder="e.g. 2024"
            className="border p-2 rounded"
          />
        </div>

        {/* Revenue Range Filters */}
        <div className="flex flex-col">
          <label className="mb-1 font-semibold">Min Revenue</label>
          <input
            type="number"
            value={minRevenue}
            onChange={(e) => setMinRevenue(e.target.value)}
            placeholder="e.g. 10000000000"
            className="border p-2 rounded"
          />
        </div>
        <div className="flex flex-col">
          <label className="mb-1 font-semibold">Max Revenue</label>
          <input
            type="number"
            value={maxRevenue}
            onChange={(e) => setMaxRevenue(e.target.value)}
            placeholder="e.g. 50000000000"
            className="border p-2 rounded"
          />
        </div>

        {/* Net Income Range Filters */}
        <div className="flex flex-col">
          <label className="mb-1 font-semibold">Min Net Income</label>
          <input
            type="number"
            value={minNetIncome}
            onChange={(e) => setMinNetIncome(e.target.value)}
            placeholder="e.g. 5000000000"
            className="border p-2 rounded"
          />
        </div>
        <div className="flex flex-col">
          <label className="mb-1 font-semibold">Max Net Income</label>
          <input
            type="number"
            value={maxNetIncome}
            onChange={(e) => setMaxNetIncome(e.target.value)}
            placeholder="e.g. 20000000000"
            className="border p-2 rounded"
          />
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-200 text-left">
              <th 
                onClick={() => handleSort("date")} 
                className="cursor-pointer p-2"
              >
                Date {sortKey === "date" && (sortOrder === "asc" ? "▲" : "▼")}
              </th>
              <th 
                onClick={() => handleSort("revenue")} 
                className="cursor-pointer p-2"
              >
                Revenue {sortKey === "revenue" && (sortOrder === "asc" ? "▲" : "▼")}
              </th>
              <th 
                onClick={() => handleSort("netIncome")} 
                className="cursor-pointer p-2"
              >
                Net Income {sortKey === "netIncome" && (sortOrder === "asc" ? "▲" : "▼")}
              </th>
              <th className="p-2">Gross Profit</th>
              <th className="p-2">EPS</th>
              <th className="p-2">Operating Income</th>
            </tr>
          </thead>
          <tbody>
            {sortedData.map((statement) => (
              <tr key={statement.date} className="border-b">
                <td className="p-2">{statement.date}</td>
                <td className="p-2">{statement.revenue.toLocaleString()}</td>
                <td className="p-2">{statement.netIncome.toLocaleString()}</td>
                <td className="p-2">{statement.grossProfit.toLocaleString()}</td>
                <td className="p-2">{statement.eps}</td>
                <td className="p-2">{statement.operatingIncome.toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
