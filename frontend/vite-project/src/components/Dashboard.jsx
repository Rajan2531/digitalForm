

// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import FilePreviewModal from "../components/FilePreviewModal";

// const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:5000";

// export default function Dashboard() {
//   const [data, setData] = useState([]);
//   const [filtered, setFiltered] = useState([]);
//   const [search, setSearch] = useState("");
//   const [loading, setLoading] = useState(true);
//   const [selectedComplaint, setSelectedComplaint] = useState(null);

//   useEffect(() => {
//     fetchData();
//   }, []);

//   // Fetch complaints
//   const fetchData = async () => {
//     setLoading(true);
//     try {
//       const res = await axios.get(`${API_BASE}/api/complaints`);
//       const complaints = res.data.data || [];
//       complaints.sort((a, b) => Number(a.isRead) - Number(b.isRead));
//       setData(complaints);
//       setFiltered(complaints);
//     } catch (err) {
//       console.error("Error fetching complaints:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Mark complaint as read
//   const markAsRead = async (id) => {
//     try {
//       await axios.patch(`${API_BASE}/api/complaints/${id}/mark-read`);
//       setData((prev) => prev.map((c) => (c._id === id ? { ...c, isRead: true } : c)));
//       setFiltered((prev) => prev.map((c) => (c._id === id ? { ...c, isRead: true } : c)));
//     } catch (err) {
//       console.error("Error marking as read:", err);
//     }
//   };

//   // Update status
//   const updateStatus = async (id, status) => {
//     try {
//       await axios.patch(`${API_BASE}/api/complaints/${id}/status`, { status });
//       setData((prev) => prev.map((c) => (c._id === id ? { ...c, status } : c)));
//       setFiltered((prev) => prev.map((c) => (c._id === id ? { ...c, status } : c)));
//     } catch (err) {
//       console.error("Error updating status:", err);
//     }
//   };

//   // Handle search
//   const handleSearch = (e) => {
//     const query = e.target.value.toLowerCase();
//     setSearch(query);
//     if (!query) return setFiltered(data);
//     setFiltered(
//       data.filter(
//         (c) =>
//           c.complainant_name?.toLowerCase().includes(query) ||
//           c.police_station?.toLowerCase().includes(query) ||
//           c.gd_case_no?.toLowerCase().includes(query) ||
//           c.present_address?.toLowerCase().includes(query)
//       )
//     );
//   };

//   // Export
//   const handleExportExcel = () => window.open(`${API_BASE}/api/export/excel`);
//   const handleExportCSV = () => window.open(`${API_BASE}/api/export/csv`);

//   // Helper: time ago
//   const timeAgo = (dateString) => {
//     if (!dateString) return "—";
//     const diff = (Date.now() - new Date(dateString)) / (1000 * 60 * 60 * 24);
//     if (diff < 1) return "Today";
//     if (diff < 2) return "Yesterday";
//     return `${Math.floor(diff)} days ago`;
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white p-4 sm:p-8">
//       <div className="max-w-7xl mx-auto bg-white rounded-2xl shadow-lg p-5 sm:p-8 border border-blue-100">
//         {/* Header */}
//         <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-8">
//           <div className="text-center sm:text-left">
//             <h1 className="text-3xl font-bold text-blue-800 tracking-tight">
//               Cyber Cell Complaint Dashboard
//             </h1>
//             <p className="text-gray-500 text-sm mt-1">
//               Manage and monitor financial fraud complaints
//             </p>
//           </div>
//           <div className="flex flex-wrap justify-center sm:justify-end gap-3">
//             <button
//               onClick={handleExportExcel}
//               className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm shadow-sm transition"
//             >
//               Export Excel
//             </button>
//             <button
//               onClick={handleExportCSV}
//               className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md text-sm shadow-sm transition"
//             >
//               Export CSV
//             </button>
//             <button
//               onClick={fetchData}
//               className="bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded-md text-sm font-medium transition"
//             >
//               Refresh
//             </button>
//           </div>
//         </div>

//         {/* Summary Cards */}
//         <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6 text-center">
//           {[
//             { label: "Total", count: data.length, color: "bg-blue-50 text-blue-800" },
//             {
//               label: "Unread",
//               count: data.filter((c) => !c.isRead).length,
//               color: "bg-yellow-50 text-yellow-800",
//             },
//             {
//               label: "Under Review",
//               count: data.filter((c) => c.status === "Under Review").length,
//               color: "bg-orange-50 text-orange-800",
//             },
//             {
//               label: "Closed",
//               count: data.filter((c) => c.status === "Closed").length,
//               color: "bg-green-50 text-green-800",
//             },
//           ].map((s, i) => (
//             <div
//               key={i}
//               className={`rounded-lg shadow-sm p-4 border ${s.color} font-semibold`}
//             >
//               <p className="text-lg">{s.count}</p>
//               <p className="text-xs uppercase tracking-wide">{s.label}</p>
//             </div>
//           ))}
//         </div>

//         {/* Filters */}
//         <div className="flex flex-wrap gap-3 mb-4">
//           <select
//             className="border border-gray-300 rounded px-3 py-2 text-sm"
//             onChange={(e) => {
//               const val = e.target.value;
//               if (!val) return setFiltered(data);
//               setFiltered(data.filter((c) => c.status === val));
//             }}
//           >
//             <option value="">All Status</option>
//             <option>Pending</option>
//             <option>Under Review</option>
//             <option>Closed</option>
//           </select>

//           <select
//             className="border border-gray-300 rounded px-3 py-2 text-sm"
//             onChange={(e) => {
//               const val = e.target.value.toLowerCase();
//               if (!val) return setFiltered(data);
//               setFiltered(
//                 data.filter((c) =>
//                   c.police_station?.toLowerCase().includes(val)
//                 )
//               );
//             }}
//           >
//             <option value="">All Stations</option>
//             {Array.from(new Set(data.map((c) => c.police_station))).map(
//               (station, i) => (
//                 <option key={i} value={station}>
//                   {station}
//                 </option>
//               )
//             )}
//           </select>

//           <input
//             type="text"
//             placeholder="🔍 Search by name or GD No."
//             value={search}
//             onChange={handleSearch}
//             className="border border-gray-300 rounded px-3 py-2 text-sm flex-1"
//           />
//         </div>

//         {/* Table */}
//         {loading ? (
//           <div className="text-center py-16 text-gray-500 animate-pulse">
//             Fetching complaints...
//           </div>
//         ) : filtered.length === 0 ? (
//           <div className="text-center py-16 text-gray-400 italic">
//             No complaints found.
//           </div>
//         ) : (
//           <div className="overflow-x-auto rounded-xl border border-gray-200 shadow-sm">
//             <table className="min-w-full bg-white text-sm text-gray-700">
//               <thead className="bg-gradient-to-r from-blue-100 to-blue-50 text-gray-800 uppercase text-xs font-semibold tracking-wide">
//                 <tr>
//                   <th className="px-4 py-3 text-center">#</th>
//                   <th className="px-4 py-3 text-left">Complainant</th>
//                   <th className="px-4 py-3 text-left">Station</th>
//                   <th className="px-4 py-3 text-left">GD No.</th>
//                   <th className="px-4 py-3 text-right">Amount (₹)</th>
//                   <th className="px-4 py-3 text-left hidden md:table-cell">
//                     Description
//                   </th>
//                   <th className="px-4 py-3 text-center">Status</th>
//                   <th className="px-4 py-3 text-center">Filed</th>
//                   <th className="px-4 py-3 text-center">Action</th>
//                 </tr>
//               </thead>

//               <tbody className="divide-y divide-gray-100">
//                 {filtered.map((c, i) => (
//                   <tr
//                     key={c._id}
//                     className={`transition-all duration-150 hover:bg-blue-50 cursor-pointer ${
//                       !c.isRead ? "bg-yellow-50" : ""
//                     }`}
//                     onClick={() => {
//                       setSelectedComplaint(c);
//                       if (!c.isRead) markAsRead(c._id);
//                     }}
//                   >
//                     <td className="px-4 py-3 text-center text-gray-600 font-medium">
//                       {i + 1}
//                     </td>

//                     <td className="px-4 py-3 font-semibold flex items-center gap-2">
//                       <span className="truncate max-w-[140px]">
//                         {c.complainant_name || "—"}
//                       </span>
//                       {!c.isRead && (
//                         <span className="text-[10px] bg-green-600/10 text-green-700 font-bold px-2 py-0.5 rounded-full">
//                           NEW
//                         </span>
//                       )}
//                     </td>

//                     <td className="px-4 py-3">{c.police_station || "—"}</td>
//                     <td className="px-4 py-3 font-mono text-xs text-gray-600">
//                       {c.ref_no || c.gd_case_no || "—"}
//                     </td>
//                     <td
//                       className={`px-4 py-3 text-right font-medium ${
//                         c.total_amount > 100000
//                           ? "text-red-600 font-bold"
//                           : "text-gray-800"
//                       }`}
//                     >
//                       ₹{c.total_amount || "—"}
//                     </td>
//                     <td className="px-4 py-3 truncate max-w-[200px] hidden md:table-cell text-gray-600">
//                       {c.fraud_description || "—"}
//                     </td>
//                     <td className="px-4 py-3 text-center">
//                       <select
//                         value={c.status || "Pending"}
//                         onChange={(e) => updateStatus(c._id, e.target.value)}
//                         className="border rounded px-2 py-1 text-xs bg-gray-50"
//                         onClick={(e) => e.stopPropagation()}
//                       >
//                         <option>Pending</option>
//                         <option>Under Review</option>
//                         <option>Closed</option>
//                       </select>
//                     </td>
//                     <td className="px-4 py-3 text-center text-gray-500 text-xs">
//                       {timeAgo(c.createdAt)}
//                     </td>

//                     <td className="px-4 py-3 text-center">
//                       <button
//                         className="text-blue-600 hover:text-blue-800 text-sm font-medium"
//                         onClick={(e) => {
//                           e.stopPropagation();
//                           setSelectedComplaint(c);
//                           if (!c.isRead) markAsRead(c._id);
//                         }}
//                       >
//                         View →
//                       </button>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         )}
//       </div>

