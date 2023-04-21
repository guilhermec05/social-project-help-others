import { Box, Flex, Text, ModalContent, Image, HStack, useDisclosure, Modal, ModalOverlay, ModalHeader, ModalBody } from '@chakra-ui/react'
import { Header } from '../components/header'
import { Footer } from '../components/footer'
import  React  from 'react'
import { Back } from "../components/back";
import { ButtonMain } from '../components/button'
import location_icon from "../assets/location-icon.png";
import { InputCheckBox } from '../components/inputCheckBox';
import { ArrowBackIcon } from '@chakra-ui/icons';
import { Logo } from '../components/logo';


export function HomlessProfileDonateProcess() {

   const { isOpen, onOpen, onClose } = useDisclosure()
   const [hasImage,setHasImage] = React.useState<boolean>(false)

   return (
      <Flex
      display={'flex'}  
      flexDirection={'column'} 
      alignItems={'center'}
      justifyContent={'center'}
      w={'100vw'}
      gap={5}>
         <Header hasAdm={false}/>
            
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
                           <Text mt={8} fontSize={'h7'} fontWeight={'300'}>
                              {'Está em situação de rua a 1 ano, veio do interior do RS em busca de emprego.'}
                           </Text>
                        </Flex>

                        <Box mt={6} display={'flex'} flexDirection={'column'} gap={5}>
                           <Text fontSize={'h7'} fontWeight={'900'} >
                              Itens necessitados:
                           </Text>
                           <InputCheckBox listCheckBox={[{value:'1', label:'Comida',checked:true},{value:'7', label:'Cobertor'},{value:'6', label:'Saco de dormir'},{value:'55', label:'Sabonete'},{value:'4', label:'Escova de dentes'}]} isDisabled/>

                        </Box>

                        <Flex justifyContent={'absolute'} mt={4} gap={5}>
                           <ButtonMain fontSize={'h6'} title="Delete" px={'30px'} bg={'danger'} _hover={{bg:'danger'}} />
                           <ButtonMain fontSize={'h6'} title="Ok" px={'30px'} bg={'primaryDark'} />
                        </Flex>

                        <Flex mt={6} w={'100%'}  fontSize={'xs'} fontWeight={'900'}   textAlign={'center'}>

                           {/* <Complaint /> */}
                           <HStack  >
                              <Text fontWeight='bold' justifyContent={'center'} alignItems={'center'}  >
                                 Para visualizar o processo de doação:
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
                                    <Flex justifyContent={'center'} alignItems={'flex-start'} flexDirection={'column'} gap={6}>
                                       <Text fontSize={'h5'} fontWeight={800}>situação: Doado</Text>
                                       <Text fontSize={'h6'} fontWeight={800}>Itens a ser doado</Text>
                                       <InputCheckBox listCheckBox={[{value:'1', label:'Comida',checked:true},{value:'7', label:'Cobertor'},{value:'6', label:'Saco de dormir'},{value:'55', label:'Sabonete'},{value:'4', label:'Escova de dentes'}]} isDisabled />
                                       <Text fontSize={'h6'} fontWeight={800}>foto da doação</Text>
                                       {hasImage?  <Image
                                          src={'https://bit.ly/dan-abramov'}
                                          boxSize={'800px'}
                                          h={'370px'}
                                          alt="homeless image"
                                       />:'Não houve doação no momento'}
                                     
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
