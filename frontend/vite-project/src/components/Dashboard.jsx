
import React, { useEffect, useState } from "react";
import axios from "axios";
import FilePreviewModal from "../components/FilePreviewModal";

const API_BASE = import.meta.env.VITE_API_BASE_LOCAL || "http://localhost:5000";

export default function Dashboard() {
  const [data, setData] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [selectedComplaint, setSelectedComplaint] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  // ✅ Fetch all complaints
  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${API_BASE}/api/complaints`);
      const complaints = res.data.data || [];

      // 🆕 Sort unread complaints first
      complaints.sort((a, b) => Number(a.isRead) - Number(b.isRead));

      setData(complaints);
      setFiltered(complaints);
    } catch (err) {
      console.error("Error fetching complaints:", err);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Mark complaint as read
  const markAsRead = async (id) => {
    try {
      await axios.patch(`${API_BASE}/api/complaints/${id}/mark-read`);
      setData((prev) =>
        prev.map((c) => (c._id === id ? { ...c, isRead: true } : c))
      );
      setFiltered((prev) =>
        prev.map((c) => (c._id === id ? { ...c, isRead: true } : c))
      );
    } catch (err) {
      console.error("Error marking as read:", err);
    }
  };

  // ✅ Handle search
  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearch(query);
    if (!query) return setFiltered(data);

    setFiltered(
      data.filter(
        (c) =>
          c.complainant_name?.toLowerCase().includes(query) ||
          c.police_station?.toLowerCase().includes(query) ||
          c.gd_case_no?.toLowerCase().includes(query) ||
          c.present_address?.toLowerCase().includes(query)
      )
    );
  };

  // ✅ Export handlers
  const handleExportExcel = () => window.open(`${API_BASE}/api/export/excel`);
  const handleExportCSV = () => window.open(`${API_BASE}/api/export/csv`);

  return (
    <div className="min-h-screen bg-gray-50 p-3 sm:p-6 lg:p-10">
      <div className="max-w-7xl mx-auto bg-white rounded-xl shadow-lg p-4 sm:p-6 lg:p-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-3 sm:gap-6 mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-blue-700 text-center sm:text-left">
            Cyber Cell Complaint Dashboard
          </h1>
          <div className="flex flex-wrap justify-center sm:justify-end gap-2">
            <button
              onClick={handleExportExcel}
              className="bg-blue-600 hover:bg-blue-700 text-white px-3 sm:px-4 py-2 rounded-md text-sm sm:text-base transition"
            >
              Export Excel
            </button>
            <button
              onClick={handleExportCSV}
              className="bg-green-600 hover:bg-green-700 text-white px-3 sm:px-4 py-2 rounded-md text-sm sm:text-base transition"
            >
              Export CSV
            </button>
            <button
              onClick={fetchData}
              className="bg-gray-200 hover:bg-gray-300 px-3 sm:px-4 py-2 rounded-md text-sm sm:text-base transition"
            >
              Refresh
            </button>
          </div>
        </div>

        {/* Search */}
        <input
          type="text"
          placeholder="🔍 Search by name, station, GD No., or address"
          value={search}
          onChange={handleSearch}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 mb-5 focus:ring-2 focus:ring-blue-400 focus:border-blue-400 text-sm sm:text-base"
        />

        {/* Table */}
        {loading ? (
          <p className="text-gray-500 text-center">Loading complaints...</p>
        ) : filtered.length === 0 ? (
          <p className="text-gray-500 text-center">No complaints found.</p>
        ) : (
          <div className="overflow-x-auto rounded-xl border border-gray-200 shadow-sm">
            <table className="min-w-full bg-white text-sm text-gray-700">
              <thead className="bg-gradient-to-r from-blue-100 to-blue-50 text-gray-800 uppercase text-xs font-semibold tracking-wide">
                <tr>
                  <th className="px-4 py-3 text-center">#</th>
                  <th className="px-4 py-3 text-left">Complainant</th>
                  <th className="px-4 py-3 text-left">Station</th>
                  <th className="px-4 py-3 text-left">GD No.</th>
                  <th className="px-4 py-3 text-right">Amount (₹)</th>
                  <th className="px-4 py-3 text-left hidden md:table-cell">
                    Description
                  </th>
                  <th className="px-4 py-3 text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filtered.map((c, i) => (
                  <tr
                    key={c._id}
                    className={`transition-all duration-150 hover:bg-blue-50 cursor-pointer ${
                      !c.isRead ? "bg-yellow-50" : "bg-white"
                    }`}
                    onClick={() => {
                      setSelectedComplaint(c);
                      if (!c.isRead) markAsRead(c._id);
                    }}
                  >
                    <td className="px-4 py-3 text-center text-gray-600 font-medium">
                      {i + 1}
                    </td>

                    <td className="px-4 py-3 font-semibold flex items-center gap-2">
                      <span className="truncate max-w-[130px]">
                        {c.complainant_name || "—"}
                      </span>
                      {!c.isRead && (
                        <span className="text-[10px] bg-green-500/10 text-green-700 font-bold px-2 py-0.5 rounded-full">
                          NEW
                        </span>
                      )}
                    </td>

                    <td className="px-4 py-3">{c.police_station || "—"}</td>
                    <td className="px-4 py-3">{c.gd_case_no || "—"}</td>
                    <td className="px-4 py-3 text-right font-medium text-gray-800">
                      {c.total_amount || "—"}
                    </td>
                    <td className="px-4 py-3 truncate max-w-[200px] hidden md:table-cell text-gray-600">
                      {c.fraud_description || "—"}
                    </td>

                    <td className="px-4 py-3 text-center">
                      <button
                        className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedComplaint(c);
                          if (!c.isRead) markAsRead(c._id);
                        }}
                      >
                        View →
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Modal */}
      {selectedComplaint && (
        <FilePreviewModal
          complaint={selectedComplaint}
          apiBase={API_BASE}
          onClose={() => setSelectedComplaint(null)}
        />
      )}
    </div>
  );
}
