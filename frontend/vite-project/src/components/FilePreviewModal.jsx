// import React from "react";

// export default function FilePreviewModal({ complaint, apiBase, onClose }) {
//   const {
//     complaint_id,
//     complainant_name,
//     police_station,
//     gd_case_no,
//     total_amount,
//     fraud_description,
//     banks = [],
//     files = {},
//     fraudster_phone,
//     dob,
//     age,
//     sex,
//     present_address,
//     phone_no,
//     email_id,
//     createdAt,
//   } = complaint;

//   const fileEntries = Object.entries(files).filter(
//     ([, v]) => v && v.length > 0
//   );

//   const Section = ({ title, children }) => (
//     <div className="mb-8">
//       <h3 className="text-lg font-bold text-blue-800 tracking-wide mb-3 border-l-4 border-blue-600 pl-3">
//         {title}
//       </h3>
//       <div className="bg-white/70 rounded-xl border border-gray-200 p-4 shadow-sm backdrop-blur">
//         {children}
//       </div>
//     </div>
//   );

//   const Field = ({ label, value }) => (
//     <div>
//       <p className="text-xs uppercase text-gray-500 font-medium tracking-wide">
//         {label}
//       </p>
//       <p className="text-gray-900 font-semibold text-sm mt-1 break-words">
//         {value || "—"}
//       </p>
//     </div>
//   );

//   return (
//     <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50 p-4">
//       <div className="bg-white w-full max-w-3xl rounded-2xl shadow-2xl overflow-y-auto max-h-[92vh] animate-fadeIn border border-gray-100 relative p-6">

//         {/* Close Button */}
//         <button
//           onClick={onClose}
//           className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 text-2xl"
//         >
//           ×
//         </button>

//         {/* HEADER */}
//         <div className="text-center mb-8">
//           <h2 className="text-3xl font-extrabold text-blue-800 tracking-tight">
//             Complaint Details
//           </h2>
//           <p className="text-gray-500 text-sm mt-1">
//             Submitted on {new Date(createdAt).toLocaleString()}
//           </p>
//         </div>

//         {/* Complaint Meta */}
//         <Section title="Complaint Information">
//           <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
//             <Field label="Complaint ID" value={complaint_id} />
//             <Field label="GD Number" value={gd_case_no} />
//             <Field label="Police Station" value={police_station} />
//             <Field label="Fraudster Phone" value={fraudster_phone} />
//             <Field label="Amount Involved" value={`₹${total_amount || "—"}`} />
//           </div>
//         </Section>

//         {/* Personal Info */}
//         <Section title="Complainant Information">
//           <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
//             <Field label="Name" value={complainant_name} />
//             <Field label="Address" value={present_address} />
//             <Field label="Phone No." value={phone_no} />
//             <Field label="Email" value={email_id} />
//             <Field label="Date of Birth" value={dob} />
//             <Field label="Age" value={age} />
//             <Field label="Sex" value={sex} />
//           </div>
//         </Section>

//         {/* Description */}
//         {fraud_description && (
//           <Section title="Fraud Description">
//             <p className="text-gray-800 leading-relaxed whitespace-pre-line text-sm">
//               {fraud_description}
//             </p>
//           </Section>
//         )}

//         {/* Bank Details */}
//         {banks.length > 0 && (
//           <Section title="Bank & Transaction Details">
//             <div className="space-y-4">
//               {banks.map((b, i) => (
//                 <div
//                   key={i}
//                   className="border border-gray-200 rounded-xl p-4 shadow-sm bg-white"
//                 >
//                   <p className="text-md font-bold text-gray-800 mb-1">
//                     {b.bank_name || "Bank"} — {b.account_no}
//                   </p>
//                   <p className="text-xs text-gray-600 mb-3">
//                     IFSC: {b.ifsc || "—"}
//                   </p>

//                   {b.transactions?.length > 0 ? (
//                     <div className="space-y-2">
//                       {b.transactions.map((t, j) => (
//                         <div
//                           key={j}
//                           className="bg-gray-50 border border-gray-200 p-3 rounded-lg flex justify-between"
//                         >
//                           <span className="text-gray-800 text-sm">
//                             ₹{t.amount} — {t.date} {t.time && `• ${t.time}`}
//                           </span>
//                           <span className="text-xs text-gray-500">
//                             Ref: {t.refNo}
//                           </span>
//                         </div>
//                       ))}
//                     </div>
//                   ) : (
//                     <p className="text-sm text-gray-500 italic">
//                       No transactions recorded.
//                     </p>
//                   )}
//                 </div>
//               ))}
//             </div>
//           </Section>
//         )}

//         {/* Documents */}
//         <Section title="Uploaded Documents">
//           {fileEntries.length === 0 ? (
//             <p className="text-gray-500 italic">No files uploaded.</p>
//           ) : (
//             <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
//               {fileEntries.map(([key, val], i) => {
//                 const label = key.replace(/_/g, " ");

//                 if (Array.isArray(val)) {
//                   return val.map((file, idx) => (
//                     <div
//                       key={`${i}-${idx}`}
//                       className="flex items-center gap-3 bg-gray-50 border border-gray-200 p-3 rounded-lg shadow-sm"
//                     >
//                       <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center text-blue-700 text-xl">
//                         📄
//                       </div>
//                       <a
//                         href={`${apiBase}/uploads/${file}`}
//                         target="_blank"
//                         className="text-blue-700 font-medium hover:underline"
//                       >
//                         {label} {idx + 1}
//                       </a>
//                     </div>
//                   ));
//                 }

//                 return (
//                   <div
//                     key={i}
//                     className="flex items-center gap-3 bg-gray-50 border border-gray-200 p-3 rounded-lg shadow-sm"
//                   >
//                     <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center text-blue-700 text-xl">
//                       📄
//                     </div>
//                     <a
//                       href={`${apiBase}/uploads/${val}`}
//                       target="_blank"
//                       className="text-blue-700 font-medium hover:underline"
//                     >
//                       {label}
//                     </a>
//                   </div>
//                 );
//               })}
//             </div>
//           )}
//         </Section>
//       </div>
//     </div>
//   );
// }

// import React, { useState } from "react";
// import axios from "axios";

// export default function FilePreviewModal({ complaint, apiBase, onClose }) {
//   const [editMode, setEditMode] = useState(false);
//   const [form, setForm] = useState({ ...complaint });
//   const files = form.files || {};
//   const banks = form.banks || [];

//   const fileEntries = Object.entries(files).filter(([, v]) => v && v.length > 0);

//   const updateField = (key, val) => {
//     setForm((f) => ({ ...f, [key]: val }));
//   };

//   const updateBank = (i, updatedBank) => {
//     const newBanks = [...banks];
//     newBanks[i] = updatedBank;
//     setForm((f) => ({ ...f, banks: newBanks }));
//   };

//   const saveChanges = async () => {
//     try {
//       await axios.patch(`${apiBase}/api/complaints/${form._id}/update`, form);
//       alert("Changes saved.");
//       setEditMode(false);
//     } catch (err) {
//       alert("Failed to save changes");
//     }
//   };

//   const Section = ({ title, children }) => (
//     <div className="mb-8">
//       <div className="flex justify-between items-center">
//         <h3 className="text-lg font-bold text-blue-800 tracking-wide mb-3 border-l-4 border-blue-600 pl-3">
//           {title}
//         </h3>
//       </div>

//       <div className="bg-white/70 rounded-xl border border-gray-200 p-4 shadow-sm">
//         {children}
//       </div>
//     </div>
//   );

//   const Field = ({ label, value, name }) => (
//     <div>
//       <p className="text-xs uppercase text-gray-500 font-medium tracking-wide">
//         {label}
//       </p>

//       {editMode ? (
//         <input
//           className="mt-1 w-full border rounded-md px-2 py-1 text-sm"
//           value={value || ""}
//           onChange={(e) => updateField(name, e.target.value)}
//         />
//       ) : (
//         <p className="text-gray-900 font-semibold text-sm mt-1 break-words">
//           {value || "—"}
//         </p>
//       )}
//     </div>
//   );

//   return (
//     <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50 p-4">
//       <div className="bg-white w-full max-w-3xl rounded-2xl shadow-2xl overflow-y-auto max-h-[92vh] animate-fadeIn border border-gray-100 relative p-6">

//         {/* Close Button */}
//         <button
//           onClick={onClose}
//           className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 text-2xl"
//         >
//           ×
//         </button>

//         {/* EDIT TOGGLE */}
//         <button
//           onClick={() => setEditMode(!editMode)}
//           className="absolute top-4 left-4 px-4 py-1 rounded-md text-white shadow 
//           transition bg-blue-600 hover:bg-blue-700"
//         >
//           {editMode ? "Cancel Edit" : "Edit"}
//         </button>

//         {/* HEADER */}
//         <div className="text-center mb-8">
//           <h2 className="text-3xl font-extrabold text-blue-800 tracking-tight">
//             Complaint Details
//           </h2>
//           <p className="text-gray-500 text-sm mt-1">
//             Submitted on {new Date(form.createdAt).toLocaleString()}
//           </p>
//         </div>

//         {/* Complaint Info */}
//         <Section title="Complaint Information">
//           <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
//             <Field label="Complaint ID" name="complaint_id" value={form.complaint_id} />
//             <Field label="GD Number" name="gd_case_no" value={form.gd_case_no} />
//             <Field label="Police Station" name="police_station" value={form.police_station} />
//             <Field label="Fraudster Phone" name="fraudster_phone" value={form.fraudster_phone} />
//             <Field label="Amount Involved" name="total_amount" value={form.total_amount} />
//           </div>
//         </Section>

//         {/* Personal Info */}
//         <Section title="Complainant Information">
//           <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
//             <Field label="Name" name="complainant_name" value={form.complainant_name} />
//             <Field label="Address" name="present_address" value={form.present_address} />
//             <Field label="Phone No" name="phone_no" value={form.phone_no} />
//             <Field label="Email" name="email_id" value={form.email_id} />
//             <Field label="DOB" name="dob" value={form.dob} />
//             <Field label="Age" name="age" value={form.age} />
//             <Field label="Sex" name="sex" value={form.sex} />
//           </div>
//         </Section>

//         {/* Description */}
//         <Section title="Fraud Description">
//           {editMode ? (
//             <textarea
//               className="w-full border rounded-md px-3 py-2 text-sm"
//               rows={4}
//               value={form.fraud_description}
//               onChange={(e) => updateField("fraud_description", e.target.value)}
//             />
//           ) : (
//             <p className="text-gray-800 leading-relaxed whitespace-pre-line text-sm">
//               {form.fraud_description}
//             </p>
//           )}
//         </Section>

//         {/* Bank Section */}
//         <Section title="Bank & Transaction Details">
//           <div className="space-y-4">
//             {banks.map((b, i) => (
//               <div key={i} className="border rounded-xl p-4 shadow-sm bg-white">
//                 <Field label="Bank Name" name={`bank_${i}_bank_name`} value={b.bank_name} />
//                 <Field label="Account No" name={`bank_${i}_account_no`} value={b.account_no} />
//                 <Field label="IFSC" name={`bank_${i}_ifsc`} value={b.ifsc} />
//               </div>
//             ))}
//           </div>
//         </Section>

//         {/* Uploaded Documents */}
//         <Section title="Uploaded Documents">
//           {fileEntries.length === 0 ? (
//             <p className="text-gray-500 italic">No files uploaded.</p>
//           ) : (
//             <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
//               {fileEntries.map(([key, val], i) => {
//                 const label = key.replace(/_/g, " ");

//                 return (Array.isArray(val) ? val : [val]).map((file, idx) => (
//                   <div
//                     key={`${i}-${idx}`}
//                     className="flex items-center gap-3 bg-gray-50 border p-3 rounded-lg"
//                   >
//                     <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center text-blue-700 text-xl">
//                       📄
//                     </div>
//                     <a
//                       href={`${apiBase}/uploads/${file}`}
//                       target="_blank"
//                       className="text-blue-700 font-medium hover:underline"
//                     >
//                       {label} {idx + 1}
//                     </a>
//                   </div>
//                 ));
//               })}
//             </div>
//           )}
//         </Section>

//         {/* SAVE BUTTON */}
//         {editMode && (
//           <button
//             onClick={saveChanges}
//             className="w-full py-3 mt-4 bg-green-600 text-white font-bold rounded-xl hover:bg-green-700"
//           >
//             Save Changes
//           </button>
//         )}
//       </div>
//     </div>
//   );
// }


// import React, { useState } from "react";
// import axios from "axios";

// export default function FilePreviewModal({ complaint, apiBase, onClose }) {
//   const [editMode, setEditMode] = useState(false);
//   const [form, setForm] = useState({ ...complaint });

//   const files = form.files || {};
//   const banks = form.banks || [];

//   const fileEntries = Object.entries(files).filter(([, v]) => v && v.length > 0);

//   const updateField = (key, val) => {
//     setForm((f) => ({ ...f, [key]: val }));
//   };

//   const updateBankField = (bankIndex, key, val) => {
//     const updated = [...banks];
//     updated[bankIndex][key] = val;
//     setForm((f) => ({ ...f, banks: updated }));
//   };

//   const updateTransaction = (bankIndex, txIndex, key, val) => {
//     const updated = [...banks];
//     updated[bankIndex].transactions[txIndex][key] = val;
//     setForm((f) => ({ ...f, banks: updated }));
//   };

//   const saveChanges = async () => {
//     try {
//       await axios.patch(`${apiBase}/api/complaints/${form._id}/update`, form);
//       alert("Changes saved.");
//       setEditMode(false);
//     } catch (err) {
//       alert("Failed to save changes");
//     }
//   };

//   const Section = ({ title, children }) => (
//     <div className="mb-8">
//       <h3 className="text-lg font-bold text-blue-800 tracking-wide mb-3 border-l-4 border-blue-600 pl-3">
//         {title}
//       </h3>
//       <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
//         {children}
//       </div>
//     </div>
//   );

//   const Field = ({ label, name, value }) => (
//     <div>
//       <p className="text-xs uppercase text-gray-500 font-medium tracking-wide">
//         {label}
//       </p>

//       {editMode ? (
//         <input
//           className="mt-1 w-full border rounded-md px-2 py-1 text-sm"
//           value={value || ""}
//           onChange={(e) => updateField(name, e.target.value)}
//         />
//       ) : (
//         <p className="text-gray-900 font-semibold text-sm mt-1">{value || "—"}</p>
//       )}
//     </div>
//   );

//   return (
//     <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50 p-4">
//       <div className="bg-white w-full max-w-4xl rounded-2xl shadow-2xl overflow-y-auto max-h-[92vh] p-6 relative">

//         {/* Close Button */}
//         <button onClick={onClose} className="absolute top-4 right-4 text-xl text-gray-600">×</button>

//         {/* Edit Button */}
//         <button
//           onClick={() => setEditMode(!editMode)}
//           className="absolute top-4 left-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-1 rounded-md"
//         >
//           {editMode ? "Cancel Edit" : "Edit"}
//         </button>

//         {/* Header */}
//         <div className="text-center mb-8">
//           <h2 className="text-3xl font-extrabold text-blue-800">Complaint Details</h2>
//           <p className="text-gray-500 text-sm">
//             Submitted: {new Date(form.createdAt).toLocaleString()}
//           </p>
//         </div>

