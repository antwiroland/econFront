import { motion } from "framer-motion";
import { Trash, Eye } from "lucide-react";
import { useOrderStore } from "../stores/useOrderStore";
import Dialog from "./DialogBox"; // Ensure DialogBox component is correct
import { useState } from "react";
import { useUserStore } from "../stores/useUserStore";
import { formatDateTime } from "../lib/utils";

const OrderList = () => {
  const { deleteOrder, orders } = useOrderStore();
  const { user } = useUserStore();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null); // To store the selected order for viewing

  // Function to open dialog with selected order
  const handleViewOrder = (order) => {
    setSelectedOrder(order); // Set the selected order
    setIsOpen(true); // Open the dialog
  };

  // Function to close dialog
  const handleCloseDialog = () => {
    setIsOpen(false); // Close the dialog
    setSelectedOrder(null); // Reset the selected order
  };

  return (
    <motion.div
      className="bg-gray-800 shadow-lg rounded-lg overflow-hidden max-w-4xl mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <table className="min-w-full divide-y divide-gray-700">
        <thead className="bg-gray-700">
          <tr>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
            >
              Customer Name
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
            >
              Total Price
            </th>

            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
            >
              Status
            </th>

            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider hidden sm:block"
            >
              Created At
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
            >
              Address
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
            >
              Actions
            </th>
          </tr>
        </thead>

        <tbody className="bg-gray-800 divide-y divide-gray-700">
          {orders?.map((order) => (
            <tr key={order._id} className="hover:bg-gray-700">
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="ml-4">
                  <div className="text-sm font-medium text-white">
                    {order.customerName}
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-300">
                  ${order.totalAmount.toFixed(2)}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-300">
                  {order.status === "delivered" ? (
                    <span className="text-green-500">{order.status}</span>
                  ) : order.status === "delivering" ? (
                    <span className="text-blue-500">{order.status}</span>
                  ) : order.status === "processing" ? (
                    <span className="text-yellow-200">{order.status}</span>
                  ) : (
                    <span>{order.status}</span>
                  )}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap hidden sm:block">
                <div className="text-sm text-gray-300">
                  {formatDateTime(order.createdAt)}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap overflow-hidden">
                Address
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <div className="flex justify-end gap-6">
                  <button
                    className="text-white hover:text-green-950"
                    onClick={() => handleViewOrder(order)} // Pass the current order to view
                  >
                    <Eye className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => deleteOrder(order._id)}
                    className="text-red-400 hover:text-red-300"
                  >
                    <Trash className="h-5 w-5" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Dialog Box component */}
      <Dialog
        isOpen={isOpen} // Pass isOpen to control dialog visibility
        onClose={handleCloseDialog} // Close dialog handler
        order={selectedOrder} // Pass the selected order for viewing
        user={user}
      />
    </motion.div>
  );
};

export default OrderList;
