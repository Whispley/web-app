import { cn } from "@/lib/utils";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
} from "@/components/ui/pagination";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  type ColumnDef,
  type FilterFn,
  type SortingState,
  flexRender,
} from "@tanstack/react-table";
import {
  RiArrowDownSLine,
  RiArrowUpSLine,
  RiErrorWarningLine,
  RiCloseCircleLine,
  RiBardLine,
  RiFilter3Line,
  RiSearch2Line,
  RiMoreLine,
} from "@remixicon/react";
import {
  useId,
  useMemo,
  useRef,
  useState,
  useTransition,
  type ReactNode,
} from "react";
import { useTableState, useStatusFilter } from "@/hooks/use-table-state";

// Generic filter function for status-like fields
export const statusFilterFn: FilterFn<any> = (
  row,
  columnId,
  filterValue: string[]
) => {
  if (!filterValue?.length) return true;
  const status = row.getValue(columnId) as string;
  return filterValue.includes(status);
};

// Configuration for search/filter functionality
export interface SearchConfig {
  /** Column key to search/filter on */
  columnKey: string;
  /** Placeholder text for search input */
  placeholder: string;
  /** ARIA label for search input */
  ariaLabel: string;
}

// Configuration for status filtering
export interface StatusFilterConfig {
  /** Column key for status filtering */
  columnKey: string;
  /** Display name for the filter (e.g., "Status", "Type") */
  displayName: string;
}

// Row action configuration
export interface RowAction<TData> {
  /** Unique identifier for the action */
  id: string;
  /** Display label for the action */
  label: string;
  /** Action handler function */
  handler: (item: TData) => void;
  /** Whether the action is destructive (shown in red) */
  destructive?: boolean;
  /** Whether the action is disabled */
  disabled?: boolean;
}

// Bulk action configuration
export interface BulkAction<TData> {
  /** Unique identifier for the action */
  id: string;
  /** Display label for the action */
  label: string;
  /** Icon component to show */
  icon: ReactNode;
  /** Action handler function that receives selected items */
  handler: (items: TData[]) => void;
  /** Confirmation dialog configuration */
  confirmation?: {
    title: string;
    description: string;
    actionLabel: string;
  };
}

// Main DataTable props interface
export interface DataTableProps<TData> {
  /** Array of data to display */
  data: TData[];
  /** Function to update data */
  setData: React.Dispatch<React.SetStateAction<TData[]>>;
  /** Column definitions */
  columns: ColumnDef<TData>[];
  /** Loading state */
  isLoading?: boolean;
  /** Search configuration */
  searchConfig?: SearchConfig;
  /** Status filter configuration */
  statusFilterConfig?: StatusFilterConfig;
  /** Row actions configuration */
  rowActions?: RowAction<TData>[];
  /** Bulk actions configuration */
  bulkActions?: BulkAction<TData>[];
  /** Initial sorting state */
  initialSorting?: SortingState;
  /** Initial page size */
  pageSize?: number;
  /** Empty state message */
  emptyMessage?: string;
  /** Loading message */
  loadingMessage?: string;
}

/**
 * Generic, reusable data table component that supports:
 * - Flexible column configuration
 * - Search/filtering by any column
 * - Status filtering with faceted values
 * - Row actions with dropdown menu
 * - Bulk actions with confirmation dialogs
 * - Sorting, pagination, and column visibility
 * - Loading and empty states
 */
