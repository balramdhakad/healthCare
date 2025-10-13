
const QuickActions = ({ setActiveComponent }) => {
  const actions = [
    { title: "Manage Orders", key: "orders" },
    { title: "Manage Doctors", key: "doctors" },
    { title: "Manage Products", key: "products" },
    { title: "Manage Community", key: "community" },
    { title: "Manage Appointments", key: "appointments" },
  ];

  return (
    <div>
      <h2 className="text-xl font-semibold mb-3">Quick Actions</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {actions.map((action) => (
          <button
            key={action.key}
            onClick={() => setActiveComponent(action.key)}
            className="bg-white shadow-sm rounded-lg p-5 hover:shadow-md transition w-full text-left"
          >
            <h3 className="font-semibold text-gray-800">{action.title}</h3>
          </button>
        ))}
      </div>
    </div>
  );
};


export default QuickActions