//         {/* Complaint Info */}
//         <Section title="Complaint Information">
//           <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
//             <Field label="Complaint ID" name="complaint_id" value={form.complaint_id} />
//             <Field label="GD Case No." name="gd_case_no" value={form.gd_case_no} />
//             <Field label="Police Station" name="police_station" value={form.police_station} />
//             <Field label="Fraudster Phone" name="fraudster_phone" value={form.fraudster_phone} />
//             <Field label="Amount" name="total_amount" value={form.total_amount} />
//             <Field label="From Date" name="amount_from" value={form.amount_from} />
//             <Field label="To Date" name="amount_to" value={form.amount_to} />
//           </div>
//         </Section>

//         {/* Complainant Info */}
//         <Section title="Complainant Information">
//           <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
//             <Field label="Name" name="complainant_name" value={form.complainant_name} />
//             <Field label="Relation" name="relation" value={form.relation} />
//             <Field label="Profession" name="profession" value={form.profession} />
//             <Field label="Address" name="present_address" value={form.present_address} />
//             <Field label="Phone" name="phone_no" value={form.phone_no} />
//             <Field label="Email" name="email_id" value={form.email_id} />
//             <Field label="DOB" name="dob" value={form.dob} />
//             <Field label="Age" name="age" value={form.age} />
//             <Field label="Sex" name="sex" value={form.sex} />
//           </div>
//         </Section>

//         {/* Fraud Description */}
//         <Section title="Fraud Description">
//           {editMode ? (
//             <textarea
//               className="w-full border rounded-md px-3 py-2 text-sm"
//               rows={4}
//               value={form.fraud_description}
//               onChange={(e) => updateField("fraud_description", e.target.value)}
//             />
//           ) : (
//             <p className="text-gray-700 whitespace-pre-line text-sm">
//               {form.fraud_description}
//             </p>
//           )}
//         </Section>

//         {/* Card Fraud Details (if any) */}
//         {(form.card_holder || form.card_type || form.card_last4 || form.issuing_bank) && (
//           <Section title="Card Fraud Details">
//             <div className="grid grid-cols-2 gap-4">
//               <Field label="Card Holder" name="card_holder" value={form.card_holder} />
//               <Field label="Card Number (16 digits)" name="card_last4" value={form.card_last4} />
//               <Field label="Card Type" name="card_type" value={form.card_type} />
//               <Field label="Issuing Bank" name="issuing_bank" value={form.issuing_bank} />
//             </div>
//           </Section>
//         )}

//         {/* Bank Details */}
//         <Section title="Bank & Transaction Details">
//           <div className="space-y-6">
//             {banks.map((bank, i) => (
//               <div key={i} className="p-4 border rounded-lg shadow-sm bg-gray-50">
//                 <h4 className="font-bold text-gray-800 mb-2">Bank #{i + 1}</h4>

//                 <Field label="Bank Name" name={`bank_${i}_name`} value={bank.bank_name} />
//                 <Field label="Account Number" name={`bank_${i}_acc`} value={bank.account_no} />
//                 <Field label="IFSC" name={`bank_${i}_ifsc`} value={bank.ifsc} />

//                 <h5 className="font-semibold mt-3 text-gray-700">Transactions</h5>
//                 {bank.transactions.map((tx, j) => (
//                   <div key={j} className="mt-2 p-3 bg-white border rounded-lg">
//                     {editMode ? (
//                       <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
//                         <input
//                           value={tx.amount}
//                           onChange={(e) => updateTransaction(i, j, "amount", e.target.value)}
//                           placeholder="Amount"
//                           className="border px-2 py-1 rounded"
//                         />
//                         <input
//                           value={tx.date}
//                           onChange={(e) => updateTransaction(i, j, "date", e.target.value)}
//                           placeholder="Date"
//                           className="border px-2 py-1 rounded"
//                         />
//                         <input
//                           value={tx.time}
//                           onChange={(e) => updateTransaction(i, j, "time", e.target.value)}
//                           placeholder="Time"
//                           className="border px-2 py-1 rounded"
//                         />
//                         <input
//                           value={tx.refNo}
//                           onChange={(e) => updateTransaction(i, j, "refNo", e.target.value)}
//                           placeholder="Ref No"
//                           className="border px-2 py-1 rounded"
//                         />
//                       </div>
//                     ) : (
//                       <p className="text-sm text-gray-700">
//                         ₹{tx.amount} — {tx.date} {tx.time && `• ${tx.time}`}  
//                         <span className="text-gray-500 text-xs ml-2">Ref: {tx.refNo}</span>
//                       </p>
//                     )}
//                   </div>
//                 ))}
//               </div>
//             ))}
//           </div>
//         </Section>

//         {/* Files */}
//         <Section title="Uploaded Files">
//           {fileEntries.length === 0 ? (
//             <p className="text-gray-500 italic">No files uploaded.</p>
//           ) : (
//             <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
//               {fileEntries.map(([key, val], i) => {
//                 const label = key.replace(/_/g, " ");
//                 return (Array.isArray(val) ? val : [val]).map((file, idx) => (
//                   <div key={`${i}-${idx}`} className="flex items-center gap-3 bg-gray-50 border p-3 rounded-lg">
//                     <span className="text-2xl">📎</span>
//                     <a href={`${apiBase}/uploads/${file}`} target="_blank" className="text-blue-700 underline">
//                       {label} {idx + 1}
//                     </a>
//                   </div>
//                 ));
//               })}
//             </div>
//           )}
//         </Section>

//         {/* Save Button */}
//         {editMode && (
//           <button
//             onClick={saveChanges}
//             className="w-full py-3 mt-4 bg-green-600 text-white font-bold rounded-xl hover:bg-green-700"
//           >
//             Save Changes
//           </button>
//         )}
//       </div>
//     </div>
//   );
// }


// import React, { useState } from "react";
// import axios from "axios";

// export default function ComplaintFullView({ complaint, apiBase, onClose }) {
//   const [editMode, setEditMode] = useState(false);
//   const [form, setForm] = useState({ ...complaint });

//   const updateField = (key, value) =>
//     setForm((f) => ({ ...f, [key]: value }));

//   const saveChanges = async () => {
//     try {
//       await axios.patch(`${apiBase}/api/complaints/${form._id}/update`, form);
//       setEditMode(false);
//       alert("Updated successfully");
//     } catch (err) {
//       alert("Failed to save");
//     }
//   };

//   const SectionCard = ({ title, children }) => (
//     <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
//       <h3 className="text-lg font-semibold text-gray-800 mb-4">{title}</h3>
//       {children}
//     </div>
//   );

//   const InfoRow = ({ label, value }) => (
//     <div>
//       <p className="text-xs text-gray-500 uppercase tracking-wide">{label}</p>
//       <p className="font-semibold text-gray-900 text-sm mt-1">
//         {value || "—"}
//       </p>
//     </div>
//   );

//   const EditRow = ({ label, name }) => (
//     <div className="flex flex-col">
//       <span className="text-xs text-gray-500 uppercase tracking-wide">
//         {label}
//       </span>
//       <input
//         name={name}
//         value={form[name] || ""}
//         onChange={(e) => updateField(name, e.target.value)}
//         className="border px-3 py-2 rounded-lg text-sm mt-1"
//       />
//     </div>
//   );

//   return (
//     <div className="fixed inset-0 bg-gray-100 z-50 overflow-y-auto">

//       {/* HEADER BAR */}
//       <div className="sticky top-0 z-50 bg-white border-b shadow-sm px-8 py-4 flex justify-between items-center">
//         <div>
//           <h2 className="text-2xl font-bold text-gray-800">
//             Complaint: {form.complaint_id}
//           </h2>
//           <p className="text-sm text-gray-500">
//             Submitted on {new Date(form.createdAt).toLocaleString()}
//           </p>
//         </div>

//         <div className="flex gap-3">
//           <button
//             onClick={() => window.print()}
//             className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 text-sm"
//           >
//             🖨 Print / PDF
//           </button>

//           <button
//             onClick={() => setEditMode(!editMode)}
//             className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-sm"
//           >
//             {editMode ? "Cancel" : "Edit"}
//           </button>

//           <button
//             onClick={onClose}
//             className="px-4 py-2 rounded-lg bg-red-500 hover:bg-red-600 text-white text-sm"
//           >
//             Close
//           </button>
//         </div>
//       </div>

//       {/* CONTENT WRAPPER */}
//       <div className="max-w-7xl mx-auto px-8 py-10 space-y-10">

//         {/* GRID LAYOUT */}
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

//           {/* LEFT COLUMN */}
//           <div className="space-y-8">

//             <SectionCard title="Complaint Information">
//               <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
//                 {!editMode ? (
//                   <>
//                     <InfoRow label="GD Number" value={form.gd_case_no} />
//                     <InfoRow label="Police Station" value={form.police_station} />
//                     <InfoRow label="Fraud Amount" value={`₹${form.total_amount}`} />
//                     <InfoRow label="Fraudster Phone" value={form.fraudster_phone} />
//                   </>
//                 ) : (
//                   <>
//                     <EditRow label="GD Number" name="gd_case_no" />
//                     <EditRow label="Police Station" name="police_station" />
//                     <EditRow label="Fraud Amount" name="total_amount" />
//                     <EditRow label="Fraudster Phone" name="fraudster_phone" />
//                   </>
//                 )}
//               </div>
//             </SectionCard>

//             <SectionCard title="Fraud Description">
//               {!editMode ? (
//                 <p className="text-gray-800 leading-relaxed whitespace-pre-line">
//                   {form.fraud_description}
//                 </p>
//               ) : (
//                 <textarea
//                   className="w-full border rounded-lg p-3 text-sm"
//                   rows={4}
//                   value={form.fraud_description}
//                   onChange={(e) => updateField("fraud_description", e.target.value)}
//                 />
//               )}
//             </SectionCard>
//           </div>

//           {/* RIGHT COLUMN */}
//           <div className="space-y-8">

//             <SectionCard title="Complainant Information">
//               <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
//                 {!editMode ? (
//                   <>
//                     <InfoRow label="Name" value={form.complainant_name} />
//                     <InfoRow label="Relation" value={form.relation} />
//                     <InfoRow label="Profession" value={form.profession} />
//                     <InfoRow label="Address" value={form.present_address} />
//                     <InfoRow label="Phone" value={form.phone_no} />
//                     <InfoRow label="Email" value={form.email_id} />
//                     <InfoRow label="DOB" value={form.dob} />
//                     <InfoRow label="Age" value={form.age} />
//                     <InfoRow label="Sex" value={form.sex} />
//                   </>
//                 ) : (
//                   <>
//                     <EditRow label="Name" name="complainant_name" />
//                     <EditRow label="Relation" name="relation" />
//                     <EditRow label="Profession" name="profession" />
//                     <EditRow label="Address" name="present_address" />
//                     <EditRow label="Phone" name="phone_no" />
//                     <EditRow label="Email" name="email_id" />
//                     <EditRow label="DOB" name="dob" />
//                     <EditRow label="Age" name="age" />
//                     <EditRow label="Sex" name="sex" />
//                   </>
//                 )}
//               </div>
//             </SectionCard>

//             <SectionCard title="Uploaded Documents">
//               {form.files ? (
//                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//                   {Object.entries(form.files).map(([key, val], idx) => (
//                     (Array.isArray(val) ? val : [val]).map((file, i) => (
//                       <a
//                         key={i}
//                         href={`${apiBase}/uploads/${file}`}
//                         target="_blank"
//                         className="p-3 border rounded-lg bg-gray-50 hover:bg-gray-100 flex items-center gap-2"
//                       >
//                         📄 {key.replace(/_/g, " ")} {i + 1}
//                       </a>
//                     ))
//                   ))}
//                 </div>
//               ) : (
//                 <p className="text-gray-500 italic">No documents uploaded.</p>
//               )}
//             </SectionCard>
//           </div>
//         </div>

//         {/* FULL-WIDTH BANK DETAILS */}
//         <SectionCard title="Bank & Transaction Details">
//           {form.banks?.map((bank, i) => (
//             <div key={i} className="border rounded-lg p-5 bg-gray-50 mb-6">

//               <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
//                 <InfoRow label="Bank Name" value={bank.bank_name} />
//                 <InfoRow label="Account Number" value={bank.account_no} />
//                 <InfoRow label="IFSC" value={bank.ifsc} />
//               </div>

//               <h4 className="text-md font-semibold mt-4">Transactions</h4>
//               <div className="mt-3 space-y-2">
//                 {bank.transactions?.map((t, idx) => (
//                   <div
//                     key={idx}
//                     className="bg-white p-3 rounded-lg border text-sm flex justify-between"
//                   >
//                     <span>
//                       ₹{t.amount} — {t.date} {t.time}
//                     </span>
//                     <span className="text-gray-500 text-xs">
//                       Ref: {t.refNo}
//                     </span>
//                   </div>
//                 ))}
//               </div>

//             </div>
//           ))}
//         </SectionCard>

//         {/* SAVE BUTTON */}
//         {editMode && (
//           <div className="text-right pt-4">
//             <button
//               onClick={saveChanges}
//               className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-bold rounded-lg"
//             >
//               Save Changes
//             </button>
//           </div>
//         )}

//       </div>
//     </div>
//   );
// }


// import React, { useState } from "react";
// import axios from "axios";

// export default function ComplaintFullView({ complaint, apiBase, onClose, refresh }) {
//   const [editMode, setEditMode] = useState(false);
//   const [form, setForm] = useState({ ...complaint });

//   const updateField = (key, value) => setForm((f) => ({ ...f, [key]: value }));

//   const saveChanges = async () => {
//     try {
//       await axios.patch(`${apiBase}/api/complaints/${form._id}/update`, form);
//       setEditMode(false);
//       refresh?.();
//       alert("Updated successfully");
//     } catch (err) {
//       alert("Failed to save");
//     }
//   };

//   // ---------------------------------------
//   // LABEL (consistent UI)
//   // ---------------------------------------
//   const Label = ({ text }) => (
//     <p className="text-[11px] font-bold uppercase tracking-wide text-indigo-700">
//       {text}
//     </p>
//   );

//   // ---------------------------------------
//   // SECTION WRAPPER
//   // ---------------------------------------
//   const SectionCard = ({ title, children }) => (
//     <div className="bg-white border border-indigo-100 rounded-xl p-6 shadow-sm">
//       <h3 className="text-lg font-bold text-indigo-800 mb-4">{title}</h3>
//       {children}
//     </div>
//   );

//   // ---------------------------------------
//   // ROWS
//   // ---------------------------------------
//   const InfoRow = ({ label, value }) => (
//     <div>
//       <Label text={label} />
//       <p className="mt-1 text-gray-900 font-medium text-[15px]">{value || "—"}</p>
//     </div>
//   );

//   const EditRow = ({ label, name }) => (
//     <div>
//       <Label text={label} />
//       <input
//         className="mt-1 w-full px-3 py-2 border rounded-lg bg-indigo-50 text-sm  
//         focus:bg-white focus:ring-2 focus:ring-indigo-400 transition"
//         value={form[name] || ""}
//         onChange={(e) => updateField(name, e.target.value)}
//       />
//     </div>
//   );

//   return (
//     <div className="fixed inset-0 bg-gray-100 z-50 overflow-y-auto">

