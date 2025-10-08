import {
    Button,
    Drawer,
    Text,
    useComputedColorScheme,
    useMantineTheme,
    Box,
    Group,
    Space,
    Accordion,
    NumberInput
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useState, useEffect } from 'react';
import { useFilters } from '../../../context/FilterContext';

export function Size() {
    const [opened, { open, close }] = useDisclosure(false);
    const colorScheme = useComputedColorScheme();
    const theme = useMantineTheme();
    const { filters, updateFilter } = useFilters();

    // Локальный state для временных значений
    const [tempDiameterMin, setTempDiameterMin] = useState(0);
    const [tempDiameterMax, setTempDiameterMax] = useState(0);
    const [tempWallThicknessMin, setTempWallThicknessMin] = useState(0);
    const [tempWallThicknessMax, setTempWallThicknessMax] = useState(0);

    // Проверяем, выбран ли хотя бы один параметр размера (из глобального состояния)
    const isFilterActive =
        filters.diameter_min > 0 ||
        filters.diameter_max > 0 ||
        filters.wall_thickness_min > 0 ||
        filters.wall_thickness_max > 0;

    // Инициализируем временное состояние при открытии drawer
    useEffect(() => {
        if (opened) {
            setTempDiameterMin(filters.diameter_min);
            setTempDiameterMax(filters.diameter_max);
            setTempWallThicknessMin(filters.wall_thickness_min);
            setTempWallThicknessMax(filters.wall_thickness_max);
        }
    }, [opened, filters.diameter_min, filters.diameter_max, filters.wall_thickness_min, filters.wall_thickness_max]);

    const handleApply = () => {
        updateFilter('diameter_min', tempDiameterMin);
        updateFilter('diameter_max', tempDiameterMax);
        updateFilter('wall_thickness_min', tempWallThicknessMin);
        updateFilter('wall_thickness_max', tempWallThicknessMax);
        close();
    };

    const handleReset = () => {
        setTempDiameterMin(0);
        setTempDiameterMax(0);
        setTempWallThicknessMin(0);
        setTempWallThicknessMax(0);
    };

    const handleCancel = () => {
        // Сбрасываем временные изменения при закрытии без применения
        setTempDiameterMin(filters.diameter_min);
        setTempDiameterMax(filters.diameter_max);
        setTempWallThicknessMin(filters.wall_thickness_min);
        setTempWallThicknessMax(filters.wall_thickness_max);
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
                <Text fw={100} px="md" style={{ letterSpacing: '1px' }}>Размер</Text>
            </Button>

            <Drawer
                opened={opened}
                onClose={handleCancel}
                title="Размер"
                position="right"
                size="md"
            >
                <Box style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                    <Box style={{ flex: 1, overflowY: 'auto' }}>
                        <Accordion variant="separated" radius="md">
                            <Accordion.Item value="diameter">
                                <Accordion.Control>Диаметр (мм)</Accordion.Control>
                                <Accordion.Panel>
                                    <Group grow>
                                        <NumberInput
                                            label="Минимум"
                                            placeholder="0"
                                            min={0}
                                            value={tempDiameterMin === 0 ? undefined : tempDiameterMin}
                                            onChange={(value) => setTempDiameterMin(Number(value) || 0)}
                                            allowNegative={false}
                                        />
                                        <NumberInput
                                            label="Максимум"
                                            placeholder="∞"
                                            min={0}
                                            value={tempDiameterMax === 0 ? undefined : tempDiameterMax}
                                            onChange={(value) => setTempDiameterMax(Number(value) || 0)}
                                            allowNegative={false}
                                        />
                                    </Group>
                                </Accordion.Panel>
                            </Accordion.Item>

                            <Accordion.Item value="wall_thickness">
                                <Accordion.Control>Толщина стенки (мм)</Accordion.Control>
                                <Accordion.Panel>
                                    <Group grow>
                                        <NumberInput
                                            label="Минимум"
                                            placeholder="0"
                                            min={0}
                                            decimalScale={2}
                                            value={tempWallThicknessMin === 0 ? undefined : tempWallThicknessMin}
                                            onChange={(value) => setTempWallThicknessMin(Number(value) || 0)}
                                            allowNegative={false}
                                        />
                                        <NumberInput
                                            label="Максимум"
                                            placeholder="∞"
                                            min={0}
                                            decimalScale={2}
                                            value={tempWallThicknessMax === 0 ? undefined : tempWallThicknessMax}
                                            onChange={(value) => setTempWallThicknessMax(Number(value) || 0)}
                                            allowNegative={false}
                                        />
                                    </Group>
                                </Accordion.Panel>
                            </Accordion.Item>
                        </Accordion>
                    </Box>

                    <Space h="md" />

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
