import { Group, Button, Text, useMantineTheme, useComputedColorScheme } from '@mantine/core';
import { ProductType } from '../FilterItem/ProductType';
import { Size } from '../FilterItem/Size';
import { SteelGrade } from '../FilterItem/SteelGrade';
import { Warehouse } from '../FilterItem/Warehouse';
import { Manufacturer } from '../FilterItem/Manufacturer';
import { Gost } from '../FilterItem/Gost';
import { useFilters } from '../../../context/FilterContext';

export function FilterList() {
    const { updateFilter } = useFilters();
    const theme = useMantineTheme();
    const colorScheme = useComputedColorScheme();

    const handleResetAll = () => {
        updateFilter('stock_id', '');
        updateFilter('stock_name', '');
        updateFilter('type_id', '');
        updateFilter('type_name', '');
        updateFilter('diameter_min', 0);
        updateFilter('diameter_max', 0);
        updateFilter('wall_thickness_min', 0);
        updateFilter('wall_thickness_max', 0);
        updateFilter('gost', '');
        updateFilter('steel_grade', '');
        updateFilter('manufacturer', '');
    };

    return (
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
    );
}
