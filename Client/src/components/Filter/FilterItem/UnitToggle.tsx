import { Button, Group, useMantineTheme, useComputedColorScheme } from '@mantine/core';
import { useFilters } from '../../../context/FilterContext';
import { IconWeight, IconRuler } from '@tabler/icons-react';

export function UnitToggle() {
    const { filters, updateFilter } = useFilters();
    const theme = useMantineTheme();
    const colorScheme = useComputedColorScheme();

    const isActive = (unit: 'tons' | 'meters') => filters.unit === unit;

    return (
        <Group gap={4}>
            <Button
                variant={isActive('tons') ? 'filled' : 'light'}
                size="sm"
                radius="xl"
                leftSection={<IconWeight size={16} />}
                onClick={() => updateFilter('unit', 'tons')}
                style={{
                    backgroundColor: isActive('tons') 
                        ? theme.other.contrast 
                        : 'transparent',
                    color: isActive('tons')
                        ? theme.other.onContrast
                        : colorScheme === 'dark' ? theme.colors.gray[0] : theme.colors.dark[9]
                }}
            >
                Тонны
            </Button>
            <Button
                variant={isActive('meters') ? 'filled' : 'light'}
                size="sm"
                radius="xl"
                leftSection={<IconRuler size={16} />}
                onClick={() => updateFilter('unit', 'meters')}
                style={{
                    backgroundColor: isActive('meters') 
                        ? theme.other.contrast 
                        : 'transparent',
                    color: isActive('meters')
                        ? theme.other.onContrast
                        : colorScheme === 'dark' ? theme.colors.gray[0] : theme.colors.dark[9]
                }}
            >
                Метры
            </Button>
        </Group>
    );
}