import { DataTable, type RowAction, type BulkAction } from "@/components/common/data-table";
import { createTransactionColumns } from "@/lib/table-columns";
import { useTableActions } from "@/hooks/use-table-actions";
import {
  RiDeleteBinLine,
} from "@remixicon/react";
import {
  useEffect,
  useMemo,
  useState,
} from "react";

type Payment = {
  id: string;
  transactionType: "charge" | "deposit";
  amount: string;
  balanceBefore: string;
  balanceAfter: string;
  paymentMethod: string;
  transactionId: string | null;
  description: string;
  metadata: any;
  status: "completed" | "pending" | "failed";
  createdAt: string;
  updatedAt: string;
};

// API Response type
type PaymentApiResponse = {
  success: boolean;
  data: {
    payments: Payment[];
    total: number;
    limit: number;
    offset: number;
  };
  message: string;
};

export default function TransactionTable() {
  const [data, setData] = useState<Payment[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [, setTotal] = useState(0); // Total count from API for future pagination
  
  const { deleteItem, updateItemProperty } = useTableActions<Payment>();

  const columns = useMemo(() => createTransactionColumns<Payment>(), []);

  // Row actions configuration
  const rowActions: RowAction<Payment>[] = useMemo(
    () => [
      {
        id: "toggle-status",
        label: "Toggle Status",
        handler: (item: Payment) => {
          updateItemProperty(
            data,
            setData,
            item.id,
            "status",
            item.status === "completed" ? "failed" : "completed"
          );
        },
      },
      {
        id: "delete",
        label: "Delete Transaction",
        handler: (item: Payment) => {
          deleteItem(data, setData, item.id);
        },
        destructive: true,
      },
    ],
    [data, setData, updateItemProperty, deleteItem]
  );

  // Bulk actions configuration
  const bulkActions: BulkAction<Payment>[] = useMemo(
    () => [
      {
        id: "delete",
        label: "Delete",
        icon: (
          <RiDeleteBinLine
            className="-ms-1 opacity-60"
            size={16}
            aria-hidden="true"
          />
        ),
        handler: (items: Payment[]) => {
          const itemIds = items.map((item) => item.id);
          const updatedData = data.filter(
            (item) => !itemIds.includes(item.id)
          );
          setData(updatedData);
        },
        confirmation: {
          title: "Are you absolutely sure?",
          description:
            "This action cannot be undone. This will permanently delete {count} selected transactions.",
          actionLabel: "Delete",
        },
      },
    ],
    [data, setData]
  );

  // Fetch payment data from API
  useEffect(() => {
    async function fetchPayments() {
      setIsLoading(true);
      try {
        // Mock API response data
        const mockApiResponse: PaymentApiResponse = {
          success: true,
          data: {
            payments: [
              {
                id: "5d9270a6-e03e-4c8c-bd53-faaaa078153e",
                transactionType: "charge",
                amount: "19.99",
                balanceBefore: "100",
                balanceAfter: "80.01",
                paymentMethod: "balance_deduction",
                transactionId: null,
                description: "Plan change: Free → Standard",
                metadata: {
                  plan_name: "Standard",
                  new_plan_id: 2,
                  old_plan_id: 1,
                },
                status: "completed",
                createdAt: "2025-07-28T15:38:15.737Z",
                updatedAt: "2025-07-28T15:38:15.737Z",
              },
              {
                id: "c397b60c-d9a3-4424-a203-825da99bb316",
                transactionType: "deposit",
                amount: "100",
                balanceBefore: "0",
                balanceAfter: "100",
                paymentMethod: "stripe",
                transactionId: null,
                description: "Manual balance addition",
                metadata: null,
                status: "completed",
                createdAt: "2025-07-28T15:36:18.705Z",
                updatedAt: "2025-07-28T15:36:18.705Z",
              },
              {
                id: "54982fe1-7489-4ae1-aba0-f8e29117a5ac",
                transactionType: "deposit",
                amount: "40",
                balanceBefore: "0",
                balanceAfter: "0",
                paymentMethod: "stripe_checkout",
                transactionId:
                  "cs_test_a1X9erYqetlFmc3IOBpolB0hU9og991YBHVblyxRW1koBqrhettK5mMUyC",
                description: "Stripe checkout for $40 balance top-up",
                metadata: {
                  currency: "usd",
                  amount_cents: 4000,
                  stripe_session_id:
                    "cs_test_a1X9erYqetlFmc3IOBpolB0hU9og991YBHVblyxRW1koBqrhettK5mMUyC",
                },
                status: "pending",
                createdAt: "2025-07-28T14:38:46.983Z",
                updatedAt: "2025-07-28T14:38:46.983Z",
              },
            ],
            total: 3,
            limit: 50,
            offset: 0,
          },
          message: "Payment history retrieved successfully",
        };

        // Simulate API call delay
        await new Promise((resolve) => setTimeout(resolve, 500));

        // In a real implementation, you would fetch from the API:
        // const res = await fetch("/api/v1/usage/payments");
        // const apiResponse: PaymentApiResponse = await res.json();

        if (mockApiResponse.success) {
          setData(mockApiResponse.data.payments);
          setTotal(mockApiResponse.data.total);
          console.log(
            "Payment data loaded:",
            mockApiResponse.data.payments.length,
            "transactions"
          );
        } else {
          console.error("API returned error:", mockApiResponse.message);
        }
      } catch (error) {
        console.error("Error fetching payment data:", error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchPayments();
  }, []);


  return (
    <DataTable
      data={data}
      setData={setData}
      columns={columns}
      isLoading={isLoading}
      searchConfig={{
        columnKey: "description",
        placeholder: "Search by description",
        ariaLabel: "Search by description",
      }}
      statusFilterConfig={{
        columnKey: "status",
        displayName: "Status",
      }}
      rowActions={rowActions}
      bulkActions={bulkActions}
      initialSorting={[
        {
          id: "createdAt",
          desc: true,
        },
      ]}
      pageSize={10}
      emptyMessage="No transactions found."
      loadingMessage="Loading transactions..."
    />
  );
}

