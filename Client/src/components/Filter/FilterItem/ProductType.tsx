import { Button, Drawer, Text, useComputedColorScheme, Stack, Radio, useMantineTheme, Box, Group, Space } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useState, useEffect } from 'react';
import { useFilters } from '../../../context/FilterContext';

interface ProductType {
    id: string;
    name: string;
    parent_id: string;
}

export function ProductType() {
    const [opened, { open, close }] = useDisclosure(false);
    const colorScheme = useComputedColorScheme();
    const [productTypes, setProductTypes] = useState<ProductType[]>([]);
    const [loading, setLoading] = useState(false);
    const { filters, updateFilter } = useFilters();
    const theme = useMantineTheme();

    // Проверяем, выбран ли фильтр
    const isFilterActive = filters.type_id !== '';

    // Мок данных
    const mockProductTypes: ProductType[] = [
        {
            id: "a58d54b6-25ea-4818-afc9-1faa8c630d9a",
            name: "Бесшовные холоднодеформированные",
            parent_id: "3fa85f64-5717-4562-b3fc-2c963f66afa6"
        },
        {
            id: "d21de9df-f3dd-442f-8b9f-89d8f1865698",
            name: "Прямошовные",
            parent_id: "3fa85f64-5717-4562-b3fc-2c963f66afa6"
        },
        {
            id: "4ae51348-d619-4bf2-a35f-1c6931b68bf1",
            name: "Холоднокатаные",
            parent_id: "3fa85f64-5717-4562-b3fc-2c963f66afa6"
        },
        {
            id: "403389a6-3f81-4cd0-bf1d-e43fe6adaa48",
            name: "Горячекатаные",
            parent_id: "3fa85f64-5717-4562-b3fc-2c963f66afa6"
        }
    ];

    // Симуляция API запроса
    useEffect(() => {
        if (opened) {
            setLoading(true);
            setTimeout(() => {
                setProductTypes(mockProductTypes);
                setLoading(false);
            }, 500);
        }
    }, [opened]);

    const handleRadioChange = (value: string) => {
        updateFilter('type_id', value);
        updateFilter('type_name', productTypes.find((type) => type.id === value)?.name || '');
    };

    const handleReset = () => {
        updateFilter('type_id', '');
        updateFilter('type_name', '');
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
                <Text fw={100} px="md" style={{ letterSpacing: '1px' }}>Тип продукции</Text>
            </Button>

            <Drawer
                opened={opened}
                onClose={close}
                title="Тип продукции"
                position="right"
                size="md"
            >
                <Box style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                    <Box style={{ flex: 1, overflowY: 'auto' }}>
                        {loading ? (
                            <Text>Загрузка...</Text>
                        ) : (
                            <Radio.Group
                                value={filters.type_id}
                                onChange={handleRadioChange}
                            >
                                <Stack gap="sm">
                                    {productTypes.map((type) => (
                                        <Radio
                                            key={type.id}
                                            value={type.id}
                                            label={type.name}
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
