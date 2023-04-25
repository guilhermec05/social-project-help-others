import { Box, Flex, Text, ModalContent, Image, HStack, useDisclosure, Modal, ModalOverlay, ModalHeader, ModalBody, ModalFooter } from '@chakra-ui/react'
import { Header } from '../components/header'
import { Footer } from '../components/footer'

import { Back } from "../components/back";
import { ButtonMain } from '../components/button'
import location_icon from "../assets/location-icon.png";
import { InputCheckBox } from '../components/inputCheckBox';
import { ArrowBackIcon } from '@chakra-ui/icons';
import { Logo } from '../components/logo';


export function HomlessProfileReport() {

   const { isOpen, onOpen, onClose } = useDisclosure()

   return (
      <Flex
      display={'flex'}  
      flexDirection={'column'} 
      alignItems={'center'}
      justifyContent={'center'}
      
      gap={5}>
         <Header hasAdm={true}/>
            
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
                           <ButtonMain fontSize={'h6'} title="Delete" px={'30px'} bg={'danger'} />
                           <ButtonMain fontSize={'h6'} title="Ok" px={'30px'} bg={'primaryDark'} />
                        </Flex>

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
                                       
                                       <Text fontSize={'h3'}>Titulo</Text>
                                       <Text fontSize={'p'}>Ut reprehenderit voluptate laborum excepteur Lorem qui nisi dolore aute nisi cillum magna aliqua. 
                                       Deserunt sint et cupidatat nisi ex aute cupidatat officia ea labore qui. Id occaecat laborum consequat nisi officia. 
                                       In labore laborum enim ex aliquip. Cupidatat pariatur do excepteur sit Lorem veniam. Occaecat cupidatat nulla esse commodo culpa quis incididunt consectetur nulla.
                                       Qui Lorem labore adipisicing ex tempor do. Exercitation Lorem et non sit anim labore. Excepteur ad sint consectetur consequat ut amet pariatur Lorem. Labore labore eu 
                                       nisi voluptate sit fugiat Lorem fugiat. Nostrud eu occaecat nisi ad anim incididunt consequat magna.
                                       Voluptate aliquip voluptate nulla nulla. Nostrud aliquip ex adipisicing sit laboris consectetur. Aliqua dolor
                                        aute ex enim incididunt laboris excepteur irure ad nisi. Eu officia voluptate fugiat
                                       nisi laboris eiusmod adipisicing. Et eu do culpa magna aute tempor consectetur est non est. Deserunt eu laboris do eiusmod.
                                       Esse deserunt Lorem proident sunt sint qui veniam exercitation culpa sint elit. Sint cillum mollit est eiusmod fugiat veniam quis irure
                                       et do deserunt ea. Lorem aute consequat ea eiusmod quis id dolore aliqua. Cillum ut nisi duis et ex adipisicing minim tempor.</Text>
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
