import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Nav from './components/Nav';
import Footer from './components/Footer';
import CartFloat from './components/CartFloat';

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <Nav />
        <div className="main-content">
          <Routes>
            <Route path="/" element={<div>Home Page Placeholder</div>} />
            <Route path="/menu" element={<div>Menu Page Placeholder</div>} />
            <Route path="/cart" element={<div>Cart Page Placeholder</div>} />
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