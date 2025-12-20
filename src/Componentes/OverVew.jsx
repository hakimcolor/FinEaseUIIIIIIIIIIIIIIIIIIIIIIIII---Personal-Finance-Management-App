// import React, { useContext, useEffect, useState } from 'react';
// import axios from 'axios';
// import { AuthContext } from '../Context/AuthContext';

// const OverVew = () => {
//   const { user } = useContext(AuthContext);

//   const [data, setData] = useState({
//     totalIncome: 0,
//     totalExpense: 0,
//     balance: 0,
//   });

//   useEffect(() => {
//     if (user?.email) {
//       axios
//         .get(`https://fin-eas-backend.vercel.app/transactions/overview?email=${user.email}`)
//         .then((res) => {
//           setData(res.data);
//         })
//         .catch((err) => {
//           console.error(err);
//         });
//     }
//   }, [user]);

//   return (
//     <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-7xl mx-auto mb-5 px-10">
//       <div className="bg-green-100 p-6 rounded-xl shadow">
//         <h2 className="text-lg font-semibold text-green-700">Total Income</h2>
//         <p className="text-2xl font-bold text-green-900">
//           $ {data.totalIncome}
//         </p>
//       </div>

//       <div className="bg-red-100 p-6 rounded-xl shadow">
//         <h2 className="text-lg font-semibold text-red-700">Total Expense</h2>
//         <p className="text-2xl font-bold text-red-900">${data.totalExpense}</p>
//       </div>

//       <div className="bg-blue-100 p-6 rounded-xl shadow">
//         <h2 className="text-lg font-semibold text-blue-700">Balance</h2>
//         <p className="text-2xl font-bold text-blue-900">${data.balance}</p>
//       </div>
//     </div>
//   );
// };

// export default OverVew;
import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { AuthContext } from '../Context/AuthContext';

const OverVew = () => {
  const { user } = useContext(AuthContext);

  const [data, setData] = useState({
    totalIncome: 0,
    totalExpense: 0,
    balance: 0,
  });

  useEffect(() => {
    if (user?.email) {
      axios
        .get(
          `https://fin-eas-backend.vercel.app/transactions/overview?email=${user.email}`
        )
        .then((res) => {
          setData(res.data);
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }, [user]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 mb-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Income */}
        <div className="relative overflow-hidden rounded-2xl shadow-md bg-gradient-to-br from-green-100 to-green-200 p-6 transition-transform duration-300 hover:scale-[1.02]">
          <h2 className="text-sm sm:text-base font-semibold text-green-700 uppercase tracking-wide">
            Total Income
          </h2>
          <p className="mt-3 text-2xl sm:text-3xl font-bold text-green-900">
            $ {data.totalIncome}
          </p>
        </div>

        {/* Expense */}
        <div className="relative overflow-hidden rounded-2xl shadow-md bg-gradient-to-br from-red-100 to-red-200 p-6 transition-transform duration-300 hover:scale-[1.02]">
          <h2 className="text-sm sm:text-base font-semibold text-red-700 uppercase tracking-wide">
            Total Expense
          </h2>
          <p className="mt-3 text-2xl sm:text-3xl font-bold text-red-900">
            $ {data.totalExpense}
          </p>
        </div>

        {/* Balance */}
        <div className="relative overflow-hidden rounded-2xl shadow-md bg-gradient-to-br from-blue-100 to-blue-200 p-6 transition-transform duration-300 hover:scale-[1.02]">
          <h2 className="text-sm sm:text-base font-semibold text-blue-700 uppercase tracking-wide">
            Balance
          </h2>
          <p className="mt-3 text-2xl sm:text-3xl font-bold text-blue-900">
            $ {data.balance}
          </p>
        </div>
      </div>
    </div>
  );
};

export default OverVew;
