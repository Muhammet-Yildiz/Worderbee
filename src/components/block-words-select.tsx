import { useState } from 'react';
import { ArrowDownIcon } from '@/icons/arrow-down';
import { alpha, Container, Menu, Stack, Typography } from '@mui/material';


export function BlockWordsSelect({ foundWords, messages }: { foundWords: string[], messages: any }) {

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event: any) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <Container maxWidth="sm"
            sx={{ position: 'relative' }}
        >

            <Stack spacing={2}
                direction="row"
                alignItems="center"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
                sx={{
                    position: 'relative',
                    backgroundColor: (theme) => theme.palette.background.paper,
                    borderRadius: '0.4rem',
                    cursor: 'pointer',
                    transition: '0.3s all',
                    my: 2,
                    height: '2.6rem',
                    pl: 2,
                    '& .MuiSvgIcon-root': {
                        color: '#5f5f5f',
                        fontSize: '0.9rem',
                        position: 'absolute',
                        right: '0',
                        backgroundColor:   (theme) => theme.palette.background.paper,
                        padding: '0.3rem 1.1rem ',
                    },
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',


                }}
            >
                {foundWords.map((item, index) => (

                    <Typography key={index}
                        variant="body1"
                        fontSize={14}
                        sx={{
                            m: '0 !important',
                            mr: '0.35rem !important',
                            color:  (theme) => theme.palette.text.primary
                        }}
                    >
                        {item}
                        {index === foundWords.length - 1 ? '' : ' ,'}
                    </Typography>

                ))}

                <ArrowDownIcon />
            </Stack>


            <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
                sx={{
                    position: 'absolute',
                    left: 0,
                    '& .MuiMenu-paper': {
                        width: '550px !important',
                        backgroundColor:  (theme) => theme.palette.background.paper,
                        boxShadow: 'none',
                        pb: 1.6
                    },
                    '& .MuiSvgIcon-root': {
                        color: '#5f5f5f',
                        fontSize: '0.9rem',
                        position: 'absolute',
                        right: '1rem',
                        top: '1rem',
                    }
                }}
            >
                <Typography variant="body1"
                    fontSize={15.6}
                    sx={{
                        pl: 2,
                        pt: 1,
                        letterSpacing: 0.7,
                    }}
                >
                    {messages.words === '' ?
                        <>
                            <span style={{ fontWeight: 'bold' }}  > {foundWords?.length} </span>
                            {messages.haveFound}
                        </>
                        :

                        <>
                            {messages.haveFound}
                            <span style={{  fontWeight: 'bold' }}  > {foundWords?.length} </span>
                            {messages.words}
                        </>
                    }

                </Typography>
                <Stack
                    direction="row"
                    alignItems="center"
                    justifyContent="flex-start"
                    spacing={1}
                    sx={{
                        pt: 2.5,
                        pl: 2,
                        flexWrap: 'wrap',
                        gap: '1rem 0.2rem ',
                    }}
                >
                    {foundWords.map((item, index) => (
                        <Typography key={index}
                            variant="body1"
                            fontSize={13}
                            sx={{
                                m: '0 !important',
                                mr: '1.6rem !important',
                                backgroundColor:  (theme) => alpha(theme.palette.primary.main, 0.2),
                                padding: '0.3rem 0.5rem ',
                                borderRadius: '0.4rem',


                            }}
                        >
                            {item}
                        </Typography>

                    ))}
                </Stack>
                <ArrowDownIcon />
            </Menu>
        </Container >
    )
}