import { Button, ButtonProps } from '@chakra-ui/react'

interface IButtonMain{
    title:string;
    props?:ButtonProps
}

export function ButtonMain({title, ...props}:IButtonMain){
    return (
        <>
            <Button 
                bg={'#2CAE8C'}
                color={'#ffff'}
            {...props}>
                {title}
            </Button>
        </>
    )
}