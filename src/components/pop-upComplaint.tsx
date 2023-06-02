import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  HStack,
  useToast,
} from '@chakra-ui/react'
import { ButtonMain } from "../components/button";
import { useDisclosure } from '@chakra-ui/react'
import { InputMain } from "./input";
import { Text } from '@chakra-ui/react'
import { Logo } from "../components/logo";
import { Flex, Spacer } from '@chakra-ui/react'
import { TextAreaMain } from './textArea';
import { ArrowBackIcon } from '@chakra-ui/icons';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { api } from '../services/api/axios';

interface ComplaintProps{
  id:string
  user_id:string
}

export function Complaint({id,user_id}:ComplaintProps) {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const toast = useToast()

  const schema = yup.object({
    title: yup.string()
        .min(10,"o campo deve conter pelo ou menos 10 caracteres")
        .required("o campo não deve estar vazio"),
    description:yup.string().required("o campo não deve estar vazio").min(30, "A descrição deve conter pelo ou menos 30 caracteres"),

  })
  

  type FormData = yup.InferType<typeof schema>

  
  const { handleSubmit,control,setValue } = useForm<FormData>({
      resolver: yupResolver(schema)
  });

  async function onSubmit(data: FormData){
    

    try {
      await api.post(`/donates/insert_reports/${id}`,{subject:data.title,description:data.description,user_id}).then(res=> res.data)
      setValue("title","")
      setValue("description","")
      toast({
        title: "enviado com sucesso",
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
    }
    
  }



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
            <form onSubmit={handleSubmit(onSubmit)}>
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
                <InputMain  useControl={control}  name="title"  mb={5} placeholder='Titulo' w={'450px'} h={'50px'} />
                <TextAreaMain useControl={control} name='description' placeholder='Descricão' w={'450px'} />
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