
// import React, { useEffect, useState } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import Swal from 'sweetalert2';

// const UpdateTransaction = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({
//     type: 'expense',
//     category: '',
//     amount: '',
//     description: '',
//     date: '',
//   });

//   useEffect(() => {
//     const fetchTransaction = async () => {
//       try {
//         const res = await axios.get(
//           `${import.meta.env.VITE_BACKEND_API}/transactions/${id}`
//         );
//         setFormData(res.data);
//       } catch {
//         Swal.fire('Error', 'Failed to load transaction', 'error');
//       }
//     };
//     fetchTransaction();
//   }, [id]);

//   const handleChange = (e) =>
//     setFormData({ ...formData, [e.target.name]: e.target.value });

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const result = await Swal.fire({
//       title: 'Are you sure?',
//       text: 'Do you want to update this transaction?',
//       icon: 'question',
//       showCancelButton: true,
//       confirmButtonText: 'Yes, update it!',
//       cancelButtonText: 'No',
//     });

//     if (result.isConfirmed) {
//       try {
//         await axios.put(
//           `${import.meta.env.VITE_BACKEND_API}/transactions/${id}`,
//           formData
//         );
//         Swal.fire('Updated!', 'Transaction has been updated.', 'success');
//         navigate('/my-transactions'); // redirect here
//       } catch (error) {
//         console.error(error.response?.data || error);
//         Swal.fire('Error', 'Update failed', 'error');
//       }
//     }
//   };

//   return (
//     <div className="max-w-md sm:max-w-lg mx-auto p-6 sm:p-8 bg-white dark:bg-slate-800 rounded-2xl shadow-md sm:shadow-lg mt-6">
//       <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-gray-800 dark:text-gray-100">
//         Update Transaction
//       </h2>
//       <form onSubmit={handleSubmit} className="space-y-5">
//         <select
//           name="type"
//           value={formData.type}
//           onChange={handleChange}
//           className="w-full border border-gray-300 dark:border-slate-600 bg-gray-50 dark:bg-slate-700 text-gray-800 dark:text-gray-100 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition"
//         >
//           <option value="income">Income</option>
//           <option value="expense">Expense</option>
//         </select>

//         <select
//           name="category"
//           value={formData.category}
//           onChange={handleChange}
//           className="w-full border border-gray-300 dark:border-slate-600 bg-gray-50 dark:bg-slate-700 text-gray-800 dark:text-gray-100 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition"
//         >
//           <option value="">Select Category</option>
//           <option value="home">Home</option>
//           <option value="food">Food</option>
//           <option value="transport">Transport</option>
//           <option value="shopping">Shopping</option>
//           <option value="salary">Salary</option>
//         </select>

//         <input
//           type="number"
//           name="amount"
//           value={formData.amount}
//           onChange={handleChange}
//           className="w-full border border-gray-300 dark:border-slate-600 bg-gray-50 dark:bg-slate-700 text-gray-800 dark:text-gray-100 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition"
//           placeholder="Amount"
//           required
//         />

//         <input
//           type="text"
//           name="description"
//           value={formData.description}
//           onChange={handleChange}
//           className="w-full border border-gray-300 dark:border-slate-600 bg-gray-50 dark:bg-slate-700 text-gray-800 dark:text-gray-100 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition"
//           placeholder="Description"
//         />

//         <input
//           type="date"
//           name="date"
//           value={formData.date ? formData.date.split('T')[0] : ''}
//           onChange={handleChange}
//           className="w-full border border-gray-300 dark:border-slate-600 bg-gray-50 dark:bg-slate-700 text-gray-800 dark:text-gray-100 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition"
//         />

//         <button
//           type="submit"
//           className="w-full bg-blue-600 hover:bg-blue-700 transition-colors duration-300 text-white py-3 rounded-xl text-lg font-semibold"
//         >
//           Update
//         </button>
//       </form>
//     </div>
//   );
// };

// export default UpdateTransaction;
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';

const UpdateTransaction = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    type: 'expense',
    category: '',
    amount: '',
    description: '',
    date: '',
  });

  useEffect(() => {
    const fetchTransaction = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BACKEND_API}/transactions/${id}`
        );
        setFormData(res.data);
      } catch {
        Swal.fire('Error', 'Failed to load transaction', 'error');
      }
    };
    fetchTransaction();
  }, [id]);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const result = await Swal.fire({
      title: 'Are you sure?',
      text: 'Do you want to update this transaction?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes, update it!',
      cancelButtonText: 'No',
    });

    if (result.isConfirmed) {
      try {
        await axios.put(
          `${import.meta.env.VITE_BACKEND_API}/transactions/${id}`,
          formData
        );
        Swal.fire('Updated!', 'Transaction has been updated.', 'success');
        navigate('/my-transactions'); // redirect here
      } catch (error) {
        console.error(error.response?.data || error);
        Swal.fire('Error', 'Update failed', 'error');
      }
    }
  };

  return (
    <div
      className="max-w-xl mx-auto p-6 rounded-2xl 
    bg-gradient-to-br from-blue-50 via-white to-indigo-50
    dark:from-slate-900 dark:via-slate-800 dark:to-slate-900
    shadow-xl border border-slate-200 dark:border-slate-700 mt-6"
    >
      <h2 className="text-2xl font-bold mb-6 text-slate-800 dark:text-slate-100">
        Update Transaction
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <select
          name="type"
          value={formData.type}
          onChange={handleChange}
          className="w-full p-3 rounded-lg border 
          bg-white dark:bg-slate-900 
          text-slate-800 dark:text-slate-100
          border-slate-300 dark:border-slate-600
          focus:ring-2 focus:ring-blue-500 focus:outline-none"
        >
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>

        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          required
          className="w-full p-3 rounded-lg border 
          bg-white dark:bg-slate-900
          text-slate-800 dark:text-slate-100
          border-slate-300 dark:border-slate-600
          focus:ring-2 focus:ring-blue-500 focus:outline-none"
        >
          <option value="">Select Category</option>
          <option value="home">Home</option>
          <option value="food">Food</option>
          <option value="transport">Transport</option>
          <option value="shopping">Shopping</option>
          <option value="salary">Salary</option>
        </select>

        <input
          type="number"
          name="amount"
          value={formData.amount}
          onChange={handleChange}
          placeholder="Amount"
          required
          className="w-full p-3 rounded-lg border 
          bg-white dark:bg-slate-900
          text-slate-800 dark:text-slate-100
          border-slate-300 dark:border-slate-600
          focus:ring-2 focus:ring-green-500 focus:outline-none"
        />

        <input
          type="text"
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Description"
          className="w-full p-3 rounded-lg border 
          bg-white dark:bg-slate-900
          text-slate-800 dark:text-slate-100
          border-slate-300 dark:border-slate-600
          focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />

        <input
          type="date"
          name="date"
          value={formData.date ? formData.date.split('T')[0] : ''}
          onChange={handleChange}
          required
          className="w-full p-3 rounded-lg border 
          bg-white dark:bg-slate-900
          text-slate-800 dark:text-slate-100
          border-slate-300 dark:border-slate-600
          focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />

        <button
          type="submit"
          className="w-full py-3 rounded-xl font-semibold text-white
          bg-gradient-to-r from-blue-600 to-indigo-600
          hover:from-blue-700 hover:to-indigo-700
          transition duration-200 shadow-lg"
        >
          Update Transaction
        </button>
      </form>
    </div>
  );
};

export default UpdateTransaction;
