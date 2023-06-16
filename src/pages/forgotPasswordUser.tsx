import { Box, Flex, Stack, StackDivider, Icon, useDisclosure, useToast, Text } from "@chakra-ui/react";
import { ButtonMain } from "../components/button";
import { Logo } from "../components/logo";
import { InputMain } from "../components/input";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { api } from "../services/api/axios";
import { useState, useRef } from 'react';
import { Loading } from "../components/loading";
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
} from '@chakra-ui/react'

import { FaRegUserCircle } from "react-icons/fa";

interface user {
    id: string
    user: string
}




export function FogotPasswordUser() {

    const [load, setLoad] = useState(false)
    const [users, setUsers] = useState<user[]>([] as user[])
    const { isOpen, onOpen, onClose } = useDisclosure()
    const cancelRef = useRef()
    const toast = useToast()


    const navigate = useNavigate();



    const schema = yup.object({
        email: yup.string().required("o campo não deve estar vazio").email("favor informe o email corretamente"),

    });



    type FormData = yup.InferType<typeof schema>


    const { handleSubmit, control } = useForm<FormData>({
        resolver: yupResolver(schema)
    });

    async function submitResetUser(id:string){
        try{
            onClose()
            setLoad(true)
            await api.get(`auth/send_forgot/${id}`)
            toast({
                title: 'senha alterada com sucesso',
                status: 'success',
                duration: 5000,
                isClosable: true,
                position:'top-right',

            })
            navigate('/')

        }catch{
            toast({
                title: error?.response.data.message,
                status: 'error',
                duration: 5000,
                isClosable: true,
                position: 'top-right',

            })
        }finally{
            setLoad(false)
        }
    }

    async function onSubmit(data: FormData) {
        // alert(submit)
        try {
            setLoad(true)
            const { email } = data
            const result = await api.post('/auth/get_users', { email }).then(res => res.data)
            const userArr: user[] = []

            result.forEach(v => {
                userArr.push({ id: v.id, user: v.user })
            })

            setUsers(userArr)
            onOpen()
            // toast({
            //     title: 'senha alterada com sucesso',
            //     status: 'success',
            //     duration: 5000,
            //     isClosable: true,
            //     position:'top-right',

            // })
            // navigate('/')
        } catch (error) {
            toast({
                title: error?.response.data.message,
                status: 'error',
                duration: 5000,
                isClosable: true,
                position: 'top-right',

            })
        } finally {
            setLoad(false)
        }


    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Box
                bg={'primary'}
                minHeight={'100vh'}
                display={'flex'}
                justifyContent={'center'}
                alignItems={'center'}
                p={5}
                px={2}
            >
                {/* {load && <Loading/>} */}
                <Box
                    bg={'secondary'}
                    display={'flex'}
                    flexDirection={'column'}
                    borderRadius={5}
                    py={'100px'}
                    w={'100%'}
                    maxW={'700px'}
                    gap={7}
                    p={12}
                    px={2}
                >

                    <Flex justifyContent={'center'} alignItems={'center'} flexDirection={'column'}>
                        <Logo width={'100px'} />


                    </Flex>

                    <Flex
                        flexDirection={'column'}
                        w={'100%'}
                        gap={5}
                        transition={'all 1s'}
                        alignItems={'center'}
                        justifyContent={'center'}

                    >
                        <InputMain placeholder="Email" name={'email'} useControl={control} id={'name'} maxW={'400px'} w={'100%'} h={'50px'} my={5} />

                        {/* <Flex justifyContent={'flex-end'} w={'100%'}  maxW={'400px'} >
                        
                        </Flex> */}

                    </Flex>
                    <Flex justifyContent={'center'}>
                        <ButtonMain title="Enviar" bg={'primaryDark'} p={'25px'} w={'100%'} maxW={'200px'} type={'submit'} isLoading={load} />
                    </Flex>
                    <Flex
                        w={'100%'}
                        alignItems={'center'}
                        justifyContent={'center'}
                        gap={1}
                    >

                    </Flex>
                </Box>
            </Box>

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent p={5}>
                    <ModalHeader>Escolha o usuário desejado:</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        {users.map(v => {
                            return <Stack divider={<StackDivider />} spacing='4' >
                                <Box display={'flex'}
                                    alignItems={'center'}
                                    gap={5}
                                    border={'1px solid'}
                                    borderColor={'secondaryLight'}
                                    borderRadius={4}
                                    p={3}
                                    my={2}
                                    _hover={{ bg: 'secondaryLight' }}
                                    cursor={'pointer'}
                                    onClick={e => submitResetUser(v.id)}
                                    >
                                    <Icon
                                        as={FaRegUserCircle}
                                        fontSize={'h3'}
                                        color={'dark_light'}
                                    />
                                    <Text fontSize={'h5'}>{v.user}</Text>
                                </Box>
                            </Stack>
                        })}






                    </ModalBody>
                </ModalContent>
            </Modal>

        </form>



    )
}