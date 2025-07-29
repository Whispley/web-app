import { useTransition } from "react";

/**
 * Custom hook for handling table actions with loading states
 * Provides utilities for updating data with optimistic updates
 */
export function useTableActions<TData extends Record<string, any>>() {
  const [isUpdatePending, startUpdateTransition] = useTransition();

  /**
   * Update a single item in the data array
   */
  const updateItem = (
    data: TData[],
    setData: React.Dispatch<React.SetStateAction<TData[]>>,
    itemId: string | number,
    updater: (item: TData) => TData
  ) => {
    startUpdateTransition(() => {
      const updatedData = data.map((item) => {
        if (item.id === itemId) {
          return updater(item);
        }
        return item;
      });
      setData(updatedData);
    });
  };

  /**
   * Delete a single item from the data array
   */
  const deleteItem = (
    data: TData[],
    setData: React.Dispatch<React.SetStateAction<TData[]>>,
    itemId: string | number
  ) => {
    startUpdateTransition(() => {
      const updatedData = data.filter((item) => item.id !== itemId);
      setData(updatedData);
    });
  };

  /**
   * Delete multiple items from the data array
   */
  const deleteItems = (
    data: TData[],
    setData: React.Dispatch<React.SetStateAction<TData[]>>,
    itemIds: (string | number)[]
  ) => {
    startUpdateTransition(() => {
      const updatedData = data.filter((item) => !itemIds.includes(item.id));
      setData(updatedData);
    });
  };

  /**
   * Toggle a boolean property on an item
   */
  const toggleItemProperty = (
    data: TData[],
    setData: React.Dispatch<React.SetStateAction<TData[]>>,
    itemId: string | number,
    property: keyof TData
  ) => {
    updateItem(data, setData, itemId, (item) => ({
      ...item,
      [property]: !item[property],
    }));
  };

  /**
   * Update a specific property on an item
   */
  const updateItemProperty = (
    data: TData[],
    setData: React.Dispatch<React.SetStateAction<TData[]>>,
    itemId: string | number,
    property: keyof TData,
    value: any
  ) => {
    updateItem(data, setData, itemId, (item) => ({
      ...item,
      [property]: value,
    }));
  };

  return {
    isUpdatePending,
    updateItem,
    deleteItem,
    deleteItems,
    toggleItemProperty,
    updateItemProperty,
  };
}