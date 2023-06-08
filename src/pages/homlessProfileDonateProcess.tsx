import { Box, Flex, Text, ModalContent, Image, HStack, useDisclosure, Modal, ModalOverlay, ModalHeader, ModalBody, useToast } from '@chakra-ui/react'
import { Header } from '../components/header'
import { Footer } from '../components/footer'
import  React, { useEffect, useState }  from 'react'
import { Back } from "../components/back";
import { ButtonMain } from '../components/button'
import location_icon from "../assets/location-icon.png";
import { checkBoxProps, InputCheckBox } from '../components/inputCheckBox';
import { Icon } from '@chakra-ui/react'

import {MdOutlineEscalatorWarning} from 'react-icons/md'
import { StepsMain } from '../components/steps';
import { ExcludeHomless } from '../components/excludePopup-ProfileHomless'
import { useNavigate, useParams } from 'react-router-dom';
import { api } from '../services/api/axios';
import { CalendarIcon, DownloadIcon } from '@chakra-ui/icons';
import {saveAs} from "file-saver";
import { format } from '../util/formatDate';


interface HomlessProfileDonateProcessProps{
   id:string
   title:string
   description:string
   picture:string
   proof:string
   date_ini?:string,
   date_end?:string,
   email:string,
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
   item:{id:string,quantity:string,name:string}[]
 
}

