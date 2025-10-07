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
import { useFilters } from '../../../context/FilterContext';

export function Size() {
    const [opened, { open, close }] = useDisclosure(false);
    const colorScheme = useComputedColorScheme();
    const theme = useMantineTheme();
    const { filters, updateFilter } = useFilters();

    // Проверяем, выбран ли хотя бы один параметр размера
    const isFilterActive =
        filters.diameter_min > 0 ||
        filters.diameter_max > 0 ||
        filters.wall_thickness_min > 0 ||
        filters.wall_thickness_max > 0;

    const handleReset = () => {
        updateFilter('diameter_min', 0);
        updateFilter('diameter_max', 0);
        updateFilter('wall_thickness_min', 0);
        updateFilter('wall_thickness_max', 0);
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
                onClose={close}
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
                                            value={filters.diameter_min === 0 ? undefined : filters.diameter_min}
                                            onChange={(value) => updateFilter('diameter_min', Number(value) || 0)}
                                            allowNegative={false}
                                        />
                                        <NumberInput
                                            label="Максимум"
                                            placeholder="∞"
                                            min={0}
                                            value={filters.diameter_max === 0 ? undefined : filters.diameter_max}
                                            onChange={(value) => updateFilter('diameter_max', Number(value) || 0)}
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
                                            value={filters.wall_thickness_min === 0 ? undefined : filters.wall_thickness_min}
                                            onChange={(value) => updateFilter('wall_thickness_min', Number(value) || 0)}
                                            allowNegative={false}
                                        />
                                        <NumberInput
                                            label="Максимум"
                                            placeholder="∞"
                                            min={0}
                                            decimalScale={2}
                                            value={filters.wall_thickness_max === 0 ? undefined : filters.wall_thickness_max}
                                            onChange={(value) => updateFilter('wall_thickness_max', Number(value) || 0)}
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