//       {/* Modal */}
//       {selectedComplaint && (
//         <FilePreviewModal
//           complaint={selectedComplaint}
//           apiBase={API_BASE}
//           onClose={() => setSelectedComplaint(null)}
//         />
//       )}
//     </div>
//   );
// }


// this is the updated UI (card wise i liked it)
// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import FilePreviewModal from "../components/FilePreviewModal";

// const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:5000";

// export default function Dashboard() {
//   const [data, setData] = useState([]);
//   const [filtered, setFiltered] = useState([]);
//   const [search, setSearch] = useState("");
//   const [statusFilter, setStatusFilter] = useState("");
//   const [selectedComplaint, setSelectedComplaint] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     load();
//   }, []);

//   const load = async () => {
//     setLoading(true);
//     try {
//       const res = await axios.get(`${API_BASE}/api/complaints`);
//       const sorted = res.data.data.sort((a, b) => Number(a.isRead) - Number(b.isRead));
//       setData(sorted);
//       setFiltered(sorted);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const markAsRead = async (id) => {
//     try {
//       await axios.patch(`${API_BASE}/api/complaints/${id}/mark-read`);
//       updateLocal(id, { isRead: true });
//     } catch {}
//   };

//   const updateStatus = async (id, status) => {
//     await axios.patch(`${API_BASE}/api/complaints/${id}/status`, { status });
//     updateLocal(id, { status });
//   };

//   const updateLocal = (id, fields) => {
//     setData((prev) => prev.map((c) => (c._id === id ? { ...c, ...fields } : c)));
//     setFiltered((prev) => prev.map((c) => (c._id === id ? { ...c, ...fields } : c)));
//   };

//   const handleSearch = (e) => {
//     const q = e.target.value.toLowerCase();
//     setSearch(q);
//     filter(q, statusFilter);
//   };

//   const handleStatusFilter = (value) => {
//     setStatusFilter(value);
//     filter(search, value);
//   };

//   const filter = (q, status) => {
//     let result = [...data];

//     if (q)
//       result = result.filter(
//         (c) =>
//           c.complainant_name?.toLowerCase().includes(q) ||
//           c.complaint_id?.toLowerCase().includes(q) ||
//           c.fraudster_phone?.toLowerCase().includes(q) ||
//           c.police_station?.toLowerCase().includes(q)
//       );

//     if (status) result = result.filter((c) => c.status === status);

//     setFiltered(result);
//   };

//   return (
//     <div className="min-h-screen bg-[#f4f7fb] p-6">
//       {/* HEADER */}
//       <div className="max-w-7xl mx-auto">
//         <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
//           <div>
//             <h1 className="text-3xl font-bold text-gray-800">
//               Cyber Cell – Fraud Case Dashboard
//             </h1>
//             <p className="text-gray-500 mt-1">
//               Track, review, and manage digital fraud complaints.
//             </p>
//           </div>

//           <div className="flex gap-3 mt-4 sm:mt-0">
//             <button
//               onClick={load}
//               className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 shadow"
//             >
//               Refresh
//             </button>
//           </div>
//         </div>

//         {/* FILTERS */}
//         <div className="flex flex-col sm:flex-row gap-4 mb-6">
//           <input
//             value={search}
//             onChange={handleSearch}
//             placeholder="Search by name / phone / complaint ID / station..."
//             className="flex-1 px-4 py-2 rounded-lg border shadow-sm bg-white"
//           />

//           <select
//             className="px-3 py-2 rounded-lg border bg-white shadow-sm"
//             value={statusFilter}
//             onChange={(e) => handleStatusFilter(e.target.value)}
//           >
//             <option value="">All Status</option>
//             <option value="Pending">Pending</option>
//             <option value="Under Review">Under Review</option>
//             <option value="Closed">Closed</option>
//           </select>
//         </div>

//         {/* GRID VIEW */}
//         <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
//           {loading ? (
//             <div className="text-gray-400 text-lg animate-pulse col-span-full text-center">
//               Loading complaints…
//             </div>
//           ) : filtered.length === 0 ? (
//             <div className="text-gray-400 italic col-span-full text-center">
//               No complaints match the criteria.
//             </div>
//           ) : (
//             filtered.map((c) => (
//               <div
//                 key={c._id}
//                 onClick={() => {
//                   setSelectedComplaint(c);
//                   if (!c.isRead) markAsRead(c._id);
//                 }}
//                 className={`p-5 rounded-2xl shadow-md bg-white border cursor-pointer transition hover:scale-[1.02]
//                 ${!c.isRead ? "border-yellow-400 bg-yellow-50" : "border-gray-200"}
//               `}
//               >
//                 {/* Header Row */}
//                 <div className="flex justify-between items-center mb-3">
//                   <p className="font-bold text-gray-800 text-lg">
//                     {c.complaint_id}
//                   </p>

//                   {!c.isRead && (
//                     <span className="text-xs px-2 py-1 bg-yellow-300 text-gray-900 rounded-full font-semibold">
//                       NEW
//                     </span>
//                   )}
//                 </div>

//                 {/* Name */}
//                 <p className="text-gray-700 font-semibold text-md">
//                   👤 {c.complainant_name}
//                 </p>

//                 {/* Fraudster */}
//                 <p className="text-gray-600 mt-1">
//                   📱 Fraudster:{" "}
//                   <span className="font-medium text-blue-700">
//                     {c.fraudster_phone || "—"}
//                   </span>
//                 </p>

//                 {/* Station */}
//                 <p className="text-gray-600">🚓 {c.police_station || "—"}</p>

//                 {/* Amount */}
//                 <p className="text-gray-900 mt-2 font-bold">
//                   ₹{c.total_amount?.toLocaleString() || 0}

//                   {c.total_amount > 100000 && (
//                     <span className="ml-2 px-2 py-1 bg-red-100 text-red-700 rounded-full text-xs">
//                       HIGH PRIORITY
//                     </span>
//                   )}
//                 </p>

//                 {/* Status Badge */}
//                 <div className="mt-3">
//                   <span
//                     className={`px-3 py-1 rounded-lg text-xs font-bold
//                     ${
//                       c.status === "Closed"
//                         ? "bg-green-100 text-green-700"
//                         : c.status === "Under Review"
//                         ? "bg-orange-100 text-orange-700"
//                         : "bg-gray-200 text-gray-700"
//                     }
//                   `}
//                   >
//                     {c.status || "Pending"}
//                   </span>
//                 </div>

//                 {/* View Button */}
//                 <button className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition">
//                   View Details →
//                 </button>
//               </div>
//             ))
//           )}
//         </div>
//       </div>

//       {/* MODAL */}
//       {selectedComplaint && (
//         <FilePreviewModal
//           complaint={selectedComplaint}
//           apiBase={API_BASE}
//           onClose={() => setSelectedComplaint(null)}
//         />
//       )}
//     </div>
//   );
// }


// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import FilePreviewModal from "../components/FilePreviewModal";

// const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:5000";

// export default function Dashboard() {
//   const [data, setData] = useState([]);
//   const [filtered, setFiltered] = useState([]);
//   const [search, setSearch] = useState("");
//   const [statusFilter, setStatusFilter] = useState("");
//   const [selectedComplaint, setSelectedComplaint] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     load();
//   }, []);

//   const load = async () => {
//     setLoading(true);
//     try {
//       const res = await axios.get(`${API_BASE}/api/complaints`);
//       const sorted = res.data.data.sort((a, b) => Number(a.isRead) - Number(b.isRead));
//       setData(sorted);
//       setFiltered(sorted);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const markAsRead = async (id) => {
//     try {
//       await axios.patch(`${API_BASE}/api/complaints/${id}/mark-read`);
//       updateLocal(id, { isRead: true });
//     } catch {}
//   };

//   const updateLocal = (id, fields) => {
//     setData((prev) => prev.map((c) => (c._id === id ? { ...c, ...fields } : c)));
//     setFiltered((prev) => prev.map((c) => (c._id === id ? { ...c, ...fields } : c)));
//   };

//   const handleSearch = (e) => {
//     const q = e.target.value.toLowerCase();
//     setSearch(q);
//     filter(q, statusFilter);
//   };

//   const handleStatusFilter = (value) => {
//     setStatusFilter(value);
//     filter(search, value);
//   };

//   const filter = (q, status) => {
//     let result = [...data];

//     if (q)
//       result = result.filter(
//         (c) =>
//           c.complainant_name?.toLowerCase().includes(q) ||
//           c.complaint_id?.toLowerCase().includes(q) ||
//           c.fraudster_phone?.toLowerCase().includes(q) ||
//           c.police_station?.toLowerCase().includes(q)
//       );

//     if (status) result = result.filter((c) => c.status === status);

//     setFiltered(result);
//   };

//   return (
//     <div className="min-h-screen bg-[#fafbfc]">
//       {/* TOP NAV */}
//       <div className="w-full bg-white/80 backdrop-blur-xl shadow-sm border-b border-gray-200 sticky top-0 z-40">
//         <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
//           <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
//             Cyber Cell Dashboard
//           </h1>

//           <button
//             onClick={load}
//             className="px-5 py-2 bg-gray-900 text-white rounded-xl text-sm shadow hover:bg-black transition"
//           >
//             Refresh
//           </button>
//         </div>
//       </div>

//       {/* MAIN */}
//       <div className="max-w-7xl mx-auto p-6 mt-4">

//         {/* METRICS ROW */}
//         <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
//           {[
//             { label: "Total", count: data.length, color: "bg-gradient-to-br from-gray-50 to-gray-100" },
//             { label: "Unread", count: data.filter((c) => !c.isRead).length, color: "bg-gradient-to-br from-yellow-50 to-yellow-100" },
//             { label: "Under Review", count: data.filter((c) => c.status === "Under Review").length, color: "bg-gradient-to-br from-blue-50 to-blue-100" },
//             { label: "Closed", count: data.filter((c) => c.status === "Closed").length, color: "bg-gradient-to-br from-green-50 to-green-100" }
//           ].map((m, i) => (
//             <div
//               key={i}
//               className={`${m.color} p-5 rounded-2xl shadow-sm border border-gray-200`}
//             >
//               <p className="text-3xl font-bold text-gray-900">{m.count}</p>
//               <p className="text-sm text-gray-600 mt-1">{m.label}</p>
//             </div>
//           ))}
//         </div>

