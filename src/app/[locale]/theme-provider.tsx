
'use client';
import { ReactNode } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { createCustomTheme } from '@/theme';
import { useSettings } from '@/contexts/settings-context';


export default function ThemeGlobalProvider({ children }: { children: ReactNode }) {
    const { settings, saveSettings } = useSettings();

    const theme = createCustomTheme({
        theme: settings.theme
    });

    return (

        <ThemeProvider theme={{
            ...theme,
            palette: {
                ...theme.palette,
                primary: {
                    main: settings.tintColor,
                }
            }
        }}>
            {children}
        </ThemeProvider>
    );

}