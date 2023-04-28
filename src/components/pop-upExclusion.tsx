import React from 'react'

import {
  useDisclosure, 
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Button 
} from '@chakra-ui/react'



export function EventExclusion() {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const cancelRef = React.useRef()

  return (
    <>
      <Button colorScheme='red' onClick={onOpen}>
        Deletar este evento
      </Button>

      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize='lg' fontWeight='bold'>
              Você tem certeza que deseja deletar este evento?
            </AlertDialogHeader>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Não
              </Button>
              <Button bg={'primaryDark'} color={'white'} onClick={onClose} ml={3}>
                Sim
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  )
}