//         {/* FILTER BAR */}
//         <div className="bg-white shadow-sm rounded-2xl p-5 border border-gray-200 mb-8">
//           <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
//             <input
//               value={search}
//               onChange={handleSearch}
//               placeholder="Search by name, phone, ID..."
//               className="px-4 py-3 rounded-xl border border-gray-300 text-sm bg-gray-50 focus:bg-white shadow-sm outline-none focus:ring-2 focus:ring-blue-500"
//             />

//             <select
//               className="px-4 py-3 rounded-xl border border-gray-300 text-sm bg-gray-50 shadow-sm focus:ring-2 focus:ring-blue-500 outline-none"
//               value={statusFilter}
//               onChange={(e) => handleStatusFilter(e.target.value)}
//             >
//               <option value="">All Status</option>
//               <option value="Pending">Pending</option>
//               <option value="Under Review">Under Review</option>
//               <option value="Closed">Closed</option>
//             </select>
//           </div>
//         </div>

//         {/* LIST */}
//         <div className="grid gap-6 lg:grid-cols-2 xl:grid-cols-3">
//           {loading ? (
//             <p className="col-span-full text-center text-gray-400 animate-pulse">
//               Loading...
//             </p>
//           ) : (
//             filtered.map((c) => (
//               <div
//                 key={c._id}
//                 onClick={() => {
//                   setSelectedComplaint(c);
//                   if (!c.isRead) markAsRead(c._id);
//                 }}
//                 className="bg-white rounded-2xl p-6 shadow-md border border-gray-100 hover:shadow-lg hover:scale-[1.01] transition cursor-pointer"
//               >
//                 <div className="flex justify-between items-center">
//                   <p className="font-bold text-gray-900 text-lg">{c.complaint_id}</p>

//                   {!c.isRead && (
//                     <span className="px-2 py-1 text-xs bg-yellow-400 text-black rounded-lg font-semibold shadow">
//                       NEW
//                     </span>
//                   )}
//                 </div>

//                 <div className="mt-3 space-y-1">
//                   <p className="text-gray-800 font-semibold text-md">
//                     👤 {c.complainant_name}
//                   </p>
//                   <p className="text-gray-600 text-sm">
//                     📱 Fraudster: <span className="text-blue-700">{c.fraudster_phone || "—"}</span>
//                   </p>
//                   <p className="text-gray-600 text-sm">🚓 {c.police_station}</p>
//                 </div>

//                 <p className="mt-3 text-xl font-bold text-gray-900">
//                   ₹{c.total_amount?.toLocaleString()}
//                 </p>

//                 <span
//                   className={`inline-block mt-3 px-3 py-1 text-xs rounded-lg font-semibold
//                   ${
//                     c.status === "Closed"
//                       ? "bg-green-100 text-green-700"
//                       : c.status === "Under Review"
//                       ? "bg-blue-100 text-blue-700"
//                       : "bg-gray-200 text-gray-700"
//                   }`}
//                 >
//                   {c.status}
//                 </span>

//                 <button className="mt-4 w-full bg-gray-900 text-white py-2 rounded-xl hover:bg-black transition text-sm shadow">
//                   View Details →
//                 </button>
//               </div>
//             ))
//           )}
//         </div>
//       </div>

//       {selectedComplaint && (
//         <FilePreviewModal
//           complaint={selectedComplaint}
//           apiBase={API_BASE}
//           onClose={() => setSelectedComplaint(null)}
//         />
//       )}
//     </div>
//   );
// }


// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import FilePreviewModal from "../components/FilePreviewModal";

// const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:5000";

// export default function Dashboard() {
//   const [data, setData] = useState([]);
//   const [filtered, setFiltered] = useState([]);
//   const [search, setSearch] = useState("");
//   const [statusFilter, setStatusFilter] = useState("");
//   const [selectedComplaint, setSelectedComplaint] = useState(null);
//   const [loading, setLoading] = useState(true);

//   // --------------------------
//   // Load Data (Fixed useEffect)
//   // --------------------------
//   useEffect(() => {
//     async function loadData() {
//       try {
//         setLoading(true);
//         const res = await axios.get(`${API_BASE}/api/complaints`);
//         const sorted = (res.data.data || []).sort(
//           (a, b) => Number(a.isRead) - Number(b.isRead)
//         );
//         setData(sorted);
//         setFiltered(sorted);
//       } catch (err) {
//         console.error("Dashboard load error:", err);
//       } finally {
//         setLoading(false);
//       }
//     }
//     loadData();
//   }, []);

//   // Mark as Read
//   const markAsRead = async (id) => {
//     try {
//       await axios.patch(`${API_BASE}/api/complaints/${id}/mark-read`);
//       updateLocal(id, { isRead: true });
//     } catch {}
//   };

//   // Update local copy
//   const updateLocal = (id, fields) => {
//     setData((prev) =>
//       prev.map((c) => (c._id === id ? { ...c, ...fields } : c))
//     );
//     setFiltered((prev) =>
//       prev.map((c) => (c._id === id ? { ...c, ...fields } : c))
//     );
//   };

//   // Search Filter
//   const handleSearch = (e) => {
//     const q = e.target.value.toLowerCase();
//     setSearch(q);

//     filter(q, statusFilter);
//   };

//   // Status Filter
//   const handleStatusFilter = (value) => {
//     setStatusFilter(value);
//     filter(search, value);
//   };

//   // Core Filter Logic
//   const filter = (q, status) => {
//     let result = [...data];

//     if (q)
//       result = result.filter(
//         (c) =>
//           c.complainant_name?.toLowerCase().includes(q) ||
//           c.complaint_id?.toLowerCase().includes(q) ||
//           c.fraudster_phone?.toLowerCase().includes(q) ||
//           c.police_station?.toLowerCase().includes(q)
//       );

//     if (status) result = result.filter((c) => c.status === status);

//     setFiltered(result);
//   };

//   return (
//     <div className="min-h-screen bg-[#f5f7fa] px-6 py-6">
//       <div className="max-w-7xl mx-auto">
        
//         {/* ------------------------- HEADER ------------------------------ */}
//         <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-10">
//           <div>
//             <h1 className="text-4xl font-bold text-gray-900 tracking-tight">
//               Cyber Cell Dashboard
//             </h1>
//             <p className="text-gray-500 mt-1 text-sm">
//               Monitor, review & manage financial fraud complaints.
//             </p>
//           </div>

//           <button
//             onClick={() => window.location.reload()}
//             className="mt-4 sm:mt-0 bg-gray-900 text-white px-5 py-2 rounded-lg shadow hover:bg-black transition"
//           >
//             Refresh
//           </button>
//         </div>

//         {/* ------------------------- FILTER BAR -------------------------- */}
//         <div className="bg-white p-4 rounded-xl shadow-sm border flex flex-col sm:flex-row gap-4 mb-8">
//           <input
//             value={search}
//             onChange={handleSearch}
//             placeholder="Search name / phone / complaint ID / station..."
//             className="flex-1 px-4 py-2 rounded-lg border bg-gray-50 focus:ring-2 focus:ring-blue-500"
//           />

//           <select
//             className="px-4 py-2 rounded-lg border bg-gray-50 focus:ring-2 focus:ring-blue-500"
//             value={statusFilter}
//             onChange={(e) => handleStatusFilter(e.target.value)}
//           >
//             <option value="">All Status</option>
//             <option value="Pending">Pending</option>
//             <option value="Under Review">Under Review</option>
//             <option value="Closed">Closed</option>
//           </select>
//         </div>

//         {/* ------------------------ GRID VIEW -------------------------- */}
//         {loading ? (
//           <div className="text-center py-20 text-gray-500 text-lg animate-pulse">
//             Loading complaints…
//           </div>
//         ) : (
//           <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
//             {filtered.length === 0 ? (
//               <div className="col-span-full text-gray-500 text-center italic">
//                 No complaints found
//               </div>
//             ) : (
//               filtered.map((c) => (
//                 <div
//                   key={c._id}
//                   onClick={() => {
//                     setSelectedComplaint(c);
//                     if (!c.isRead) markAsRead(c._id);
//                   }}
//                   className={`p-6 rounded-2xl bg-white border shadow hover:shadow-lg cursor-pointer transition 
//                     ${
//                       !c.isRead
//                         ? "border-blue-400 shadow-md bg-blue-50"
//                         : "border-gray-200"
//                     }`}
//                 >
//                   {/* Complaint ID */}
//                   <div className="flex justify-between items-center mb-2">
//                     <h3 className="text-xl font-semibold text-gray-900">
//                       {c.complaint_id}
//                     </h3>

//                     {!c.isRead && (
//                       <span className="text-xs bg-blue-600 text-white px-2 py-1 rounded-full">
//                         NEW
//                       </span>
//                     )}
//                   </div>

//                   {/* Complainant */}
//                   <p className="text-gray-800 font-medium text-lg leading-tight">
//                     👤 {c.complainant_name}
//                   </p>

//                   {/* Fraudster */}
//                   <p className="text-gray-600 mt-1">
//                     📱 Fraudster:{" "}
//                     <span className="font-semibold text-blue-700">
//                       {c.fraudster_phone || "—"}
//                     </span>
//                   </p>

//                   {/* Police Station */}
//                   <p className="text-gray-600">🚓 {c.police_station}</p>

//                   {/* Amount */}
//                   <p className="text-gray-900 font-bold text-lg mt-2">
//                     ₹{c.total_amount?.toLocaleString()}
//                   </p>

//                   {/* Status Badge */}
//                   <span
//                     className={`inline-block mt-3 px-3 py-1 text-xs rounded-lg font-semibold ${
//                       c.status === "Closed"
//                         ? "bg-green-100 text-green-700"
//                         : c.status === "Under Review"
//                         ? "bg-orange-100 text-orange-700"
//                         : "bg-gray-200 text-gray-700"
//                     }`}
//                   >
//                     {c.status || "Pending"}
//                   </span>

