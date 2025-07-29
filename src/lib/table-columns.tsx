import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { type ColumnDef } from "@tanstack/react-table";
import {
  RiCheckLine,
  RiVerifiedBadgeFill,
} from "@remixicon/react";
import { statusFilterFn } from "@/components/common/data-table";

// Transaction/Payment column definitions
export function createTransactionColumns<TData extends {
  id: string;
  transactionType: "charge" | "deposit";
  amount: string;
  balanceAfter: string;
  paymentMethod: string;
  transactionId: string | null;
  description: string;
  status: "completed" | "pending" | "failed";
  createdAt: string;
}>(): ColumnDef<TData>[] {
  return [
    {
      header: "Type",
      accessorKey: "transactionType",
      cell: ({ row }) => (
        <Badge
          variant="outline"
          className={cn(
            "gap-1 py-0.5 px-2 text-sm capitalize",
            row.original.transactionType === "deposit"
              ? "text-emerald-600 border-emerald-200"
              : "text-orange-600 border-orange-200"
          )}
        >
          {row.getValue("transactionType")}
        </Badge>
      ),
      size: 100,
      enableHiding: false,
    },
    {
      header: "Amount",
      accessorKey: "amount",
      cell: ({ row }) => {
        const amount = parseFloat(row.getValue("amount"));
        const transactionType = row.getValue("transactionType") as string;
        return (
          <div
            className={cn(
              "font-medium",
              transactionType === "deposit"
                ? "text-emerald-600"
                : "text-orange-600"
            )}
          >
            {transactionType === "deposit" ? "+" : "-"}${amount.toFixed(2)}
          </div>
        );
      },
      size: 100,
    },
    {
      header: "Balance After",
      accessorKey: "balanceAfter",
      cell: ({ row }) => (
        <div className="text-muted-foreground">
          ${parseFloat(row.getValue("balanceAfter")).toFixed(2)}
        </div>
      ),
      size: 110,
    },
    {
      header: "Status",
      accessorKey: "status",
      cell: ({ row }) => (
        <div className="flex items-center h-full">
          <Badge
            variant="outline"
            className={cn(
              "gap-1 py-0.5 px-2 text-sm capitalize",
              row.original.status === "completed"
                ? "text-emerald-600 border-emerald-200"
                : row.original.status === "pending"
                ? "text-yellow-600 border-yellow-200"
                : "text-red-600 border-red-200"
            )}
          >
            {row.original.status === "completed" && (
              <RiCheckLine
                className="text-emerald-500"
                size={14}
                aria-hidden="true"
              />
            )}
            {row.original.status}
          </Badge>
        </div>
      ),
      size: 110,
      filterFn: statusFilterFn,
    },
    {
      header: "Payment Method",
      accessorKey: "paymentMethod",
      cell: ({ row }) => {
        const paymentMethod = row.getValue("paymentMethod") as string;
        return (
          <span className="text-muted-foreground capitalize">
            {paymentMethod?.replace(/_/g, " ") || "N/A"}
          </span>
        );
      },
      size: 140,
    },
    {
      header: "Transaction ID",
      accessorKey: "transactionId",
      cell: ({ row }) => {
        const transactionId = row.getValue("transactionId") as string | null;
        return (
          <span className="text-muted-foreground font-mono text-xs">
            {transactionId ? (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <span className="cursor-help">
                      {transactionId.length > 12
                        ? `${transactionId.slice(0, 12)}...`
                        : transactionId}
                    </span>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="font-mono">{transactionId}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            ) : (
              "—"
            )}
          </span>
        );
      },
      size: 120,
    },
    {
      header: "Description",
      accessorKey: "description",
      cell: ({ row }) => (
        <span className="text-muted-foreground truncate max-w-48">
          {row.getValue("description")}
        </span>
      ),
      size: 200,
    },
    {
      header: "Date",
      accessorKey: "createdAt",
      cell: ({ row }) => {
        const date = new Date(row.getValue("createdAt"));
        return (
          <span className="text-muted-foreground">
            {date.toLocaleDateString()}{" "}
            {date.toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </span>
        );
      },
      size: 140,
    },
  ];
}

// Contact column definitions
export function createContactColumns<TData extends {
  id: string;
  image: string;
  name: string;
  status: string;
  location: string;
  verified: boolean;
  referral: {
    name: string;
    image: string;
  };
  value: number;
}>(): ColumnDef<TData>[] {
  return [
    {
      header: "Name",
      accessorKey: "name",
      cell: ({ row }) => (
        <div className="flex items-center gap-3">
          <img
            className="rounded-full"
            src={row.original.image}
            width={32}
            height={32}
            alt={row.getValue("name")}
          />
          <div className="font-medium">{row.getValue("name")}</div>
        </div>
      ),
      size: 180,
      enableHiding: false,
    },
    {
      header: "ID",
      accessorKey: "id",
      cell: ({ row }) => (
        <span className="text-muted-foreground">{row.getValue("id")}</span>
      ),
      size: 110,
    },
    {
      header: "Status",
      accessorKey: "status",
      cell: ({ row }) => (
        <div className="flex items-center h-full">
          <Badge
            variant="outline"
            className={cn(
              "gap-1 py-0.5 px-2 text-sm",
              row.original.status === "Inactive"
                ? "text-muted-foreground"
                : "text-primary-foreground"
            )}
          >
            {row.original.status === "Active" && (
              <RiCheckLine
                className="text-emerald-500"
                size={14}
                aria-hidden="true"
              />
            )}
            {row.original.status === "Inactive" && "- "}
            {row.original.status}
          </Badge>
        </div>
      ),
      size: 110,
      filterFn: statusFilterFn,
    },
    {
      header: "Location",
      accessorKey: "location",
      cell: ({ row }) => (
        <span className="text-muted-foreground">{row.getValue("location")}</span>
      ),
      size: 140,
    },
    {
      header: "Verified",
      accessorKey: "verified",
      cell: ({ row }) => (
        <div>
          <span className="sr-only">
            {row.original.verified ? "Verified" : "Not Verified"}
          </span>
          <RiVerifiedBadgeFill
            size={20}
            className={cn(
              row.original.verified
                ? "fill-emerald-600"
                : "fill-muted-foreground/50"
            )}
            aria-hidden="true"
          />
        </div>
      ),
      size: 90,
    },
    {
      header: "Referral",
      accessorKey: "referral",
      cell: ({ row }) => (
        <div className="flex items-center gap-3">
          <img
            className="rounded-full"
            src={row.original.referral.image}
            width={20}
            height={20}
            alt={row.original.referral.name}
          />
          <div className="text-muted-foreground">
            {row.original.referral.name}
          </div>
        </div>
      ),
      size: 140,
    },
    {
      header: "Value",
      accessorKey: "value",
      cell: ({ row }) => {
        const value = row.getValue("value") as number;
        return (
          <TooltipProvider delayDuration={0}>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="flex h-full w-full items-center">
                  <Progress className="h-1 max-w-14" value={value} />
                </div>
              </TooltipTrigger>
              <TooltipContent align="start" sideOffset={-8}>
                <p>{value}%</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        );
      },
      size: 80,
    },
  ];
}