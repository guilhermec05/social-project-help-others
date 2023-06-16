import { Flex, Text,  Tabs, TabList, Tab, TabPanels, TabPanel, TableContainer, Table, Thead, Tr, Th, Tbody, Td, Icon, useDisclosure, useToast } from '@chakra-ui/react'
import { Header } from '../components/header'
import { Footer } from '../components/footer'
import { ReactNode } from 'react'
import { FaCheck } from 'react-icons/fa'
import { AiFillDelete, AiFillEye } from "react-icons/ai";
import { Link } from 'react-router-dom'
import { ExcludeComplaint } from '../components/excludePopup-Complaint'
import { useEffect,useState } from "react";
import { useAuth } from '../hooks/useAuth'
import { api } from '../services/api/axios'
import { Loading } from '../components/loading'
import { MinusIcon } from '@chakra-ui/icons'


export function HomeAdm() {
   interface tableReponse{
      type: 'ONGs'|'PESSOA'
      name:string
      document:string
      id:string
   }

   interface tableReponseDonate{
      titulo: string
      Origem:string
      Destino:string
      id:string,
      user_id:string
   }

   const [usersAcess,setUsersAcess] = useState<tableReponse[]>([] as tableReponse[] )
   const [donateProcess,setDonateProcess] = useState<tableReponseDonate[]>([] as tableReponseDonate[] )
   const [isLoading,setIsLoading] = useState<Boolean>(false)
  const {user,logOut} = useAuth()   
   const toast = useToast()

   function checkTypeUser(){
      if(user.type != 'A'){
         logOut()
         toast({
            title:'favor Acessar novamente',
            status: 'warning',
            duration: 5000,
            isClosable: true,
            position:'top-right',
        })


      }
   }


 

   
   useEffect(()=>{
      checkTypeUser()
      
   },[])


   function TableAccess(){

      useEffect(()=>{
         AccessSelect()       
      },[])
   

      async function AccessSelect(){
         try {
         setIsLoading(true)
         const dataRes:tableReponse[] = []    
         const user =  await api.get('user/get_users_blocked').then(res=> res.data)
       
         setUsersAcess([])
         user.forEach(e=>{
           
            if(e.type == "N"){
               if(e.Persons){
                  e.type = "Pessoas"
                  e.document = e.Persons.cpf
                  e.name = e.Persons.name+" "+e.Persons.lastName
               }
   
               if(e.NGOS){
                  e.type = "ONGS"
                  e.document = e.Persons.cnpj
               }
            }else{
               e.type = "ADM"
               e.name = e.user
               e.document = <MinusIcon/>
            }

            dataRes.push({id: e.id, document:e.document, name:e.name,type:e.type})

         })

         setUsersAcess(dataRes)
       
         resultTbody()


         return true
            
         } catch (error) {
            console.log(error)
            toast({
               title: error?.response.data.message,
               status: 'error',
               duration: 5000,
               isClosable: true,
               position:'top-right',
           })
         }finally{
            setIsLoading(false)
         }
         
      }


      async function ApprovedUser(id:string){
         try { 
            setIsLoading(true)
            await api.get(`user/approved/${id}`).then(res=> res.data)
   
            toast({
               title: "usuário aprovado com sucesso",
               status: 'success',
               duration: 5000,
               isClosable: true,
               position:'top-right',
               
           })
   
           await AccessSelect()
         } catch (error) {
            toast({
               title: error?.response.data.message,
               status: 'error',
               duration: 5000,
               isClosable: true,
               position:'top-right',
               
           })
         }finally{
            setIsLoading(false)
         }
      }

      async function RejectUser(id:string){
         try {
            setIsLoading(true)
            await api.get(`user/rejected/${id}`).then(res=> res.data)
            toast({
               title: "usuário recusado com sucesso",
               status: 'success',
               duration: 5000,
               isClosable: true,
               position:'top-right',
               
           })
   
           await AccessSelect()
         } catch (error) {
            toast({
               title: error?.response.data.message,
               status: 'error',
               duration: 5000,
               isClosable: true,
               position:'top-right',
               
           })
         }finally{
            setIsLoading(false)
         }
      }


      function resultTbody(){
         const list: ReactNode[] = []
         if(usersAcess){
            usersAcess.forEach(v=>{
               list.push(<Tr>
                  <Td>{v.type}</Td>
                  <Td>{v.name}</Td>
                  <Td>{v.document}</Td>
                  <Td>
                     <Icon as={FaCheck}
                        color={'primary'}
                        fontSize={'h3'}
                        cursor={'pointer'}
                        onClick={e => ApprovedUser(v.id)}
                        _active={{color:'dark_light'}}
                     />
                      <Icon as={AiFillDelete}
                        color={'danger'}
                        fontSize={'h3'}
                        cursor={'pointer'}
                        onClick={e => RejectUser(v.id)}
                        _active={{color:'danger_dark'}}
                     />
   
                  </Td>
               </Tr>)
            })  
         }
          

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
      useEffect(()=>{
         AccessSelect()       
      },[])
   

      async function AccessSelect(){
         try {
         setIsLoading(true)
         const data:tableReponseDonate[] = []    
         const donates =  await api.get('donates/donate_process').then(res=> res.data)
         
         
         setDonateProcess([])
         donates.forEach(e=>{

            data.push({id: e.id,titulo:e.title, Origem:e.origin, Destino:  e.destiny, user_id: e.user_id})

         })

         setDonateProcess(data)
         // setUsersAcess(data)
         
         // console.log(donateProcess)

         resultTbodyDonation()
         return true
            
         } catch (error) {
            console.log(error)
            toast({
               title: error?.response.data.message,
               status: 'error',
               duration: 5000,
               isClosable: true,
               position:'top-right',
           })
         }finally{
            setIsLoading(false)
         }
         
      }


      function resultTbodyDonation(){
         const list: ReactNode[] = []
         donateProcess.forEach(v=>{
            list.push(<Tr>
               <Td>{v.titulo}</Td>
               <Td>{v.Origem}</Td>
               <Td>{v.Destino}</Td>
               <Td>
     

                   <Link to={`/donate_process/${v.id}/user/${v.user_id}`}>
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
                  {resultTbodyDonation()}
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


   

   return (<Flex
      display={'flex'}  
      flexDirection={'column'} 
      alignItems={'center'}
      justifyContent={'center'}
      gap={5}>
         {isLoading && <Loading />}
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
            </Flex>
            <Footer />
      </Flex>
   )
}