//                   <button className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-xl transition">
//                     View Details →
//                   </button>
//                 </div>
//               ))
//             )}
//           </div>
//         )}

//         {/* ---------------------- MODAL ------------------------- */}
//         {selectedComplaint && (
//           <FilePreviewModal
//             complaint={selectedComplaint}
//             apiBase={API_BASE}
//             onClose={() => setSelectedComplaint(null)}
//           />
//         )}
//       </div>
//     </div>
//   );
// }


// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import FilePreviewModal from "../components/FilePreviewModal";
// import {
//   BarChart, Bar,
//   LineChart, Line,
//   XAxis, YAxis, Tooltip, CartesianGrid,
//   ResponsiveContainer
// } from "recharts";

// const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:5000";

// export default function Dashboard() {
//   const [data, setData] = useState([]);
//   const [filtered, setFiltered] = useState([]);
//   const [search, setSearch] = useState("");
//   const [statusFilter, setStatusFilter] = useState("");
//   const [selectedComplaint, setSelectedComplaint] = useState(null);
//   const [loading, setLoading] = useState(true);

//   // ---------- FETCH COMPLAINTS ----------
//   useEffect(() => {
//     const fetchData = async () => {
//       setLoading(true);
//       try {
//         const res = await axios.get(`${API_BASE}/api/complaints`);
//         const sorted = res.data.data.sort((a, b) => Number(a.isRead) - Number(b.isRead));

//         setData(sorted);
//         setFiltered(sorted);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchData();
//   }, []);

//   // ---------- MARK AS READ ----------
//   const markAsRead = async (id) => {
//     try {
//       await axios.patch(`${API_BASE}/api/complaints/${id}/mark-read`);
//       updateLocal(id, { isRead: true });
//     } catch {}
//   };

//   // ---------- UPDATE STATUS ----------
//   const updateStatus = async (id, status) => {
//     await axios.patch(`${API_BASE}/api/complaints/${id}/status`, { status });
//     updateLocal(id, { status });
//   };

//   const updateLocal = (id, fields) => {
//     setData(prev => prev.map(c => c._id === id ? { ...c, ...fields } : c));
//     setFiltered(prev => prev.map(c => c._id === id ? { ...c, ...fields } : c));
//   };

//   // ---------- SEARCH ----------
//   const handleSearch = (e) => {
//     const q = e.target.value.toLowerCase();
//     setSearch(q);
//     filter(q, statusFilter);
//   };

//   const handleStatusFilter = (val) => {
//     setStatusFilter(val);
//     filter(search, val);
//   };

//   const filter = (q, status) => {
//     let result = [...data];

//     if (q)
//       result = result.filter(
//         (c) =>
//           c.complainant_name?.toLowerCase().includes(q) ||
//           c.fraudster_phone?.toLowerCase().includes(q) ||
//           c.police_station?.toLowerCase().includes(q) ||
//           c.complaint_id?.toLowerCase().includes(q)
//       );

//     if (status) result = result.filter((c) => c.status === status);

//     setFiltered(result);
//   };

//   // -------------------------------------
//   //           ANALYTICS LOGIC
//   // -------------------------------------
//   const total = data.length;
//   const unread = data.filter((c) => !c.isRead).length;
//   const highValue = data.filter((c) => c.total_amount > 100000).length;

//   const stationStats = Object.values(
//     data.reduce((acc, c) => {
//       if (!c.police_station) return acc;
//       if (!acc[c.police_station]) acc[c.police_station] = { station: c.police_station, count: 0 };
//       acc[c.police_station].count += 1;
//       return acc;
//     }, {})
//   );

//   const weeklyTrend = data
//     .slice()
//     .reverse()
//     .slice(0, 7)
//     .map((c, i) => ({
//       day: `Day ${i + 1}`,
//       amount: c.total_amount || 0
//     }));

//   return (
//     <div className="min-h-screen bg-[#f5f7fa] p-6">
//       <div className="max-w-7xl mx-auto">

//         {/* ------------------------------ */}
//         {/*        DASHBOARD HEADER        */}
//         {/* ------------------------------ */}
//         <div className="flex flex-col sm:flex-row justify-between items-start mb-8">
//           <div>
//             <h1 className="text-3xl font-bold text-gray-900">
//               Cyber Cell Dashboard
//             </h1>
//             <p className="text-gray-500 mt-1">Modern Monitoring Panel</p>
//           </div>

//           <button
//             onClick={() => window.location.reload()}
//             className="px-4 py-2 bg-gray-900 text-white rounded-lg shadow hover:bg-black transition"
//           >
//             Refresh
//           </button>
//         </div>

//         {/* ------------------------------ */}
//         {/*       ANALYTICS OVERVIEW       */}
//         {/* ------------------------------ */}
//         <div className="grid sm:grid-cols-3 gap-6 mb-10">

//           <div className="bg-white shadow-sm rounded-2xl p-6 border border-gray-100">
//             <p className="text-gray-500">Total Complaints</p>
//             <p className="text-3xl font-bold text-gray-900">{total}</p>
//           </div>

//           <div className="bg-white shadow-sm rounded-2xl p-6 border border-gray-100">
//             <p className="text-gray-500">Unread</p>
//             <p className="text-3xl font-bold text-yellow-600">{unread}</p>
//           </div>

//           <div className="bg-white shadow-sm rounded-2xl p-6 border border-gray-100">
//             <p className="text-gray-500">High Value Fraud</p>
//             <p className="text-3xl font-bold text-red-600">{highValue}</p>
//           </div>

//         </div>

//         {/* ------------------------------ */}
//         {/*            CHARTS              */}
//         {/* ------------------------------ */}
//         <div className="grid lg:grid-cols-2 gap-8 mb-12">

//           {/* Station Stats */}
//           <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
//             <p className="font-semibold mb-4 text-gray-800">Complaints by Station</p>

//             <div className="w-full h-64">
//               <ResponsiveContainer width="100%" height="100%">
//                 <BarChart data={stationStats}>
//                   <CartesianGrid strokeDasharray="3 3" />
//                   <XAxis dataKey="station" />
//                   <YAxis />
//                   <Tooltip />
//                   <Bar dataKey="count" fill="#4f46e5" radius={[6, 6, 0, 0]} />
//                 </BarChart>
//               </ResponsiveContainer>
//             </div>
//           </div>

//           {/* Amount Trend */}
//           <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
//             <p className="font-semibold mb-4 text-gray-800">Last 7 Complaints — Amount Trend</p>

//             <div className="w-full h-64">
//               <ResponsiveContainer width="100%" height="100%">
//                 <LineChart data={weeklyTrend}>
//                   <CartesianGrid strokeDasharray="3 3" />
//                   <XAxis dataKey="day" />
//                   <YAxis />
//                   <Tooltip />
//                   <Line type="monotone" dataKey="amount" stroke="#2563eb" strokeWidth={3} />
//                 </LineChart>
//               </ResponsiveContainer>
//             </div>
//           </div>

//         </div>

//         {/* ------------------------------ */}
//         {/*             FILTERS            */}
//         {/* ------------------------------ */}
//         <div className="flex flex-col sm:flex-row gap-4 mb-6">
//           <input
//             value={search}
//             onChange={handleSearch}
//             placeholder="Search by name / id / station / phone..."
//             className="flex-1 px-4 py-2 rounded-xl border shadow-sm bg-white"
//           />

//           <select
//             className="px-3 py-2 rounded-xl border bg-white shadow-sm"
//             value={statusFilter}
//             onChange={(e) => handleStatusFilter(e.target.value)}
//           >
//             <option value="">All Status</option>
//             <option value="Pending">Pending</option>
//             <option value="Under Review">Under Review</option>
//             <option value="Closed">Closed</option>
//           </select>
//         </div>

//         {/* ------------------------------ */}
//         {/*          COMPLAINT CARDS       */}
//         {/* ------------------------------ */}
//         <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
//           {loading ? (
//             <div className="text-gray-400 text-lg animate-pulse col-span-full text-center">
//               Loading complaints…
//             </div>
//           ) : filtered.length === 0 ? (
//             <div className="text-gray-400 italic col-span-full text-center">
//               No complaints match the criteria.
//             </div>
//           ) : (
//             filtered.map((c) => (
//               <div
//                 key={c._id}
//                 onClick={() => {
//                   setSelectedComplaint(c);
//                   if (!c.isRead) markAsRead(c._id);
//                 }}
//                 className={`p-5 rounded-2xl shadow-md bg-white border cursor-pointer transition hover:scale-[1.02]
//                   ${!c.isRead ? "border-yellow-400 bg-yellow-50" : "border-gray-200"}
//                 `}
//               >
//                 {/* Header */}
//                 <div className="flex justify-between items-center mb-3">
//                   <p className="font-bold text-gray-800 text-lg">{c.complaint_id}</p>
//                   {!c.isRead && (
//                     <span className="text-xs px-2 py-1 bg-yellow-300 text-gray-900 rounded-full font-semibold">
//                       NEW
//                     </span>
//                   )}
//                 </div>

//                 <p className="text-gray-700 font-semibold text-md">👤 {c.complainant_name}</p>

//                 <p className="text-gray-600 mt-1">
//                   📱 Fraudster: <span className="font-medium text-blue-700">
//                     {c.fraudster_phone || "—"}
//                   </span>
//                 </p>

//                 <p className="text-gray-600">🚓 {c.police_station}</p>

//                 <p className="text-gray-900 mt-2 font-bold">
//                   ₹{c.total_amount?.toLocaleString() || 0}
//                 </p>

//                 <div className="mt-3">
//                   <span
//                     className={`px-3 py-1 rounded-lg text-xs font-bold
//                       ${c.status === "Closed"
//                         ? "bg-green-100 text-green-700"
//                         : c.status === "Under Review"
//                         ? "bg-orange-100 text-orange-700"
//                         : "bg-gray-200 text-gray-700"}
//                     `}
//                   >
//                     {c.status || "Pending"}
//                   </span>
//                 </div>

//                 <button className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition">
//                   View Details →
//                 </button>
//               </div>
//             ))
//           )}
//         </div>
//       </div>

