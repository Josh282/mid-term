import React from 'react';
import { Card } from 'antd';

const ProductCard = ({ product }) => {
    return (
        <Card
            cover={<img src={product.image} alt={product.title} />}
            bordered={false}
        >
            <p>{product.title}</p>
        </Card>
    );
};

export default ProductCard;