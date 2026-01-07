import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { AuthContext } from '../Context/AuthContext';
import { FiClock, FiArrowRight, FiInbox, FiDollarSign, FiShoppingCart } from 'react-icons/fi';

const RecentTransactions = () => {
  const { user } = useContext(AuthContext);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.email) {
      axios
        .get(`${import.meta.env.VITE_BACKEND_API}/transactions?email=${user.email}`)
        .then((res) => {
          const sorted = res.data
            .sort((a, b) => new Date(b.date) - new Date(a.date))
            .slice(0, 5);
          setTransactions(sorted);
          setLoading(false);
        })
        .catch((err) => {
          console.error(err);
          setLoading(false);
        });
    } else {
      setLoading(false);
      setTransactions([]);
    }
  }, [user]);

  // Don't show component if user is not logged in
  if (!user) {
    return null;
  }

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-8">
        <div className="animate-pulse rounded-2xl h-64" style={{ backgroundColor: 'var(--border-color)' }}></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl sm:text-3xl font-bold flex items-center gap-2" style={{ color: 'var(--text-primary)' }}>
          <FiClock style={{ color: 'var(--color-primary)' }} /> Recent Transactions
        </h2>
        <Link to="/my-transactions" className="font-semibold text-sm sm:text-base flex items-center gap-1" style={{ color: 'var(--color-primary)' }}>
          View All <FiArrowRight />
        </Link>
      </div>

      <div className="card rounded-2xl shadow-lg overflow-hidden">
        {transactions.length === 0 ? (
          <div className="p-8 text-center" style={{ color: 'var(--text-muted)' }}>
            <FiInbox size={48} className="mx-auto mb-3" />
            <p>No transactions yet. Start tracking your money!</p>
            <Link to="/add-transaction" className="inline-block mt-4 px-6 py-2 text-white rounded-full transition" style={{ backgroundColor: 'var(--color-primary)' }}>
              Add First Transaction
            </Link>
          </div>
        ) : (
          <div className="divide-y" style={{ borderColor: 'var(--border-color)' }}>
            {transactions.map((tx, index) => (
              <div key={tx._id || index} className="flex items-center justify-between p-4 transition" style={{ borderColor: 'var(--border-color)' }}>
                <div className="flex items-center gap-4">
                  <div 
                    className="w-10 h-10 rounded-full flex items-center justify-center"
                    style={{ 
                      backgroundColor: tx.type === 'income' ? 'var(--color-success)' : 'var(--color-danger)',
                      color: 'white'
                    }}
                  >
                    {tx.type === 'income' ? <FiDollarSign size={20} /> : <FiShoppingCart size={20} />}
                  </div>
                  <div>
                    <p className="font-semibold" style={{ color: 'var(--text-primary)' }}>
                      {(tx.title || tx.description)?.length > 20 
                        ? (tx.title || tx.description).slice(0, 20) + '...' 
                        : (tx.title || tx.description)}
                    </p>
                    <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
                      {tx.category} • {new Date(tx.date).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <span className="font-bold text-lg" style={{ color: tx.type === 'income' ? 'var(--color-success)' : 'var(--color-danger)' }}>
                  {tx.type === 'income' ? '+' : '-'}${tx.amount}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default RecentTransactions;
