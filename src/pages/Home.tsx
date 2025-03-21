import React from 'react';
import Card from '../components/common/Card';
import QuantityControl from '../components/common/QuantityControl';
import { useCart } from '../hooks/useCart';

const featuredItems = [
  { name: 'Dal Makhani & Naan', price: 150, image: '/images/dal-makhani.jpg', desc: 'Black lentils, butter, cream, naan' },
  { name: 'Samosa', price: 30, image: '/images/samosa.jpg', desc: 'Crispy pastry, spiced filling' },
  { name: 'Gulab Jamun', price: 50, image: '/images/gulab-jamun.jpg', desc: 'Sweet, syrupy balls' },
  { name: 'Paneer Butter Masala & Rice', price: 180, image: '/images/paneer-masala.jpg', desc: 'Paneer in rich tomato gravy' },
];

const Home: React.FC = () => {
  const { addToCart } = useCart();

  return (
    <div className="home">
      <section className="banner animate-fade-in">
        <h1>Welcome to Nomio</h1>
        <p>Your daily dose of deliciousness, delivered!</p>
      </section>

      <section className="promo animate-slide-up">
        <h2>Limited Time Offer</h2>
        <p>Get 20% off your first order with code: NOMIO20</p>
      </section>

      <section className="categories animate-slide-up">
        <h2>Explore Categories</h2>
        <div className="category-list">
          <Card>Tiffins</Card>
          <Card>Snacks</Card>
          <Card>Beverages</Card>
          <Card>Desserts</Card>
          <Card>Groceries</Card>
        </div>
      </section>

      <section className="featured-items animate-slide-up">
        <h2>Featured Items</h2>
        <div className="items-grid">
          {featuredItems.map((item) => (
            <Card key={item.name} className="item-card" data-name={item.name}>
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

      <section className="why-nomio animate-slide-up">
        <h2>Why Nomio?</h2>
        <p>Fresh, fast, and flavorful—your meals, your way.</p>
      </section>
    </div>
  );
};

export default Home;