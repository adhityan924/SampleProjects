import React from 'react';
import Navbar from './components/Navbar';
import PizzaCard from './components/PizzaCard';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import './App.css';

function AppContent() {
  const { darkMode } = useTheme();
  
  const pizzas = [
    {
      name: "Margherita",
      description: "Fresh tomatoes, mozzarella, basil, and olive oil",
      price: 12.99,
      image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
    },
    {
      name: "Pepperoni",
      description: "Classic pepperoni with mozzarella and tomato sauce",
      price: 14.99,
      image: "https://images.unsplash.com/photo-1628840042765-356cda07504e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
    },
    {
      name: "Vegetarian",
      description: "Bell peppers, mushrooms, onions, olives, and tomatoes",
      price: 13.99,
      image: "https://images.unsplash.com/photo-1571407970349-bc81e7e96d47?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
    }
  ];

  return (
    <div className={`App ${darkMode ? 'dark' : ''}`}>
      <Navbar />
      <main className="container">
        <h2>Our Pizza Menu</h2>
        <div className="pizza-grid">
          {pizzas.map((pizza, index) => (
            <PizzaCard key={index} {...pizza} />
          ))}
        </div>
      </main>
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

export default App;
