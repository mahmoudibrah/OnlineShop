import React from 'react'
import { useParams } from 'react-router-dom';
import  styled  from 'styled-components';
import { useEffect } from 'react';
import  axios  from 'axios';
import { setHeadersAdmin, url } from './../../Features/api';
import { useState } from 'react';

export const Product = () => {
   const params  = useParams()

const [product, setProduct] = useState({})
const [loadind, setLoadind] = useState(false)
console.log(product);
    useEffect(() => {
        setLoadind(true)
        async function fetchData() {
            try {
           const res =  await axios.get(`${url}/products/find/${params.id}` , setHeadersAdmin())
           setProduct(res.data)
            } catch (error) {
                console.log(error);
            }
        setLoadind(false)
        }
        fetchData()
    }, [])
    

  return (
<>
<StyledProduct>
    <ProductContainer>
        {loadind? <p>Loading .........</p> : <>
        <ImageContainer>
            <img src={product.image?.url} alt={product.name} srcset="" />
        </ImageContainer>
        <ProductDetails>
           <h3>{product.name}</h3> 
<p><span>Brand: </span>{product.brand}</p>
<p><span>Description: </span>{product.desc}</p>
<Price>${product.price?.toLocaleString()}</Price>

        </ProductDetails>
        </>}
    </ProductContainer>
</StyledProduct>

</>
  )
}



const  StyledProduct = styled.div `
    display: flex;
    justify-content: center;
    margin: 3rem;
`

const ProductContainer = styled.div `
    max-width:  500px;
    width: 100%;
    height: auto;
    display: flex;
    padding: 2rem;
    border-radius: 5px;
    box-shadow: rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px;
`

const ImageContainer = styled.div`
    flex: 1;
    img {
        width: 100%;
    }
`
const ProductDetails = styled.div `
    flex: 2;
    margin-left: 2rem;
    h3 {
        font-size: 35px;
    }
    p span {
        font-weight: bold;
    }
`

const Price = styled.div `
    margin: 1rem 0 ;
    font-weight: bold;
    font-size: 25px;
`