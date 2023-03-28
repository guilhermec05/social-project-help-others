import { Box, Flex } from "@chakra-ui/react";
import { useState } from "react";
import { Back } from "../components/back";
import { ButtonMain } from "../components/button";
import { FormNgos } from "../components/formNgos";
import { FormUser } from "../components/formUser";





export function SignUpUser(){
    const [isNGOS,setIsNGOS] = useState<boolean>(false)


    return(
    <Box  
        bg={'primary'}
        height={'100vh'}
        display={'flex'} 
        justifyContent={'center'} 
        alignItems={'center'}
        overflow={'hidden'}
        // px={'150px'}
     >
       <Box 
            bg={'secondary'}
            display={'flex'}
            flexDirection={'column'}
            borderRadius={5}
            p={10}
            w={'800px'}
            // maxW={'100%'}
            gap={5}
           
       >
                <Back link={'/'}/>
                <Flex justifyContent={'center'}>img</Flex> 
                <Flex justifyContent={'center'} gap={10}>
                    <ButtonMain title="Pessoa Fisica" fontSize={'h5'} p={'30px'} onClick={v => setIsNGOS(false)}/>
                    <ButtonMain title="Pessoa Juridica" fontSize={'h5'} p={'30px'} onClick={v => setIsNGOS(true)}/>
                </Flex>
                <Flex 
                    flexDirection={'column'}
                    w={'100%'}
                    gap={5} 
                    transition={'all 1s'}
                >

                    
                    {isNGOS ?<FormNgos/>: <FormUser/>}
                </Flex>
                <Flex justifyContent={'center'}>
                    <ButtonMain title="Cadastrar" fontSize={'h5'} p={'30px'}/>
                </Flex>     
        </Box>
    </Box>
    )
}