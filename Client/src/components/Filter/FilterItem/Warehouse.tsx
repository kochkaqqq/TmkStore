import {
    Button,
    Drawer,
    Text,
    useComputedColorScheme,
    Stack,
    Checkbox,
    useMantineTheme,
    Box,
    Group,
    Space,
    Collapse,
    Badge
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useState, useEffect, useMemo } from 'react';
import { useFilters } from '../../../context/FilterContext';
import { useProducts } from '../../../context/ProductContext';
import { Stock } from '../../../utils/product.types';

export function Warehouse() {
    const [opened, { open, close }] = useDisclosure(false);
    const colorScheme = useComputedColorScheme();
    const [warehouses, setWarehouses] = useState<Stock[]>([]);
    const [expandedIds, setExpandedIds] = useState<string[]>([]);
    const { filters, updateFilter } = useFilters();
    const { products, loading } = useProducts();
    const theme = useMantineTheme();

    // Локальный state для временных изменений
    const [tempStockIds, setTempStockIds] = useState<string[]>([]);
    const [tempStockNames, setTempStockNames] = useState<string[]>([]);
    const [tempExpandedIds, setTempExpandedIds] = useState<string[]>([]);

    // Проверяем, выбран ли хотя бы один фильтр (из глобального состояния)
    const isFilterActive = filters.stock_ids.length > 0;

    // Извлекаем уникальные склады из загруженных данных
    const uniqueWarehouses = useMemo(() => {
        const warehousesMap = new Map<string, Stock>();

        products.forEach(product => {
            product.availability.forEach(avail => {
                if (avail.stock && avail.stock.id) {
                    warehousesMap.set(avail.stock.id, avail.stock);
                }
            });
        });

        return Array.from(warehousesMap.values()).sort((a, b) => a.city.localeCompare(b.city));
    }, [products]);

    // Обновляем список складов при открытии drawer
    useEffect(() => {
        if (opened && uniqueWarehouses.length > 0) {
            setWarehouses(uniqueWarehouses);
        }
    }, [opened, uniqueWarehouses]);

    // Инициализируем временное состояние при открытии drawer
    useEffect(() => {
        if (opened) {
            setTempStockIds([...filters.stock_ids]);
            setTempStockNames([...filters.stock_names]);
            setTempExpandedIds([...filters.stock_ids]); // Раскрываем выбранные
        }
    }, [opened, filters.stock_ids, filters.stock_names]);

    // Функция для форматирования лейбла
    const formatLabel = (warehouse: Stock): string => {
        if (warehouse.address) {
            return `${warehouse.city} (${warehouse.address})`;
        }
        return warehouse.city;
    };

    const handleCheckboxChange = (stockId: string, checked: boolean) => {
        const warehouse = warehouses.find(w => w.id === stockId);
        if (!warehouse) return;

        let newStockIds: string[];
        let newStockNames: string[];
        let newExpandedIds: string[];

        if (checked) {
            newStockIds = [...tempStockIds, stockId];
            newStockNames = [...tempStockNames, formatLabel(warehouse)];
            newExpandedIds = [...tempExpandedIds, stockId];
        } else {
            newStockIds = tempStockIds.filter(id => id !== stockId);
            newStockNames = tempStockNames.filter(name => name !== formatLabel(warehouse));
            newExpandedIds = tempExpandedIds.filter(id => id !== stockId);
        }

        setTempStockIds(newStockIds);
        setTempStockNames(newStockNames);
        setTempExpandedIds(newExpandedIds);
    };

    const toggleExpand = (stockId: string) => {
        if (tempExpandedIds.includes(stockId)) {
            setTempExpandedIds(tempExpandedIds.filter(id => id !== stockId));
        } else {
            setTempExpandedIds([...tempExpandedIds, stockId]);
        }
    };

    const handleApply = () => {
        updateFilter('stock_ids', tempStockIds);
        updateFilter('stock_names', tempStockNames);
        setExpandedIds(tempExpandedIds);
        close();
    };

    const handleReset = () => {
        setTempStockIds([]);
        setTempStockNames([]);
        setTempExpandedIds([]);
    };

    const handleCancel = () => {
        setTempStockIds([...filters.stock_ids]);
        setTempStockNames([...filters.stock_names]);
        setTempExpandedIds([...expandedIds]);
        close();
    };

    return (
        <>
            <Button
                variant="filled"
                radius="xl"
                onClick={open}
                style={(theme) => ({
                    backgroundColor: isFilterActive
                        ? theme.other.contrast
                        : (colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[2]),
                    color: isFilterActive
                        ? theme.other.onContrast
                        : (colorScheme === 'dark' ? theme.colors.gray[0] : theme.colors.dark[9]),
                })}
            >
                <Text fw={100} px="md" style={{ letterSpacing: '1px' }}>
                    Склад {isFilterActive && `(${filters.stock_ids.length})`}
                </Text>
            </Button>

            <Drawer
                opened={opened}
                onClose={handleCancel}
                title="Склад"
                position="right"
                size="md"
            >
                <Box style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                    <Box style={{ flex: 1, overflowY: 'auto' }}>
                        {loading ? (
                            <Text>Загрузка...</Text>
                        ) : (
                            <Stack gap="md">
                                {warehouses.map((warehouse) => (
                                    <Box key={warehouse.id}>
                                        <Group justify="space-between" wrap="nowrap">
                                            <Checkbox
                                                checked={tempStockIds.includes(warehouse.id)}
                                                onChange={(event) => handleCheckboxChange(warehouse.id, event.currentTarget.checked)}
                                                label={formatLabel(warehouse)}
                                                color={theme.other.contrast}
                                                style={{ flex: 1 }}
                                            />
                                            <Button
                                                variant="subtle"
                                                size="xs"
                                                color={theme.other.contrast}
                                                onClick={() => toggleExpand(warehouse.id)}
                                            >
                                                {tempExpandedIds.includes(warehouse.id) ? '▲' : '▼'}
                                            </Button>
                                        </Group>
                                        <Collapse in={tempExpandedIds.includes(warehouse.id)}>
                                            <Box
                                                mt="xs"
                                                ml="lg"
                                                p="sm"
                                                style={{
                                                    borderLeft: `2px solid ${theme.other.contrast}`,
                                                    backgroundColor: colorScheme === 'dark'
                                                        ? theme.colors.dark[6]
                                                        : theme.colors.gray[0]
                                                }}
                                            >
                                                <Stack gap="xs">
                                                    <Text size="sm" fw={500}>График работы:</Text>
                                                    <Text size="sm" c="dimmed">{warehouse.schedule}</Text>

                                                    <Text size="sm" fw={500} mt="xs">Способы оплаты:</Text>
                                                    <Group gap="xs">
                                                        {warehouse.cash_payment && (
                                                            <Badge color="green" variant="light" size="sm">
                                                                Наличные
                                                            </Badge>
                                                        )}
                                                        {warehouse.card_payment && (
                                                            <Badge color="blue" variant="light" size="sm">
                                                                Карта
                                                            </Badge>
                                                        )}
                                                    </Group>
                                                </Stack>
                                            </Box>
                                        </Collapse>
                                    </Box>
                                ))}
                            </Stack>
                        )}
                    </Box>
                    <Space h="md"></Space>
                    <Box pt="md" style={{ borderTop: `1px solid ${colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[3]}` }}>
                        <Group justify="flex-end" gap="sm">
                            <Button
                                variant="outline"
                                color={theme.other.contrast}
                                onClick={handleReset}
                            >
                                Сбросить
                            </Button>
                            <Button
                                color={theme.other.contrast}
                                onClick={handleApply}
                            >
                                Применить
                            </Button>
                        </Group>
                    </Box>
                </Box>
            </Drawer>
        </>
    );
}
