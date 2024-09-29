import { useEffect, useState } from 'react';
import axios from 'axios';

const useCategoriesAndSubCategories = () => {
  const [categories, setCategories] = useState([]);
  const [subcategoriesNoCategory, setSubcategoriesNoCategory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategoriesAndSubCategories = async () => {
      setLoading(true);
      try {
        // Fetching categories
        const categoriesResponse = await axios.get('/api/categories?populate=*');
        const categoriesData = categoriesResponse.data.data.map(category => ({
          id: category.id,
          name: category.attributes.name,
          subcategories: category.attributes.subcategories.data.map(subcategory => ({
            id: subcategory.id,
            name: subcategory.attributes.name,
            slug: subcategory.attributes.Slug // Ensure you have slug or URL in your response
          }))
        }));

        // Fetching subcategories with no category
        const subcategoriesResponse = await axios.get('/api/subcategories?populate=*&filters[category][$null]=true');
        const subcategoriesData = subcategoriesResponse.data.data.map(subcategory => ({
          id: subcategory.id,
          name: subcategory.attributes.name,
          slug: subcategory.attributes.Slug
        }));

        // Update states
        setCategories(categoriesData);
        setSubcategoriesNoCategory(subcategoriesData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching categories and subcategories:', error);
        setError(error.message || 'Error fetching data');
        setLoading(false);
      }
    };

    fetchCategoriesAndSubCategories();
  }, []);

  return { loading, error, categories, subcategoriesNoCategory };
};

export default useCategoriesAndSubCategories;