//       {/* HEADER BAR */}
//       <div className="sticky top-0 bg-white border-b shadow px-8 py-4 flex justify-between items-center">

//         {/* Left */}
//         <div>
//           <h2 className="text-2xl font-bold text-indigo-700">
//             {form.complaint_id}
//           </h2>
//           <p className="text-sm text-gray-500">
//             Submitted on {new Date(form.createdAt).toLocaleString()}
//           </p>
//         </div>

//         {/* Right */}
//         <div className="flex gap-3">

//           {/* BACK BUTTON */}
//           <button
//             onClick={onClose}
//             className="px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 
//             text-white text-sm font-medium"
//           >
//             ← Back
//           </button>

//           {/* PRINT */}
//           <button
//             onClick={() => window.print()}
//             className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 text-sm"
//           >
//             🖨 Print
//           </button>

//           {/* EDIT */}
//           <button
//             onClick={() => setEditMode(!editMode)}
//             className={`px-4 py-2 rounded-lg text-sm text-white font-medium  
//             ${editMode ? "bg-gray-600 hover:bg-gray-700" : "bg-blue-600 hover:bg-blue-700"}`}
//           >
//             {editMode ? "Cancel" : "Edit"}
//           </button>
//         </div>
//       </div>

//       {/* MAIN CONTENT */}
//       <div className="max-w-7xl mx-auto px-8 py-10 space-y-10">

//         {/* GRID 2 columns */}
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

//           {/* LEFT SECTION */}
//           <div className="space-y-8">

//             {/* Complaint Info */}
//             <SectionCard title="Complaint Information">
//               <div className="grid sm:grid-cols-2 gap-6">
//                 {!editMode ? (
//                   <>
//                     <InfoRow label="GD Number" value={form.gd_case_no} />
//                     <InfoRow label="Police Station" value={form.police_station} />
//                     <InfoRow label="Fraud Amount" value={`₹${form.total_amount}`} />
//                     <InfoRow label="Fraudster Phone" value={form.fraudster_phone} />
//                   </>
//                 ) : (
//                   <>
//                     <EditRow label="GD Number" name="gd_case_no" />
//                     <EditRow label="Police Station" name="police_station" />
//                     <EditRow label="Fraud Amount" name="total_amount" />
//                     <EditRow label="Fraudster Phone" name="fraudster_phone" />
//                   </>
//                 )}
//               </div>
//             </SectionCard>

//             {/* Description */}
//             <SectionCard title="Fraud Description">
//               {!editMode ? (
//                 <p className="text-gray-800 leading-relaxed">{form.fraud_description}</p>
//               ) : (
//                 <textarea
//                   className="w-full border rounded-lg p-3 bg-indigo-50 focus:bg-white 
//                     focus:ring-2 focus:ring-indigo-400"
//                   rows={4}
//                   value={form.fraud_description}
//                   onChange={(e) => updateField("fraud_description", e.target.value)}
//                 />
//               )}
//             </SectionCard>
//           </div>

//           {/* RIGHT SECTION */}
//           <div className="space-y-8">

//             {/* Complainant Info */}
//             <SectionCard title="Complainant Information">
//               <div className="grid sm:grid-cols-2 gap-6">
//                 {!editMode ? (
//                   <>
//                     <InfoRow label="Name" value={form.complainant_name} />
//                     <InfoRow label="Relation" value={form.relation} />
//                     <InfoRow label="Profession" value={form.profession} />
//                     <InfoRow label="Address" value={form.present_address} />
//                     <InfoRow label="Phone" value={form.phone_no} />
//                     <InfoRow label="Email" value={form.email_id} />
//                     <InfoRow label="DOB" value={form.dob} />
//                     <InfoRow label="Age" value={form.age} />
//                     <InfoRow label="Sex" value={form.sex} />
//                   </>
//                 ) : (
//                   <>
//                     <EditRow label="Name" name="complainant_name" />
//                     <EditRow label="Relation" name="relation" />
//                     <EditRow label="Profession" name="profession" />
//                     <EditRow label="Address" name="present_address" />
//                     <EditRow label="Phone" name="phone_no" />
//                     <EditRow label="Email" name="email_id" />
//                     <EditRow label="DOB" name="dob" />
//                     <EditRow label="Age" name="age" />
//                     <EditRow label="Sex" name="sex" />
//                   </>
//                 )}
//               </div>
//             </SectionCard>

//             {/* DOCUMENT SECTION */}
//             <SectionCard title="Uploaded Documents">
//               {!form.files ? (
//                 <p className="text-gray-500 italic">No documents available.</p>
//               ) : (
//                 <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
//                   {Object.entries(form.files).map(([key, val]) =>
//                     (Array.isArray(val) ? val : [val]).map((file, i) => (
//                       <a
//                         key={i}
//                         href={`${apiBase}/uploads/${file}`}
//                         target="_blank"
//                         className="group flex items-center gap-3 p-4 border rounded-xl 
//                         bg-indigo-50/50 hover:bg-indigo-100 transition-all shadow-sm hover:shadow-md cursor-pointer"
//                       >
//                         <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-indigo-200 text-indigo-900">
//                           📄
//                         </div>

//                         <div>
//                           <p className="text-sm font-bold text-indigo-800">
//                             {key.replace(/_/g, " ").toUpperCase()}
//                           </p>
//                           <p className="text-xs text-gray-600">Document {i + 1}</p>
//                         </div>

//                         <span className="ml-auto text-indigo-700 font-semibold opacity-0 group-hover:opacity-100 transition">
//                           View →
//                         </span>
//                       </a>
//                     ))
//                   )}
//                 </div>
//               )}
//             </SectionCard>
//           </div>
//         </div>

 
//         {/* BANK & TRANSACTION SECTION */}
// <SectionCard title="Bank & Transaction Details">
//   {form.banks?.length === 0 ? (
//     <p className="text-gray-500 italic">No bank details available.</p>
//   ) : (
//     form.banks.map((bank, i) => (
//       <div
//         key={i}
//         className="rounded-xl border border-indigo-200 bg-white shadow-sm mb-10 overflow-hidden"
//       >
//         {/* BANK HEADER */}
//         <div className="bg-indigo-50 px-6 py-4 flex justify-between items-center border-b border-indigo-200">
//           <h4 className="text-lg font-bold text-indigo-800 flex items-center gap-2">
//             🏦 Bank #{i + 1}
//           </h4>
//           <span className="text-xs font-bold px-3 py-1 rounded-full bg-indigo-200 text-indigo-900">
//             {bank.bank_name || "Unknown Bank"}
//           </span>
//         </div>

//         {/* BANK INFO */}
//         <div className="px-6 py-5 grid grid-cols-1 sm:grid-cols-3 gap-6">
//           <div>
//             <Label text="Bank Name" />
//             <p className="mt-1 text-gray-900 font-semibold">{bank.bank_name}</p>
//           </div>

//           <div>
//             <Label text="Account Number" />
//             <p className="mt-1 text-gray-900 font-semibold">{bank.account_no}</p>
//           </div>

//           <div>
//             <Label text="IFSC Code" />
//             <p className="mt-1 text-gray-900 font-semibold">{bank.ifsc}</p>
//           </div>
//         </div>

//         {/* TRANSACTIONS */}
//         <div className="px-6 pb-6">

//           <h5 className="text-md font-bold text-indigo-700 mb-3">Transactions</h5>

//           {bank.transactions?.length === 0 ? (
//             <p className="text-gray-500 italic">No transactions.</p>
//           ) : (
//             <div className="space-y-3">
//               {bank.transactions.map((t, idx) => (
                
//                 <div
//                   key={idx}
//                   className="flex items-center justify-between bg-gray-50 border border-gray-200 
//                              rounded-xl px-4 py-3 hover:bg-indigo-50 transition"
//                 >
//                   {/* LEFT SIDE */}
//                   <div className="flex flex-col">
//                     <span className="text-green-700 font-bold text-sm">₹{t.amount}</span>

//                     <span className="text-gray-700 text-sm flex items-center gap-1">
//                       📅 {t.date} — ⏱ {t.time}
//                     </span>
//                   </div>

//                   {/* RIGHT SIDE */}
//                   <div className="text-right">
//                     <Label text="Ref No" />
//                     <p className="text-gray-800 font-semibold text-sm">{t.refNo}</p>
//                   </div>
//                 </div>

//               ))}
//             </div>
//           )}
//         </div>
//       </div>
//     ))
//   )}
// </SectionCard>


//         {/* SAVE BUTTON */}
//         {editMode && (
//           <div className="text-right">
//             <button
//               onClick={saveChanges}
//               className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-bold"
//             >
//               Save Changes
//             </button>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }


// import React, { useState } from "react";
// import axios from "axios";

// export default function ComplaintFullView({ complaint, apiBase, onClose, refresh }) {
//   const [editMode, setEditMode] = useState(false);
//   const [form, setForm] = useState({ ...complaint });

//   const updateField = (key, value) => setForm((f) => ({ ...f, [key]: value }));

//   const saveChanges = async () => {
//     try {
//       await axios.patch(`${apiBase}/api/complaints/${form._id}/update`, form);
//       setEditMode(false);
//       refresh?.();
//       alert("Updated successfully");
//     } catch (err) {
//       alert("Failed to save");
//     }
//   };

//   // ---------------------------------------
//   const Label = ({ text }) => (
//     <p className="text-[11px] font-bold uppercase tracking-wide text-indigo-700">
//       {text}
//     </p>
//   );

//   const SectionCard = ({ title, children }) => (
//     <div className="bg-white border border-indigo-100 rounded-xl p-6 shadow-sm">
//       <h3 className="text-lg font-bold text-indigo-800 mb-4">{title}</h3>
//       {children}
//     </div>
//   );

//   const InfoRow = ({ label, value }) => (
//     <div>
//       <Label text={label} />
//       <p className="mt-1 text-gray-900 font-medium text-[15px]">{value || "—"}</p>
//     </div>
//   );

//   const EditRow = ({ label, name }) => (
//     <div>
//       <Label text={label} />
//       <input
//         className="mt-1 w-full px-3 py-2 border rounded-lg bg-indigo-50 text-sm  
//         focus:bg-white focus:ring-2 focus:ring-indigo-400 transition"
//         value={form[name] || ""}
//         onChange={(e) => updateField(name, e.target.value)}
//       />
//     </div>
//   );

//   return (
//     <div className="fixed inset-0 bg-gray-100 z-50 overflow-y-auto">

//       {/* HEADER BAR */}
//       <div className="sticky top-0 bg-white border-b shadow px-8 py-4 flex justify-between items-center">
//         <div>
//           <h2 className="text-2xl font-bold text-indigo-700">{form.complaint_id}</h2>
//           <p className="text-sm text-gray-500">
//             Submitted on {new Date(form.createdAt).toLocaleString()}
//           </p>
//         </div>

//         <div className="flex gap-3">
//           <button
//             onClick={onClose}
//             className="px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium"
//           >
//             ← Back
//           </button>

//           <button
//             onClick={() => window.print()}
//             className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 text-sm"
//           >
//             🖨 Print
//           </button>

//           <button
//             onClick={() => setEditMode(!editMode)}
//             className={`px-4 py-2 rounded-lg text-sm text-white font-medium  
//             ${editMode ? "bg-gray-600 hover:bg-gray-700" : "bg-blue-600 hover:bg-blue-700"}`}
//           >
//             {editMode ? "Cancel" : "Edit"}
//           </button>
//         </div>
//       </div>

//       {/* MAIN CONTENT */}
//       <div className="max-w-7xl mx-auto px-8 py-10 space-y-10">

//         {/* GRID */}
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

//           {/* LEFT SIDE */}
//           <div className="space-y-8">

//             {/* Complaint Info */}
//             <SectionCard title="Complaint Information">
//               <div className="grid sm:grid-cols-2 gap-6">
//                 {!editMode ? (
//                   <>
//                     <InfoRow label="GD Number" value={form.gd_case_no} />
//                     <InfoRow label="Police Station" value={form.police_station} />
//                     <InfoRow label="Fraud Amount" value={`₹${form.total_amount}`} />
//                     <InfoRow label="Fraudster Phone" value={form.fraudster_phone} />
//                   </>
//                 ) : (
//                   <>
//                     <EditRow label="GD Number" name="gd_case_no" />
//                     <EditRow label="Police Station" name="police_station" />
//                     <EditRow label="Fraud Amount" name="total_amount" />
//                     <EditRow label="Fraudster Phone" name="fraudster_phone" />
//                   </>
//                 )}
//               </div>
//             </SectionCard>

//             {/* Fraud Description */}
//             <SectionCard title="Fraud Description">
//               {!editMode ? (
//                 <p className="text-gray-800 leading-relaxed">{form.fraud_description}</p>
//               ) : (
//                 <textarea
//                   className="w-full border rounded-lg p-3 bg-indigo-50 focus:bg-white 
//                   focus:ring-2 focus:ring-indigo-400"
//                   rows={4}
//                   value={form.fraud_description}
//                   onChange={(e) => updateField("fraud_description", e.target.value)}
//                 />
//               )}
//             </SectionCard>
//           </div>

//           {/* RIGHT SIDE */}
//           <div className="space-y-8">

//             {/* Complainant Info */}
//             <SectionCard title="Complainant Information">
//               <div className="grid sm:grid-cols-2 gap-6">
//                 {!editMode ? (
//                   <>
//                     <InfoRow label="Name" value={form.complainant_name} />
//                     <InfoRow label="Relation" value={form.relation} />
//                     <InfoRow label="Profession" value={form.profession} />
//                     <InfoRow label="Address" value={form.present_address} />
//                     <InfoRow label="Phone" value={form.phone_no} />
//                     <InfoRow label="Email" value={form.email_id} />
//                     <InfoRow label="DOB" value={form.dob} />
//                     <InfoRow label="Age" value={form.age} />
//                     <InfoRow label="Sex" value={form.sex} />
//                   </>
//                 ) : (
//                   <>
//                     <EditRow label="Name" name="complainant_name" />
//                     <EditRow label="Relation" name="relation" />
//                     <EditRow label="Profession" name="profession" />
//                     <EditRow label="Address" name="present_address" />
//                     <EditRow label="Phone" name="phone_no" />
//                     <EditRow label="Email" name="email_id" />
//                     <EditRow label="DOB" name="dob" />
//                     <EditRow label="Age" name="age" />
//                     <EditRow label="Sex" name="sex" />
//                   </>
//                 )}
//               </div>
//             </SectionCard>

//           </div>
//         </div>

//         {/* BANK & TRANSACTION SECTION (READ-ONLY ALWAYS) */}
//         <SectionCard title="Bank & Transaction Details">
//           {form.banks?.length === 0 ? (
//             <p className="text-gray-500 italic">No bank details available.</p>
//           ) : (
//             form.banks.map((bank, i) => (
//               <div
//                 key={i}
//                 className="rounded-xl border border-indigo-200 bg-white shadow-sm mb-10 overflow-hidden"
//               >
//                 <div className="bg-indigo-50 px-6 py-4 flex justify-between items-center border-b border-indigo-200">
//                   <h4 className="text-lg font-bold text-indigo-800 flex items-center gap-2">
//                     🏦 Bank #{i + 1}
//                   </h4>
//                   <span className="text-xs font-bold px-3 py-1 rounded-full bg-indigo-200 text-indigo-900">
//                     {bank.bank_name || "Unknown Bank"}
//                   </span>
//                 </div>

