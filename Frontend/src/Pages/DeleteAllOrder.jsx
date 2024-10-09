import axios from "axios";
import { useState } from "react";
import { useSelector } from "react-redux";
const DeleteAllOrder = () => {
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const deleteOrders = async () => {
    try {
      const response = await axios.delete(
        "http://localhost:3000/api/v1/delete-all-orders",
        {
          headers: {
            id: localStorage.getItem("id"),
            authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.status === 200) {
        setSuccessMessage(response.data.message);
      }
    } catch (error) {
      setError("An error occurred while deleting orders.");
      console.error(error);
    }
  };
  const role = useSelector((state) => state.auth.role);
  return (
    <>
      {role === "admin" && (
        <div>
          <button onClick={deleteOrders} className="btn btn-danger">
            Delete All Orders
          </button>
          {successMessage && <p className="text-success">{successMessage}</p>}
          {error && <p className="text-danger">{error}</p>}
        </div>
      )}
    </>
  );
};

export default DeleteAllOrder;
