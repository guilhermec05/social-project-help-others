import { Checkbox, CheckboxGroup, CheckboxProps } from '@chakra-ui/react'

interface CheckBox extends CheckboxProps{
}

export function CheckBox({...htmlProps}){
    return(
        <Checkbox
        display='flex'
        flexDirection='row'
        alignItems='center'
        gridColumnGap={0}
        maxW='80'
        rounded='lg'
        px={0}
        py={1}
        cursor='pointer'
        colorScheme='green'
        {...htmlProps}
        >        
        </Checkbox>
    )
}