import {
    AlertDialog,
    AlertDialogBody,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogContent,
    AlertDialogOverlay,
    useDisclosure,
    Box,
} from '@chakra-ui/react'
import React, { ReactNode } from 'react'
import { ButtonMain } from './button'


interface AlertDiologConfim {
    title: string;
    text?: string
    children: ReactNode;
    func?: () => void
}

export function AlertDialogConfirm({ children, func,title,text}:AlertDiologConfim) {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const cancelRef = React.useRef()


    function confirm(){
        func()
        onClose()
    }

    return (
        <>
           <Box onClick={onOpen}  >
                {children}
            </Box>      
            <AlertDialog
                isOpen={isOpen}
                leastDestructiveRef={cancelRef}
                onClose={onClose}
            >
                <AlertDialogOverlay>
                    <AlertDialogContent>
                        <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                            {title}
                        </AlertDialogHeader>

                        <AlertDialogBody>
                           {text}
                        </AlertDialogBody>
                        <AlertDialogFooter>
                            <ButtonMain title='não' bg={'secondaryLight'} color={'dark'} ref={cancelRef} onClick={onClose}/>
                            <ButtonMain title='sim'  bg={'secondaryLight'} color={'dark'} onClick={e => confirm()} ml={3}/>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialogOverlay>
            </AlertDialog>
        </>


    )
}