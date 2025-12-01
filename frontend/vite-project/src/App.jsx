// import React, { useState } from "react";
// import axios from "axios";
// import TransactionSection from "./components/TransactionSection";

// const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:5000";

// export default function App() {
//   const [form, setForm] = useState({
//     police_station: "",
//     gd_case_no: "",
//     complainant_name: "",
//     relation: "",
//     profession: "",
//     present_address: "",
//     phone_no: "",
//     email_id: "",
//     total_amount: "",
//     amount_from: "", // date from which fraud started
//     amount_to: "", // date to which fraud happened.
//     fraud_description: "",
//   });

//   const [banks, setBanks] = useState([
//     {
//       bank_name: "",
//       account_no: "",
//       ifsc: "",
//       transactions: [{ amount: "", date: "", time: "", refNo: "" }],
//     },
//   ]);

//   const [files, setFiles] = useState({});
//   const [status, setStatus] = useState(null);
//   const [submitted, setSubmitted] = useState(false);

//   const onChange = (e) =>
//     setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
//   const onFileChange = (e) =>
//     setFiles((f) => ({ ...f, [e.target.name]: e.target.files[0] }));

//   // const updateBank = (i, newData) => {
//   //   const updated = [...banks];
//   //   updated[i] = newData;
//   //   setBanks(updated);
//   // };
//   const updateBank = (i, newData) => {
//     setBanks((prev) => prev.map((b, idx) => (idx === i ? newData : b)));
//   };

//   // const addBankSection = () => {
//   //   if (banks.length < 3) {
//   //     setBanks([
//   //       ...banks,
//   //       {
//   //         bank_name: "",
//   //         account_no: "",
//   //         ifsc: "",
//   //         transactions: [{ amount: "", date: "", time: "", refNo: "" }],
//   //       },
//   //     ]);
//   //   }
//   // };
//   const addBankSection = () => {
//     const newBank = {
//       bank_name: "",
//       account_no: "",
//       ifsc: "",
//       transactions: [{ amount: "", date: "", time: "", refNo: "" }],
//     };

//     // Always push a *new independent copy* for each bank
//     setBanks((prevBanks) => [...prevBanks, newBank]);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       setStatus({ loading: true });
//       const data = new FormData();
//       Object.keys(form).forEach((k) => data.append(k, form[k] || ""));
//       data.append("transactions", JSON.stringify(banks));

//       ["aadhar", "gd_copy", "bank_statement", "card_copy", "other_doc"].forEach(
//         (f) => {
//           if (files[f]) data.append(f, files[f]);
//         }
//       );

//       const res = await axios.post(`${API_BASE}/api/complaint`, data, {
//         headers: { "Content-Type": "multipart/form-data" },
//       });
//       if (res.data.ok) {
//         setSubmitted(true);
//         setStatus(null);
//       } else {
//         setStatus({ error: res.data.error });
//       }
//     } catch (err) {
//       setStatus({ error: err.message });
//     }
//   };

//   if (submitted) {
//     return (
//       <div className="flex items-center justify-center min-h-screen bg-blue-50">
//         <div className="bg-white p-10 rounded-xl shadow-md text-center max-w-md">
//           <h2 className="text-2xl font-bold text-blue-700 mb-3">
//             ✅ Complaint Submitted
//           </h2>
//           <p className="text-gray-600 mb-6">
//             Your complaint has been successfully recorded. Please keep your
//             acknowledgment number safe.
//           </p>
//           <button
//             onClick={() => window.location.reload()}
//             className="px-6 py-2 bg-blue-700 text-white rounded-md hover:bg-blue-800 transition"
//           >
//             Submit Another
//           </button>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white py-8 px-4 sm:px-6">
//       <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-2xl border border-blue-100">
//         <div className="p-6 sm:p-10">
//           {/* <div className="text-center mb-8">
//             <img src="/logo.png" alt="" className="mx-auto w-16 mb-3 opacity-70" />
//             <h1 className="text-2xl sm:text-3xl font-semibold text-blue-700">
//               Kolkata Police Cyber Cell Complaint Form
//             </h1>
//             <p className="text-sm text-gray-500 mt-1">
//               Please fill all mandatory fields marked with (<span className="text-red-500">*</span>)
//             </p>
//           </div> */}
//           <div className="text-center mb-8">
//             {/* Logo */}
//             <img
//               src="/favicon.png"
//               alt="Kolkata Police Logo"
//               className="mx-auto w-16 sm:w-20 mb-3 opacity-80"
//             />

