import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { fetchBlogs } from "../services/contentful";
import "./Blog-Detail.css";

function BlogDetails() {
  const { slug } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getSinglePost = async () => {
      const data = await fetchBlogs();
      const foundBlog = data.find((item) => (item.slug || item.Slug) === slug);
      setBlog(foundBlog);
      setLoading(false);
    };
    getSinglePost();
  }, [slug]);

  if (loading) {
    return (
      <div className="details-loading">
        <p>Loading Article Details...</p>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="details-error">
        <h2>Article Not Found</h2>
        <Link to="/" className="back-home-btn">← Back to Home</Link>
      </div>
    );
  }

  const title = blog.title || blog.Title || "Untitled Article";
  const category = blog.category || blog.Category || "Fashion";
  const author = blog.author || blog.Author || "Admin";
  const publishDate = blog.publishDate || blog.PublishDate ? (blog.publishDate || blog.PublishDate).split('T')[0] : "";

  // 1. Dynamic Image Finder Logic (Exact same as BlogCard)
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
    imageUrl = 'https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=1200';
  } else {
    imageUrl = imageUrl.startsWith('//') ? `https:${imageUrl}` : imageUrl;
  }

  // 2. Safe Content Body Extraction
  let rawContent = blog.content || blog.Content || blog.description || blog.Description || "";
  let cleanContent = "";

  if (typeof rawContent === 'object' && rawContent?.nodeType === 'document') {
    try {
      cleanContent = rawContent.content
        .map(paragraph => paragraph.content.map(textNode => textNode.value).join(''))
        .join('\n\n');
    } catch (e) {
      cleanContent = "Content formatting error.";
    }
  } else if (typeof rawContent === 'string') {
    cleanContent = rawContent;
  }

  return (
    <article className="blog-details-container">
      <div className="details-header">
        <span className="details-category">{category}</span>
        <h1 className="details-title">{title}</h1>
        <div className="details-meta">
          <span>By <strong>{author}</strong></span>
          <span className="meta-divider">•</span>
          <span>{publishDate}</span>
        </div>
      </div>

      <div className="details-hero-image">
        <img src={imageUrl} alt={title} />
      </div>

      <div className="details-content-wrapper">
        <p className="details-body-text">{cleanContent}</p>
        <div className="details-footer-action">
          <Link to="/" className="back-btn">← Back to Latest Articles</Link>
        </div>
      </div>
    </article>
  );
}

export default BlogDetails;