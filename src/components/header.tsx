import { HamburgerIcon } from "@chakra-ui/icons";
import { Button, Icon,  Menu, MenuButton, MenuItem, MenuList, Text, useDisclosure } from '@chakra-ui/react'
import { Box, Flex } from "@chakra-ui/react";
import { useAuth } from "../hooks/useAuth";


import { FaRegUserCircle } from "react-icons/fa";

import {
    Drawer,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
  } from '@chakra-ui/react'
import { Logo } from "./logo";
import { Link, useNavigate } from "react-router-dom";

export interface HeaderProps{
    hasAdm?:boolean,
    hasNGOs?:boolean
}


export function Header({hasAdm = false,hasNGOs= false}:HeaderProps){

    const {logOut,user} = useAuth()
    const navigate = useNavigate();  

    function hasNGO(){
        return(!hasNGOs?<>
          <Link to='/home'> <Box 
            w={'100%'}
            textAlign={'center'}
            transition={'all 0.5s'}
            _hover={{
                bg:'primary',
                color:'secondaryLight'
            }}
            p={'10px'}
            cursor={'pointer'}
        >Página Inicial</Box></Link>  
   
    <Link to='/sign_up_homeless'> <Box 
            w={'100%'}
            textAlign={'center'}
            transition={'all 0.5s'}
            _hover={{
                bg:'primary',
                color:'secondaryLight'
            }}
            p={'10px'}
            cursor={'pointer'}
        >Cadastrar Morador</Box></Link>             
        <Link to='/my_donation'><Box 
            w={'100%'}
            textAlign={'center'}
            transition={'all 0.5s'}
            _hover={{
                bg:'primary',
                color:'secondaryLight'
            }}
            p={'10px'}
            cursor={'pointer'}
        >Minhas Doações</Box> </Link>
        </>:<>
        <Link to='/my_events'> <Box 
            w={'100%'}
            textAlign={'center'}
            transition={'all 0.5s'}
            _hover={{
                bg:'primary',
                color:'secondaryLight'
            }}
            p={'10px'}
            cursor={'pointer'}
        >Meus Eventos</Box></Link>  
        <Link to='/sign_up_event_ong'> <Box 
            w={'100%'}
            textAlign={'center'}
            transition={'all 0.5s'}
            _hover={{
                bg:'primary',
                color:'secondaryLight'
            }}
            p={'10px'}
            cursor={'pointer'}
        >Cadastrar Eventos</Box></Link>  
        </>
          
            
        )
    }

    function exit(){
        logOut()
        navigate("/")
    }

    function hasAdmMenu(){
        return( !hasAdm ? (<Icon 
        as={HamburgerIcon}
         onClick={onOpen}
         mx={3}
         color={'secondary'}
         fontSize={'h3'}
         cursor={'pointer'}
         _active={{color:'dark_light'}}
      /> ): <div></div>)
    }

    const { isOpen, onOpen, onClose } = useDisclosure()

    return(<>
         <Box
            display={'flex'}
            flexDirection={'column'}        
            position={'sticky'}
            w={'100%'}
            top={'0px'}
            zIndex={5}           
        >
            <Box p={'3px'} bg={'primaryDark'}/>
            <Flex 
                bg={'primary'}
                justifyContent={'space-between'}
                alignItems={'center'}
                p={'10px'}
            >
               
                {hasAdmMenu()}
                    
               <Logo width={'50px'}  />
                <Menu >
                    <MenuButton
                        as={Button}
                        // mx={2}
                        // border={'1px solid red'}
                        aria-label='Options'
                        bg={'none'}
                        _hover={{bg:'none'}}
                        _active={{bg:'none'}}
                      
                        >
                            <Icon 
                                    as={FaRegUserCircle} 
                                    fontSize={'h3'} 
                                    color={'secondary'}
                                    _hover={{
                                        color:'dark_light'
                                    }}
                                />
                                <Text color={'white'}>{user.name}</Text>
                        </MenuButton>
                        
                     <MenuList bg={'secondary'}>           
                        <Link to='/profile'><MenuItem>Minha Conta</MenuItem></Link>
                        <MenuItem onClick={exit}>Sair</MenuItem>
                     </MenuList>
                </Menu>

                    
        
            </Flex> 
        </Box>
        <Drawer placement="left"  onClose={onClose} isOpen={isOpen} >
            <DrawerOverlay />
            <DrawerContent >
                <DrawerCloseButton />
                <DrawerHeader borderBottomWidth='1px'>Menu</DrawerHeader>
                {hasNGO()}
    
            </DrawerContent>
        </Drawer>
    </>)
    
   
    
}