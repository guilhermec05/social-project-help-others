import { Flex, Text, Grid, Tabs, TabList, Tab, TabPanels, TabPanel, TableContainer, Table, Thead, Tr, Th, Tbody, Td, Icon, useDisclosure, Modal, ModalOverlay, ModalHeader, ModalBody, ModalFooter, ModalContent, Center } from '@chakra-ui/react'
import { Header } from '../components/header'
import { Footer } from '../components/footer'
import { ReactNode } from 'react'
import { FaCheck } from 'react-icons/fa'
import { AiFillDelete, AiFillEye } from "react-icons/ai";
import { Link } from 'react-router-dom'
import { ExcludeComplaint } from '../components/excludePopup-Complaint'
import { IconButton } from '@chakra-ui/react'
import { Button } from '@chakra-ui/react'

export function HomeAdm() {
   // const card: CardHomerlessProps = {
   //    id: '1',
   //    title: 'Ajude o José!',
   //    city: 'Porto Alegre',
   //    state: 'RS',
   //    description:
   //       'Está em situação de rua a 1 ano, veio do interior do RS em busca de emprego.',
   //    image: 'https://bit.ly/dan-abramov',
   // }

   const { isOpen, onOpen, onClose } = useDisclosure()

   function TableAccess(){

      interface tableReponse{
         type: 'ONGs'|'PESSOA'
         name:string
         document:string
         id:string
      }

      const reponse:tableReponse[] = [
         {
            id:'1',
            type:'ONGs',
            document:'111211112',
            name:'ong1'
         },
         {
            id:'2',
            type:'PESSOA',
            document:'111211112',
            name:'joaozinho'
         }
      ]


      function resultTbody(){
         const list: ReactNode[] = []
         reponse.forEach(v=>{
            list.push(<Tr>
               <Td>{v.type}</Td>
               <Td>{v.name}</Td>
               <Td>{v.document}</Td>
               <Td>
                  <Icon as={FaCheck}
                     color={'primary'}
                     fontSize={'h3'}
                     cursor={'pointer'}
                     _active={{color:'dark_light'}}
                  />

                  <ExcludeComplaint />
               </Td>
            </Tr>)
         })   

         return list
      }

      return(
         <TableContainer>
            <Table variant='striped' colorScheme='green' size={'lg'}  w={'1200px'}>
               <Thead>
                  <Tr>
                     <Th>Tipo</Th>
                     <Th>Nome</Th>
                     <Th>Documento</Th>
                     <Th>Ações</Th>
                  </Tr>
               </Thead>
               <Tbody>
                  {resultTbody()}
               </Tbody>
            </Table>
         </TableContainer>
      ) 
   }


   function TableDonation(){


      interface tableReponse{
         titulo: string
         Origem:string
         Destino:string
         id:string
      }

      const reponse:tableReponse[] = [
         {
            id:'1',
            titulo:'titulo 1',
            Origem:'usuário 1',
            Destino:'usuário 2'
         },
         {
            id:'1',
            titulo:'titulo 2',
            Origem:'usuário 1',
            Destino:'usuário 2'
         }
      ]


      function resultTbody(){
         const list: ReactNode[] = []
         reponse.forEach(v=>{
            list.push(<Tr>
               <Td>{v.titulo}</Td>
               <Td>{v.Origem}</Td>
               <Td>{v.Destino}</Td>
               <Td>
                  <Icon as={FaCheck}
                     color={'primary'}
                     fontSize={'h3'}
                     cursor={'pointer'}
                     _active={{color:'dark_light'}}
                  />
                  <ExcludeComplaint />

                   <Link to={'/donate_process/1'}>
                     <Icon as={AiFillEye}
                        color={'primary'}
                        fontSize={'h3'}
                        cursor={'pointer'}
                        _active={{color:'dark_light'}}
                        />
                   </Link>
                  

               </Td>
            </Tr>)
         })   

         return list
      }



      return(
         <TableContainer>
            <Table variant='striped' colorScheme='green' size={'lg'}  w={'1200px'}>
               <Thead>
                  <Tr>
                     <Th>titulo</Th>
                     <Th>Origem</Th>
                     <Th>Destino</Th>
                     <Th>Ações</Th>
                  </Tr>
               </Thead>
               <Tbody>
                  {resultTbody()}
               </Tbody>
            </Table>
         </TableContainer>
      ) 
   }

   function TableReport(){

   

      interface tableReponse{
         titulo: string
         observacao:any
         user:string
         postagemTitulo:string
         id:string
      }

      const reponse:tableReponse[] = [
         {
            id:'1',
            titulo:'titulo 1',
            observacao:'Laborum elit dolore sint amet sit.',
            user:'usuário 2',
            postagemTitulo:'postagem 1'
         },
        {
         id:'1',
         titulo:'titulo 1',
         observacao:<Text noOfLines={2} w={'300px'} >Lorem cupidatat eu consequat exercitation aliquip culpa exercitation fugiat deserunt elit ipsum.
         Sunt excepteur irure anim sit. Lorem ut voluptate voluptate laborum minim in eiusmod. Dolore in tempor elit do.
          Sint veniam minim reprehenderit laborum culpa duis excepteur qui est fugiat non. Aute fugiat ipsum quis 
          reprehenderit. Magna pariatur tempor adipisicing aliquip voluptate tempor in 
          ipsum sit.Esse ea dolore esse do consectetur cupidatat cillum officia cillum. Mollit laboris 
          commodo velit non Lorem sint magna velit commodo dolore cillum adipisicing commodo ex. 
          In nostrud quis ut sunt exercitation proident magna pariatur. 
          Labore aute veniam ex non pariatur ad Lorem cillum ea proident.
           Magna nulla laborum elit reprehenderit dolore. Ullamco id non esse ex. Dolor minim non aute velit anim adipisicing nisi ex.</Text>,
         user:'usuário 2',
         postagemTitulo:'postagem 1'
         },
         {
            id:'1',
            titulo:'titulo 1',
            observacao:'Laborum elit dolore sint amet sit.',
            user:'usuário 2',
            postagemTitulo:'postagem 1'
         },
         {
            id:'1',
            titulo:'titulo 1',
            observacao:'Laborum elit dolore sint amet sit.',
            user:'usuário 2',
            postagemTitulo:'postagem 1'
         }
      ]


      function resultTbody(){
         const list: ReactNode[] = []
         reponse.forEach(v=>{
            list.push(<Tr>
               <Td>{v.titulo}</Td>
               <Td>{v.observacao}</Td>
               <Td>{v.user}</Td>
               <Td ><Text noOfLines={[1,2,3]} >{v.postagemTitulo}</Text></Td>
               <Td>
                  <Icon as={FaCheck}
                     color={'primary'}
                     fontSize={'h3'}
                     cursor={'pointer'}
                     _active={{color:'dark_light'}}
                     
                  />
                  
                  <ExcludeComplaint />

                  <Link to={'/report_profile/1'}>
                     <Icon as={AiFillEye}
                        color={'primary'}
                        fontSize={'h3'}
                        cursor={'pointer'}
                        _active={{color:'dark_light'}}
                     />
                  </Link>
                   

               </Td>
            </Tr>)
         })   

         return list
      }

      return(
         <TableContainer whiteSpace={'normal'}  >
            <Table variant='striped' colorScheme='green' size={'lg'}  w={'1200px'}>
               <Thead>
                  <Tr>
                     <Th>titulo</Th>
                     <Th>Observação</Th>
                     <Th>usuário</Th>
                     <Th>postagem</Th>
                     <Th>Ações</Th>
                  </Tr>
               </Thead>
               <Tbody>
                  {resultTbody()}
               </Tbody>
            </Table>
         </TableContainer>
      ) 
   }


   // const list: CardHomerlessProps[] = [
   //    card,
   //    card,
   //    card,
   //    card,
   //    card,
   //    card,
   //    card,
   //    card,
   //    card,
   // ]

   // function ListaCard() {
   //    const lists: ReactNode[] = []

   //    list.forEach((v) => lists.push(<CardHomerless {...v} />))
   //    return lists
   // }

   return (<Flex
      display={'flex'}  
      flexDirection={'column'} 
      alignItems={'center'}
      justifyContent={'center'}
      gap={5}>
         <Header hasAdm={true} />
            <Flex flexDirection={'column'} maxW={'1400px'}>
               <Flex justifyContent={'flex-end'}   p={'30px'} >
               </Flex>
               <Flex
                  w={'100%'}
                  maxW={'1300px'}
                  gap={10}
                  p={'30px'}
                  // border={'1px solid red'}
                  
               >
                  <Tabs  colorScheme='green'>
                     <TabList w={'1200px'}   >
                        <Tab>Acessos</Tab>
                        <Tab>Doações</Tab>
                        <Tab>Denúcias</Tab>
                     </TabList>
                     <TabPanels>
                        <TabPanel>
                           {TableAccess()}
                        </TabPanel>
                        <TabPanel>
                           {TableDonation()}
                        </TabPanel>
                        <TabPanel>
                           {TableReport()}
                        </TabPanel>
                     </TabPanels>
                  </Tabs>
               </Flex>
               <Footer />
            </Flex>
      </Flex>
   )
}
