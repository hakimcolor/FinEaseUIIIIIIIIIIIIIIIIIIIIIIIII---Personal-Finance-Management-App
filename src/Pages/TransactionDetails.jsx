// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import axios from 'axios';

// const TransactionDetails = () => {
//   const { id } = useParams();
//   const [transaction, setTransaction] = useState(null);

//   useEffect(() => {
//     axios
//       .get(`${import.meta.env.VITE_BACKEND_API}/transactions/${id}`)
//       .then((res) => setTransaction(res.data))
//       .catch(() => console.log('Failed to load transaction'));
//   }, [id]);

//   if (!transaction) return <div className="text-center mt-10">Loading...</div>;

//   return (
//     <div className="max-w-xl mx-auto p-6 bg-white dark:bg-slate-800 rounded shadow">
//       <h2 className="text-2xl font-bold mb-4">Transaction Details</h2>
//       <p>
//         <strong>Type:</strong> {transaction.type}
//       </p>
//       <p>
//         <strong>Category:</strong> {transaction.category}
//       </p>
//       <p>
//         <strong>Description:</strong> {transaction.description}
//       </p>
//       <p>
//         <strong>Amount:</strong> ৳ {transaction.amount}
//       </p>
//       <p>
//         <strong>Date:</strong> {new Date(transaction.date).toLocaleDateString()}
//       </p>
//     </div>
//   );
// };

// export default TransactionDetails;
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Loading from './Loding';

const TransactionDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [transaction, setTransaction] = useState(null);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_API}/transactions/${id}`)
      .then((res) => setTransaction(res.data))
      .catch(() => console.log('Failed to load transaction'));
  }, [id]);

  if (!transaction)
    return (
     <Loading/>
    );

  return (
    <div
      className="max-w-xl mx-auto p-6 rounded-2xl
      bg-gradient-to-br from-blue-50 via-white to-indigo-50
      dark:from-slate-900 dark:via-slate-800 dark:to-slate-900
      shadow-xl border border-slate-200 dark:border-slate-700 mt-6"
    >
      <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-slate-800 dark:text-slate-100">
        Transaction Details
      </h2>

      <div className="space-y-3 text-slate-800 dark:text-slate-100">
        <p>
          <strong>Type:</strong>{' '}
          <span
            className={`px-2 py-1 rounded-full font-semibold ${
              transaction.type === 'income'
                ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300'
                : 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300'
            }`}
          >
            {transaction.type}
          </span>
        </p>
        <p>
          <strong>Category:</strong> {transaction.category}
        </p>
        <p>
          <strong>Description:</strong> {transaction.description}
        </p>
        <p>
          <strong>Amount:</strong> $ {transaction.amount}
        </p>
        <p>
          <strong>Date:</strong>{' '}
          {new Date(transaction.date).toLocaleDateString()}
        </p>
      </div>

      <button
        onClick={() => navigate(-1)}
        className="mt-6 px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors duration-300 shadow-md"
      >
        Back
      </button>
    </div>
  );
};

export default TransactionDetails;
