import { ArrowBackIcon } from "@chakra-ui/icons";
import { Box,BoxProps } from "@chakra-ui/react";
import {  Link } from "react-router-dom";

interface BackProps extends BoxProps{
    link:string
}

export function Back({link,...rest }:BackProps){
    return( <Box 
        display={'flex'}
        // justifyContent={'space-around'}
        {...rest}
        p={'10px'}
       
    >
        <Link to={link}>
            <ArrowBackIcon 
            fontSize={'h3'}   
            cursor={'pointer'}
            _active={
                {color:'dark_light'}
            }
            
            />
        </Link>
        <Box></Box>
    </Box>)
}