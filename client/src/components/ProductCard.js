import React from 'react';
import { Card } from 'antd';
import '../styles/videoDetailPage.css';


const ProductCard = ({ product }) => {
    return (
        <Card bordered={false}>
            <div className='product-card'>
                <div className='product-image'>
                    <img src={product.image} alt={product.title} />
                </div>
                <div className='product-details'>
                    <p className='product-name'>{product.title}</p>
                    <p className='product-price'>Price: ${product.price}</p>
                </div>
            </div>
        </Card>
    );
};

export default ProductCard;