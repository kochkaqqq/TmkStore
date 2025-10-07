import { Button, Drawer, Text, useComputedColorScheme, Stack, Checkbox, useMantineTheme, Box, Group, Space } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useState, useEffect, useMemo } from 'react';
import { useFilters } from '../../../context/FilterContext';
import { useProducts } from '../../../context/ProductContext';

export function Manufacturer() {
    const [opened, { open, close }] = useDisclosure(false);
    const colorScheme = useComputedColorScheme();
    const [manufacturers, setManufacturers] = useState<string[]>([]);
    const { filters, updateFilter } = useFilters();
    const { products, loading } = useProducts();
    const theme = useMantineTheme();

    // Локальный state для временных изменений
    const [tempManufacturers, setTempManufacturers] = useState<string[]>([]);

    // Проверяем, выбран ли хотя бы один фильтр (из глобального состояния)
    const isFilterActive = filters.manufacturers.length > 0;

    // Извлекаем уникальных производителей из загруженных данных
    const uniqueManufacturers = useMemo(() => {
        const manufacturersSet = new Set<string>();

        products.forEach(product => {
            if (product.manufacturer) {
                manufacturersSet.add(product.manufacturer);
            }
        });

        return Array.from(manufacturersSet).sort();
    }, [products]);

    // Обновляем список производителей при открытии drawer
    useEffect(() => {
        if (opened && uniqueManufacturers.length > 0) {
            setManufacturers(uniqueManufacturers);
        }
    }, [opened, uniqueManufacturers]);

    // Инициализируем временное состояние при открытии drawer
    useEffect(() => {
        if (opened) {
            setTempManufacturers([...filters.manufacturers]);
        }
    }, [opened, filters.manufacturers]);

    const handleCheckboxChange = (manufacturer: string, checked: boolean) => {
        let newManufacturers: string[];

        if (checked) {
            newManufacturers = [...tempManufacturers, manufacturer];
        } else {
            newManufacturers = tempManufacturers.filter(m => m !== manufacturer);
        }

        setTempManufacturers(newManufacturers);
    };

    const handleApply = () => {
        updateFilter('manufacturers', tempManufacturers);
        close();
    };

    const handleReset = () => {
        setTempManufacturers([]);
    };

    const handleCancel = () => {
        setTempManufacturers([...filters.manufacturers]);
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
                    Производитель {isFilterActive && `(${filters.manufacturers.length})`}
                </Text>
            </Button>

            <Drawer
                opened={opened}
                onClose={handleCancel}
                title="Производитель"
                position="right"
                size="md"
            >
                <Box style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                    <Box style={{ flex: 1, overflowY: 'auto' }}>
                        {loading ? (
                            <Text>Загрузка...</Text>
                        ) : (
                            <Stack gap="sm">
                                {manufacturers.map((manufacturer) => (
                                    <Checkbox
                                        key={manufacturer}
                                        checked={tempManufacturers.includes(manufacturer)}
                                        onChange={(event) => handleCheckboxChange(manufacturer, event.currentTarget.checked)}
                                        label={manufacturer}
                                        color={theme.other.contrast}
                                    />
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