//             {/* Main Title */}
//             <h1 className="text-2xl sm:text-3xl font-bold text-blue-800 uppercase tracking-wide">
//               South Suburban Division (Jadavpur Division)
//             </h1>

//             {/* Sub Title */}
//             <p className="text-sm sm:text-base text-gray-700 font-medium">
//               CYBER CELL
//             </p>

//             {/* Contact Info */}
//             <div className="mt-2 text-gray-600 text-sm sm:text-base leading-relaxed">
//               <p>
//                 <strong>Contact:</strong>{" "}
//                 <span className="text-blue-700 font-medium">033-24990199</span>{" "}
//                 &{" "}
//                 <span className="text-blue-700 font-medium">
//                   9831022658 (WhatsApp)
//                 </span>
//               </p>
//               <p>
//                 <strong>Email:</strong>{" "}
//                 <a
//                   href="mailto:ssdcybercell@kolkatapolice.gov.in"
//                   className="text-blue-700 hover:underline"
//                 >
//                   ssdcybercell@kolkatapolice.gov.in
//                 </a>
//               </p>
//             </div>

//             {/* Divider Line */}
//             <div className="w-24 h-[2px] bg-blue-700 mx-auto my-4 rounded-full opacity-70" />

//             {/* Form Title */}
//             <h2 className="text-lg sm:text-xl font-semibold text-gray-800">
//               (Complainant’s Details of Financial Fraud)
//             </h2>

//             {/* Instruction */}
//             <p className="text-sm text-gray-500 mt-2">
//               Please fill all mandatory fields marked with{" "}
//               <span className="text-red-500 font-semibold">*</span>
//             </p>
//           </div>

//           <form onSubmit={handleSubmit} className="space-y-6">
//             {/* Personal Section */}
//             <fieldset className="border border-gray-200 rounded-lg p-4 sm:p-6">
//               <legend className="text-blue-700 font-semibold px-2">
//                 Personal Information
//               </legend>
//               <div className="grid sm:grid-cols-2 gap-4 mt-3">
//                 <label>
//                   Name of the Police Station:
//                   <span className="text-red-500">*</span>
//                   <input
//                     name="police_station"
//                     value={form.police_station}
//                     onChange={onChange}
//                     required
//                     className="input"
//                   />
//                 </label>

//                 <label>
//                   General Diary No. / Case No.
//                   <span className="text-red-500">*</span>
//                   <input
//                     name="gd_case_no"
//                     value={form.gd_case_no}
//                     required
//                     onChange={onChange}
//                     className="input"
//                   />
//                 </label>

//                 <label>
//                   Complainant Name:<span className="text-red-500">*</span>
//                   <input
//                     name="complainant_name"
//                     value={form.complainant_name}
//                     onChange={onChange}
//                     required
//                     className="input"
//                   />
//                 </label>

//                 <label>
//                   S/O, D/O, W/O:
//                   <input
//                     name="relation"
//                     value={form.relation}
//                     onChange={onChange}
//                     className="input"
//                   />
//                 </label>

                // {/* ✅ New Fields Start Here */}
                // <label>
                //   Date of Birth:
                //   <input
                //     type="date"
                //     name="dob"
                //     value={form.dob || ""}
                //     onChange={onChange}
                //     className="input"
                //   />
                // </label>

                // <label>
                //   Age:
                //   <input
                //     type="number"
                //     name="age"
                //     min="0"
                //     max="120"
                //     value={form.age || ""}
                //     onChange={onChange}
                //     className="input"
                //     placeholder="Years"
                //   />
                // </label>

                // <label>
                //   Sex / Gender:
                //   <select
                //     name="sex"
                //     value={form.sex || ""}
                //     onChange={onChange}
                //     className="input"
                //   >
                //     <option value="">Select</option>
                //     <option value="Male">Male</option>
                //     <option value="Female">Female</option>
                //     <option value="Other">Other</option>
                //   </select>
                // </label>
                // {/* ✅ New Fields End */}

                // <label>
                //   Profession:
                //   <input
                //     name="profession"
                //     value={form.profession}
                //     onChange={onChange}
                //     className="input"
                //   />
                // </label>

//                 <label className="sm:col-span-2">
//                   Complainant Address (Present):
//                   <textarea
//                     name="present_address"
//                     value={form.present_address}
//                     onChange={onChange}
//                     rows={2}
//                     className="input"
//                   />
//                 </label>

