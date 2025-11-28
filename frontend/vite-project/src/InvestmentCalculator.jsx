// import React, { useState, useMemo, useRef } from "react";
// import {
//   LineChart,
//   Line,
//   XAxis,
//   YAxis,
//   Tooltip,
//   Legend,
//   CartesianGrid,
//   ResponsiveContainer,
// } from "recharts";
// import jsPDF from "jspdf";
// import html2canvas from "html2canvas";

// export default function AdvancedInvestmentCalculator() {
//   const [inputs, setInputs] = useState({
//     lumpSum: 5000000,
//     sipMonthly: 50000,
//     sipYears: 7,
//     cagrPercent: 20,
//     investmentTerm: 20,
//     swpStartYear: 4,
//     swpEndYear: 8,
//     swpMode: "percent",
//     swpPercentAnnual: 6,
//     swpFixedMonthly: 25000,
//     swpFrequency: "yearly",
//     swpInflationPercent: 0,
//   });

//   const [showYearly, setShowYearly] = useState(false);
//   const [showMonthly, setShowMonthly] = useState(false);
//   const reportRef = useRef();

//   const handle = (e) =>
//     setInputs({ ...inputs, [e.target.name]: e.target.value });

//   const fmt = (n) =>
//     new Intl.NumberFormat("en-IN", { maximumFractionDigits: 0 }).format(n);

//   /* ----------------------------------------------------------
//      CALCULATION ENGINE (MONTHLY SIMULATION — ACCURATE)
//   ----------------------------------------------------------- */
//   const result = useMemo(() => {
//     const {
//       lumpSum,
//       sipMonthly,
//       sipYears,
//       cagrPercent,
//       investmentTerm,
//       swpStartYear,
//       swpEndYear,
//       swpMode,
//       swpPercentAnnual,
//       swpFixedMonthly,
//       swpFrequency,
//       swpInflationPercent,
//     } = inputs;

//     let lump = Number(lumpSum);
//     let sip = Number(sipMonthly);
//     let annual = Number(cagrPercent) / 100;
//     let monthlyReturn = Math.pow(1 + annual, 1 / 12) - 1;

//     let sipMonths = Number(sipYears) * 12;
//     let totalMonths = Number(investmentTerm) * 12;

//     let swpStartMonth = (Number(swpStartYear) - 1) * 12 + 1;
//     let swpEndMonth = Number(swpEndYear) * 12;

//     let pct = Number(swpPercentAnnual) / 100;
//     let fixed = Number(swpFixedMonthly);
//     let infl = Number(swpInflationPercent) / 100;

//     let corpus = lump;
//     let monthlyData = [];
//     let yearlyData = [];
//     let plannedYearly = 0;

//     for (let m = 1; m <= totalMonths; m++) {
//       let year = Math.ceil(m / 12);
//       let monthOfYear = ((m - 1) % 12) + 1;

//       let inSWP = m >= swpStartMonth && m <= swpEndMonth;

//       // Plan yearly SWP
//       if (monthOfYear === 1) {
//         plannedYearly = 0;
//         if (inSWP && swpMode === "percent" && swpFrequency === "yearly") {
//           plannedYearly = corpus * pct;
//         }
//         if (inSWP && swpMode === "fixed" && swpFrequency === "yearly") {
//           const yearsSince = Math.floor((m - swpStartMonth) / 12);
//           plannedYearly =
//             fixed * 12 * Math.pow(1 + infl, yearsSince);
//         }
//       }

//       // SIP at month start
//       let sipAdded = 0;
//       if (m <= sipMonths) {
//         corpus += sip;
//         sipAdded = sip;
//       }

//       // Monthly withdrawals
//       let withdrawn = 0;
//       if (inSWP) {
//         if (swpMode === "percent" && swpFrequency === "monthly") {
//           withdrawn = corpus * (pct / 12);
//           corpus -= withdrawn;
//         } else if (swpMode === "fixed" && swpFrequency === "monthly") {
//           const yearsSince = Math.floor((m - swpStartMonth) / 12);
//           let adj = fixed * Math.pow(1 + infl, yearsSince);
//           withdrawn = Math.min(adj, corpus);
//           corpus -= withdrawn;
//         }
//       }

//       // Monthly growth
//       corpus *= 1 + monthlyReturn;

