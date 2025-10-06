import { IconSearch } from '@tabler/icons-react';
import { Autocomplete, Group, Image, Text } from '@mantine/core';
import { useMantineColorScheme } from '@mantine/core';
import { copy } from './copy';
import { useLocation, Link } from 'react-router-dom';
import classes from './Header.module.css';

const PHONE = '+7 (800) 234-50-05';
const EMAIL = 'sales@tmk-group.com';

export function Header() {
    const { colorScheme } = useMantineColorScheme();
    const isDark = colorScheme === 'dark';

    const logoSrc = isDark
        ? 'https://e-commerce.tmk-group.com/build_v3/images/logo.4bf2b4d6.png'
        : 'https://e-commerce.tmk-group.com/build_v3/images/logo-light.9a869e17.png';

    const location = useLocation();
    return (
        <header className={classes.header}>
            <div className={classes.inner}>
                <Group gap="sm">
                    <Image src={logoSrc} alt="Logo" h={70} fit="contain" />
                </Group>

                <Group gap="md">
                    <Group ml={50} gap="md" visibleFrom="sm">
                        <Text
                            onMouseOver={(e) => e.currentTarget.style.cursor = 'pointer'}
                            onClick={() => copy(PHONE)} >
                            {PHONE}
                        </Text>

                        <Text
                            onMouseOver={(e) => e.currentTarget.style.cursor = 'pointer'}
                            onClick={() => copy(PHONE)} >
                            {EMAIL}
                        </Text>
                        <Link
                            key="InitData"
                            to="/init-data"
                            className={classes.link}
                            data-active={location.pathname === "/init-data" || undefined}
                        >
                            InitData
                        </Link>
                    </Group>

                    <Autocomplete
                        className={classes.search}
                        placeholder="Поиск"
                        leftSection={<IconSearch size={16} stroke={1.5} />}
                        data={['React', 'Angular', 'Vue', 'Next.js', 'Riot.js', 'Svelte', 'Blitz.js']}
                    />
                </Group>
            </div>
        </header>
    );
}
