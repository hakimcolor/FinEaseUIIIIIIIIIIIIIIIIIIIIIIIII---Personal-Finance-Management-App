import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import { NavLink } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { AuthContext } from '../Context/AuthContext';
import Swal from 'sweetalert2';
import { 
  FiList, 
  FiFilter, 
  FiTrendingUp, 
  FiTrendingDown, 
  FiEdit2, 
  FiTrash2, 
  FiEye,
  FiInbox,
  FiPlus,
  FiSearch,
  FiX,
  FiChevronLeft,
  FiChevronRight
} from 'react-icons/fi';

const MyTransactions = () => {
  const { user } = useContext(AuthContext);
  const [transactions, setTransactions] = useState([]);
  const [sortOption, setSortOption] = useState('type-income');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const fetchTransactions = async () => {
    if (!user?.email) return;
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_API}/transactions?email=${user.email}`
      );
      setTransactions(res.data);
    } catch {
      toast.error('Failed to fetch transactions');
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, [user]);

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: 'Do you really want to delete this transaction?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel',
    });

    if (!result.isConfirmed) return;

    try {
      await axios.delete(
        `${import.meta.env.VITE_BACKEND_API}/transactions/${id}`
      );
      toast.success('Transaction deleted');
      fetchTransactions();
    } catch {
      toast.error('Delete failed');
    }
  };

  const sortedTransactions = transactions
    .filter((item) => {
      if (!searchQuery.trim()) return true;
      const query = searchQuery.toLowerCase();
      return (
        item.description?.toLowerCase().includes(query) ||
        item.category?.toLowerCase().includes(query)
      );
    })
    .slice()
    .sort((a, b) => {
      if (sortOption === 'type-income') {
        if (a.type === b.type) return 0;
        return a.type === 'income' ? -1 : 1;
      }
      if (sortOption === 'type-expense') {
        if (a.type === b.type) return 0;
        return a.type === 'expense' ? -1 : 1;
      }
      if (sortOption === 'date-new') {
        return new Date(b.date) - new Date(a.date);
      }
      if (sortOption === 'date-old') {
        return new Date(a.date) - new Date(b.date);
      }
      if (sortOption === 'amount-high') {
        return b.amount - a.amount;
      }
      if (sortOption === 'amount-low') {
        return a.amount - b.amount;
      }
      return 0;
    });

  // Pagination
  const totalPages = Math.ceil(sortedTransactions.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentTransactions = sortedTransactions.slice(startIndex, endIndex);

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const goToPrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Reset to page 1 when search or sort changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, sortOption]);

  return (
    <div className="min-h-screen py-8 px-4" style={{ backgroundColor: 'var(--bg-color)' }}>
      <Helmet>
        <title>My Transactions - Money Manager</title>
      </Helmet>
      <Toaster />
      
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold flex items-center gap-3" style={{ color: 'var(--text-primary)' }}>
              <div 
                className="w-12 h-12 rounded-xl flex items-center justify-center"
                style={{ backgroundColor: 'var(--color-primary)', color: 'white' }}
              >
                <FiList size={24} />
              </div>
              My Transactions
            </h1>
            <p className="mt-2" style={{ color: 'var(--text-muted)' }}>
              {sortedTransactions.length} transaction{sortedTransactions.length !== 1 ? 's' : ''} found
            </p>
          </div>

          {/* Add Button */}
          <NavLink
            to="/add-transaction"
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium text-white cursor-pointer transition-all hover:opacity-90"
            style={{ backgroundColor: 'var(--color-primary)' }}
          >
            <FiPlus size={18} />
            <span className="hidden sm:inline">Add New</span>
          </NavLink>
        </div>

        {/* Search and Filter Bar */}
        <div 
          className="flex flex-col sm:flex-row gap-3 mb-6 p-4 rounded-2xl"
          style={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-color)' }}
        >
          {/* Search Input */}
          <div className="flex-1 relative">
            <FiSearch 
              size={18} 
              className="absolute left-4 top-1/2 -translate-y-1/2"
              style={{ color: 'var(--text-muted)' }}
            />
            <input
              type="text"
              placeholder="Search by description or category..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-10 py-3 rounded-xl outline-none transition-all"
              style={{ 
                backgroundColor: 'var(--bg-color)', 
                border: '2px solid var(--border-color)',
                color: 'var(--text-primary)'
              }}
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-full cursor-pointer transition-all hover:scale-110"
                style={{ color: 'var(--text-muted)' }}
              >
                <FiX size={16} />
              </button>
            )}
          </div>

          {/* Sort Filter */}
          <div 
            className="flex items-center gap-2 px-4 py-3 rounded-xl"
            style={{ backgroundColor: 'var(--bg-color)', border: '2px solid var(--border-color)' }}
          >
            <FiFilter size={16} style={{ color: 'var(--text-muted)' }} />
            <select
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
              className="outline-none font-medium cursor-pointer text-sm"
              style={{ backgroundColor: 'var(--bg-card)', color: 'var(--text-primary)' }}
            >
              <option value="type-income">Income First</option>
              <option value="type-expense">Expense First</option>
              <option value="date-new">Newest First</option>
              <option value="date-old">Oldest First</option>
              <option value="amount-high">High to Low</option>
              <option value="amount-low">Low to High</option>
            </select>
          </div>
        </div>

        {/* Empty State */}
        {sortedTransactions.length === 0 ? (
          <div 
            className="card rounded-2xl p-12 text-center"
            style={{ border: '1px solid var(--border-color)' }}
          >
            <FiInbox size={64} className="mx-auto mb-4" style={{ color: 'var(--text-muted)' }} />
            <h3 className="text-xl font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>
              {searchQuery ? 'No results found' : 'No transactions found'}
            </h3>
            <p className="mb-6" style={{ color: 'var(--text-muted)' }}>
              {searchQuery ? 'Try a different search term' : 'Start tracking your money by adding your first transaction'}
            </p>
            {!searchQuery && (
              <NavLink
                to="/add-transaction"
                className="inline-flex items-center gap-2 px-6 py-3 text-white font-semibold rounded-xl cursor-pointer"
                style={{ backgroundColor: 'var(--color-primary)' }}
              >
                <FiPlus /> Add Transaction
              </NavLink>
            )}
          </div>
        ) : (
          <>
            {/* Table */}
            <div 
              className="card rounded-2xl overflow-hidden"
              style={{ border: '1px solid var(--border-color)' }}
            >
              {/* Desktop Table */}
              <div className="hidden md:block overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr style={{ backgroundColor: 'var(--bg-color)', borderBottom: '1px solid var(--border-color)' }}>
                      <th className="text-left px-6 py-4 font-semibold text-sm" style={{ color: 'var(--text-muted)' }}>Type</th>
                      <th className="text-left px-6 py-4 font-semibold text-sm" style={{ color: 'var(--text-muted)' }}>Category</th>
                      <th className="text-left px-6 py-4 font-semibold text-sm" style={{ color: 'var(--text-muted)' }}>Description</th>
                      <th className="text-left px-6 py-4 font-semibold text-sm" style={{ color: 'var(--text-muted)' }}>Date</th>
                      <th className="text-right px-6 py-4 font-semibold text-sm" style={{ color: 'var(--text-muted)' }}>Amount</th>
                      <th className="text-center px-6 py-4 font-semibold text-sm" style={{ color: 'var(--text-muted)' }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentTransactions.map((item, index) => {
                      const isIncome = item.type === 'income';
                      return (
                        <tr 
                          key={item._id}
                          className="transition-colors hover:bg-opacity-50"
                          style={{ 
                            borderBottom: index !== currentTransactions.length - 1 ? '1px solid var(--border-color)' : 'none',
                          }}
                        >
                          {/* Type */}
                          <td className="px-6 py-4">
                            <span 
                              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold text-white"
                              style={{ backgroundColor: isIncome ? 'var(--color-success)' : 'var(--color-danger)' }}
                            >
                              {isIncome ? <FiTrendingUp size={12} /> : <FiTrendingDown size={12} />}
                              {item.type}
                            </span>
                          </td>

                          {/* Category */}
                          <td className="px-6 py-4">
                            <span className="font-medium capitalize" style={{ color: 'var(--text-primary)' }}>
                              {item.category}
                            </span>
                          </td>

                          {/* Description */}
                          <td className="px-6 py-4">
                            <span className="text-sm max-w-[200px] truncate block" style={{ color: 'var(--text-secondary)' }}>
                              {item.description || '-'}
                            </span>
                          </td>

                          {/* Date */}
                          <td className="px-6 py-4">
                            <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                              {new Date(item.date).toLocaleDateString('en-US', {
                                month: 'short',
                                day: 'numeric',
                                year: 'numeric'
                              })}
                            </span>
                          </td>

                          {/* Amount */}
                          <td className="px-6 py-4 text-right">
                            <span 
                              className="font-bold text-lg"
                              style={{ color: isIncome ? 'var(--color-success)' : 'var(--color-danger)' }}
                            >
                              {isIncome ? '+' : '-'}${item.amount}
                            </span>
                          </td>

                          {/* Actions */}
                          <td className="px-6 py-4">
                            <div className="flex items-center justify-center gap-2">
                              <NavLink
                                to={`/transaction-details/${item._id}`}
                                className="p-2 rounded-lg transition-all cursor-pointer hover:scale-110"
                                style={{ backgroundColor: 'var(--bg-color)', color: 'var(--text-secondary)' }}
                                title="View"
                              >
                                <FiEye size={16} />
                              </NavLink>
                              <NavLink
                                to={`/update-transaction/${item._id}`}
                                className="p-2 rounded-lg transition-all cursor-pointer hover:scale-110"
                                style={{ backgroundColor: 'var(--color-primary)', color: 'white' }}
                                title="Edit"
                              >
                                <FiEdit2 size={16} />
                              </NavLink>
                              <button
                                onClick={() => handleDelete(item._id)}
                                className="p-2 rounded-lg transition-all cursor-pointer hover:scale-110"
                                style={{ backgroundColor: 'var(--color-danger)', color: 'white' }}
                                title="Delete"
                              >
                                <FiTrash2 size={16} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              {/* Mobile List View */}
              <div className="md:hidden divide-y" style={{ borderColor: 'var(--border-color)' }}>
                {currentTransactions.map((item) => {
                  const isIncome = item.type === 'income';
                  return (
                    <div key={item._id} className="p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <span 
                            className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-semibold text-white mb-2"
                            style={{ backgroundColor: isIncome ? 'var(--color-success)' : 'var(--color-danger)' }}
                          >
                            {isIncome ? <FiTrendingUp size={10} /> : <FiTrendingDown size={10} />}
                            {item.type}
                          </span>
                          <h3 className="font-semibold capitalize" style={{ color: 'var(--text-primary)' }}>
                            {item.category}
                          </h3>
                          <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
                            {new Date(item.date).toLocaleDateString()}
                          </p>
                        </div>
                        <span 
                          className="font-bold text-lg"
                          style={{ color: isIncome ? 'var(--color-success)' : 'var(--color-danger)' }}
                        >
                          {isIncome ? '+' : '-'}${item.amount}
                        </span>
                      </div>
                      
                      {item.description && (
                        <p className="text-sm mb-3" style={{ color: 'var(--text-secondary)' }}>
                          {item.description}
                        </p>
                      )}

                      <div className="flex gap-2">
                        <NavLink
                          to={`/transaction-details/${item._id}`}
                          className="flex-1 flex items-center justify-center gap-1 py-2 rounded-lg text-sm font-medium cursor-pointer"
                          style={{ backgroundColor: 'var(--bg-color)', color: 'var(--text-secondary)', border: '1px solid var(--border-color)' }}
                        >
                          <FiEye size={14} /> View
                        </NavLink>
                        <NavLink
                          to={`/update-transaction/${item._id}`}
                          className="flex-1 flex items-center justify-center gap-1 py-2 rounded-lg text-sm font-medium text-white cursor-pointer"
                          style={{ backgroundColor: 'var(--color-primary)' }}
                        >
                          <FiEdit2 size={14} /> Edit
                        </NavLink>
                        <button
                          onClick={() => handleDelete(item._id)}
                          className="flex items-center justify-center gap-1 px-4 py-2 rounded-lg text-sm font-medium text-white cursor-pointer"
                          style={{ backgroundColor: 'var(--color-danger)' }}
                        >
                          <FiTrash2 size={14} />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-6 p-4 rounded-2xl" style={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-color)' }}>
                {/* Page Info */}
                <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
                  Showing {startIndex + 1}-{Math.min(endIndex, sortedTransactions.length)} of {sortedTransactions.length} transactions
                </p>

                {/* Pagination Buttons */}
                <div className="flex items-center gap-2">
                  {/* Previous Button */}
                  <button
                    onClick={goToPrevPage}
                    disabled={currentPage === 1}
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition-all cursor-pointer ${
                      currentPage === 1 ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105'
                    }`}
                    style={{ 
                      backgroundColor: currentPage === 1 ? 'var(--border-color)' : 'var(--color-primary)', 
                      color: currentPage === 1 ? 'var(--text-muted)' : 'white'
                    }}
                  >
                    <FiChevronLeft size={18} />
                    <span className="hidden sm:inline">Previous</span>
                  </button>

                  {/* Page Numbers */}
                  <div className="flex items-center gap-1">
                    {[...Array(totalPages)].map((_, index) => {
                      const pageNum = index + 1;
                      // Show first, last, current, and adjacent pages
                      if (
                        pageNum === 1 ||
                        pageNum === totalPages ||
                        (pageNum >= currentPage - 1 && pageNum <= currentPage + 1)
                      ) {
                        return (
                          <button
                            key={pageNum}
                            onClick={() => {
                              setCurrentPage(pageNum);
                              window.scrollTo({ top: 0, behavior: 'smooth' });
                            }}
                            className={`w-10 h-10 rounded-xl font-medium transition-all cursor-pointer ${
                              currentPage === pageNum ? '' : 'hover:scale-105'
                            }`}
                            style={{ 
                              backgroundColor: currentPage === pageNum ? 'var(--color-primary)' : 'var(--bg-color)', 
                              color: currentPage === pageNum ? 'white' : 'var(--text-primary)',
                              border: currentPage === pageNum ? 'none' : '1px solid var(--border-color)'
                            }}
                          >
                            {pageNum}
                          </button>
                        );
                      } else if (
                        (pageNum === currentPage - 2 && currentPage > 3) ||
                        (pageNum === currentPage + 2 && currentPage < totalPages - 2)
                      ) {
                        return (
                          <span key={pageNum} style={{ color: 'var(--text-muted)' }}>...</span>
                        );
                      }
                      return null;
                    })}
                  </div>

                  {/* Next Button */}
                  <button
                    onClick={goToNextPage}
                    disabled={currentPage === totalPages}
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition-all cursor-pointer ${
                      currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105'
                    }`}
                    style={{ 
                      backgroundColor: currentPage === totalPages ? 'var(--border-color)' : 'var(--color-primary)', 
                      color: currentPage === totalPages ? 'var(--text-muted)' : 'white'
                    }}
                  >
                    <span className="hidden sm:inline">Next</span>
                    <FiChevronRight size={18} />
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default MyTransactions;
