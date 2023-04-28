import { Box, Flex, Text, Grid, Image, HStack } from '@chakra-ui/react'
import { Header } from '../components/header'
import { Footer } from '../components/footer'
// import { CardDonate } from '../components/InputBox'
// import { ReactNode } from 'react'
import { Back } from '../components/back'
import { ButtonMain } from '../components/button'
import { EventExclusion } from '../components/pop-upExclusion'
import { DonorList } from '../components/pop-upDonorList'
import location_icon from '../assets/location-icon.png'
import { InputCheckBox } from '../components/inputCheckBox'
import { Link } from '@chakra-ui/react'
import facebook_Icon from '../assets/facebook-icon.png'
import instagram_Icon from '../assets/instagram-icon.png'

export function EditMyEvent() {
   // const card = {
   //    id: '1',
   //    title: 'Banho Solidário Poa!',
   //    street: 'Rua Conselheiro Travassos',
   //    number: '89',
   //    neighborhood: 'São Geraldo',
   //    city: 'Porto Alegre',
   //    state: 'RS',
   //    description:
   //       'O Banho Solidário é um projeto social, sem fins lucrativos, que visa proporcionar acesso a banho às pessoas em situação de rua. /n O Projeto Banho Solidário é um projeto social, sem fins lucrativos, não tem ligação com nenhuma instituição política, social ou religiosa, mas propõe-se a ajudar quem necessita e receber ajuda de que estiver disposto a participar do projeto, que abrange como público alvo as pessoas em situação de rua, visando proporcionar acesso a ducha com banho quente a tal população. O projeto será realizado com a construção de um reboque adaptado que funcionará como casa de banho, com compartimento masculino e feminino. O projeto foi desenvolvido visando contribuir para a melhoria da qualidade de vida e saúde das pessoas em situação de rua, garantindo um acesso mínimo a higiene pessoal e gerando dignidade humana.',
   //    image: 'https://bit.ly/dan-abramov',
   //    instagram: 'https://www.instagram.com/banhosolidariopoa/',
   //    facebook: 'https://www.facebook.com/banhosolidariors/',
   //    title_2: 'Itens necessitados:',
   //    item_1: 'Sabonete',
   //    item_2: 'Shampoo',
   //    item_3: 'Condicionador',
   //    item_4: 'Toalha',
   //    item_5: 'Escova de dentes',
   //    item_6: 'Pasta de dente',
   //    duration: '31 de maio de 2023'
   // }

   // const list: CardDonateProps[] = [
   //    card,
   // ]

   // function ListaCard() {
   //    const lists: ReactNode[] = []

   //    list.forEach((v) => lists.push(<CardDonate {...v} />))
   //    return lists
   // }


   return (
      <Flex
         display={'flex'}
         flexDirection={'column'}
         alignItems={'center'}
         justifyContent={'center'}
      
         gap={5}
      >
         <Header />

         <Flex
            justifyContent={'flex-start'}
            maxW={'1400px'}
            w={'100%'}
            p={'10px'}
         >
            <Back link={'/my_events'} />
         </Flex>
         <Flex flexDirection={'column'} maxW={'1400px'}>
            <Flex
               w={'100%'}
               maxW={'1301px'}
               m={['0 auto']}
               gap={10}
               // border={'1px solid red'}
               p={'20px'}
               flexWrap={'wrap'}
            >
               <Box maxW={'850px'}  overflow="hidden">
                  <Image
                     src={'https://bit.ly/dan-abramov'}
                     boxSize={'00px'}
                     w={'100%'}
                     h={'450px'}
                     alt="ONG image"
                  />
                  <Box m={5}>
                     <Text
                        mt={6}
                        fontSize={'h5'}
                        fontWeight={'700'}
                        noOfLines={1}
                     >
                        {'Banho Solidário Poa'}
                     </Text>
                     <Flex>
                        <Image mt={8} mr={3} w={30} h={30} src={location_icon} />
                        <Text mt={8} fontSize={'h6'}>
                           {'Rua Conselheiro Travassos'}, {'89'} -{' '}
                           {'São Geraldo'}, {'Porto Alegre'} - {'RS'}
                        </Text>
                     </Flex>
                     <Flex align={'end'}>
                        <Text mt={8} fontSize={'h7'} fontWeight={'300'}>
                           {
                              'O Banho Solidário é um projeto social, sem fins lucrativos, que visa proporcionar acesso a banho às pessoas em situação de rua. O Projeto Banho Solidário é um projeto social, sem fins lucrativos, não tem ligação com nenhuma instituição política, social ou religiosa, mas propõe-se a ajudar quem necessita e receber ajuda de que estiver disposto a participar do projeto, que abrange como público alvo as pessoas em situação de rua, visando proporcionar acesso a ducha com banho quente a tal população. O projeto será realizado com a construção de um reboque adaptado que funcionará como casa de banho, com compartimento masculino e feminino. O projeto foi desenvolvido visando contribuir para a melhoria da qualidade de vida e saúde das pessoas em situação de rua, garantindo um acesso mínimo a higiene pessoal e gerando dignidade humana.'
                           }
                        </Text>
                     </Flex>

                     <Text mt={5}>{'Redes Sociais: '}</Text>
                     <Box display={'flex'} flexDirection={'row'}>
                        <Link href="https://www.instagram.com/banhosolidariopoa/">
                           <Image w={'50px'} src={instagram_Icon} />
                        </Link>
                        <Link href="https://www.facebook.com/banhosolidariors/">
                           <Image w={'50px'} src={facebook_Icon} />
                        </Link>
                     </Box>
                     <Box
                        mt={6}
                        display={'flex'}
                        flexDirection={'column'}
                        gap={5}
                     >
                        <Text fontSize={'h7'} fontWeight={'900'}>
                           Itens necessitados:
                        </Text>
                        <InputCheckBox
                           listCheckBox={[
                              { value: '1', label: 'Sabonete' },
                              { value: '2', label: 'Shampoo' },
                              { value: '3', label: 'Condicionador' },
                              { value: '4', label: 'Toalha' },
                              { value: '5', label: 'Escova de dentes' },
                              { value: '6', label: 'Pasta de dente' },
                           ]}
                        />
                     </Box>

                     <Flex justifyContent={'absolute'} mt={4}>
                        <ButtonMain
                           fontSize={'h6'}
                           title="Doar"
                           px={'30px'}
                           bg={'primaryDark'}
                        />
                     </Flex>

                     <HStack mt={4} mb={4}>
                        <Text fontWeight='bold' justifyContent={'center'} alignItems={'center'}  >
                        {'Duração do evento: '}
                        </Text >
                        <Text >{'31 de maio de 2023'}</Text>
                     </HStack>

                     <DonorList />
         
                     <EventExclusion />

                  </Box>
               </Box>
            </Flex>
            <Footer/>
         </Flex>
      </Flex>
   )
}
