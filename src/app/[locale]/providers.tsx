
'use client';
import { ReactNode } from 'react';
import { SWRConfig } from 'swr';
import { fetcher } from '@/services/fetcher';
import { SettingsProvider, useSettings } from '@/contexts/settings-context';
import ToasterContext from '@/contexts/toaster-context';
import ThemeGlobalProvider from './theme-provider';


export default function Providers({ children }: { children: ReactNode }) {
    return (
        <SWRConfig value={{ fetcher }}  >

            <SettingsProvider>

                <ThemeGlobalProvider>
                  <ToasterContext />
                    {children}
                </ThemeGlobalProvider>

            </SettingsProvider>
        </SWRConfig>

    );

}