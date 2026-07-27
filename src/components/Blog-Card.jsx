import React from 'react';
import { Link } from 'react-router-dom';
import './Blog-Card.css';

function BlogCard({ blog }) {
  const title = blog.title || blog.Title || "Untitled Article";
  const description = blog.description || blog.Description || "";
  const category = blog.category || blog.Category || "Fashion";
  const author = blog.author || blog.Author || "Admin";
  const publishDate = blog.publishDate || blog.PublishDate || "";
  const slug = blog.slug || blog.Slug || "";

  
  let imageUrl = '';
  

  const potentialImageFields = [
    blog.featuredProductImage, blog.FeaturedProductImage,
    blog.image, blog.Image,
    blog.thumbnail, blog.Thumbnail,
    blog.cover, blog.Cover
  ];

  const foundField = potentialImageFields.find(field => field?.fields?.file?.url);

  if (foundField) {
    imageUrl = foundField.fields.file.url;
  } else {
    
    const keys = Object.keys(blog);
    for (let key of keys) {
      if (blog[key]?.fields?.file?.url) {
        imageUrl = blog[key].fields.file.url;
        break;
      }
    }
  }

  
  if (!imageUrl) {
    imageUrl = 'https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=600';
  } else {
    // Protocol handle  (// to https://)
    imageUrl = imageUrl.startsWith('//') ? `https:${imageUrl}` : imageUrl;
  }

  // Formatting Date safely to look clean
  const cleanDate = publishDate ? publishDate.split('T')[0] : "";

  return (
    <div className="blog-card">
      <div className="card-img-wrapper">
        <img src={imageUrl} alt={title} />
        <span className="card-badge">{category}</span>
      </div>
      <div className="card-body">
        <h3 className="card-title">
          <Link to={`/blog/${slug}`}>{title}</Link>
        </h3>
        <p className="card-desc">{description}</p>
        <div className="card-footer">
          <div className="card-meta">
            <span>By <strong>{author}</strong></span>
            <span style={{ margin: '0 8px' }}>•</span>
            <span>{cleanDate}</span>
          </div>
          <Link to={`/blog/${slug}`} className="read-more-link">
            Read More →
          </Link>
        </div>
      </div>
    </div>
  );
}

export default BlogCard;