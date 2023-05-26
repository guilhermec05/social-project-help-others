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


interface resultProps{
   id:string
   title:string
   description:string
   start_date:string
   isOwner:boolean
   picture:string
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

   const  {id} = useParams();

   const {user} = useAuth()
   const [load, setLoad] = useState<boolean>(false)
   const [checkBox, setCheckBox] = useState<checkBoxProps[]>([] as checkBoxProps[])
   const [donates,setDonates] = useState<resultProps>({} as resultProps)
   const [typeSubmit,setTypeSubmit] = useState<"D"|"U"|"I">()


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
         result.process_begin = true

         const itens = donate.item_by_donate.map(v =>{
            const len = v.item_donate_by_user.filter(values => values.item_donate.id_item ==  v.item.id && values.user.id == user.id)
            result.process_begin = v.item_donate_by_user.filter(process => process.status == "A").lenght > 0
            
            if(len.lenght > 0){
               return {
                  value:v.id,
                  label:v.item.name,
                  quantity:v.quantity,
                  checked:true
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


         setCheckBox(itemSelect)
         setDonates(result)
         
      } catch (error) {
         
      }finally{
         setLoad(false)
      }
   }


   useEffect(()=>{
      getHomeProfile()
      console.log(donates)
      
   },[])


   const schema = yup.object({
      checks: yup.array().min(1,"você deve selecionar um").required("você deve selecionar um").typeError("você deve selecionar um"),
    });

   
   type FormData = yup.InferType<typeof schema>

  
   const { handleSubmit,register,formState:{errors}} = useForm<FormData>({
       resolver: yupResolver(schema)
     });

   function onSubmit(data: FormData){
      console.log(data)

      try {
         setLoad(true)
         switch (typeSubmit) {
            case "I":
               
               break;
            case "U":
               
               break;
            case "D":
               
               break;
            default:
               break;
         }

      } catch (error) {
         
      }finally{
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
                                 isDisabled={false} 
                                 canEdit={donates.isOwner && !donates.process_begin}
                              />

                           </Box>

                           <Flex justifyContent={'absolute'} mt={4} gap={10}>
                              {donates.isOwner? 
                              (<>
                                 <ButtonMain fontSize={'h6'}  title="Editar" px={'30px'} bg={'primaryDark'} type={'submit'} isDisabled={ donates.process_begin } onClick={e => setTypeSubmit("U")} />
                                 <ButtonMain fontSize={'h6'}  title="Excluir" px={'30px'} bg={'danger'} type={'submit'} isDisabled={ donates.process_begin }  onClick={e => setTypeSubmit("D")}/>
                              </> ):
                              <ButtonMain fontSize={'h6'}  title="Doar" px={'30px'} bg={'primaryDark'} type={'submit'} onClick={e => setTypeSubmit("I")} />  }
                              
                           </Flex>

                           <Flex mt={6} w={'100%'}  fontSize={'xs'} fontWeight={'900'}   textAlign={'center'}>
                                 {!donates.isOwner && <Complaint /> }
                              

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
