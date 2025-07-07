import React, { useEffect, useState } from "react";
import Delete from "./Delete";
import Update from "./Update";

const url = "https://server.aptech.io/online-shop/customers";

type Customer = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  address: string;
  birthday: string;
};

type Props = {
  reload?: number;

  deleteComponent?: React.ComponentType<{ customerId: number; onDeleted: (id: number) => void }>;
  updateComponent?: React.ComponentType<{
    customerId: number;
    onUpdate?: (customer: Customer) => void;
    onClose?: () => void;
  }>;
};

export default function List({reload = 0 }: Props) {
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const[loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setCustomers(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching customers:", error);
      } finally {
        setLoading(false); 
      }
    };

    fetchCustomers();
  }, [reload]);

  const handleOnSelect = (customer: any) => {
    setCustomers((prev) => prev.map((c) => (c.id === customer.id ? customer : c)));
    setSelectedCustomer(customer);
  };

  const handleOnUpdate = (customer: any) => {
    setCustomers((prev) => prev.map((c) => (c.id === customer.id ? customer : c)));
    setSelectedCustomer(null);
  }

  return (
    <div className="container mx-auto bg-white rounded p-4 m-4">
        {loading && <p className="text-center text-amber-600 font-extrabold text-3xl">Loading...</p>}
      <table className="table-auto w-full border-collapse border border-gray-200 table-hover">
        <thead>
          <tr>
            <th className="border border-gray-300 p-2">ID</th>
            <th className="border border-gray-300 p-2">Nane</th>
            <th className="border border-gray-300 p-2">Email</th>
            <th className="border border-gray-300 p-2">Phone</th>
            <th className="border border-gray-300 p-2">Address</th>
            <th className="border border-gray-300 p-2">Birthday</th>
            <th className="border border-gray-300 p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {customers.map((customer) => (
            <tr key={customer.id}>
              <td className="border border-gray-300 p-2">{customer.id}</td>
              <td className="border border-gray-300 p-2">{`${customer.firstName} ${customer.lastName}`}</td>
              <td className="border border-gray-300 p-2">{customer.email}</td>
              <td className="border border-gray-300 p-2">{customer.phoneNumber}</td>
              <td className="border border-gray-300 p-2">{customer.address}</td>
              <td className="border border-gray-300 p-2">
                {customer.birthday}
              </td>
              <td className="border border-gray-300 p-2">
                {/* Actions can be added here */}
                <button className="bg-blue-500 text-white px-2 py-1 rounded mb-0.5" onClick={() => handleOnSelect(customer)}>
                  Edit
                </button>
                <Delete
                  customerId={customer.id}
                  onDeleted={(id) => {
                    setCustomers((prev) => prev.filter((c) => c.id !== id));
                  }} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {selectedCustomer && <Update customerId={selectedCustomer.id} onUpdate={handleOnUpdate} onClose={() =>{setSelectedCustomer(null)} } />}
    </div>
  );
}
