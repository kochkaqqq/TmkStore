import { Header } from '../components/Header/Header';
import { Title, Text, Group, Button, Paper, Stack, Divider, ActionIcon } from '@mantine/core';
import { useEffect, useState } from 'react';
import { CartItem } from '../utils/cart.types';
import { IconTrash } from '@tabler/icons-react';
import classes from './CartPage.module.css';

export function CartPage() {
    const [cartItems, setCartItems] = useState<CartItem[]>([]);

    useEffect(() => {
        loadCart();
    }, []);

    const loadCart = () => {
        try {
            const cartRaw = localStorage.getItem('cart');
            if (cartRaw) {
                setCartItems(JSON.parse(cartRaw));
            }
        } catch (error) {
            console.error('Ошибка чтения корзины из localStorage:', error);
        }
    };

    const removeItem = (id: string) => {
        const newCart = cartItems.filter((item) => item.id !== id);
        setCartItems(newCart);
        localStorage.setItem('cart', JSON.stringify(newCart));
    };

    const totalPrice = cartItems.reduce((acc, item) => acc + item.totalPrice, 0);
    const unitLabel = (unit: 'tons' | 'meters') => unit === 'tons' ? 'т' : 'м';

    return (
        <>
            <Header showCart={false} />
            <div className={classes.wrapper}>
                <Title order={1} className={classes.title}>
                    Корзина
                </Title>

                {cartItems.length === 0 ? (
                    <Text size="lg" c="dimmed" className={classes.emptyMessage}>
                        Ваша корзина пуста.
                    </Text>
                ) : (
                    <>
                        <Stack gap="md">
                            {cartItems.map((item) => (
                                <Paper key={item.id} p="md" withBorder>
                                    <Group justify="space-between" align="flex-start">
                                        <Stack gap="xs" style={{ flex: 1 }}>
                                            <Text fw={600} size="sm">{item.productName}</Text>

                                            <Group gap="md">
                                                <Text size="xs" c="dimmed">ГОСТ: {item.product.gost}</Text>
                                                <Text size="xs" c="dimmed">Марка: {item.product.steel_grade}</Text>
                                            </Group>

                                            <Group gap="md">
                                                <Text size="xs" c="dimmed">Диаметр: {item.product.diameter} мм</Text>
                                                <Text size="xs" c="dimmed">Толщина: {item.product.wall_thickness} мм</Text>
                                            </Group>

                                            <Text size="xs" c="dimmed">
                                                Склад: {item.stockName}
                                                {item.stockAddress && ` - ${item.stockAddress}`}
                                            </Text>

                                            <Divider my="xs" />

                                            <Group justify="space-between">
                                                <Text size="sm">
                                                    Количество: <strong>{item.quantity.toFixed(3)} {unitLabel(item.unit)}</strong>
                                                </Text>
                                                <Text size="sm">
                                                    Цена за {unitLabel(item.unit)}: <strong>{item.pricePerUnit.toLocaleString('ru-RU')} ₽</strong>
                                                </Text>
                                            </Group>

                                            {item.discount > 0 && (
                                                <Text size="xs" c="#ff5106">
                                                    Скидка: -{item.discount.toFixed(1)}%
                                                </Text>
                                            )}

                                            <Text size="lg" fw={700} c="#ff5106">
                                                Итого: {item.totalPrice.toLocaleString('ru-RU', { maximumFractionDigits: 2 })} ₽
                                            </Text>
                                        </Stack>

                                        <ActionIcon
                                            color="red"
                                            variant="subtle"
                                            onClick={() => removeItem(item.id)}
                                        >
                                            <IconTrash size={20} />
                                        </ActionIcon>
                                    </Group>
                                </Paper>
                            ))}
                        </Stack>

                        <Paper p="md" mt="xl" withBorder>
                            <Group justify="space-between">
                                <Text size="xl" fw={700}>Общая сумма:</Text>
                                <Text size="xl" fw={700} c="#ff5106">
                                    {totalPrice.toLocaleString('ru-RU', { maximumFractionDigits: 2 })} ₽
                                </Text>
                            </Group>
                        </Paper>

                        <Group justify="flex-end" mt="xl">
                            <Button
                                size="lg"
                                radius="xl"
                                color="#ff5106"
                                onClick={() => alert('Функция оформления заказа пока не реализована')}
                            >
                                Оформить заказ
                            </Button>
                        </Group>
                    </>
                )}
            </div>
        </>
    );
}