//       {/* MODAL */}
//       {selectedComplaint && (
//         <FilePreviewModal
//           complaint={selectedComplaint}
//           apiBase={API_BASE}
//           onClose={() => setSelectedComplaint(null)}
//         />
//       )}
//     </div>
//   );
// }



// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import FilePreviewModal from "../components/FilePreviewModal";

// import {
//   BarChart,
//   Bar,
//   LineChart,
//   Line,
//   XAxis,
//   YAxis,
//   Tooltip,
//   CartesianGrid,
//   ResponsiveContainer,
// } from "recharts";

// const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:5000";

// export default function Dashboard() {
//   const [data, setData] = useState([]);
//   const [filtered, setFiltered] = useState([]);

//   const [search, setSearch] = useState("");
//   const [statusFilter, setStatusFilter] = useState("");
//   const [stationFilter, setStationFilter] = useState("");

//   const [dateFrom, setDateFrom] = useState("");
//   const [dateTo, setDateTo] = useState("");
//   const [dateExact, setDateExact] = useState("");

//   const [selectedComplaint, setSelectedComplaint] = useState(null);
//   const [loading, setLoading] = useState(true);

//   // -------------------------------------------------
//   // FETCH COMPLAINTS
//   // -------------------------------------------------
//   useEffect(() => {
//     const fetchData = async () => {
//       setLoading(true);
//       try {
//         const res = await axios.get(`${API_BASE}/api/complaints`);

//         const sorted = res.data.data.sort(
//           (a, b) => Number(a.isRead) - Number(b.isRead)
//         );

//         setData(sorted);
//         setFiltered(sorted);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   // -------------------------------------------------
//   // MARK AS READ
//   // -------------------------------------------------
//   const markAsRead = async (id) => {
//     await axios.patch(`${API_BASE}/api/complaints/${id}/mark-read`);
//     updateLocal(id, { isRead: true });
//   };

//   const updateStatus = async (id, status) => {
//     await axios.patch(`${API_BASE}/api/complaints/${id}/status`, { status });
//     updateLocal(id, { status });
//   };

//   const updateLocal = (id, fields) => {
//     setData((prev) =>
//       prev.map((c) => (c._id === id ? { ...c, ...fields } : c))
//     );
//     setFiltered((prev) =>
//       prev.map((c) => (c._id === id ? { ...c, ...fields } : c))
//     );
//   };

//   // -------------------------------------------------
//   // SEARCH + FILTERS
//   // -------------------------------------------------
//   const handleSearch = (e) => {
//     const q = e.target.value.toLowerCase();
//     setSearch(q);
//     filter(q, statusFilter, stationFilter, dateFrom, dateTo, dateExact);
//   };

//   const handleStatusFilter = (val) => {
//     setStatusFilter(val);
//     filter(search, val, stationFilter, dateFrom, dateTo, dateExact);
//   };

//   const filter = (q, status, station, from, to, exact) => {
//     let result = [...data];

//     // Search
//     if (q)
//       result = result.filter(
//         (c) =>
//           c.complainant_name?.toLowerCase().includes(q) ||
//           c.fraudster_phone?.toLowerCase().includes(q) ||
//           c.police_station?.toLowerCase().includes(q) ||
//           c.complaint_id?.toLowerCase().includes(q)
//       );

//     // Status
//     if (status) result = result.filter((c) => c.status === status);

//     // Police Station
//     if (station) result = result.filter((c) => c.police_station === station);

//     // Exact Date
//     if (exact)
//       result = result.filter((c) => c.createdAt?.slice(0, 10) === exact);

//     // From Date
//     if (from)
//       result = result.filter((c) => c.createdAt?.slice(0, 10) >= from);

//     // To Date
//     if (to) result = result.filter((c) => c.createdAt?.slice(0, 10) <= to);

//     setFiltered(result);
//   };

//   // -------------------------------------------------
//   // ANALYTICS
//   // -------------------------------------------------
//   const total = data.length;
//   const unread = data.filter((c) => !c.isRead).length;
//   const highValue = data.filter((c) => c.total_amount > 100000).length;

//   const stationStats = Object.values(
//     data.reduce((acc, c) => {
//       if (!c.police_station) return acc;
//       if (!acc[c.police_station])
//         acc[c.police_station] = { station: c.police_station, count: 0 };
//       acc[c.police_station].count += 1;
//       return acc;
//     }, {})
//   );

//   const weeklyTrend = data
//     .slice()
//     .reverse()
//     .slice(0, 7)
//     .map((c, i) => ({
//       day: `Day ${i + 1}`,
//       amount: c.total_amount || 0,
//     }));

//   return (
//     <div className="min-h-screen bg-[#f5f7fa] p-6">
//       <div className="max-w-7xl mx-auto">

//         {/* HEADER */}
//         <div className="flex flex-col sm:flex-row justify-between items-start mb-8">
//           <div>
//             <h1 className="text-3xl font-bold text-gray-900">
//               Cyber Cell Dashboard
//             </h1>
//             <p className="text-gray-500 mt-1">Modern Monitoring Panel</p>
//           </div>

//           <button
//             onClick={() => window.location.reload()}
//             className="px-4 py-2 bg-gray-900 text-white rounded-lg shadow hover:bg-black transition"
//           >
//             Refresh
//           </button>
//         </div>

//         {/* ANALYTICS */}
//         <div className="grid sm:grid-cols-3 gap-6 mb-10">
//           <div className="bg-white shadow-sm rounded-2xl p-6 border border-gray-100">
//             <p className="text-gray-500">Total Complaints</p>
//             <p className="text-3xl font-bold text-gray-900">{total}</p>
//           </div>

//           <div className="bg-white shadow-sm rounded-2xl p-6 border border-gray-100">
//             <p className="text-gray-500">Unread</p>
//             <p className="text-3xl font-bold text-yellow-600">{unread}</p>
//           </div>

//           <div className="bg-white shadow-sm rounded-2xl p-6 border border-gray-100">
//             <p className="text-gray-500">High Value Fraud</p>
//             <p className="text-3xl font-bold text-red-600">{highValue}</p>
//           </div>
//         </div>

//         {/* CHARTS */}
//         <div className="grid lg:grid-cols-2 gap-8 mb-12">
//           <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
//             <p className="font-semibold mb-4 text-gray-800">
//               Complaints by Station
//             </p>
//             <div className="w-full h-64">
//               <ResponsiveContainer width="100%" height="100%">
//                 <BarChart data={stationStats}>
//                   <CartesianGrid strokeDasharray="3 3" />
//                   <XAxis dataKey="station" />
//                   <YAxis />
//                   <Tooltip />
//                   <Bar dataKey="count" fill="#4f46e5" radius={[6, 6, 0, 0]} />
//                 </BarChart>
//               </ResponsiveContainer>
//             </div>
//           </div>

//           <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
//             <p className="font-semibold mb-4 text-gray-800">
//               Last 7 Complaints — Amount Trend
//             </p>
//             <div className="w-full h-64">
//               <ResponsiveContainer width="100%" height="100%">
//                 <LineChart data={weeklyTrend}>
//                   <CartesianGrid strokeDasharray="3 3" />
//                   <XAxis dataKey="day" />
//                   <YAxis />
//                   <Tooltip />
//                   <Line type="monotone" dataKey="amount" stroke="#2563eb" strokeWidth={3} />
//                 </LineChart>
//               </ResponsiveContainer>
//             </div>
//           </div>
//         </div>

//         {/* FILTERS */}
//         <div className="grid md:grid-cols-4 sm:grid-cols-2 gap-4 mb-6">
//           {/* Search */}
//           <input
//             value={search}
//             onChange={handleSearch}
//             placeholder="Search by name, ID, station, phone..."
//             className="px-4 py-2 rounded-xl border shadow-sm bg-white"
//           />

//           {/* Status */}
//           <select
//             className="px-3 py-2 rounded-xl border bg-white shadow-sm"
//             value={statusFilter}
//             onChange={(e) => handleStatusFilter(e.target.value)}
//           >
//             <option value="">All Status</option>
//             <option value="Pending">Pending</option>
//             <option value="Under Review">Under Review</option>
//             <option value="Closed">Closed</option>
//           </select>

//           {/* Station */}
//           <select
//             className="px-3 py-2 rounded-xl border bg-white shadow-sm"
//             value={stationFilter}
//             onChange={(e) => {
//               setStationFilter(e.target.value);
//               filter(search, statusFilter, e.target.value, dateFrom, dateTo, dateExact);
//             }}
//           >
//             <option value="">All Police Stations</option>
//             <option value="Jadavpur">Jadavpur</option>
//             <option value="Patuli">Patuli</option>
//             <option value="Netaji Nagar">Netaji Nagar</option>
//             <option value="Regent Park">Regent Park</option>
//             <option value="Garfa">Garfa</option>
//             <option value="Kasba">Kasba</option>
//             <option value="Bansdroni">Bansdroni</option>
//             <option value="Golf Green">Golf Green</option>
//             <option value="Patuli Women">Patuli Women</option>
//             <option value="Cyber Cell">Cyber Cell</option>
//           </select>

//           {/* Exact Date */}
//           <input
//             type="date"
//             value={dateExact}
//             onChange={(e) => {
//               setDateExact(e.target.value);
//               filter(search, statusFilter, stationFilter, dateFrom, dateTo, e.target.value);
//             }}
//             className="px-3 py-2 rounded-xl border bg-white shadow-sm"
//           />
//         </div>

//         {/* Date Range Filter */}
//         <div className="grid sm:grid-cols-2 gap-4 mb-6">
//           <input
//             type="date"
//             value={dateFrom}
//             onChange={(e) => {
//               setDateFrom(e.target.value);
//               filter(search, statusFilter, stationFilter, e.target.value, dateTo, dateExact);
//             }}
//             className="px-3 py-2 rounded-xl border bg-white shadow-sm"
//           />

//           <input
//             type="date"
//             value={dateTo}
//             onChange={(e) => {
//               setDateTo(e.target.value);
//               filter(search, statusFilter, stationFilter, dateFrom, e.target.value, dateExact);
//             }}
//             className="px-3 py-2 rounded-xl border bg-white shadow-sm"
//           />
//         </div>

