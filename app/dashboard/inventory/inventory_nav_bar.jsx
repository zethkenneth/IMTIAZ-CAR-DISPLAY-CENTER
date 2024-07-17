const InventoryNavBar = () => {
  return (
    <div className="flex justify-between items-center bg-gray-100 border-b border-gray-300">
      <h1 className="text-2xl">Inventory</h1>
      <div className="flex justify-between items-center bg-gray-100 p-2">
        {/* Search Bar */}
        <div className="flex-1 flex items-center px-4 bg-orange">
          <input
            type="text"
            placeholder="Search..."
            className="w-full h-10 px-4 border rounded-3xl shadow-sm"
          />
        </div>
        {/* All Button */}
        <button className="mx-2 px-4 py-2 bg-orange-500 text-white rounded-3xl hover:bg-orange-600">
          All
        </button>

        {/* Category Buttons */}
        <div className="flex space-x-2">
          <button className="px-4 py-2 bg-gray-500 text-white rounded-3xl hover:bg-orange-600">
            New Car
          </button>
          <button className="px-4 py-2 bg-gray-500 text-white rounded-3xl hover:bg-orange-600">
            Second Hand
          </button>
          <button className="px-4 py-2 bg-gray-500 text-white rounded-3xl hover:bg-orange-600">
            Parts
          </button>
          <button className="px-4 py-2 bg-gray-500 text-white rounded-3xl hover:bg-orange-600">
            Low Stock
          </button>
        </div>
      </div>
    </div>
  );
};

export default InventoryNavBar;
