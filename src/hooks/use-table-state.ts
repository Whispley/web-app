import { useState, useMemo } from "react";
import {
  type ColumnFiltersState,
  type PaginationState,
  type SortingState,
  type VisibilityState,
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getPaginationRowModel,
  getFilteredRowModel,
  getFacetedUniqueValues,
  type ColumnDef,
} from "@tanstack/react-table";

export interface UseTableStateProps<TData> {
  data: TData[];
  columns: ColumnDef<TData>[];
  initialSorting?: SortingState;
  pageSize?: number;
}

/**
 * Custom hook for managing table state and configuration
 * Encapsulates all the react-table setup and state management
 */
export function useTableState<TData>({
  data,
  columns,
  initialSorting = [],
  pageSize = 10,
}: UseTableStateProps<TData>) {
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize,
  });
  const [sorting, setSorting] = useState<SortingState>(initialSorting);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onSortingChange: setSorting,
    enableSortingRemoval: false,
    getPaginationRowModel: getPaginationRowModel(),
    onPaginationChange: setPagination,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    getFilteredRowModel: getFilteredRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    state: {
      sorting,
      pagination,
      columnFilters,
      columnVisibility,
    },
  });

  return {
    table,
    // State values
    columnFilters,
    columnVisibility,
    pagination,
    sorting,
    // State setters
    setColumnFilters,
    setColumnVisibility,
    setPagination,
    setSorting,
  };
}

/**
 * Custom hook for status filtering functionality
 * Provides all the logic needed for faceted status filtering
 */
export function useStatusFilter<TData>(
  table: ReturnType<typeof useReactTable<TData>>,
  columnKey?: string
) {
  const statusColumn = columnKey ? table.getColumn(columnKey) : null;
  const statusFacetedValues = statusColumn?.getFacetedUniqueValues();
  const statusFilterValue = statusColumn?.getFilterValue();

  const uniqueStatusValues = useMemo(() => {
    if (!statusColumn) return [];
    const values = Array.from(statusFacetedValues?.keys() ?? []);
    return values.sort();
  }, [statusColumn, statusFacetedValues]);

  const statusCounts = useMemo(() => {
    if (!statusColumn) return new Map();
    return statusFacetedValues ?? new Map();
  }, [statusColumn, statusFacetedValues]);

  const selectedStatuses = useMemo(() => {
    return (statusFilterValue as string[]) ?? [];
  }, [statusFilterValue]);

  const handleStatusChange = (checked: boolean, value: string) => {
    if (!columnKey) return;
    
    const filterValue = table.getColumn(columnKey)?.getFilterValue() as string[];
    const newFilterValue = filterValue ? [...filterValue] : [];

    if (checked) {
      newFilterValue.push(value);
    } else {
      const index = newFilterValue.indexOf(value);
      if (index > -1) {
        newFilterValue.splice(index, 1);
      }
    }

    table
      .getColumn(columnKey)
      ?.setFilterValue(newFilterValue.length ? newFilterValue : undefined);
  };

  return {
    statusColumn,
    uniqueStatusValues,
    statusCounts,
    selectedStatuses,
    handleStatusChange,
  };
}