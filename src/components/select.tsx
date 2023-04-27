
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

import {useController } from "react-hook-form";

export interface optionProps{
        
    value:string;
    label:string;
}


interface selectMainProps extends SelectProps{
    text:string,
    widthForm?:string;
    messageError?:string;
    isInvalid?:boolean;
    option?:optionProps[],
    name?:string,
    useControl?:any
}




export function SelectMain({name="",useControl,text,option, messageError,isInvalid,widthForm,...rest}:selectMainProps){

    const { field, fieldState } = useController(
        {
          name:name,
          control:useControl,
          rules: { required: true }
        });
       
    console.log(fieldState.error)    
    


    function Options(options?:optionProps[]){
        const lists:ReactNode[] = [] ;
        options?.forEach((v,i) => {
            lists.push(<option value={v.value} key={i}>{v.label}</option>)
        })
        return lists;
        
    }

    return(  <FormControl 
                isInvalid={fieldState.invalid} 
                w={widthForm}
                maxW={rest.maxW} >
                <Select placeholder={text} 
                  border={'none'}
                  {...field}
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
                <FormErrorMessage fontWeight={800} >{fieldState?.error?.message}</FormErrorMessage>
            </FormControl> )
}