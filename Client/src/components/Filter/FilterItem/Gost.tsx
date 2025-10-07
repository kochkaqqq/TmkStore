import { Button, Drawer, Text, useComputedColorScheme, Stack, Radio, useMantineTheme, Box, Group, Space } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useState, useEffect } from 'react';
import { useFilters } from '../../../context/FilterContext';

export function Gost() {
    const [opened, { open, close }] = useDisclosure(false);
    const colorScheme = useComputedColorScheme();
    const [gosts, setGosts] = useState<string[]>([]);
    const [loading, setLoading] = useState(false);
    const { filters, updateFilter } = useFilters();
    const theme = useMantineTheme();

    // Проверяем, выбран ли фильтр
    const isFilterActive = filters.gost !== '';

    // Мок данных - список ГОСТов
    const mockGosts: string[] = [
        "ГОСТ 8732-78",
        "ГОСТ 8731-74",
        "ГОСТ 10704-91",
        "ГОСТ 10705-80",
        "ГОСТ 20295-85",
        "ГОСТ 14-162-68-2000"
    ];

    // Симуляция API запроса
    useEffect(() => {
        if (opened) {
            setLoading(true);
            setTimeout(() => {
                setGosts(mockGosts);
                setLoading(false);
            }, 500);
        }
    }, [opened]);

    const handleRadioChange = (value: string) => {
        updateFilter('gost', value);
    };

    const handleReset = () => {
        updateFilter('gost', '');
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
                <Text fw={100} px="md" style={{ letterSpacing: '1px' }}>ГОСТ</Text>
            </Button>

            <Drawer
                opened={opened}
                onClose={close}
                title="ГОСТ"
                position="right"
                size="md"
            >
                <Box style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                    <Box style={{ flex: 1, overflowY: 'auto' }}>
                        {loading ? (
                            <Text>Загрузка...</Text>
                        ) : (
                            <Radio.Group
                                value={filters.gost}
                                onChange={handleRadioChange}
                            >
                                <Stack gap="sm">
                                    {gosts.map((gost) => (
                                        <Radio
                                            key={gost}
                                            value={gost}
                                            label={gost}
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
