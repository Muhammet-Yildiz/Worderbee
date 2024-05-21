
'use client';
import { ReactNode } from 'react';
import { SWRConfig } from 'swr';
import {fetcher} from '@/services/fetcher';
import ToasterContext from '@/contexts/toaster-context';
export default function Providers({ children }: {children : ReactNode}) {

    return (
        <SWRConfig
            value ={{fetcher}}
        > 
         <ToasterContext />
            {children}
        </SWRConfig>
    );



}