//                 <div className="px-6 py-5 grid grid-cols-1 sm:grid-cols-3 gap-6">
//                   <InfoRow label="Bank Name" value={bank.bank_name} />
//                   <InfoRow label="Account Number" value={bank.account_no} />
//                   <InfoRow label="IFSC Code" value={bank.ifsc} />
//                 </div>

//                 <div className="px-6 pb-6">
//                   <h5 className="text-md font-bold text-indigo-700 mb-3">Transactions</h5>

//                   {bank.transactions?.length === 0 ? (
//                     <p className="text-gray-500 italic">No transactions.</p>
//                   ) : (
//                     <div className="space-y-3">
//                       {bank.transactions.map((t, idx) => (
//                         <div
//                           key={idx}
//                           className="flex items-center justify-between bg-gray-50 border border-gray-200 
//                           rounded-xl px-4 py-3 hover:bg-indigo-50 transition"
//                         >
//                           <div className="flex flex-col">
//                             <span className="text-green-700 font-bold text-sm">₹{t.amount}</span>
//                             <span className="text-gray-700 text-sm flex items-center gap-1">
//                               📅 {t.date} — ⏱ {t.time}
//                             </span>
//                           </div>

//                           <div className="text-right">
//                             <Label text="Ref No" />
//                             <p className="text-gray-800 font-semibold text-sm">{t.refNo}</p>
//                           </div>
//                         </div>
//                       ))}
//                     </div>
//                   )}
//                 </div>
//               </div>
//             ))
//           )}
//         </SectionCard>

//         {/* DOCUMENT SECTION — MOVED TO BOTTOM */}
//         <SectionCard title="Uploaded Documents">
//           {!form.files ? (
//             <p className="text-gray-500 italic">No documents available.</p>
//           ) : (
//             <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
//               {Object.entries(form.files).map(([key, val]) =>
//                 (Array.isArray(val) ? val : [val]).map((file, i) => (
//                   <a
//                     key={i}
//                     href={`${apiBase}/uploads/${file}`}
//                     target="_blank"
//                     className="group flex items-center gap-3 p-4 border rounded-xl 
//                     bg-indigo-50/50 hover:bg-indigo-100 transition-all shadow-sm hover:shadow-md cursor-pointer"
//                   >
//                     <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-indigo-200 text-indigo-900">
//                       📄
//                     </div>

//                     <div>
//                       <p className="text-sm font-bold text-indigo-800">
//                         {key.replace(/_/g, " ").toUpperCase()}
//                       </p>
//                       <p className="text-xs text-gray-600">Document {i + 1}</p>
//                     </div>

//                     <span className="ml-auto text-indigo-700 font-semibold opacity-0 group-hover:opacity-100 transition">
//                       View →
//                     </span>
//                   </a>
//                 ))
//               )}
//             </div>
//           )}
//         </SectionCard>

//         {/* SAVE */}
//         {editMode && (
//           <div className="text-right">
//             <button
//               onClick={saveChanges}
//               className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-bold"
//             >
//               Save Changes
//             </button>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }


// import React, { useState } from "react";
// import axios from "axios";

// /**
//  * ComplaintFullView (UI-upgrade T3-A)
//  * - Keeps your exact layout & order
//  * - Improves visual design: colorful chips, icons, spacing, hover/focus micro-animations
//  * - Bank & transaction remain inline-editable (editMode)
//  * - Documents remain at bottom
//  *
//  * Note: This file assumes Tailwind CSS is available (same utility classes as before).
//  */

// export default function ComplaintFullView({ complaint, apiBase, onClose, refresh }) {
//   const [editMode, setEditMode] = useState(false);
//   // deep clone initial complaint to edit safely
//   const [form, setForm] = useState(
//     complaint ? JSON.parse(JSON.stringify(complaint)) : {}
//   );
//   const [saving, setSaving] = useState(false);

//   const updateField = (key, value) => setForm((f) => ({ ...f, [key]: value }));

//   // -------------------------
//   // BANK / TRANSACTION HELPERS
//   // -------------------------
//   const addBank = () => {
//     setForm((f) => ({
//       ...f,
//       banks: [
//         ...(f.banks || []),
//         { bank_name: "", account_no: "", ifsc: "", transactions: [] },
//       ],
//     }));
//   };

//   const removeBank = (bankIndex) => {
//     setForm((f) => ({
//       ...f,
//       banks: (f.banks || []).filter((_, i) => i !== bankIndex),
//     }));
//   };

//   const updateBankField = (bankIndex, key, value) => {
//     setForm((f) => {
//       const banks = [...(f.banks || [])];
//       banks[bankIndex] = { ...banks[bankIndex], [key]: value };
//       return { ...f, banks };
//     });
//   };

//   const addTransaction = (bankIndex) => {
//     setForm((f) => {
//       const banks = [...(f.banks || [])];
//       const bank = { ...(banks[bankIndex] || { transactions: [] }) };
//       bank.transactions = [
//         ...(bank.transactions || []),
//         { amount: "", date: "", time: "", refNo: "" },
//       ];
//       banks[bankIndex] = bank;
//       return { ...f, banks };
//     });
//   };

//   const removeTransaction = (bankIndex, txIndex) => {
//     setForm((f) => {
//       const banks = [...(f.banks || [])];
//       const bank = { ...(banks[bankIndex] || { transactions: [] }) };
//       bank.transactions = bank.transactions.filter((_, i) => i !== txIndex);
//       banks[bankIndex] = bank;
//       return { ...f, banks };
//     });
//   };

//   const updateTransactionField = (bankIndex, txIndex, key, value) => {
//     setForm((f) => {
//       const banks = [...(f.banks || [])];
//       const bank = { ...(banks[bankIndex] || { transactions: [] }) };
//       const transactions = [...(bank.transactions || [])];
//       transactions[txIndex] = { ...transactions[txIndex], [key]: value };
//       bank.transactions = transactions;
//       banks[bankIndex] = bank;
//       return { ...f, banks };
//     });
//   };

//   // -------------------------
//   // SAVE
//   // -------------------------
//   const saveChanges = async () => {
//     try {
//       setSaving(true);
//       await axios.patch(`${apiBase}/api/complaints/${form._id}/update`, form);
//       setEditMode(false);
//       refresh?.();
//       // small non-blocking success
//       alert("Updated successfully");
//     } catch (err) {
//       console.error(err);
//       alert("Failed to save. See console.");
//     } finally {
//       setSaving(false);
//     }
//   };

//   // -------------------------
//   // UI helpers (icons + label)
//   // -------------------------
//   const Label = ({ icon, text, color = "text-indigo-700" }) => (
//     <div className="flex items-center gap-2">
//       <span className={`${color} text-[15px]`}>{icon}</span>
//       <p className="text-[12px] font-semibold uppercase tracking-wide text-gray-600">
//         {text}
//       </p>
//     </div>
//   );

//   const SectionCard = ({ title, children, actions }) => (
//     <div className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm hover:shadow-md transition-transform transform hover:-translate-y-0.5">
//       <div className="flex items-center justify-between mb-4">
//         <h3 className="text-lg font-bold text-slate-800">{title}</h3>
//         {actions}
//       </div>
//       {children}
//     </div>
//   );

//   // small chip helper
//   const Chip = ({ text, tone = "blue" }) => {
//     const bg =
//       tone === "green"
//         ? "bg-emerald-100 text-emerald-800"
//         : tone === "red"
//         ? "bg-rose-100 text-rose-800"
//         : tone === "yellow"
//         ? "bg-amber-100 text-amber-800"
//         : "bg-sky-100 text-sky-800";
//     return (
//       <span
//         className={`${bg} text-xs font-semibold px-3 py-1 rounded-full inline-flex items-center gap-2`}
//       >
//         <span className="text-sm">●</span> {text}
//       </span>
//     );
//   };

//   const banks = form.banks || [];

//   return (
//     <div className="fixed inset-0 bg-gray-50 z-50 overflow-y-auto">
//       {/* HEADER */}
//       <div className="sticky top-0 bg-white border-b shadow px-6 py-4 flex justify-between items-center z-40">
//         <div>
//           <h2 className="text-2xl font-extrabold text-sky-700">
//             {form.complaint_id || "—"}
//           </h2>
//           <p className="text-sm text-slate-500">
//             Submitted on{" "}
//             {form.createdAt ? new Date(form.createdAt).toLocaleString() : "—"}
//           </p>
//         </div>

//         <div className="flex gap-3 items-center">
//           <button
//             onClick={onClose}
//             className="px-3 py-2 rounded-md bg-sky-600 hover:bg-sky-700 text-white text-sm shadow-sm"
//             type="button"
//           >
//             ← Back
//           </button>

//           <button
//             onClick={() => window.print()}
//             className="px-3 py-2 rounded-md bg-white border hover:shadow-sm text-sm"
//             type="button"
//           >
//             🖨 Print
//           </button>

//           <button
//             onClick={() => {
//               // toggles edit mode, do not auto-revert here
//               setEditMode((s) => !s);
//             }}
//             className={`px-3 py-2 rounded-md text-sm text-white font-medium ${
//               editMode ? "bg-rose-600 hover:bg-rose-700" : "bg-sky-600 hover:bg-sky-700"
//             } shadow-sm`}
//             type="button"
//           >
//             {editMode ? "Cancel" : "Edit"}
//           </button>
//         </div>
//       </div>

//       {/* BODY */}
//       <div className="max-w-7xl mx-auto px-6 py-8 space-y-10">

//         {/* top grid: complaint info + complainant */}
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//           {/* Complaint Info */}
//           <SectionCard
//             title="Complaint Information"
//             actions={
//               <div className="text-sm text-slate-500 flex items-center gap-3">
//                 <span className="flex items-center gap-1">
//                   <span className="text-slate-400">📄</span>
//                   <span>ID</span>
//                 </span>
//                 <span className="flex items-center gap-1">
//                   <span className="text-slate-400">🕒</span>
//                   <span>{form.createdAt ? form.createdAt.slice(0, 10) : "—"}</span>
//                 </span>
//               </div>
//             }
//           >
//             <div className="grid sm:grid-cols-2 gap-4">
//               {/* GD Number */}
//               <div>
//                 <Label icon={"📝"} text={"GD Number"} color="text-sky-600" />
//                 {editMode ? (
//                   <input
//                     value={form.gd_case_no || ""}
//                     onChange={(e) => updateField("gd_case_no", e.target.value)}
//                     className="mt-1 w-full px-3 py-2 border rounded-md bg-sky-50 focus:bg-white focus:ring-2 focus:ring-sky-200"
//                   />
//                 ) : (
//                   <p className="mt-1 text-slate-800 font-medium">{form.gd_case_no || "—"}</p>
//                 )}
//               </div>

//               {/* Police Station */}
//               <div>
//                 <Label icon={"📍"} text={"Police Station"} color="text-amber-600" />
//                 {editMode ? (
//                   <input
//                     value={form.police_station || ""}
//                     onChange={(e) => updateField("police_station", e.target.value)}
//                     className="mt-1 w-full px-3 py-2 border rounded-md bg-amber-50 focus:bg-white focus:ring-2 focus:ring-amber-200"
//                   />
//                 ) : (
//                   <p className="mt-1 text-slate-800 font-medium">{form.police_station || "—"}</p>
//                 )}
//               </div>

//               {/* Amount */}
//               <div>
//                 <Label icon={"💰"} text={"Fraud Amount"} color="text-emerald-600" />
//                 {editMode ? (
//                   <input
//                     type="number"
//                     value={form.total_amount ?? ""}
//                     onChange={(e) => updateField("total_amount", e.target.value)}
//                     className="mt-1 w-full px-3 py-2 border rounded-md bg-emerald-50 focus:bg-white focus:ring-2 focus:ring-emerald-200"
//                   />
//                 ) : (
//                   <p className="mt-1 text-slate-900 font-bold text-lg">
//                     ₹{form.total_amount?.toLocaleString() || 0}
//                   </p>
//                 )}
//               </div>

//               {/* Fraudster phone */}
//               <div>
//                 <Label icon={"📞"} text={"Fraudster Phone"} color="text-rose-600" />
//                 {editMode ? (
//                   <input
//                     value={form.fraudster_phone || ""}
//                     onChange={(e) => updateField("fraudster_phone", e.target.value)}
//                     className="mt-1 w-full px-3 py-2 border rounded-md bg-rose-50 focus:bg-white focus:ring-2 focus:ring-rose-200"
//                   />
//                 ) : (
//                   <p className="mt-1 text-slate-800 font-medium">{form.fraudster_phone || "—"}</p>
//                 )}
//               </div>
//             </div>
//           </SectionCard>

//           {/* Complainant Info */}
//           <SectionCard title="Complainant Information">
//             <div className="grid sm:grid-cols-2 gap-4">
//               <div>
//                 <Label icon={"👤"} text={"Name"} color="text-sky-600" />
//                 <input
//                   value={form.complainant_name || ""}
//                   onChange={(e) => updateField("complainant_name", e.target.value)}
//                   className={`mt-1 w-full px-3 py-2 border rounded-md ${
//                     editMode ? "bg-sky-50 focus:bg-white focus:ring-2 focus:ring-sky-200" : "bg-white"
//                   }`}
//                   readOnly={!editMode}
//                 />
//               </div>

//               <div>
//                 <Label icon={"🧑‍🤝‍🧑"} text={"Relation"} color="text-indigo-600" />
//                 <input
//                   value={form.relation || ""}
//                   onChange={(e) => updateField("relation", e.target.value)}
//                   className={`mt-1 w-full px-3 py-2 border rounded-md ${
//                     editMode ? "bg-indigo-50 focus:bg-white focus:ring-2 focus:ring-indigo-200" : "bg-white"
//                   }`}
//                   readOnly={!editMode}
//                 />
//               </div>

//               <div>
//                 <Label icon={"💼"} text={"Profession"} color="text-violet-600" />
//                 <input
//                   value={form.profession || ""}
//                   onChange={(e) => updateField("profession", e.target.value)}
//                   className={`mt-1 w-full px-3 py-2 border rounded-md ${
//                     editMode ? "bg-violet-50 focus:bg-white focus:ring-2 focus:ring-violet-200" : "bg-white"
//                   }`}
//                   readOnly={!editMode}
//                 />
//               </div>

//               <div>
//                 <Label icon={"🏠"} text={"Present Address"} color="text-slate-600" />
//                 <textarea
//                   value={form.present_address || ""}
//                   onChange={(e) => updateField("present_address", e.target.value)}
//                   className={`mt-1 w-full px-3 py-2 border rounded-md resize-none ${
//                     editMode ? "bg-slate-50 focus:bg-white focus:ring-2 focus:ring-slate-200" : "bg-white"
//                   }`}
//                   rows={2}
//                   readOnly={!editMode}
//                 />
//               </div>

//               <div>
//                 <Label icon={"📱"} text={"Phone"} color="text-sky-600" />
//                 <input
//                   value={form.phone_no || ""}
//                   onChange={(e) => updateField("phone_no", e.target.value)}
//                   className={`mt-1 w-full px-3 py-2 border rounded-md ${
//                     editMode ? "bg-sky-50 focus:bg-white focus:ring-2 focus:ring-sky-200" : "bg-white"
//                   }`}
//                   readOnly={!editMode}
//                 />
//               </div>

