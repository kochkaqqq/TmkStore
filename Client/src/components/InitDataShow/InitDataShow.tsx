import { Text, Code, Stack, Paper } from '@mantine/core';
import { retrieveLaunchParams } from '@telegram-apps/sdk';

export function InitDataShow() {
    const { initDataRaw, initData } = retrieveLaunchParams();;

    return (
        <>
            <Stack mt="xl" gap="sm">
                <Paper withBorder p="md" radius="md">
                    <Text fw={600} mb={6}>initDataRaw (raw)</Text>
                    <Code block>
                        {initDataRaw ?? 'Not available (probably running outside Telegram)'}
                    </Code>
                </Paper>

                <Paper withBorder p="md" radius="md">
                    <Text fw={600} mb={6}>initData (parsed)</Text>
                    <Code block>
                        {JSON.stringify(initData, null, 2) ?? 'null'}
                    </Code>
                </Paper>

                {initData?.user && (
                    <Paper withBorder p="md" radius="md">
                        <Text fw={600} mb={6}>User</Text>
                        <Code block>
                            {JSON.stringify(initData.user, null, 2)}
                        </Code>
                    </Paper>
                )}
            </Stack>
        </>
    );
}
