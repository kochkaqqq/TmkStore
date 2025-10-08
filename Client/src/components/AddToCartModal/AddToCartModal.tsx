import { Modal, Stack, Text, NumberInput, Select, Button, Group, Divider, Paper } from '@mantine/core';
import { useState, useMemo, useEffect } from 'react';
import { Product } from '../../utils/product.types';
import { useFilters } from '../../context/FilterContext';

interface AddToCartModalProps {
    opened: boolean;
    onClose: () => void;
    product: Product;
}

export function AddToCartModal({ opened, onClose, product }: AddToCartModalProps) {
    const { filters } = useFilters();
    const [selectedStock, setSelectedStock] = useState<string>('');
    const [quantity, setQuantity] = useState<number>(0);

    // Получаем выбранную доступность
    const selectedAvailability = useMemo(() => {
        return product.availability.find(avail => avail.stock.id === selectedStock);
    }, [selectedStock, product.availability]);

    // Единица измерения
    const unit = filters.unit;
    const unitLabel = unit === 'tons' ? 'т' : 'м';

    // Максимальное количество на складе
    const maxQuantity = useMemo(() => {
        if (!selectedAvailability) return 0;
        return unit === 'tons'
            ? selectedAvailability.in_stock_tons
            : selectedAvailability.in_stock_meters;
    }, [selectedAvailability, unit]);

    // Минимальный шаг (на основе средней трубы)
    const minStep = useMemo(() => {
        if (!selectedAvailability) return 0.01;
        return unit === 'tons'
            ? selectedAvailability.avg_tube_weight
            : selectedAvailability.avg_tube_length;
    }, [selectedAvailability, unit]);

    // Расчет цены с учетом скидок
    const calculatePrice = useMemo(() => {
        if (!selectedAvailability || quantity <= 0) {
            return {
                basePrice: 0,
                discountedPrice: 0,
                totalWithoutVat: 0,
                vat: 0,
                totalWithVat: 0,
                discount: 0
            };
        }

        const pricing = selectedAvailability.pricing;
        const discounts = unit === 'tons' ? pricing.ton_discounts : pricing.meter_discounts;
        const basePrice = unit === 'tons' ? pricing.price_per_ton : pricing.price_per_meter;

        // Найти подходящую скидку
        let discountedPrice = basePrice;
        for (let i = discounts.length - 1; i >= 0; i--) {
            if (quantity >= discounts[i].min_quantity) {
                discountedPrice = discounts[i].price;
                break;
            }
        }

        const totalWithoutVat = discountedPrice * quantity;
        const vat = totalWithoutVat * (pricing.vat_rate / 100);
        const totalWithVat = totalWithoutVat + vat;
        const discount = ((basePrice - discountedPrice) / basePrice) * 100;

        return {
            basePrice,
            discountedPrice,
            totalWithoutVat,
            vat,
            totalWithVat,
            discount
        };
    }, [selectedAvailability, quantity, unit]);

    // Инициализация первого склада
    useEffect(() => {
        if (opened && product.availability.length > 0 && !selectedStock) {
            setSelectedStock(product.availability[0].stock.id);
        }
    }, [opened, product.availability, selectedStock]);

    // Сброс количества при смене склада или единицы
    useEffect(() => {
        setQuantity(0);
    }, [selectedStock, unit]);

    const handleAddToCart = () => {
        if (!selectedAvailability || quantity <= 0) return;

        const cartItem = {
            productId: product.id,
            productName: product.name,
            stockId: selectedStock,
            stockName: selectedAvailability.stock.city,
            quantity,
            unit,
            pricePerUnit: calculatePrice.discountedPrice,
            totalPrice: calculatePrice.totalWithVat,
            discount: calculatePrice.discount
        };

        console.log('Добавление в корзину:', cartItem);
        // Здесь добавить в контекст корзины или отправить на сервер

        onClose();
    };

    return (
        <Modal
            opened={opened}
            onClose={onClose}
            title="Добавить в корзину"
            size="lg"
            centered
        >
            <Stack gap="md">
                {/* Информация о продукте */}
                <Paper p="sm" withBorder>
                    <Text size="sm" fw={600}>{product.name}</Text>
                    <Group gap="xs" mt="xs">
                        <Text size="xs" c="dimmed">ГОСТ: {product.gost}</Text>
                        <Text size="xs" c="dimmed">Марка: {product.steel_grade}</Text>
                    </Group>
                </Paper>

                {/* Выбор склада */}
                <Select
                    label="Склад"
                    placeholder="Выберите склад"
                    value={selectedStock}
                    onChange={(value) => setSelectedStock(value || '')}
                    data={product.availability.map(avail => ({
                        value: avail.stock.id,
                        label: `${avail.stock.city} - ${avail.stock.address || 'адрес не указан'}`
                    }))}
                    required
                />

                {/* Информация о наличии */}
                {selectedAvailability && (
                    <Paper p="sm" withBorder>
                        <Group justify="space-between">
                            <Text size="sm">В наличии:</Text>
                            <Text size="sm" fw={600}>
                                {maxQuantity.toFixed(2)} {unitLabel}
                            </Text>
                        </Group>
                        <Group justify="space-between" mt="xs">
                            <Text size="xs" c="dimmed">Средняя длина трубы:</Text>
                            <Text size="xs">{selectedAvailability.avg_tube_length.toFixed(2)} м</Text>
                        </Group>
                        <Group justify="space-between">
                            <Text size="xs" c="dimmed">Средний вес трубы:</Text>
                            <Text size="xs">{selectedAvailability.avg_tube_weight.toFixed(3)} т</Text>
                        </Group>
                    </Paper>
                )}

                {/* Ввод количества */}
                <NumberInput
                    label={`Количество (${unitLabel})`}
                    placeholder={`Введите количество в ${unitLabel === 'т' ? 'тоннах' : 'метрах'}`}
                    value={quantity}
                    onChange={(value) => setQuantity(Number(value) || 0)}
                    min={0}
                    max={maxQuantity}
                    step={minStep}
                    decimalScale={3}
                    required
                    description={`Минимальный шаг: ${minStep.toFixed(3)} ${unitLabel} (одна труба)`}
                />

                {/* Расчет цены */}
                {quantity > 0 && selectedAvailability && (
                    <>
                        <Divider />
                        <Paper p="sm" withBorder>
                            <Stack gap="xs">
                                <Group justify="space-between">
                                    <Text size="sm">Базовая цена:</Text>
                                    <Text size="sm">
                                        {calculatePrice.basePrice.toLocaleString('ru-RU')} ₽/{unitLabel}
                                    </Text>
                                </Group>

                                {calculatePrice.discount > 0 && (
                                    <Group justify="space-between">
                                        <Text size="sm" c="#ff5106">Скидка:</Text>
                                        <Text size="sm" c="#ff5106" fw={600}>
                                            -{calculatePrice.discount.toFixed(1)}%
                                        </Text>
                                    </Group>
                                )}

                                <Group justify="space-between">
                                    <Text size="sm" fw={600}>Цена со скидкой:</Text>
                                    <Text size="sm" fw={600}>
                                        {calculatePrice.discountedPrice.toLocaleString('ru-RU')} ₽/{unitLabel}
                                    </Text>
                                </Group>

                                <Divider />

                                <Group justify="space-between">
                                    <Text size="sm">Сумма без НДС:</Text>
                                    <Text size="sm">
                                        {calculatePrice.totalWithoutVat.toLocaleString('ru-RU', {
                                            maximumFractionDigits: 2
                                        })} ₽
                                    </Text>
                                </Group>

                                <Group justify="space-between">
                                    <Text size="sm">НДС (20%):</Text>
                                    <Text size="sm">
                                        {calculatePrice.vat.toLocaleString('ru-RU', {
                                            maximumFractionDigits: 2
                                        })} ₽
                                    </Text>
                                </Group>

                                <Divider />

                                <Group justify="space-between">
                                    <Text size="lg" fw={700}>Итого с НДС:</Text>
                                    <Text size="lg" fw={700} c="#ff5106">
                                        {calculatePrice.totalWithVat.toLocaleString('ru-RU', {
                                            maximumFractionDigits: 2
                                        })} ₽
                                    </Text>
                                </Group>
                            </Stack>
                        </Paper>
                    </>
                )}

                {/* Кнопки */}
                <Group justify="flex-end" mt="md">
                    <Button variant="subtle" onClick={onClose} color="#ff5106">
                        Отмена
                    </Button>
                    <Button
                        onClick={handleAddToCart}
                        color="#ff5106"
                        disabled={!selectedStock || quantity <= 0 || quantity > maxQuantity}
                    >
                        Добавить в корзину
                    </Button>
                </Group>
            </Stack>
        </Modal>
    );
}