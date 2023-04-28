import { Box, Flex, Text } from "@chakra-ui/react";
import { Footer } from "../components/footer";
import { Header, HeaderProps } from "../components/header";
import { InputMain } from "../components/input";
import { ButtonMain } from '../components/button';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";




export function UserPropfile({hasAdm = false}:HeaderProps){
    
    const schema = yup.object({
        pass: yup.string().required("o campo não deve estar vazio"),
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
        // navigate('/home')
        
    }


    return(
    <Flex  
        display={'flex'} 
        flexDirection={'column'}
        // justifyContent={'center'} 
        // alignItems={'center'}
     >
        <Header  hasAdm={hasAdm}/>
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
                <Flex maxW={'500px'}>
                    <Text fontSize={'h4'}>Atualizar seus dados</Text>
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
                    <ButtonMain title="Atualizar" w={'100%'} type={'submit'} />
                </Flex>
            </Box>
        </form>
      
        <Footer />       
    </Flex>
    )
}