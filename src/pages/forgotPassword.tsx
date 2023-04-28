import { Box, Flex, Text } from "@chakra-ui/react";
import { ButtonMain } from "../components/button";
import { Logo } from "../components/logo";
import { InputMain } from "../components/input";
import {   useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";

export function FogotPassword(){

    const navigate = useNavigate();  


    const schema = yup.object({
        new_pass: yup.string().required("o campo não deve estar vazio"),
        confirm_pass: yup.string().oneOf([yup.ref('new_pass'), null], 'a senha deve ser iguais').required("o campo não deve estar vazio")
      });



    type FormData = yup.InferType<typeof schema>

  
    const { handleSubmit,control } = useForm<FormData>({
        resolver: yupResolver(schema)
      });

    function onSubmit(data: FormData){
        // alert(submit)
         console.log(data )
        navigate('/home')
        
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
                <Flex gap={4} justifyContent={'center'} alignItems={'center'} flexDirection={'column'}> 
                    <Logo width={'100px'} />
                    <Text fontSize={'h3'} fontWeight={'bold'} >Nova senha</Text>
                </Flex> 
      
                <Flex 
                    flexDirection={'column'}
                    w={'100%'}
                    gap={5} 
                    transition={'all 1s'}
                    alignItems={'center'}
                    justifyContent={'center'}

                > 
                    <InputMain placeholder="senha" name={'new_pass'} useControl={control} type={'password'} id={'name'} maxW={'400px'} w={'100%'} h={'50px'} my={5}/>
                    <InputMain placeholder="confirma senha" name={'confirm_pass'}  maxW={'400px'} useControl={control} type={'password'}  h={'50px'} marginBottom={'2'} />
                    <Flex justifyContent={'flex-end'} w={'100%'}  maxW={'400px'} >
                        
                    </Flex>                    
                    
                </Flex>
                <Flex justifyContent={'center'}>
                    <ButtonMain title="Enviar" bg={'primaryDark'} p={'25px'} w={'100%'} maxW={'200px'} type={'submit'} />
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
        </form>
      
    )
}