import { Link } from 'react-router-dom';
import { FiPlusCircle, FiMinusCircle, FiBarChart2, FiFileText, FiZap } from 'react-icons/fi';

const QuickActions = () => {
  const actions = [
    {
      title: 'Add Income',
      icon: <FiPlusCircle size={32} />,
      color: 'var(--color-success)',
      link: '/add-transaction',
      desc: 'Record your earnings',
    },
    {
      title: 'Add Expense',
      icon: <FiMinusCircle size={32} />,
      color: 'var(--color-danger)',
      link: '/add-transaction',
      desc: 'Track your spending',
    },
    {
      title: 'View Reports',
      icon: <FiBarChart2 size={32} />,
      color: 'var(--color-secondary)',
      link: '/reports',
      desc: 'Analyze your finances',
    },
    {
      title: 'All Transactions',
      icon: <FiFileText size={32} />,
      color: 'var(--color-primary)',
      link: '/my-transactions',
      desc: 'See full history',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-8">
      <h2 className="text-2xl sm:text-3xl font-bold mb-6 flex items-center gap-2" style={{ color: 'var(--text-primary)' }}>
        <FiZap style={{ color: 'var(--color-primary)' }} /> Quick Actions
      </h2>
      <div className="grid grid-cols-2 gap-4 sm:gap-6">
        {actions.map((action, index) => (
          <>
            <Link
              key={index}
              to={action.link}
              className="group relative overflow-hidden rounded-2xl p-5 sm:p-6 text-white shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
              style={{ backgroundColor: action.color }}
            >
              <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -mr-10 -mt-10"></div>
              <span className="mb-3 block">{action.icon}</span>
              <h3 className="font-bold text-lg sm:text-xl">{action.title}</h3>
              <p className="text-white/80 text-xs sm:text-sm mt-1">{action.desc}</p>
            </Link>
            {index === 3 && (
              <hr 
                className="col-span-2 my-2" 
                style={{ borderColor: 'var(--border-color)' }} 
              />
            )}
          </>
        ))}
      </div>
    </div>
  );
};

export default QuickActions;
