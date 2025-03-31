import { useState, useEffect } from "react";
import { useOrderStore } from "../stores/useOrderStore";

const Dialog = ({ isOpen, onClose, order, user }) => {
  // Call useState unconditionally
  const { toggleOrderStatus, fetchAllOrders } = useOrderStore();
  const [status, setStatus] = useState(order ? order.status : "");
  const [products, setProducts] = useState([]);

  // If order changes, update the local status and products
  useEffect(() => {
    if (order) {
      setStatus(order.status);
      setProducts(order.products);
    }
  }, [order]);

  // Handle the change in order status
  const handleStatusChange = (event) => {
    setStatus(event.target.value);
  };

  // Handle Confirm action (could be saving the updated status)
  const handleConfirm = () => {
    toggleOrderStatus(order._id, status);
    fetchAllOrders();
    onClose(); // Close the dialog after confirmation
  };

  if (!isOpen) return null; // Dialog is not rendered when not open

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
      <div className="bg-gray-700 p-8 rounded-lg max-w-3xl max-h-[500px] sm:mt-16 w-full mx-4 flex flex-col space-y-6 shadow-xl transform transition-all duration-300">
        {/* Dialog Header */}
        <div className="flex justify-between items-center border-b pb-4">
          <h3 className="text-2xl font-semibold text-white">Order Details</h3>
          <button
            onClick={onClose}
            className="text-white hover:text-gray-200 text-3xl"
          >
            &times;
          </button>
        </div>

        {/* Dialog Content */}
        <div className="overflow-y-auto pt-5 pb-5">
          {order && (
            <div className="text-white space-y-4">
              <p className="text-lg">
                <strong>Customer Name:</strong> {order.customerName}
              </p>
              <div className="text-white">
                {products.length !== 0 ? (
                  products.map((product) => {
                    return (
                      <dl key={product.productName}>
                        <dt className="text-lg">
                          <strong>{product.productName}</strong>
                        </dt>
                        <dd>
                          <ul>
                            <li>Price: {product.price}</li>
                            <li>Quantity: {product.quantity}</li>
                          </ul>
                        </dd>
                      </dl>
                    );
                  })
                ) : (
                  <p>Loading products...</p>
                )}
              </div>
              {user.role === "admin" ? (
                <div className="text-lg flex gap-2">
                  <label htmlFor="processingStatus">Status</label>
                  <select
                    id="processingStatus"
                    value={status} // Bind to the local `status` state
                    onChange={handleStatusChange} // Handle status change
                    className="px-2 py-1 border rounded-md text-black"
                  >
                    <option value="new">New</option>
                    <option value="processing">Processing</option>
                    <option value="delivering">Delivering</option>
                    <option value="delivered">Delivered</option>
                  </select>
                </div>
              ) : (
                <p className="text-lg">
                  <strong>Status: </strong>
                  {status}
                </p>
              )}

              <p className="text-lg">
                <strong>Address:</strong> {order.address}
              </p>
            </div>
          )}
        </div>
        {/* Dialog Footer */}
        <div className="flex justify-between">
          <p className="text-lg">
            <strong>Total Price:</strong> ${order.totalAmount.toFixed(2)}
          </p>
          <div className="flex justify-end space-x-4">
            <button
              onClick={onClose}
              className="px-5 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition duration-200"
            >
              Cancel
            </button>
            {user.role === "admin" && (
              <button
                onClick={handleConfirm}
                className="px-5 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition duration-200"
              >
                Confirm
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dialog;
