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

  // Collect all available file fields dynamically
  const fileEntries = Object.entries(files).filter(([key, val]) => val && val.length > 0);

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
      <div className="bg-white rounded-xl shadow-lg w-11/12 sm:w-3/4 lg:w-1/2 p-6 relative overflow-y-auto max-h-[90vh]">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-black text-lg"
        >
          ✖
        </button>

        <h2 className="text-lg sm:text-xl font-bold text-blue-700 mb-3 text-center sm:text-left">
          Complaint Details
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm sm:text-base">
          <p><strong>Name:</strong> {complainant_name}</p>
          <p><strong>Station:</strong> {police_station}</p>
          <p><strong>GD No:</strong> {gd_case_no}</p>
          <p><strong>Amount:</strong> ₹{total_amount}</p>
        </div>

        <div className="mt-4 text-sm sm:text-base">
          <p><strong>Description:</strong> {fraud_description}</p>
        </div>

        {/* Bank Section */}
        {banks?.length > 0 && (
          <div className="mt-4">
            <h3 className="font-semibold text-blue-600 mb-2">Bank Details</h3>
            {banks.map((b, i) => (
              <div
                key={i}
                className="border border-gray-200 rounded-lg p-2 mb-2 text-sm"
              >
                <p><strong>Bank:</strong> {b.bank_name}</p>
                <p><strong>Account:</strong> {b.account_no}</p>
                <p><strong>IFSC:</strong> {b.ifsc}</p>
                {b.transactions?.map((t, j) => (
                  <p key={j} className="text-gray-700 ml-2">
                    • ₹{t.amount} — {t.date} {t.time} ({t.refNo})
                  </p>
                ))}
              </div>
            ))}
          </div>
        )}

        {/* File Section */}
        <div className="mt-4">
          <h3 className="font-semibold text-blue-600 mb-2">Uploaded Documents</h3>
          {fileEntries.length === 0 ? (
            <p className="text-gray-500">No documents uploaded.</p>
          ) : (
            <ul className="space-y-1 text-sm sm:text-base">
              {fileEntries.map(([key, val], i) => {
                // If field is array (like other_docs)
                if (Array.isArray(val)) {
                  return val.map((file, idx) => (
                    <li key={`${i}-${idx}`}>
                      <a
                        href={`${apiBase}/uploads/${file}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline"
                      >
                        {key.replace("_", " ")} {idx + 1}
                      </a>
                    </li>
                  ));
                }
                // If field is single file string
                return (
                  <li key={i}>
                    <a
                      href={`${apiBase}/uploads/${val}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      {key.replace("_", " ")}
                    </a>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
