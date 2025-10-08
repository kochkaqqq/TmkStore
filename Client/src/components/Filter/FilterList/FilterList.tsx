import { Group, Button, Text, useMantineTheme, useComputedColorScheme, Space } from '@mantine/core';
import { ProductType } from '../FilterItem/ProductType';
import { Size } from '../FilterItem/Size';
import { SteelGrade } from '../FilterItem/SteelGrade';
import { Warehouse } from '../FilterItem/Warehouse';
import { Manufacturer } from '../FilterItem/Manufacture';
import { Gost } from '../FilterItem/Gost';
import { UnitToggle } from '../FilterItem/UnitToggle';
import { useFilters } from '../../../context/FilterContext';

export function FilterList() {
    const { updateFilter } = useFilters();
    const theme = useMantineTheme();
    const colorScheme = useComputedColorScheme();

    const handleResetAll = () => {
        updateFilter('stock_ids', []);
        updateFilter('stock_names', []);
        updateFilter('type_ids', []);
        updateFilter('type_names', []);
        updateFilter('diameter_min', 0);
        updateFilter('diameter_max', 0);
        updateFilter('wall_thickness_min', 0);
        updateFilter('wall_thickness_max', 0);
        updateFilter('gosts', []);
        updateFilter('steel_grades', []);
        updateFilter('manufacturers', []);
        // unit не сбрасываем - это настройка отображения
    };

    return (
        <>
            <Group gap="xs" px="md">
                <ProductType />
                <Size />
                <SteelGrade />
                <Gost />
                <Warehouse />
                <Manufacturer />
                <Button
                    variant="subtle"
                    color={colorScheme === 'dark' ? 'gray.0' : 'dark.9'}
                    radius="xl"
                    onClick={handleResetAll}
                >
                    <Text fw={100} style={{ letterSpacing: '1px' }}>Сбросить фильтры</Text>
                </Button>
            </Group>
            <Space h="md"></Space>
            <Group px="md">
                <UnitToggle />
            </Group>
        </>
    );
}