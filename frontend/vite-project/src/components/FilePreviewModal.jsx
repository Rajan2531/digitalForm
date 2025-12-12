

import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
const apiBase = import.meta.env.VITE_BASE_URL
/**
 * ComplaintFullView  —  CRM UI + Highlighted Labels (STYLE 1)
 *
 * Includes:
 * - Style-1 Highlight Labels (indigo soft highlight)
 * - CRM card-based layout
 * - Accordion with animation
 * - Sorting in transactions
 * - Print-friendly layout
 * - Inline icons (no external dependency)
 * - Full UI polish
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
        return [...prev, ...Array(count - prev.length).fill({ expanded: true, sortBy: "date", sortDir: "desc" })];
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
      bank.transactions = [...(bank.transactions || []), { amount: "", date: "", time: "", refNo: "" }];
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
      await axios.patch(`${apiBase}/api/v1/complaints/${form._id}/update`, form, {withCredentials:true});
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
  // LABEL STYLE 1
  // ---------------------------------------
  const FieldLabel = ({ children }) => (
    <div className="inline-block mb-1 px-2 py-0.5 bg-indigo-50 text-indigo-700 text-s font-bold rounded">
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
    <svg className={`w-4 h-4 transform transition ${open ? "rotate-180" : ""}`} viewBox="0 0 20 20" fill="none">
      <path d="M6 8l4 4 4-4" stroke="currentColor" strokeWidth="1.5"/>
    </svg>
  );

  const SortIcon = () => (
    <svg className="w-3.5 h-3.5 text-slate-400" viewBox="0 0 20 20">
      <path d="M7 7h6M7 10h4M7 13h2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  );

  return (
    <div className="fixed inset-0 bg-slate-50 overflow-y-auto z-50">
      {/* Header */}
      <div className="sticky top-0 bg-white border-b px-6 py-3 flex justify-between items-center z-40">
        <div>
          <div className="text-2xl font-bold text-slate-900">{form.complaint_id}</div>
          <div className="text-xs text-slate-500">
            {form.createdAt ? new Date(form.createdAt).toLocaleString() : ""}
          </div>
        </div>

        <div className="flex gap-2">
          <button onClick={onClose} className="px-3 py-2 text-sm bg-slate-100 rounded-md">
            ← Back
          </button>

          {/* <button onClick={() => window.print()} className="px-3 py-2 text-sm border rounded-md">
            Print
          </button> */}
          <button
  onClick={() => window.open(`${apiBase}/api/v1/exports/${form._id}/pdf`, "_blank")}
  className="px-3 py-2 text-sm bg-indigo-600 text-white rounded-md"
>
  Download PDF
