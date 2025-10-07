import { Button, Drawer, Text, useComputedColorScheme, Stack, Radio, useMantineTheme, Box, Group, Space } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useState, useEffect } from 'react';
import { useFilters } from '../../../context/FilterContext';

export function SteelGrade() {
    const [opened, { open, close }] = useDisclosure(false);
    const colorScheme = useComputedColorScheme();
    const [steelGrades, setSteelGrades] = useState<string[]>([]);
    const [loading, setLoading] = useState(false);
    const { filters, updateFilter } = useFilters();
    const theme = useMantineTheme();

    // Проверяем, выбран ли фильтр
    const isFilterActive = filters.steel_grade !== '';

    // Мок данных - список марок стали
    const mockSteelGrades: string[] = [
        "09Г2С",
        "20",
        "10",
        "12Х18Н10Т",
        "08Х18Н10",
        "17Г1С",
        "Ст3сп"
    ];

    // Симуляция API запроса
    useEffect(() => {
        if (opened) {
            setLoading(true);
            setTimeout(() => {
                setSteelGrades(mockSteelGrades);
                setLoading(false);
            }, 500);
        }
    }, [opened]);

    const handleRadioChange = (value: string) => {
        updateFilter('steel_grade', value);
    };

    const handleReset = () => {
        updateFilter('steel_grade', '');
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
                <Text fw={100} px="md" style={{ letterSpacing: '1px' }}>Марка стали</Text>
            </Button>

            <Drawer
                opened={opened}
                onClose={close}
                title="Марка стали"
                position="right"
                size="md"
            >
                <Box style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                    <Box style={{ flex: 1, overflowY: 'auto' }}>
                        {loading ? (
                            <Text>Загрузка...</Text>
                        ) : (
                            <Radio.Group
                                value={filters.steel_grade}
                                onChange={handleRadioChange}
                            >
                                <Stack gap="sm">
                                    {steelGrades.map((grade) => (
                                        <Radio
                                            key={grade}
                                            value={grade}
                                            label={grade}
                                            color={theme.other.contrast}
                                        />
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