//       // Year-end yearly withdrawal
//       if (monthOfYear === 12 && plannedYearly > 0) {
//         let ywd = Math.min(corpus, plannedYearly);
//         corpus -= ywd;
//         withdrawn += ywd;
//       }

//       monthlyData.push({
//         month: m,
//         year,
//         sipAdded,
//         withdrawal: withdrawn,
//         corpus,
//       });

//       if (monthOfYear === 12) {
//         const slice = monthlyData.slice(-12);
//         yearlyData.push({
//           year,
//           sipTotal: slice.reduce((a, c) => a + c.sipAdded, 0),
//           withdrawTotal: slice.reduce((a, c) => a + c.withdrawal, 0),
//           corpusEnd: corpus,
//         });
//       }
//     }

//     return { monthlyData, yearlyData };
//   }, [inputs]);

//   const chartData = result.yearlyData.map((y) => ({
//     name: "Y" + y.year,
//     Corpus: y.corpusEnd,
//     SIP: y.sipTotal,
//     Withdrawal: y.withdrawTotal,
//   }));

//   /* ----------------------------------------------------------
//      PDF EXPORT
//   ----------------------------------------------------------- */
//   const exportPDF = async () => {
//     const node = reportRef.current;
//     const canvas = await html2canvas(node, { scale: 2 });
//     const img = canvas.toDataURL("image/png");
//     const pdf = new jsPDF("p", "pt", "a4");
//     const w = pdf.internal.pageSize.getWidth();
//     const h = (canvas.height * w) / canvas.width;
//     pdf.addImage(img, "PNG", 0, 0, w, h);
//     pdf.save("Investment_Report.pdf");
//   };

//   /* ----------------------------------------------------------
//      UI — MINIMAL / PREMIUM / RESPONSIVE
//   ----------------------------------------------------------- */
//   return (
//     <div className="min-h-screen w-full bg-gradient-to-br from-slate-100 to-blue-100 p-4 md:p-10 font-sans">
//       <h1 className="text-3xl md:text-4xl font-extrabold text-center text-slate-800 mb-6">
//         Advanced Investment Planner
//       </h1>

//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//         {/* ------------------ INPUT PANEL ------------------ */}
//         <aside className="bg-white/90 backdrop-blur-md shadow-xl rounded-2xl p-6 border border-slate-200 sticky top-4 h-fit">
//           <h2 className="text-xl font-semibold mb-4 text-slate-700">
//             Inputs
//           </h2>

//           <div className="space-y-4">
//             {[
//               ["Lump Sum (₹)", "lumpSum"],
//               ["Monthly SIP (₹)", "sipMonthly"],
//               ["SIP Duration (years)", "sipYears"],
//               ["Expected CAGR (%)", "cagrPercent"],
//               ["Investment Term (years)", "investmentTerm"],
//               ["SWP Start Year", "swpStartYear"],
//               ["SWP End Year", "swpEndYear"],
//             ].map(([label, name]) => (
//               <div key={name}>
//                 <label className="block text-sm text-slate-600 mb-1">
//                   {label}
//                 </label>
//                 <input
//                   type="number"
//                   name={name}
//                   value={inputs[name]}
//                   onChange={handle}
//                   className="w-full p-3 rounded-xl border border-slate-300 bg-slate-50 focus:ring-2 focus:ring-blue-400"
//                 />
//               </div>
//             ))}

//             {/* SWP Mode */}
//             <label className="block text-sm text-slate-600">SWP Mode</label>
//             <select
//               name="swpMode"
//               value={inputs.swpMode}
//               onChange={handle}
//               className="w-full p-3 rounded-xl border bg-slate-50"
//             >
//               <option value="percent">Percent of Corpus</option>
//               <option value="fixed">Fixed Amount</option>
//             </select>

