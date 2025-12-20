// import React from 'react';

// const StaticHOMe = () => {
//   return (
//     <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-12 space-y-12">
//       {/* Budgeting Tips */}
//       <section className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl shadow-md p-6 sm:p-8">
//         <h2 className="text-xl sm:text-2xl font-bold text-green-800 mb-4">
//           💡 Budgeting Tips
//         </h2>

//         <ul className="space-y-3 text-green-900 text-sm sm:text-base">
//           <li>✔ Track your income and expenses regularly</li>
//           <li>✔ Set monthly spending limits</li>
//           <li>✔ Save at least 20% of your income</li>
//           <li>✔ Avoid unnecessary expenses</li>
//           <li>✔ Review your budget every month</li>
//         </ul>
//       </section>

//       {/* Why Financial Planning Matters */}
//       <section className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl shadow-md p-6 sm:p-8">
//         <h2 className="text-xl sm:text-2xl font-bold text-blue-800 mb-4">
//           📊 Why Financial Planning Matters
//         </h2>

//         <p className="text-blue-900 text-sm sm:text-base leading-relaxed">
//           Financial planning helps you manage your money wisely, prepare for
//           emergencies, achieve long-term goals, and live a stress-free life.
//           With proper planning, you can control your expenses, grow your
//           savings, and build a secure financial future.
//         </p>
//       </section>
//     </div>
//   );
// };

// export default StaticHOMe;
import React from 'react';

const StaticHOMe = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-16 space-y-14">
      {/* Budgeting Tips */}
      <section className="group bg-white/80 backdrop-blur-md border border-green-100 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 p-7 sm:p-10">
        <div className="flex items-center gap-3 mb-6">
          <span className="text-3xl">💡</span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-green-800">
            Budgeting Tips
          </h2>
        </div>

        <ul className="grid sm:grid-cols-2 gap-4 text-green-900 text-sm sm:text-base">
          <li className="flex items-center gap-2">
            ✅ Track your income and expenses regularly
          </li>
          <li className="flex items-center gap-2">
            ✅ Set monthly spending limits
          </li>
          <li className="flex items-center gap-2">
            ✅ Save at least 20% of your income
          </li>
          <li className="flex items-center gap-2">
            ✅ Avoid unnecessary expenses
          </li>
          <li className="flex items-center gap-2">
            ✅ Review your budget every month
          </li>
        </ul>
      </section>

      {/* Why Financial Planning Matters */}
      <section className="group bg-white/80 backdrop-blur-md border border-blue-100 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 p-7 sm:p-10">
        <div className="flex items-center gap-3 mb-6">
          <span className="text-3xl">📊</span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-blue-800">
            Why Financial Planning Matters
          </h2>
        </div>

        <p className="text-blue-900 text-sm sm:text-base leading-relaxed">
          Financial planning helps you manage your money wisely, prepare for
          emergencies, achieve long-term goals, and live a stress-free life.
          With proper planning, you can control your expenses, grow your
          savings, and build a secure financial future.
        </p>

        <div className="mt-6 flex flex-wrap gap-3">
          <span className="px-4 py-2 rounded-full bg-blue-100 text-blue-700 text-xs sm:text-sm">
            Smart Saving
          </span>
          <span className="px-4 py-2 rounded-full bg-blue-100 text-blue-700 text-xs sm:text-sm">
            Expense Control
          </span>
          <span className="px-4 py-2 rounded-full bg-blue-100 text-blue-700 text-xs sm:text-sm">
            Secure Future
          </span>
        </div>
      </section>
    </div>
  );
};

export default StaticHOMe;
