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


    /**
     * Reference for scrolling to top again
     */

    const titleRefFruits = useRef();
    const titleRefVegetables = useRef();
    const titleRefLeaves = useRef();

    function handleClickFruits() {
        titleRefFruits.current.scrollIntoView({ behavior: "smooth" });
    }
    function handleClickVegetables() {
        titleRefVegetables.current.scrollIntoView({ behavior: "smooth" });
    }
    function handleClickLeaves() {
        titleRefLeaves.current.scrollIntoView({ behavior: "smooth" });
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
            <Topbar setIndexCrop={setIndexCrop} />
            <ListProductWrapper>
                <TabContentWrapper>
                    <TabContent hidden={indexCrop !== 1}>
                        <TabTitle ref={titleRefFruits} >פירות</TabTitle>
                        {data ? data.map((item, index) => (
                            <Product item={item} key={index} />
                        )) : null}
                        <PageWrapper>
                            <Page onClick={() => { handleClick("prev"); handleClickFruits(); }}>חזור</Page>
                            <Page onClick={() => { handleClick("next"); handleClickFruits(); }}>הבא</Page>
                        </PageWrapper>
                    </TabContent >
                    <TabContent hidden={indexCrop !== 2}>
                        <TabTitle ref={titleRefVegetables}> ירקות</TabTitle>

                        {data ? data.map((item, index) => (
                            <Product item={item} key={index} />
                        )) : null}
                        <PageWrapper>
                            <Page onClick={() => { handleClick("prev"); handleClickVegetables(); }}>חזור</Page>
                            <Page onClick={() => { handleClick("next"); handleClickVegetables(); }}>הבא</Page>
                        </PageWrapper>
                    </TabContent >
                    <TabContent hidden={indexCrop !== 3}>
                        <TabTitle ref={titleRefLeaves}>עלים</TabTitle>
                        {data ? data.map((item, index) => (
                            <Product item={item} key={index} />
                        )) : null}
                        <PageWrapper>
                            <Page onClick={() => { handleClick("prev"); handleClickLeaves(); }}>חזור</Page>
                            <Page onClick={() => { handleClick("next"); handleClickLeaves(); }}>הבא</Page>
                        </PageWrapper>
                    </TabContent>
                </TabContentWrapper>
            </ListProductWrapper>
        </Container>
    )
}

export default Home
