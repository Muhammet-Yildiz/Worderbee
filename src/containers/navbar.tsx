"use client";
import { alpha, Box, Container, Stack, styled } from '@mui/material'
import { LanguagePopover } from '@/components/language-popover';
import { useLocale } from 'next-intl';
import { InfoModal } from '@/components/info-modal';
import { RankingModal } from '@/components/ranking-modal';
import { SettingsPopover } from '@/components/settings-popover';
import { useSettings } from '@/contexts/settings-context';

const NavbarContainer =styled('div')(({ theme }) => ({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '0.52rem',
}));

export default function Navbar({messages} : {messages: any}) {
    const locale = useLocale();
    const {settings} = useSettings()

    return (
        <NavbarContainer
            sx={{
                backgroundColor: settings?.theme === 'dark' ?
                
               (theme) => alpha( theme.palette.background.paper , 1)
                : 
                (theme) => alpha(theme.palette.primary.main, 0.6),
               
            }}
        >
            <Container maxWidth="sm"
                sx={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    justifyContent: 'space-between',
                }}
            >
                <LanguagePopover
                    language={locale}
                    messages={messages.lang}
                />

                <Box sx={{ flexGrow: 1 }} />
                <Stack direction="row" spacing={2.5} sx={{
                    float: 'right',
                    '.MuiSvgIcon-root': {
                        backgroundColor: settings?.theme === 'dark' ? 
                        (theme) => 
                            alpha(theme.palette.background.default, 1) + ' !important'  :   '#E4EAF3',
                        p: '0.42rem 0.52rem',
                        fontSize: '1.45rem',
                        cursor: 'pointer',
                        transition: '0.3s all',
                        borderRadius: '0.4rem',
                        color: ' #4A5568',
                        '&:hover': {
                            color:  (theme) => theme.palette.primary.main,
                            opacity: 0.7,
                        },
                    },
                }}>
                    <RankingModal />
                    <InfoModal />
                     <SettingsPopover 
                        messages={messages.settings}
                     />

                </Stack>

            </Container>
        </NavbarContainer>
    )
}