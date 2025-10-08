import { Card, Text, Group, Button, Stack } from '@mantine/core';
import { useState } from 'react';
import { AddToCartModal } from '../AddToCartModal/AddToCartModal';
import { Product } from '../../utils/product.types';
import classes from './ProductCard.module.css';

interface ProductCardProps {
    product: Product; // Передаем весь продукт
    unit: 'tons' | 'meters';
    displayedPrice: number;
    displayedQuantity: number;
    inStock: boolean;
}

export function ProductCard({
    product,
    unit,
    displayedPrice,
    displayedQuantity,
    inStock,
}: ProductCardProps) {
    const [modalOpened, setModalOpened] = useState(false);
    const unitLabel = unit === 'tons' ? 'т' : 'м';
    
    return (
        <>
            <Card padding="md" className={classes.card}>
                <Stack>
                    <Text className={classes.titleLevel1}>{product.name}</Text>

                    <Group className={classes.titleLevel2Row}>
                        <Text>
                            <span className={classes.labelText}>НТД</span>
                            <span className={classes.valueText}>{product.gost}</span>
                        </Text>
                        <Text>
                            <span className={classes.labelText}>Толщина</span>
                            <span className={classes.valueText}>
                                {product.wall_thickness}
                                <span className={classes.unitText}> мм</span>
                            </span>
                        </Text>
                        <Text>
                            <span className={classes.labelText}>Размер</span>
                            <span className={classes.valueText}>
                                {product.diameter}
                                <span className={classes.unitText}> мм</span>
                            </span>
                        </Text>
                    </Group>

                    <Group className={classes.titleLevel3Row}>
                        <Text>
                            <span className={classes.labelText}>Марка стали</span>
                            <span className={classes.valueText}>{product.steel_grade}</span>
                        </Text>
                        <Text>
                            <span className={classes.labelText}>Завод</span>
                            <span className={classes.valueText}>{product.manufacturer}</span>
                        </Text>
                    </Group>

                    <Group className={classes.titleLevel4Row}>
                        <Text className={inStock ? classes.inStock : classes.outOfStock}>
                            {inStock ? `В НАЛИЧИИ: ${displayedQuantity.toFixed(2)} ${unitLabel}` : 'НЕТ В НАЛИЧИИ'}
                        </Text>

                        <Text className={classes.titleLevel5}>
                            <span className={classes.labelText}>Цена с НДС</span>
                            {' '}
                            <span className={classes.priceText}>
                                {displayedPrice.toLocaleString('ru-RU', { maximumFractionDigits: 2 })}
                            </span>
                            <span className={classes.unitText}> ₽/{unitLabel}</span>
                        </Text>
                    </Group>

                    <Group className={classes.buttonsGroup}>
                        <Button 
                            variant="outline" 
                            size="xs" 
                            onClick={() => setModalOpened(true)}
                            className={classes.buttonOval}
                            disabled={!inStock}
                        >
                            В корзину
                        </Button>
                    </Group>
                </Stack>
            </Card>

            <AddToCartModal 
                opened={modalOpened}
                onClose={() => setModalOpened(false)}
                product={product}
            />
        </>
    );
}