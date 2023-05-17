import { ChakraBaseProvider } from '@chakra-ui/react'
import {theme} from './style/theme'
import {  RouterProvider } from "react-router-dom";
import { router } from './routes/routes';
import { AuthContextProvider } from './contexts/AuthContext';



function App() {

  return (
    <ChakraBaseProvider theme={theme}>
        <AuthContextProvider>
            <RouterProvider router={router} />
        </AuthContextProvider>
    </ChakraBaseProvider>
  )
}

export default App
