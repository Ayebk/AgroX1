import React, { useState } from 'react'
import styled from "styled-components";



const Container = styled.div`
`
const TabWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 50px;
`
const Tab = styled.button`
    width: 150px;
    height: 50px;
    font-size: 20px;
    padding: 5px;
    cursor: pointer;
    align-items: center; 
    border: solid #009af1 2px;
    border-radius: 50px;
    margin: 20px;

&:hover{
    color: rgb(0, 0, 0);
    background-color:white;   
    -webkit-box-shadow: 0px 0px 20px -5px rgba(0,0,0,0.4); 
    box-shadow: 0px 0px 20px -5px rgba(0,0,0,0.4);
    transform: scale(1.1);

}
&:active{
    background-image: linear-gradient(124deg, #00e959 53%, #00fffb 100%);
    color: rgb(255, 255, 255);
    transform: scale(1.1);

}
`

const topbar = ({setIndexCrop , setIndexPage}) => {

    return (
        <Container>
            <TabWrapper>
                <Tab onClick={() => { setIndexCrop(1);setIndexPage(0) }}>פירות</Tab>
                <Tab onClick={() => { setIndexCrop(2);setIndexPage(0) }}>ירקות</Tab>
                <Tab onClick={() => { setIndexCrop(3);setIndexPage(0) }}>עלים</Tab>
            </TabWrapper> 
        </Container>
    )
}

export default topbar
