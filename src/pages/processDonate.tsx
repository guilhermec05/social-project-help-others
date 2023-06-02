import { Box, Flex, Text, Grid, Image } from '@chakra-ui/react'
import { Header } from '../components/header'
import { Footer } from '../components/footer'
// import { CardDonate } from '../components/InputBox'
// import { ReactNode } from 'react'
import { Back } from "../components/back";
import { ButtonMain } from '../components/button'
import { Complaint } from '../components/pop-upComplaint'
import location_icon from '../assets/location-icon.png'
import { InputCheckBox } from '../components/inputCheckBox';
import { StepsMain } from '../components/steps';
import { InputFile } from '../components/inputFile';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { useEffect } from 'react';
import { api } from '../services/api/axios';
import { useAuth } from '../hooks/useAuth';

export function ProcessDonate() {
   const {user} = useAuth()
   async function getEvents() {
      try {
         const result = await api.get(`/donates/get_list_events/${user.id}`).then(e => e.data)
         console.log(result)
      } catch (e) {
         
      }
   }
   
   useEffect(() => {
      getEvents()
   }, [])

   const schema = yup.object({
      checks: yup.array().min(1,"você deve selecionar um").typeError(""),
      images:yup.string().required("o campo não deve estar vazio")
    });


    
  type FormData = yup.InferType<typeof schema>

  const listBox =[{value:'1', label:'Comida',checked:true},{value:'7', label:'Cobertor'},{value:'6', label:'Saco de dormir'},{value:'55', label:'Sabonete'},{value:'4', label:'Escova de dentes'}]


  const { handleSubmit,register, control ,formState:{errors}    } = useForm<FormData>({
      resolver: yupResolver(schema)
    });


  function onSubmit(data: FormData){
      // alert(submit)
       console.log(data )
      // navigate('/home')
      
  }


   return (
      <Flex
      display={'flex'}  
      flexDirection={'column'} 
      alignItems={'center'}
      justifyContent={'center'}
      gap={5}>
         <Header/>
            
            <Flex justifyContent={'flex-start'} maxW={'1400px'} w={'100%'}  p={'10px'} >
               <Back link={'/my_donation'}/>
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
                  <Box maxW={'850px'}  overflow="hidden">
                     <form onSubmit={handleSubmit(onSubmit)}>

                     <Image
                        src={'https://bit.ly/dan-abramov'}
                        boxSize={'800px'}
                        h={'370px'}
                        alt="homeless image"
                     />
                     <Box m={5}>
                        <Text mt={6} fontSize={'h5'} fontWeight={'700'} noOfLines={1}>
                           {'Ajude o José'}
                        </Text>
                        <Flex>
                           <Image mt={8} mr={3}  w={30} h={30} src={location_icon} />
                           <Text mt={8} fontSize={'h6'}>
                              {'Rua Silveira'}, {'500'} - {'São João'}, {'Porto Alegre'} - {'RS'}
                           </Text>
                        </Flex>
                        <Flex align={"end"}>
                           <Text mt={8} fontSize={'h7'} fontWeight={'300'}>
                              {'Está em situação de rua a 1 ano, veio do interior do RS em busca de emprego.'}
                           </Text>
                        </Flex>
                        <Flex direction={'column'} gap={5}>
                           <Text mt={6} fontSize={'h6'} fontWeight={'700'} noOfLines={1}>
                              Processo de doação:
                           </Text>
                           <StepsMain variant='circles' state={1}/>
                        </Flex>

                        <Box mt={6} display={'flex'} flexDirection={'column'} gap={5}>
                           <Text fontSize={'h7'} fontWeight={'900'} >
                              Itens necessitados:
                           </Text>
                           <InputCheckBox  useControl={register("checks")}     name={'checks'}     error={errors} listCheckBox={listBox} isDisabled={true}/>

                        </Box>
                        

                        <Flex justifyContent={'center'} direction={'column'} mt={4} gap={5}  maxW={'500px'}  width="100%">
                           <InputFile useControl={control} name="images" placeholder='selecione uma imagem' />
                           <ButtonMain fontSize={'h6'} title="Enviar" px={'30px'} bg={'primaryDark'} w={'100px'} type={'submit'}/>
                        </Flex>
                        </Box>   
                     </form>
                   

                        <Flex mt={6} w={'100%'}  fontSize={'xs'} fontWeight={'900'}   textAlign={'center'}>

                           <Complaint />

                        </Flex>
                     </Box>
                 
               </Flex>
               <Footer />
            </Flex>
      </Flex>
      
   )
}
