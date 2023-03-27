
import {
    FormControl,
    Select  ,
    SelectProps,
    FormErrorMessage,
    InputProps,
    border
    // FormLabel,
    // FormHelperText,
  } from '@chakra-ui/react'
import { ReactNode } from 'react';

interface optionProps{
    value:string;
    label:string;
}


interface selectMainProps extends SelectProps{
    text:string,
    messageError?:string;
    isInvalid?:boolean;
    option?:optionProps[]
}




export function SelectMain({text,option, messageError,isInvalid,...rest}:selectMainProps){

    function Options(options?:optionProps[]){
        const lists:ReactNode[] = [] ;
        options?.forEach(v => {
            lists.push(<option value={v.value} key={v.value}>{v.label}</option>)
        })
        return lists;
        
    }

    return  <FormControl isInvalid={isInvalid}>
                <Select placeholder={text} 
                _focus={{
                    border:'2px solid',
                    borderColor:'primary'
                }}
                {...rest}>
                    {Options(option)}
                </Select>
                <FormErrorMessage>{messageError}</FormErrorMessage>
            </FormControl> 
}