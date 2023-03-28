import { ArrowBackIcon, IconProps } from "@chakra-ui/icons";
import { Box } from "@chakra-ui/react";
import {  Link } from "react-router-dom";

interface BackProps extends IconProps{
    link:string
}

export function Back({link,...rest }:BackProps){
    return <Box 
        display={'flex'}
        // w={'100vw'}
        p={'10px'}
        cursor={'pointer'}
    >
        <Link to={link}>
            <ArrowBackIcon 
            fontSize={'h3'}   
            _active={
                {color:'dark_light'}
            }
            {...rest}
            />
        </Link>
    </Box>
}