import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Nav from './components/Nav';
import Footer from './components/Footer';
import CartFloat from './components/CartFloat';
import Sidebar from './components/Sidebar';
import Home from './pages/Home';
import Menu from './pages/Menu';
import Cart from './pages/Cart';
import { useAuth } from './hooks/useAuth';

function App() {
  const { user } = useAuth();

  return (
    <BrowserRouter>
      <div className="app">
        <Nav />
        <Sidebar />
        <div className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/menu" element={<Menu />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/orders" element={<div>Orders Page Placeholder</div>} />
            <Route path="/profile" element={<div>Profile Page Placeholder</div>} />
            <Route path="/about" element={<div>About Page Placeholder</div>} />
            <Route path="/contact" element={<div>Contact Page Placeholder</div>} />
            <Route path="/subscribe" element={<div>Subscribe Page Placeholder</div>} />
            <Route path="/login" element={<div>Login Page Placeholder</div>} />
            <Route path="/dashboard" element={<div>Dashboard Page Placeholder</div>} />
          </Routes>
        </div>
        <Footer />
        <CartFloat />
      </div>
    </BrowserRouter>
  );
}

export default App;