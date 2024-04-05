interface SortableHeaderProps {
  label: string;
  sortBy: string;
  sortOrder: "asc" | "desc";
  onSortChange: (newSortBy: string, newSortOrder: "asc" | "desc") => void;
}

export default function SortableHeader({ label, sortBy, sortOrder, onSortChange }: SortableHeaderProps) {
  const isSorting = sortBy === label;
  const icon = isSorting && sortOrder === "asc" ? "▲" : "▼";

  const handleClick = () => {
    onSortChange(label, isSorting && sortOrder === "asc" ? "desc" : "asc");
  };

  return (
    <th onClick={handleClick} className="sortable-header">
      <div className="sort-header">
        <span className="header-label">{label}</span>
        {isSorting && <span className="sort-arrow">{icon}</span>}
      </div>
    </th>
  );
}
