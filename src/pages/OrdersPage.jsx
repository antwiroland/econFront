import { History } from "lucide-react";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

import { useOrderStore } from "../stores/useOrderStore";
import OrderList from "../components/OrdersTab";
import { useUserStore } from "../stores/useUserStore";

const tabs = [{ id: "orders", label: "Orders", icon: History }];

const UserOrdersPage = () => {
  const [activeTab, setActiveTab] = useState("orders");
  const { fetchUserOrders, fetchAllOrders } = useOrderStore();
  const { user } = useUserStore();

  console.log("user: ", user);

  useEffect(() => {
    if (user.role === "admin") {
      fetchAllOrders();
    } else {
      fetchUserOrders(user._id);
    }
  }, [fetchUserOrders, user._id, user.role, fetchAllOrders]);

  return (
    <div className="min-h-screen relative overflow-hidden">
      <div className="relative z-10 container mx-auto px-4 py-16">
        <motion.h1
          className="text-4xl font-bold mb-8 text-emerald-400 text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          My Orders
        </motion.h1>

        <div className="flex justify-center mb-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center px-4 py-2 mx-2 rounded-md transition-colors duration-200 ${
                activeTab === tab.id
                  ? "bg-emerald-600 text-white"
                  : "bg-gray-700 text-gray-300 hover:bg-gray-600"
              }`}
            >
              <tab.icon className="mr-2 h-5 w-5" />
              {tab.label}
            </button>
          ))}
        </div>
        {activeTab === "orders" && <OrderList />}
      </div>
    </div>
  );
};
export default UserOrdersPage;
