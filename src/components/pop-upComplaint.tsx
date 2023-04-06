import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  HStack,
} from '@chakra-ui/react'
import { Button, ButtonProps } from '@chakra-ui/react'
import { ButtonMain } from "../components/button";
import { useDisclosure } from '@chakra-ui/react'
import { Back } from './back';
import { Textarea } from '@chakra-ui/react'
import { InputMain } from "./input";
import { Text } from '@chakra-ui/react'
import { Logo } from "../components/logo";
import { Flex, Spacer } from '@chakra-ui/react'
import { TextAreaMain } from './textArea';
import { ArrowBackIcon } from '@chakra-ui/icons';



export function Complaint() {
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <>
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
            <Flex justifyContent={'center'} alignItems={'center'} flexDirection={'column'}>
              <Text fontSize={'h6'} fontWeight='bold' mb='1rem' justifyContent={'center'} alignItems={'center'}>
                Por qual motivo você esta<br/>denunciando este anúncio ?
              </Text>
            </Flex>
            <TextAreaMain name='Texto' w={'450px'} />
            <InputMain mt={5} name="Email" w={'450px'} h={'50px'} type={'email'}/>
          </ModalBody>

          <Flex justifyContent={'center'} alignItems={'center'} flexDirection={'column'} >
            <ModalFooter paddingBottom={5}>
              <ButtonMain fontSize={'h6'} title="Enviar" bg={'primaryDark'} p={'25px'} w={'100%'} maxW={'200px'} onClick={e => submit(e)} />
            </ModalFooter>
          </Flex>
        </ModalContent>
      </Modal>
    </>
  )
}