//               <div>
//                 <Label icon={"📧"} text={"Email"} color="text-slate-700" />
//                 <input
//                   value={form.email_id || ""}
//                   onChange={(e) => updateField("email_id", e.target.value)}
//                   className={`mt-1 w-full px-3 py-2 border rounded-md ${
//                     editMode ? "bg-slate-50 focus:bg-white focus:ring-2 focus:ring-slate-200" : "bg-white"
//                   }`}
//                   readOnly={!editMode}
//                 />
//               </div>

//               <div>
//                 <Label icon={"🎂"} text={"DOB"} color="text-amber-600" />
//                 <input
//                   type="date"
//                   value={form.dob || ""}
//                   onChange={(e) => updateField("dob", e.target.value)}
//                   className={`mt-1 w-full px-3 py-2 border rounded-md ${
//                     editMode ? "bg-amber-50 focus:bg-white focus:ring-2 focus:ring-amber-200" : "bg-white"
//                   }`}
//                   readOnly={!editMode}
//                 />
//               </div>

//               <div>
//                 <Label icon={"🔢"} text={"Age"} color="text-emerald-600" />
//                 <input
//                   type="number"
//                   min="0"
//                   value={form.age || ""}
//                   onChange={(e) => updateField("age", e.target.value)}
//                   className={`mt-1 w-full px-3 py-2 border rounded-md ${
//                     editMode ? "bg-emerald-50 focus:bg-white focus:ring-2 focus:ring-emerald-200" : "bg-white"
//                   }`}
//                   readOnly={!editMode}
//                 />
//               </div>

//               <div>
//                 <Label icon={"⚧️"} text={"Sex"} color="text-indigo-600" />
//                 <select
//                   value={form.sex || ""}
//                   onChange={(e) => updateField("sex", e.target.value)}
//                   className={`mt-1 w-full px-3 py-2 border rounded-md ${
//                     editMode ? "bg-indigo-50 focus:bg-white focus:ring-2 focus:ring-indigo-200" : "bg-white"
//                   }`}
//                   disabled={!editMode}
//                 >
//                   <option value="">Select</option>
//                   <option value="Male">Male</option>
//                   <option value="Female">Female</option>
//                   <option value="Other">Other</option>
//                 </select>
//               </div>
//             </div>
//           </SectionCard>
//         </div>

//         {/* Fraud Description - editable */}
//         <SectionCard title="Fraud Description">
//           <div>
//             <Label icon={"📝"} text={"Details"} color="text-slate-600" />
//             <textarea
//               value={form.fraud_description || ""}
//               onChange={(e) => updateField("fraud_description", e.target.value)}
//               className={`mt-2 w-full px-3 py-3 border rounded-md resize-none ${
//                 editMode ? "bg-slate-50 focus:bg-white focus:ring-2 focus:ring-slate-200" : "bg-white"
//               }`}
//               rows={5}
//               readOnly={!editMode}
//             />
//           </div>
//         </SectionCard>

//         {/* BANK & TRANSACTION (INLINE EDITING in editMode) */}
//         <SectionCard
//           title="Bank & Transaction Details"
//           actions={
//             editMode ? (
//               <div className="flex items-center gap-2">
//                 <button
//                   onClick={addBank}
//                   className="px-3 py-2 text-sm bg-sky-600 hover:bg-sky-700 text-white rounded-md shadow-sm"
//                   type="button"
//                 >
//                   + Add Bank
//                 </button>
//               </div>
//             ) : null
//           }
//         >
//           {banks.length === 0 ? (
//             <p className="text-gray-500 italic">No bank details available.</p>
//           ) : (
//             banks.map((bank, i) => (
//               <div
//                 key={i}
//                 className="mb-6 rounded-lg border border-gray-100 overflow-hidden bg-white"
//               >
//                 {/* Bank header */}
//                 <div className="flex items-center justify-between px-4 py-3 bg-gradient-to-r from-sky-50 to-white border-b">
//                   <div className="flex items-center gap-3">
//                     <span className="text-2xl">🏦</span>
//                     <div>
//                       <div className="text-sm text-sky-900 font-bold">Bank #{i + 1}</div>
//                       <div className="text-xs text-slate-500">{bank.bank_name || "Unnamed Bank"}</div>
//                     </div>
//                   </div>

//                   <div className="flex items-center gap-2">
//                     {editMode && (
//                       <button
//                         onClick={() => removeBank(i)}
//                         className="text-sm px-2 py-1 bg-rose-100 text-rose-700 rounded-md"
//                         title="Remove bank"
//                         type="button"
//                       >
//                         Remove
//                       </button>
//                     )}
//                     {/* show bank chip */}
//                     {bank.bank_name ? <Chip text={bank.bank_name} tone="blue" /> : null}
//                   </div>
//                 </div>

//                 {/* Bank fields */}
//                 <div className="px-4 py-4 grid sm:grid-cols-3 gap-4">
//                   <div>
//                     <Label icon={"🏷️"} text={"Bank Name"} color="text-sky-600" />
//                     {editMode ? (
//                       <input
//                         value={bank.bank_name || ""}
//                         onChange={(e) => updateBankField(i, "bank_name", e.target.value)}
//                         className="mt-1 w-full px-3 py-2 border rounded-md bg-sky-50 focus:bg-white"
//                       />
//                     ) : (
//                       <p className="mt-1 font-medium text-slate-800">{bank.bank_name || "—"}</p>
//                     )}
//                   </div>

//                   <div>
//                     <Label icon={"💳"} text={"Account Number"} color="text-indigo-600" />
//                     {editMode ? (
//                       <input
//                         value={bank.account_no || ""}
//                         onChange={(e) => updateBankField(i, "account_no", e.target.value)}
//                         className="mt-1 w-full px-3 py-2 border rounded-md bg-indigo-50 focus:bg-white"
//                       />
//                     ) : (
//                       <p className="mt-1 font-medium text-slate-800">{bank.account_no || "—"}</p>
//                     )}
//                   </div>

//                   <div>
//                     <Label icon={"🔢"} text={"IFSC"} color="text-amber-600" />
//                     {editMode ? (
//                       <input
//                         value={bank.ifsc || ""}
//                         onChange={(e) => updateBankField(i, "ifsc", e.target.value)}
//                         className="mt-1 w-full px-3 py-2 border rounded-md bg-amber-50 focus:bg-white"
//                       />
//                     ) : (
//                       <p className="mt-1 font-medium text-slate-800">{bank.ifsc || "—"}</p>
//                     )}
//                   </div>
//                 </div>

//                 {/* Transactions */}
//                 <div className="px-4 pb-4">
//                   <div className="flex items-center justify-between mb-3">
//                     <div className="text-sm font-bold text-sky-700">Transactions</div>
//                     {editMode && (
//                       <div className="flex gap-2">
//                         <button
//                           onClick={() => addTransaction(i)}
//                           className="px-3 py-2 bg-emerald-600 text-white rounded-md text-sm shadow-sm"
//                           type="button"
//                         >
//                           + Add Tx
//                         </button>
//                       </div>
//                     )}
//                   </div>

//                   {(!bank.transactions || bank.transactions.length === 0) ? (
//                     <p className="text-gray-500 italic">No transactions.</p>
//                   ) : (
//                     <div className="space-y-3">
//                       {bank.transactions.map((tx, txIndex) => (
//                         <div
//                           key={txIndex}
//                           className="grid grid-cols-1 md:grid-cols-12 gap-2 items-center bg-slate-50 border border-slate-100 rounded-md px-3 py-2"
//                         >
//                           {/* Amount */}
//                           <div className="md:col-span-2">
//                             <Label icon={"💸"} text={"Amount"} color="text-emerald-600" />
//                             {editMode ? (
//                               <input
//                                 type="number"
//                                 value={tx.amount || ""}
//                                 onChange={(e) => updateTransactionField(i, txIndex, "amount", e.target.value)}
//                                 className="mt-1 w-full px-2 py-1 border rounded-md bg-white"
//                               />
//                             ) : (
//                               <div className="mt-1 font-semibold text-emerald-700">₹{tx.amount || 0}</div>
//                             )}
//                           </div>

//                           {/* Date */}
//                           <div className="md:col-span-3">
//                             <Label icon={"📅"} text={"Date"} color="text-indigo-600" />
//                             {editMode ? (
//                               <input
//                                 type="date"
//                                 value={tx.date || ""}
//                                 onChange={(e) => updateTransactionField(i, txIndex, "date", e.target.value)}
//                                 className="mt-1 w-full px-2 py-1 border rounded-md bg-white"
//                               />
//                             ) : (
//                               <div className="mt-1 text-slate-700">{tx.date || "—"}</div>
//                             )}
//                           </div>

//                           {/* Time */}
//                           <div className="md:col-span-2">
//                             <Label icon={"⏱️"} text={"Time"} color="text-slate-600" />
//                             {editMode ? (
//                               <input
//                                 type="time"
//                                 value={tx.time || ""}
//                                 onChange={(e) => updateTransactionField(i, txIndex, "time", e.target.value)}
//                                 className="mt-1 w-full px-2 py-1 border rounded-md bg-white"
//                               />
//                             ) : (
//                               <div className="mt-1 text-slate-700">{tx.time || "—"}</div>
//                             )}
//                           </div>

//                           {/* RefNo */}
//                           <div className="md:col-span-4">
//                             <Label icon={"🧾"} text={"Reference No"} color="text-indigo-700" />
//                             {editMode ? (
//                               <input
//                                 value={tx.refNo || ""}
//                                 onChange={(e) => updateTransactionField(i, txIndex, "refNo", e.target.value)}
//                                 className="mt-1 w-full px-2 py-1 border rounded-md bg-white"
//                               />
//                             ) : (
//                               <div className="mt-1 text-slate-700">{tx.refNo || "—"}</div>
//                             )}
//                           </div>

//                           {/* Actions */}
//                           <div className="md:col-span-1 flex items-center justify-end gap-2">
//                             {editMode && (
//                               <button
//                                 onClick={() => removeTransaction(i, txIndex)}
//                                 className="text-sm px-2 py-1 bg-rose-100 text-rose-700 rounded-md"
//                                 title="Remove transaction"
//                                 type="button"
//                               >
//                                 Remove
//                               </button>
//                             )}
//                           </div>
//                         </div>
//                       ))}
//                     </div>
//                   )}
//                 </div>
//               </div>
//             ))
//           )}
//         </SectionCard>

//         {/* DOCUMENTS at bottom */}
//         <SectionCard title="Uploaded Documents">
//           {!form.files ? (
//             <p className="text-gray-500 italic">No documents available.</p>
//           ) : (
//             <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
//               {Object.entries(form.files).map(([key, val]) =>
//                 (Array.isArray(val) ? val : [val]).map((file, i) => (
//                   <a
//                     key={`${key}-${i}`}
//                     href={`${apiBase}/uploads/${file}`}
//                     target="_blank"
//                     rel="noreferrer"
//                     className="group flex items-center gap-3 p-4 border rounded-xl bg-white hover:shadow-md transition-all cursor-pointer"
//                   >
//                     <div className="w-12 h-12 flex items-center justify-center rounded-lg bg-sky-50 text-sky-700 text-xl">📄</div>

//                     <div>
//                       <p className="text-sm font-bold text-slate-800">{key.replace(/_/g, " ").toUpperCase()}</p>
//                       <p className="text-xs text-slate-500">Document {i + 1}</p>
//                     </div>

//                     <span className="ml-auto text-sky-700 font-semibold opacity-0 group-hover:opacity-100 transition">View →</span>
//                   </a>
//                 ))
//               )}
//             </div>
//           )}
//         </SectionCard>

//         {/* SAVE / CANCEL */}
//         {editMode && (
//           <div className="flex items-center justify-end gap-3">
//             <button
//               onClick={() => {
//                 setEditMode(false);
//                 // revert changes
//                 setForm(complaint ? JSON.parse(JSON.stringify(complaint)) : {});
//               }}
//               className="px-4 py-2 rounded-md bg-white border hover:shadow-sm"
//               type="button"
//             >
//               Cancel
//             </button>

//             <button
//               onClick={saveChanges}
//               disabled={saving}
//               className="px-4 py-2 rounded-md bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm"
//               type="button"
//             >
//               {saving ? "Saving..." : "Save Changes"}
//             </button>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// import React, { useEffect, useMemo, useState } from "react";
// import axios from "axios";

// /**
//  * ComplaintFullView  —  CRM UI + Highlighted Labels (STYLE 1)
//  *
//  * Includes:
//  * - Style-1 Highlight Labels (indigo soft highlight)
//  * - CRM card-based layout
//  * - Accordion with animation
//  * - Sorting in transactions
//  * - Print-friendly layout
//  * - Inline icons (no external dependency)
//  * - Full UI polish
//  */

// export default function ComplaintFullView({ complaint, apiBase, onClose, refresh }) {
//   const [editMode, setEditMode] = useState(false);
//   const [form, setForm] = useState(complaint ? JSON.parse(JSON.stringify(complaint)) : {});
//   const [saving, setSaving] = useState(false);

//   // accordion + sort
//   const [bankUI, setBankUI] = useState(() =>
//     (complaint?.banks || []).map(() => ({ expanded: true, sortBy: "date", sortDir: "desc" }))
//   );

//   useEffect(() => {
//     setForm(complaint ? JSON.parse(JSON.stringify(complaint)) : {});
//     setBankUI((complaint?.banks || []).map(() => ({ expanded: true, sortBy: "date", sortDir: "desc" })));
//   }, [complaint]);

//   useEffect(() => {
//     setBankUI((prev) => {
//       const count = form.banks?.length || 0;
//       if (prev.length === count) return prev;
//       if (prev.length < count) {
//         return [...prev, ...Array(count - prev.length).fill({ expanded: true, sortBy: "date", sortDir: "desc" })];
//       }
//       return prev.slice(0, count);
//     });
//   }, [form.banks]);

//   const updateField = (key, value) => setForm((f) => ({ ...f, [key]: value }));

//   // ---------------------------------------
//   // BANK LOGIC
//   // ---------------------------------------
//   const addBank = () => {
//     setForm((f) => ({
//       ...f,
//       banks: [
//         ...(f.banks || []),
//         { bank_name: "", account_no: "", ifsc: "", transactions: [] },
//       ],
//     }));
//   };

//   const removeBank = (bankIndex) => {
//     setForm((f) => ({
//       ...f,
//       banks: (f.banks || []).filter((_, i) => i !== bankIndex),
//     }));
//     setBankUI((s) => s.filter((_, i) => i !== bankIndex));
//   };

//   const updateBankField = (bankIndex, key, value) => {
//     setForm((f) => {
//       const banks = [...(f.banks || [])];
//       banks[bankIndex] = { ...banks[bankIndex], [key]: value };
//       return { ...f, banks };
//     });
//   };

//   const addTransaction = (bankIndex) => {
//     setForm((f) => {
//       const banks = [...(f.banks || [])];
//       const bank = banks[bankIndex] || { transactions: [] };
//       bank.transactions = [...(bank.transactions || []), { amount: "", date: "", time: "", refNo: "" }];
//       banks[bankIndex] = bank;
//       return { ...f, banks };
//     });
//   };

