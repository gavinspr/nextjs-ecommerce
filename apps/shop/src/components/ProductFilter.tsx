export const ProductFilter = () => {
  // todo: update with actual filter options
  // todo: handle filter change
  return (
    <div className="mt-12 flex justify-between">
      <div className="flex gap-6 flex-wrap">
        <select
          name="type"
          id=""
          className="py-2 px-4 rounded-2xl text-xs bg-blue-200 font-medium"
        >
          <option>Type</option>
          <option value="physical">Physical</option>
          <option value="digital">Digital</option>
        </select>
        <input
          type="text"
          name="min"
          placeholder="min price"
          className="text-xs rounded-2xl pl-2 w-24 ring-1 ring-gray-400"
        />
        <input
          type="text"
          name="max"
          placeholder="max price"
          className="text-xs rounded-2xl pl-2 w-24 ring-1 ring-gray-400"
        />
        <select
          name="size"
          id=""
          className="py-2 px-4 rounded-2xl text-xs bg-blue-200 font-medium"
        >
          <option>Size</option>
        </select>
        <select
          name="color"
          id=""
          className="py-2 px-4 rounded-2xl text-xs bg-blue-200 font-medium"
        >
          <option>Color</option>
          <option value="blue">Blue</option>
        </select>
        <select
          name="category"
          id=""
          className="py-2 px-4 rounded-2xl text-xs bg-blue-200 font-medium"
        >
          <option>Category</option>
          <option value="new">New Arrivals</option>
          <option value="popular">Popular</option>
        </select>
        <select
          name="type"
          id=""
          className="py-2 px-4 rounded-2xl text-xs bg-blue-200 font-medium"
        >
          <option>All Filters</option>
        </select>
      </div>
      <div className="">
        <select
          name="sort"
          id=""
          className="py-2 px-4 rounded-2xl text-xs bg-white font-medium ring-1 ring-gray-400"
        >
          <option>Sort By</option>
          <option>Price (low to high)</option>
          <option>Price (high to low)</option>
          <option>Newest</option>
          <option>Oldest</option>
        </select>
      </div>
    </div>
  );
};
