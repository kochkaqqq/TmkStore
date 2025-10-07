import {
    Button,
    Drawer,
    Text,
    useComputedColorScheme,
    Stack,
    Radio,
    useMantineTheme,
    Box,
    Group,
    Space,
    Collapse,
    Badge
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useState, useEffect } from 'react';
import { useFilters } from '../../../context/FilterContext';

interface Warehouse {
    id: string;
    city: string;
    name: string;
    address: string;
    schedule: string;
    cash_payment: boolean;
    card_payment: boolean;
}

export function Warehouse() {
    const [opened, { open, close }] = useDisclosure(false);
    const colorScheme = useComputedColorScheme();
    const [warehouses, setWarehouses] = useState<Warehouse[]>([]);
    const [loading, setLoading] = useState(false);
    const [expandedId, setExpandedId] = useState<string | null>(null);
    const { filters, updateFilter } = useFilters();
    const theme = useMantineTheme();

    // Проверяем, выбран ли фильтр
    const isFilterActive = filters.stock_id !== '';

    // Мок данных
    const mockWarehouses: Warehouse[] = [
        {
            id: "4086fbbc-8dc9-418d-8de9-7d65ccab24a0",
            city: "Екатеринбург",
            name: "Екатеринбург",
            address: "поселок Шувакиш, ул Зеленая, 50а",
            schedule: "пн - чт 08.00-17.00, пт 08.00-15.45",
            cash_payment: true,
            card_payment: true
        },
        {
            id: "c90165d4-835c-44e0-a79a-661fc4ebcec1",
            city: "Москва",
            name: "Москва",
            address: "",
            schedule: "пн - чт 08.00-17.00, пт 08.00-15.45",
            cash_payment: true,
            card_payment: true
        },
        {
            id: "7ea241c8-a1a2-4094-b57b-f814b9eea821",
            city: "Екатеринбург",
            name: "Екатеринбург",
            address: "переулок Низовой, 1",
            schedule: "пн - чт 08.00-17.00, пт 08.00-15.45",
            cash_payment: true,
            card_payment: true
        },
        {
            id: "881fcb8e-26d4-467a-be21-f0f877e77c99",
            city: "Челябинск",
            name: "Челябинск",
            address: "Производственная, 8",
            schedule: "пн - чт 08.00-17.00, пт 08.00-15.45",
            cash_payment: true,
            card_payment: true
        },
        {
            id: "055228a9-0eaf-42a6-b259-1fe69d19865e",
            city: "Санкт-Петербург",
            name: "Санкт-Петербург",
            address: "",
            schedule: "пн - чт 08.00-17.00, пт 08.00-15.45",
            cash_payment: true,
            card_payment: true
        }
    ];

    // Симуляция API запроса
    useEffect(() => {
        if (opened) {
            setLoading(true);
            setTimeout(() => {
                setWarehouses(mockWarehouses);
                setLoading(false);
            }, 500);
        }
    }, [opened]);

    // Функция для форматирования лейбла: "Город (адрес)" или просто "Город"
    const formatLabel = (warehouse: Warehouse): string => {
        if (warehouse.address) {
            return `${warehouse.city} (${warehouse.address})`;
        }
        return warehouse.city;
    };

    const handleRadioChange = (value: string) => {
        const selectedWarehouse = warehouses.find((w) => w.id === value);
        updateFilter('stock_id', value);
        updateFilter('stock_name', selectedWarehouse ? formatLabel(selectedWarehouse) : '');

        // Раскрываем информацию при выборе
        setExpandedId(value);
    };

    const handleReset = () => {
        updateFilter('stock_id', '');
        updateFilter('stock_name', '');
        setExpandedId(null);
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
                <Text fw={100} px="md" style={{ letterSpacing: '1px' }}>Склад</Text>
            </Button>

            <Drawer
                opened={opened}
                onClose={close}
                title="Склад"
                position="right"
                size="md"
            >
                <Box style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                    <Box style={{ flex: 1, overflowY: 'auto' }}>
                        {loading ? (
                            <Text>Загрузка...</Text>
                        ) : (
                            <Radio.Group
                                value={filters.stock_id}
                                onChange={handleRadioChange}
                            >
                                <Stack gap="md">
                                    {warehouses.map((warehouse) => (
                                        <Box key={warehouse.id}>
                                            <Radio
                                                value={warehouse.id}
                                                label={formatLabel(warehouse)}
                                                color={theme.other.contrast}
                                            />
                                            <Collapse in={expandedId === warehouse.id}>
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
                            </Radio.Group>
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
                                onClick={close}
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