//         {/* ------------------------------ */}
//         {/* TABLE — LIST VIEW */}
//         {/* ------------------------------ */}
//         <div className="bg-white rounded-2xl shadow-sm border border-gray-100 mt-6 overflow-x-auto">
//           <table className="min-w-full text-sm text-gray-700">
//             <thead className="bg-gray-100 text-gray-900 text-xs uppercase">
//               <tr>
//                 <th className="px-4 py-3">Complaint ID</th>
//                 <th className="px-4 py-3">Name</th>
//                 <th className="px-4 py-3">Fraudster</th>
//                 <th className="px-4 py-3">Amount</th>
//                 <th className="px-4 py-3">Station</th>
//                 <th className="px-4 py-3">Date</th>
//                 <th className="px-4 py-3">Status</th>
//                 <th className="px-4 py-3">Action</th>
//               </tr>
//             </thead>

//             <tbody>
//               {loading ? (
//                 <tr>
//                   <td colSpan="8" className="text-center py-6 text-gray-400">
//                     Loading complaints…
//                   </td>
//                 </tr>
//               ) : filtered.length === 0 ? (
//                 <tr>
//                   <td colSpan="8" className="text-center py-6 italic text-gray-400">
//                     No complaints found.
//                   </td>
//                 </tr>
//               ) : (
//                 filtered.map((c) => (
//                   <tr
//                     key={c._id}
//                     onClick={() => {
//                       setSelectedComplaint(c);
//                       if (!c.isRead) markAsRead(c._id);
//                     }}
//                     className={`border-b hover:bg-blue-50 cursor-pointer transition
//                       ${!c.isRead ? "bg-yellow-50" : ""}
//                     `}
//                   >
//                     <td className="px-4 py-3 font-bold">{c.complaint_id}</td>
//                     <td className="px-4 py-3">{c.complainant_name}</td>
//                     <td className="px-4 py-3 text-blue-700">
//                       {c.fraudster_phone || "—"}
//                     </td>
//                     <td className="px-4 py-3 font-medium">
//                       ₹{c.total_amount?.toLocaleString() || 0}
//                     </td>
//                     <td className="px-4 py-3">{c.police_station}</td>
//                     <td className="px-4 py-3">
//                       {c.createdAt?.slice(0, 10) || "—"}
//                     </td>

//                     <td className="px-4 py-3">
//                       <span
//                         className={`px-3 py-1 rounded-lg text-xs font-bold
//                           ${
//                             c.status === "Closed"
//                               ? "bg-green-100 text-green-700"
//                               : c.status === "Under Review"
//                               ? "bg-orange-100 text-orange-700"
//                               : "bg-gray-200 text-gray-700"
//                           }`}
//                       >
//                         {c.status || "Pending"}
//                       </span>
//                     </td>

//                     <td className="px-4 py-3">
//                       <button className="text-blue-600 font-medium hover:underline">
//                         View →
//                       </button>
//                     </td>
//                   </tr>
//                 ))
//               )}
//             </tbody>
//           </table>
//         </div>
//       </div>

//       {/* MODAL */}
//       {selectedComplaint && (
//         <FilePreviewModal
//           complaint={selectedComplaint}
//           apiBase={API_BASE}
//           onClose={() => setSelectedComplaint(null)}
//         />
//       )}
//     </div>
//   );
// }

// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import ComplaintFullView from "../components/FilePreviewModal";
// import {
//   BarChart,
//   Bar,
//   LineChart,
//   Line,
//   XAxis,
//   YAxis,
//   Tooltip,
//   CartesianGrid,
//   ResponsiveContainer,
// } from "recharts";

// const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:5000";

// export default function Dashboard() {
//   const [data, setData] = useState([]);
//   const [filtered, setFiltered] = useState([]);

//   // FILTER STATES
//   const [search, setSearch] = useState("");
//   const [statusFilter, setStatusFilter] = useState("");
//   const [stationFilter, setStationFilter] = useState("");
//   const [dateExact, setDateExact] = useState("");
//   const [dateFrom, setDateFrom] = useState("");
//   const [dateTo, setDateTo] = useState("");

//   const [selectedComplaint, setSelectedComplaint] = useState(null);
//   const [loading, setLoading] = useState(true);

//   // ------------------------------------------------------------
//   // FETCH DATA
//   // ------------------------------------------------------------
//   const loadData = async () => {
//     setLoading(true);
//     try {
//       const res = await axios.get(`${API_BASE}/api/complaints`);
//       const sorted = res.data.data.sort(
//         (a, b) => Number(a.isRead) - Number(b.isRead)
//       );
//       setData(sorted);
//       setFiltered(sorted);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     loadData();
//   }, []);

//   // ------------------------------------------------------------
//   // MARK AS READ (Works instantly)
//   // ------------------------------------------------------------
//   const markAsRead = async (id) => {
//     try {
//       await axios.patch(`${API_BASE}/api/complaints/${id}/mark-read`);

//       // Update locally instantly
//       setData((prev) =>
//         prev.map((c) => (c._id === id ? { ...c, isRead: true } : c))
//       );
//       setFiltered((prev) =>
//         prev.map((c) => (c._id === id ? { ...c, isRead: true } : c))
//       );
//     } catch (err) {
//       console.error("Failed to mark as read:", err);
//     }
//   };

//   // ------------------------------------------------------------
//   // FILTER LOGIC
//   // ------------------------------------------------------------
//   const filter = (q, status, station, from, to, exact) => {
//     let result = [...data];

//     if (q)
//       result = result.filter(
//         (c) =>
//           c.complainant_name?.toLowerCase().includes(q) ||
//           c.fraudster_phone?.toLowerCase().includes(q) ||
//           c.police_station?.toLowerCase().includes(q) ||
//           c.complaint_id?.toLowerCase().includes(q)
//       );

//     if (status) result = result.filter((c) => c.status === status);

//     if (station) result = result.filter((c) => c.police_station === station);

//     if (exact) result = result.filter((c) => c.createdAt?.slice(0, 10) === exact);

//     if (from) result = result.filter((c) => c.createdAt?.slice(0, 10) >= from);

//     if (to) result = result.filter((c) => c.createdAt?.slice(0, 10) <= to);

//     setFiltered(result);
//   };

//   const handleSearch = (e) => {
//     const q = e.target.value.toLowerCase();
//     setSearch(q);
//     filter(q, statusFilter, stationFilter, dateFrom, dateTo, dateExact);
//   };

//   // ------------------------------------------------------------
//   // ANALYTICS
//   // ------------------------------------------------------------
//   const total = data.length;
//   const unread = data.filter((c) => !c.isRead).length;
//   const highValue = data.filter((c) => c.total_amount > 100000).length;

//   const stationStats = Object.values(
//     data.reduce((acc, c) => {
//       if (!c.police_station) return acc;
//       if (!acc[c.police_station])
//         acc[c.police_station] = { station: c.police_station, count: 0 };
//       acc[c.police_station].count++;
//       return acc;
//     }, {})
//   );

//   const weeklyTrend = data
//     .slice()
//     .reverse()
//     .slice(0, 7)
//     .map((c, i) => ({
//       day: `Day ${i + 1}`,
//       amount: c.total_amount || 0,
//     }));

//   return (
//     <>
//       {!selectedComplaint ? (
//         <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-6">
//           <div className="max-w-7xl mx-auto">

//             {/* ===================================================== */}
//             {/* HEADER */}
//             {/* ===================================================== */}
//             <div className="flex justify-between items-center mb-10">
//               <div>
//                 <h1 className="text-4xl font-extrabold text-blue-700 drop-shadow-sm">
//                   Cyber Cell Dashboard
//                 </h1>
//                 <p className="text-gray-700 mt-1 text-sm">
//                   Kolkata Police — Fraud Monitoring & Case Management
//                 </p>
//               </div>

//               <button
//                 onClick={loadData}
//                 className="px-5 py-2 bg-blue-700 text-white rounded-xl shadow hover:bg-blue-800 transition"
//               >
//                 Refresh Data
//               </button>
//             </div>

//             {/* ===================================================== */}
//             {/* ANALYTICS CARDS */}
//             {/* ===================================================== */}
//             <div className="grid sm:grid-cols-3 gap-6 mb-10">
//               <div className="bg-white border-l-8 border-blue-600 rounded-2xl p-6 shadow">
//                 <p className="text-gray-500">Total Complaints</p>
//                 <p className="text-4xl font-bold text-blue-700">{total}</p>
//               </div>

//               <div className="bg-white border-l-8 border-yellow-400 rounded-2xl p-6 shadow">
//                 <p className="text-gray-500">Unread Complaints</p>
//                 <p className="text-4xl font-bold text-yellow-600">{unread}</p>
//               </div>

//               <div className="bg-white border-l-8 border-red-500 rounded-2xl p-6 shadow">
//                 <p className="text-gray-500">High Value Fraud</p>
//                 <p className="text-4xl font-bold text-red-600">{highValue}</p>
//               </div>
//             </div>

//             {/* ===================================================== */}
//             {/* CHARTS */}
//             {/* ===================================================== */}
//             <div className="grid lg:grid-cols-2 gap-8 mb-12">

//               <div className="bg-white rounded-2xl shadow border p-6">
//                 <p className="font-semibold mb-4 text-gray-800">
//                   Cases by Police Station
//                 </p>
//                 <div className="w-full h-64">
//                   <ResponsiveContainer>
//                     <BarChart data={stationStats}>
//                       <CartesianGrid strokeDasharray="3 3" />
//                       <XAxis dataKey="station" />
//                       <YAxis />
//                       <Tooltip />
//                       <Bar dataKey="count" fill="#2563eb" />
//                     </BarChart>
//                   </ResponsiveContainer>
//                 </div>
//               </div>

//               <div className="bg-white rounded-2xl shadow border p-6">
//                 <p className="font-semibold mb-4 text-gray-800">
//                   Fraud Amount Trend (Last 7 Cases)
//                 </p>
//                 <div className="w-full h-64">
//                   <ResponsiveContainer>
//                     <LineChart data={weeklyTrend}>
//                       <CartesianGrid strokeDasharray="3 3" />
//                       <XAxis dataKey="day" />
//                       <YAxis />
//                       <Tooltip />
//                       <Line type="monotone" dataKey="amount" stroke="#059669" strokeWidth={3} />
//                     </LineChart>
//                   </ResponsiveContainer>
//                 </div>
//               </div>

