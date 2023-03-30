import { HamburgerIcon } from "@chakra-ui/icons";
import { Button, Icon,  Menu, MenuButton, MenuItem, MenuList, useDisclosure } from '@chakra-ui/react'
import { Box, Flex } from "@chakra-ui/react";



import { FaRegUserCircle } from "react-icons/fa";

import {
    Drawer,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
  } from '@chakra-ui/react'
import { Logo } from "./logo";
import { Link } from "react-router-dom";


export function Header(){

    const { isOpen, onOpen, onClose } = useDisclosure()

    return<>
         <Box
            display={'flex'}
            flexDirection={'column'}        
            position={'sticky'}
            top={'0px'}
            zIndex={1}           
        >
            <Box p={'3px'} bg={'primaryDark'}/>
            <Flex 
                bg={'primary'}
                justifyContent={'space-between'}
                alignItems={'center'}
                p={'10px'}
            >
                <Icon 
                  as={HamburgerIcon}
                   onClick={onOpen}
                   color={'secondary'}
                   fontSize={'h3'}
                   cursor={'pointer'}
                   _active={{color:'dark_light'}}
                />
                
                    
               <Logo width={'50px'}  />
               {/* <Logo width={'50px'}  /> */}
                <Menu >
                    <MenuButton
                        as={Button}
                        p={0}
                        // border={'1px solid red'}
                        aria-label='Options'
                        bg={'none'}
                        _hover={{bg:'none'}}
                        _active={{bg:'none'}}
                       
                        >
                            <Icon 
                                    as={FaRegUserCircle} 
                                    fontSize={'h4'} 
                                    color={'secondary'}
                                    _hover={{
                                        color:'dark_light'
                                    }}
                                />
                        </MenuButton>
                     <MenuList bg={'secondary'}>
                        <Link to='/profile'>
                            <MenuItem
                            transition={'all 0.5s'}
                            _hover={{
                                bg:'primary',
                                color:'secondaryLight'
                            }}
                            >Minha Conta</MenuItem>
                        </Link>
                        <Link to='/'>
                            <MenuItem
                            transition={'all 0.5s'}
                            _hover={{
                                bg:'primary',
                                color:'secondaryLight'
                            }}
                            >Sair</MenuItem>
                        </Link>
                    </MenuList>
                </Menu>
                
              
                    
        
            </Flex> 
        </Box>
        <Drawer placement="left"  onClose={onClose} isOpen={isOpen} >
            <DrawerOverlay />
            <DrawerContent >
                <DrawerCloseButton />
                <DrawerHeader borderBottomWidth='1px'>Menu</DrawerHeader>
               
                <Link to='/SignUpHomeless'> <Box 
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
                    <Link to='/myDonation'><Box 
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
            </DrawerContent>
        </Drawer>
    </>
    
   
    
}