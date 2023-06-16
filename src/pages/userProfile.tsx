import { Box, Flex, Text, useToast } from "@chakra-ui/react";
import { Footer } from "../components/footer";
import { Header, HeaderProps } from "../components/header";
import { InputMain } from "../components/input";
import { ButtonMain } from '../components/button';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { AlertDialogConfirm } from "../components/alertDialogConfirm";
import { useAuth } from "../hooks/useAuth";
import { api } from "../services/api/axios";
import { useState } from 'react';
import { Loading } from "../components/loading";





export function UserPropfile({ hasAdm = false }: HeaderProps) {
    const { user, setUser } = useAuth()


    const [load, setLoad] = useState(false)

    console.log(user)

    const toast = useToast()

    async function beAdministrator() {
        try {
            setLoad(true)
            const body = {
                id: user.id
            }

            await api.post(`/user/be_administrator`, body).then(res => res.data)
            setUser({ ...user, send_administrador: true })

            localStorage.setItem("signIn", JSON.stringify(user))
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

    function HasAdm() {
        return (!hasAdm && <AlertDialogConfirm title="Você tem Certeza" text="você passarar por um processo de avaliação com outros adms." func={beAdministrator}>
            <Text textDecoration={'underline'} color={'primary'} cursor={'pointer'}>Quero Ser adm!</Text>
        </AlertDialogConfirm>)
    }


    const schema = yup.object({
        pass: yup.string().required("o campo não deve estar vazio"),
        new_pass: yup.string().required("o campo não deve estar vazio"),
        confirm_pass: yup.string().oneOf([yup.ref('new_pass'), null], 'a senha deve ser iguais').required("o campo não deve estar vazio")
    });



    type FormData = yup.InferType<typeof schema>


    const { handleSubmit, control,setValue } = useForm<FormData>({
        resolver: yupResolver(schema)
    });


    async function onSubmit(data: FormData) {
        const { new_pass, pass } = data
        const { id } = user
        try {
            setLoad(true)
            await api.patch('user/user_update', { id, new_pass, pass }).then(res => res.data)
            toast({
                title: "alterado com sucesso",
                status: 'success',
                duration: 5000,
                isClosable: true,
                position: 'top-right',

            })
            setValue("pass","")
            setValue("confirm_pass","")
            setValue("new_pass","")

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
        // navigate('/home')

    }


    return (
        <Flex
            display={'flex'}
            flexDirection={'column'}
        // justifyContent={'center'} 
        // alignItems={'center'}
        >
            <Header hasAdm={hasAdm} />
            {load && <Loading />}
            <form onSubmit={handleSubmit(onSubmit)}>
                <Box
                    display={'flex'}
                    justifyContent={'center'}
                    alignItems={'center'}
                    flexDirection={'column'}
                    gap={10}
                    px={'20px'}
                    h={'60vh'}
                >


                    <Flex maxW={'500px'} flexDirection={'column'} gap={3} px={5}>
                        <Flex justifyContent={'flex-end'} >
                            {((user.type == "P" && !user.send_administrador) && HasAdm())}
                        </Flex>
                        <Text fontSize={'h4'} >Atualizar seus dados</Text>
                    </Flex>
                    <Flex
                        flexDirection={'column'}
                        gap={5}
                        maxW={'500px'}
                        w={'100%'}
                    >
                        <InputMain useControl={control} name={'pass'} placeholder="Senha Atual" type={'password'} />
                        <InputMain useControl={control} name={'new_pass'} placeholder="Nova Senha" type={'password'} />
                        <InputMain useControl={control} name={'confirm_pass'} placeholder="Confirma Senha" type={'password'} />


                    </Flex>
                    <Flex maxW={'500px'}>
                        <ButtonMain title="Atualizar" w={'100%'} type={'submit'} isLoading={load} />
                    </Flex>
                </Box>
            </form>

            <Footer />
        </Flex>
    )
}