export function DataTable<TData extends Record<string, any>>({
  data,
  setData,
  columns: baseColumns,
  isLoading = false,
  searchConfig,
  statusFilterConfig,
  rowActions = [],
  bulkActions = [],
  initialSorting = [],
  pageSize = 10,
  emptyMessage = "No results.",
  loadingMessage = "Loading...",
}: DataTableProps<TData>) {
  const id = useId();
  const inputRef = useRef<HTMLInputElement>(null);

  // Enhanced columns with selection and actions
  const columns = useMemo(() => {
    const enhancedColumns: ColumnDef<TData>[] = [
      // Selection column
      {
        id: "select",
        header: ({ table }) => (
          <Checkbox
            checked={
              table.getIsAllPageRowsSelected() ||
              (table.getIsSomePageRowsSelected() && "indeterminate")
            }
            onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
            aria-label="Select all"
          />
        ),
        cell: ({ row }) => (
          <Checkbox
            checked={row.getIsSelected()}
            onCheckedChange={(value) => row.toggleSelected(!!value)}
            aria-label="Select row"
          />
        ),
        size: 28,
        enableSorting: false,
        enableHiding: false,
      },
      // Base columns
      ...baseColumns,
    ];

    // Add actions column if row actions are provided
    if (rowActions.length > 0) {
      enhancedColumns.push({
        id: "actions",
        header: () => <span className="sr-only">Actions</span>,
        cell: ({ row }) => (
          <RowActionsMenu
            item={row.original}
            actions={rowActions}
            data={data}
            setData={setData}
          />
        ),
        size: 60,
        enableHiding: false,
      });
    }

    return enhancedColumns;
  }, [baseColumns, rowActions, data, setData]);

  // Use custom hooks for table state and status filtering
  const { table } = useTableState({
    data,
    columns,
    initialSorting,
    pageSize,
  });

  const {
    uniqueStatusValues,
    statusCounts,
    selectedStatuses,
    handleStatusChange,
  } = useStatusFilter(table, statusFilterConfig?.columnKey);

  return (
    <div className="space-y-4">
      {/* Actions Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        {/* Left side - Search */}
        <div className="flex items-center gap-3">
          {searchConfig && (
            <div className="relative">
              <Input
                id={`${id}-input`}
                ref={inputRef}
                className={cn(
                  "peer min-w-60 ps-9 bg-background bg-gradient-to-br from-accent/60 to-accent",
                  Boolean(table.getColumn(searchConfig.columnKey)?.getFilterValue()) &&
                    "pe-9"
                )}
                value={
                  (table.getColumn(searchConfig.columnKey)?.getFilterValue() ??
                    "") as string
                }
                onChange={(e) =>
                  table.getColumn(searchConfig.columnKey)?.setFilterValue(e.target.value)
                }
                placeholder={searchConfig.placeholder}
                type="text"
                aria-label={searchConfig.ariaLabel}
              />
              <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-2 text-muted-foreground/60 peer-disabled:opacity-50">
                <RiSearch2Line size={20} aria-hidden="true" />
              </div>
              {Boolean(table.getColumn(searchConfig.columnKey)?.getFilterValue()) && (
                <button
                  className="absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center rounded-e-lg text-muted-foreground/60 outline-offset-2 transition-colors hover:text-foreground focus:z-10 focus-visible:outline-2 focus-visible:outline-ring/70 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
                  aria-label="Clear filter"
                  onClick={() => {
                    table.getColumn(searchConfig.columnKey)?.setFilterValue("");
                    if (inputRef.current) {
                      inputRef.current.focus();
                    }
                  }}
                >
                  <RiCloseCircleLine size={16} aria-hidden="true" />
                </button>
              )}
            </div>
          )}
        </div>

        {/* Right side - Actions */}
        <div className="flex items-center gap-3">
          {/* Bulk Actions */}
          {table.getSelectedRowModel().rows.length > 0 &&
            bulkActions.map((bulkAction) => (
              <BulkActionButton
                key={bulkAction.id}
                action={bulkAction}
                selectedRows={table.getSelectedRowModel().rows}
                table={table}
              />
            ))}

          {/* Status Filter */}
          {statusFilterConfig && uniqueStatusValues.length > 0 && (
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline">
                  <RiFilter3Line
                    className="size-5 -ms-1.5 text-muted-foreground/60"
                    size={20}
                    aria-hidden="true"
                  />
                  Filter
                  {selectedStatuses.length > 0 && (
                    <span className="-me-1 ms-3 inline-flex h-5 max-h-full items-center rounded border border-border bg-background px-1 font-[inherit] text-[0.625rem] font-medium text-muted-foreground/70">
                      {selectedStatuses.length}
                    </span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto min-w-36 p-3" align="end">
                <div className="space-y-3">
                  <div className="text-xs font-medium uppercase text-muted-foreground/60">
                    {statusFilterConfig.displayName}
                  </div>
                  <div className="space-y-3">
                    {uniqueStatusValues.map((value, i) => (
                      <div key={value} className="flex items-center gap-2">
                        <Checkbox
                          id={`${id}-${i}`}
                          checked={selectedStatuses.includes(value)}
                          onCheckedChange={(checked: boolean) =>
                            handleStatusChange(checked, value)
                          }
                        />
                        <Label
                          htmlFor={`${id}-${i}`}
                          className="flex grow justify-between gap-2 font-normal"
                        >
                          {value}{" "}
                          <span className="ms-2 text-xs text-muted-foreground">
                            {statusCounts.get(value)}
                          </span>
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          )}

          {/* New Filter Button */}
          <Button variant="outline">
            <RiBardLine
              className="size-5 -ms-1.5 text-muted-foreground/60"
              size={20}
              aria-hidden="true"
            />
            New Filter
          </Button>
        </div>
      </div>

      {/* Table */}
      <Table className="table-fixed border-separate border-spacing-0 [&_tr:not(:last-child)_td]:border-b">
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id} className="hover:bg-transparent">
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead
                    key={header.id}
                    style={{ width: `${header.getSize()}px` }}
                    className="relative h-9 select-none bg-sidebar border-y border-border first:border-l first:rounded-l-lg last:border-r last:rounded-r-lg"
                  >
                    {header.isPlaceholder ? null : header.column.getCanSort() ? (
                      <div
                        className={cn(
                          header.column.getCanSort() &&
                            "flex h-full cursor-pointer select-none items-center gap-2"
                        )}
                        onClick={header.column.getToggleSortingHandler()}
                        onKeyDown={(e) => {
                          if (
                            header.column.getCanSort() &&
                            (e.key === "Enter" || e.key === " ")
                          ) {
                            e.preventDefault();
                            header.column.getToggleSortingHandler()?.(e);
                          }
                        }}
                        tabIndex={header.column.getCanSort() ? 0 : undefined}
                      >
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                        {{
                          asc: (
                            <RiArrowUpSLine
                              className="shrink-0 opacity-60"
                              size={16}
                              aria-hidden="true"
                            />
                          ),
                          desc: (
                            <RiArrowDownSLine
                              className="shrink-0 opacity-60"
                              size={16}
                              aria-hidden="true"
                            />
                          ),
                        }[header.column.getIsSorted() as string] ?? null}
                      </div>
                    ) : (
                      flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )
                    )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <tbody aria-hidden="true" className="table-row h-1"></tbody>
        <TableBody>
          {isLoading ? (
            <TableRow className="hover:bg-transparent [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg">
              <TableCell colSpan={columns.length} className="h-24 text-center">
                {loadingMessage}
              </TableCell>
            </TableRow>
          ) : table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
                className="border-0 [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg h-px hover:bg-accent/50"
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id} className="last:py-0 h-[inherit]">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow className="hover:bg-transparent [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg">
              <TableCell colSpan={columns.length} className="h-24 text-center">
                {emptyMessage}
              </TableCell>
            </TableRow>
          )}
        </TableBody>
        <tbody aria-hidden="true" className="table-row h-1"></tbody>
      </Table>

      {/* Pagination */}
      {table.getRowModel().rows.length > 0 && (
        <div className="flex items-center justify-between gap-3">
          <p
            className="flex-1 whitespace-nowrap text-sm text-muted-foreground"
            aria-live="polite"
          >
            Page{" "}
            <span className="text-foreground">
              {table.getState().pagination.pageIndex + 1}
            </span>{" "}
            of <span className="text-foreground">{table.getPageCount()}</span>
          </p>
          <Pagination className="w-auto">
            <PaginationContent className="gap-3">
              <PaginationItem>
                <Button
                  variant="outline"
                  className="aria-disabled:pointer-events-none aria-disabled:opacity-50"
                  onClick={() => table.previousPage()}
                  disabled={!table.getCanPreviousPage()}
                  aria-label="Go to previous page"
                >
                  Previous
                </Button>
              </PaginationItem>
              <PaginationItem>
                <Button
                  variant="outline"
                  className="aria-disabled:pointer-events-none aria-disabled:opacity-50"
                  onClick={() => table.nextPage()}
                  disabled={!table.getCanNextPage()}
                  aria-label="Go to next page"
                >
                  Next
                </Button>
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}
    </div>
  );
}

// Row Actions Menu Component
interface RowActionsMenuProps<TData> {
  item: TData;
  actions: RowAction<TData>[];
  data: TData[];
  setData: React.Dispatch<React.SetStateAction<TData[]>>;
}

function RowActionsMenu<TData extends Record<string, any>>({
  item,
  actions,
}: RowActionsMenuProps<TData>) {
  const [isUpdatePending, startUpdateTransition] = useTransition();
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [pendingAction, setPendingAction] = useState<RowAction<TData> | null>(
    null
  );

  const handleAction = (action: RowAction<TData>) => {
    if (action.destructive) {
      setPendingAction(action);
      setShowDeleteDialog(true);
    } else {
      startUpdateTransition(() => {
        action.handler(item);
      });
    }
  };

  const handleConfirmAction = () => {
    if (pendingAction) {
      startUpdateTransition(() => {
        pendingAction.handler(item);
        setPendingAction(null);
        setShowDeleteDialog(false);
      });
    }
  };

  const regularActions = actions.filter((action) => !action.destructive);
  const destructiveActions = actions.filter((action) => action.destructive);

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div className="flex justify-end">
            <Button
              size="icon"
              variant="ghost"
              className="shadow-none text-muted-foreground/60"
              aria-label="Edit item"
            >
              <RiMoreLine className="size-5" size={20} aria-hidden="true" />
            </Button>
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-auto">
          {regularActions.length > 0 && (
            <DropdownMenuGroup>
              {regularActions.map((action) => (
                <DropdownMenuItem
                  key={action.id}
                  onClick={() => handleAction(action)}
                  disabled={isUpdatePending || action.disabled}
                >
                  {action.label}
                </DropdownMenuItem>
              ))}
            </DropdownMenuGroup>
          )}
          {regularActions.length > 0 && destructiveActions.length > 0 && (
            <DropdownMenuSeparator />
          )}
          {destructiveActions.map((action) => (
            <DropdownMenuItem
              key={action.id}
              onClick={() => handleAction(action)}
              disabled={isUpdatePending || action.disabled}
              variant="destructive"
              className="dark:data-[variant=destructive]:focus:bg-destructive/10"
            >
              {action.label}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isUpdatePending}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleConfirmAction}
              disabled={isUpdatePending}
              className="bg-destructive text-white shadow-xs hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40"
            >
              {pendingAction?.label || "Confirm"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}

// Bulk Action Button Component
interface BulkActionButtonProps<TData> {
  action: BulkAction<TData>;
  selectedRows: any[];
  table: any;
}

function BulkActionButton<TData>({
  action,
  selectedRows,
  table,
}: BulkActionButtonProps<TData>) {
  const handleAction = () => {
    const selectedItems = selectedRows.map((row) => row.original);
    action.handler(selectedItems);
    table.resetRowSelection();
  };

  if (action.confirmation) {
    return (
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button className="ml-auto" variant="outline">
            {action.icon}
            {action.label}
            <span className="-me-1 ms-1 inline-flex h-5 max-h-full items-center rounded border border-border bg-background px-1 font-[inherit] text-[0.625rem] font-medium text-muted-foreground/70">
              {selectedRows.length}
            </span>
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <div className="flex flex-col gap-2 max-sm:items-center sm:flex-row sm:gap-4">
            <div
              className="flex size-9 shrink-0 items-center justify-center rounded-full border border-border"
              aria-hidden="true"
            >
              <RiErrorWarningLine className="opacity-80" size={16} />
            </div>
            <AlertDialogHeader>
              <AlertDialogTitle>{action.confirmation.title}</AlertDialogTitle>
              <AlertDialogDescription>
                {action.confirmation.description.replace(
                  "{count}",
                  selectedRows.length.toString()
                )}
              </AlertDialogDescription>
            </AlertDialogHeader>
          </div>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleAction}>
              {action.confirmation.actionLabel}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    );
  }

  return (
    <Button className="ml-auto" variant="outline" onClick={handleAction}>
      {action.icon}
      {action.label}
      <span className="-me-1 ms-1 inline-flex h-5 max-h-full items-center rounded border border-border bg-background px-1 font-[inherit] text-[0.625rem] font-medium text-muted-foreground/70">
        {selectedRows.length}
      </span>
    </Button>
  );
}