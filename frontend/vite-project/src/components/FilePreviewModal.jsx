// // import React from "react";

// // export default function FilePreviewModal({ complaint, apiBase, onClose }) {
// //   const { complainant_name, police_station, gd_case_no, total_amount, files } =
// //     complaint;

// //   return (
// //     <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
// //       <div className="bg-white rounded-xl shadow-lg w-11/12 sm:w-3/4 lg:w-1/2 p-6 relative overflow-y-auto max-h-[90vh]">
// //         <button
// //           onClick={onClose}
// //           className="absolute top-3 right-3 text-gray-500 hover:text-black"
// //         >
// //           ✖
// //         </button>

// //         <h2 className="text-xl font-bold text-blue-700 mb-3">
// //           Complaint Details
// //         </h2>

// //         <div className="space-y-2 text-sm">
// //           <p>
// //             <strong>Name:</strong> {complainant_name}
// //           </p>
// //           <p>
// //             <strong>Police Station:</strong> {police_station}
// //           </p>
// //           <p>
// //             <strong>GD Case No.:</strong> {gd_case_no}
// //           </p>
// //           <p>
// //             <strong>Total Amount:</strong> ₹{total_amount}
// //           </p>
// //         </div>

// //         <h3 className="text-md font-semibold mt-4 mb-2">Documents</h3>
// //         <ul className="space-y-2">
// //           {files?.aadhaar && (
// //             <li>
// //               <a
// //                 href={`${apiBase}/uploads/${files.aadhaar}`}
// //                 target="_blank"
// //                 rel="noopener noreferrer"
// //                 className="text-blue-600 hover:underline"
// //               >
// //                 Aadhaar
// //               </a>
// //             </li>
// //           )}
// //           {files?.gd_copy && (
// //             <li>
// //               <a
// //                 href={`${apiBase}/uploads/${files.gd_copy}`}
// //                 target="_blank"
// //                 rel="noopener noreferrer"
// //                 className="text-blue-600 hover:underline"
// //               >
// //                 GD Copy
// //               </a>
// //             </li>
// //           )}
// //           {files?.bank_statement && (
// //             <li>
// //               <a
// //                 href={`${apiBase}/uploads/${files.bank_statement}`}
// //                 target="_blank"
// //                 rel="noopener noreferrer"
// //                 className="text-blue-600 hover:underline"
// //               >
// //                 Bank Statement
// //               </a>
// //             </li>
// //           )}
// //           {files?.card_copy && (
// //             <li>
// //               <a
// //                 href={`${apiBase}/uploads/${files.card_copy}`}
// //                 target="_blank"
// //                 rel="noopener noreferrer"
// //                 className="text-blue-600 hover:underline"
// //               >
// //                 Card Copy
// //               </a>
// //             </li>
// //           )}
// //           {files?.other_docs?.length > 0 && (
// //             <li>
// //               {files.other_docs.map((f, i) => (
// //                 <a
// //                   key={i}
// //                   href={`${apiBase}/uploads/${f}`}
// //                   target="_blank"
// //                   rel="noopener noreferrer"
// //                   className="text-blue-600 hover:underline block"
// //                 >
// //                   Other Doc {i + 1}
// //                 </a>
// //               ))}
// //             </li>
// //           )}
// //         </ul>
// //       </div>
// //     </div>
// //   );
// // }

// import React from "react";

// export default function FilePreviewModal({ complaint, apiBase, onClose }) {
//   const {
//     complainant_name,
//     police_station,
//     gd_case_no,
//     relation,
//     profession,
//     present_address,
//     phone_no,
//     email_id,
//     total_amount,
//     fraud_description,
//     banks,
//     files,
//   } = complaint;

//   return (
//     <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
//       <div className="bg-white rounded-xl shadow-lg w-11/12 sm:w-3/4 lg:w-1/2 p-6 relative overflow-y-auto max-h-[90vh]">
//         <button
//           onClick={onClose}
//           className="absolute top-3 right-3 text-gray-500 hover:text-black"
//         >
//           ✖
//         </button>

