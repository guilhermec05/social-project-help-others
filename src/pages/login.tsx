import { Box, Flex, Text } from "@chakra-ui/react";
import { ButtonMain } from "../components/button";
import { Logo } from "../components/logo";

import { InputNumber } from './../components/inputNumber';
import { InputMain } from "../components/input";
import { Link,  useNavigate } from "react-router-dom";



export function Login(){

    const navigate = useNavigate();

    async function submit(){
        navigate('/home')
        
    }

    return(
        <Box  
        bg={'primary'}
        minHeight={'100vh'}
        display={'flex'} 
        justifyContent={'center'} 
        alignItems={'center'}
        // p={2}
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
            gap={10}
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
                    // gap={5} 
                    transition={'all 1s'}
                    alignItems={'center'}
                    justifyContent={'center'}

                > 
                    <InputNumber name="cpf ou cpnj" maxW={'400px'} w={'100%'} h={'50px'} my={5}/>
                    <InputMain name="******************"  maxW={'400px'} type={'password'}  h={'50px'} marginBottom={'2'} />
                    <Flex justifyContent={'flex-end'} w={'100%'}  maxW={'400px'} >
                        <Link to={'/forgot_pass'}><Text color={'primaryDark'} fontSize={'s'} textDecoration={'underline'}>Esqueceu sua senha?</Text></Link>
                    </Flex>                    
                    
                </Flex>
                <Flex justifyContent={'center'}>
                    <ButtonMain title="Entrar" bg={'primaryDark'} p={'25px'} w={'100%'} maxW={'200px'} onClick={e => submit()} />
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
    )
}