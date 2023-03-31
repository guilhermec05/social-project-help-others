import { Box, Flex, Text, Grid } from '@chakra-ui/react'
import { Header } from '../components/header'
import { Footer } from './../components/footer'
import { CardHomerless, CardHomerlessProps } from './../components/cardHomeless'
import { FilterHome } from './../components/filterHome'
import { ReactNode } from 'react'
import { SelectMain } from '../components/select'

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
      <Flex height={'100vh'} 
      display={'flex'}  
      flexDirection={'column'} 
      gap={5}>
         <Header />
         <Flex justifyContent={'flex-end'}  px={10} >
            <Box p={2}></Box>
            <SelectMain text='Selecione'
               border={'1px solid'}
               borderColor={'dark'} 
               maxW={'200px'}
              option={[{value:'option1',label:'Todos'},
              {value:'option2',label:'Pessoas'},
              {value:'option3',label:'ONGS'}]}>
            </SelectMain>
            
         </Flex>
         
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