//             </div>

//             {/* ===================================================== */}
//             {/* FILTER BAR */}
//             {/* ===================================================== */}
//             <div className="bg-white rounded-2xl shadow border p-5 mb-6">
//               <h3 className="font-semibold text-gray-700 mb-3">Filters</h3>
//               <div className="grid lg:grid-cols-6 gap-4">

//                 <div>
//                   <label className="block text-xs text-gray-600 mb-1">Search</label>
//                   <input
//                     value={search}
//                     onChange={handleSearch}
//                     className="px-4 py-2 w-full border rounded-xl shadow-sm"
//                     placeholder="Name / ID / Phone / Station"
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-xs text-gray-600 mb-1">Status</label>
//                   <select
//                     value={statusFilter}
//                     onChange={(e) => {
//                       setStatusFilter(e.target.value);
//                       filter(search, e.target.value, stationFilter, dateFrom, dateTo, dateExact);
//                     }}
//                     className="px-3 py-2 border rounded-xl w-full bg-white shadow-sm"
//                   >
//                     <option value="">All</option>
//                     <option value="Pending">Pending</option>
//                     <option value="Under Review">Under Review</option>
//                     <option value="Closed">Closed</option>
//                   </select>
//                 </div>

//                 <div>
//                   <label className="block text-xs text-gray-600 mb-1">Police Station</label>
//                   <select
//                     value={stationFilter}
//                     onChange={(e) => {
//                       setStationFilter(e.target.value);
//                       filter(search, statusFilter, e.target.value, dateFrom, dateTo, dateExact);
//                     }}
//                     className="px-3 py-2 border rounded-xl w-full bg-white shadow-sm"
//                   >
//                     <option value="">All</option>
//                     <option value="Jadavpur">Jadavpur</option>
//                     <option value="Patuli">Patuli</option>
//                     <option value="Netaji Nagar">Netaji Nagar</option>
//                     <option value="Regent Park">Regent Park</option>
//                     <option value="Garfa">Garfa</option>
//                     <option value="Kasba">Kasba</option>
//                     <option value="Bansdroni">Bansdroni</option>
//                     <option value="Golf Green">Golf Green</option>
//                     <option value="Patuli Women">Patuli Women</option>
//                     <option value="Cyber Cell">Cyber Cell</option>
//                   </select>
//                 </div>

//                 <div>
//                   <label className="block text-xs text-gray-600 mb-1">Exact Date</label>
//                   <input
//                     type="date"
//                     className="px-3 py-2 border rounded-xl w-full shadow-sm"
//                     value={dateExact}
//                     onChange={(e) => {
//                       setDateExact(e.target.value);
//                       filter(search, statusFilter, stationFilter, dateFrom, dateTo, e.target.value);
//                     }}
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-xs text-gray-600 mb-1">From</label>
//                   <input
//                     type="date"
//                     className="px-3 py-2 border rounded-xl w-full shadow-sm"
//                     value={dateFrom}
//                     onChange={(e) => {
//                       setDateFrom(e.target.value);
//                       filter(search, statusFilter, stationFilter, e.target.value, dateTo, dateExact);
//                     }}
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-xs text-gray-600 mb-1">To</label>
//                   <input
//                     type="date"
//                     className="px-3 py-2 border rounded-xl w-full shadow-sm"
//                     value={dateTo}
//                     onChange={(e) => {
//                       setDateTo(e.target.value);
//                       filter(search, statusFilter, stationFilter, dateFrom, e.target.value, dateExact);
//                     }}
//                   />
//                 </div>

//               </div>
//             </div>

//             {/* ===================================================== */}
//             {/* LIST TABLE (COLORED) */}
//             {/* ===================================================== */}
//             <div className="bg-white rounded-2xl shadow border overflow-x-auto">
//               <table className="min-w-full text-sm text-gray-700">
//                 <thead className="bg-blue-100 text-blue-900 text-xs uppercase">
//                   <tr>
//                     <th className="px-3 py-3"> </th>
//                     <th className="px-4 py-3 text-left">Complaint ID</th>
//                     <th className="px-4 py-3 text-left">Complainant</th>
//                     <th className="px-4 py-3 text-left">Fraudster</th>
//                     <th className="px-4 py-3 text-left">Amount</th>
//                     <th className="px-4 py-3 text-left">Station</th>
//                     <th className="px-4 py-3 text-left">Date</th>
//                     <th className="px-4 py-3 text-left">Status</th>
//                   </tr>
//                 </thead>

//                 <tbody>
//                   {loading ? (
//                     <tr>
//                       <td className="text-center py-6" colSpan="8">
//                         Loading...
//                       </td>
//                     </tr>
//                   ) : filtered.length === 0 ? (
//                     <tr>
//                       <td colSpan="8" className="text-center py-6 text-gray-500 italic">
//                         No complaints match the filters.
//                       </td>
//                     </tr>
//                   ) : (
//                     filtered.map((c) => (
//                       <tr
//                         key={c._id}
//                         className={`border-b transition hover:bg-blue-50 ${
//                           !c.isRead ? "bg-yellow-50" : ""
//                         }`}
//                         onClick={() => {
//                           if (!c.isRead) markAsRead(c._id);
//                           setSelectedComplaint(c);
//                         }}
//                       >
//                         {/* Sticky NEW badge */}
//                         <td
//                           className="px-3 py-3 bg-white"
//                           style={{
//                             position: "sticky",
//                             left: 0,
//                             zIndex: 20,
//                             borderRight: "1px solid #e5e7eb",
//                           }}
//                         >
//                           {!c.isRead && (
//                             <span className="bg-yellow-400 text-yellow-900 text-xs font-bold px-2 py-1 rounded-full shadow-sm">
//                               NEW
//                             </span>
//                           )}
//                         </td>

//                         <td className="px-4 py-3 font-semibold text-blue-700">{c.complaint_id}</td>
//                         <td className="px-4 py-3">{c.complainant_name}</td>
//                         <td className="px-4 py-3 text-blue-600">{c.fraudster_phone || "—"}</td>
//                         <td className="px-4 py-3 font-medium text-green-700">
//                           ₹{c.total_amount?.toLocaleString()}
//                         </td>
//                         <td className="px-4 py-3">{c.police_station}</td>
//                         <td className="px-4 py-3">{c.createdAt?.slice(0, 10)}</td>

//                         <td className="px-4 py-3">
//                           <span
//                             className={`px-3 py-1 rounded-lg text-xs font-bold ${
//                               c.status === "Closed"
//                                 ? "bg-green-200 text-green-800"
//                                 : c.status === "Under Review"
//                                 ? "bg-orange-200 text-orange-800"
//                                 : "bg-gray-200 text-gray-700"
//                             }`}
//                           >
//                             {c.status || "Pending"}
//                           </span>
//                         </td>
//                       </tr>
//                     ))
//                   )}
//                 </tbody>
//               </table>
//             </div>
//           </div>
//         </div>
//       ) : (
//         <ComplaintFullView
//           complaint={selectedComplaint}
//           apiBase={API_BASE}
//           onClose={() => setSelectedComplaint(null)}
//           refresh={loadData}
//         />
//       )}
//     </>
//   );
// }

import React, { useEffect, useState } from "react";
import axios from "axios";
import ComplaintFullView from "../components/FilePreviewModal";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:5000";

/**
 * Dashboard.js
 * Theme: Option C (Material "Candy")
 */
