import React from 'react';
import { Link } from 'react-router-dom';
import './Hero.css';

function Hero({ featuredPost }) {
  if (!featuredPost) return null;
 const imageField = featuredPost.featuredProductImage || featuredPost.FeaturedProductImage || featuredPost.image || featuredPost.Image;
let imageUrl = 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?q=80&w=1920';

if (imageField?.fields?.file?.url) {
  const rawUrl = imageField.fields.file.url;
  imageUrl = rawUrl.startsWith('//') ? `https:${rawUrl}` : rawUrl;
}
  return (
    <section className="hero-section">
      <div className="hero-bg">
        <img src={imageUrl} alt={featuredPost.title} />
      </div>
      <div className="hero-overlay"></div>
      <div className="hero-content">
        <span className="hero-badge">{featuredPost.category}</span>
        <h1 className="hero-title">{featuredPost.title}</h1>
        <p className="hero-desc">{featuredPost.description}</p>
        <Link to={`/blog/${featuredPost.slug}`} className="hero-btn">
          Read Featured Article
        </Link>
      </div>
    </section>
  );
}

export default Hero;