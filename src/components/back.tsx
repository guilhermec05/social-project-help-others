import { ArrowBackIcon, IconProps } from "@chakra-ui/icons";
import { Box } from "@chakra-ui/react";


export function Back({...rest }:IconProps){
    return <Box 
        display={'flex'}
        w={'100vw'}
        p={'10px'}
    >
        <ArrowBackIcon 
         fontSize={'h6'}   
         _active={
            {color:'dark_light'}
         }
         {...rest}
        />
    </Box>
}