//             {inputs.swpMode === "percent" ? (
//               <div>
//                 <label className="text-sm text-slate-600">SWP Annual %</label>
//                 <input
//                   name="swpPercentAnnual"
//                   type="number"
//                   value={inputs.swpPercentAnnual}
//                   onChange={handle}
//                   className="w-full p-3 rounded-xl border bg-slate-50"
//                 />
//               </div>
//             ) : (
//               <>
//                 <div>
//                   <label className="text-sm text-slate-600">
//                     Fixed Monthly (₹)
//                   </label>
//                   <input
//                     name="swpFixedMonthly"
//                     type="number"
//                     value={inputs.swpFixedMonthly}
//                     onChange={handle}
//                     className="w-full p-3 rounded-xl border bg-slate-50"
//                   />
//                 </div>
//                 <div>
//                   <label className="text-sm text-slate-600">
//                     Inflation % / year
//                   </label>
//                   <input
//                     name="swpInflationPercent"
//                     type="number"
//                     value={inputs.swpInflationPercent}
//                     onChange={handle}
//                     className="w-full p-3 rounded-xl border bg-slate-50"
//                   />
//                 </div>
//               </>
//             )}

//             <label className="text-sm text-slate-600">SWP Frequency</label>
//             <select
//               name="swpFrequency"
//               value={inputs.swpFrequency}
//               onChange={handle}
//               className="w-full p-3 rounded-xl border bg-slate-50"
//             >
//               <option value="yearly">Yearly</option>
//               <option value="monthly">Monthly</option>
//             </select>

//             <button
//               className="w-full mt-3 py-3 rounded-xl bg-blue-600 text-white font-semibold"
//               onClick={exportPDF}
//             >
//               Export PDF
//             </button>

//             <div className="flex gap-3">
//               <button
//                 className="flex-1 py-2 bg-slate-100 rounded-lg"
//                 onClick={() => setShowYearly((s) => !s)}
//               >
//                 Yearly Table
//               </button>
//               <button
//                 className="flex-1 py-2 bg-slate-100 rounded-lg"
//                 onClick={() => setShowMonthly((s) => !s)}
//               >
//                 Monthly Table
//               </button>
//             </div>
//           </div>
//         </aside>

//         {/* ------------------ MAIN PANEL ------------------ */}
//         <main
//           ref={reportRef}
//           className="lg:col-span-2 bg-white/90 shadow-xl backdrop-blur-md rounded-2xl p-6 border border-slate-200"
//         >
//           <div className="mb-6">
//             <h3 className="text-xl font-semibold text-slate-700">
//               Summary & Chart
//             </h3>
//             <p className="text-sm text-slate-500">
//               SWP Window: Year {inputs.swpStartYear} → {inputs.swpEndYear}
//             </p>
//             <div className="text-3xl font-bold text-blue-700 mt-2">
//               Final Corpus: ₹
//               {fmt(
//                 result.monthlyData[result.monthlyData.length - 1]?.corpus ?? 0
//               )}
//             </div>
//           </div>

//           <div className="w-full h-72 mb-6">
//             <ResponsiveContainer>
//               <LineChart data={chartData}>
//                 <CartesianGrid strokeDasharray="3 3" />
//                 <XAxis dataKey="name" />
//                 <YAxis />
//                 <Tooltip
//                   formatter={(v) =>
//                     new Intl.NumberFormat("en-IN").format(Math.round(v))
//                   }
//                 />
//                 <Legend />
//                 <Line type="monotone" dataKey="Corpus" stroke="#0ea5e9" dot={false} />
//                 <Line type="monotone" dataKey="SIP" stroke="#10b981" dot={false} />
//                 <Line
//                   type="monotone"
//                   dataKey="Withdrawal"
//                   stroke="#ef4444"
//                   dot={false}
//                 />
//               </LineChart>
//             </ResponsiveContainer>
//           </div>

//           {showYearly && (
//             <div className="mt-6">
//               <h4 className="font-semibold mb-2">Yearly Breakdown</h4>
//               <div className="overflow-auto border rounded-lg">
//                 <table className="w-full text-sm">
//                   <thead className="bg-slate-100">
//                     <tr>
//                       <th className="px-2 py-2">Year</th>
//                       <th className="px-2 py-2">SIP Added</th>
//                       <th className="px-2 py-2">SWP</th>
//                       <th className="px-2 py-2">Corpus End</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {result.yearlyData.map((y, i) => (
//                       <tr
//                         key={i}
//                         className={i % 2 ? "bg-slate-50" : "bg-white"}
//                       >
//                         <td className="px-2 py-2">{y.year}</td>
//                         <td className="px-2 py-2 text-right">{fmt(y.sipTotal)}</td>
//                         <td className="px-2 py-2 text-right">
//                           {fmt(y.withdrawTotal)}
//                         </td>
//                         <td className="px-2 py-2 text-right">
//                           {fmt(y.corpusEnd)}
//                         </td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>
//             </div>
//           )}

