import React, { useMemo, useState } from "react";
import useCamps from "../../../Hooks/useCamps";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import { FaRegCalendarAlt, FaChartLine, FaMoneyBillWave } from "react-icons/fa";

// MediCamps Colors
const COLORS = {
  primary: "#26a6eb",
  soft: "#55baef",
  navy: "#0A2540",
  green: "#26a6eb",
  pending: "#F59E0B", // amber
  failed: "#EF4444", // red
};

const RegisteredCampsAnalytics = () => {
  // ⬇️ Fetch your API data
  const [hookcamps, refetch] = useCamps();
  console.log(hookcamps);

  
  const [rangeMonths, setRangeMonths] = useState(6);

  const camps = hookcamps || [];

  /* ---------------------- METRICS ---------------------- */
  const metrics = useMemo(() => {
    const totalRegistered = camps.length;
    let totalPaid = 0;
    let totalPending = 0;
    let totalConfirmed = 0;

    camps.forEach((c) => {
      const pay = String(c.paymentStatus || "").toLowerCase();
      const conf = String(c.confirmationStatus || "").toLowerCase();

      if (pay === "paid" || pay === "success" || pay === "completed") {
        totalPaid++;
      } else {
        totalPending++;
      }

      if (conf === "confirmed") totalConfirmed++;
    });

    return { totalRegistered, totalPaid, totalPending, totalConfirmed };
  }, [camps]);

  /* ---------------------- MONTH HELPERS ---------------------- */
  const getRecentMonths = (n) => {
    const arr = [];
    const now = new Date();
    for (let i = n - 1; i >= 0; i--) {
      const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
      arr.push({
        key: `${d.getFullYear()}-${d.getMonth()}`,
        label: d.toLocaleString("en-US", { month: "short" }),
      });
    }
    return arr;
  };

  /* ---------------------- BAR CHART: Registrations by Month ---------------------- */
  const registrationsByMonth = useMemo(() => {
    const months = getRecentMonths(rangeMonths);
    const map = {};

    months.forEach((month) => {
      map[month.key] = { month: month.label, count: 0 };
    });

    camps.forEach((c) => {
      const rawDate = c.paidAt; // ⬅️ Your API field
      if (!rawDate) return;

      const d = new Date(rawDate);
      if (isNaN(d)) return;

      const key = `${d.getFullYear()}-${d.getMonth()}`;
      if (map[key]) map[key].count++;
    });

    return Object.values(map);
  }, [camps, rangeMonths]);

  /* ---------------------- LINE CHART: Cumulative Trend ---------------------- */
  const participationTrend = useMemo(() => {
    let cum = 0;
    return registrationsByMonth.map((entry) => {
      cum += entry.count;
      return { month: entry.month, cumulative: cum };
    });
  }, [registrationsByMonth]);

  /* ---------------------- PIE CHART: Payment Breakdown ---------------------- */
  const paymentBreakdown = useMemo(() => {
    let paid = 0,
      pending = 0,
      failed = 0;

    camps.forEach((c) => {
      const s = String(c.paymentStatus || "").toLowerCase();
      if (s === "paid" || s === "success" || s === "completed") paid++;
      else if (s === "failed" || s === "error") failed++;
      else pending++;
    });

    const arr = [
      { name: "Paid", value: paid, color: COLORS.green },
      { name: "Pending", value: pending, color: COLORS.pending },
      { name: "Failed", value: failed, color: COLORS.failed },
    ];

    return arr.filter((a) => a.value > 0);
  }, [camps]);

  const fmt = (n) => new Intl.NumberFormat().format(n || 0);

  return (
    <div className="px-4 sm:px-6 lg:px-0 py-0 space-y-6">
      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <h2 className="text-2xl md:text-3xl font-bold text-[#0A2540] text-center">
          Registered Camps <span className="text-[#26a6eb]">Analytics</span>
        </h2>

        <div className="flex items-center gap-3">
          <span className="text-xs text-gray-500">Show last</span>

          <select
            value={rangeMonths}
            onChange={(e) => setRangeMonths(Number(e.target.value))}
            className="px-3 py-2 border rounded-md bg-white text-sm"
          >
            <option value={3}>3 months</option>
            <option value={6}>6 months</option>
            <option value={12}>12 months</option>
          </select>
        </div>
      </div>

      {/* METRIC CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          title="Total Registered"
          value={fmt(metrics.totalRegistered)}
          icon={<FaRegCalendarAlt className="text-2xl text-white" />}
          accent={COLORS.primary}
        />

        <MetricCard
          title="Total Paid"
          value={fmt(metrics.totalPaid)}
          icon={<FaMoneyBillWave className="text-2xl text-white" />}
          accent={COLORS.green}
        />

        <MetricCard
          title="Pending Payments"
          value={fmt(metrics.totalPending)}
          icon={<FaMoneyBillWave className="text-2xl text-white" />}
          accent={COLORS.pending}
        />

        <MetricCard
          title="Confirmed"
          value={fmt(metrics.totalConfirmed)}
          icon={<FaChartLine className="text-2xl text-white" />}
          accent={COLORS.navy}
        />
      </div>

      {/* MAIN GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* BAR CHART */}
        <div className="lg:col-span-2 bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-md font-semibold text-[#0A2540]">
              Registrations by Month
            </h3>
            <span className="text-sm text-gray-500">
              Total: {fmt(metrics.totalRegistered)}
            </span>
          </div>

          <div style={{ width: "85%", height: 446 ,marginTop:40}}>
            <ResponsiveContainer>
              <BarChart data={registrationsByMonth}>
                <XAxis dataKey="month" stroke="#6b7280" />
                <YAxis stroke="#6b7280" />
                <Tooltip />
                <Bar dataKey="count" fill={COLORS.primary} radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* RIGHT COLUMN */}
        <div className="space-y-6">
          {/* PIE */}
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
            <h3 className="text-md font-semibold text-[#0A2540] mb-2">
              Payment Status
            </h3>

            <div style={{ width: "100%", height: 200 }}>
              <ResponsiveContainer>
                <PieChart>
                  <Pie data={paymentBreakdown} dataKey="value" innerRadius={40} outerRadius={70}>
                    {paymentBreakdown.map((entry, i) => (
                      <Cell key={i} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend verticalAlign="bottom" height={36} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* LINE CHART */}
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
            <h3 className="text-md font-semibold text-[#0A2540] mb-2">
              Participation Trend (Cumulative)
            </h3>

            <div style={{ width: "100%", height: 180 }}>
              <ResponsiveContainer>
                <LineChart data={participationTrend}>
                  <XAxis dataKey="month" stroke="#6b7280" />
                  <YAxis stroke="#6b7280" />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="cumulative"
                    stroke={COLORS.green}
                    strokeWidth={3}
                    dot={{ r: 3 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>

      <div className="text-sm text-gray-500">
        * Analytics based on registration date (paidAt field).
      </div>
    </div>
  );
};

/* ---------------------- Metric Card ---------------------- */
function MetricCard({ title, value, icon, accent }) {
  return (
    <div className="bg-white rounded-xl p-4 shadow-sm border-gray-100 flex items-center gap-4">
      <div
        style={{ background: accent, width: 56, height: 56 }}
        className="rounded-lg flex items-center justify-center shadow-md"
      >
        {icon}
      </div>

      <div>
        <div className="text-xs text-gray-500">{title}</div>
        <div className="text-2xl font-semibold text-[#0A2540]">{value}</div>
      </div>
    </div>
  );
}

export default RegisteredCampsAnalytics;
