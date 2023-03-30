import { Box, Flex, Text } from "@chakra-ui/react";
import { Header } from "../components/header";
import { Footer } from './../components/footer';
import { CardHomerless, CardHomerlessProps } from './../components/cardHomeless';
import { ReactNode } from 'react';



export function Home(){

    const card:CardHomerlessProps = {id:'1',city:'poa',age:26,image:'https://bit.ly/dan-abramov',items:['item1','item2','item3','item4'],name:'joaozinho',state:'rs'} 

    const list:CardHomerlessProps[] = [card,card,card,card,card,card]
    
    function ListaCard(){
        
        const lists:ReactNode[] = [] 


        list.forEach(v => lists.push(<CardHomerless {...v} />))
        return lists
    }

    return(
    <Flex  
        height={'100vh'}
        // display={'flex'} 
        flexDirection={'column'}
     >
         <Header />
        <Flex 
            m={'20px'}
            gap={5}
        >
             
            {ListaCard()}          
        </Flex>

        {/* <Back link="/Home" />          */}
        <Footer />
    </Flex>
    )
}