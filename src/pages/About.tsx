import React from 'react';
import Card from '../components/common/Card';

const About: React.FC = () => {
  return (
    <div className="about">
      <h1 className="animate-slide-up">About Nomio</h1>
      <Card className="about-content">
        <h2>Our Story</h2>
        <p>
          Nomio started with a simple idea: to bring delicious, home-style meals to your doorstep. Founded in Delhi-NCR, we’re passionate about fresh ingredients, authentic flavors, and making your day a little tastier.
        </p>
        <h2>Our Mission</h2>
        <p>
          To provide quality food with fast, reliable delivery—because everyone deserves a great meal, every day.
        </p>
        <h2>Why Us?</h2>
        <ul>
          <li>Freshly prepared meals</li>
          <li>Wide variety of options</li>
          <li>Customer-first service</li>
        </ul>
      </Card>
    </div>
  );
};

export default About;