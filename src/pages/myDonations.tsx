import { Box, Flex, Text, Grid, useDisclosure, IconButton, Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, Center, Stack, useToast } from '@chakra-ui/react'
import { Header } from '../components/header'
import { Footer } from '../components/footer'
import { CardHomerless, CardHomerlessProps } from '../components/cardHomeless'
import { ReactNode, useEffect, useState } from 'react'
import { SearchInput } from '../components/searchInput'
import { CiFilter } from 'react-icons/ci'
import { ArrowBackIcon } from '@chakra-ui/icons'
import { Logo } from '../components/logo'
import { checkBoxProps, InputCheckBox } from '../components/inputCheckBox'
import { ButtonMain } from '../components/button'

import { Checkbox, CheckboxGroup } from '@chakra-ui/react'
import { api } from '../services/api/axios'
import { useAuth } from '../hooks/useAuth'

interface filterProps {
   type: { persons: boolean, ongs: boolean }
   owner: { my: boolean, others: boolean }
}

export function MyDonations() {
   const [load, setLoad] = useState<boolean>(false)
   const [filterByName, setFilterByName] = useState("")
   const [filter, setFilter] = useState<filterProps>({ type: { persons: true, ongs: true }, owner: { my: true, others: true } })
   const { user, logOut } = useAuth()
   const [list, setList] = useState<CardHomerlessProps[]>([] as CardHomerlessProps[])

   const toast = useToast()
   const { isOpen, onOpen, onClose } = useDisclosure()


   async function getHomeless() {
      try {
         setLoad(true)
         setList([] as CardHomerlessProps[])
         const result = await api.get('/donates/get_my_activities/' + user.id).then(res => res.data)



         const resultList = []

         result.forEach(element => {

            resultList.push({
               type: element.type,
               title: element.title,
               city: element.local_by_donate.city,
               description: element.description,
               id: element.id,
               image: element.picture,
               link: `/homeless_help/${element.id}`,
               state: element.local_by_donate.state,
               date_ini: (element.type == "E") && format(new Date(element.start_date)),
               date_end: (element.type == "E") && format(new Date(element.end_date)),
               isOnwer: element.user_id == user.id
            }
            )
         });


         setList(resultList)
      } catch (error) {
         toast({
            title: error?.response.data.message,
            status: 'warning',
            duration: 5000,
            isClosable: true,
            position: 'top-right',

         })
      } finally {
         setLoad(false)
      }
   }


   function conditionOwner(v: CardHomerlessProps) {


      if ((!filter.owner.my && !filter.owner.others) || (filter.owner.my && filter.owner.others)){
         return true
      }
      if (filter.owner.my && v.isOnwer)
         return true
      if (filter.owner.others && !v.isOnwer)
         return true

      return false

   }
   

   function conditionType(v: CardHomerlessProps) {


      if ((!filter.type.ongs && !filter.type.persons) || (filter.type.ongs && filter.type.persons)){
         return true
      }
      if (filter.type.ongs && v.type == "E")
         return true
      if (filter.type.persons && v.type =="D")
         return true

      return false

   }


   function ListaCard() {
      const lists: ReactNode[] = []

      list.forEach((v) => {

         if (v.title.indexOf(filterByName) > -1 && conditionOwner(v) && conditionType(v)) {
            lists.push(<CardHomerless {...v} />)
         }
      })
      return lists
   }


   useEffect(() => {
      getHomeless()
   }, [])


   return (
      <Flex
         display={'flex'}
         flexDirection={'column'}
         alignItems={'center'}
         justifyContent={'center'}

         gap={15}>
         <Header />
         <Flex flexDirection={'column'} maxW={'1300px'}  >
            <Flex justifyContent={'space-between'} wrap={'wrap'} p={'10px'} gap={5} >
               <SearchInput setFilter={setFilterByName} />
               <IconButton
                  aria-label='Search'
                  bg={'primary'}
                  _hover={{ bg: 'primaryLight' }}
                  px={4}
                  icon={<CiFilter color='white' />}
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
                           { color: 'dark_light' }
                        }
                        onClick={onClose} />
                     <ModalHeader>
                        <Flex justifyContent={'center'} alignItems={'center'} flexDirection={'column'}>
                           <Logo width={'70px'} />
                        </Flex>
                     </ModalHeader>
                     <ModalBody>
                        <Center flexDirection={'column'} gap={5} mb={5}>
                           <Text fontSize={'h3'} textAlign={'center'}>Tipo:</Text>
                           <Stack spacing={5} direction='row'>
                              <Checkbox colorScheme='green' defaultChecked onChange={e => setFilter({ ...filter, type: { ...filter.type, persons: e.target.checked } })}>
                                 Pessoas
                              </Checkbox>
                              <Checkbox colorScheme='green' defaultChecked onChange={e => setFilter({ ...filter, type: { ...filter.type, ongs: e.target.checked } })}>
                                 Ongs
                              </Checkbox>
                           </Stack>
                        </Center >
                        <Center flexDirection={'column'} gap={5} mb={5}>
                           <Text fontSize={'h3'} textAlign={'center'}>Dono:</Text>
                           <Stack spacing={5} direction='row'>
                              <Checkbox colorScheme='green' defaultChecked onChange={e => setFilter({ ...filter, owner: { ...filter.owner, my: e.target.checked } })}>
                                 Meu
                              </Checkbox>
                              <Checkbox colorScheme='green' defaultChecked onChange={e => setFilter({ ...filter, owner: { ...filter.owner, others: e.target.checked } })}>
                                 Outros
                              </Checkbox>
                           </Stack>
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
