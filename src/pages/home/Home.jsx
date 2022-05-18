import React, { useEffect, useRef, useState } from 'react'
import styled from "styled-components";
import axios from "axios";
import Topbar from "../../components/topbar/Topbar"
import Product from "../../components/product/Product"

const Container = styled.div`
`
const ListProductWrapper = styled.div`
    direction: ltr;
    overflow-y: scroll;
    height: 800px;
    width: 900px;
    position: flex;
    margin: auto;
    align-items: center; 
    justify-content: center;
`
const TabTitle = styled.h1`
    text-align: center;
    margin-top: 10px;
    margin-bottom: 30px;

`
const TabContentWrapper = styled.div`
    background-color: #f6f6f6;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    border: solid rgb(213 213 213) 1px;
`
const TabContent = styled.div`
    width: 430px;
`
const PageWrapper = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
`
const Page = styled.button`
    margin: 10px;
    height: 30px;
    width: 50px;
`



const Home = () => {

    const [data, setData] = useState();
    const [indexPage, setIndexPage] = useState(0);
    const [indexCrop, setIndexCrop] = useState(1);
    const [dataFinised, setDataFinised] = useState(false);
    const [crops, setCrops] = useState(['פירות', 'ירקות', 'עלים'])


    /**
     * Reference for scrolling to top again
     */

    const titleRef = useRef();

    function handleClickScroll(cropTitle) {
        titleRef.current.scrollIntoView();
    }


    /**
    * Button for next and previous
    */

    const handleClick = (direction) => {
        if (direction === "next" && !dataFinised) {
            setIndexPage(indexPage => indexPage + 1)
        } else if (direction === "prev" && indexPage > 0) {
            setIndexPage(indexPage => indexPage - 1)
        }
    };

    /**
     * Request for Products content - API
     */

    useEffect(() => {
        const getData = async () => {
            try {
                const res = await axios.get(`https://apiproxy.agrox.io/api/crops/GetDataForTradeScene?cropTypeId=${indexCrop}&pageNumber=${indexPage}`)
                if (res.data.data.length !== 0) {
                    setData(res.data.data)
                    setDataFinised(false)
                } else {
                    setDataFinised(true)
                    setIndexPage(indexPage => indexPage - 1)
                }
            } catch (err) {
                console.log(err);
            }
        };
        getData();
    }, [indexCrop, indexPage]);

    return (
        <Container>
            <Topbar setIndexCrop={setIndexCrop} setIndexPage={setIndexPage} />
            <ListProductWrapper>
                <TabContentWrapper  ref={titleRef}>
                    {crops.map((crop,index) => (
                        <TabContent key={index} hidden={indexCrop !== index+1}>
                            <TabTitle >{crop}</TabTitle>
                            {data ? data.map((item, index) => (
                                <Product item={item} key={index} />
                            )) : null}
                            <PageWrapper>
                                <Page onClick={() => { handleClick("prev"); handleClickScroll(crop); }}>חזור</Page>
                                <Page onClick={() => { handleClick("next"); handleClickScroll(crop); }}>הבא</Page>
                            </PageWrapper>
                        </TabContent >
                    ))}
                </TabContentWrapper>
            </ListProductWrapper>
        </Container>
    )
}

export default Home
