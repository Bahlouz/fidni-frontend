import { useEffect, useState } from 'react';

const usePostBlog = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      setLoading(true);
      try {
        const response = await fetch('http://localhost:1337/api/post-blogs'); // Adjust to your API endpoint

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        if (!data.data) {
          throw new Error('Malformed response data');
        }

        setBlogs(data.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching blogs:', error);
        setError(error.message || 'Error fetching data');
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);
  return { loading, error, blogs };
};

export default usePostBlog;