//   const removeTransaction = (bankIndex, txIndex) => {
//     setForm((f) => {
//       const banks = [...(f.banks || [])];
//       const bank = banks[bankIndex];
//       bank.transactions = bank.transactions.filter((_, i) => i !== txIndex);
//       banks[bankIndex] = bank;
//       return { ...f, banks };
//     });
//   };

//   const updateTransactionField = (bankIndex, txIndex, key, value) => {
//     setForm((f) => {
//       const banks = [...(f.banks || [])];
//       const bank = banks[bankIndex];
//       const txs = [...(bank.transactions || [])];
//       txs[txIndex] = { ...txs[txIndex], [key]: value };
//       bank.transactions = txs;
//       banks[bankIndex] = bank;
//       return { ...f, banks };
//     });
//   };

//   // ---------------------------------------
//   // SAVE
//   // ---------------------------------------
//   const saveChanges = async () => {
//     try {
//       setSaving(true);
//       await axios.patch(`${apiBase}/api/complaints/${form._id}/update`, form);
//       setEditMode(false);
//       refresh?.();
//       alert("Updated successfully");
//     } catch (err) {
//       console.error(err);
//       alert("Failed to save. Check console.");
//     } finally {
//       setSaving(false);
//     }
//   };

//   // ---------------------------------------
//   // SORTING HELPERS
//   // ---------------------------------------
//   const toggleSort = (bankIndex, column) => {
//     setBankUI((prev) =>
//       prev.map((item, i) => {
//         if (i !== bankIndex) return item;

//         if (item.sortBy === column) {
//           return { ...item, sortDir: item.sortDir === "asc" ? "desc" : "asc" };
//         }
//         return { ...item, sortBy: column, sortDir: "desc" };
//       })
//     );
//   };

//   const getSortedTransactions = (bankIndex, txList) => {
//     const ui = bankUI[bankIndex];
//     const list = [...(txList || [])];
//     const { sortBy, sortDir } = ui;
//     const dir = sortDir === "asc" ? 1 : -1;

//     return list.sort((a, b) => {
//       if (sortBy === "amount") return (Number(a.amount) - Number(b.amount)) * dir;
//       if (sortBy === "refNo") return (a.refNo || "").localeCompare(b.refNo || "") * dir;
//       if (sortBy === "time") return (a.time || "").localeCompare(b.time || "") * dir;
//       if (sortBy === "date") {
//         const da = a.date ? new Date(a.date).getTime() : 0;
//         const db = b.date ? new Date(b.date).getTime() : 0;
//         return (da - db) * dir;
//       }
//       return 0;
//     });
//   };

//   // ---------------------------------------
//   // LABEL STYLE 1
//   // ---------------------------------------
//   const FieldLabel = ({ children }) => (
//     <div className="inline-block mb-1 px-2 py-0.5 bg-indigo-50 text-indigo-700 text-s font-bold rounded">
//       {children}
//     </div>
//   );

//   // MASK ACCOUNT
//   const mask = (acc) => {
//     if (!acc) return "—";
//     if (acc.length < 8) return acc;
//     return acc.slice(0, 4) + " •••• " + acc.slice(-2);
//   };

//   // ICONS (inline SVG)
//   const Chevron = ({ open }) => (
//     <svg className={`w-4 h-4 transform transition ${open ? "rotate-180" : ""}`} viewBox="0 0 20 20" fill="none">
//       <path d="M6 8l4 4 4-4" stroke="currentColor" strokeWidth="1.5"/>
//     </svg>
//   );

//   const SortIcon = () => (
//     <svg className="w-3.5 h-3.5 text-slate-400" viewBox="0 0 20 20">
//       <path d="M7 7h6M7 10h4M7 13h2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
//     </svg>
//   );

//   return (
//     <div className="fixed inset-0 bg-slate-50 overflow-y-auto z-50">
//       {/* Header */}
//       <div className="sticky top-0 bg-white border-b px-6 py-3 flex justify-between items-center z-40">
//         <div>
//           <div className="text-2xl font-bold text-slate-900">{form.complaint_id}</div>
//           <div className="text-xs text-slate-500">
//             {form.createdAt ? new Date(form.createdAt).toLocaleString() : ""}
//           </div>
//         </div>

//         <div className="flex gap-2">
//           <button onClick={onClose} className="px-3 py-2 text-sm bg-slate-100 rounded-md">
//             ← Back
//           </button>

//           <button onClick={() => window.print()} className="px-3 py-2 text-sm border rounded-md">
//             Print
//           </button>

//           <button
//             onClick={() => setEditMode((s) => !s)}
//             className={`px-3 py-2 text-sm text-white rounded-md ${
//               editMode ? "bg-rose-600" : "bg-indigo-600"
//             }`}
//           >
//             {editMode ? "Cancel" : "Edit"}
//           </button>
//         </div>
//       </div>

//       {/* BODY */}
//       <div className="max-w-7xl mx-auto p-6 space-y-8">
//         {/* --------------------------------------- */}
//         {/* TOP CARDS */}
//         {/* --------------------------------------- */}
//         <div className="grid lg:grid-cols-3 gap-6">
//           {/* LEFT: COMPLAINT INFO */}
//           <div className="lg:col-span-2 bg-white p-6 rounded-xl border shadow-sm">
//             <FieldLabel>Complaint Information</FieldLabel>

//             <div className="mt-4 grid sm:grid-cols-2 gap-4">
//               {/* GD Number */}
//               <div>
//                 <FieldLabel>GD Number</FieldLabel>
//                 {editMode ? (
//                   <input className="w-full px-3 py-2 border rounded-md bg-slate-50"
//                     value={form.gd_case_no || ""}
//                     onChange={(e) => updateField("gd_case_no", e.target.value)}
//                   />
//                 ) : (
//                   <div className="font-medium">{form.gd_case_no || "—"}</div>
//                 )}
//               </div>

//               {/* Police Station */}
//               <div>
//                 <FieldLabel>Police Station</FieldLabel>
//                 {editMode ? (
//                   <input className="w-full px-3 py-2 border rounded-md bg-slate-50"
//                     value={form.police_station || ""}
//                     onChange={(e) => updateField("police_station", e.target.value)}
//                   />
//                 ) : (
//                   <div className="font-medium">{form.police_station || "—"}</div>
//                 )}
//               </div>

//               {/* Amount */}
//               <div>
//                 <FieldLabel>Fraud Amount</FieldLabel>
//                 {editMode ? (
//                   <input type="number" className="w-full px-3 py-2 border rounded-md bg-slate-50"
//                     value={form.total_amount || ""}
//                     onChange={(e) => updateField("total_amount", e.target.value)}
//                   />
//                 ) : (
//                   <div className="font-bold text-lg text-emerald-700">
//                     ₹{form.total_amount?.toLocaleString() || 0}
//                   </div>
//                 )}
//               </div>

//               {/* Fraudster Phone */}
//               <div>
//                 <FieldLabel>Fraudster Phone</FieldLabel>
//                 {editMode ? (
//                   <input className="w-full px-3 py-2 border rounded-md bg-slate-50"
//                     value={form.fraudster_phone || ""}
//                     onChange={(e) => updateField("fraudster_phone", e.target.value)}
//                   />
//                 ) : (
//                   <div className="font-medium">{form.fraudster_phone || "—"}</div>
//                 )}
//               </div>
//             </div>

//             {/* Description */}
//             <div className="mt-6">
//               <FieldLabel>Description</FieldLabel>
//               <textarea
//                 className="w-full p-3 bg-slate-50 border rounded-md font-semibold "
//                 rows={5}
//                 readOnly={!editMode}
//                 value={form.fraud_description || ""}
//                 onChange={(e) => updateField("fraud_description", e.target.value)}
//               />
//             </div>
//           </div>

//           {/* RIGHT: COMPLAINANT */}
//           <div className="bg-white p-6 rounded-xl border shadow-sm">
//             <FieldLabel>Complainant</FieldLabel>

//             <div className="mt-4 space-y-3">
//               <div>
//                 <FieldLabel>Name</FieldLabel>
//                 <input readOnly={!editMode}
//                   value={form.complainant_name || ""}
//                   onChange={(e) => updateField("complainant_name", e.target.value)}
//                   className={`w-full px-3 py-2 border rounded-md ${editMode ? "bg-slate-50" : ""}`}
//                 />
//               </div>

//               <div>
//                 <FieldLabel>Relation</FieldLabel>
//                 <input readOnly={!editMode}
//                   value={form.relation || ""}
//                   onChange={(e) => updateField("relation", e.target.value)}
//                   className={`w-full px-3 py-2 border rounded-md ${editMode ? "bg-slate-50" : ""}`}
//                 />
//               </div>

//               <div>
//                 <FieldLabel>Phone</FieldLabel>
//                 <input readOnly={!editMode}
//                   value={form.phone_no || ""}
//                   onChange={(e) => updateField("phone_no", e.target.value)}
//                   className={`w-full px-3 py-2 border rounded-md ${editMode ? "bg-slate-50" : ""}`}
//                 />
//               </div>

//               <div>
//                 <FieldLabel>Email</FieldLabel>
//                 <input readOnly={!editMode}
//                   value={form.email_id || ""}
//                   onChange={(e) => updateField("email_id", e.target.value)}
//                   className={`w-full px-3 py-2 border rounded-md ${editMode ? "bg-slate-50" : ""}`}
//                 />
//               </div>

//               <div className="grid grid-cols-2 gap-3">
//                 <div>
//                   <FieldLabel>DOB</FieldLabel>
//                   <input type="date" readOnly={!editMode}
//                     value={form.dob || ""}
//                     onChange={(e) => updateField("dob", e.target.value)}
//                     className={`w-full px-3 py-2 border rounded-md ${editMode ? "bg-slate-50" : ""}`}
//                   />
//                 </div>

//                 <div>
//                   <FieldLabel>Age</FieldLabel>
//                   <input type="number" readOnly={!editMode}
//                     value={form.age || ""}
//                     onChange={(e) => updateField("age", e.target.value)}
//                     className={`w-full px-3 py-2 border rounded-md ${editMode ? "bg-slate-50" : ""}`}
//                   />
//                 </div>
//               </div>

//               <div>
//                 <FieldLabel>Sex</FieldLabel>
//                 <select disabled={!editMode}
//                   value={form.sex || ""}
//                   onChange={(e) => updateField("sex", e.target.value)}
//                   className={`w-full px-3 py-2 border rounded-md ${editMode ? "bg-slate-50" : ""}`}>
//                   <option value="">Select</option>
//                   <option>Male</option>
//                   <option>Female</option>
//                   <option>Other</option>
//                 </select>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* --------------------------------------- */}
//         {/* BANKS SECTION */}
//         {/* --------------------------------------- */}
//         <div className="space-y-4">
//           <div className="flex justify-between">
//             <FieldLabel>Bank & Transaction Details</FieldLabel>
//             {editMode && (
//               <button onClick={addBank} className="px-3 py-2 bg-indigo-600 text-white text-sm rounded-md">
//                 + Add Bank
//               </button>
//             )}
//           </div>

//           {(form.banks || []).map((bank, bi) => {
//             const ui = bankUI[bi];
//             const sortedTx = getSortedTransactions(bi, bank.transactions || []);

//             return (
//               <div key={bi} className="bg-white border rounded-xl shadow-sm overflow-hidden">
//                 {/* Summary */}
//                 <div className="px-5 py-4 flex justify-between items-center">
//                   <div>
//                     <div className="font-semibold text-slate-900">
//                       {bank.bank_name || `Bank ${bi + 1}`}
//                     </div>
//                     <div className="text-xs text-slate-500">
//                       {mask(bank.account_no)} • {bank.ifsc || "N/A"}
//                     </div>
//                   </div>

//                   <div className="flex gap-3">
//                     {editMode && (
//                       <button onClick={() => removeBank(bi)} className="px-3 py-1 bg-rose-100 text-rose-700 rounded-md text-sm">
//                         Remove
//                       </button>
//                     )}

//                     <button
//                       onClick={() =>
//                         setBankUI((s) =>
//                           s.map((x, i) => (i === bi ? { ...x, expanded: !x.expanded } : x))
//                         )
//                       }
//                       className="px-3 py-1 bg-slate-100 rounded-md text-sm flex items-center gap-2"
//                     >
//                       <Chevron open={ui.expanded} />
//                       {ui.expanded ? "Collapse" : "Expand"}
//                     </button>
//                   </div>
//                 </div>

//                 {/* PANEL */}
//                 <div
//                   className={`px-5 transition-all duration-300 overflow-hidden ${
//                     ui.expanded ? "max-h-[1000px] py-5" : "max-h-0 py-0"
//                   }`}
//                 >
//                   {/* Bank Fields */}
//                   <div className="grid md:grid-cols-3 gap-4">
//                     <div>
//                       <FieldLabel>Bank Name</FieldLabel>
//                       <input readOnly={!editMode}
//                         value={bank.bank_name || ""}
//                         onChange={(e) => updateBankField(bi, "bank_name", e.target.value)}
//                         className={`w-full px-3 py-2 border rounded-md ${
//                           editMode ? "bg-slate-50" : ""
//                         }`}
//                       />
//                     </div>

//                     <div>
//                       <FieldLabel>Account Number</FieldLabel>
//                       <input readOnly={!editMode}
//                         value={bank.account_no || ""}
//                         onChange={(e) => updateBankField(bi, "account_no", e.target.value)}
//                         className={`w-full px-3 py-2 border rounded-md ${
//                           editMode ? "bg-slate-50" : ""
//                         }`}
//                       />
//                     </div>

//                     <div>
//                       <FieldLabel>IFSC</FieldLabel>
//                       <input readOnly={!editMode}
//                         value={bank.ifsc || ""}
//                         onChange={(e) => updateBankField(bi, "ifsc", e.target.value)}
//                         className={`w-full px-3 py-2 border rounded-md ${
//                           editMode ? "bg-slate-50" : ""
//                         }`}
//                       />
//                     </div>
//                   </div>

//                   {/* Transactions */}
//                   <div className="mt-6">
//                     <div className="flex justify-between mb-3">
//                       <FieldLabel>Transactions</FieldLabel>
//                       {editMode && (
//                         <button
//                           onClick={() => addTransaction(bi)}
//                           className="px-3 py-2 text-sm bg-emerald-600 text-white rounded"
//                         >
//                           + Add Tx
//                         </button>
//                       )}
//                     </div>

//                     {/* Table */}
//                     <div className="overflow-x-auto border rounded-md">
//                       <table className="w-full text-sm">
//                         <thead className="bg-slate-100">
//                           <tr>
//                             {["refNo", "date", "time", "amount"].map((col) => (
//                               <th key={col} className="px-4 py-2 text-left cursor-pointer" onClick={() => toggleSort(bi, col)}>
//                                 <div className="flex items-center gap-1">
//                                   {col === "refNo" && "Transaction Id/ UTR no"}
//                                   {col === "date" && "Date"}
//                                   {col === "time" && "Time"}
//                                   {col === "amount" && "Amount"}
//                                   <SortIcon />
//                                 </div>
//                               </th>
//                             ))}
//                             {editMode && <th className="px-4 py-2">Actions</th>}
//                           </tr>
//                         </thead>

