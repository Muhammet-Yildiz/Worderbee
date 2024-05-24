import { useSettings } from '@/contexts/settings-context'
import { alpha, Box, Menu, MenuItem } from '@mui/material'
import React from 'react'

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

export function ChangeTintColor() {
    const { settings, saveSettings } = useSettings()
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event : any ) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleSwitchTint = (color: string) => {
        saveSettings({
            ...settings,
            tintColor: color
        });
    }

    return (
        <Box
            sx={{
                position: 'absolute',
                top: 2,
                right: 2,
                cursor: 'pointer',
                backgroundColor: settings.theme === 'light' ? "white" : (theme) => alpha(theme.palette.primary.main, 0.16),
                border: (theme) => "2px solid" + theme.palette.text.disabled,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                p: 1,
                borderRadius: 2,
            }}
        >

            <Box
                sx={{
                    width: 14,
                    height: 14,
                    backgroundColor: (theme) => theme.palette.primary.main,
                    borderRadius: 1
                }}
                onClick={handleClick}
            ></Box>
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}

                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  sx={{
                    top:20 ,
                    ' .MuiMenu-paper': {
                        backgroundColor: settings.theme === 'light' ? "white" : (theme) => theme.palette.background.default,
                    }
                  }}

            >
                {tintColors.map((color, index) => (
                    <MenuItem
                        key={index}
                        onClick={() =>{
                             handleSwitchTint(color)
                             handleClose()
                        }}
                        sx={{
                            color: 'white',
                            '&:hover': {
                                backgroundColor: alpha(color, 0.2)
                            },
                            '& span': {
                                width: 14,
                                height: 14,
                                backgroundColor: color,
                                borderRadius: 1,
                            },
                            p: '0.5rem 1.5rem ',
                        }}
                    >
                        <span> </span>
                      
                    </MenuItem>
                ))}
            </Menu>

        </Box>
    )
}