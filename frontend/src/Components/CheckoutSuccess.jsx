import React from 'react'
import  styled  from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { clearCart, getTotal } from '../Features/cartSlice';

const CheckoutSuccess = () => {
 const dispatch =  useDispatch()
 const cart = useSelector(state => state.cart)

 useEffect(() => {
   dispatch(clearCart())
 }, [dispatch])
 
 useEffect(() => {
  dispatch(getTotal())
}, [dispatch , cart])

  return (
    <Container>
      <h2>checkout Success</h2>
      <p>Your order might take some time to process</p>
      <p>chek your order status at your profile after about 10mins.</p>
      <p>Inces of any inqueries   contact the support at
        <strong>support@DukanStore.com</strong>
      </p>
    </Container>
  )
}

export default CheckoutSuccess


const Container = styled.div`
 width: 100%;
  max-width:  800px;
  margin: auto;
  min-height: 80vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  h2{
    margin-bottom: 0.5rem;
    color: #029e02
  }
`