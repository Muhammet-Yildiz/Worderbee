"use client";
import { Box, Container, Stack, styled } from '@mui/material'
import { LanguagePopover } from '@/components/language-popover';
import { useLocale } from 'next-intl';
import { SettingsIcon } from '@/icons/settings';
import { InfoModal } from '@/components/info-modal';
import { RankingModal } from '@/components/rankingModal';

const NavbarContainer = styled('div')({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'lightgreen',
    padding: '0.52rem',
})


export default function Navbar() {
    const locale = useLocale();


    return (
        <NavbarContainer >
            <Container maxWidth="sm"
                sx={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    justifyContent: 'space-between',
                }}
            >
                <LanguagePopover
                    language={locale}
                />

                <Box sx={{ flexGrow: 1 }} />
                <Stack direction="row" spacing={2.5} sx={{
                    float: 'right',
                    '.MuiSvgIcon-root': {
                        backgroundColor: '#E4EAF3',
                        p: '0.42rem 0.52rem',
                        fontSize: '1.45rem',
                        cursor: 'pointer',
                        transition: '0.3s all',
                        borderRadius: '0.4rem',
                        color: ' #4A5568',
                        '&:hover': {
                            backgroundColor: '#E4EAF3',
                            color: 'green !important',

                        },
                    },
                }}>
                    <RankingModal />
                    <InfoModal />
                    <SettingsIcon />


                </Stack>

            </Container>
        </NavbarContainer>
    )
}