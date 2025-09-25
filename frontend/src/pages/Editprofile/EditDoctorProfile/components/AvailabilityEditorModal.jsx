import React, { useState, useEffect } from "react";
import SlotRow from "./Slotrow";
import { ImCross } from "react-icons/im";
import { FaPlus } from "react-icons/fa";

const formatTimeInput = (time) => (time ? time.substring(0, 5) : "");

const AvailabilityEditorModal = ({ day, initialSlots, onSave, onClose }) => {
  const [slots, setSlots] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setSlots(
      initialSlots.map((slot) => ({
        ...slot,
        startTime: formatTimeInput(slot.startTime),
        endTime: formatTimeInput(slot.endTime),
      }))
    );
  }, [initialSlots]);

  const handleAddSlot = () => {
    setSlots((prev) => [
      ...prev,
      { startTime: "09:00", endTime: "17:00", slotDuration: 30 },
    ]);
  };

  const handleSlotChange = (index, field, value) => {
    const newSlots = [...slots];
    newSlots[index][field] = value;
    setSlots(newSlots);
  };

  const handleRemoveSlot = (index) => {
    setSlots((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSave = () => {
    setLoading(true);

    const validSlots = slots.filter(
      (slot) =>
        slot.startTime &&
        slot.endTime &&
        slot.slotDuration &&
        slot.slotDuration > 0
    );

    if (slots.length > 0 && validSlots.length !== slots.length) {
      alert("Please ensure all time slots have valid times and duration.");
      setLoading(false);
      return;
    }

    const cleanedSlots = validSlots.map((slot) => ({
      day: day,
      startTime: slot.startTime,
      endTime: slot.endTime,
      slotDuration: slot.slotDuration,
    }));

    onSave(day, cleanedSlots);
    setLoading(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex justify-center items-center z-50 transition-opacity">
      <div className="bg-white rounded-lg shadow-2xl w-full max-w-4xl mx-4 my-10 max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="p-6 border-b flex justify-between items-center">
          <h2 className="text-2xl font-semibold text-gray-800">
            Manage Availability for {day}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-800"
          >
            <ImCross />
          </button>
        </div>

        {/* Slots Content  */}
        <div className="p-6 flex-grow overflow-y-auto">
          {slots.length > 0 ? (
            slots.map((slot, index) => (
              <SlotRow
                key={index}
                slot={slot}
                index={index}
                onSlotChange={handleSlotChange}
                onRemove={handleRemoveSlot}
              />
            ))
          ) : (
            <div className="text-center py-10 bg-gray-50 border border-dashed rounded-lg">
              <p className="text-gray-500">
                No time slots configured for {day}.
              </p>
              <p className="text-sm text-gray-400 mt-1">
                Use the 'Add Slot' button below to set your schedule.
              </p>
            </div>
          )}
        </div>

        <div className="p-6 border-t flex justify-between items-center">
          <button
            type="button"
            onClick={handleAddSlot}
            className="flex items-center text-teal-600 font-medium hover:text-teal-800"
            disabled={loading}
          >
            <FaPlus />
            Add Slot
          </button>
          <div className="space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSave}
              disabled={loading}
              className="px-6 py-2 text-white bg-teal-600 font-semibold rounded-lg hover:bg-teal-700 disabled:bg-teal-400"
            >
              {loading ? "Saving..." : "Save Availability"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AvailabilityEditorModal;
