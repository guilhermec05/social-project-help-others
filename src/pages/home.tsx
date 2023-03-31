import { Box, Flex, Text, Grid } from '@chakra-ui/react'
import { Header } from '../components/header'
import { Footer } from './../components/footer'
import { CardHomerless, CardHomerlessProps } from './../components/cardHomeless'
import { FilterHome } from './../components/filterHome'
import { ReactNode } from 'react'

export function Home() {
   const card: CardHomerlessProps = {
      id: '1',
      title: 'Ajude o José!',
      city: 'Porto Alegre',
      state: 'RS',
      description:
         'Está em situação de rua a 1 ano, veio do interior do RS em busca de emprego.',
      image: 'https://bit.ly/dan-abramov',
   }

   const list: CardHomerlessProps[] = [
      card,
      card,
      card,
      card,
      card,
      card,
      card,
      card,
      card,
   ]

   function ListaCard() {
      const lists: ReactNode[] = []

      list.forEach((v) => lists.push(<CardHomerless {...v} />))
      return lists
   }

   return (
      <Flex height={'100vh'} display={'flex'} flexDirection={'column'}>
         <Header />
         <FilterHome />
         <Flex
            w={'100%'}
            maxW={'1400px'}
            m={['0 auto']}
            gap={10}
            p={'30px'}
            flexWrap={'wrap'}
            justify={'center'}
         >
            {ListaCard()}
         </Flex>
         <Footer />
      </Flex>
   )
}
