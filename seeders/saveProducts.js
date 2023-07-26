const axios = require('axios');
const Product = require('../src/models/productModel');

const saveProducts = async () => {
    try {
        const response = await axios.get('http://fakestoreapi.com/products');
        const productData = response.data.map((item) => {
            return {
                title: item.title,
                price: item.price,
                description: item.description,
                category: item.category,
                image: item.image,
            };
        });

        await Product.create(productData);
        console.log('Product data saved successfully')
    } catch (error) {
        console.error('Error saving product data:', error.message);
    };
}

module.exports = saveProducts