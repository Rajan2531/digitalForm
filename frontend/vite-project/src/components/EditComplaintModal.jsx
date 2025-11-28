import React, { useState } from "react";
import axios from "axios";

export default function EditComplaintModal({ complaint, apiBase, onClose, onSaved }) {
  const [form, setForm] = useState({ ...complaint });
  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const saveChanges = async () => {
    await axios.patch(`${apiBase}/api/complaints/${complaint._id}/update`, form);
    onSaved(form);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center p-4 z-50">
      <div className="bg-white w-full max-w-2xl p-6 rounded-2xl shadow-xl">

        <h2 className="text-2xl font-bold text-blue-700 mb-4">Edit Complaint</h2>

        <div className="grid grid-cols-2 gap-4">
          <label className="text-sm">
            Complainant Name
            <input
              className="input"
              name="complainant_name"
              value={form.complainant_name}
              onChange={handleChange}
            />
          </label>

          <label className="text-sm">
            Fraudster Phone
            <input
              className="input"
              name="fraudster_phone"
              value={form.fraudster_phone}
              onChange={handleChange}
            />
          </label>

          <label className="text-sm col-span-2">
            Fraud Description
            <textarea
              className="input"
              rows={3}
              name="fraud_description"
              value={form.fraud_description}
              onChange={handleChange}
            ></textarea>
          </label>
        </div>

        <div className="flex justify-end gap-3 mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
          >
            Cancel
          </button>
          <button
            onClick={saveChanges}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Save Changes
          </button>
        </div>

      </div>
    </div>
  );
}
