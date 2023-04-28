import { Flex, Text, useDisclosure, Modal, ModalOverlay, ModalHeader, ModalBody, ModalContent, ModalFooter, Center, Icon } from '@chakra-ui/react'
import { ButtonMain } from "../components/button";
import { InputMain } from '../components/input';
import { TextAreaMain } from '../components/textArea';
import { ArrowBackIcon } from '@chakra-ui/icons'
import { Logo } from '../components/logo'
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { AiFillDelete, AiFillEye } from "react-icons/ai";



export function ExcludeHomless() {
    const { isOpen, onOpen, onClose } = useDisclosure()

    const schema = yup.object({
        title: yup.string()
            .min(10,"o campo deve conter pelo ou menos 10 caracteres")
            .required("o campo não deve estar vazio"),
        description:yup.string().required("o campo não deve estar vazio").min(20, "A descrição deve conter pelo ou menos 20 caracteres"),
    
        })
        
    type FormData = yup.InferType<typeof schema>
        
    const { handleSubmit,control } = useForm<FormData>({
            resolver: yupResolver(schema)
    });
    
    function onSubmit(data: FormData){
        console.log("aqui")
        console.log(data)
    
    }

    return(
        <>
            <Flex justifyContent={'absolute'} mt={0} gap={5} flexDirection={'row'}>
                <ButtonMain fontSize={'h6'} title="Delete" px={'30px'} bg={'danger'} _hover={{bg:'danger'}} onClick={onOpen}/>
            </Flex>

            <Modal
            closeOnOverlayClick={false}
            isOpen={isOpen}
            onClose={onClose}
            size={'2xl'}>
                <ModalOverlay />
                <ModalContent p={10} >
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <ArrowBackIcon 
                            fontSize={'h3'}   
                            cursor={'pointer'}
                            _active={
                                {color:'dark_light'}
                            }
                            onClick={onClose}
                        />

                        <ModalHeader>
                        <Flex justifyContent={'center'} alignItems={'center'} flexDirection={'column'}>
                            <Logo width={'100px'} />
                        </Flex>
                        </ModalHeader>

                        <ModalBody>
                            <Flex justifyContent={'center'} alignItems={'center'} flexDirection={'column'} mb={5}>
                                <Text fontSize={'h5'} textAlign={'center'} mb={5}>Informe o motivo da exclusão</Text>
                                <TextAreaMain useControl={control} name='description' placeholder='Descricão' w={'450px'} />
                            </Flex>
                        </ModalBody>

                        <Flex justifyContent={'center'} alignItems={'center'} flexDirection={'column'} >
                            <ModalFooter paddingBottom={5}>
                                <ButtonMain type={'submit'}  fontSize={'h6'} title="Enviar"  bg={'primaryDark'} p={'25px'} w={'100%'} maxW={'200px'} />
                            </ModalFooter>
                        </Flex>
                    </form>
                </ModalContent>     
            </Modal>
        </>
    )
}