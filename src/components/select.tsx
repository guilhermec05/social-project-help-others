
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

export interface optionProps{
        
    value:string;
    label:string;
}


interface selectMainProps extends SelectProps{
    text:string,
    widthForm?:string;
    messageError?:string;
    isInvalid?:boolean;
    option?:optionProps[]
}




export function SelectMain({text,option, messageError,isInvalid,widthForm,...rest}:selectMainProps){

    function Options(options?:optionProps[]){
        const lists:ReactNode[] = [] ;
        options?.forEach((v,i) => {
            lists.push(<option value={v.value} key={i}>{v.label}</option>)
        })
        return lists;
        
    }

    return(  <FormControl isInvalid={isInvalid}
                w={widthForm}
                maxW={rest.maxW} >
                <Select placeholder={text} 
                  border={'none'}
                  // onFocus={{border:'1px sild'}}
                  // focusBorderColor={'primary'}
                  _focus={{
                    border:'3px solid',
                    borderColor:'primary',
                    outline:'none',
                    boxShadow:'none'
                  }}
                  bg={'secondaryLight'} 
                {...rest}>
                    {Options(option)}
                </Select>
                <FormErrorMessage>{messageError}</FormErrorMessage>
            </FormControl> )
}