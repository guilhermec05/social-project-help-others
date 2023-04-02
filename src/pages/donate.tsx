import { Box, Flex, Text, Grid } from '@chakra-ui/react'
import { Header } from '../components/header'
import { Footer } from './../components/footer'
import { CardDonate, CardDonateProps } from './../components/cardDonate'
import { ReactNode } from 'react'
import { Back } from "../components/back";


export function HomlessProfile() {
   const card: CardDonateProps = {
      id: '1',
      title: 'Ajude o José!',
      street: 'Rua Silveira',
      number: '500',
      neighborhood: 'São João',
      city: 'Porto Alegre',
      state: 'RS',
      description:
         'Está em situação de rua a 1 ano, veio do interior do RS em busca de emprego.',
      image: 'https://bit.ly/dan-abramov',
      title_2: 'Itens necessitados:',
      item_1: 'Comida',
      item_2: 'Cobertor',
      item_3: 'Saco de dormir',
      item_4: 'Sabonete',
      item_5: 'Toalha',
      item_6: 'Escova de dentes',
      item_7: 'Pasta de dente',
   }

   const list: CardDonateProps[] = [
      card,
   ]

   function ListaCard() {
      const lists: ReactNode[] = []

      list.forEach((v) => lists.push(<CardDonate {...v} />))
      return lists
   }

   return (
      <Flex
      display={'flex'}  
      flexDirection={'column'} 
      alignItems={'center'}
      justifyContent={'center'}
      w={'100vw'}
      gap={5}>
         <Header/>
         <Back link={'/home'}/>
         
            <Flex flexDirection={'column'} maxW={'1400px'}>
               <Flex justifyContent={'flex-end'}   p={'30px'} >
               </Flex>
               
               <Flex
                  w={'100%'}
                  maxW={'1301px'}
                  m={['0 auto']}
                  gap={10}
                  p={'30px'}
                  flexWrap={'wrap'}
               >
                  {ListaCard()}
               </Flex>
               <Footer />
            </Flex>
      </Flex>
      
   )
}
