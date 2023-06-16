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
      document:any
      id:string
   }

   interface tableReponseDonate{
      titulo: string
      Origem:string
      Destino:string
      id:string,
      user_id:string
   }

   interface tableReponseReport{
      titulo: string
      observacao:any
      user:string
      postagemTitulo:string
      id:string
   }

   const [usersAcess,setUsersAcess] = useState<tableReponse[]>([] as tableReponse[] )
   const [donateProcess,setDonateProcess] = useState<tableReponseDonate[]>([] as tableReponseDonate[] )
   const [reportTable,setReportTable] = useState<tableReponseReport[]>([] as tableReponseReport[] )
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

            console.log(e)
           
            if(e.type == "N"){
               if(e.Persons){
                  e.type = "Pessoas"
                  e.document = e.Persons.cpf
                  e.name = e.Persons.name+" "+e.Persons.lastName
               }
   
               if(e.NGOS){
                  e.type = "ONGS"
                  e.name = e.NGOS.name
                  e.document = e.NGOS.cnpj
               }

            }else{
               e.type = "ADM"
               e.name = e.user
               e.document = <MinusIcon/>
            }

            dataRes.push({id: e.id, document:e.document, name:e.name,type:e.type})
            console.log(dataRes)

         })
         console.log(dataRes)

         setUsersAcess(dataRes)
       
         resultTbody()


         return true
            
         } catch (error) {
            console.log(error)
            if(error?.response){
               toast({
                  title: error?.response.data.message,
                  status: 'error',
                  duration: 5000,
                  isClosable: true,
                  position:'top-right',
              })
               
            }
            
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
            if(error?.response){
               toast({
                  title: error?.response.data.message,
                  status: 'error',
                  duration: 5000,
                  isClosable: true,
                  position:'top-right',
              })
               
            }
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
            if(error?.response){
               toast({
                  title: error?.response.data.message,
                  status: 'error',
                  duration: 5000,
                  isClosable: true,
                  position:'top-right',
              })
               
            }
         }finally{
            setIsLoading(false)
         }
      }


      function resultTbody(){
         const list: ReactNode[] = []
         console.log(usersAcess)
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
          
         console.log(list)
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
            if(error?.response){
               toast({
                  title: error?.response.data.message,
                  status: 'error',
                  duration: 5000,
                  isClosable: true,
                  position:'top-right',
              })
               
            }
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

   

      useEffect(()=>{
         AccessSelect()       
      },[])
   

      async function AccessSelect(){
         try {
         setIsLoading(true)
         const data:tableReponseReport[] = []    
         const report =  await api.get('report/get_reports').then(res=> res.data)
         
         
         setReportTable([])
         report.forEach(e=>{

            data.push({id: e.id,titulo:e.title, observacao: e.text, user: e.user.user, postagemTitulo: e.donates.title})

         })
         setReportTable(data)
         // setDonateProcess(data)
         // setUsersAcess(data)
         
         // console.log(donateProcess)

         resultTbodyReport()
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


      function resultTbodyReport(){
         const list: ReactNode[] = []
         reportTable.forEach(v=>{
            list.push(<Tr>
               <Td>{v.titulo}</Td>
               <Td><Text noOfLines={2}>{v.observacao}</Text></Td>
               <Td>{v.user}</Td>
               <Td>{v.postagemTitulo}</Td>
               <Td>
     

                   <Link to={`/report_profile/${v.id}`}>
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
                     <Th w={'400px'}>Observação</Th>
                     <Th>usuário</Th>
                     <Th>postagem</Th>
                     <Th>Ações</Th>
                  </Tr>
               </Thead>
               <Tbody>
                  {resultTbodyReport()}
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
