import { Button, Drawer, Text, useComputedColorScheme, Stack, Checkbox, useMantineTheme, Box, Group, Space } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useState, useEffect, useMemo } from 'react';
import { useFilters } from '../../../context/FilterContext';
import { useProducts } from '../../../context/ProductContext';

interface ProductType {
    id: string;
    name: string;
}

export function ProductType() {
    const [opened, { open, close }] = useDisclosure(false);
    const colorScheme = useComputedColorScheme();
    const [productTypes, setProductTypes] = useState<ProductType[]>([]);
    const { filters, updateFilter } = useFilters();
    const { products } = useProducts();
    const theme = useMantineTheme();

    // Локальный state для временных изменений
    const [tempTypeIds, setTempTypeIds] = useState<string[]>([]);
    const [tempTypeNames, setTempTypeNames] = useState<string[]>([]);

    // Проверяем, выбран ли хотя бы один фильтр (из глобального состояния)
    const isFilterActive = filters.type_ids.length > 0;

    // Извлекаем уникальные типы продукции из загруженных данных
    const uniqueProductTypes = useMemo(() => {
        const typesMap = new Map<string, ProductType>();

        products.forEach(product => {
            if (product.type_id && product.production_type) {
                typesMap.set(product.type_id, {
                    id: product.type_id,
                    name: product.production_type
                });
            }
        });

        return Array.from(typesMap.values());
    }, [products]);

    // Обновляем список типов при открытии drawer
    useEffect(() => {
        if (opened && uniqueProductTypes.length > 0) {
            setProductTypes(uniqueProductTypes);
        }
    }, [opened, uniqueProductTypes]);

    // Инициализируем временное состояние при открытии drawer
    useEffect(() => {
        if (opened) {
            setTempTypeIds([...filters.type_ids]);
            setTempTypeNames([...filters.type_names]);
        }
    }, [opened, filters.type_ids, filters.type_names]);

    const handleCheckboxChange = (typeId: string, checked: boolean) => {
        const type = productTypes.find(t => t.id === typeId);
        if (!type) return;

        let newTypeIds: string[];
        let newTypeNames: string[];

        if (checked) {
            // Добавляем тип
            newTypeIds = [...tempTypeIds, typeId];
            newTypeNames = [...tempTypeNames, type.name];
        } else {
            // Удаляем тип
            newTypeIds = tempTypeIds.filter(id => id !== typeId);
            newTypeNames = tempTypeNames.filter(name => name !== type.name);
        }

        setTempTypeIds(newTypeIds);
        setTempTypeNames(newTypeNames);
    };

    const handleApply = () => {
        updateFilter('type_ids', tempTypeIds);
        updateFilter('type_names', tempTypeNames);
        close();
    };

    const handleReset = () => {
        setTempTypeIds([]);
        setTempTypeNames([]);
    };

    const handleCancel = () => {
        // Сбрасываем временные изменения при закрытии без применения
        setTempTypeIds([...filters.type_ids]);
        setTempTypeNames([...filters.type_names]);
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
                    Тип продукции {isFilterActive && `(${filters.type_ids.length})`}
                </Text>
            </Button>

            <Drawer
                opened={opened}
                onClose={handleCancel}
                title="Тип продукции"
                position="right"
                size="md"
            >
                <Box style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                    <Box style={{ flex: 1, overflowY: 'auto' }}>
                        <Stack gap="sm">
                            {productTypes.map((type) => (
                                <Checkbox
                                    key={type.id}
                                    checked={tempTypeIds.includes(type.id)}
                                    onChange={(event) => handleCheckboxChange(type.id, event.currentTarget.checked)}
                                    label={type.name}
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
