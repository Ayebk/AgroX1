import React from 'react'
import styled from "styled-components";


const TabListContent = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 5px;
    margin: 10px;
    background-color: white;
    position:relative;
        -webkit-box-shadow:0 1px 4px rgba(0, 0, 0, 0.3), 0 0 40px rgba(0, 0, 0, 0.03) inset;
        -moz-box-shadow:0 1px 4px rgba(0, 0, 0, 0.3), 0 0 40px rgba(0, 0, 0, 0.03) inset;
                box-shadow:0 1px 4px rgba(0, 0, 0, 0.3), 0 0 40px rgba(0, 0, 0, 0.03) inset;

`
const TabListContentIcontWrapper = styled.div`
    margin-left: 30px;
`
const TabListContentRight = styled.div`
    margin-left: 30px;
    width: 200px;
`
const TabListContentLeft = styled.div`
    display: flex;
    flex-direction: column;
    font-size: 16px;
    font-weight: bold;

`
const ProductTitle = styled.h2`
`
const ProductImg = styled.img`
    height: 30px;
    width: 30px;
`
const ProductPrice = styled.span`
`
const ProductPriceNIS = styled.span`
`
const ProductPricePct = styled.span`
    direction: ltr;
    align-self: flex-start;
`
const ProductCropId = styled.span`
    direction: ltr;
    align-self: flex-start;
`
const ProductCropName = styled.span`
`


const Product = (product) => {


    return (
        <TabListContent >
        <TabListContentIcontWrapper>
            <ProductImg src="{item.imagePath}" alt="" />
        </TabListContentIcontWrapper>
        <TabListContentRight>
            <ProductTitle>{product.item.cropName} </ProductTitle>
            <ProductCropName>{product.item.subCropName}</ProductCropName>
        </TabListContentRight>
        <TabListContentLeft>
            <ProductPrice>מחיר: {product.item.price?.toFixed(2)} ₪</ProductPrice>
            <ProductPriceNIS>{product.item.priceDiffInNIS}</ProductPriceNIS>
            <ProductPricePct>{product.item.priceDiffInPct} %</ProductPricePct>
            <ProductCropId>{product.item.subCropId} :Id</ProductCropId>
        </TabListContentLeft>
    </TabListContent>
    )
}

export default Product
