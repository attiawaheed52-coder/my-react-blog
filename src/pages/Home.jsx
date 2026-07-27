import React, { useEffect, useState } from 'react';
import { fetchBlogs } from '../services/contentful';
import Hero from '../components/Hero';
import Category from '../components/Category';
import BlogCard from '../components/Blog-Card';
import './Home.css';

function Home() {
  const [blogs, setBlogs] = useState([]);
  const [filteredBlogs, setFilteredBlogs] = useState([]);
  const [activeCategory, setActiveCategory] = useState('All');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getData = async () => {
      const data = await fetchBlogs();
      setBlogs(data);
      setFilteredBlogs(data); 
      setLoading(false);
    };
    getData();
  }, []);

  useEffect(() => {
    if (activeCategory === 'All') {
      setFilteredBlogs(blogs);
    } else {
      const filtered = blogs.filter(blog => 
        blog.category?.trim().toLowerCase() === activeCategory.trim().toLowerCase()
      );
      setFilteredBlogs(filtered);
    }
  }, [activeCategory, blogs]);

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <p style={{ fontSize: '16px', color: '#64748b', letterSpacing: '1px' }}>Loading Fashion Blog...</p>
      </div>
    );
  }

  const featuredPost = blogs.length > 0 ? blogs[0] : null;

  return (
    <div style={{ paddingBottom: '60px' }}>
      <Hero featuredPost={featuredPost} />
      <Category activeCategory={activeCategory} setActiveCategory={setActiveCategory} />

      <section className="articles-section">
        <div className="section-title-block">
          <h2>{activeCategory === 'All' ? 'Latest Articles' : `${activeCategory} Articles`}</h2>
          <div className="section-line"></div>
        </div>

        <div className="articles-grid">
          {filteredBlogs.map(blog => (
            <BlogCard key={blog.id} blog={blog} />
          ))}
        </div>
      </section>
    </div>
  );
}

export default Home;