//                         <tbody>
//                           {sortedTx.map((tx, ti) => (
//                             <tr key={ti} className="border-t bg-yellow-50 font-bold">
//                               {/* Reference */}
//                               <td className="px-4 py-2 font-semibold">
//                                 {editMode ? (
//                                   <input className="w-full px-2 py-1 border rounded-md"
//                                     value={tx.refNo || ""}
//                                     onChange={(e) => updateTransactionField(bi, ti, "refNo", e.target.value)}
//                                   />
//                                 ) : (
//                                   tx.refNo || "—"
//                                 )}
//                               </td>

//                               {/* Date */}
//                               <td className="px-4 py-2">
//                                 {editMode ? (
//                                   <input type="date" className="w-full px-2 py-1 border rounded-md"
//                                     value={tx.date || ""}
//                                     onChange={(e) => updateTransactionField(bi, ti, "date", e.target.value)}
//                                   />
//                                 ) : (
//                                   tx.date || "—"
//                                 )}
//                               </td>

//                               {/* Time */}
//                               <td className="px-4 py-2">
//                                 {editMode ? (
//                                   <input type="time" className="w-full px-2 py-1 border rounded-md"
//                                     value={tx.time || ""}
//                                     onChange={(e) => updateTransactionField(bi, ti, "time", e.target.value)}
//                                   />
//                                 ) : (
//                                   tx.time || "—"
//                                 )}
//                               </td>

//                               {/* Amount */}
//                               <td className="px-4 py-2 text-centre font-semibold text-emerald-700">
//                                 {editMode ? (
//                                   <input type="number" className="w-full px-2 py-1 border rounded-md text-right"
//                                     value={tx.amount || ""}
//                                     onChange={(e) => updateTransactionField(bi, ti, "amount", e.target.value)}
//                                   />
//                                 ) : (
//                                   `₹${Number(tx.amount || 0).toLocaleString()}`
//                                 )}
//                               </td>

//                               {/* Remove */}
//                               {editMode && (
//                                 <td className="px-4 py-2">
//                                   <button onClick={() => removeTransaction(bi, ti)} className="px-3 py-1 bg-rose-200 text-rose-800 rounded-md">
//                                     Remove
//                                   </button>
//                                 </td>
//                               )}
//                             </tr>
//                           ))}
//                         </tbody>
//                       </table>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             );
//           })}
//         </div>

//         {/* --------------------------------------- */}
//         {/* DOCUMENTS */}
//         {/* --------------------------------------- */}
//         <div className="bg-white p-6 border rounded-xl shadow-sm">
//           <FieldLabel>Uploaded Documents</FieldLabel>

//           <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
//             {!form.files && <div className="text-slate-500 italic">No documents available.</div>}

//             {form.files &&
//               Object.entries(form.files).flatMap(([key, val]) =>
//                 (Array.isArray(val) ? val : [val]).map((file, i) => (
//                   <a key={i} href={`${apiBase}/uploads/${file}`} className="flex items-center gap-4 p-4 bg-slate-50 border rounded-lg hover:bg-white">
//                     <div className="w-12 h-12 flex items-center justify-center border rounded bg-white text-indigo-600">
//                       📄
//                     </div>
//                     <div>
//                       <div className="font-semibold">{key.replace(/_/g, " ").toUpperCase()}</div>
//                       <div className="text-xs text-slate-500">Document {i + 1}</div>
//                     </div>
//                     <div className="ml-auto text-indigo-600 text-sm">View →</div>
//                   </a>
//                 ))
//               )}
//           </div>
//         </div>

//         {/* --------------------------------------- */}
//         {/* SAVE BUTTON */}
//         {/* --------------------------------------- */}
//         {editMode && (
//           <div className="flex justify-end gap-3">
//             <button
//               onClick={() => {
//                 setEditMode(false);
//                 setForm(complaint ? JSON.parse(JSON.stringify(complaint)) : {});
//                 setBankUI((complaint?.banks || []).map(() => ({ expanded: true, sortBy: "date", sortDir: "desc" })));
//               }}
//               className="px-4 py-2 bg-white border rounded-md"
//             >
//               Cancel
//             </button>

//             <button
//               onClick={saveChanges}
//               disabled={saving}
//               className="px-4 py-2 bg-emerald-600 text-white rounded-md"
//             >
//               {saving ? "Saving..." : "Save Changes"}
//             </button>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }


import React, { useEffect, useState } from "react";
import axios from "axios";

/**
 * ComplaintFullView  —  FinanceOS LIGHT UI
 *
 * - Frosted white cards (bg-white/80 + backdrop-blur-xl)
 * - Soft borders, rounded-2xl/3xl, premium spacing
 * - Pill labels with subtle highlight
 * - Symmetric banking section layout
 * - Clean table with better alignment
 * - Print-friendly + responsive
 */

