
import {
    FormControl,
    Input ,
    FormErrorMessage,
    InputProps,
    border,
    Box,
    InputGroup,
    InputLeftElement,
    Icon
    // FormLabel,
    // FormHelperText,
  } from '@chakra-ui/react'
  import { CiImageOn } from "react-icons/ci";
  import { useRef } from "react"
import { useController,useForm } from 'react-hook-form';

interface inputMainProps extends InputProps{
  name:string;
  widthForm?:string
  messageError?:string;
  isError?:boolean;
  placeholderImg?:string
}  

export function InputFile({name, messageError, isError,widthForm,placeholderImg, ...rest }:inputMainProps){
    const inputRef = useRef();
    const {
		handleSubmit,
		register,
		setError,
		control,
		formState: { errors, isSubmitting },
	} = useForm()
    const {
        field: { ref, value, ...inputProps },
        fieldState: { invalid, isTouched, isDirty },
      } = useController({
        name,
        control:control
      });


    return (<FormControl isInvalid={isError} display={'flex'} justifyContent={'center'} width={widthForm} >
          <InputGroup>
                <InputLeftElement
                pointerEvents="none"
                children={<Icon as={CiImageOn} fontSize={'h4'}/>}
                />
                 <input type='file' accept={'image/*'} name={name} ref={inputRef} {...inputProps} style={{ display: 'none' }}></input>
                 <Input
                      placeholder={placeholderImg || "seu arquivo ..."}
                      onClick={() => inputRef.current.click()}
                      value={value}
                      border={'none'}
                      _focus={{
                        border:'3px solid',
                        borderColor:'primary',
                        outline:'none',
                        boxShadow:'none'
                      }}
                      bg={'secondaryLight'} 
                    />
          </InputGroup>
          
          <FormErrorMessage>{messageError}</FormErrorMessage>
      </FormControl>)
   
} 