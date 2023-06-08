import { Box, Flex, useToast } from '@chakra-ui/react'
import { Header } from '../components/header'
import { Footer } from './../components/footer'
import { CardHomerless, CardHomerlessProps } from './../components/cardHomeless'
import { ReactNode } from 'react'
import { SelectMain } from '../components/select'
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { useEffect,useState } from "react";
import { useAuth } from '../hooks/useAuth'
import { api } from '../services/api/axios'
import { Loading } from '../components/loading'

export function Home() {
   const [load, setLoad] = useState<boolean>(false)
   const [filter, setFilter] = useState<"E"|"D">()
   const {user,logOut} = useAuth()

   const toast = useToast()
   const [list,setList] = useState<CardHomerlessProps[]>([] as CardHomerlessProps[])

   function format(inputDate) {
      let date, month, year;
    
      date = inputDate.getDate();
      month = inputDate.getMonth() + 1;
      year = inputDate.getFullYear();
    
        date = date
            .toString()
            .padStart(2, '0');
    
        month = month
            .toString()
            .padStart(2, '0');
    
      return `${date}/${month}/${year}`;
    }
    

   function checkTypeUser(){
      if(user.type != 'P'){
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

   async function getHomeless(){
      try {
         setLoad(true)
         setList([] as CardHomerlessProps[])
         const result = await api.post('/donates/get_list_homeless',{
            adress:{
               state:user.state_or_province,
               city: user.city
            }
         }).then(res => res.data)
         
         const resultList = []

         result.forEach(element => {
            
            resultList.push({
                  type: element.type,
                  title:element.title,
                  city:element.local_by_donate.city,
                  description:element.description,
                  id:element.id,
                  image:element.picture,
                  link:`/homeless_help/${element.id}`,
                  state:element.local_by_donate.state,
                  date_ini:(element.type == "E") && format(new Date(element.start_date)),
                  date_end:(element.type == "E") && format(new Date(element.end_date)),
                  isOnwer: element.user_id ==  user.id
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
            position:'top-right',
            
        })
      }finally{
         setLoad(false)
      }
   }


   useEffect(()=>{
      checkTypeUser()
      getHomeless()
   },[])

   const schema = yup.object({
      select: yup.string()
   })

   type FormData = yup.InferType<typeof schema>

   const { control} = useForm<FormData>({
      resolver: yupResolver(schema)
    });


   function ListaCard() {
      const lists: ReactNode[] = []

      list.forEach((v) => {
         if(!filter || v.type == filter){
            lists.push(<CardHomerless {...v} />)
         }  
      } )
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
         {load &&<Loading/>}
            <Flex flexDirection={'column'} maxW={'1400px'}>
               <Flex justifyContent={'flex-end'}   p={'30px'} >
                  <Box p={2}></Box>
                  <SelectMain 
                     onChange={e => setFilter(e.target.value)}
                     useControl={control}
                     name={'select'}
                     text='Selecione'
                     border={'1px solid'}
                     borderColor={'dark'} 
                     bg={'Primary'}
                     maxW={'200px'}
                  option={[
                  {value:'D',label:'Pessoas'},
                  {value:'E',label:'ONGS'}]}>
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
            </Flex>
               <Footer />
      </Flex>
   )
}
