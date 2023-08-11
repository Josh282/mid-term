import { useState, useEffect } from 'react';
import axios from 'axios';

const useProductList = (videoId) => {
    const [productList, setProductList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProductList = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/videos/${videoId}/products`);
                setProductList(response.data.productList);
                setLoading(false);
            } catch (error) {
                setError(error);
                setLoading(false);
            } 
        };
        
        fetchProductList();
    }, [videoId]);   

    return { productList, loading, error };
};

export default useProductList;