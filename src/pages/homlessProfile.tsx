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
import {  useParams } from 'react-router-dom';
import { api } from '../services/api/axios';
import { useAuth } from '../hooks/useAuth';
import { Loading } from '../components/loading';
import { useToast } from "@chakra-ui/react";
import { InputFile } from '../components/inputFile';
import { DonateList } from '../components/pop-upDonorList';


interface resultProps{
   id:string
   title:string
   description:string
   start_date:string
   isOwner:boolean
   picture:string
   my_process: boolean
   is_process_concluded:boolean
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
   }
   process_begin:boolean
   item:checkBoxProps[]
}

export function HomlessProfile() {
   const toast = useToast()
   const  {id} = useParams();

   const {user} = useAuth()
   const [load, setLoad] = useState<boolean>(false)
   const [checkBox, setCheckBox] = useState<checkBoxProps[]>([] as checkBoxProps[])
   const [donates,setDonates] = useState<resultProps>({} as resultProps)
   const [typeSubmit,setTypeSubmit] = useState<"D"|"U"|"I"|"P">()
   const [files, setFiles] = useState(null)

   
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
         result.start_date = donate.start_date
         result.isOwner = donate.user_id == user.id
         // result.isOwner = false
         result.locale = donate.local_by_donate

         result.picture = donate.picture
         result.process_begin = false
         result.my_process = false
         result.is_process_concluded = false
         let is_user_process = [] ;
   

         const itens = donate.item_by_donate.map(v =>{


            const len = v.item_donate_by_user.filter(values => values.user_id == user.id)
            
           
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

          

         setCheckBox(itemSelect.filter(v => ( is_user_process.length == 0 ||  is_user_process.includes(v.value)) ))
         setDonates(result)
         
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
      }))


      const body = {items,file:files}

      await api.put(`item_donates/concluded_item_by_donate`,body,{
         headers: {
            'Content-Type': 'multipart/form-data',
          }
      }).then(res => res.data)
     
      // console.log(da)
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
      console.log(files)
      console.log(data)
      
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
         <Header/>
         {load &&<Loading/>}
            
            <Flex justifyContent={'flex-start'} maxW={'1400px'} w={'100%'}  p={'10px'} >
               <Back link={'/home'}/>
            </Flex>
            <Flex flexDirection={'column'} maxW={'1400px'}>
               <form  onSubmit={handleSubmit(onSubmit)} >

                  <Flex
                     w={'100%'}
                     maxW={'1301px'}
                     m={['0 auto']}
                     gap={10}
                     p={'20px'}
                     flexWrap={'wrap'}
                  >
                     <Box maxW={'850px'} maxH={'1250px'} overflow="hidden">
                        <Image
                           src={( donates.picture || '')}
                           boxSize={'800px'}
                           h={'370px'}
                           alt="homeless image"
                        />
                        <Box m={5}>
                           <Text mt={6} fontSize={'h5'} fontWeight={'700'} noOfLines={1}>
                              {donates.title}
                           </Text>
                           <Flex>
                              <Image mt={8} mr={3}  w={30} h={30} src={location_icon} />
                              <Text mt={8} fontSize={'h6'}>
                                 {donates.locale?.street}, {donates.locale?.number} - {donates.locale?.district}, {donates.locale?.city} - {donates.locale?.state}
                              </Text>
                           </Flex>
                           <Flex align={"end"}>
                              <Text mt={8} fontSize={'h7'} fontWeight={'300'}>
                                 {donates.description}
                              </Text>
                           </Flex>

                           <Box mt={6} display={'flex'} flexDirection={'column'} gap={5}>
                              {/* <StepsMain variant='circles' state={1} /> */}
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
               <Footer />
            </Flex>
      </Flex>
      
   )
}
