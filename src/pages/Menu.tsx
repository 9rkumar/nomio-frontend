import React, { useState } from 'react';
import Card from '../components/common/Card';
import QuantityControl from '../components/common/QuantityControl';
import { useCart } from '../hooks/useCart';

const menuItems = [
  {
    category: 'Tiffins',
    items: [
      { name: 'Dal Makhani & Naan', price: 150, image: '/images/dal-makhani.jpg', desc: 'Black lentils, butter, cream, naan' },
      { name: 'Paneer Butter Masala & Rice', price: 180, image: '/images/paneer-masala.jpg', desc: 'Paneer in rich tomato gravy' },
      { name: 'Aloo Paratha & Curd', price: 120, image: '/images/paneer-masala.jpg', desc: 'Spiced potato stuffed paratha' },
    ],
  },
  {
    category: 'Snacks',
    items: [
      { name: 'Samosa', price: 30, image: '/images/samosa.jpg', desc: 'Crispy pastry, spiced filling' },
      { name: 'Pakora', price: 40, image: '/images/samosa.jpg', desc: 'Fritters with veggies' },
      { name: 'Kachori', price: 35, image: '/images/samosa.jpg', desc: 'Spicy lentil stuffed pastry' },
    ],
  },
  {
    category: 'Beverages',
    items: [
      { name: 'Masala Chai', price: 20, image: '/images/dal-makhani.jpg', desc: 'Spiced tea' },
      { name: 'Lassi', price: 50, image: '/images/dal-makhani.jpg', desc: 'Sweet yogurt drink' },
      { name: 'Nimbu Pani', price: 25, image: '/images/dal-makhani.jpg', desc: 'Fresh lime water' },
    ],
  },
  {
    category: 'Desserts',
    items: [
      { name: 'Gulab Jamun', price: 50, image: '/images/gulab-jamun.jpg', desc: 'Sweet, syrupy balls' },
      { name: 'Rasgulla', price: 60, image: '/images/gulab-jamun.jpg', desc: 'Spongy cheese balls in syrup' },
      { name: 'Jalebi', price: 40, image: '/images/gulab-jamun.jpg', desc: 'Crispy sweet spirals' },
    ],
  },
  {
    category: 'Groceries',
    items: [
      { name: 'Atta (5kg)', price: 250, image: '/images/paneer-masala.jpg', desc: 'Whole wheat flour' },
      { name: 'Rice (5kg)', price: 300, image: '/images/paneer-masala.jpg', desc: 'Basmati rice' },
      { name: 'Sugar (1kg)', price: 50, image: '/images/paneer-masala.jpg', desc: 'Granulated sugar' },
    ],
  },
];

const Menu: React.FC = () => {
  const { addToCart } = useCart();
  const [search, setSearch] = useState('');

  const filteredItems = menuItems.map((section) => ({
    ...section,
    items: section.items.filter((item) =>
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.desc.toLowerCase().includes(search.toLowerCase())
    ),
  })).filter((section) => section.items.length > 0);

  return (
    <div className="menu">
      <div className="search-bar animate-fade-in">
        <input
          type="text"
          placeholder="Search for tiffins, snacks..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          aria-label="Search menu"
        />
        <button className="btn">Search</button>
      </div>
      <h1 className="animate-slide-up">Menu (Delhi-NCR Only)</h1>
      {filteredItems.map((section) => (
        <section key={section.category} id={section.category.toLowerCase()} className="menu-section animate-slide-up">
          <h2>{section.category}</h2>
          <div className="menu-container">
            {section.items.map((item) => (
              <Card key={item.name} className="menu-item" data-name={item.name}>
                <img loading="lazy" src={item.image} alt={item.name} />
                <h3>{item.name}</h3>
                <p>{item.desc}</p>
                <p>₹{item.price}</p>
                <QuantityControl
                  initialQty={1}
                  onAdd={(quantity) => addToCart({ name: item.name, price: item.price, quantity })}
                />
              </Card>
            ))}
          </div>
        </section>
      ))}
      <section className="why-choose animate-slide-up">
        <h2>Why Choose Nomio?</h2>
        <p>Quality ingredients, timely delivery, and unbeatable taste.</p>
      </section>
      <section className="menu-promise animate-slide-up">
        <h2>Our Menu Promise</h2>
        <p>Freshly prepared meals, every day.</p>
      </section>
      <p className="delivery-info animate-slide-up">
        <strong>Delivery:</strong> Available in Delhi-NCR only.
      </p>
    </div>
  );
};

export default Menu;