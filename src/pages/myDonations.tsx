import { Box, Flex, Text, Grid, useDisclosure, IconButton, Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, Center, Stack } from '@chakra-ui/react'
import { Header } from '../components/header'
import { Footer } from '../components/footer'
import { CardHomerless, CardHomerlessProps } from '../components/cardHomeless'
import { ReactNode, useState } from 'react'
import { SearchInput } from '../components/searchInput'
import { CiFilter } from 'react-icons/ci'
import { ArrowBackIcon } from '@chakra-ui/icons'
import { Logo } from '../components/logo'
import { checkBoxProps, InputCheckBox } from '../components/inputCheckBox'
import { ButtonMain } from '../components/button'

import { Checkbox, CheckboxGroup } from '@chakra-ui/react'

export function MyDonations() {

   const [filterByName, setFilterByName] = useState()

   const { isOpen, onOpen, onClose } = useDisclosure()

   const card: CardHomerlessProps = {
      id: '1',
      title: 'Ajude o José!',
      city: 'Porto Alegre',
      state: 'RS',
      description:
         'Está em situação de rua a 1 ano, veio do interior do RS em busca de emprego.',
      image: 'https://bit.ly/dan-abramov',
      link:`/process_donate/${2}`,
      type:"D"
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

      gap={15}>
         <Header />
            <Flex flexDirection={'column'} maxW={'1300px'}  >
               <Flex justifyContent={'space-between'}  wrap={'wrap'} p={'10px'} gap={5} >
                 <SearchInput />
                 <IconButton 
                     aria-label='Search' 
                     bg={'primary'} 
                     _hover={{bg:'primaryLight'}} 
                     px={4}
                     icon={<CiFilter  color='white' />} 
                     onClick={onOpen}
                  />
                   <Modal
                     // closeOnOverlayClick={false}
                     isOpen={isOpen}
                     onClose={onClose}
                     size={'sm'}>
                         <ModalOverlay />
                         <ModalContent p={5} >
                              <ArrowBackIcon 
                                 fontSize={'h3'}   
                                 cursor={'pointer'}
                                 _active={
                                       {color:'dark_light'}
                                 }
                                 onClick={onClose}/>
                                 <ModalHeader>
                                    <Flex justifyContent={'center'} alignItems={'center'} flexDirection={'column'}>
                                       <Logo width={'70px'} />
                                    </Flex>
                                 </ModalHeader>
                                 <ModalBody>
                                    <Center flexDirection={'column'} gap={5} mb={5}>
                                       <Text fontSize={'h3'} textAlign={'center'}>Tipo:</Text>
                                       <Stack spacing={5} direction='row'>
                                          <Checkbox colorScheme='green' defaultChecked>
                                             Pessoas
                                          </Checkbox>
                                          <Checkbox colorScheme='green' defaultChecked>
                                             Ongs
                                          </Checkbox>
                                       </Stack>
                                    </Center >
                                    <Center flexDirection={'column'} gap={5}  mb={5}>
                                       <Text fontSize={'h3'} textAlign={'center'}>Dono:</Text>
                                       <Stack spacing={5} direction='row'>
                                          <Checkbox colorScheme='green' defaultChecked>
                                             Meu
                                          </Checkbox>
                                          <Checkbox colorScheme='green' defaultChecked>
                                             Outros
                                          </Checkbox>
                                       </Stack>
                                    </Center>
                                    <Center>
                                       <ButtonMain fontSize={'p'} title="Filtrar" px={'30px'} bg={'primaryDark'} />   
                                    </Center>
                                 </ModalBody>
                           </ModalContent>
                                 
                  </Modal>
                  
               </Flex>
               
               <Flex
                 
                  w={'100%'}
                  maxW={'1300px'}
                  gap={20}
                  // border={'1px solid red'}
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
