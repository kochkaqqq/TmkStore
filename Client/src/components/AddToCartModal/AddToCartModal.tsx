import { Modal, Stack, Text, NumberInput, Select, Button, Group, Divider, Paper, Alert } from '@mantine/core';
import { useState, useMemo, useEffect } from 'react';
import { Product } from '../../utils/product.types';
import { CartItem } from '../../utils/cart.types';
import { useFilters } from '../../context/FilterContext';
import { IconAlertCircle } from '@tabler/icons-react';

interface AddToCartModalProps {
    opened: boolean;
    onClose: () => void;
    product: Product;
}

export function AddToCartModal({ opened, onClose, product }: AddToCartModalProps) {
    const { filters } = useFilters();
    const [selectedStock, setSelectedStock] = useState<string>('');
    const [quantity, setQuantity] = useState<number | ''>('');
    const [inputError, setInputError] = useState<string>('');

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

    // Минимальный шаг
    const minStep = useMemo(() => {
        if (!selectedAvailability) return 0.01;
        return unit === 'tons'
            ? selectedAvailability.avg_tube_weight
            : selectedAvailability.avg_tube_length;
    }, [selectedAvailability, unit]);

    const roundToStep = (value: number, step: number): number => {
        if (step === 0) return value;
        return Math.round(value / step) * step;
    };

    const isValidQuantity = useMemo(() => {
        if (quantity === '' || quantity === 0 || quantity <= 0) return false;
        const numQuantity = Number(quantity);
        if (numQuantity > maxQuantity) return false;
        const remainder = Math.abs((numQuantity % minStep) / minStep);
        const isMultiple = remainder < 0.001 || remainder > 0.999;
        return isMultiple;
    }, [quantity, maxQuantity, minStep]);

    const calculatePrice = useMemo(() => {
        if (!selectedAvailability || !isValidQuantity || quantity === '' || quantity === 0) {
            return {
                basePrice: 0,
                discountedPrice: 0,
                totalWithoutVat: 0,
                vat: 0,
                totalWithVat: 0,
                discount: 0
            };
        }

        const numQuantity = Number(quantity);
        const pricing = selectedAvailability.pricing;
        const discounts = unit === 'tons' ? pricing.ton_discounts : pricing.meter_discounts;
        const basePrice = unit === 'tons' ? pricing.price_per_ton : pricing.price_per_meter;

        let discountedPrice = basePrice;
        for (let i = discounts.length - 1; i >= 0; i--) {
            if (numQuantity >= discounts[i].min_quantity) {
                discountedPrice = discounts[i].price;
                break;
            }
        }

        const totalWithoutVat = discountedPrice * numQuantity;
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
    }, [selectedAvailability, quantity, unit, isValidQuantity]);

    useEffect(() => {
        if (opened && product.availability.length > 0 && !selectedStock) {
            setSelectedStock(product.availability[0].stock.id);
        }
    }, [opened, product.availability, selectedStock]);

    useEffect(() => {
        setQuantity('');
        setInputError('');
    }, [selectedStock, unit]);

    const handleQuantityChange = (value: number | string) => {
        if (value === '' || value === undefined) {
            setQuantity('');
            setInputError('');
            return;
        }

        const numValue = Number(value);
        if (isNaN(numValue)) {
            setQuantity('');
            setInputError('');
            return;
        }

        setQuantity(numValue);

        if (numValue <= 0) {
            setInputError('');
            return;
        }

        if (numValue > maxQuantity) {
            setInputError(`Превышено доступное количество (${maxQuantity.toFixed(3)} ${unitLabel})`);
            return;
        }

        const remainder = Math.abs((numValue % minStep) / minStep);
        const isMultiple = remainder < 0.001 || remainder > 0.999;

        if (!isMultiple) {
            const nearest = roundToStep(numValue, minStep);
            setInputError(
                `Количество должно быть кратно ${minStep.toFixed(3)} ${unitLabel}. Ближайшее значение: ${nearest.toFixed(3)} ${unitLabel}`
            );
        } else {
            setInputError('');
        }
    };

    const handleFixQuantity = () => {
        const numQuantity = Number(quantity) || 0;
        const fixed = roundToStep(numQuantity, minStep);
        setQuantity(Math.min(fixed, maxQuantity));
        setInputError('');
    };

    const handleAddToCart = () => {
        if (!selectedAvailability || !isValidQuantity || quantity === '' || quantity === 0) return;

        const cartItem: CartItem = {
            id: `${product.id}-${selectedStock}-${Date.now()}`, // Уникальный ID
            productId: product.id,
            productName: product.name,
            stockId: selectedStock,
            stockName: selectedAvailability.stock.city,
            stockAddress: selectedAvailability.stock.address || '',
            quantity: Number(quantity),
            unit,
            pricePerUnit: calculatePrice.discountedPrice,
            totalPrice: calculatePrice.totalWithVat,
            discount: calculatePrice.discount,
            product: {
                gost: product.gost,
                steel_grade: product.steel_grade,
                diameter: product.diameter,
                wall_thickness: product.wall_thickness,
                manufacturer: product.manufacturer
            }
        };

        // Получаем корзину из localStorage
        try {
            const cartRaw = localStorage.getItem('cart');
            const cart: CartItem[] = cartRaw ? JSON.parse(cartRaw) : [];
            
            // Добавляем новый товар
            cart.push(cartItem);
            
            // Сохраняем обратно
            localStorage.setItem('cart', JSON.stringify(cart));
            
            console.log('Товар добавлен в корзину:', cartItem);
            
            onClose();
        } catch (error) {
            console.error('Ошибка при добавлении в корзину:', error);
        }
    };

    return (
        <Modal
            opened={opened}
            onClose={onClose}
            title="Добавить в корзину"
            size="lg"
            centered
        >
            {/* Остальной код без изменений */}
            <Stack gap="md">
                <Paper p="sm" withBorder>
                    <Text size="sm" fw={600}>{product.name}</Text>
                    <Group gap="xs" mt="xs">
                        <Text size="xs" c="dimmed">ГОСТ: {product.gost}</Text>
                        <Text size="xs" c="dimmed">Марка: {product.steel_grade}</Text>
                    </Group>
                </Paper>

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

                {selectedAvailability && (
                    <Paper p="sm" withBorder>
                        <Group justify="space-between">
                            <Text size="sm">В наличии:</Text>
                            <Text size="sm" fw={600}>
                                {maxQuantity.toFixed(3)} {unitLabel}
                            </Text>
                        </Group>
                        <Group justify="space-between" mt="xs">
                            <Text size="xs" c="dimmed">Средняя длина трубы:</Text>
                            <Text size="xs">{selectedAvailability.avg_tube_length.toFixed(3)} м</Text>
                        </Group>
                        <Group justify="space-between">
                            <Text size="xs" c="dimmed">Средний вес трубы:</Text>
                            <Text size="xs">{selectedAvailability.avg_tube_weight.toFixed(3)} т</Text>
                        </Group>
                    </Paper>
                )}

                <NumberInput
                    label={`Количество (${unitLabel})`}
                    placeholder={`Кратно ${minStep.toFixed(3)} ${unitLabel}`}
                    value={quantity}
                    onChange={handleQuantityChange}
                    min={0}
                    max={maxQuantity}
                    step={minStep}
                    decimalScale={3}
                    required
                    error={inputError}
                    description={`Шаг: ${minStep.toFixed(3)} ${unitLabel} (одна труба). Максимум: ${maxQuantity.toFixed(3)} ${unitLabel}`}
                />

                {inputError && quantity !== '' && quantity !== 0 && (
                    <>
                        <Button
                            variant="light"
                            color="#ff5106"
                            size="xs"
                            onClick={handleFixQuantity}
                        >
                            Округлить до {roundToStep(Number(quantity) || 0, minStep).toFixed(3)} {unitLabel}
                        </Button>
                        <Alert icon={<IconAlertCircle size={16} />} color="orange" variant="light">
                            {inputError}
                        </Alert>
                    </>
                )}

                {quantity !== '' && quantity !== 0 && selectedAvailability && isValidQuantity && (
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

                <Group justify="flex-end" mt="md">
                    <Button variant="subtle" onClick={onClose} color="#ff5106">
                        Отмена
                    </Button>
                    <Button
                        onClick={handleAddToCart}
                        color="#ff5106"
                        disabled={!selectedStock || !isValidQuantity || !!inputError}
                    >
                        Добавить в корзину
                    </Button>
                </Group>
            </Stack>
        </Modal>
    );
}