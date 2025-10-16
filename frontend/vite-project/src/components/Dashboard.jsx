// // import React, { useEffect, useState } from "react";
// // import axios from "axios";

// // const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:5000";

// // export default function Dashboard() {
// //   const [data, setData] = useState([]);
// //   const [search, setSearch] = useState("");
// //   const [loading, setLoading] = useState(true);

// //   useEffect(() => {
// //     fetchData();
// //   }, []);

// //   const fetchData = async () => {
// //     setLoading(true);
// //     try {
// //       const res = await axios.get(`${API_BASE}/api/complaints`);
// //       setData(res.data.data || []);
// //     } catch (err) {
// //       console.error("Error fetching complaints:", err);
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   const filtered = data.filter(
// //     (r) =>
// //       r.complainant_name?.toLowerCase().includes(search.toLowerCase()) ||
// //       r.police_station?.toLowerCase().includes(search.toLowerCase()) ||
// //       r.gd_case_no?.toLowerCase().includes(search.toLowerCase())
// //   );

// //   const handleExportExcel = () => {
// //     window.open(`${API_BASE}/api/export/excel`, "_blank");
// //   };

// //   const handleExportCSV = () => {
// //     window.open(`${API_BASE}/api/export/csv`, "_blank");
// //   };

// //   return (
// //     <div className="min-h-screen bg-gray-50 p-4 sm:p-8">
// //       <div className="max-w-7xl mx-auto bg-white rounded-xl shadow-lg p-6">
// //         <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 gap-3">
// //           <h1 className="text-2xl font-bold text-blue-700">
// //             Cyber Cell Complaints Dashboard
// //           </h1>
// //           <div className="flex gap-2">
// //             <button
// //               onClick={handleExportExcel}
// //               className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
// //             >
// //               Export Excel
// //             </button>
// //             <button
// //               onClick={handleExportCSV}
// //               className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition"
// //             >
// //               Export CSV
// //             </button>
// //           </div>
// //         </div>

// //         <div className="mb-4">
// //           <input
// //             type="text"
// //             placeholder="🔍 Search by name, station, or GD number"
// //             value={search}
// //             onChange={(e) => setSearch(e.target.value)}
// //             className="w-full sm:w-1/2 border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
// //           />
// //         </div>

// //         {loading ? (
// //           <p className="text-gray-500">Loading complaints...</p>
// //         ) : filtered.length === 0 ? (
// //           <p className="text-gray-500">No complaints found.</p>
// //         ) : (
// //           <div className="overflow-x-auto">
// //             <table className="min-w-full text-sm border border-gray-200 rounded-lg">
// //               <thead className="bg-blue-100 text-gray-700">
// //                 <tr>
// //                   <th className="border px-3 py-2">#</th>
// //                   <th className="border px-3 py-2">Name</th>
// //                   <th className="border px-3 py-2">Police Station</th>
// //                   <th className="border px-3 py-2">GD No.</th>
// //                   <th className="border px-3 py-2">Amount (₹)</th>
// //                   <th className="border px-3 py-2">Date</th>
// //                   <th className="border px-3 py-2">Description</th>
// //                   <th className="border px-3 py-2">Documents</th>
// //                 </tr>
// //               </thead>
// //               <tbody>
// //                 {filtered.map((r, i) => (
// //                   <tr key={i} className="border-t hover:bg-blue-50">
// //                     <td className="border px-3 py-2 text-center">{i + 1}</td>
// //                     <td className="border px-3 py-2">{r.complainant_name}</td>
// //                     <td className="border px-3 py-2">{r.police_station}</td>
// //                     <td className="border px-3 py-2">{r.gd_case_no}</td>
// //                     <td className="border px-3 py-2 text-right">{r.total_amount}</td>
// //                     <td className="border px-3 py-2">{r.from_date}</td>
// //                     <td className="border px-3 py-2">{r.fraud_description}</td>
// //                     <td className="border px-3 py-2 text-center">
// //                       {r.aadhaar_file && (
// //                         <a
// //                           href={`${API_BASE}/uploads/${r.aadhaar_file}`}
// //                           target="_blank"
// //                           rel="noopener noreferrer"
// //                           className="text-blue-600 hover:underline"
// //                         >
// //                           View
// //                         </a>
// //                       )}
// //                     </td>
// //                   </tr>
// //                 ))}
// //               </tbody>
// //             </table>
// //           </div>
// //         )}
// //       </div>
// //     </div>
// //   );
// // }


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

//   const fetchData = async () => {
//     setLoading(true);
//     try {
//       const res = await axios.get(`${API_BASE}/api/complaints`);
//       setData(res.data.data || []);
//       setFiltered(res.data.data || []);
//     } catch (err) {
//       console.error("Error fetching complaints:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleSearch = (e) => {
//     const query = e.target.value.toLowerCase();
//     setSearch(query);
//     if (!query) {
//       setFiltered(data);
//     } else {
//       setFiltered(
//         data.filter(
//           (c) =>
//             c.complainant_name?.toLowerCase().includes(query) ||
//             c.police_station?.toLowerCase().includes(query) ||
//             c.gd_case_no?.toLowerCase().includes(query) ||
//             c.present_address?.toLowerCase().includes(query)
//         )
//       );
//     }
//   };

//   const handleExportExcel = () => window.open(`${API_BASE}/api/export/excel`);
//   const handleExportCSV = () => window.open(`${API_BASE}/api/export/csv`);

//   return (
//     <div className="min-h-screen bg-gray-50 p-4 sm:p-8">
//       <div className="max-w-7xl mx-auto bg-white rounded-xl shadow-md p-6">
//         <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6">
//           <h1 className="text-2xl font-bold text-blue-700">
//             Cyber Cell Complaint Dashboard
//           </h1>
//           <div className="flex flex-wrap gap-2">
//             <button
//               onClick={handleExportExcel}
//               className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
//             >
//               Export Excel
//             </button>
//             <button
//               onClick={handleExportCSV}
//               className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md"
//             >
//               Export CSV
//             </button>
//             <button
//               onClick={fetchData}
//               className="bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded-md"
//             >
//               Refresh
//             </button>
//           </div>
//         </div>

//         {/* Search bar */}
//         <input
//           type="text"
//           placeholder="🔍 Search by name, station, GD No., or address"
//           value={search}
//           onChange={handleSearch}
//           className="w-full sm:w-1/2 border border-gray-300 rounded-lg px-3 py-2 mb-4 focus:ring-2 focus:ring-blue-400"
//         />

//         {loading ? (
//           <p className="text-gray-500">Loading complaints...</p>
//         ) : filtered.length === 0 ? (
//           <p className="text-gray-500">No complaints found.</p>
//         ) : (
//           <div className="overflow-x-auto">
//             <table className="min-w-full text-sm border border-gray-200 rounded-lg">
//               <thead className="bg-blue-100 text-gray-700">
//                 <tr>
//                   <th className="border px-3 py-2">#</th>
//                   <th className="border px-3 py-2 text-left">Name</th>
//                   <th className="border px-3 py-2 text-left">Station</th>
//                   <th className="border px-3 py-2 text-left">GD No.</th>
//                   <th className="border px-3 py-2 text-left">Phone</th>
//                   <th className="border px-3 py-2 text-left">Email</th>
//                   <th className="border px-3 py-2 text-left">Profession</th>
//                   <th className="border px-3 py-2 text-left">Address</th>
//                   <th className="border px-3 py-2 text-right">Amount (₹)</th>
//                   <th className="border px-3 py-2 text-left">Fraud Type</th>
//                   <th className="border px-3 py-2 text-center">Action</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {filtered.map((c, i) => (
//                   <tr
//                     key={c._id}
//                     className="border-t hover:bg-blue-50 cursor-pointer"
//                     onClick={() => setSelectedComplaint(c)}
//                   >
//                     <td className="border px-3 py-2 text-center">{i + 1}</td>
//                     <td className="border px-3 py-2">{c.complainant_name}</td>
//                     <td className="border px-3 py-2">{c.police_station}</td>
//                     <td className="border px-3 py-2">{c.gd_case_no}</td>
//                     <td className="border px-3 py-2">{c.phone_no || "—"}</td>
//                     <td className="border px-3 py-2">{c.email_id || "—"}</td>
//                     <td className="border px-3 py-2">{c.profession || "—"}</td>
//                     <td className="border px-3 py-2 truncate max-w-xs">
//                       {c.present_address}
//                     </td>
//                     <td className="border px-3 py-2 text-right">
//                       {c.total_amount || "—"}
//                     </td>
//                     <td className="border px-3 py-2 truncate max-w-xs">
//                       {c.fraud_description}
//                     </td>
//                     <td className="border px-3 py-2 text-center">
//                       <button className="text-blue-600 hover:underline">
//                         View
//                       </button>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         )}
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

import React, { useEffect, useState } from "react";
import axios from "axios";
import FilePreviewModal from "../components/FilePreviewModal";

const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:5000";

export default function Dashboard() {
  const [data, setData] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [selectedComplaint, setSelectedComplaint] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${API_BASE}/api/complaints`);
      setData(res.data.data || []);
      setFiltered(res.data.data || []);
    } catch (err) {
      console.error("Error fetching complaints:", err);
    } finally {
      setLoading(false);
    }
  };

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
          <div className="overflow-x-auto">
            <table className="min-w-full border border-gray-200 text-xs sm:text-sm">
              <thead className="bg-blue-100 text-gray-700">
                <tr>
                  <th className="border px-2 sm:px-3 py-2">#</th>
                  <th className="border px-2 sm:px-3 py-2 text-left">
                    Name
                  </th>
                  <th className="border px-2 sm:px-3 py-2 text-left">
                    Station
                  </th>
                  <th className="border px-2 sm:px-3 py-2 text-left">GD No</th>
                  <th className="border px-2 sm:px-3 py-2 text-left">
                    Amount (₹)
                  </th>
                  <th className="border px-2 sm:px-3 py-2 text-left hidden sm:table-cell">
                    Description
                  </th>
                  <th className="border px-2 sm:px-3 py-2 text-center">
                    View
                  </th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((c, i) => (
                  <tr
                    key={c._id}
                    className="hover:bg-blue-50 cursor-pointer transition"
                    onClick={() => setSelectedComplaint(c)}
                  >
                    <td className="border text-center px-2 sm:px-3 py-2">
                      {i + 1}
                    </td>
                    <td className="border px-2 sm:px-3 py-2">
                      {c.complainant_name || "—"}
                    </td>
                    <td className="border px-2 sm:px-3 py-2">
                      {c.police_station || "—"}
                    </td>
                    <td className="border px-2 sm:px-3 py-2">
                      {c.gd_case_no || "—"}
                    </td>
                    <td className="border px-2 sm:px-3 py-2 text-right">
                      {c.total_amount || "—"}
                    </td>
                    <td className="border px-2 sm:px-3 py-2 truncate max-w-xs hidden sm:table-cell">
                      {c.fraud_description || "—"}
                    </td>
                    <td className="border text-center px-2 sm:px-3 py-2">
                      <button className="text-blue-600 hover:underline">
                        View
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
