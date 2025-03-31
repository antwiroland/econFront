import { create } from "zustand";
import toast from "react-hot-toast";
import axios from "../lib/axios";

export const useOrderStore = create((set) => ({
  orders: [],
  loading: false,

  setOrders: (orders) => set({ orders }),
  fetchAllOrders: async () => {
    set({ loading: true });
    try {
      const response = await axios.get("/orders");
      set({ orders: response.data.orders, loading: false });
    } catch (error) {
      set({ error: "Failed to fetch orders", loading: false });
      toast.error("Failed to fetch orders");
      console.log(error);
    }
  },

  fetchUserOrders: async (userId) => {
    set({ loading: true });
    try {
      const response = await axios.get(`/orders/${userId}`);
      set({ orders: response.data.orders, loading: false });
    } catch (error) {
      set({ error: "Failed to fetch user orders", loading: false });
      toast.error("Failed to fetch user orders");
      console.log(error);
    }
  },
  deleteOrder: async (orderId) => {
    set({ loading: true });
    try {
      await axios.delete(`/orders/${orderId}`);
      set((prevOrders) => ({
        orders: prevOrders.orders.filter((order) => order._id !== orderId),
        loading: false,
      }));
    } catch (error) {
      set({ loading: false });
      toast.error("Failed to delete order");
      console.log(error);
    }
  },
  toggleOrderStatus: async (orderId, status) => {
    set({ loading: true });
    try {
      await axios.patch(`/orders/${orderId}`, {
        status,
      });
      set((prevOrders) => ({
        orders: prevOrders.orders.map((order) =>
          order._id === orderId ? { ...order, status } : order
        ),
        loading: false,
      }));
    } catch (error) {
      set({ loading: false });
      toast.error("Failed to update order");
      console.log(error);
    }
  },
}));
