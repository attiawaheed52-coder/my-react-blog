import { createClient } from 'contentful';

const client = createClient({
  space: 'rjahdgq0uhbm', // 👈 Screenshot 2026-06-17 040821.png se aapki exact Space ID
  accessToken: '8Ct32t1QGmrjLPlu_-ASNaTC1Mc8uMjn-eooKQbcJ-U', // 👈 Screenshot 2026-06-17 040821.png se aapka Access Token
});

export const fetchBlogs = async () => {
  try {
    const response = await client.getEntries({
      content_type: "blog", 
      order: '-fields.publishDate', 
    });
    
    console.log("CMS Data Successfully Loaded:", response.items); // Browser console me verify karne ke liye
    
    return response.items.map(item => ({
      id: item.sys.id,
      ...item.fields,
    }));
  } catch (error) {
    console.error("Error fetching data from Contentful:", error);
    return [];
  }
};