//         <h2 className="text-xl font-bold text-blue-700 mb-3">
//           Complaint Details
//         </h2>

//         <div className="space-y-2 text-sm">
//           <p><strong>Name:</strong> {complainant_name}</p>
//           <p><strong>Police Station:</strong> {police_station}</p>
//           <p><strong>GD Case No.:</strong> {gd_case_no}</p>
//           <p><strong>Relation:</strong> {relation}</p>
//           <p><strong>Profession:</strong> {profession}</p>
//           <p><strong>Phone:</strong> {phone_no}</p>
//           <p><strong>Email:</strong> {email_id}</p>
//           <p><strong>Address:</strong> {present_address}</p>
//           <p><strong>Fraud Amount:</strong> ₹{total_amount}</p>
//           <p><strong>Description:</strong> {fraud_description}</p>
//         </div>

//         {/* Bank Info */}
//         {banks?.length > 0 && (
//           <div className="mt-4">
//             <h3 className="font-semibold text-blue-600 mb-2">
//               Bank Transaction Details
//             </h3>
//             {banks.map((b, i) => (
//               <div key={i} className="border border-gray-200 rounded-lg p-2 mb-2">
//                 <p><strong>Bank:</strong> {b.bank_name}</p>
//                 <p><strong>Account No:</strong> {b.account_no}</p>
//                 <p><strong>IFSC:</strong> {b.ifsc}</p>
//                 {b.transactions?.map((t, j) => (
//                   <div key={j} className="text-xs text-gray-700 ml-3">
//                     • ₹{t.amount} — {t.date} {t.time} ({t.refNo})
//                   </div>
//                 ))}
//               </div>
//             ))}
//           </div>
//         )}

//         {/* Files */}
//         <div className="mt-4">
//           <h3 className="font-semibold text-blue-600 mb-2">Documents</h3>
//           <ul className="space-y-2 text-sm">
//             {files?.aadhaar && (
//               <li>
//                 <a
//                   href={`${apiBase}/uploads/${files.aadhaar}`}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="text-blue-600 hover:underline"
//                 >
//                   Aadhaar
//                 </a>
//               </li>
//             )}
//             {files?.gd_copy && (
//               <li>
//                 <a
//                   href={`${apiBase}/uploads/${files.gd_copy}`}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="text-blue-600 hover:underline"
//                 >
//                   GD Copy
//                 </a>
//               </li>
//             )}
//             {files?.bank_statement && (
//               <li>
//                 <a
//                   href={`${apiBase}/uploads/${files.bank_statement}`}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="text-blue-600 hover:underline"
//                 >
//                   Bank Statement
//                 </a>
//               </li>
//             )}
//             {files?.card_copy && (
//               <li>
//                 <a
//                   href={`${apiBase}/uploads/${files.card_copy}`}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="text-blue-600 hover:underline"
//                 >
//                   Card Copy
//                 </a>
//               </li>
//             )}
//             {files?.other_docs?.length > 0 && (
//               <li>
//                 {files.other_docs.map((f, i) => (
//                   <a
//                     key={i}
//                     href={`${apiBase}/uploads/${f}`}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     className="text-blue-600 hover:underline block"
//                   >
//                     Other Doc {i + 1}
//                   </a>
//                 ))}
//               </li>
//             )}
//           </ul>
//         </div>
//       </div>
//     </div>
//   );
// }


import React from "react";

