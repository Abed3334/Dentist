interface TableSkeletonProps {
  rows?: number;
  columns?: number;
}

export function TableSkeleton({ rows = 5, columns = 6 }: TableSkeletonProps) {
  return (
    <div className="animate-pulse">
      <table className="w-full">
        <thead className="bg-background">
          <tr>
            {Array.from({ length: columns }, (_, i) => (
              <th key={i} className="px-6 py-4 text-left">
                <div className="h-4 bg-muted/40 rounded w-20" />
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {Array.from({ length: rows }, (_, rowIndex) => (
            <tr key={rowIndex}>
              {Array.from({ length: columns }, (_, colIndex) => (
                <td key={colIndex} className="px-6 py-4">
                  <div
                    className="h-4 bg-muted/30 rounded"
                    style={{ width: colIndex === 0 ? 120 : 80 + (colIndex % 3) * 20 }}
                  />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
