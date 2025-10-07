import { Card, Text, Group, Button, Stack } from '@mantine/core';
import classes from './ProductCard.module.css';

interface ProductCardProps {
  description: string;
  ntd: string;
  thickness: string; // например "5 мм"
  size: string;
  steelGrade: string;
  factory: string;
  inStock: boolean;
  priceWithVat: number; // число без единиц
  onAddToCart: () => void;
  onDetails: () => void;
}

export function ProductCard({
  description,
  ntd,
  thickness,
  size,
  steelGrade,
  factory,
  inStock,
  priceWithVat,
  onAddToCart,
  onDetails,
}: ProductCardProps) {
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
              {inStock ? 'В НАЛИЧИИ' : 'НЕТ В НАЛИЧИИ'}
            </Text>

            <Text className={classes.titleLevel5}>
              <span className={classes.labelText}>Цена с НДС</span> 
              {' '}
              <span className={classes.priceText}>{priceWithVat.toFixed(2)}</span>
              <span className={classes.unitText}>₽/т</span>
            </Text>
        </Group>

        <Group className={classes.buttonsGroup}>
          <Button variant="outline" size="xs" onClick={onAddToCart} className={classes.buttonOval}>
            В корзину
          </Button>
          <Button variant="outline" size="xs" onClick={onDetails} className={classes.buttonOval}>
            Детали
          </Button>
        </Group>
      </Stack>
    </Card>
  );
}