export default function Dashboard() {
  const [data, setData] = useState([]);
  const [filtered, setFiltered] = useState([]);

  // filters
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [stationFilter, setStationFilter] = useState("");
  const [dateExact, setDateExact] = useState("");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");

  const [selectedComplaint, setSelectedComplaint] = useState(null);
  const [loading, setLoading] = useState(true);

  // -----------------------------
  // Fetch complaints
  // -----------------------------
  const loadData = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${API_BASE}/api/complaints`);
      const sorted = res.data.data.sort(
        (a, b) => Number(a.isRead) - Number(b.isRead)
      );
      setData(sorted);
      setFiltered(sorted);
    } catch (err) {
      console.error("Failed to load complaints:", err);
      setData([]);
      setFiltered([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  // -----------------------------
  // Mark as read (DB + local)
  // -----------------------------
  const markAsRead = async (id) => {
    try {
      await axios.patch(`${API_BASE}/api/complaints/${id}/mark-read`);
      // optimistic local update
      setData((prev) => prev.map((c) => (c._id === id ? { ...c, isRead: true } : c)));
      setFiltered((prev) => prev.map((c) => (c._id === id ? { ...c, isRead: true } : c)));
    } catch (err) {
      console.error("markAsRead failed:", err);
    }
  };

  // -----------------------------
  // Filter logic
  // -----------------------------
  const filter = (q, status, station, from, to, exact) => {
    let result = [...data];

    if (q) {
      result = result.filter(
        (c) =>
          c.complainant_name?.toLowerCase().includes(q) ||
          c.fraudster_phone?.toLowerCase().includes(q) ||
          c.police_station?.toLowerCase().includes(q) ||
          c.complaint_id?.toLowerCase().includes(q)
      );
    }

    if (status) result = result.filter((c) => c.status === status);
    if (station) result = result.filter((c) => c.police_station === station);
    if (exact) result = result.filter((c) => c.createdAt?.slice(0, 10) === exact);
    if (from) result = result.filter((c) => c.createdAt?.slice(0, 10) >= from);
    if (to) result = result.filter((c) => c.createdAt?.slice(0, 10) <= to);

    setFiltered(result);
  };

  const handleSearch = (e) => {
    const q = e.target.value.toLowerCase();
    setSearch(q);
    filter(q, statusFilter, stationFilter, dateFrom, dateTo, dateExact);
  };

  // -----------------------------
  // Analytics helpers
  // -----------------------------
  const total = data.length;
  const unread = data.filter((c) => !c.isRead).length;
  const highValue = data.filter((c) => c.total_amount > 100000).length;

  const stationStats = Object.values(
    data.reduce((acc, c) => {
      if (!c.police_station) return acc;
      if (!acc[c.police_station]) acc[c.police_station] = { station: c.police_station, count: 0 };
      acc[c.police_station].count++;
      return acc;
    }, {})
  );

  const weeklyTrend = data
    .slice()
    .reverse()
    .slice(0, 7)
    .map((c, i) => ({
      day: `Day ${i + 1}`,
      amount: c.total_amount || 0,
    }));

  // -----------------------------
  // Helpers for themed classes
  // -----------------------------
  const statusBadgeClass = (status) => {
    if (status === "Closed") return "bg-green-100 text-green-800";
    if (status === "Under Review") return "bg-pink-100 text-pink-700";
    return "bg-gray-100 text-gray-800";
  };

  return (
    <>
      {!selectedComplaint ? (
        <div className="min-h-screen bg-gradient-to-br from-pink-50 via-indigo-50 to-blue-50 p-6">
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
              <div>
                <h1 className="text-4xl font-extrabold text-indigo-600">Candy Dashboard</h1>
                <p className="text-sm text-gray-600 mt-1">Colorful overview of complaints</p>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 bg-white px-3 py-2 rounded-full shadow">
                  <svg className="w-5 h-5 text-pink-500" viewBox="0 0 24 24" fill="none">
                    <path d="M12 2v4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    <path d="M12 18v4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    <path d="M4.93 4.93l2.83 2.83" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    <path d="M16.24 16.24l2.83 2.83" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.5" />
                  </svg>
                  <div className="text-sm text-gray-700 font-medium">Unread</div>
                  <div className="ml-2 px-2 py-1 rounded-full bg-indigo-100 text-indigo-700 font-semibold text-sm">
                    {unread}
                  </div>
                </div>

                <button
                  onClick={loadData}
                  className="px-4 py-2 rounded-lg bg-indigo-600 text-white shadow hover:bg-indigo-700 transition"
                >
                  Refresh
                </button>
              </div>
            </div>

            {/* Analytics cards */}
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white rounded-2xl shadow p-5 border-l-4 border-indigo-400">
                <p className="text-xs text-gray-500">Total Complaints</p>
                <div className="mt-2 text-3xl font-bold text-indigo-700">{total}</div>
              </div>
              <div className="bg-white rounded-2xl shadow p-5 border-l-4 border-pink-400">
                <p className="text-xs text-gray-500">Unread</p>
                <div className="mt-2 text-3xl font-bold text-pink-600">{unread}</div>
              </div>
              <div className="bg-white rounded-2xl shadow p-5 border-l-4 border-green-400">
                <p className="text-xs text-gray-500">High Value (&gt;1L)</p>
                <div className="mt-2 text-3xl font-bold text-green-700">{highValue}</div>
              </div>
            </div>

            {/* Charts */}
            <div className="grid lg:grid-cols-2 gap-6 mb-8">
              <div className="bg-white rounded-2xl shadow p-5">
                <p className="text-sm font-semibold text-gray-800 mb-3">Cases by Station</p>
                <div className="w-full h-56">
                  <ResponsiveContainer>
                    <BarChart data={stationStats}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="station" tick={{ fontSize: 12 }} />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="count" fill="#6366f1" radius={[6, 6, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow p-5">
                <p className="text-sm font-semibold text-gray-800 mb-3">Amount Trend (last 7)</p>
                <div className="w-full h-56">
                  <ResponsiveContainer>
                    <LineChart data={weeklyTrend}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="day" tick={{ fontSize: 12 }} />
                      <YAxis />
                      <Tooltip />
                      <Line type="monotone" dataKey="amount" stroke="#10b981" strokeWidth={3} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

            {/* Filters */}
            <div className="bg-white rounded-2xl shadow p-5 mb-6">
              <h4 className="text-sm font-semibold text-gray-800 mb-3">Filters</h4>

              <div className="grid lg:grid-cols-6 gap-4">
                <div className="lg:col-span-2">
                  <label className="text-xs text-gray-500">Search</label>
                  <input
                    value={search}
                    onChange={handleSearch}
                    placeholder="Name / ID / Phone / Station"
                    className="w-full mt-1 px-3 py-2 border rounded-xl shadow-sm"
                  />
                </div>

                <div>
                  <label className="text-xs text-gray-500">Status</label>
                  <select
                    value={statusFilter}
                    onChange={(e) => {
                      setStatusFilter(e.target.value);
                      filter(search, e.target.value, stationFilter, dateFrom, dateTo, dateExact);
                    }}
                    className="w-full mt-1 px-3 py-2 border rounded-xl shadow-sm"
                  >
                    <option value="">All</option>
                    <option value="Pending">Pending</option>
                    <option value="Under Review">Under Review</option>
                    <option value="Closed">Closed</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs text-gray-500">Police Station</label>
                  <select
                    value={stationFilter}
                    onChange={(e) => {
                      setStationFilter(e.target.value);
                      filter(search, statusFilter, e.target.value, dateFrom, dateTo, dateExact);
                    }}
                    className="w-full mt-1 px-3 py-2 border rounded-xl shadow-sm"
                  >
                    <option value="">All</option>
                    <option value="Jadavpur">Jadavpur</option>
                    <option value="Patuli">Patuli</option>
                    <option value="Netaji Nagar">Netaji Nagar</option>
                    <option value="Regent Park">Regent Park</option>
                    <option value="Garfa">Garfa</option>
                    <option value="Kasba">Kasba</option>
                    <option value="Bansdroni">Bansdroni</option>
                    <option value="Golf Green">Golf Green</option>
                    <option value="Patuli Women">Patuli Women</option>
                    <option value="Cyber Cell">Cyber Cell</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs text-gray-500">Exact Date</label>
                  <input
                    type="date"
                    value={dateExact}
                    onChange={(e) => {
                      setDateExact(e.target.value);
                      filter(search, statusFilter, stationFilter, dateFrom, dateTo, e.target.value);
                    }}
                    className="w-full mt-1 px-3 py-2 border rounded-xl shadow-sm"
                  />
                </div>

                <div>
                  <label className="text-xs text-gray-500">From</label>
                  <input
                    type="date"
                    value={dateFrom}
                    onChange={(e) => {
                      setDateFrom(e.target.value);
                      filter(search, statusFilter, stationFilter, e.target.value, dateTo, dateExact);
                    }}
                    className="w-full mt-1 px-3 py-2 border rounded-xl shadow-sm"
                  />
                </div>

                <div>
                  <label className="text-xs text-gray-500">To</label>
                  <input
                    type="date"
                    value={dateTo}
                    onChange={(e) => {
                      setDateTo(e.target.value);
                      filter(search, statusFilter, stationFilter, dateFrom, e.target.value, dateExact);
                    }}
                    className="w-full mt-1 px-3 py-2 border rounded-xl shadow-sm"
                  />
                </div>
              </div>
            </div>

            {/* Table list */}
            <div className="bg-white rounded-2xl shadow overflow-x-auto">
              <table className="min-w-full text-sm text-gray-700">
                <colgroup>
                  <col style={{ width: 64 }} />
                  <col style={{ width: 180 }} />
                  <col />
                  <col style={{ width: 140 }} />
                  <col style={{ width: 130 }} />
                  <col style={{ width: 150 }} />
                  <col style={{ width: 120 }} />
                </colgroup>

                <thead className="bg-indigo-50 text-indigo-800 text-xs uppercase">
                  <tr>
                    <th className="px-3 py-3"></th>
                    <th className="px-4 py-3 text-left">Complaint ID</th>
                    <th className="px-4 py-3 text-left">Complainant</th>
                    <th className="px-4 py-3 text-left">Fraudster</th>
                    <th className="px-4 py-3 text-left">Amount</th>
                    <th className="px-4 py-3 text-left">Station</th>
                    <th className="px-4 py-3 text-left">Date</th>
                    <th className="px-4 py-3 text-left">Status</th>
                  </tr>
                </thead>

                <tbody>
                  {loading ? (
                    <tr>
                      <td colSpan="8" className="text-center py-8 text-gray-500">
                        Loading...
                      </td>
                    </tr>
                  ) : filtered.length === 0 ? (
                    <tr>
                      <td colSpan="8" className="text-center py-8 text-gray-400 italic">
                        No complaints found.
                      </td>
                    </tr>
                  ) : (
                    filtered.map((c) => (
                      <tr
                        key={c._id}
                        className={`border-b transition-colors duration-200 hover:bg-indigo-50 ${
                          !c.isRead ? "bg-pink-50" : "bg-white"
                        }`}
                        onClick={() => {
                          if (!c.isRead) markAsRead(c._id);
                          setSelectedComplaint(c);
                        }}
                      >
                        {/* sticky badge */}
                        <td
                          className="px-3 py-3 bg-white"
                          style={{ position: "sticky", left: 0, zIndex: 20, borderRight: "1px solid #eef2ff" }}
                        >
                          {!c.isRead ? (
                            <span className="inline-flex items-center px-2 py-1 rounded-full bg-pink-200 text-pink-800 text-xs font-semibold shadow-sm">
                              NEW
                            </span>
                          ) : (
                            <span className="inline-block w-6" />
                          )}
                        </td>

                        <td className="px-4 py-3 font-semibold text-indigo-700">{c.complaint_id}</td>
                        <td className="px-4 py-3">{c.complainant_name}</td>
                        <td className="px-4 py-3 text-indigo-600">{c.fraudster_phone || "—"}</td>
                        <td className="px-4 py-3 font-medium text-green-600">₹{c.total_amount?.toLocaleString() || 0}</td>
                        <td className="px-4 py-3">{c.police_station}</td>
                        <td className="px-4 py-3">{c.createdAt?.slice(0, 10)}</td>
                        <td className="px-4 py-3">
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${statusBadgeClass(c.status)}`}>
                            {c.status || "Pending"}
                          </span>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      ) : (
        <ComplaintFullView
          complaint={selectedComplaint}
          apiBase={API_BASE}
          onClose={() => setSelectedComplaint(null)}
          refresh={loadData}
          
          
        />
      )}
    </>
  );
}
