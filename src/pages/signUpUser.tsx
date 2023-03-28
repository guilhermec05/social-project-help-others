import { Box, Flex, Text } from "@chakra-ui/react";
import { useState } from "react";
import { Back } from "../components/back";
import { ButtonMain } from "../components/button";
import { FormNgos } from "../components/formNgos";
import { FormUser } from "../components/formUser";
import { Logo } from "../components/logo";





export function SignUpUser(){
    const [isNGOS,setIsNGOS] = useState<boolean>(false)


    return(
    <Box  
        bg={'primary'}
        minHeight={'100vh'}
        p={'20px'}
        display={'flex'} 
        justifyContent={'center'} 
        alignItems={'center'}
   
     >
        <Box 
            bg={'secondary'}
            display={'flex'}
            flexDirection={'column'}
            borderRadius={5}
            p={5}
            w={'800px'}
            gap={10}
        >
                <Back link={'/'}/>
                <Flex justifyContent={'center'} alignItems={'center'} flexDirection={'column'}> 
                    <Logo width={'100px'} />
                    {/* <Text fontSize={'h3'} fontWeight={'bold'} fontStyle={'italic'}>PSAP</Text>
                    <Text fontSize={'p'} >Projeto Social Ajude o Próximo</Text> */}
                </Flex> 
                <Flex justifyContent={'center'} gap={10}>
                    <ButtonMain title="Pessoa Fisica" fontSize={'h5'} p={'30px'}  onClick={v => setIsNGOS(false)}/>
                    <ButtonMain title="Pessoa Juridica" fontSize={'h5'} p={'30px'}  onClick={v => setIsNGOS(true)}/>
                </Flex>
                <Flex 
                    flexDirection={'column'}
                    w={'100%'}
                    gap={5} 
                    transition={'all 1s'}
                >

                    <Text textAlign={'center'} fontSize={'h5'}>Cadastro de {isNGOS ?"Pessoa Juridica": "Pessoa Fisica"}</Text>
                    {isNGOS ?<FormNgos/>: <FormUser/>}
                </Flex>
                <Flex justifyContent={'center'}>
                    <ButtonMain title="Cadastrar" fontSize={'h5'} p={'30px'}/>
                </Flex>     
        </Box>
    </Box>
    )
}