import React from 'react';
import { Row, Col } from 'antd';
import ProductCard from './ProductCard';
import useProductList from '../hooks/useProductList';

const ProductsContainer = ({ videoId }) => {
    const {productList, error, loading } = useProductList(videoId);

    return (
        <div className='products-container'>
            <Row gutter = {[16, 16]}>
                {productList.map(product => (
                    <Col span={6} key={product._id}>
                        <ProductCard product={product} />
                    </Col>
                ))}
            </Row>
        </div>
    );
};

export default ProductsContainer;