const formatTimeInput = (time) => time ? time.substring(0, 5) : '';


const SlotRow = ({ slot, index, onSlotChange, onRemove }) => (
    <div className="flex items-end space-x-4 p-4 border border-gray-200 rounded-lg mb-3">
        <div className="flex-1">
            <label className="text-xs text-gray-500 block mb-1">Start Time</label>
            <div className="relative">
                <input
                    type="time"
                    value={formatTimeInput(slot.startTime)}
                    onChange={(e) => onSlotChange(index, 'startTime', e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded focus:border-teal-500 focus:ring-teal-500"
                    required
                />
            </div>
        </div>
        <div className="flex-1">
            <label className="text-xs text-gray-500 block mb-1">End Time</label>
            <div className="relative">
                <input
                    type="time"
                    value={formatTimeInput(slot.endTime)}
                    onChange={(e) => onSlotChange(index, 'endTime', e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded focus:border-teal-500 focus:ring-teal-500"
                    required
                />
            </div>
        </div>
        <div className="w-24">
            <label className="text-xs text-gray-500 block mb-1">Slot (mins)</label>
            <input
                type="number"
                min="10"
                step="5"
                value={slot.slotDuration}
                onChange={(e) => onSlotChange(index, 'slotDuration', parseInt(e.target.value) || 30)}
                className="w-full p-2 border border-gray-300 rounded focus:border-teal-500 focus:ring-teal-500"
                required
            />
        </div>
        <button 
            type="button" 
            onClick={() => onRemove(index)} 
            className="text-gray-400 hover:text-red-500 transition mb-1 p-2"
        >
            {/* Trash Icon */}
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
        </button>
    </div>
);

export default SlotRow
