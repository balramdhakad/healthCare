import React from "react";
import Section from "./Section";
import { FaClock } from "react-icons/fa";

const formatTime = (time) => {
  const [hour, minute] = time.split(":");
  const date = new Date();
  date.setHours(hour, minute);
  return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
};

const DoctorAvailability = ({ availability }) => {
  if (!availability || availability.length === 0) return null;

  return (
    <Section title="Availability">
      <div className="space-y-4">
        {availability.map((slot, index) => (
          <div
            key={index}
            className="flex justify-between items-center bg-gray-50 p-3 rounded-md border border-gray-200"
          >
            <div className="text-gray-800 font-medium capitalize">
              {slot.day}
            </div>
            <div className="flex items-center text-sm text-gray-700 gap-3">
              <span>
                {formatTime(slot.startTime)} - {formatTime(slot.endTime)}
              </span>
              <span className="flex items-center gap-1">
                <FaClock className="text-blue-600" /> {slot.slotDuration} min
              </span>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
};

export default DoctorAvailability;
