import { useRef, useState } from 'react';
import { alpha, Box,Popover,Stack,Typography} from '@mui/material';
import { montserrat, nunito, tiltWarp } from '@/lib/fonts';
import { SettingsIcon } from '@/icons/settings';
import { SunIcon } from '@/icons/sun';
import { MoonIcon } from '@/icons/moon';
import { useSettings } from '@/contexts/settings-context';
import { CloseIcon } from '@/icons/close';


const tintColors = [
    '#ff0303',
    '#00ab22',
    '#8316f7',
    '#db7d02',
    '#dade0b',
    '#bd1989',
    '#0686bd',
    '#74512D',
    '#B5C18E',
    '#35374B',
    '#F72798',
    '#A0153E',
    '#E26EE5',
    '#45FFCA'
]



export const SettingsPopover = ({messages} : {
    messages: any
}) => {

    const { settings, saveSettings } = useSettings()

    const anchorRef = useRef(null);
    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const handleSwitchTheme = (theme: string) => {
        saveSettings({
            ...settings,
            theme: theme
        });
    };

    const handleSwitchTint = (color: string) => {
        saveSettings({
            ...settings,
            tintColor: color
        });
    }



    return (
        <>
            <SettingsIcon onClick={handleOpen}ref={anchorRef}/>

            <Popover
                anchorEl={anchorRef.current}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}

                keepMounted
                onClose={handleClose}
                open={open}
                PaperProps={{
                    sx: {
                        width: 580,
                        height: 625,
                        boxShadow: 'none',
                        opacity: 1,
                        backgroundColor: settings?.theme === 'light' ? 'white' :   (theme) => theme.palette.background.default,
                        backgroundImage:  'none'
                    }
                }}

                sx={{
                    top: 14,
                    left: {
                        xs: 0,
                        sm: 10
                    }
                }}
            >
                <Typography
                    sx={{
                        fontSize: '1rem',
                        textAlign: 'center',
                        backgroundColor: 'background.paper',
                        color: 'text.primary',
                        position: 'relative',
                        p: 1.1,
                        mt: 2,
                        fontWeight: '700',
                        mx: 2,
                        borderRadius: '0.4rem',
                        ' & svg': {
                            position :'absolute',
                            right:10,
                            bottom:12,
                            fontSize: '1rem',
                            fill: '#7c7d80',
                            cursor: 'pointer',
                           },
                    }}
                    className={montserrat.className}
                >
                    <CloseIcon
                        onClick={handleClose}
                    />
                    {messages.title}
                </Typography>


                <Box
                    sx={{
                        color: 'text.primary',
                        p: 1.1,
                        mt: 2,
                        mx: 2,
                        fontSize: '0.9rem',
                        fontWeight: '700',
                        display: 'block',
                        borderBottom:  (theme) => '1px solid ' + theme.palette.text.disabled
                    }}
                >
                    {messages.themeMode}
                </Box>

                <Stack
                    direction='row'
                    spacing={5}
                    sx={{
                        p: 1.1,
                        pt: 2,
                        ml: 1.5,
                        '& svg': {
                            p: ' 1.3rem 1.5rem ',
                            borderRadius: 2,
                            border:  (theme) => '1px solid ' + theme.palette.text.disabled,
                            cursor: 'pointer'
                        }
                    }}>
                    <SunIcon
                        sx={{
                            fill: settings?.theme === 'light' ?
                                (theme) => theme.palette.primary.main :
                                '#7c7d80',
                            backgroundColor: settings?.theme === 'light' ? (theme) => alpha(theme.palette.primary.main, 0.1) : alpha('#E4EAF3', 0.1)
                        }}
                        onClick={() => handleSwitchTheme('light')}
                    />

                    <MoonIcon
                        sx={{
                            '& path': {
                                fill: settings?.theme === 'dark' ?
                                    (theme) => theme.palette.primary.main :
                                    '#7c7d80',
                            },
                            backgroundColor:
                                settings?.theme === 'dark' ? (theme) => alpha(theme.palette.primary.main, 0.3) : alpha('#E4EAF3', 0.4)
                        }}
                        onClick={() => handleSwitchTheme('dark')}
                    />
                </Stack>


                <Box
                    sx={{
                        color: 'text.primary',
                        p: 1.1,
                        mt: 3.8,
                        mx: 2,
                        fontSize: '0.9rem',
                        fontWeight: '700',
                        display: 'block',
                        borderBottom:  (theme) => '1px solid ' + theme.palette.text.disabled

                    }}
                >
                     {messages.tintColors}
                </Box>

                <Stack
                    direction='row'
                    flexWrap='wrap'
                    gap={3}
                    sx={{
                        p: 1.1,
                        pt: 2,
                        ml: 1.5,

                    }}>
                    {
                        tintColors.map((color, index) => (
                            <Box
                                key={index}
                                sx={{
                                    borderRadius: 2,
                                    border:  (theme) => '1px solid ' + theme.palette.text.disabled,
                                    cursor: 'pointer',
                                    width: 55,
                                    height: 55,
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    backgroundColor: settings?.tintColor === color ? (theme) => alpha(theme.palette.primary.main, 0.2) :
                                    settings?.theme === 'dark' ? alpha('#E4EAF3', 0.1) :
                                    alpha('#E4EAF3', 0.4)
                                }}
                                onClick={() => handleSwitchTint(color)}
                            >
                                <Box
                                    sx={{
                                        width: 15,
                                        height: 15,
                                        backgroundColor: color,
                                        borderRadius: '50%',
                                    }}
                                >
                                </Box>

                            </Box>
                        ))
                    }
                </Stack>
            </Popover>
        </>
    );
};