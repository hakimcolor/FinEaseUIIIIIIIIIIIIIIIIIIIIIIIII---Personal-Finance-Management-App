import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import Swal from 'sweetalert2';
import { AuthContext } from '../Context/AuthContext';

const MyProfile = () => {
  const { user, setUser } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    firstName: '',
    email: '',
    imgUrl: '',
    password: '',
  });
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchUser = async () => {
    if (!user?.email) return;
    try {
      const res = await axios.get(
        `https://fin-eas-backend.vercel.app/users/by-email?email=${user.email}`
      );
      const userData = res.data;
      setFormData({
        firstName: userData.firstName || '',
        email: userData.email || '',
        imgUrl: userData.imgUrl || '',
        password: '',
      });
    } catch (err) {
      console.error(err);
      toast.error('Failed to fetch user info');
    }
  };

  useEffect(() => {
    fetchUser();
  }, [user?.email]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: 'Do you want to update your profile?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, update it!',
      cancelButtonText: 'No, cancel',
      reverseButtons: true,
    });

    if (result.isConfirmed) {
      try {
        const res = await axios.post(
          'https://fin-eas-backend.vercel.app/users',
          formData
        );
        await Swal.fire({
          title: 'Success!',
          text: res.data.message,
          icon: 'success',
          confirmButtonText: 'OK',
        });

        setUser({
          ...user,
          firstName: formData.firstName,
          imgUrl: formData.imgUrl,
        });
        setIsModalOpen(false);
        fetchUser();
      } catch (err) {
        console.error(err);
        toast.error(err.response?.data?.message || 'Update failed');
      }
    } else {
      toast('Update canceled');
    }
  };

  if (!user) return <div className="text-center mt-10">Loading...</div>;

  return (
    <div className="min-h-screen flex items-center justify-center mt-[-40px]">
      <div className="w-full max-w-md p-6 border rounded-lg shadow-lg bg-white text-center">
        <h2 className="text-2xl font-bold mb-6 text-blue-600">My Profile</h2>

        {formData.imgUrl && (
          <img
            src={formData.imgUrl}
            alt="Profile"
            className="w-28 h-28 mx-auto rounded-full mb-4 border-4 border-blue-200 shadow-md object-cover"
          />
        )}

        <p className="font-semibold text-lg mb-2 text-black">
          {formData.firstName}
        </p>
        <p className="text-gray-600 mb-6">{formData.email}</p>

        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 shadow-md transition"
        >
          Update Profile
        </button>

        {isModalOpen && (
          <div
            className="fixed inset-0 z-50 flex text-black items-center justify-center bg-black/30 backdrop-blur-sm p-4"
            onClick={() => setIsModalOpen(false)}
          >
            <div
              className="bg-white p-6 rounded-xl shadow-xl w-full max-w-sm relative animate-slide-down"
              onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
            >
              <h3 className="text-xl font-bold mb-4 text-blue-600">
                Update Profile
              </h3>

              <div className="mb-4">
                <label className="block mb-1 font-semibold">First Name</label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="w-full border px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 transition"
                />
              </div>

              <div className="mb-4">
                <label className="block mb-1 font-semibold">
                  Profile Image URL
                </label>
                <input
                  type="text"
                  name="imgUrl"
                  value={formData.imgUrl}
                  onChange={handleChange}
                  className="w-full border px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 transition"
                />
              </div>

              <div className="flex justify-end gap-3 mt-4">
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 border rounded-lg hover:bg-gray-100 transition"
                >
                  Cancel
                </button>
                <button
                  onClick={handleUpdate}
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition shadow"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyProfile;
