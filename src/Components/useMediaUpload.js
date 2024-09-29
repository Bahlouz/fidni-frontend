import { useEffect, useState } from 'react';

const useMediaUpload = () => {
  const [mediaUploads, setMediaUploads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMediaUploads = async () => {
      setLoading(true);
      try {
        const response = await fetch('https://fidni.tn/api/media-uploads');
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        
        if (!data.data) {
          throw new Error('Malformed response data');
        }

        setMediaUploads(data.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching media uploads:', error);
        setError(error.message || 'Error fetching data');
        setLoading(false);
      }
    };

    fetchMediaUploads();
  }, []);
  
  return { loading, error, mediaUploads };
};

export default useMediaUpload;
