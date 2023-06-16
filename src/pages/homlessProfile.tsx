import { Box, Flex, Text, Grid, Image } from '@chakra-ui/react'
import { Header } from '../components/header'
import { Footer } from '../components/footer'
// import { CardDonate } from '../components/InputBox'
// import { ReactNode } from 'react'
import { Back } from "../components/back";
import { ButtonMain } from '../components/button'
import { Complaint } from '../components/pop-upComplaint'
import location_icon from '../assets/location-icon.png'
import { checkBoxProps, InputCheckBox } from '../components/inputCheckBox';
import { StepsMain } from './../components/steps';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { useState, useEffect } from 'react';
import {  useNavigate, useParams } from 'react-router-dom';
import { api } from '../services/api/axios';
import { useAuth } from '../hooks/useAuth';
import { Loading } from '../components/loading';
import { useToast } from "@chakra-ui/react";
import { InputFile } from '../components/inputFile';
import { DonateList } from '../components/pop-upDonorList';
import { CalendarIcon } from '@chakra-ui/icons';


interface resultProps{
   id:string
   title:string
   description:string
   isOwner:boolean
   picture:string
   my_process: boolean
   is_process_concluded:boolean,
   date_ini?:string,
   date_end?:string,
   locale:{
      city:string
      description:string
      district:string
      donate_id:string
      id:string
      number:string
      postal_code:string
      state:string
      street:string
   },
   complete_donate_by_donor:boolean,
   there_donate: boolean,
   process_begin:boolean,
   donation_done:boolean,
   number_process:number
   item:checkBoxProps[],
   owner:string
}

