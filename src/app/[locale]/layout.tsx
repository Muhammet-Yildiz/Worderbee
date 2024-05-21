import type { Metadata } from 'next'
import { useLocale } from 'next-intl';
import { notFound } from 'next/navigation';
import Providers from './providers';
import { nunito } from '@/lib/fonts';


export const metadata: Metadata = {
  title: 'Word Bee',
  description: 'Word Bee is a word game for everyone.',
}

export default function RootLayout({ children, params }: {
  children: React.ReactNode, params: { locale: string }
}) {

  const locale = useLocale();

  if (params.locale !== locale) {
    notFound();
  }


  return (
    <html lang={locale} >
      <body className={nunito.className} 
        style={{
          margin: 0,
          padding: 0,
          boxSizing: 'border-box',
        }}
      >

        <Providers>
          {children}
        </Providers>
       
      </body>
    </html>
  )
}
