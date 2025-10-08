import { Header } from '../components/Header/Header';
import { Title, Text, Group, Button } from '@mantine/core';
import { useEffect, useState } from 'react';
import { ProductCard, ProductCardProps } from '../components/ProductCard/ProductCard';
import classes from './CartPage.module.css';

export function CartPage() {
  const [cartItems, setCartItems] = useState<ProductCardProps[]>([]);

  useEffect(() => {
    try {
      const cartRaw = localStorage.getItem('cart');
      if (cartRaw) {
        setCartItems(JSON.parse(cartRaw));
      }
    } catch (error) {
      console.error('Ошибка чтения корзины из localStorage:', error);
    }
  }, []);

  const removeItem = (id: string) => {
    const newCart = cartItems.filter((item) => item.id !== id);
    setCartItems(newCart);
    localStorage.setItem('cart', JSON.stringify(newCart));
  };

  const totalPrice = cartItems.reduce((acc, item) => acc + item.priceWithVat, 0);

  return (
    <>
      <Header showCart={false} />
      <div className={classes.wrapper}>
        <Title order={1} className={classes.title}>
          Корзина
        </Title>

        {cartItems.length === 0 ? (
          <Text size="lg" color="dimmed" className={classes.emptyMessage}>
            Ваша корзина пуста.
          </Text>
        ) : (
          <>
            {cartItems.map((item) => (
              <div key={item.id} className={classes.cardWrapper}>
                <div className={classes.productCardInner}>
                  <ProductCard
                    {...item}
                    showAddToCartButton={false}
                    onDelete={() => removeItem(item.id)}
                  />
                  <div className={classes.productCardFooter}>
                    <Group mt="xs" justify="apart">
                      <Text size="md" className={classes.priceText}>
                        {item.priceWithVat.toLocaleString('ru-RU')} ₽
                      </Text>
                    </Group>
                  </div>
                </div>
              </div>
            ))}

            <div className={classes.totalWrapper}>
              <Text>Итого:</Text>
              <Text>{totalPrice.toLocaleString('ru-RU')} ₽</Text>
            </div>

            <div className={classes.orderButtonWrapper}>
              <Button
                size="md"
                radius="xl"
                className={classes.orderButton}
                onClick={() => alert('Функция оформления заказа пока не реализована')}
              >
                Оформить заказ
              </Button>
            </div>
          </>
        )}
      </div>
    </>
  );
}
