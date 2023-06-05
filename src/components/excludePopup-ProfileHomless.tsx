import { Flex, Text, useDisclosure, Modal, ModalOverlay, ModalHeader, ModalBody, ModalContent, ModalFooter, Center, Icon, useToast } from '@chakra-ui/react'
import { ButtonMain } from "../components/button";
import { InputMain } from '../components/input';
import { TextAreaMain } from '../components/textArea';
import { ArrowBackIcon } from '@chakra-ui/icons'
import { Logo } from '../components/logo'
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { AiFillDelete, AiFillEye } from "react-icons/ai";
import { api } from '../services/api/axios';
import { useAuth } from '../hooks/useAuth';

class ExcludeHomlessProps{
    id:string
    title:string
    
    text:string
    setLoad:any
}


export function ExcludeHomless({id,title,text,setLoad}:ExcludeHomlessProps) {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const {user } = useAuth()
    const toast = useToast()

    const schema = yup.object({
        answer:yup.string().required("o campo não deve estar vazio").min(20, "A descrição deve conter pelo ou menos 20 caracteres"),
        })
        
    type FormData = yup.InferType<typeof schema>
        
    const { handleSubmit,control,setValue } = useForm<FormData>({
            resolver: yupResolver(schema)
    });
    
    async function onSubmit(data: FormData){
        
        try {
            onClose()
            setLoad(true)
            await api.post('report/answer_report',{id,title,text,answer:data.answer, user_id:user.id})
            setValue('answer','')
             toast({
                title: 'enviado com sucesso',
                status: 'success',
                duration: 5000,
                isClosable: true,
                position:'top-right',
                
            })
            
        } catch (error) {
            toast({
                title: error?.response.data.message,
                status: 'error',
                duration: 5000,
                isClosable: true,
                position:'top-right',
                
            })
        }finally{
            setLoad(false)
        }
    
    }

    return(
        <>
            <Flex justifyContent={'absolute'} mt={0} gap={5} flexDirection={'row'}>
                <ButtonMain 
                    fontSize={'sx'} 
                    title="Recusar Denuncia" 
                    px={'30px'} 
                    bg={'warning'} 
                    _hover={{bg:'warning_danger'}} 
                    _active={{bg:'warning_danger'}} 
                    onClick={onOpen}
                />
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
                                <Text fontSize={'h5'} textAlign={'center'} mb={5}>Informe o motivo da resposta da denuncia</Text>
                                <TextAreaMain useControl={control} name='answer' placeholder='Descricão' w={'450px'} />
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