//           {showMonthly && (
//             <div className="mt-6">
//               <h4 className="font-semibold mb-2">
//                 Monthly Breakdown (first 120 months)
//               </h4>
//               <div className="overflow-auto border rounded-lg">
//                 <table className="w-full text-sm">
//                   <thead className="bg-slate-100">
//                     <tr>
//                       <th className="px-2 py-2">M</th>
//                       <th className="px-2 py-2">Year</th>
//                       <th className="px-2 py-2">SIP</th>
//                       <th className="px-2 py-2">SWP</th>
//                       <th className="px-2 py-2">Corpus</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {result.monthlyData.slice(0, 120).map((m) => (
//                       <tr key={m.month} className="odd:bg-white even:bg-slate-50">
//                         <td className="px-2 py-1">{m.month}</td>
//                         <td className="px-2 py-1">{m.year}</td>
//                         <td className="px-2 py-1 text-right">{fmt(m.sipAdded)}</td>
//                         <td className="px-2 py-1 text-right">
//                           {fmt(m.withdrawal)}
//                         </td>
//                         <td className="px-2 py-1 text-right">{fmt(m.corpus)}</td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>
//             </div>
//           )}
//         </main>
//       </div>
//     </div>
//   );
// }


// src/components/MobileFirstInvestmentApp.jsx
import React, { useState, useMemo, useRef } from "react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

/*
Mobile-first Investment App (single-file)
Tabs: Plan | Chart | Table | Report
Slide-up Input Panel
Designed for PWA / mobile UX
*/