export default function FilePreviewModal({ complaint, apiBase, onClose }) {
  const {
    complainant_name,
    police_station,
    gd_case_no,
    total_amount,
    fraud_description,
    banks,
    files = {},
  } = complaint;

  const fileEntries = Object.entries(files).filter(
    ([, val]) => val && val.length > 0
  );

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl w-11/12 sm:w-3/4 lg:w-1/2 p-6 relative overflow-y-auto max-h-[90vh] animate-fadeIn border border-gray-100">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 text-xl transition"
          title="Close"
        >
          ✖
        </button>

        {/* Title */}
        <h2 className="text-2xl font-bold text-blue-700 mb-4 text-center border-b pb-2">
          Complaint Details
        </h2>

        {/* Basic Info */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm sm:text-base mb-4">
          <div className="p-3 rounded-lg bg-gray-50 border border-gray-200">
            <p className="font-semibold text-gray-700">Name</p>
            <p>{complainant_name || "—"}</p>
          </div>
          <div className="p-3 rounded-lg bg-gray-50 border border-gray-200">
            <p className="font-semibold text-gray-700">Police Station</p>
            <p>{police_station || "—"}</p>
          </div>
          <div className="p-3 rounded-lg bg-gray-50 border border-gray-200">
            <p className="font-semibold text-gray-700">GD Number</p>
            <p>{gd_case_no || "—"}</p>
          </div>
          <div className="p-3 rounded-lg bg-gray-50 border border-gray-200">
            <p className="font-semibold text-gray-700">Amount Involved</p>
            <p className="font-bold text-green-700">
              ₹{total_amount || "—"}
            </p>
          </div>
        </div>

        {/* Description */}
        {fraud_description && (
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-blue-700 mb-2">
              Fraud Description
            </h3>
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-3 text-gray-800 text-sm sm:text-base leading-relaxed">
              {fraud_description}
            </div>
          </div>
        )}

        {/* Bank Details */}
        {banks?.length > 0 && (
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-blue-700 mb-3">
              Bank Details
            </h3>
            <div className="space-y-3">
              {banks.map((b, i) => (
                <div
                  key={i}
                  className="border border-gray-200 rounded-lg p-3 bg-white shadow-sm hover:shadow-md transition"
                >
                  <p className="font-semibold text-gray-800 mb-1">
                    {b.bank_name || "Bank"} ({b.account_no})
                  </p>
                  <p className="text-sm text-gray-600 mb-2">
                    IFSC: {b.ifsc || "—"}
                  </p>

                  {b.transactions?.length > 0 ? (
                    <div className="border-t border-gray-100 pt-2">
                      <p className="text-sm font-semibold text-gray-700 mb-1">
                        Transactions:
                      </p>
                      <ul className="space-y-1 text-sm text-gray-600">
                        {b.transactions.map((t, j) => (
                          <li
                            key={j}
                            className="flex justify-between items-center bg-gray-50 rounded-md px-2 py-1"
                          >
                            <span>
                              ₹{t.amount} — {t.date} {t.time && `• ${t.time}`}
                            </span>
                            <span className="text-xs text-gray-500">
                              Ref: {t.refNo || "N/A"}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : (
                    <p className="text-sm text-gray-500 italic">
                      No transactions recorded.
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Uploaded Documents */}
        <div>
          <h3 className="text-lg font-semibold text-blue-700 mb-3">
            Uploaded Documents
          </h3>

          {fileEntries.length === 0 ? (
            <p className="text-gray-500 text-sm italic">
              No documents uploaded.
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {fileEntries.map(([key, val], i) => {
                const normalizedKey = key.replace("_", " ");
                if (Array.isArray(val)) {
                  return val.map((file, idx) => (
                    <div
                      key={`${i}-${idx}`}
                      className="flex items-center gap-3 bg-gray-50 border border-gray-200 p-2 rounded-lg"
                    >
                      <span className="w-8 h-8 bg-blue-100 flex items-center justify-center rounded-md text-blue-600 font-bold">
                        📎
                      </span>
                      <a
                        href={`${apiBase}/uploads/${file}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-800 truncate"
                      >
                        {normalizedKey} {idx + 1}
                      </a>
                    </div>
                  ));
                }

                return (
                  <div
                    key={i}
                    className="flex items-center gap-3 bg-gray-50 border border-gray-200 p-2 rounded-lg"
                  >
                    <span className="w-8 h-8 bg-blue-100 flex items-center justify-center rounded-md text-blue-600 font-bold">
                      📎
                    </span>
                    <a
                      href={`${apiBase}/uploads/${val}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 truncate"
                    >
                      {normalizedKey}
                    </a>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
