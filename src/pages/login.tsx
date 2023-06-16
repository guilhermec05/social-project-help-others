import { Alert, Box, Flex, Text } from "@chakra-ui/react";
import { ButtonMain } from "../components/button";
import { Logo } from "../components/logo";
import { InputMain } from "../components/input";
import { Link,  useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { useAuth } from "../hooks/useAuth";
import React from "react";

export function Login(){

    const navigate = useNavigate();  
    const {signIn,user} = useAuth()


    React.useEffect(()=>{
        switch(user.type){
            case 'A':
                navigate('/home_adm')
                break;
            case 'P':
                navigate('/home')
                break;
            case 'N':
                navigate('/my_events')
                break;
        }
    },[user])


    const schema = yup.object({
        name: yup.string().required("o campo não deve estar vazio"),
        pass: yup.string().required("o campo não deve estar vazio"),
      });



    type FormData = yup.InferType<typeof schema>

  
    const { handleSubmit,control } = useForm<FormData>({
        resolver: yupResolver(schema)
      });

    async function onSubmit(data: FormData){
        await signIn(data.name,data.pass)
    }

    return(
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
                    <Text fontSize={'h3'} fontWeight={'bold'} fontStyle={'italic'}>PSAP</Text>
                    <Text fontSize={'p'} >Projeto Social Ajude o Próximo</Text>
                </Flex> 
      
                <Flex 
                    flexDirection={'column'}
                    w={'100%'}
                    gap={5} 
                    transition={'all 1s'}
                    alignItems={'center'}
                    justifyContent={'center'}

                > 
                    <InputMain placeholder="Login" name={'name'} useControl={control} id={'name'} maxW={'400px'} w={'100%'} h={'50px'} my={5}/>
                    <InputMain placeholder="******************" name={'pass'}  maxW={'400px'} useControl={control} type={'password'}  h={'50px'} marginBottom={'2'} />
                    <Flex justifyContent={'flex-end'} w={'100%'}  maxW={'400px'} >
                        <Link to={'/forgot_pass_user'}><Text color={'primaryDark'} fontSize={'s'} textDecoration={'underline'}>Esqueceu sua senha?</Text></Link>
                    </Flex>                    
                    
                </Flex>
                <Flex justifyContent={'center'}>
                    <ButtonMain title="Entrar" bg={'primaryDark'} p={'25px'} w={'100%'} maxW={'200px'} type={'submit'} />
                </Flex>
                <Flex 
                    w={'100%'}
                    alignItems={'center'}
                    justifyContent={'center'}
                    gap={1}
                    >
                        <Text>Não tem uma conta?</Text> <Link to={'/sign_up_user'}><Text color={'primaryDark'} fontSize={'s'} textDecoration={'underline'}>Cadastre-se</Text></Link>
                </Flex>     
        </Box>
    </Box>
        </form>
      
    )
}