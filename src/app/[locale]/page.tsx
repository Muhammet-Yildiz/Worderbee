import InformationSection from '@/containers/info-section'
import MainContent from '@/containers/main-content'
import Navbar from '@/containers/navbar'
import { getMessages } from 'next-intl/server';

export default async function Home() {

  const messages = await getMessages();

  return (
    <>
      <Navbar />
      <MainContent messages={messages}/>
      <InformationSection />
    </>

  )
}
