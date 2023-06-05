import { Box, Flex, Text, Grid, useDisclosure, IconButton, Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, Center } from '@chakra-ui/react'
import { Header } from '../components/header'
import { Footer } from '../components/footer'
import { CardHomerless, CardHomerlessProps } from '../components/cardHomeless'
import { ReactNode, useState, useEffect } from 'react'
import { SelectMain } from '../components/select'
import { SearchInput } from '../components/searchInput'
import { CiFilter } from 'react-icons/ci'
import { ArrowBackIcon } from '@chakra-ui/icons'
import { Logo } from '../components/logo'
import { CheckBox } from '../components/checkBox'
import { InputCheckBox } from '../components/inputCheckBox'
import { ButtonMain } from '../components/button'
import { useAuth } from '../hooks/useAuth'
import { api } from '../services/api/axios'
import { format } from '../util/formatDate'

export function MyEvents() {
   const [list, setList] = useState <CardHomerlessProps[]>([] as CardHomerlessProps[])

   const { isOpen, onOpen, onClose } = useDisclosure()

   const {user} = useAuth()
   async function getEvents() {
      try {
         const result = await api.get(`/donates/get_list_events/${user.id}`).then(e => e.data)
         const resultList = []
         result.forEach(element => {
            resultList.push({
               title:element.title,
               city:element.local_by_donate.city,
               description:element.description,
               id:element.id,
               image:element.picture,
               link:`/homeless_help/${element.id}`,
               state:element.local_by_donate.state,
               date_ini:(element.type == "E") && format(new Date(element.start_date)),
               date_end:(element.type == "E") && format(new Date(element.end_date))
            }
         )
         })
         setList(resultList)
      } catch (e) {
         
      }
   }
   
   useEffect(() => {
      getEvents()
   }, [])

   function ListaCard() {
      const lists: ReactNode[] = []

      list.forEach((v) => lists.push(<CardHomerless  {...v} />))
      return lists
   }

   return (
      <Flex  
      display={'flex'}  
      flexDirection={'column'} 
      alignItems={'center'}
      justifyContent={'center'}

      gap={15}>
         <Header  hasNGOs/>
            <Flex flexDirection={'column'} maxW={'1300px'}  >
               {/* <Flex justifyContent={'space-between'}  wrap={'wrap'} p={'10px'} gap={5} >
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
                                       <InputCheckBox listCheckBox={[{value:'1', label:'Em andamento',checked:true},{value:'2', label:'Ongs',checked:true}]} />
                                    </Center >
                                    <Center>
                                      <ButtonMain fontSize={'p'} title="Filtrar" px={'30px'} bg={'primaryDark'} />                              
                                    </Center>
                                 </ModalBody>
                           </ModalContent>
                                 
                  </Modal>
                  
               </Flex>

               <Flex>
                  <Text fontSize={'h7'} fontWeight={'700'}  p={'10px'} mt={'20px'}>
                    Total de {'9'} eventos
						      </Text>
               </Flex> */}
               
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
            </Flex>
               <Footer />
           
      </Flex>
   )
}
