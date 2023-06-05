import { Box, Flex, Text, useToast } from "@chakra-ui/react";
import { ButtonMain } from "../components/button";
import { Logo } from "../components/logo";
import { InputMain } from "../components/input";
import { Link,  useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { api } from "../services/api/axios";
import { useState } from 'react';
import { Loading } from "../components/loading";

export function FogotPasswordUser(){
    
    const [load, setLoad] = useState(false)
    const toast = useToast()


    const navigate = useNavigate();  



    const schema = yup.object({
        email: yup.string().required("o campo não deve estar vazio").email("favor informe o email corretamente"),
       
      });



    type FormData = yup.InferType<typeof schema>

  
    const { handleSubmit,control } = useForm<FormData>({
        resolver: yupResolver(schema)
      });

    async function onSubmit(data: FormData){
        // alert(submit)
        console.log(data)
        try {
            setLoad(true)
            await api.post('/auth/send_forgot',{email:data.email}).then(res=> res.data)
            toast({
                title: 'senha alterada com sucesso',
                status: 'success',
                duration: 5000,
                isClosable: true,
                position:'top-right',
                
            })
            navigate('/')
        } catch (error) {
            
            console.log(error)
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
            {load && <Loading/>}
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
                    <InputMain placeholder="Email" name={'email'} useControl={control} id={'name'} maxW={'400px'} w={'100%'} h={'50px'} my={5}/>
                    
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