//                 <label className="sm:col-span-2">
//                   Phone No. of the complainant
//                   <span className="text-red-500">*</span>
//                   <input
//                     type="number"
//                     name="phone_no"
//                     value={form.phone_no}
//                     onChange={onChange}
//                     required
//                     className="input"
//                   />
//                 </label>

//                 <label className="sm:col-span-2">
//                   Email Id:<span className="text-red-500">*</span>
//                   <input
//                     type="email"
//                     name="email_id"
//                     value={form.email_id}
//                     onChange={onChange}
//                     required
//                     className="input"
//                   />
//                 </label>
//               </div>
//             </fieldset>

//             {/* Fraud Details */}
//             <fieldset className="border border-gray-200 rounded-lg p-4 sm:p-6">
//               <legend className="text-blue-700 font-semibold px-2">
//                 Fraud Summary
//               </legend>
//               <div className="grid sm:grid-cols-3 gap-4 mt-3">
//                 <label>
//                   Fraud Amount (₹)
//                   <input
//                     type="number"
//                     name="total_amount"
//                     value={form.total_amount}
//                     onChange={onChange}
//                     className="input"
//                   />
//                 </label>
//                 <label>
//                   From Date
//                   <input
//                     type="date"
//                     name="amount_from"
//                     value={form.amount_from}
//                     onChange={onChange}
//                     className="input"
//                   />
//                 </label>
//                 <label>
//                   To Date
//                   <input
//                     type="date"
//                     name="amount_to"
//                     value={form.amount_to}
//                     onChange={onChange}
//                     className="input"
//                   />
//                 </label>
//                 <label className="sm:col-span-3">
//                   Type of Fraud / Brief Facts
//                   <textarea
//                     name="fraud_description"
//                     value={form.fraud_description}
//                     onChange={onChange}
//                     rows={3}
//                     className="input"
//                   />
//                 </label>
//               </div>
//             </fieldset>

//             {/* Transaction Section */}
//             <fieldset className="border border-gray-200 rounded-lg p-4 sm:p-6">
//               <legend className="text-blue-700 font-semibold px-2">
//                 Fraudulent Transaction Details
//               </legend>
//               <div className="space-y-4 mt-3">
//                 {banks.map((b, i) => (
//                   <TransactionSection
//                     key={i}
//                     index={i}
//                     bank={b}
//                     updateBank={updateBank}
//                   />
//                 ))}
//               </div>
//               {banks.length < 3 && (
//                 <button
//                   type="button"
//                   onClick={addBankSection}
//                   className="text-blue-700 font-medium mt-2 hover:text-blue-900"
//                 >
//                   + Add Another Bank
//                 </button>
//               )}
//             </fieldset>

//             {/* File Uploads */}
//             <fieldset className="border border-gray-200 rounded-lg p-4 sm:p-6">
//               <legend className="text-blue-700 font-semibold px-2">
//                 Supporting Documents
//               </legend>
//               <div className="grid sm:grid-cols-2 gap-4 mt-3">
//                 {/* <label>
//                   Aadhar <span className="text-red-500">*</span>
//                   <input
//                     type="file"
//                     name="aadhar"
//                     required
//                     onChange={onFileChange}
//                     className="file-input"
//                   />
//                 </label> */}
//                 <label>
//                   General Diary or FIR copy <span className="text-red-500">*</span>
//                   <input
//                     type="file"
//                     name="gd_copy"
//                     required
//                     onChange={onFileChange}
//                     className="file-input"
//                   />
//                 </label>
//                 <label>
//                   Bank Statement/ UPI details screen shots:
//                   <input
//                     type="file"
//                     name="bank_statement"
//                     onChange={onFileChange}
//                     className="file-input"
//                   />
//                 </label>
//                 <label>
//                   Debit/Credit Card (In case of Fraudulent from card):
//                   <input
//                     type="file"
//                     name="card_copy"
//                     onChange={onFileChange}
//                     className="file-input"
//                   />
//                 </label>
//                 <label className="sm:col-span-2">
//                   Other Documents:
//                   <input
//                     type="file"
//                     name="other_doc"
//                     onChange={onFileChange}
//                     className="file-input"
//                   />
//                 </label>
//               </div>
//             </fieldset>

