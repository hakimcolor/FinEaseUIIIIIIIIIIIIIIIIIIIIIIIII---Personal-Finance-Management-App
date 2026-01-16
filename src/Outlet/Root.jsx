import React, { useContext } from 'react';
import Header from '../Componentes/Header';
import { Outlet, useNavigation } from 'react-router-dom';
import Footer from '../Componentes/Footer';
import Loading from '../Pages/Loding';
import { AuthContext } from '../Context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';

const Root = () => {
  const navigation = useNavigation();
  const { loading: authLoading } = useContext(AuthContext);

  // Show loading when auth is loading or navigation is in progress
  const isLoading = authLoading || navigation.state === 'loading';

  return (
    <div>
      <AnimatePresence mode="wait">
        {isLoading ? (
          <Loading key="loading" />
        ) : (
          <motion.div
            key="content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Header />
            <br />
            <br />
            <br />
            <br />
            <Outlet />
            <br />
            <br />
            <Footer />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Root;
