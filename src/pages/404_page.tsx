import { Box, Text } from "@chakra-ui/react";

export function ErrorPage(){
    return <Box 
        display={'flex'}
        justifyContent={'center'}
        alignItems={'center'}
        h={'100vh'}
    >
        <Text fontSize={'h1'} fontWeight={700}>Oops! pages is not found </Text>
    </Box>
}