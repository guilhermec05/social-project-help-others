import { Box, Flex, Text, ModalContent, Image, HStack, useDisclosure, Modal, ModalOverlay, ModalHeader, ModalBody, ModalFooter, useToast } from '@chakra-ui/react'
import { Header } from '../components/header'
import { Footer } from '../components/footer'

import { Back } from "../components/back";
import { ButtonMain } from '../components/button'
import location_icon from "../assets/location-icon.png";
import { InputCheckBox } from '../components/inputCheckBox';
import { ArrowBackIcon } from '@chakra-ui/icons';
import { Logo } from '../components/logo';
import { ExcludeHomless } from '../components/excludePopup-ProfileHomless'
import { useNavigate, useParams } from 'react-router-dom';
import   { useEffect, useState }  from 'react'
import { api } from '../services/api/axios';
import { Loading } from '../components/loading';


interface HomlessProfileReportProps{
   id:string
   title:string
   description:string
   picture:string
   date_ini?:string,
   date_end?:string,
   email:string,
   reports:{
      ids:string,
      title:string,
      text:string
   },
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
   item:{id:string,quantity:string,name:string}[],
 
 
}

export function HomlessProfileReport() {

   const { isOpen, onOpen, onClose } = useDisclosure()
   const toast = useToast()
   const  {id} = useParams();
   const navigate = useNavigate();
   const [donates,setDonates] = useState<HomlessProfileReportProps>({} as HomlessProfileReportProps)
   const [isLoading,setIsLoading] = useState<Boolean>(false)

   async function initial(){
      try {
         setIsLoading(true)
         const displayShow :HomlessProfileReportProps = {} as HomlessProfileReportProps
         const result = await api.get(`report/get_report/${id}`).then(res=> res.data)
         displayShow.id = result.donates.id
         displayShow.title = result.donates.title
         displayShow.description = result.donates.description
         displayShow.locale = result.donates.local_by_donate
         displayShow.date_ini = result.donates.start_date
         displayShow.date_end = result.donates.end_date
         displayShow.picture = result.donates.picture
         displayShow.item = result.donates.item_by_donate.map(v =>{   
            return {
               id:v.id,
               name:v.item.name,
               quantity:v.quantity
         }})

         displayShow.reports = {
            ids: result.id,
            text: result.text,
            title: result.title
         }

         displayShow.locale = result.donates.local_by_donate
         
         setDonates(displayShow)
      } catch (error) {
         toast({
            title: error?.response.data.message,
            status: 'error',
            duration: 5000,
            isClosable: true,
            position:'top-right',
            
        })
        navigate('/home_adm')
      }finally{
         setIsLoading(false)
      }
   }

   async function brockDonate(){
      try {
         setIsLoading(true)
         await api.put('report/disable_donate',{id:donates.id, text: donates.reports.title })
      } catch (error) {
         toast({
            title: error?.response.data.message,
            status: 'error',
            duration: 5000,
            isClosable: true,
            position:'top-right',
            
        })
        navigate('/home_adm')
      }finally{
         setIsLoading(false)
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
            {isLoading && <Loading />}
            <Flex justifyContent={'flex-start'} maxW={'1400px'} w={'100%'}  p={'10px'} >
               <Back link={'/home_adm'}/>
            </Flex>
            <Flex flexDirection={'column'} maxW={'1400px'}>
               
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
                        <Flex align={"end"}>
                           <Text mt={8} fontSize={'h7'} fontWeight={'300'}>
                              {donates.description}
                           </Text>
                        </Flex>

                        <Box mt={6} display={'flex'} flexDirection={'column'} gap={5}>
                           <Text fontSize={'h7'} fontWeight={'900'} >
                              Itens necessitados:
                           </Text>
                           <Flex flexDirection={'column'}>
                              {donates?.item && donates?.item.map(v =>{
                                 return<><Text fontSize={'h6'}>{v.name} - {v.quantity}</Text></> 
                              })}
                           </Flex>
                        </Box>
                        <Box flexDirection={'row'}>
                        <Flex justifyContent={'absolute'} mt={4} gap={5} flexDirection={'row'}>
                           <ButtonMain 
                              fontSize={'sx'} 
                              title="Bloquear doação" 
                              px={'30px'} 
                              bg={'danger'} 
                              _hover={{bg:'danger_dark'}}
                              _active={{bg:'danger_dark'}} 
                              onClick={brockDonate}
                           />
                           <ExcludeHomless id={donates?.reports?.ids} text={donates?.reports?.text} title={donates?.reports?.title} setLoad={setIsLoading}/>
                        </Flex>                        

                        </Box>
                        
                        
                        
                        <Flex mt={6} w={'100%'}  fontSize={'xs'} fontWeight={'900'}   textAlign={'center'}>

                           {/* <Complaint /> */}
                           <HStack  >
                              <Text fontWeight='bold' justifyContent={'center'} alignItems={'center'}  >
                                 Para denunciar este anúncio:
                              </Text >
                              <Text onClick={onOpen} color={'danger'} variant='link' textDecoration={'underline'} cursor={'pointer'} >clique aqui!</Text>
                           </HStack>
                           <Modal
                           closeOnOverlayClick={false}
                           isOpen={isOpen}
                           onClose={onClose}
                           size={'2xl'}
                           
                           >
                           <ModalOverlay />
                              <ModalContent p={10} >
                                 <ArrowBackIcon 
                                    fontSize={'h3'}   
                                    cursor={'pointer'}
                                    _active={
                                          {color:'dark_light'}
                                    }
                                    onClick={onClose}
                                    
                                    />

                                 <ModalHeader mr={5}>
                                    <Flex justifyContent={'center'} alignItems={'center'} flexDirection={'column'}>
                                    <Logo width={'100px'} />
                                    </Flex>
                                 </ModalHeader>

                                 <ModalBody pb={6}>
                                    <Flex justifyContent={'center'} alignItems={'center'} flexDirection={'column'} gap={6}>
                                       
                                       <Text fontSize={'h3'}>{donates?.reports?.title}</Text>
                                       <Text fontSize={'p'}>{donates?.reports?.text}</Text>
                                    </Flex>
                                 </ModalBody>
                              </ModalContent>
                           </Modal>
                        </Flex>
                     </Box>
                  </Box>
               </Flex>
               <Footer />
            </Flex>
      </Flex>
      
   )
}
