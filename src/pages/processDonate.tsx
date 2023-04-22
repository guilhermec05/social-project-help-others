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

export function ProcessDonate() {


   return (
      <Flex
      display={'flex'}  
      flexDirection={'column'} 
      alignItems={'center'}
      justifyContent={'center'}
      w={'100vw'}
      gap={5}>
         <Header/>
            
            <Flex justifyContent={'flex-start'} maxW={'1400px'} w={'100%'}  p={'10px'} >
               <Back link={'/home'}/>
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
                        <Flex>
                           <Text mt={6} fontSize={'h6'} fontWeight={'700'} noOfLines={1}>
                              {'Status da doação: Ajudado'}
                           </Text>
                        </Flex>

                        <Box mt={6} display={'flex'} flexDirection={'column'} gap={5}>
                           <Text fontSize={'h7'} fontWeight={'900'} >
                              Itens necessitados:
                           </Text>
                           <InputCheckBox listCheckBox={[{value:'1', label:'Comida',checked:true},{value:'7', label:'Cobertor'},{value:'6', label:'Saco de dormir'},{value:'55', label:'Sabonete'},{value:'4', label:'Escova de dentes'}]}  />

                        </Box>

                        <Flex justifyContent={'absolute'} mt={4}>
                           <ButtonMain fontSize={'h6'} title="Doar" px={'30px'} bg={'primaryDark'} />
                        </Flex>

                        <Flex mt={6} w={'100%'}  fontSize={'xs'} fontWeight={'900'}   textAlign={'center'}>

                           <Complaint />

                        </Flex>
                     </Box>
                  </Box>
               </Flex>
               <Footer />
            </Flex>
      </Flex>
      
   )
}
