import { Box, Flex, Text, Grid } from '@chakra-ui/react'
import { Header } from '../components/header'
import { Footer } from './../components/footer'
import { CardHomerless, CardHomerlessProps } from './../components/cardHomeless'
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
      link:`/homeless_help/${2}`
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
      <Flex  
      display={'flex'}  
      flexDirection={'column'} 
      alignItems={'center'}
      justifyContent={'center'}
      gap={5}>
         <Header />
            <Flex flexDirection={'column'} maxW={'1400px'}>
               <Flex justifyContent={'flex-end'}   p={'30px'} >
                  <Box p={2}></Box>
                  <SelectMain text='Selecione'
                     border={'1px solid'}
                     borderColor={'dark'} 
                     bg={'Primary'}
                     maxW={'200px'}
                  option={[{value:'option1',label:'Todos'},
                  {value:'option2',label:'Pessoas'},
                  {value:'option3',label:'ONGS'}]}>
                  </SelectMain>
                  
               </Flex>
               
               <Flex
                  w={'100%'}
                  maxW={'1300px'}
                  m={['0 auto']}
                  gap={20}
                  p={'30px'}
                  flexWrap={'wrap'}
                  justify={'center'}
               >
                  {ListaCard()}
               </Flex>
               <Footer />
            </Flex>
      </Flex>
   )
}