export default function ComplaintFullView({ complaint, apiBase, onClose, refresh }) {
  const [editMode, setEditMode] = useState(false);
  const [form, setForm] = useState(complaint ? JSON.parse(JSON.stringify(complaint)) : {});
  const [saving, setSaving] = useState(false);

  // accordion + sort
  const [bankUI, setBankUI] = useState(() =>
    (complaint?.banks || []).map(() => ({ expanded: true, sortBy: "date", sortDir: "desc" }))
  );

  useEffect(() => {
    setForm(complaint ? JSON.parse(JSON.stringify(complaint)) : {});
    setBankUI((complaint?.banks || []).map(() => ({ expanded: true, sortBy: "date", sortDir: "desc" })));
  }, [complaint]);

  useEffect(() => {
    setBankUI((prev) => {
      const count = form.banks?.length || 0;
      if (prev.length === count) return prev;
      if (prev.length < count) {
        return [
          ...prev,
          ...Array(count - prev.length).fill({
            expanded: true,
            sortBy: "date",
            sortDir: "desc",
          }),
        ];
      }
      return prev.slice(0, count);
    });
  }, [form.banks]);

  const updateField = (key, value) => setForm((f) => ({ ...f, [key]: value }));

  // ---------------------------------------
  // BANK LOGIC
  // ---------------------------------------
  const addBank = () => {
    setForm((f) => ({
      ...f,
      banks: [
        ...(f.banks || []),
        { bank_name: "", account_no: "", ifsc: "", transactions: [] },
      ],
    }));
  };

  const removeBank = (bankIndex) => {
    setForm((f) => ({
      ...f,
      banks: (f.banks || []).filter((_, i) => i !== bankIndex),
    }));
    setBankUI((s) => s.filter((_, i) => i !== bankIndex));
  };

  const updateBankField = (bankIndex, key, value) => {
    setForm((f) => {
      const banks = [...(f.banks || [])];
      banks[bankIndex] = { ...banks[bankIndex], [key]: value };
      return { ...f, banks };
    });
  };

  const addTransaction = (bankIndex) => {
    setForm((f) => {
      const banks = [...(f.banks || [])];
      const bank = banks[bankIndex] || { transactions: [] };
      bank.transactions = [
        ...(bank.transactions || []),
        { amount: "", date: "", time: "", refNo: "" },
      ];
      banks[bankIndex] = bank;
      return { ...f, banks };
    });
  };

  const removeTransaction = (bankIndex, txIndex) => {
    setForm((f) => {
      const banks = [...(f.banks || [])];
      const bank = banks[bankIndex];
      bank.transactions = bank.transactions.filter((_, i) => i !== txIndex);
      banks[bankIndex] = bank;
      return { ...f, banks };
    });
  };

  const updateTransactionField = (bankIndex, txIndex, key, value) => {
    setForm((f) => {
      const banks = [...(f.banks || [])];
      const bank = banks[bankIndex];
      const txs = [...(bank.transactions || [])];
      txs[txIndex] = { ...txs[txIndex], [key]: value };
      bank.transactions = txs;
      banks[bankIndex] = bank;
      return { ...f, banks };
    });
  };

  // ---------------------------------------
  // SAVE
  // ---------------------------------------
  const saveChanges = async () => {
    try {
      setSaving(true);
      await axios.patch(`${apiBase}/api/complaints/${form._id}/update`, form);
      setEditMode(false);
      refresh?.();
      alert("Updated successfully");
    } catch (err) {
      console.error(err);
      alert("Failed to save. Check console.");
    } finally {
      setSaving(false);
    }
  };

  // ---------------------------------------
  // SORTING HELPERS
  // ---------------------------------------
  const toggleSort = (bankIndex, column) => {
    setBankUI((prev) =>
      prev.map((item, i) => {
        if (i !== bankIndex) return item;

        if (item.sortBy === column) {
          return { ...item, sortDir: item.sortDir === "asc" ? "desc" : "asc" };
        }
        return { ...item, sortBy: column, sortDir: "desc" };
      })
    );
  };

  const getSortedTransactions = (bankIndex, txList) => {
    const ui = bankUI[bankIndex];
    const list = [...(txList || [])];
    const { sortBy, sortDir } = ui;
    const dir = sortDir === "asc" ? 1 : -1;

    return list.sort((a, b) => {
      if (sortBy === "amount") return (Number(a.amount) - Number(b.amount)) * dir;
      if (sortBy === "refNo") return (a.refNo || "").localeCompare(b.refNo || "") * dir;
      if (sortBy === "time") return (a.time || "").localeCompare(b.time || "") * dir;
      if (sortBy === "date") {
        const da = a.date ? new Date(a.date).getTime() : 0;
        const db = b.date ? new Date(b.date).getTime() : 0;
        return (da - db) * dir;
      }
      return 0;
    });
  };

  // ---------------------------------------
  // LABEL STYLE: FinanceOS Light
  // ---------------------------------------
  const FieldLabel = ({ children }) => (
    <div className="inline-flex items-center mb-1 px-2.5 py-0.5 rounded-full bg-slate-100 text-[11px] font-semibold tracking-wide text-slate-700 uppercase">
      {children}
    </div>
  );

  // MASK ACCOUNT
  const mask = (acc) => {
    if (!acc) return "—";
    if (acc.length < 8) return acc;
    return acc.slice(0, 4) + " •••• " + acc.slice(-2);
  };

  // ICONS (inline SVG)
  const Chevron = ({ open }) => (
    <svg
      className={`w-4 h-4 transform transition duration-200 ${
        open ? "rotate-180" : ""
      }`}
      viewBox="0 0 20 20"
      fill="none"
    >
      <path d="M6 8l4 4 4-4" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );

  const SortIcon = () => (
    <svg className="w-3.5 h-3.5 text-slate-400" viewBox="0 0 20 20">
      <path
        d="M7 7h6M7 10h4M7 13h2"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );

  return (
    <div className="fixed inset-0 z-50 bg-slate-100/80 backdrop-blur-sm overflow-y-auto">
      {/* Header */}
      <div className="sticky top-0 z-40 border-b border-slate-200 bg-white/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 rounded-xl bg-indigo-100 flex items-center justify-center text-indigo-600 text-sm font-semibold">
                ID
              </div>
              <div>
                <div className="text-sm font-medium text-slate-500">
                  Complaint ID
                </div>
                <div className="text-xl md:text-2xl font-bold text-slate-900 tracking-tight">
                  {form.complaint_id || "—"}
                </div>
              </div>
            </div>
            <div className="text-[11px] text-slate-500">
              {form.createdAt
                ? new Date(form.createdAt).toLocaleString()
                : ""}
            </div>
          </div>

          <div className="flex flex-wrap gap-2 print:hidden">
            <button
              onClick={onClose}
              className="px-3 py-2 text-xs md:text-sm rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 transition"
            >
              ← Back
            </button>

            <button
              onClick={() => window.print()}
              className="px-3 py-2 text-xs md:text-sm rounded-lg border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-700 transition"
            >
              Print
            </button>

            <button
              onClick={() => setEditMode((s) => !s)}
              className={`px-3 py-2 text-xs md:text-sm rounded-lg font-medium text-white shadow-sm transition
                ${
                  editMode
                    ? "bg-rose-500 hover:bg-rose-600"
                    : "bg-indigo-600 hover:bg-indigo-700"
                }`}
            >
              {editMode ? "Cancel Edit" : "Edit"}
            </button>
          </div>
        </div>
      </div>

      {/* BODY */}
      <div className="max-w-7xl mx-auto p-4 md:p-6 space-y-8 print:p-4">
        {/* TOP CARDS */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* LEFT: COMPLAINT INFO */}
          <div className="lg:col-span-2 bg-white/80 backdrop-blur-xl p-6 md:p-7 rounded-2xl border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between gap-2 mb-4">
              <div>
                <FieldLabel>Complaint Information</FieldLabel>
                <p className="text-xs text-slate-500">
                  Core case details and fraud description
                </p>
              </div>
              <div className="hidden md:flex items-center gap-2 text-[11px] text-slate-500">
                <span className="inline-block w-2 h-2 rounded-full bg-amber-400" />
                {form.total_amount
                  ? `₹${form.total_amount.toLocaleString()} disputed`
                  : "Amount not specified"}
              </div>
            </div>

            <div className="mt-4 grid sm:grid-cols-2 gap-4">
              {/* GD Number */}
              <div className="flex flex-col gap-1.5">
                <FieldLabel>GD Number</FieldLabel>
                {editMode ? (
                  <input
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
                    value={form.gd_case_no || ""}
                    onChange={(e) =>
                      updateField("gd_case_no", e.target.value)
                    }
                  />
                ) : (
                  <div className="text-sm font-semibold text-slate-900">
                    {form.gd_case_no || "—"}
                  </div>
                )}
              </div>

              {/* Police Station */}
              <div className="flex flex-col gap-1.5">
                <FieldLabel>Police Station</FieldLabel>
                {editMode ? (
                  <input
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
                    value={form.police_station || ""}
                    onChange={(e) =>
                      updateField("police_station", e.target.value)
                    }
                  />
                ) : (
                  <div className="text-sm font-semibold text-slate-900">
                    {form.police_station || "—"}
                  </div>
                )}
              </div>

              {/* Amount */}
              <div className="flex flex-col gap-1.5">
                <FieldLabel>Fraud Amount</FieldLabel>
                {editMode ? (
                  <input
                    type="number"
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
                    value={form.total_amount || ""}
                    onChange={(e) =>
                      updateField("total_amount", e.target.value)
                    }
                  />
                ) : (
                  <div className="text-lg font-bold text-emerald-700">
                    ₹{form.total_amount?.toLocaleString() || 0}
                  </div>
                )}
              </div>

              {/* Fraudster Phone */}
              <div className="flex flex-col gap-1.5">
                <FieldLabel>Fraudster Phone</FieldLabel>
                {editMode ? (
                  <input
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
                    value={form.fraudster_phone || ""}
                    onChange={(e) =>
                      updateField("fraudster_phone", e.target.value)
                    }
                  />
                ) : (
                  <div className="text-sm font-semibold text-slate-900">
                    {form.fraudster_phone || "—"}
                  </div>
                )}
              </div>
            </div>

            {/* Description */}
            <div className="mt-6 flex flex-col gap-1.5">
              <FieldLabel>Description</FieldLabel>
              <textarea
                className="w-full p-3 rounded-xl border border-slate-200 bg-slate-50 text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/40"
                rows={5}
                readOnly={!editMode}
                value={form.fraud_description || ""}
                onChange={(e) =>
                  updateField("fraud_description", e.target.value)
                }
              />
            </div>
          </div>

          {/* RIGHT: COMPLAINANT */}
          <div className="bg-white/80 backdrop-blur-xl p-6 md:p-7 rounded-2xl border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div>
                <FieldLabel>Complainant</FieldLabel>
                <p className="text-xs text-slate-500">
                  Victim / reporting person details
                </p>
              </div>
              <span className="px-2.5 py-1 rounded-full bg-emerald-50 text-[11px] font-semibold text-emerald-700">
                Personal Info
              </span>
            </div>

            <div className="mt-2 space-y-3.5">
              <div className="flex flex-col gap-1.5">
                <FieldLabel>Name</FieldLabel>
                <input
                  readOnly={!editMode}
                  value={form.complainant_name || ""}
                  onChange={(e) =>
                    updateField("complainant_name", e.target.value)
                  }
                  className={`w-full px-3 py-2 rounded-xl border border-slate-200 text-sm ${
                    editMode
                      ? "bg-slate-50 focus:outline-none focus:ring-2 focus:ring-indigo-500/40"
                      : "bg-white"
                  }`}
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <FieldLabel>Relation</FieldLabel>
                <input
                  readOnly={!editMode}
                  value={form.relation || ""}
                  onChange={(e) =>
                    updateField("relation", e.target.value)
                  }
                  className={`w-full px-3 py-2 rounded-xl border border-slate-200 text-sm ${
                    editMode
                      ? "bg-slate-50 focus:outline-none focus:ring-2 focus:ring-indigo-500/40"
                      : "bg-white"
                  }`}
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <FieldLabel>Phone</FieldLabel>
                <input
                  readOnly={!editMode}
                  value={form.phone_no || ""}
                  onChange={(e) =>
                    updateField("phone_no", e.target.value)
                  }
                  className={`w-full px-3 py-2 rounded-xl border border-slate-200 text-sm ${
                    editMode
                      ? "bg-slate-50 focus:outline-none focus:ring-2 focus:ring-indigo-500/40"
                      : "bg-white"
                  }`}
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <FieldLabel>Email</FieldLabel>
                <input
                  readOnly={!editMode}
                  value={form.email_id || ""}
                  onChange={(e) =>
                    updateField("email_id", e.target.value)
                  }
                  className={`w-full px-3 py-2 rounded-xl border border-slate-200 text-sm ${
                    editMode
                      ? "bg-slate-50 focus:outline-none focus:ring-2 focus:ring-indigo-500/40"
                      : "bg-white"
                  }`}
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="flex flex-col gap-1.5">
                  <FieldLabel>DOB</FieldLabel>
                  <input
                    type="date"
                    readOnly={!editMode}
                    value={form.dob || ""}
                    onChange={(e) =>
                      updateField("dob", e.target.value)
                    }
                    className={`w-full px-3 py-2 rounded-xl border border-slate-200 text-sm ${
                      editMode
                        ? "bg-slate-50 focus:outline-none focus:ring-2 focus:ring-indigo-500/40"
                        : "bg-white"
                    }`}
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <FieldLabel>Age</FieldLabel>
                  <input
                    type="number"
                    readOnly={!editMode}
                    value={form.age || ""}
                    onChange={(e) =>
                      updateField("age", e.target.value)
                    }
                    className={`w-full px-3 py-2 rounded-xl border border-slate-200 text-sm ${
                      editMode
                        ? "bg-slate-50 focus:outline-none focus:ring-2 focus:ring-indigo-500/40"
                        : "bg-white"
                    }`}
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <FieldLabel>Sex</FieldLabel>
                <select
                  disabled={!editMode}
                  value={form.sex || ""}
                  onChange={(e) => updateField("sex", e.target.value)}
                  className={`w-full px-3 py-2 rounded-xl border border-slate-200 text-sm ${
                    editMode
                      ? "bg-slate-50 focus:outline-none focus:ring-2 focus:ring-indigo-500/40"
                      : "bg-white"
                  }`}
                >
                  <option value="">Select</option>
                  <option>Male</option>
                  <option>Female</option>
                  <option>Other</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* BANKS SECTION */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <FieldLabel>Bank & Transaction Details</FieldLabel>
              <p className="text-xs text-slate-500 mt-0.5">
                All linked accounts and movement of funds
              </p>
            </div>
            {editMode && (
              <button
                onClick={addBank}
                className="px-3.5 py-2 rounded-xl bg-indigo-600 text-white text-xs md:text-sm font-medium shadow-sm hover:bg-indigo-700 transition"
              >
                + Add Bank
              </button>
            )}
          </div>

          {(form.banks || []).map((bank, bi) => {
            const ui = bankUI[bi];
            const sortedTx = getSortedTransactions(bi, bank.transactions || []);

            return (
              <div
                key={bi}
                className="bg-white/80 backdrop-blur-xl border border-slate-200 rounded-2xl shadow-sm overflow-hidden"
              >
                {/* Summary */}
                <div className="px-5 py-4 flex flex-wrap items-center justify-between gap-3 border-b border-slate-100">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <div className="h-7 w-7 rounded-full bg-indigo-50 flex items-center justify-center text-[11px] font-semibold text-indigo-600">
                        {bi + 1}
                      </div>
                      <div className="font-semibold text-slate-900">
                        {bank.bank_name || `Bank ${bi + 1}`}
                      </div>
                    </div>
                    <div className="text-[11px] text-slate-500">
                      {mask(bank.account_no)} • {bank.ifsc || "IFSC N/A"}
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    {editMode && (
                      <button
                        onClick={() => removeBank(bi)}
                        className="px-3 py-1.5 rounded-lg bg-rose-50 text-rose-700 text-xs font-medium border border-rose-100 hover:bg-rose-100 transition"
                      >
                        Remove
                      </button>
                    )}

                    <button
                      onClick={() =>
                        setBankUI((s) =>
                          s.map((x, i) =>
                            i === bi ? { ...x, expanded: !x.expanded } : x
                          )
                        )
                      }
                      className="px-3 py-1.5 rounded-lg bg-slate-50 text-xs text-slate-700 border border-slate-200 flex items-center gap-1.5 hover:bg-slate-100 transition"
                    >
                      <Chevron open={ui.expanded} />
                      <span>{ui.expanded ? "Collapse" : "Expand"}</span>
                    </button>
                  </div>
                </div>

                {/* PANEL */}
                <div
                  className={`px-5 transition-all duration-300 overflow-hidden ${
                    ui.expanded ? "max-h-[1200px] py-5" : "max-h-0 py-0"
                  }`}
                >
                  {/* Bank Fields */}
                  <div className="grid md:grid-cols-3 gap-4 mb-6">
                    <div className="flex flex-col gap-1.5">
                      <FieldLabel>Bank Name</FieldLabel>
                      <input
                        readOnly={!editMode}
                        value={bank.bank_name || ""}
                        onChange={(e) =>
                          updateBankField(bi, "bank_name", e.target.value)
                        }
                        className={`w-full px-3 py-2 rounded-xl border border-slate-200 text-sm ${
                          editMode
                            ? "bg-slate-50 focus:outline-none focus:ring-2 focus:ring-indigo-500/40"
                            : "bg-white"
                        }`}
                      />
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <FieldLabel>Account Number</FieldLabel>
                      <input
                        readOnly={!editMode}
                        value={bank.account_no || ""}
                        onChange={(e) =>
                          updateBankField(bi, "account_no", e.target.value)
                        }
                        className={`w-full px-3 py-2 rounded-xl border border-slate-200 text-sm ${
                          editMode
                            ? "bg-slate-50 focus:outline-none focus:ring-2 focus:ring-indigo-500/40"
                            : "bg-white"
                        }`}
                      />
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <FieldLabel>IFSC</FieldLabel>
                      <input
                        readOnly={!editMode}
                        value={bank.ifsc || ""}
                        onChange={(e) =>
                          updateBankField(bi, "ifsc", e.target.value)
                        }
                        className={`w-full px-3 py-2 rounded-xl border border-slate-200 text-sm ${
                          editMode
                            ? "bg-slate-50 focus:outline-none focus:ring-2 focus:ring-indigo-500/40"
                            : "bg-white"
                        }`}
                      />
                    </div>
                  </div>

                  {/* Transactions */}
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <FieldLabel>Transactions</FieldLabel>
                        <span className="text-[11px] text-slate-500">
                          {sortedTx.length} entries
                        </span>
                      </div>
                      {editMode && (
                        <button
                          onClick={() => addTransaction(bi)}
                          className="px-3.5 py-2 text-xs md:text-sm rounded-xl bg-emerald-600 text-white font-medium shadow-sm hover:bg-emerald-700 transition"
                        >
                          + Add Transaction
                        </button>
                      )}
                    </div>

                    {/* Table */}
                    <div className="overflow-x-auto rounded-xl border border-slate-200 bg-slate-50/60">
                      <table className="w-full text-xs md:text-sm">
                        <thead className="bg-slate-100/80">
                          <tr>
                            {["refNo", "date", "time", "amount"].map((col) => (
                              <th
                                key={col}
                                className="px-4 py-2.5 text-left font-semibold text-slate-600 border-b border-slate-200 cursor-pointer select-none"
                                onClick={() => toggleSort(bi, col)}
                              >
                                <div className="flex items-center gap-1.5">
                                  {col === "refNo" && "Transaction ID / UTR"}
                                  {col === "date" && "Date"}
                                  {col === "time" && "Time"}
                                  {col === "amount" && "Amount"}
                                  <SortIcon />
                                </div>
                              </th>
                            ))}
                            {editMode && (
                              <th className="px-4 py-2.5 border-b border-slate-200 text-right">
                                Actions
                              </th>
                            )}
                          </tr>
                        </thead>

                        <tbody>
                          {sortedTx.map((tx, ti) => (
                            <tr
                              key={ti}
                              className="border-b border-slate-100 last:border-0 odd:bg-white even:bg-amber-50/40"
                            >
                              {/* Reference */}
                              <td className="px-4 py-2.5 font-semibold text-slate-800 align-middle">
                                {editMode ? (
                                  <input
                                    className="w-full px-2 py-1.5 rounded-lg border border-slate-200 bg-white text-xs md:text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/40"
                                    value={tx.refNo || ""}
                                    onChange={(e) =>
                                      updateTransactionField(
                                        bi,
                                        ti,
                                        "refNo",
                                        e.target.value
                                      )
                                    }
                                  />
                                ) : (
                                  tx.refNo || "—"
                                )}
                              </td>

                              {/* Date */}
                              <td className="px-4 py-2.5 align-middle">
                                {editMode ? (
                                  <input
                                    type="date"
                                    className="w-full px-2 py-1.5 rounded-lg border border-slate-200 bg-white text-xs md:text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/40"
                                    value={tx.date || ""}
                                    onChange={(e) =>
                                      updateTransactionField(
                                        bi,
                                        ti,
                                        "date",
                                        e.target.value
                                      )
                                    }
                                  />
                                ) : (
                                  tx.date || "—"
                                )}
                              </td>

                              {/* Time */}
                              <td className="px-4 py-2.5 align-middle">
                                {editMode ? (
                                  <input
                                    type="time"
                                    className="w-full px-2 py-1.5 rounded-lg border border-slate-200 bg-white text-xs md:text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/40"
                                    value={tx.time || ""}
                                    onChange={(e) =>
                                      updateTransactionField(
                                        bi,
                                        ti,
                                        "time",
                                        e.target.value
                                      )
                                    }
                                  />
                                ) : (
                                  tx.time || "—"
                                )}
                              </td>

                              {/* Amount */}
                              <td className="px-4 py-2.5 align-middle text-right font-semibold text-emerald-700">
                                {editMode ? (
                                  <input
                                    type="number"
                                    className="w-full px-2 py-1.5 rounded-lg border border-slate-200 bg-white text-xs md:text-sm text-right focus:outline-none focus:ring-2 focus:ring-indigo-500/40"
                                    value={tx.amount || ""}
                                    onChange={(e) =>
                                      updateTransactionField(
                                        bi,
                                        ti,
                                        "amount",
                                        e.target.value
                                      )
                                    }
                                  />
                                ) : (
                                  `₹${Number(tx.amount || 0).toLocaleString()}`
                                )}
                              </td>

                              {/* Remove */}
                              {editMode && (
                                <td className="px-4 py-2.5 text-right align-middle">
                                  <button
                                    onClick={() =>
                                      removeTransaction(bi, ti)
                                    }
                                    className="px-3 py-1.5 rounded-lg bg-rose-50 text-rose-700 text-xs font-medium border border-rose-100 hover:bg-rose-100 transition"
                                  >
                                    Remove
                                  </button>
                                </td>
                              )}
                            </tr>
                          ))}

                          {sortedTx.length === 0 && (
                            <tr>
                              <td
                                colSpan={editMode ? 5 : 4}
                                className="px-4 py-4 text-center text-xs text-slate-500"
                              >
                                No transactions added yet.
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}

          {(form.banks || []).length === 0 && (
            <div className="text-xs text-slate-500 italic px-1">
              No bank details added.
            </div>
          )}
        </div>

        {/* DOCUMENTS */}
        <div className="bg-white/80 backdrop-blur-xl p-6 md:p-7 border border-slate-200 rounded-2xl shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div>
              <FieldLabel>Uploaded Documents</FieldLabel>
              <p className="text-xs text-slate-500 mt-0.5">
                FIR, bank statements, screenshots, and supporting proofs
              </p>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-2">
            {!form.files && (
              <div className="text-slate-500 italic text-sm">
                No documents available.
              </div>
            )}

            {form.files &&
              Object.entries(form.files).flatMap(([key, val]) =>
                (Array.isArray(val) ? val : [val]).map((file, i) => (
                  <a
                    key={`${key}-${i}`}
                    href={`${apiBase}/uploads/${file}`}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-4 p-4 bg-slate-50/80 hover:bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition"
                  >
                    <div className="w-11 h-11 flex items-center justify-center rounded-xl bg-white shadow-sm border border-slate-200 text-indigo-500 text-lg">
                      📄
                    </div>
                    <div className="flex-1">
                      <div className="text-xs font-semibold text-slate-800 uppercase tracking-wide">
                        {key.replace(/_/g, " ")}
                      </div>
                      <div className="text-[11px] text-slate-500">
                        Document {i + 1}
                      </div>
                    </div>
                    <div className="ml-auto text-[11px] font-medium text-indigo-600">
                      View →
                    </div>
                  </a>
                ))
              )}
          </div>
        </div>

        {/* SAVE BUTTON */}
        {editMode && (
          <div className="flex justify-end gap-3 pt-2 pb-6 print:hidden">
            <button
              onClick={() => {
                setEditMode(false);
                setForm(complaint ? JSON.parse(JSON.stringify(complaint)) : {});
                setBankUI(
                  (complaint?.banks || []).map(() => ({
                    expanded: true,
                    sortBy: "date",
                    sortDir: "desc",
                  }))
                );
              }}
              className="px-4 py-2.5 text-sm rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 transition"
            >
              Cancel
            </button>

            <button
              onClick={saveChanges}
              disabled={saving}
              className="px-5 py-2.5 text-sm rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-medium shadow-sm disabled:opacity-60 disabled:cursor-not-allowed transition"
            >
              {saving ? "Saving..." : "Save Changes"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

