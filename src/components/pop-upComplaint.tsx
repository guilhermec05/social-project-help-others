import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
  } from '@chakra-ui/react'
import { Button, ButtonProps } from '@chakra-ui/react'
import { ButtonMain } from "../components/button";
import { useDisclosure } from '@chakra-ui/react'
import { Back } from './back';


export function Complaint() {
    const { isOpen, onOpen, onClose } = useDisclosure()
  
    return (
      <>
        <Button onClick={onOpen}>Open Modal</Button>
        <ButtonMain fontSize={'h6'} title="Doar"  p={'10px'}/>
         
        <Modal
          closeOnOverlayClick={false}
          isOpen={isOpen}
          onClose={onClose}
        >
          <ModalOverlay />
          <ModalContent>
          <Back onClick={onClose}/>
            <ModalHeader>
                Por qual motivo você está denunciando este anuncio ?</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
            
            </ModalBody>
            <ButtonMain alignContent={'left'} fontSize={'h6'} title="Enviar"  p={'10px'}/>
            <ModalFooter display={'flex'}>

            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    )
  }