//             {/* Submit */}
//             <div className="pt-4 text-center">
//               <button
//                 type="submit"
//                 className="bg-blue-700 hover:bg-blue-800 text-white px-10 py-2.5 rounded-lg font-semibold shadow-md transition"
//               >
//                 {status?.loading ? "Submitting..." : "Submit Complaint"}
//               </button>
//             </div>

//             {status?.error && (
//               <p className="text-red-600 text-center font-medium mt-2">
//                 {status.error}
//               </p>
//             )}
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// }


import React, { useState } from "react";
import axios from "axios";
import TransactionSection from "./components/TransactionSection";

const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:5000";

export default function App() {
  const [complaint_id, setComplaint_id] = useState('');
  const [form, setForm] = useState({
    police_station: "",
    gd_case_no: "",
    complainant_name: "",
    relation: "",
    profession: "",
    present_address: "",
    phone_no: "",
    email_id: "",
    total_amount: "",
    amount_from: "",
    amount_to: "",
    fraud_description: "",
    fraudster_phone: "", // ✅ new
  });
  function calculateAge(birthDateString) {
  const birthDate = new Date(birthDateString); // Convert string to Date object
  const today = new Date();

  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();

  // Adjust age if the birthday hasn't occurred yet this year
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
}
  const [banks, setBanks] = useState([
    {
      bank_name: "",
      account_no: "",
      ifsc: "",
      transactions: [{ amount: "", date: "", time: "", refNo: "" }],
    },
  ]);

  const [files, setFiles] = useState({});
  const [status, setStatus] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [cardFraud, setCardFraud] = useState(false); // ✅ toggle for card fraud

  const onChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const onFileChange = (e) =>
    setFiles((f) => ({ ...f, [e.target.name]: e.target.files[0] }));

  const updateBank = (i, newData) => {
    setBanks((prev) => prev.map((b, idx) => (idx === i ? newData : b)));
  };

  const addBankSection = () => {
    const newBank = {
      bank_name: "",
      account_no: "",
      ifsc: "",
      transactions: [{ amount: "", date: "", time: "", refNo: "" }],
    };
    setBanks((prevBanks) => [...prevBanks, newBank]);
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setStatus({ loading: true });
      const data = new FormData();
      Object.keys(form).forEach((k) => data.append(k, form[k] || ""));
      data.append("transactions", JSON.stringify(banks));

      ["gd_copy", "bank_statement", "card_copy", "other_doc"].forEach((f) => {
        if (files[f]) data.append(f, files[f]);
      });

      const res = await axios.post(`${API_BASE}/api/complaint`, data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      

      if (res.data.ok) {
        setComplaint_id(()=>res.data.complaint_id)
        setSubmitted(true);
        setStatus(null);
      } else {
        setStatus({ error: res.data.error });
      }
    } catch (err) {
      setStatus({ error: err.message });
    }
  };

  if (submitted) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-blue-50">
        <div className="bg-white p-10 rounded-xl shadow-md text-center max-w-md">
          <h2 className="text-2xl font-bold text-blue-700 mb-3">
            ✅ Complaint Submitted
          </h2>
          <p className="text-gray-600 mb-6">
            Your complaint has been successfully recorded. Please keep your
            complaint ID: <span className = " font-bold text-red-500">{complaint_id}</span> safe.
          </p>
          {/* <button
            onClick={() => window.location.reload()}
            className="px-6 py-2 bg-blue-700 text-white rounded-md hover:bg-blue-800 transition"
          >
            Submit Another
          </button> */}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white py-8 px-4 sm:px-6">
      <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-2xl border border-blue-100">
        <div className="p-6 sm:p-10">
          {/* HEADER */}
          <div className="text-center mb-8">
            <img
              src="/favicon.png"
              alt="Kolkata Police Logo"
              className="mx-auto w-16 sm:w-20 mb-3 opacity-80"
            />
            <h1 className="text-2xl sm:text-3xl font-bold text-blue-800 uppercase tracking-wide">
              South Suburban Division (Jadavpur Division)
            </h1>
            <p className="text-sm sm:text-base text-gray-700 font-medium">
              CYBER CELL
            </p>
            <div className="mt-2 text-gray-600 text-sm sm:text-base leading-relaxed">
              <p>
                <strong>Contact:</strong>{" "}
                <span className="text-blue-700 font-medium">033-24990199</span>{" "}
                &{" "}
                <span className="text-blue-700 font-medium">
                  9831022658 (WhatsApp)
                </span>
              </p>
              <p>
                <strong>Email:</strong>{" "}
                <a
                  href="mailto:ssdcybercell@kolkatapolice.gov.in"
                  className="text-blue-700 hover:underline"
                >
                  ssdcybercell@kolkatapolice.gov.in
                </a>
              </p>
            </div>
            <div className="w-24 h-[2px] bg-blue-700 mx-auto my-4 rounded-full opacity-70" />
            <h2 className="text-lg sm:text-xl font-semibold text-gray-800">
              (Complainant’s Details of Financial Fraud)
            </h2>
            <p className="text-sm text-gray-500 mt-2">
              Please fill all mandatory fields marked with{" "}
              <span className="text-red-500 font-semibold">*</span>
            </p>
          </div>

          {/* FORM */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Personal Info */}
            <fieldset className="border border-gray-200 rounded-lg p-4 sm:p-6">
              <legend className="text-blue-700 font-semibold px-2">
                Personal Information
              </legend>
              <div className="grid sm:grid-cols-2 gap-4 mt-3">
                <label>
  Name of the Police Station: <span className="text-red-500">*</span>
  <select
    name="police_station"
    value={form.police_station}
    onChange={onChange}
    required
    className="input"
  >
    <option value="">Select Police Station</option>
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
</label>


                <label>
                  General Diary No. / Case No.<span className="text-red-500">*</span>
                  <input
                    name="gd_case_no"
                    value={form.gd_case_no}
                    required
                    onChange={onChange}
                    className="input"
                  />
                </label>

                <label>
                  Complainant Name:<span className="text-red-500">*</span>
                  <input
                    name="complainant_name"
                    value={form.complainant_name}
                    onChange={onChange}
                    required
                    className="input"
                  />
                </label>

                <label>
                  S/O, D/O, W/O:
                  <input
                    name="relation"
                    value={form.relation}
                    onChange={onChange}
                    className="input"
                  />
                </label>

                <label>
                  Profession:
                  <input
                    name="profession"
                    value={form.profession}
                    onChange={onChange}
                    className="input"
                  />
                </label>

                {/* ✅ New Fields Start Here */}
                <label>
                  Date of Birth:
                  <input
                    type="date"
                    name="dob"
                    value={form.dob || ""}
                    onChange={onChange}
                    className="input"
                  />
                </label>

                <label>
                  Age:
                  <input
                    type="number"
                    name="age"
                    min="0"
                    max="120"
                    value={calculateAge(form.age) || ""}
                    onChange={onChange}
                    className="input"
                    placeholder="Years"
                  />
                </label>

                <label>
                  Sex / Gender:
                  <select
                    name="sex"
                    value={form.sex || ""}
                    onChange={onChange}
                    className="input"
                  >
                    <option value="">Select</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </label>
                {/* ✅ New Fields End */}

                

                <label className="sm:col-span-2">
                  Complainant's Address (Present):
                  <textarea
                    name="present_address"
                    value={form.present_address}
                    onChange={onChange}
                    rows={2}
                    className="input"
                  />
                </label>

                <label className="sm:col-span-2">
                  Complainant's Phone No.<span className="text-red-500">*</span>
                  <input
                    type="number"
                    name="phone_no"
                    value={form.phone_no}
                    onChange={onChange}
                    required
                    className="input"
                  />
                </label>

                <label className="sm:col-span-2">
                 Complainant's Email Id:
                  <input
                    type="email"
                    name="email_id"
                    value={form.email_id}
                    onChange={onChange}
                    className="input"
                  />
                </label>
              </div>
            </fieldset>

            {/* Fraud Details */}
            <fieldset className="border border-gray-200 rounded-lg p-4 sm:p-6">
              <legend className="text-blue-700 font-semibold px-2">
                Fraud Summary
              </legend>
              <div className="grid sm:grid-cols-3 gap-4 mt-3">
                <label>
                  Fraud Amount (₹)
                  <input
                    type="number"
                    name="total_amount"
                    value={form.total_amount}
                    onChange={onChange}
                    className="input"
                  />
                </label>
                <label>
                  From Date
                  <input
                    type="date"
                    name="amount_from"
                    value={form.amount_from}
                    onChange={onChange}
                    className="input"
                  />
                </label>
                <label>
                  To Date
                  <input
                    type="date"
                    name="amount_to"
                    value={form.amount_to}
                    onChange={onChange}
                    className="input"
                  />
                </label>

                <label className="sm:col-span-3">
                  Type of Fraud / Brief Facts
                  <textarea
                    name="fraud_description"
                    value={form.fraud_description}
                    onChange={onChange}
                    rows={3}
                    className="input"
                  />
                </label>

                {/* ✅ Fraudster’s Phone */}
                <label className="sm:col-span-3">
                  Fraudster's Phone Number (if any)
                  <input
                    type="text"
                    name="fraudster_phone"
                    value={form.fraudster_phone}
                    onChange={onChange}
                    placeholder="Enter suspected fraudster’s number"
                    className="input"
                  />
                </label>

                {/* ✅ Card Fraud Toggle */}
                <div className="sm:col-span-3 mt-2">
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={cardFraud}
                      onChange={(e) => setCardFraud(e.target.checked)}
                      className="w-4 h-4 text-blue-600"
                    />
                    <span className="text-sm text-gray-700">
                      Fraud was done through Credit/Debit Card
                    </span>
                  </label>
                </div>
              </div>
            </fieldset>

            {/* ✅ Conditional Card Details Section */}
            {cardFraud && (
              <fieldset className="border border-gray-200 rounded-lg p-4 sm:p-6 bg-blue-50/30">
                <legend className="text-blue-700 font-semibold px-2">
                  Card Details
                </legend>
                <div className="grid sm:grid-cols-2 gap-4 mt-3">
                  <label>
                    Card Holder Name:
                    <input name="card_holder" onChange={onChange} className="input" />
                  </label>
                  <label>
                    16 Digits of Card:
                    <input
                      name="card_last4"
                      onChange={onChange}
                      className="input"
                      maxLength="16"
                    />
                  </label>
                  <label>
                    Card Type:
                    <select name="card_type" onChange={onChange} className="input">
                      <option value="">Select</option>
                      <option value="Credit Card">Credit Card</option>
                      <option value="Debit Card">Debit Card</option>
                    </select>
                  </label>
                  <label>
                    Issuing Bank:
                    <input name="issuing_bank" onChange={onChange} className="input" />
                  </label>
                </div>
              </fieldset>
            )}

              {/* bank section */}
                         {/* Transaction Section */}
             <fieldset className="border border-gray-200 rounded-lg p-4 sm:p-6">
               <legend className="text-blue-700 font-semibold px-2">
                 Fraudulent Transaction Details
              </legend>
               <div className="space-y-4 mt-3">
                 {banks.map((b, i) => (
                   <TransactionSection
                     key={i}
                     index={i}
                     bank={b}
                     updateBank={updateBank}
                   />
                 ))}
               </div>
               {banks.length < 3 && (
                 <button
                  type="button"
                  onClick={addBankSection}
                   className="text-blue-700 font-medium mt-2 hover:text-blue-900"
                 >
                   + Add Another Bank
                 </button>
              )}
             </fieldset>

            {/* Supporting Docs */}
            <fieldset className="border border-gray-200 rounded-lg p-4 sm:p-6">
              <legend className="text-blue-700 font-semibold px-2">
                Supporting Documents
              </legend>
              <div className="grid sm:grid-cols-2 gap-4 mt-3">
                <label>
                  FIR / GD Copy <span className="text-red-500">*</span>
                  <input
                    type="file"
                    name="gd_copy"
                    required
                    onChange={onFileChange}
                    className="file-input"
                  />
                </label>
                <label>
                  Bank Statement / UPI Screenshot:
                  <input
                    type="file"
                    name="bank_statement"
                    onChange={onFileChange}
                    className="file-input"
                  />
                </label>
                {cardFraud && (
                  <label>
                    Credit/Debit Card Copy:
                    <input
                      type="file"
                      name="card_copy"
                      onChange={onFileChange}
                      className="file-input"
                    />
                  </label>
                )}
                <label className="sm:col-span-2">
                  Other Documents:
                  <input
                    type="file"
                    name="other_doc"
                    onChange={onFileChange}
                    className="file-input"
                  />
                </label>
              </div>
            </fieldset>

            {/* Submit */}
            <div className="pt-4 text-center">
              <button
                type="submit"
                className="bg-blue-700 hover:bg-blue-800 text-white px-10 py-2.5 rounded-lg font-semibold shadow-md transition"
              >
                {status?.loading ? "Submitting..." : "Submit Complaint"}
              </button>
            </div>

            {status?.error && (
              <p className="text-red-600 text-center font-medium mt-2">
                {status.error}
              </p>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}
