import FormatDate from "../../../components/FormateDate";

const HistoryTimelineItem = ({ record, onImageClick }) => {

  return (
    <div className="relative pl-8 pb-8">
      <div className="absolute left-0 top-2 w-4 h-4 bg-white border-2 border-teal-500 rounded-full z-10"></div>
      <div className="absolute left-[7px] h-full w-[2px] bg-gray-200 top-0"></div>

      <div className="p-4 border border-gray-200 rounded-lg shadow-sm bg-white ml-2">
        <div className="flex items-start space-x-3 mb-3 border-b pb-2">
          <div className="pt-1">
            {record.image ? (
              <img
                src={record?.image}
                alt={record?.condition}
                className="w-14 h-14 rounded-md object-cover border cursor-pointer"
                onClick={() => onImageClick(record?.image)}
              />
            ) : <></>}
            <p className="text-sm">click here</p>
          </div>
          <div>
            <h3 className="text-lg font-bold text-gray-800">
              {record.condition}
            </h3>
            <p className="text-xs text-gray-500">
              Diagnosed: {FormatDate(record.diagnosisDate)}
            </p>
          </div>
        </div>

        <div className="space-y-2 text-sm text-gray-700">
          <p>
            <span className="font-semibold text-teal-700">Treatment:</span>
            {record.treatment}
          </p>
          <p>
            <span className="font-semibold text-teal-700">Doctor:</span>
            {record.doctorName || "Unknown"}
          </p>
          <p className="border-t pt-2 mt-2">
            <span className="font-semibold">Notes:</span> {record.notes}
          </p>
        </div>
      </div>
    </div>
  );
};


export default HistoryTimelineItem