import { DataTable, type RowAction, type BulkAction } from "@/components/common/data-table";
import { createContactColumns } from "@/lib/table-columns";
import { useTableActions } from "@/hooks/use-table-actions";
import {
  RiDeleteBinLine,
} from "@remixicon/react";
import {
  useEffect,
  useMemo,
  useState,
} from "react";

type Item = {
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
  joinDate: string;
};


export default function ContactsTable() {
  const [data, setData] = useState<Item[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  const { deleteItem, updateItemProperty, toggleItemProperty } = useTableActions<Item>();

  const columns = useMemo(() => createContactColumns<Item>(), []);

  // Row actions configuration
  const rowActions: RowAction<Item>[] = useMemo(
    () => [
      {
        id: "toggle-status",
        label: "Toggle Status",
        handler: (item: Item) => {
          updateItemProperty(
            data,
            setData,
            item.id,
            "status",
            item.status === "Active" ? "Inactive" : "Active"
          );
        },
      },
      {
        id: "toggle-verified",
        label: "Toggle Verification",
        handler: (item: Item) => {
          toggleItemProperty(data, setData, item.id, "verified");
        },
      },
      {
        id: "delete",
        label: "Delete Contact",
        handler: (item: Item) => {
          deleteItem(data, setData, item.id);
        },
        destructive: true,
      },
    ],
    [data, setData, updateItemProperty, toggleItemProperty, deleteItem]
  );

  // Bulk actions configuration
  const bulkActions: BulkAction<Item>[] = useMemo(
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
        handler: (items: Item[]) => {
          const itemIds = items.map((item) => item.id);
          const updatedData = data.filter(
            (item) => !itemIds.includes(item.id)
          );
          setData(updatedData);
        },
        confirmation: {
          title: "Are you absolutely sure?",
          description:
            "This action cannot be undone. This will permanently delete {count} selected contacts.",
          actionLabel: "Delete",
        },
      },
    ],
    [data, setData]
  );

  useEffect(() => {
    async function fetchPosts() {
      try {
        const res = await fetch(
          "https://raw.githubusercontent.com/origin-space/origin-images/refs/heads/main/exp1/users-02_mohkpe.json"
        );
        const data = await res.json();
        setData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchPosts();
  }, []);


  return (
    <DataTable
      data={data}
      setData={setData}
      columns={columns}
      isLoading={isLoading}
      searchConfig={{
        columnKey: "name",
        placeholder: "Search by name",
        ariaLabel: "Search by name",
      }}
      statusFilterConfig={{
        columnKey: "status",
        displayName: "Status",
      }}
      rowActions={rowActions}
      bulkActions={bulkActions}
      initialSorting={[
        {
          id: "name",
          desc: false,
        },
      ]}
      pageSize={10}
      emptyMessage="No contacts found."
      loadingMessage="Loading contacts..."
    />
  );
}

