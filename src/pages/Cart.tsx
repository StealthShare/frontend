import React from 'react';
import { EmptyCart } from '../components/pages/cart/EmptyCart/emptyCart';
import { PageContainer } from '../components/shared/containers/PageContainer';
import { Heading } from '../components/shared/Heading';
import { useCartContext } from '../provider/cart/CartContext';
import { useUserContext } from '../provider/user/UserContext';

export const Cart = () => {
  const { cartData } = useCartContext();

  return (
    <PageContainer>
      <Heading text={"Your shopping cart"}/>
      <>{cartData.length > 0 ? <></> : <EmptyCart />}</>
    </PageContainer>
  );
};
