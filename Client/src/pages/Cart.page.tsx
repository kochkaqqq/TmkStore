import { Header } from '../components/Header/Header';
import { Title, Text, Group, Paper, Stack, Divider, ActionIcon } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { modals } from '@mantine/modals';
import { useEffect, useState } from 'react';
import { CartItem } from '../utils/cart.types';
import { IconTrash, IconCheck, IconX } from '@tabler/icons-react';
import { mainButton } from '@telegram-apps/sdk';
import { useNavigate } from 'react-router-dom';
import classes from './CartPage.module.css';

export function CartPage() {
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        loadCart();
    }, []);

    // Настройка главной кнопки Telegram
    useEffect(() => {
        if (!mainButton) {
            console.warn('MainButton не инициализирован');
            return;
        }

        if (cartItems.length > 0) {
            try {
                if (mainButton.mount && mainButton.mount.isAvailable && mainButton.mount.isAvailable()) {
                    mainButton.mount();
                }

                if (mainButton.setParams && mainButton.setParams.isAvailable && mainButton.setParams.isAvailable()) {
                    mainButton.setParams({
                        text: 'Оформить заказ',
                        isVisible: true,
                        isEnabled: true,
                        backgroundColor: '#ff5106',
                        textColor: '#ffffff',
                    });
                }

                const handleMainButtonClick = () => {
                    handleOrderConfirmation();
                };

                if (mainButton.onClick) {
                    mainButton.onClick(handleMainButtonClick);
                }

                return () => {
                    if (mainButton.offClick) {
                        mainButton.offClick(handleMainButtonClick);
                    }
                    if (mainButton.setParams && mainButton.setParams.isAvailable && mainButton.setParams.isAvailable()) {
                        mainButton.setParams({
                            isVisible: false
                        });
                    }
                };
            } catch (error) {
                console.error('Ошибка при настройке MainButton:', error);
            }
        } else {
            try {
                if (mainButton.setParams && mainButton.setParams.isAvailable && mainButton.setParams.isAvailable()) {
                    mainButton.setParams({
                        isVisible: false
                    });
                }
            } catch (error) {
                console.error('Ошибка при скрытии MainButton:', error);
            }
        }
    }, [cartItems]);

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

    const handleOrderConfirmation = () => {
        // Используем Mantine модальное окно вместо нативного popup
        modals.openConfirmModal({
            title: 'Оформление заказа',
            children: (
                <Text size="sm">
                    Вы действительно хотите оформить заказ?
                </Text>
            ),
            labels: { confirm: 'Да, оформить', cancel: 'Отмена' },
            confirmProps: { color: '#ff5106' },
            onConfirm: () => placeOrder(),
        });
    };

    const placeOrder = async () => {
        try {
            console.log('Оформление заказа:', cartItems);

            // Скрываем главную кнопку
            if (mainButton && mainButton.setParams && mainButton.setParams.isAvailable && mainButton.setParams.isAvailable()) {
                mainButton.setParams({
                    isVisible: false
                });
            }

            // Показываем уведомление с кастомным цветом
            notifications.show({
                title: 'Заказ оформлен!',
                message: 'Ваш заказ успешно оформлен. Скоро с вами свяжется менеджер для уточнения деталей.',
                color: '#ff5106',
                icon: <IconCheck size={18} />,
                autoClose: 5000,
            });

            // Очищаем корзину
            setCartItems([]);
            localStorage.removeItem('cart');

            // Перенаправляем на главную страницу через 2 секунды
            setTimeout(() => {
                navigate('/');
            }, 2000);
        } catch (error) {
            console.error('Ошибка при оформлении заказа:', error);

            notifications.show({
                title: 'Ошибка',
                message: 'Произошла ошибка при оформлении заказа. Попробуйте еще раз.',
                color: 'red',
                icon: <IconX size={18} />,
                autoClose: 5000,
            });
        }
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
                    <div style={{ width: '100%' }}>
                        {/* Карточки товаров в grid */}
                        <div className={classes.cardsGrid}>
                            {cartItems.map((item) => (
                                <Paper key={item.id} p="md" withBorder className={classes.cartCard}>
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
                        </div>

                        {/* Горизонтальная линия */}
                        <Divider my="xl" size="md" style={{ width: '100%' }} />

                        {/* Общая сумма - прилегает к левому краю */}
                        <div style={{ width: '100%', paddingLeft: '0' }}>
                            <Group gap="md" style={{ justifyContent: 'flex-start' }}>
                                <Text size="xl" fw={700}>Общая сумма:</Text>
                                <Text size="xl" fw={700} c="#ff5106">
                                    {totalPrice.toLocaleString('ru-RU', { maximumFractionDigits: 2 })} ₽
                                </Text>
                            </Group>
                        </div>

                        {/* Отступ для главной кнопки Telegram */}
                        <div style={{ height: '80px' }} />
                    </div>
                )}
            </div>
        </>
    );
}
