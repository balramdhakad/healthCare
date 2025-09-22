const FilterBar = ({
  appointmentTypeFilter,
  setAppointmentTypeFilter,
  sortBy,
  setSortBy,
}) => (
  <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 flex flex-col md:flex-row items-center justify-between gap-6">
    <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
      <span className="text-gray-700 font-semibold text-lg whitespace-nowrap">
        Filter by:
      </span>
      <div className="flex flex-wrap justify-center gap-2">
        <button
          onClick={() => setAppointmentTypeFilter("all")}
          className={`px-4 py-2 rounded-full font-medium transition-colors duration-200 ${
            appointmentTypeFilter === "all"
              ? "bg-blue-600 text-white shadow"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          All
        </button>
        <button
          onClick={() => setAppointmentTypeFilter("physical")}
          className={`px-4 py-2 rounded-full font-medium transition-colors duration-200 ${
            appointmentTypeFilter === "physical"
              ? "bg-blue-600 text-white shadow"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          In-Person
        </button>
        <button
          onClick={() => setAppointmentTypeFilter("video")}
          className={`px-4 py-2 rounded-full font-medium transition-colors duration-200 ${
            appointmentTypeFilter === "video"
              ? "bg-blue-600 text-white shadow"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          Virtual
        </button>
      </div>
    </div>

    {/* Sort By Dropdown */}
    <div className="flex items-center gap-3 w-full md:w-auto justify-center">
      <span className="text-gray-700 font-semibold text-lg whitespace-nowrap">
        Sort by:
      </span>
      <select
        value={sortBy}
        onChange={(e) => setSortBy(e.target.value)}
        className="px-4 py-2 rounded-full border border-gray-300 bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
      >
        <option value="experience">Experience</option>
        <option value="fees">Fees</option>
      </select>
    </div>
  </div>
);

export default FilterBar