</button>


          <button
            onClick={() => setEditMode((s) => !s)}
            className={`px-3 py-2 text-sm text-white rounded-md ${
              editMode ? "bg-rose-600" : "bg-indigo-600"
            }`}
          >
            {editMode ? "Cancel" : "Edit"}
          </button>
        </div>
      </div>

      {/* BODY */}
      <div className="max-w-7xl mx-auto p-6 space-y-8">
        {/* --------------------------------------- */}
        {/* TOP CARDS */}
        {/* --------------------------------------- */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* LEFT: COMPLAINT INFO */}
          <div className="lg:col-span-2 bg-white p-6 rounded-xl border shadow-sm">
            <FieldLabel>Complaint Information</FieldLabel>

            <div className="mt-4 grid sm:grid-cols-2 gap-4">
              {/* GD Number */}
              <div>
                <FieldLabel>GD Number</FieldLabel>
                {editMode ? (
                  <input className="w-full px-3 py-2 border rounded-md bg-slate-50"
                    value={form.gd_case_no || ""}
                    onChange={(e) => updateField("gd_case_no", e.target.value)}
                  />
                ) : (
                  <div className="font-medium">{form.gd_case_no || "—"}</div>
                )}
              </div>

              {/* NCRP number */}
              <div>
                <FieldLabel>NCRP Number</FieldLabel>
                {editMode ? (
                  <input className="w-full px-3 py-2 border rounded-md bg-slate-50"
                    value={form.ncrp || ""}
                    onChange={(e) => updateField("ncrp", e.target.value)}
                  />
                ) : (
                  <div className="font-medium">{form.ncrp || "—"}</div>
                )}
              </div>

              {/* Police Station */}
              <div>
                <FieldLabel>Police Station</FieldLabel>
                {editMode ? (
                  <input className="w-full px-3 py-2 border rounded-md bg-slate-50"
                    value={form.police_station || ""}
                    onChange={(e) => updateField("police_station", e.target.value)}
                  />
                ) : (
                  <div className="font-medium">{form.police_station || "—"}</div>
                )}
              </div>

              {/* Amount */}
              <div>
                <FieldLabel>Fraud Amount</FieldLabel>
                {editMode ? (
                  <input type="number" className="w-full px-3 py-2 border rounded-md bg-slate-50"
                    value={form.total_amount || ""}
                    onChange={(e) => updateField("total_amount", e.target.value)}
                  />
                ) : (
                  <div className="font-bold text-lg text-emerald-700">
                    ₹{form.total_amount?.toLocaleString() || 0}
                  </div>
                )}
              </div>

              {/* Fraudster Phone */}
              <div>
                <FieldLabel>Fraudster Phone</FieldLabel>
                {editMode ? (
                  <input className="w-full px-3 py-2 border rounded-md bg-slate-50"
                    value={form.fraudster_phone || ""}
                    onChange={(e) => updateField("fraudster_phone", e.target.value)}
                  />
                ) : (
                  <div className="font-medium">{form.fraudster_phone || "—"}</div>
                )}
              </div>
            </div>

            {/* Description */}
            <div className="mt-6">
              <FieldLabel>Description</FieldLabel>
              <textarea
                className="w-full p-3 bg-slate-50 border rounded-md font-semibold "
                rows={5}
                readOnly={!editMode}
                value={form.fraud_description || ""}
                onChange={(e) => updateField("fraud_description", e.target.value)}
              />
            </div>
          </div>

          {/* RIGHT: COMPLAINANT */}
          <div className="bg-white p-6 rounded-xl border shadow-sm">
            <FieldLabel>Complainant</FieldLabel>

            <div className="mt-4 space-y-3">
              <div>
                <FieldLabel>Name</FieldLabel>
                <input readOnly={!editMode}
                  value={form.complainant_name || ""}
                  onChange={(e) => updateField("complainant_name", e.target.value)}
                  className={`w-full px-3 py-2 border rounded-md ${editMode ? "bg-slate-50" : ""}`}
                />
              </div>

              <div>
                <FieldLabel>Relation</FieldLabel>
                <input readOnly={!editMode}
                  value={form.relation || ""}
                  onChange={(e) => updateField("relation", e.target.value)}
                  className={`w-full px-3 py-2 border rounded-md ${editMode ? "bg-slate-50" : ""}`}
                />
              </div>

              <div>
                <FieldLabel>Phone</FieldLabel>
                <input readOnly={!editMode}
                  value={form.phone_no || ""}
                  onChange={(e) => updateField("phone_no", e.target.value)}
                  className={`w-full px-3 py-2 border rounded-md ${editMode ? "bg-slate-50" : ""}`}
                />
              </div>

              <div>
                <FieldLabel>Email</FieldLabel>
                <input readOnly={!editMode}
                  value={form.email_id || ""}
                  onChange={(e) => updateField("email_id", e.target.value)}
                  className={`w-full px-3 py-2 border rounded-md ${editMode ? "bg-slate-50" : ""}`}
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <FieldLabel>DOB</FieldLabel>
                  <input type="date" readOnly={!editMode}
                    value={form.dob || ""}
                    onChange={(e) => updateField("dob", e.target.value)}
                    className={`w-full px-3 py-2 border rounded-md ${editMode ? "bg-slate-50" : ""}`}
                  />
                </div>

                <div>
                  <FieldLabel>Age</FieldLabel>
                  <input type="number" readOnly={!editMode}
                    value={form.age || ""}
                    onChange={(e) => updateField("age", e.target.value)}
                    className={`w-full px-3 py-2 border rounded-md ${editMode ? "bg-slate-50" : ""}`}
                  />
                </div>
              </div>

              <div>
                <FieldLabel>Sex</FieldLabel>
                <select disabled={!editMode}
                  value={form.sex || ""}
                  onChange={(e) => updateField("sex", e.target.value)}
                  className={`w-full px-3 py-2 border rounded-md ${editMode ? "bg-slate-50" : ""}`}>
                  <option value="">Select</option>
                  <option>Male</option>
                  <option>Female</option>
                  <option>Other</option>
                </select>
              </div>

              <div>
                <FieldLabel>Address(Present)</FieldLabel>
                <input readOnly={!editMode}
                  value={form.present_address || ""}
                  onChange={(e) => updateField("present_address", e.target.value)}
                  className={`w-full px-3 py-2 border rounded-md ${editMode ? "bg-slate-50" : ""}`}
                />
              </div>


            </div>
          </div>
        </div>

        {/* --------------------------------------- */}
        {/* BANKS SECTION */}
        {/* --------------------------------------- */}
        <div className="space-y-4">
          <div className="flex justify-between">
            <FieldLabel>Bank & Transaction Details</FieldLabel>
            {editMode && (
              <button onClick={addBank} className="px-3 py-2 bg-indigo-600 text-white text-sm rounded-md">
                + Add Bank
              </button>
            )}
          </div>

          {(form.banks || []).map((bank, bi) => {
            const ui = bankUI[bi];
            const sortedTx = getSortedTransactions(bi, bank.transactions || []);

            return (
              <div key={bi} className="bg-white border rounded-xl shadow-sm overflow-hidden">
                {/* Summary */}
                <div className="px-5 py-4 flex justify-between items-center">
                  <div>
                    <div className="font-semibold text-slate-900">
                      {bank.bank_name || `Bank ${bi + 1}`}
                    </div>
                    <div className="text-xs text-slate-500">
                      {mask(bank.account_no)} • {bank.ifsc || "N/A"}
                    </div>
                  </div>

                  <div className="flex gap-3">
                    {editMode && (
                      <button onClick={() => removeBank(bi)} className="px-3 py-1 bg-rose-100 text-rose-700 rounded-md text-sm">
                        Remove
                      </button>
                    )}

                    <button
                      onClick={() =>
                        setBankUI((s) =>
                          s.map((x, i) => (i === bi ? { ...x, expanded: !x.expanded } : x))
                        )
                      }
                      className="px-3 py-1 bg-slate-100 rounded-md text-sm flex items-center gap-2"
                    >
                      <Chevron open={ui.expanded} />
                      {ui.expanded ? "Collapse" : "Expand"}
                    </button>
                  </div>
                </div>

                {/* PANEL */}
                <div
                  className={`px-5 transition-all duration-300 overflow-hidden ${
                    ui.expanded ? "max-h-[1000px] py-5" : "max-h-0 py-0"
                  }`}
                >
                  {/* Bank Fields */}
                  <div className="grid md:grid-cols-3 gap-4">
                    <div>
                      <FieldLabel>Bank Name</FieldLabel>
                      <input readOnly={!editMode}
                        value={bank.bank_name || ""}
                        onChange={(e) => updateBankField(bi, "bank_name", e.target.value)}
                        className={`w-full px-3 py-2 border rounded-md ${
                          editMode ? "bg-slate-50" : ""
                        }`}
                      />
                    </div>

                    <div>
                      <FieldLabel>Account Number</FieldLabel>
                      <input readOnly={!editMode}
                        value={bank.account_no || ""}
                        onChange={(e) => updateBankField(bi, "account_no", e.target.value)}
                        className={`w-full px-3 py-2 border rounded-md ${
                          editMode ? "bg-slate-50" : ""
                        }`}
                      />
                    </div>

                    <div>
                      <FieldLabel>IFSC</FieldLabel>
                      <input readOnly={!editMode}
                        value={bank.ifsc || ""}
                        onChange={(e) => updateBankField(bi, "ifsc", e.target.value)}
                        className={`w-full px-3 py-2 border rounded-md ${
                          editMode ? "bg-slate-50" : ""
                        }`}
                      />
                    </div>
                  </div>

                  {/* Transactions */}
                  <div className="mt-6">
                    <div className="flex justify-between mb-3">
                      <FieldLabel>Transactions</FieldLabel>
                      {editMode && (
                        <button
                          onClick={() => addTransaction(bi)}
                          className="px-3 py-2 text-sm bg-emerald-600 text-white rounded"
                        >
                          + Add Tx
                        </button>
                      )}
                    </div>

                    {/* Table */}
                    <div className="overflow-x-auto border rounded-md">
                      <table className="w-full text-sm">
                        <thead className="bg-slate-100">
                          <tr>
                            {["refNo", "date", "time", "amount"].map((col) => (
                              <th key={col} className="px-4 py-2 text-left cursor-pointer" onClick={() => toggleSort(bi, col)}>
                                <div className="flex items-center gap-1">
                                  {col === "refNo" && "Transaction Id/ UTR no"}
                                  {col === "date" && "Date"}
                                  {col === "time" && "Time"}
                                  {col === "amount" && "Amount"}
                                  <SortIcon />
                                </div>
                              </th>
                            ))}
                            {editMode && <th className="px-4 py-2">Actions</th>}
                          </tr>
                        </thead>

                        <tbody>
                          {sortedTx.map((tx, ti) => (
                            <tr key={ti} className="border-t bg-yellow-50 font-bold">
                              {/* Reference */}
                              <td className="px-4 py-2 font-semibold">
                                {editMode ? (
                                  <input className="w-full px-2 py-1 border rounded-md"
                                    value={tx.refNo || ""}
                                    onChange={(e) => updateTransactionField(bi, ti, "refNo", e.target.value)}
                                  />
                                ) : (
                                  tx.refNo || "—"
                                )}
                              </td>

                              {/* Date */}
                              <td className="px-4 py-2">
                                {editMode ? (
                                  <input type="date" className="w-full px-2 py-1 border rounded-md"
                                    value={tx.date || ""}
                                    onChange={(e) => updateTransactionField(bi, ti, "date", e.target.value)}
                                  />
                                ) : (
                                  tx.date || "—"
                                )}
                              </td>

                              {/* Time */}
                              <td className="px-4 py-2">
                                {editMode ? (
                                  <input type="time" className="w-full px-2 py-1 border rounded-md"
                                    value={tx.time || ""}
                                    onChange={(e) => updateTransactionField(bi, ti, "time", e.target.value)}
                                  />
                                ) : (
                                  tx.time || "—"
                                )}
                              </td>

                              {/* Amount */}
                              <td className="px-4 py-2 text-centre font-semibold text-emerald-700">
                                {editMode ? (
                                  <input type="number" className="w-full px-2 py-1 border rounded-md text-right"
                                    value={tx.amount || ""}
                                    onChange={(e) => updateTransactionField(bi, ti, "amount", e.target.value)}
                                  />
                                ) : (
                                  `₹${Number(tx.amount || 0).toLocaleString()}`
                                )}
                              </td>

                              {/* Remove */}
                              {editMode && (
                                <td className="px-4 py-2">
                                  <button onClick={() => removeTransaction(bi, ti)} className="px-3 py-1 bg-rose-200 text-rose-800 rounded-md">
                                    Remove
                                  </button>
                                </td>
                              )}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* --------------------------------------- */}
        {/* DOCUMENTS */}
        {/* --------------------------------------- */}
        <div className="bg-white p-6 border rounded-xl shadow-sm">
          <FieldLabel>Uploaded Documents</FieldLabel>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
            {!form.files && <div className="text-slate-500 italic">No documents available.</div>}

            {form.files &&
              Object.entries(form.files).flatMap(([key, val]) =>
                (Array.isArray(val) ? val : [val]).map((file, i) => (
                  
                  <a
  key={i}
  href={file.startsWith("http") ? file : `${apiBase}/uploads/${file}`}
  target="_blank"
  rel="noopener noreferrer"
  className="flex items-center gap-4 p-4 bg-slate-50 border rounded-lg hover:bg-white"
>

                    <div className="w-12 h-12 flex items-center justify-center border rounded bg-white text-indigo-600">
                      📄
                    </div>
                    <div>
                      <div className="font-semibold">{key.replace(/_/g, " ").toUpperCase()}</div>
                      <div className="text-xs text-slate-500">Document {i + 1}</div>
                    </div>
                    <div className="ml-auto text-indigo-600 text-sm">View →</div>
                  </a>
                ))
              )}
          </div>
        </div>

        {/* <div className="bg-white p-6 border rounded-xl shadow-sm">
  <FieldLabel>Uploaded Documents</FieldLabel>

  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
    {!form.files && (
      <div className="text-slate-500 italic">No documents available.</div>
    )}

    {form.files &&
      Object.entries(form.files).flatMap(([key, val]) =>
        (Array.isArray(val) ? val : [val]).map((file, i) => (
          <a
            key={i}
            href={file}  // <-- FIXED: Cloudinary URL already complete
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-4 p-4 bg-slate-50 border rounded-lg hover:bg-white"
          >
            <div className="w-12 h-12 flex items-center justify-center border rounded bg-white text-indigo-600">
              📄
            </div>
            <div>
              <div className="font-semibold">
                {key.replace(/_/g, " ").toUpperCase()}
              </div>
              <div className="text-xs text-slate-500">Document {i + 1}</div>
            </div>
            <div className="ml-auto text-indigo-600 text-sm">View →</div>
          </a>
        ))
      )}
  </div>
</div> */}


        {/* --------------------------------------- */}
        {/* SAVE BUTTON */}
        {/* --------------------------------------- */}
        {editMode && (
          <div className="flex justify-end gap-3">
            <button
              onClick={() => {
                setEditMode(false);
                setForm(complaint ? JSON.parse(JSON.stringify(complaint)) : {});
                setBankUI((complaint?.banks || []).map(() => ({ expanded: true, sortBy: "date", sortDir: "desc" })));
              }}
              className="px-4 py-2 bg-white border rounded-md"
            >
              Cancel
            </button>

            <button
              onClick={saveChanges}
              disabled={saving}
              className="px-4 py-2 bg-emerald-600 text-white rounded-md"
            >
              {saving ? "Saving..." : "Save Changes"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
