

import React, { useState } from "react";

export default function TransactionSection({ index, bank, updateBank }) {
  const [isExpanded, setIsExpanded] = useState(true);

  const handleBankChange = (e) => {
    const { name, value } = e.target;
    updateBank(index, { ...bank, [name]: value });
  };

  const handleTxnChange = (i, field, value) => {
    const newTxns = bank.transactions.map((txn, idx) =>
      idx === i ? { ...txn, [field]: value } : txn
    );
    updateBank(index, { ...bank, transactions: newTxns });
  };

  const addTransaction = () => {
    if (bank.transactions.length < 50) {
      updateBank(index, {
        ...bank,
        transactions: [
          ...bank.transactions,
          { amount: "", date: "", time: "", refNo: "" },
        ],
      });
    }
  };

  const removeTransaction = (i) => {
    if (bank.transactions.length > 1) {
      const updatedTxns = bank.transactions.filter((_, idx) => idx !== i);
      updateBank(index, { ...bank, transactions: updatedTxns });
    }
  };

  return (
    <fieldset className="border border-blue-100 bg-white rounded-xl p-4 sm:p-6 shadow-sm transition hover:shadow-md">
      <legend
        className="text-blue-700 font-semibold px-2 cursor-pointer flex items-center justify-between"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <span>Bank {index + 1} – Fraudulent Transaction Details</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={`h-5 w-5 text-blue-600 transform transition-transform ${
            isExpanded ? "rotate-180" : ""
          }`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </legend>

      {isExpanded && (
        <div className="mt-4 space-y-6">
          {/* Bank Info */}
          <div className="grid sm:grid-cols-3 gap-4">
            <label className="block text-sm text-gray-700 font-medium">
             Complainant’s Bank Name
              <input
                name="bank_name"
                value={bank.bank_name}
                onChange={handleBankChange}
                required
                className="input"
                placeholder="Enter bank name"
              />
            </label>

            <label className="block text-sm text-gray-700 font-medium">
              Complainant’s Bank A/C No.
              <input
                name="account_no"
                value={bank.account_no}
                onChange={handleBankChange}
                required
                className="input"
                placeholder="1234567890"
              />
            </label>

            <label className="block text-sm text-gray-700 font-medium">
              IFSC Code
              <input
                name="ifsc"
                value={bank.ifsc}
                onChange={handleBankChange}
                className="input"
                placeholder="SBIN0001234"
              />
            </label>
          </div>

          {/* Transactions */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h4 className="text-gray-700 font-semibold text-sm sm:text-base">
                Transaction Details
              </h4>
              <span className="text-xs text-gray-500">(Up to 50 entries)</span>
            </div>

            {/* Desktop Table View */}
            <div className="hidden sm:block overflow-x-auto">
              <table className="min-w-full border border-gray-200 rounded-lg bg-white">
                <thead className="bg-blue-100 text-gray-700 text-sm">
                  <tr>
                    <th className="px-2 py-2 border">#</th>
                    <th className="px-2 py-2 border text-left">Amount (₹)</th>
                    <th className="px-2 py-2 border text-left">Date</th>
                    <th className="px-2 py-2 border text-left">Time</th>
                    <th className="px-2 py-2 border text-left">Transaction ID / Ref No.</th>
                    {/* <th className="px-2 py-2 border text-center">Action</th> */}
                  </tr>
                </thead>
                <tbody>
                  {bank.transactions.map((txn, i) => (
                    <tr key={i} className="border-t">
                      <td className="text-center text-sm p-2">{i + 1}</td>
                      <td className="p-2">
                        <input
                          type="number"
                          placeholder="₹"
                          value={txn.amount}
                          onChange={(e) => handleTxnChange(i, "amount", e.target.value)}
                          className="input-sm"
                        />
                      </td>
                      <td className="p-2">
                        <input
                          type="date"
                          value={txn.date}
                          onChange={(e) => handleTxnChange(i, "date", e.target.value)}
                          className="input-sm"
                        />
                      </td>
                      <td className="p-2">
                        <input
                          type="time"
                          value={txn.time}
                          onChange={(e) => handleTxnChange(i, "time", e.target.value)}
                          className="input-sm"
                        />
                      </td>
                      <td className="p-2">
                        <input
                          type="text"
                          placeholder="Txn id / UTR no."
                          value={txn.refNo}
                          onChange={(e) => handleTxnChange(i, "refNo", e.target.value)}
                          className="input-sm"
                        />
                      </td>
                      <td className="text-center">
                        {bank.transactions.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeTransaction(i)}
                            className="text-red-600 hover:text-red-800 transition"
                            title="Remove this transaction"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth={2}
                              stroke="currentColor"
                              className="w-5 h-5 inline-block"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M18 6L6 18M6 6l12 12"
                              />
                            </svg>
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Card View */}
            <div className="block sm:hidden space-y-3">
              {bank.transactions.map((txn, i) => (
                <div
                  key={i}
                  className="border border-gray-200 rounded-lg bg-blue-50/40 p-3 shadow-sm relative"
                >
                  {/* ❌ Remove button (top-right corner) */}
                  {bank.transactions.length > 1 && (
              
                   
                    <span className = "absolute top-2 right-2 text-red-600 hover:text-red-800"  onClick={() => removeTransaction(i)} >-</span>
                  )}

                  <div className="flex justify-between text-sm font-semibold text-gray-700 mb-2">
                    <span>Transaction {i + 1}</span>
                  </div>
                  <div className="grid grid-cols-1 gap-2">
                    <input
                      type="number"
                      placeholder="Amount ₹"
                      value={txn.amount}
                      onChange={(e) => handleTxnChange(i, "amount", e.target.value)}
                      className="input-sm"
                    />
                    <input
                      type="date"
                      value={txn.date}
                      onChange={(e) => handleTxnChange(i, "date", e.target.value)}
                      className="input-sm"
                    />
                    <input
                      type="time"
                      value={txn.time}
                      onChange={(e) => handleTxnChange(i, "time", e.target.value)}
                      className="input-sm bg-blue-50"
                    />
                    <input
                      type="text"
                      placeholder="Transaction ID / UTR no."
                      value={txn.refNo}
                      onChange={(e) => handleTxnChange(i, "refNo", e.target.value)}
                      className="input-sm"
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Add Transaction Button */}
            {bank.transactions.length < 50 && (
              <button
                type="button"
                onClick={addTransaction}
                className="flex items-center gap-1 text-sm font-medium text-blue-700 hover:text-blue-900 transition mt-2"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="w-4 h-4"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                </svg>
                Add Another Transaction
              </button>
            )}
          </div>
        </div>
      )}
    </fieldset>
  );
}
