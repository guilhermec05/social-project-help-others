import { SearchIcon } from "@chakra-ui/icons";
import { IconButton, InputGroup, InputLeftAddon, InputLeftElement } from "@chakra-ui/react";
import { useRef,useEffect, useState } from "react";
import { InputMain } from "./input";

export function SearchInput(){

    const [closeInput, setCloseInput] = useState<boolean>(false)
    const [search, setSearch] = useState<string>("")

    function useOutsideAlerter(ref:any) {
        useEffect(() => {
          /**
           * Alert if clicked on outside of element
           */
          function handleClickOutside(event:any) {
           
            if (ref.current && !ref.current.contains(event.target) && event.target.value ==="") {
                setCloseInput(false)
            }
          }
          // Bind the event listener
          document.addEventListener("mousedown", handleClickOutside);
          return () => {
            // Unbind the event listener on clean up
            document.removeEventListener("mousedown", handleClickOutside);
          };
        }, [ref]);
      }

      
      const wrapperRef = useRef(null);
      useOutsideAlerter(wrapperRef);
    return(
        <>
            {!closeInput?    <IconButton 
                aria-label='Search' 
                bg={'primary'} 
                _hover={{bg:'primaryLight'}} 
                px={4}
                icon={<SearchIcon  color='white' />} 
                onClick={e =>{
                    setCloseInput(true)
                }}
            /> : <InputGroup maxW={'300px'} cursor={'pointer'}  onBlur={e=>{
                      if(search === "") setCloseInput(false)
              }} ref={wrapperRef}   >
                    <InputLeftAddon 
                        pointerEvents='all'
                        bg={'primary'}
                        children={<SearchIcon  color='white' />}
                        borderRadius={'5px 0px 0px 5px'}
                        cursor={'pointer'}
                        // onClick={e=> setEnableInput(false)}
                    />
                    <InputMain name="" widthForm={'350px'} onChange={e =>{ setSearch(e.target.value)}} value={search} borderRadius={'0px 5px 5px 0px'} _focus={{border:'none', outline:'none', boxShadow:'none'}}  />
                </InputGroup>}
         
        </>
    )
}