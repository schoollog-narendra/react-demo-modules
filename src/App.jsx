import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import ProductListPage from './pages/ProductListPage.jsx';
import MyProductsPage from './pages/MyProductsPage.jsx';
import AddProductPage from './pages/AddProductPage.jsx';
import EditProductPage from './pages/EditProductPage.jsx';
import PrivateRoute from './utils/PrivateRoute.jsx';
import Navbar from './components/Navbar.jsx';

function App() {
  return (
    <Router>
       <Navbar />
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/products" element={<ProductListPage />} />
        <Route path="/my-products" element={<PrivateRoute><MyProductsPage /></PrivateRoute>} />
        <Route path="/add-product" element={<PrivateRoute><AddProductPage /></PrivateRoute>} />
        <Route path="/edit-product/:id" element={<PrivateRoute><EditProductPage /></PrivateRoute>} />
      </Routes>
    </Router>
  );
}

export default App;
