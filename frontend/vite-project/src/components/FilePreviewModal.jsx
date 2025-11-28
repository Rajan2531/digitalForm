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


import React, { useState } from "react";
import axios from "axios";

export default function ComplaintFullView({ complaint, apiBase, onClose }) {
  const [editMode, setEditMode] = useState(false);
  const [form, setForm] = useState({ ...complaint });

  const updateField = (key, value) =>
    setForm((f) => ({ ...f, [key]: value }));

  const saveChanges = async () => {
    try {
      await axios.patch(`${apiBase}/api/complaints/${form._id}/update`, form);
      setEditMode(false);
      alert("Updated successfully");
    } catch (err) {
      alert("Failed to save");
    }
  };

  const SectionCard = ({ title, children }) => (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">{title}</h3>
      {children}
    </div>
  );

  const InfoRow = ({ label, value }) => (
    <div>
      <p className="text-xs text-gray-500 uppercase tracking-wide">{label}</p>
      <p className="font-semibold text-gray-900 text-sm mt-1">
        {value || "—"}
      </p>
    </div>
  );

  const EditRow = ({ label, name }) => (
    <div className="flex flex-col">
      <span className="text-xs text-gray-500 uppercase tracking-wide">
        {label}
      </span>
      <input
        name={name}
        value={form[name] || ""}
        onChange={(e) => updateField(name, e.target.value)}
        className="border px-3 py-2 rounded-lg text-sm mt-1"
      />
    </div>
  );

  return (
    <div className="fixed inset-0 bg-gray-100 z-50 overflow-y-auto">

      {/* HEADER BAR */}
      <div className="sticky top-0 z-50 bg-white border-b shadow-sm px-8 py-4 flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">
            Complaint: {form.complaint_id}
          </h2>
          <p className="text-sm text-gray-500">
            Submitted on {new Date(form.createdAt).toLocaleString()}
          </p>
        </div>

        <div className="flex gap-3">
          <button
            onClick={() => window.print()}
            className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 text-sm"
          >
            🖨 Print / PDF
          </button>

          <button
            onClick={() => setEditMode(!editMode)}
            className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-sm"
          >
            {editMode ? "Cancel" : "Edit"}
          </button>

          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-red-500 hover:bg-red-600 text-white text-sm"
          >
            Close
          </button>
        </div>
      </div>

      {/* CONTENT WRAPPER */}
      <div className="max-w-7xl mx-auto px-8 py-10 space-y-10">

        {/* GRID LAYOUT */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

          {/* LEFT COLUMN */}
          <div className="space-y-8">

            <SectionCard title="Complaint Information">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {!editMode ? (
                  <>
                    <InfoRow label="GD Number" value={form.gd_case_no} />
                    <InfoRow label="Police Station" value={form.police_station} />
                    <InfoRow label="Fraud Amount" value={`₹${form.total_amount}`} />
                    <InfoRow label="Fraudster Phone" value={form.fraudster_phone} />
                  </>
                ) : (
                  <>
                    <EditRow label="GD Number" name="gd_case_no" />
                    <EditRow label="Police Station" name="police_station" />
                    <EditRow label="Fraud Amount" name="total_amount" />
                    <EditRow label="Fraudster Phone" name="fraudster_phone" />
                  </>
                )}
              </div>
            </SectionCard>

            <SectionCard title="Fraud Description">
              {!editMode ? (
                <p className="text-gray-800 leading-relaxed whitespace-pre-line">
                  {form.fraud_description}
                </p>
              ) : (
                <textarea
                  className="w-full border rounded-lg p-3 text-sm"
                  rows={4}
                  value={form.fraud_description}
                  onChange={(e) => updateField("fraud_description", e.target.value)}
                />
              )}
            </SectionCard>
          </div>

          {/* RIGHT COLUMN */}
          <div className="space-y-8">

            <SectionCard title="Complainant Information">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {!editMode ? (
                  <>
                    <InfoRow label="Name" value={form.complainant_name} />
                    <InfoRow label="Relation" value={form.relation} />
                    <InfoRow label="Profession" value={form.profession} />
                    <InfoRow label="Address" value={form.present_address} />
                    <InfoRow label="Phone" value={form.phone_no} />
                    <InfoRow label="Email" value={form.email_id} />
                    <InfoRow label="DOB" value={form.dob} />
                    <InfoRow label="Age" value={form.age} />
                    <InfoRow label="Sex" value={form.sex} />
                  </>
                ) : (
                  <>
                    <EditRow label="Name" name="complainant_name" />
                    <EditRow label="Relation" name="relation" />
                    <EditRow label="Profession" name="profession" />
                    <EditRow label="Address" name="present_address" />
                    <EditRow label="Phone" name="phone_no" />
                    <EditRow label="Email" name="email_id" />
                    <EditRow label="DOB" name="dob" />
                    <EditRow label="Age" name="age" />
                    <EditRow label="Sex" name="sex" />
                  </>
                )}
              </div>
            </SectionCard>

            <SectionCard title="Uploaded Documents">
              {form.files ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {Object.entries(form.files).map(([key, val], idx) => (
                    (Array.isArray(val) ? val : [val]).map((file, i) => (
                      <a
                        key={i}
                        href={`${apiBase}/uploads/${file}`}
                        target="_blank"
                        className="p-3 border rounded-lg bg-gray-50 hover:bg-gray-100 flex items-center gap-2"
                      >
                        📄 {key.replace(/_/g, " ")} {i + 1}
                      </a>
                    ))
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 italic">No documents uploaded.</p>
              )}
            </SectionCard>
          </div>
        </div>

        {/* FULL-WIDTH BANK DETAILS */}
        <SectionCard title="Bank & Transaction Details">
          {form.banks?.map((bank, i) => (
            <div key={i} className="border rounded-lg p-5 bg-gray-50 mb-6">

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <InfoRow label="Bank Name" value={bank.bank_name} />
                <InfoRow label="Account Number" value={bank.account_no} />
                <InfoRow label="IFSC" value={bank.ifsc} />
              </div>

              <h4 className="text-md font-semibold mt-4">Transactions</h4>
              <div className="mt-3 space-y-2">
                {bank.transactions?.map((t, idx) => (
                  <div
                    key={idx}
                    className="bg-white p-3 rounded-lg border text-sm flex justify-between"
                  >
                    <span>
                      ₹{t.amount} — {t.date} {t.time}
                    </span>
                    <span className="text-gray-500 text-xs">
                      Ref: {t.refNo}
                    </span>
                  </div>
                ))}
              </div>

            </div>
          ))}
        </SectionCard>

        {/* SAVE BUTTON */}
        {editMode && (
          <div className="text-right pt-4">
            <button
              onClick={saveChanges}
              className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-bold rounded-lg"
            >
              Save Changes
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
