import {ReactNode,createContext, useState,useEffect} from 'react'

import { api } from '../services/api/axios';
import { useToast } from '@chakra-ui/react'




interface userProps{
    id:string
    name:string;
    email:string;
    type:'P'|'A'|'N',
    state_or_province?:string,
    city?:string
}

interface propsProviderAuth{
    children: ReactNode
}


export interface AuthContextProps {
    user: userProps;
    isUserLoading:boolean;
    signIn:(user:string,pass:string)=> Promise<void>,
    logOut:()=>void
}


export const AuthContext = createContext({} as AuthContextProps);


export function AuthContextProvider({children}:propsProviderAuth){

    const toast = useToast()
    const [isUserLoading, setIsUserLoading] = useState(false)
    const [user, setUser] = useState<userProps>({} as userProps)
    

    useEffect(()=>{
        try {
            const storage = localStorage.getItem('signIn')
            const usersStorage = storage? storage : {} as userProps
            const json = JSON.parse(usersStorage)
            if(usersStorage) setUser(json)
            api.defaults.headers.common['Authorization'] = `Bearer ${json.token}`



        } catch (error) {
            
        }
      
    },[])


    async function signIn(user:string,password:string){
       
       try {
          
            const dataResponse =  await api.post('http://localhost:3000/auth/login',{username:user, password:password })
            const {id,email,name,type,state_or_province,city} = dataResponse.data
            api.defaults.headers.common['Authorization'] = `Bearer ${dataResponse.data.access_token}`
            await setUser({id,email,name,type,state_or_province,city})
            localStorage.setItem("signIn", JSON.stringify({id,email,name,type, token: dataResponse.data.access_token}) )

        } catch (error) {
            
            toast({
                title: error?.response.data.message,
                status: 'error',
                duration: 5000,
                isClosable: true,
                position:'top-right',
                
            })
            
        }
    }

    function logOut(){
        api.defaults.headers.common['Authorization'] = ''
        localStorage.removeItem('signIn')
        setUser({} as userProps)

    }


    return(<AuthContext.Provider value={{
        user,
        isUserLoading,
        signIn,
        logOut
    }}>
        {children}
    </AuthContext.Provider>)


}