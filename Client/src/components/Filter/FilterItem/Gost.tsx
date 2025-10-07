import { Button, Drawer, Text, useComputedColorScheme, Stack, Checkbox, useMantineTheme, Box, Group, Space } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useState, useEffect, useMemo } from 'react';
import { useFilters } from '../../../context/FilterContext';
import { useProducts } from '../../../context/ProductContext';

export function Gost() {
    const [opened, { open, close }] = useDisclosure(false);
    const colorScheme = useComputedColorScheme();
    const [gosts, setGosts] = useState<string[]>([]);
    const { filters, updateFilter } = useFilters();
    const { products, loading } = useProducts();
    const theme = useMantineTheme();

    // Локальный state для временных изменений
    const [tempGosts, setTempGosts] = useState<string[]>([]);

    // Проверяем, выбран ли хотя бы один фильтр (из глобального состояния)
    const isFilterActive = filters.gosts.length > 0;

    // Извлекаем уникальные ГОСТы из загруженных данных
    const uniqueGosts = useMemo(() => {
        const gostsSet = new Set<string>();

        products.forEach(product => {
            if (product.gost) {
                gostsSet.add(product.gost);
            }
        });

        return Array.from(gostsSet).sort();
    }, [products]);

    // Обновляем список ГОСТов при открытии drawer
    useEffect(() => {
        if (opened && uniqueGosts.length > 0) {
            setGosts(uniqueGosts);
        }
    }, [opened, uniqueGosts]);

    // Инициализируем временное состояние при открытии drawer
    useEffect(() => {
        if (opened) {
            setTempGosts([...filters.gosts]);
        }
    }, [opened, filters.gosts]);

    const handleCheckboxChange = (gost: string, checked: boolean) => {
        let newGosts: string[];

        if (checked) {
            newGosts = [...tempGosts, gost];
        } else {
            newGosts = tempGosts.filter(g => g !== gost);
        }

        setTempGosts(newGosts);
    };

    const handleApply = () => {
        updateFilter('gosts', tempGosts);
        close();
    };

    const handleReset = () => {
        setTempGosts([]);
    };

    const handleCancel = () => {
        setTempGosts([...filters.gosts]);
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
                    ГОСТ {isFilterActive && `(${filters.gosts.length})`}
                </Text>
            </Button>

            <Drawer
                opened={opened}
                onClose={handleCancel}
                title="ГОСТ"
                position="right"
                size="md"
            >
                <Box style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                    <Box style={{ flex: 1, overflowY: 'auto' }}>
                        {loading ? (
                            <Text>Загрузка...</Text>
                        ) : (
                            <Stack gap="sm">
                                {gosts.map((gost) => (
                                    <Checkbox
                                        key={gost}
                                        checked={tempGosts.includes(gost)}
                                        onChange={(event) => handleCheckboxChange(gost, event.currentTarget.checked)}
                                        label={gost}
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
