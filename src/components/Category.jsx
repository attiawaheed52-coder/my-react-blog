import React from 'react';
import './Category.css';

function Category({ activeCategory, setActiveCategory }) {
 
  const categories = [
    { id: 'all', name: 'All' },
    { id: 'fashion-trends', name: 'Fashion Trends' },
    { id: 'styling-tips', name: 'Styling Tips' },
    { id: 'summer-fashion', name: 'Summer Fashion' }, 
    { id: 'luxury-fashion', name: 'Luxury Fashion' },
    { id: 'fashion-guide', name: 'Fashion Guide' }
  ];

  return (
    <section className="category-section">
      <div className="category-header">
        <h3>Browse By</h3>
        <h2>Curated Categories</h2>
      </div>
      <div className="category-buttons">
        {categories.map((cat) => {
          const isActive = activeCategory.trim().toLowerCase() === cat.name.trim().toLowerCase();
          return (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.name)}
              className={`cat-btn ${isActive ? 'active' : ''}`}
            >
              {cat.name === 'All' ? 'All Collection' : cat.name}
            </button>
          );
        })}
      </div>
    </section>
  );
}

export default Category;