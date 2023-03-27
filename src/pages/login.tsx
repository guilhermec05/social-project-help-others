import { Flex, Text } from "@chakra-ui/react";
import { Back } from './../components/back';
import { Header } from './../components/header';



export function Login(){
    return(
    <Flex  
        height={'100vh'}
        display={'flex'} 
       
        flexDirection={'column'}
     >
        <Header />
        <Back  />
        <Text>Login</Text>        
    </Flex>
    )
}