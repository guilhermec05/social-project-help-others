import { Box, Flex, Text, ModalContent, Image, HStack, useDisclosure, Modal, ModalOverlay, ModalHeader, ModalBody } from '@chakra-ui/react'
import { Header } from '../components/header'
import { Footer } from '../components/footer'
import  React  from 'react'
import { Back } from "../components/back";
import { ButtonMain } from '../components/button'
import location_icon from "../assets/location-icon.png";
import { InputCheckBox } from '../components/inputCheckBox';
import { Icon } from '@chakra-ui/react'
// import { ArrowBackIcon } from '@chakra-ui/icons';
// import { Logo } from '../components/logo';
import {MdOutlineEscalatorWarning} from 'react-icons/md'
import { StepsMain } from '../components/steps';
import { ExcludeHomless } from '../components/excludePopup-ProfileHomless'


export function HomlessProfileDonateProcess() {

   const { isOpen, onOpen, onClose } = useDisclosure()
   const [hasImage,setHasImage] = React.useState<boolean>(false)

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
                           <Image mt={8} mr={3} src={location_icon} />
                           <Text mt={8} fontSize={'h6'}>
                              {'Rua Silveira'} , {'500'} - {'São João'} - {'Porto Alegre'} - {'RS'}
                           </Text>
                        </Flex>
                        <Flex align={"end"}>
                           <Text mt={8} fontSize={'p'} fontWeight={'300'}>
                              {'Está em situação de rua a 1 ano, veio do interior do RS em busca de emprego.'}
                           </Text>
                        </Flex>

                        <Box mt={6} display={'flex'} flexDirection={'column'} gap={5}>
                           <Text mt={6} fontSize={'h5'} fontWeight={'700'} noOfLines={1}>
                              Processo de doação:
                           </Text>
                           <StepsMain variant='circles' state={3}/>
                           <Text fontSize={'h6'} fontWeight={'900'} >
                              Itens necessitados:
                           </Text>
                           <InputCheckBox listCheckBox={[{value:'1', label:'Comida',checked:true},{value:'7', label:'Cobertor'},{value:'6', label:'Saco de dormir'},{value:'55', label:'Sabonete'},{value:'4', label:'Escova de dentes'}]} isDisabled/>
                           <Text fontSize={'h6'} fontWeight={'900'} >
                              Foto da Doação:
                           </Text>
                           <Text fontSize={'p'} fontWeight={'900'} color={'dark_light'}  >
                             <Icon as={MdOutlineEscalatorWarning} fontSize={'h1'} />  O Doador não fez a doação no momento 
                           </Text>
                        </Box>

                        <Flex justifyContent={'absolute'} mt={4} gap={5}>
                           <ExcludeHomless/>
                           <ButtonMain fontSize={'h6'} title="Ok" px={'30px'} bg={'primaryDark'} />
                        </Flex>

                       
                     </Box>
                  </Box>
               </Flex>
               <Footer />
            </Flex>
      </Flex>
      
   )
}
