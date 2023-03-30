import {  Flex, Spinner } from "@chakra-ui/react";

export function Loading(){
    return(
        <Flex
            alignItems={'center'}
            justifyContent={'center'}
            h={'100vh'}
            w={'100vw'}
            position={'fixed'}
            top={0}
            zIndex={999}
            bg={'secondary'}
            opacity={'0.5'}
        >
            <Spinner color="primary" 
            size={'xl'} 
            thickness='6px'
            zIndex={9999}/>
        </Flex>
    )
}