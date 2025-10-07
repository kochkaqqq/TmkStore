import { IconShoppingCart } from '@tabler/icons-react';
import { Group, Image, Text, ActionIcon } from '@mantine/core';
import { useMantineColorScheme } from '@mantine/core';
import { copy } from './copy';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import classes from './Header.module.css';

const PHONE = '+7 (800) 234-50-05';
const EMAIL = 'sales@tmk-group.com';

interface HeaderProps {
    showCart?: boolean;
    onCartClick?: () => void;
}

export function Header({ showCart = false }: HeaderProps) {
    const { colorScheme } = useMantineColorScheme();
    const isDark = colorScheme === 'dark';
    const navigate = useNavigate();

    const logoSrc = isDark
        ? 'https://e-commerce.tmk-group.com/build_v3/images/logo.4bf2b4d6.png'
        : 'https://e-commerce.tmk-group.com/build_v3/images/logo-light.9a869e17.png';

    const location = useLocation();

    const handleCartClick = () => {
        navigate('/cart');
    };
    
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
                            onClick={() => copy(PHONE)}
                        >
                            {PHONE}
                        </Text>

                        <Text
                            onMouseOver={(e) => e.currentTarget.style.cursor = 'pointer'}
                            onClick={() => copy(EMAIL)}
                        >
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

                    {showCart && (
                        <ActionIcon 
                            variant="subtle" 
                            size="xl"
                            color={isDark ? 'gray.0' : 'dark.9'}
                            aria-label="Shopping cart"
                            radius="xl"
                            onClick={handleCartClick}
                        >
                            <IconShoppingCart size={30} stroke={1.5} />
                        </ActionIcon>
                    )}
                </Group>
            </div>
        </header>
    );
}