export function HomlessProfile() {
   const toast = useToast()
   const  {id} = useParams();
   const navigate = useNavigate();
   const {user} = useAuth()
   const [load, setLoad] = useState<boolean>(false)
   const [checkBox, setCheckBox] = useState<checkBoxProps[]>([] as checkBoxProps[])
   const [donates,setDonates] = useState<resultProps>({} as resultProps)
   const [typeSubmit,setTypeSubmit] = useState<"D"|"U"|"I"|"P"|"M">()
   const [files, setFiles] = useState(null)


   
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

      console.log(month)
    
      return `${date}/${month}/${year}`;
    }
    


   // console.log(checkBox)
   
   const schema = yup.object({
      checks: yup.array().min(1,"você deve selecionar um").required("você deve selecionar um").typeError("você deve selecionar um"),
      file:yup.string()
    });

   
   type FormData = yup.InferType<typeof schema>

  
   const { control,setValue,setError, clearErrors,handleSubmit,register,formState:{errors}} = useForm<FormData>({
       resolver: yupResolver(schema)
     });

   const   listBox:checkBoxProps[] = [
      {value:'1', label:'Cobertor'},
      {value:'2', label:'Comida'},
      {value:'3', label:'Desodorante'},
      {value:'4', label:'Sabonete'}
  ]


   const getHomeProfile = async ()=>{
      // 
      try {
         setLoad(true)
         const result = {} as resultProps

         const donate = await api.get(`donates/getDonate/${id}`).then(res => res.data)
         
         result.id = donate.id
         result.title = donate.title
         result.description = donate.description
         result.date_ini = donate.start_date
         result.date_end = donate.end_date
         result.isOwner = donate.user_id == user.id
         // result.isOwner = false
         result.locale = donate.local_by_donate

         result.picture = donate.picture
         result.process_begin = false
         result.my_process = false
         result.is_process_concluded = false
         result.donation_done = donate.status == "C"
         if(donate.type === "D"){
               result.owner = donate.user.Persons.name+" "+donate.user.Persons.lastName
         }else{
            result.owner = donate.user.NGOS.name
         }

         let is_user_process: string[] = [] ;
   

         const itens = donate.item_by_donate.map(v =>{


            const len = v.item_donate_by_user.filter(values => values.user_id == user.id)

            if(v.item_donate_by_user.filter(process => process.donate).length > 0){
               result.there_donate = true
            }

            if(v.item_donate_by_user.filter(values => values.user_id == user.id && v.is_donate).length > 0 ){
               result.complete_donate_by_donor = true
            }
            
            if(v.item_donate_by_user.filter(process => process.status == "A").length > 0){
               result.process_begin = true
            }

            if(v.item_donate_by_user.filter(process => process.donate  && process.user_id  == user.id ).length > 0){
           
               result.is_process_concluded = true
            }

            if(len.length > 0 ){
               result.my_process = true
               is_user_process.push(v.id)
               setValue('checks',['0'])
               clearErrors('checks')
            }
            
            if(result.process_begin){
               return {
                  value:v.id,
                  label:v.item.name,
                  quantity:v.quantity,
                  checked:(v.item_donate_by_user.filter(process => process.status == "A").length > 0)
               }
            }else{
               return {
                  value:v.id,
                  label:v.item.name,
                  quantity:v.quantity,
                  checked:false
               }
            }
            
         })
         
         itens.map(value => {   

          
            if(listBox.filter(v => v.label === value.label).length == 0) listBox.push({label:value.label, quantity:value.quantity,value:value.value })
            
            return listBox.map(V =>{
               if(V.label == value.label) V.quantity = value.quantity
               return V
            }) 
         })
         
         const itemSelect =  !result.process_begin && result.isOwner ?  listBox : itens

         result.number_process = 0

         if(result.isOwner ){
            
            if(result.process_begin){
               result.number_process = 1
            }

            if(result.there_donate){
               result.number_process = 2
            }
   
            
            if(result.donation_done){
               result.number_process = 3
            }
   
         }
   
         if(result.is_process_concluded || result.my_process){     
          
            if(result.my_process){
               result.number_process = 1
            }
   
   
            if(result.is_process_concluded){
               result.number_process = 2
            }
   
            
            if(result.complete_donate_by_donor){
               result.number_process = 3
            }
         }

         setCheckBox(itemSelect.filter(v => ( is_user_process.length == 0 ||  is_user_process.includes(v.value)) ))
         setDonates(result)
         // stepsDonation()
         
      } catch (error) {
         
      }finally{
         setLoad(false)
      }
   }



   useEffect(()=>{
      getHomeProfile()
   },[])



   async function Deleted(){
      await api.delete(`donates/inactivate_donate/${donates.id}`).then(res => res.data)
   }  


   async function EditDonate(data: FormData){
      const checkSelected = checkBox.filter((v,k) => data.checks.includes((k).toString()))
      const items = checkSelected.map(v => ({name:v.label, quantity:v.quantity}))
      await api.patch(`item_donates/edit_item_donate/${donates.id}`,{
         items
      })
   }

   async function beginProcessDonate(data: FormData){

      const checkSelected = checkBox.filter((v,k) => data.checks.includes((k).toString()))
      const items = checkSelected.map(v => ({
         id:v.value, 
         name:v.label, 
         quantity:v.quantity,
         user_id:user.id
      }))
   

      await api.post(`item_donates/insert_process_donate`,{
         items
      })
   }

   async function insertSubmitDonate(data: FormData){
      if(!data.file){
         setError("file",{message:"favor enviar uma foto"})
         
      }

      clearErrors("file")
      const items = checkBox.map(v => ({
         id:v.value, 
         name:v.label, 
         quantity:v.quantity,
         user_id:user.id
      })).filter(v => v.id)

      const body = {items,file:files}

      await api.put(`item_donates/concluded_item_by_donate`,body,{
         headers: {
            'Content-Type': 'multipart/form-data',
          }
      }).then(res => res.data)
     
      // navigate('/home')
      // console.log(da)
   }

   async function cancelDonate(){
      
      await api.get(`item_donates/cancel_process/${donates.id}/user_id/${user.id}`)

      
   }

   function actualState(){
      if(donates.isOwner){
         return <>
                  <ButtonMain fontSize={'h6'}  title="Editar" px={'30px'} bg={'primaryDark'} type={'submit'} isDisabled={ donates.process_begin } onClick={e => setTypeSubmit("U")} />
                  <ButtonMain fontSize={'h6'} 
                     title="Excluir" 
                     px={'30px'} 
                     bg={'danger'} 
                     type={'submit'} 
                     
                     isDisabled={ donates.process_begin }  
                     onClick={e => setTypeSubmit("D")}
                     _hover={{
                        bg:'danger'
                     }}
                  />
               </> 
      }else if(donates.my_process){
         return <Flex flexDirection={'column'} gap={10}>
             <InputFile
               name="file" 
               placeholderImg="escolha sua imagem ..." 
               useControl={control} 
               setFiles={setFiles}
               isDisabled={(donates.is_process_concluded)}
              />
              <Box display={'flex'} gap={2} flexWrap={'wrap'}>
                  <ButtonMain 
                     fontSize={'h6'}  
                     title="Concluir Doação" 
                     px={'30px'} 
                     bg={'primaryDark'} 
                     type={'submit'} 
                     isDisabled={(donates.is_process_concluded)}
                     onClick={e =>{ 
                        setTypeSubmit("P") 
                        setValue('checks',['0'])
                     }} 
                  />
                   <ButtonMain 
                     fontSize={'h6'}  
                     title="Cancelar Doação" 
                     px={'30px'} 
                     bg={'danger'} 
                     _hover={{bg:'danger_dark'}}
                     type={'submit'} 
                     isDisabled={(donates.is_process_concluded)}
                     onClick={e =>{ 
                        setTypeSubmit("M") 
                        setValue('checks',['0'])
                     }} 
                  />
              </Box>
            
         </Flex> 
      }else{
         return <ButtonMain 
                     fontSize={'h6'}  
                     title="Doar" 
                     px={'30px'} 
                     bg={'primaryDark'} 
                     type={'submit'} 
                     onClick={e => setTypeSubmit("I")} 
                     // isDisabled={donates.process_begin}
                  />
      }
   }

   

   async function onSubmit(data: FormData){    
      try {
         setLoad(true)
         switch (typeSubmit) {
            case "P":
               await insertSubmitDonate(data)
               break;
            case "I":
               await beginProcessDonate(data)
               break;
            case "U":
               await EditDonate(data)
               break;
            case "D":
               await Deleted()
               break;
            case "M":
               await cancelDonate()
               break;
            default:
               break;
         }

      } catch (error) {

         toast({
            title: error?.response.data.message,
            status: 'error',
            duration: 5000,
            isClosable: true,
            position:'top-right',
            
        })
         
      }finally{
         await getHomeProfile()
         setLoad(false)
      }    
         // data.checks.forEach(v => console.log(listBox[parseInt(v) - 1]) ) 
      
   }


   return (
      <Flex
      display={'flex'}  
      flexDirection={'column'} 
      alignItems={'center'}
      justifyContent={'center'}
   
      gap={5}>
         <Header hasNGOs={user.type == "N"} />
         {load &&<Loading/>}
            
            <Flex justifyContent={'flex-start'} maxW={'1400px'} w={'100%'}  p={'10px'} >
               <Back link={(user.type == "N")?'/my_events':'/home'}/>
            </Flex>
            <Flex flexDirection={'column'} maxW={'1400px'}>
               <form  onSubmit={handleSubmit(onSubmit)} >

                  <Flex
                     w={'100%'}
                     maxW={'1301px'}
                     m={['0 auto']}
                     gap={10}
                     p={'10px'}
                     flexWrap={'wrap'}
                  >
                     <Box maxW={'850px'} overflow="hidden">
                        <Image
                           src={( donates.picture || '')}
                           boxSize={'800px'}
                           h={'370px'}
                           alt="homeless image"
                        />
                        <Box m={5}>
                           <Text mt={6} fontSize={'h5'} fontWeight={'700'} noOfLines={1} >
                              {donates.title}
                           </Text>
                           <Flex>
                              <Image mt={8} mr={3}  w={30} h={30} src={location_icon} />
                              <Text mt={8} fontSize={'h6'}>
                                 {donates.locale?.street}, {donates.locale?.number} - {donates.locale?.district}, {donates.locale?.city} - {donates.locale?.state}
                              </Text>
                           </Flex>
                           <Flex my={5} gap={3} alignItems={'center'} justifyContent={'center'}>
                              {(donates.date_end && donates.date_ini)  && <><Text fontSize={'h6'}><CalendarIcon m={1}/>{format(new Date(donates.date_ini))}</Text><Text fontSize={'h6'}>-</Text><Text fontSize={'h6'}><CalendarIcon m={1}/>{format(new Date(donates.date_end))}</Text></>}
                           </Flex>
                           <Flex align={"end"}>
                              <Text mt={8} fontSize={'h7'}   fontWeight={'300'}>
                                 {donates.description}
                              </Text>
                           </Flex>
                          
                           <Box mt={6} display={'flex'} flexDirection={'column'} gap={5}>
                              <Box display={'flex'} gap={1}><Text  fontSize={'h7'} fontWeight={'900'} >criado por:</Text> <Text>{donates.owner}</Text> </Box>
                              {(donates.isOwner || ((donates.is_process_concluded || donates.my_process))) && <StepsMain state={donates.number_process}/> }
                              <Text fontSize={'h7'} fontWeight={'900'} >
                                 Itens necessitados:
                              </Text>
                              <InputCheckBox 
                                 useControl={register("checks")}  
                                 name={'checks'}  
                                 error={errors} 
                                 listCheckBox={checkBox}  
                                 setCheckBox={setCheckBox}  
                                 canEdit={donates.isOwner && !donates.process_begin}
                              />

                           </Box>

                           <Flex justifyContent={'absolute'} mt={4} gap={10}>
                              {actualState()}
                              
                           </Flex>

                           <Flex mt={6} w={'100%'}  fontSize={'xs'} fontWeight={'900'}   textAlign={'center'}>
                                 {!donates.isOwner && <Complaint id={donates.id} user_id={user.id} /> }
                                 {(donates.isOwner && (donates.process_begin || donates.is_process_concluded) &&  <DonateList donate_id={donates.id}/>)}
                                 

                           </Flex>
                        </Box>
                     </Box>
                  </Flex>
               </form>
            </Flex>
               <Footer />
      </Flex>
      
   )
}
