import { Button, Drawer, Text, useComputedColorScheme, Stack, Checkbox, useMantineTheme, Box, Group, Space } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useState, useEffect, useMemo } from 'react';
import { useFilters } from '../../../context/FilterContext';
import { useProducts } from '../../../context/ProductContext';

export function SteelGrade() {
    const [opened, { open, close }] = useDisclosure(false);
    const colorScheme = useComputedColorScheme();
    const [steelGrades, setSteelGrades] = useState<string[]>([]);
    const { filters, updateFilter } = useFilters();
    const { products } = useProducts();
    const theme = useMantineTheme();

    // Локальный state для временных изменений
    const [tempSteelGrades, setTempSteelGrades] = useState<string[]>([]);

    // Проверяем, выбран ли хотя бы один фильтр (из глобального состояния)
    const isFilterActive = filters.steel_grades.length > 0;

    // Извлекаем уникальные марки стали из загруженных данных
    const uniqueSteelGrades = useMemo(() => {
        const gradesSet = new Set<string>();

        products.forEach(product => {
            if (product.steel_grade) {
                gradesSet.add(product.steel_grade);
            }
        });

        return Array.from(gradesSet).sort();
    }, [products]);

    // Обновляем список марок стали при открытии drawer
    useEffect(() => {
        if (opened && uniqueSteelGrades.length > 0) {
            setSteelGrades(uniqueSteelGrades);
        }
    }, [opened, uniqueSteelGrades]);

    // Инициализируем временное состояние при открытии drawer
    useEffect(() => {
        if (opened) {
            setTempSteelGrades([...filters.steel_grades]);
        }
    }, [opened, filters.steel_grades]);

    const handleCheckboxChange = (grade: string, checked: boolean) => {
        let newGrades: string[];

        if (checked) {
            newGrades = [...tempSteelGrades, grade];
        } else {
            newGrades = tempSteelGrades.filter(g => g !== grade);
        }

        setTempSteelGrades(newGrades);
    };

    const handleApply = () => {
        updateFilter('steel_grades', tempSteelGrades);
        close();
    };

    const handleReset = () => {
        setTempSteelGrades([]);
    };

    const handleCancel = () => {
        setTempSteelGrades([...filters.steel_grades]);
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
                    Марка стали {isFilterActive && `(${filters.steel_grades.length})`}
                </Text>
            </Button>

            <Drawer
                opened={opened}
                onClose={handleCancel}
                title="Марка стали"
                position="right"
                size="md"
            >
                <Box style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                    <Box style={{ flex: 1, overflowY: 'auto' }}>
                        <Stack gap="sm">
                            {steelGrades.map((grade) => (
                                <Checkbox
                                    key={grade}
                                    checked={tempSteelGrades.includes(grade)}
                                    onChange={(event) => handleCheckboxChange(grade, event.currentTarget.checked)}
                                    label={grade}
                                    color={theme.other.contrast}
                                />
                            ))}
                        </Stack>
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
