import React, { useState } from 'react';
import './BlogForm.css';

function BlogForm({ isOpen, onClose }) {
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const spaceId = 'rjahdgq0uhbm';
    const environmentId = 'master';
   const cmaToken = import.meta.env.VITE_CONTENTFUL_TOKEN;

    try {
      const response = await fetch(
        `https://api.contentful.com/spaces/${spaceId}/environments/${environmentId}/entries`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${cmaToken}`,
            'Content-Type': 'application/vnd.contentful.management.v1+json',
            'X-Contentful-Content-Type': 'blog',
          },
          body: JSON.stringify({
            fields: {
              title: { 'en-US': 'New Blog Entry' },
              slug: { 'en-US': 'new-entry-' + Date.now() },
              category: { 'en-US': category },
              description: { 'en-US': description }
            },
          }),
        }
      );

      if (response.ok) {
        alert('Entry created successfully in Contentful as Draft!');
        setCategory('');
        setDescription('');
        onClose();
      } else {
        const errData = await response.json();
        console.error("Contentful API Error Details:", errData);
        alert(`Failed to create entry: ${errData.message || 'Check Console'}`);
      }
    } catch (error) {
      console.error("Network Error:", error);
      alert('Error connecting to Contentful server.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-overlay">
      <div className="form-modal">
        <button className="close-btn" onClick={onClose}>&times;</button>
        <h2>Add New Article</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Category</label>
            <input
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
              placeholder="e.g. Luxury Fashion"
            />
          </div>
          <div className="form-group">
            <label>Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              placeholder="Enter text description..."
              rows="5"
            ></textarea>
          </div>
          <button type="submit" className="submit-btn" disabled={loading}>
            {loading ? 'Submitting...' : 'Submit Entry'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default BlogForm;