export default function MobileFirstInvestmentApp() {
  // core inputs (controlled)
  const [inputs, setInputs] = useState({
    lumpSum: 5000000,
    sipMonthly: 50000,
    sipYears: 7,
    cagrPercent: 20,
    investmentTerm: 20,
    swpStartYear: 4,
    swpEndYear: 8,
    swpMode: "percent", // percent | fixed
    swpPercentAnnual: 6,
    swpFixedMonthly: 25000,
    swpFrequency: "yearly", // yearly | monthly
    swpInflationPercent: 0,
  });

  const [tab, setTab] = useState("plan"); // plan | chart | table | report
  const [panelOpen, setPanelOpen] = useState(false);
  const reportRef = useRef();

  const setInput = (name, value) =>
    setInputs((s) => ({ ...s, [name]: value }));

  // small number formatter
  const fmt = (n) =>
    new Intl.NumberFormat("en-IN", { maximumFractionDigits: 0 }).format(n);

  // -------------------- simulation (month-accurate) --------------------
  const result = useMemo(() => {
    const {
      lumpSum,
      sipMonthly,
      sipYears,
      cagrPercent,
      investmentTerm,
      swpStartYear,
      swpEndYear,
      swpMode,
      swpPercentAnnual,
      swpFixedMonthly,
      swpFrequency,
      swpInflationPercent,
    } = inputs;

    let lump = Number(lumpSum);
    let sip = Number(sipMonthly);
    let sipMonths = Number(sipYears) * 12;
    let annual = Number(cagrPercent) / 100;
    let monthlyReturn = Math.pow(1 + annual, 1 / 12) - 1;
    let totalMonths = Number(investmentTerm) * 12;
    let swpStartMonth = (Number(swpStartYear) - 1) * 12 + 1;
    let swpEndMonth = Number(swpEndYear) * 12;
    let pct = Number(swpPercentAnnual) / 100;
    let fixed = Number(swpFixedMonthly);
    let infl = Number(swpInflationPercent) / 100;

    let corpus = lump;
    let monthlyData = [];
    let yearlyData = [];
    let plannedYearly = 0;

    for (let m = 1; m <= totalMonths; m++) {
      let year = Math.ceil(m / 12);
      let monthOfYear = ((m - 1) % 12) + 1;
      let inSWP = m >= swpStartMonth && m <= swpEndMonth;

      // plan yearly withdrawal at year start
      if (monthOfYear === 1) {
        plannedYearly = 0;
        if (inSWP && swpMode === "percent" && swpFrequency === "yearly") {
          plannedYearly = corpus * pct;
        }
        if (inSWP && swpMode === "fixed" && swpFrequency === "yearly") {
          const yearsSince = Math.floor((m - swpStartMonth) / 12);
          plannedYearly = fixed * 12 * Math.pow(1 + infl, yearsSince);
        }
      }

      // SIP at month start
      let sipAdded = 0;
      if (m <= sipMonths) {
        corpus += sip;
        sipAdded = sip;
      }

      // monthly SWP
      let withdrawal = 0;
      if (inSWP) {
        if (swpMode === "percent" && swpFrequency === "monthly") {
          withdrawal = corpus * (pct / 12);
          corpus -= withdrawal;
        } else if (swpMode === "fixed" && swpFrequency === "monthly") {
          const yearsSince = Math.floor((m - swpStartMonth) / 12);
          let adj = fixed * Math.pow(1 + infl, yearsSince);
          withdrawal = Math.min(adj, corpus);
          corpus -= withdrawal;
        }
      }

      // growth
      corpus *= 1 + monthlyReturn;

      // year-end planned withdrawal
      if (monthOfYear === 12 && plannedYearly > 0) {
        let ywd = Math.min(corpus, plannedYearly);
        corpus -= ywd;
        withdrawal += ywd;
      }

      monthlyData.push({
        month: m,
        year,
        sipAdded,
        withdrawal,
        corpus,
      });

      if (monthOfYear === 12) {
        const slice = monthlyData.slice(-12);
        yearlyData.push({
          year,
          sipTotal: slice.reduce((a, c) => a + c.sipAdded, 0),
          withdrawTotal: slice.reduce((a, c) => a + c.withdrawal, 0),
          corpusEnd: corpus,
        });
      }
    }

    return { monthlyData, yearlyData };
  }, [inputs]);

  // chart data
  const chartData = result.yearlyData.map((y) => ({
    name: `Y${y.year}`,
    Corpus: y.corpusEnd,
  }));

  // PDF export (report)
  const exportPDF = async () => {
    if (!reportRef.current) return;
    const canvas = await html2canvas(reportRef.current, { scale: 2 });
    const img = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "pt", "a4");
    const w = pdf.internal.pageSize.getWidth();
    const h = (canvas.height * w) / canvas.width;
    pdf.addImage(img, "PNG", 0, 0, w, h);
    pdf.save("mobile-investment-report.pdf");
  };

  // ---------------- UI (mobile-first) ----------------
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-sky-50 flex flex-col">
      {/* Top bar */}
      <header className="p-4 sticky top-0 bg-white/60 backdrop-blur border-b border-slate-100 z-20">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-sm text-slate-500">Planner</div>
            <div className="text-lg font-bold text-slate-800">SIP • Lumpsum • SWP</div>
          </div>
          <button
            onClick={() => setPanelOpen(true)}
            className="px-3 py-2 bg-blue-600 text-white rounded-xl text-sm shadow"
            aria-label="Open inputs"
          >
            Edit Plan
          </button>
        </div>
      </header>

      {/* Main content (scrollable) */}
      <main className="flex-1 overflow-auto p-4 pb-28">
        {/* Hero card */}
        <section className="mb-4">
          <div className="bg-gradient-to-r from-sky-500 to-indigo-600 text-white rounded-2xl p-4 shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-xs opacity-90">Final Corpus (projected)</div>
                <div className="text-2xl font-bold mt-1">
                  ₹{fmt(result.monthlyData[result.monthlyData.length - 1]?.corpus ?? 0)}
                </div>
              </div>
              <div className="text-right text-sm">
                <div>Term: {inputs.investmentTerm} yrs</div>
                <div>SWP: Y{inputs.swpStartYear} → Y{inputs.swpEndYear}</div>
              </div>
            </div>
            <div className="mt-3 text-xs bg-white/10 p-2 rounded-md">
              Tip: Tap “Edit Plan” to change SIP, CAGR or SWP window. Charts and tables update instantly.
            </div>
          </div>
        </section>

        {/* Quick stats */}
        <section className="grid grid-cols-2 gap-3 mb-4">
          <div className="bg-white rounded-xl p-3 shadow">
            <div className="text-xs text-slate-500">Lump Sum</div>
            <div className="font-semibold">₹{fmt(inputs.lumpSum)}</div>
          </div>
          <div className="bg-white rounded-xl p-3 shadow">
            <div className="text-xs text-slate-500">Monthly SIP</div>
            <div className="font-semibold">₹{fmt(inputs.sipMonthly)}</div>
          </div>
        </section>

        {/* Tab content */}
        <section>
          {tab === "plan" && (
            <div className="space-y-3">
              <div className="bg-white rounded-xl p-3 shadow">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-xs text-slate-500">SIP Duration</div>
                    <div className="font-medium">{inputs.sipYears} years</div>
                  </div>
                  <div>
                    <div className="text-xs text-slate-500">CAGR</div>
                    <div className="font-medium">{inputs.cagrPercent}%</div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-3 shadow">
                <div className="text-xs text-slate-500">SWP</div>
                <div className="mt-2 flex items-center justify-between">
                  <div>
                    <div className="text-sm">Window</div>
                    <div className="font-medium">Y{inputs.swpStartYear} → Y{inputs.swpEndYear}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm">Mode</div>
                    <div className="font-medium">{inputs.swpMode === "percent" ? `${inputs.swpPercentAnnual}%` : `₹${fmt(inputs.swpFixedMonthly)}`}</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {tab === "chart" && (
            <div className="bg-white rounded-2xl p-3 shadow">
              <div style={{ width: "100%", height: 300 }}>
                <ResponsiveContainer>
                  <LineChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip formatter={(v) => fmt(v)} />
                    <Line type="monotone" dataKey="Corpus" stroke="#0ea5e9" dot={false} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          )}

          {tab === "table" && (
            <div className="space-y-3">
              <div className="bg-white rounded-xl overflow-auto shadow">
                <table className="w-full text-sm">
                  <thead className="bg-slate-50 sticky top-0">
                    <tr>
                      <th className="px-2 py-2">Year</th>
                      <th className="px-2 py-2 text-right">SIP</th>
                      <th className="px-2 py-2 text-right">SWP</th>
                      <th className="px-2 py-2 text-right">Corpus</th>
                    </tr>
                  </thead>
                  <tbody>
                    {result.yearlyData.map((y) => (
                      <tr key={y.year} className="odd:bg-white even:bg-slate-50">
                        <td className="px-2 py-2">{y.year}</td>
                        <td className="px-2 py-2 text-right">₹{fmt(y.sipTotal)}</td>
                        <td className="px-2 py-2 text-right">₹{fmt(y.withdrawTotal)}</td>
                        <td className="px-2 py-2 text-right">₹{fmt(y.corpusEnd)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {tab === "report" && (
            <div className="space-y-3" ref={reportRef}>
              <div className="bg-white rounded-xl p-4 shadow">
                <div className="text-sm text-slate-500">Snapshot</div>
                <div className="text-xl font-bold mt-2">Final Corpus</div>
                <div className="text-2xl text-blue-700">₹{fmt(result.monthlyData[result.monthlyData.length - 1]?.corpus ?? 0)}</div>
                <div className="mt-3 text-sm text-slate-600">Investment Term: {inputs.investmentTerm} yrs • SWP: Y{inputs.swpStartYear}→Y{inputs.swpEndYear}</div>
              </div>

              <button onClick={exportPDF} className="w-full py-3 bg-blue-600 text-white rounded-xl shadow">Export PDF</button>
            </div>
          )}
        </section>
      </main>

      {/* Bottom navigation */}
      <nav className="fixed left-0 right-0 bottom-0 bg-white/90 backdrop-blur border-t border-slate-200 p-2 flex items-center justify-around z-30">
        <button onClick={() => setTab("plan")} className={`flex-1 py-2 text-center ${tab === "plan" ? "text-blue-600 font-semibold" : "text-slate-600"}`}>Plan</button>
        <button onClick={() => setTab("chart")} className={`flex-1 py-2 text-center ${tab === "chart" ? "text-blue-600 font-semibold" : "text-slate-600"}`}>Chart</button>
        <button onClick={() => setTab("table")} className={`flex-1 py-2 text-center ${tab === "table" ? "text-blue-600 font-semibold" : "text-slate-600"}`}>Table</button>
        <button onClick={() => setTab("report")} className={`flex-1 py-2 text-center ${tab === "report" ? "text-blue-600 font-semibold" : "text-slate-600"}`}>Report</button>
      </nav>

      {/* Slide-up Input Panel */}
      <div className={`fixed inset-0 z-40 ${panelOpen ? "pointer-events-auto" : "pointer-events-none"}`}>
        <div
          className={`absolute inset-0 bg-black/40 transition-opacity ${panelOpen ? "opacity-60" : "opacity-0"}`}
          onClick={() => setPanelOpen(false)}
        />
        <div className={`absolute left-0 right-0 bottom-0 bg-white rounded-t-2xl shadow-xl transform transition-transform ${panelOpen ? "translate-y-0" : "translate-y-full"}`} style={{ maxHeight: "80vh" }}>
          <div className="p-4 border-b border-slate-100 flex items-center justify-between">
            <div>
              <div className="text-sm text-slate-500">Edit Plan</div>
              <div className="font-semibold">Inputs & SWP Settings</div>
            </div>
            <button onClick={() => setPanelOpen(false)} className="py-1 px-3 text-slate-600">Close</button>
          </div>

          <div className="p-4 overflow-auto" style={{ maxHeight: "64vh" }}>
            {/* Inputs grid */}
            <div className="grid grid-cols-1 gap-3">
              {[
                ["Lump Sum (₹)", "lumpSum"],
                ["Monthly SIP (₹)", "sipMonthly"],
                ["SIP Duration (yrs)", "sipYears"],
                ["Expected CAGR (%)", "cagrPercent"],
                ["Total Term (yrs)", "investmentTerm"],
                ["SWP Start Year", "swpStartYear"],
                ["SWP End Year", "swpEndYear"],
              ].map(([label, key]) => (
                <label key={key} className="block text-sm">
                  <div className="text-xs text-slate-500 mb-1">{label}</div>
                  <input
                    type="number"
                    value={inputs[key]}
                    onChange={(e) => setInput(key, e.target.value)}
                    className="w-full p-3 rounded-xl border bg-slate-50"
                  />
                </label>
              ))}

              <label className="block text-sm">
                <div className="text-xs text-slate-500 mb-1">SWP Mode</div>
                <select value={inputs.swpMode} onChange={(e) => setInput("swpMode", e.target.value)} className="w-full p-3 rounded-xl border bg-slate-50">
                  <option value="percent">Percent of Corpus</option>
                  <option value="fixed">Fixed Amount</option>
                </select>
              </label>

              {inputs.swpMode === "percent" ? (
                <label className="block text-sm">
                  <div className="text-xs text-slate-500 mb-1">SWP Annual %</div>
                  <input type="number" value={inputs.swpPercentAnnual} onChange={(e) => setInput("swpPercentAnnual", e.target.value)} className="w-full p-3 rounded-xl border bg-slate-50" />
                </label>
              ) : (
                <>
                  <label className="block text-sm">
                    <div className="text-xs text-slate-500 mb-1">Fixed Monthly (₹)</div>
                    <input type="number" value={inputs.swpFixedMonthly} onChange={(e) => setInput("swpFixedMonthly", e.target.value)} className="w-full p-3 rounded-xl border bg-slate-50" />
                  </label>
                  <label className="block text-sm">
                    <div className="text-xs text-slate-500 mb-1">Inflation % / yr</div>
                    <input type="number" value={inputs.swpInflationPercent} onChange={(e) => setInput("swpInflationPercent", e.target.value)} className="w-full p-3 rounded-xl border bg-slate-50" />
                  </label>
                </>
              )}

              <label className="block text-sm">
                <div className="text-xs text-slate-500 mb-1">SWP Frequency</div>
                <select value={inputs.swpFrequency} onChange={(e) => setInput("swpFrequency", e.target.value)} className="w-full p-3 rounded-xl border bg-slate-50">
                  <option value="yearly">Yearly</option>
                  <option value="monthly">Monthly</option>
                </select>
              </label>

              <div className="flex gap-2 mt-2">
                <button onClick={() => { setPanelOpen(false); setTab("plan"); }} className="flex-1 py-3 bg-slate-100 rounded-xl">Save</button>
                <button onClick={() => { setPanelOpen(false); }} className="flex-1 py-3 bg-blue-600 text-white rounded-xl">Close</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
