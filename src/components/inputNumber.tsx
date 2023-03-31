import { FormControl, FormErrorMessage, NumberInput, NumberInputField, NumberInputFieldProps } from "@chakra-ui/react";


interface InputNumberProps extends NumberInputFieldProps{
    name:string;
    widthForm?:string
    messageError?:string;
    isError?:boolean;
    maxW?:string
  }  


export function InputNumber({name, messageError, isError,widthForm,maxW, ...rest }:InputNumberProps){
    return(
        <FormControl isInvalid={isError} display={'flex'} justifyContent={'center'} width={widthForm} >
        <NumberInput
            w={'100%'} 
            maxW={maxW}           
            min={1}
            max={999999999}
            keepWithinRange={false}
            clampValueOnBlur={false}
            display={'flex'}
        >
            <NumberInputField 
                 placeholder={name}
                 {...rest}
                border={'none'}
                _focus={{
                  border:'3px solid',
                  borderColor:'primary',
                  outline:'none',
                  boxShadow:'none'
                }}
                bg={'secondaryLight'} 
            />
        </NumberInput>
        <FormErrorMessage>{messageError}</FormErrorMessage>
      </FormControl>
    )
}