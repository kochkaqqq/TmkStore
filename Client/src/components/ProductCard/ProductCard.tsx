import { Card, Text, Group, Button, Stack } from '@mantine/core';
import classes from './ProductCard.module.css';

interface ProductCardProps {
    id: string;
    description: string;
    ntd: string;
    thickness: string;
    size: string;
    steelGrade: string;
    factory: string;
    inStock: boolean;
    priceWithVat: number;
    stockQuantity: number; // Добавлено: количество на складе
    unit: 'tons' | 'meters'; // Добавлено: единица измерения
}

export function ProductCard({
    id,
    description,
    ntd,
    thickness,
    size,
    steelGrade,
    factory,
    inStock,
    priceWithVat,
    stockQuantity,
    unit,
}: ProductCardProps) {
    const unitLabel = unit === 'tons' ? 'т' : 'м';
    
    return (
        <Card padding="md" className={classes.card}>
            <Stack>
                <Text className={classes.titleLevel1}>{description}</Text>

                <Group className={classes.titleLevel2Row}>
                    <Text>
                        <span className={classes.labelText}>НТД</span>
                        <span className={classes.valueText}>{ntd}</span>
                    </Text>
                    <Text>
                        <span className={classes.labelText}>Толщина</span>
                        <span className={classes.valueText}>
                            {thickness.split(' ')[0]}
                            <span className={classes.unitText}> {thickness.split(' ')[1]}</span>
                        </span>
                    </Text>
                    <Text>
                        <span className={classes.labelText}>Размер</span>
                        <span className={classes.valueText}>
                            {size.split(' ')[0]}
                            <span className={classes.unitText}> {size.split(' ')[1]}</span>
                        </span>
                    </Text>
                </Group>

                <Group className={classes.titleLevel3Row}>
                    <Text>
                        <span className={classes.labelText}>Марка стали</span>
                        <span className={classes.valueText}>{steelGrade}</span>
                    </Text>
                    <Text>
                        <span className={classes.labelText}>Завод</span>
                        <span className={classes.valueText}>{factory}</span>
                    </Text>
                </Group>

                <Group className={classes.titleLevel4Row}>
                    <Text className={inStock ? classes.inStock : classes.outOfStock}>
                        {inStock ? `В НАЛИЧИИ: ${stockQuantity.toFixed(2)} ${unitLabel}` : 'НЕТ В НАЛИЧИИ'}
                    </Text>

                    <Text className={classes.titleLevel5}>
                        <span className={classes.labelText}>Цена с НДС</span>
                        {' '}
                        <span className={classes.priceText}>
                            {priceWithVat.toLocaleString('ru-RU', { maximumFractionDigits: 2 })}
                        </span>
                        <span className={classes.unitText}> ₽/{unitLabel}</span>
                    </Text>
                </Group>

                <Group className={classes.buttonsGroup}>
                    <Button 
                        variant="outline" 
                        size="xs" 
                        onClick={() => console.log('Add to cart ' + id)} 
                        className={classes.buttonOval}
                        disabled={!inStock}
                    >
                        В корзину
                    </Button>
                </Group>
            </Stack>
        </Card>
    );
}