export function HomlessProfileDonateProcess() {

   const toast = useToast()
   const navigate = useNavigate();
   
   const  {id,user_id} = useParams();
   const [donates,setDonates] = useState<HomlessProfileDonateProcessProps>({} as HomlessProfileDonateProcessProps)


   function HandleDownload(picture:string){
      const sufix = Date.now()+"_"+Math.round(Math.random() * 1e9)
      saveAs(picture,sufix)
     }

   const initial = async ()=>{
      

      try {
         const displayShow :HomlessProfileDonateProcessProps = {} as HomlessProfileDonateProcessProps

         const result =  await api.get(`item_donates/get_donate_process_by_user/${id}/user_id/${user_id}`).then(res => res.data)
         displayShow.id = result.id
         displayShow.title = result.title
         displayShow.description = result.description
         displayShow.locale = result.local_by_donate
         displayShow.date_ini = result.start_date
         displayShow.date_end = result.end_date
         displayShow.proof = result.item_by_donate[0].item_donate_by_user[0].picture
         displayShow.picture = result.picture
         displayShow.email = result.item_by_donate[0].item_donate_by_user[0].user.email
         displayShow.item = result.item_by_donate.map(v =>{
            
            return {
               id:v.id,
               name:v.item.name,
               quantity:v.quantity
            }
         })


         setDonates(displayShow)
      } catch (error) {
         toast({
            title: error?.response.data.message,
            status: 'error',
            duration: 5000,
            isClosable: true,
            position:'top-right',
            
        })
      }
   }

   async function applyDonation(){
      try {
         await api.put(`item_donates/apply_donation/${donates.id}`,{items:donates.item.map(v => v.id)}).then(res=> res.data)

         toast({
            title: "processo de doação aplicada com sucesso",
            status: 'success',
            duration: 5000,
            isClosable: true,
            position:'top-right',
            
        })

        navigate('/home_adm')
      } catch (error) {
         toast({
            title: error?.response.data.message,
            status: 'error',
            duration: 5000,
            isClosable: true,
            position:'top-right',
            
        })
      }
   }

   async function desableDonation(){
      try {
         await api.put(`item_donates/desable_process`,{items:donates.item.map(v => v.id)}).then(res=> res.data)

         toast({
            title: "doação de doação com sucesso",
            status: 'success',
            duration: 5000,
            isClosable: true,
            position:'top-right',
            
        })

        navigate('/home_adm')
      } catch (error) {
         toast({
            title: error?.response.data.message,
            status: 'error',
            duration: 5000,
            isClosable: true,
            position:'top-right',
            
        })
      }
   }

   useEffect(()=>{
      initial()
   },[])


   return (
      <Flex
      display={'flex'}  
      flexDirection={'column'} 
      alignItems={'center'}
      justifyContent={'center'}

      gap={5}>
         <Header hasAdm={true}/>
            
            <Flex justifyContent={'flex-start'} w={'100%'}  p={'10px'} >
               <Back link={'/home_adm'}/>
            </Flex>
            <Flex flexDirection={'column'} >
               
               <Flex
                  w={'100%'}
                  maxW={'1301px'}
                  m={['0 auto']}
                  gap={10}
                  p={'20px'}
                  flexWrap={'wrap'}
               >
                  <Box maxW={'850px'}  overflow="hidden">
                     <Image
                        src={donates.picture}
                        boxSize={'800px'}
                        h={'370px'}
                        alt="homeless image"
                     />
                     <Box m={5}>
                        <Text mt={6} fontSize={'h5'} fontWeight={'700'} noOfLines={1}>
                           {donates.title}
                        </Text>
                        <Flex>
                           <Image mt={8} mr={3} src={location_icon} />
                           <Text mt={8} fontSize={'h6'}>
                              {donates?.locale?.street} , {donates?.locale?.number} - {donates?.locale?.district} - {donates?.locale?.city} - {donates?.locale?.state}
                           </Text>
                        </Flex>
                        <Flex my={5} gap={3} alignItems={'center'} justifyContent={'center'}>
                              {(donates.date_end && donates.date_ini)  && <><Text fontSize={'h6'}><CalendarIcon m={1}/>{format(new Date(donates.date_ini))}</Text><Text fontSize={'h6'}>-</Text><Text fontSize={'h6'}><CalendarIcon m={1}/>{format(new Date(donates.date_end))}</Text></>}
                           </Flex>
                        <Flex align={"end"}>
                           <Text mt={8} fontSize={'p'} fontWeight={'300'}>
                              {donates.description}
                           </Text>
                        </Flex>

                        <Box mt={6} display={'flex'} flexDirection={'column'} gap={5}>
                        <Text mt={6} fontSize={'sx'} fontWeight={'700'} noOfLines={1}>
                              Doação feita por: { donates.email}
                           </Text>
                           <Text mt={6} fontSize={'h5'} fontWeight={'700'} noOfLines={1}>
                              Processo de doação:
                           </Text>
                           <StepsMain variant='circles' state={2}/>
                           {/* <InputCheckBox listCheckBox={[{value:'1', label:'Comida',checked:true},{value:'7', label:'Cobertor'},{value:'6', label:'Saco de dormir'},{value:'55', label:'Sabonete'},{value:'4', label:'Escova de dentes'}]} isDisabled/> */}
                           <Text fontSize={'h6'} fontWeight={'900'} >
                              Itens da Doação:
                           </Text>
                           <Flex flexDirection={'column'}>
                              {donates?.item && donates?.item.map(v =>{
                                 return<><Text fontSize={'h6'}>{v.name} - {v.quantity}</Text></> 
                              })}
                           </Flex>
                           <Flex>
                              <ButtonMain title='Baixar Foto da Doação' leftIcon={<DownloadIcon />}  onClick={e => HandleDownload(donates.proof)}/>
                           </Flex>
                        </Box>

                        <Flex justifyContent={'absolute'} mt={4} gap={5}>
                           
                           <ButtonMain fontSize={'h6'} title="Ok" px={'30px'} bg={'primaryDark'} onClick={applyDonation} />
                           <ButtonMain fontSize={'h6'} title="Delete" px={'30px'} bg={'danger'} _active={{bg:'danger'}} _hover={{bg:'danger_dark'}}  onClick={desableDonation} />
                        </Flex>

                       
                     </Box>
                  </Box>
               </Flex>
            </Flex>
               <Footer />
      </Flex>
      
   )
}
