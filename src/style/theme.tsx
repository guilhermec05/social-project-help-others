import {extendTheme } from '@chakra-ui/react'
import chakraTheme from '@chakra-ui/theme'
import "@fontsource/roboto"

const { Button, Input } = chakraTheme.components
import { StepsTheme as Steps } from "chakra-ui-steps";


const theme = extendTheme({
    colors:{
      primary:'#2CAE8C',
      primaryLight:'#6BE1C2',
      primaryDark:'#548B71',
      dark:'#242424',
      dark_light:'#757575',
      secondary:'#FFFFFF',
      secondaryLight:'#dadada',
      danger:'#EA4335',
      success:'#5CA95F',
      warning:'#FBBC05'
    },
    fontSizes:{
      'h1':'48px',
      'h2':'40px',
      'h3':'33px',
      'h4':'28px',
      'h5':'23px',
      'h6':'19px',
      'p':'16px',
      's':'14px',
      'xs':'12px'
    },
    styles: {
      global:{
        body: {
          fontFamily:`'Roboto', sans-serif`
        }
      }
    },
    components: {
      Button,
      Input,
      Steps
    },
 })


//  { font-family:; }

export {theme}