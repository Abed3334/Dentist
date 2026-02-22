interface CategoryListProps {
  categories: any[];
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
}

export function CategoryList({ categories, selectedCategory, onSelectCategory }: CategoryListProps) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-[#E5E7EB] p-4">
      <h3 className="text-lg font-semibold text-[#0B1F3B] mb-4 px-2">Categories</h3>
      <div className="space-y-1 hidden lg:block">
        {categories.map(cat => (
          <button
            key={cat.id}
            onClick={() => onSelectCategory(cat.id)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 cursor-pointer ${
              selectedCategory === cat.id
                ? 'bg-[#0F766E] text-white'
                : 'text-[#6B7280] hover:bg-[#F7FAFC]'
            }`}
          >
            <i className={`${cat.icon} text-xl`} />
            <span className="font-medium">{cat.name}</span>
          </button>
        ))}
      </div>

      {/* Mobile: Horizontal Scroll */}
      <div className="flex lg:hidden overflow-x-auto gap-2 pb-2 -mx-4 px-4">
        {categories.map(cat => (
          <button
            key={cat.id}
            onClick={() => onSelectCategory(cat.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-200 whitespace-nowrap cursor-pointer ${
              selectedCategory === cat.id
                ? 'bg-[#0F766E] text-white'
                : 'bg-[#F7FAFC] text-[#6B7280]'
            }`}
          >
            <i className={`${cat.icon} text-lg`} />
            <span className="font-medium text-sm">{cat.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
}