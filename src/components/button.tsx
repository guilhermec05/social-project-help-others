import { Button, ButtonProps } from '@chakra-ui/react'

interface IButtonMain extends ButtonProps{
    title:string;
    isLoading?:boolean
}

export function ButtonMain({title, isLoading,...rest}:IButtonMain){
    return (
    
        <Button 
            bg={'primary'}
            color={'secondary'}
            fontSize={{sm:'p',md:'h6',lg:'h6'}}
            _hover={{
                    bg:'primaryDark'
                }
            }
            _active={{
                bg:'primaryLight'
            }}
            
            isLoading={isLoading || false }
            {...rest}
        >
            {title}
        </Button>
    
    )
}