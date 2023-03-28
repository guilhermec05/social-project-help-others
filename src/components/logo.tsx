import { Image,ImageProps } from "@chakra-ui/react";
import  logo from '../assets/logo.svg'

interface imgProps extends ImageProps{
}

export function Logo({...rest}: imgProps){
    return <Image src={logo} {...rest}/>
}