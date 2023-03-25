import { ChakraBaseProvider } from '@chakra-ui/react'
import {theme} from './style/theme'
import {  RouterProvider } from "react-router-dom";
import { router } from './routes/routes';


function App() {

  return (
    <ChakraBaseProvider theme={theme}>
      <RouterProvider router={router} />
    </ChakraBaseProvider>
  )
}

export default App
