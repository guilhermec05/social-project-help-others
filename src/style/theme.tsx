import {extendTheme } from '@chakra-ui/react'

import "@fontsource/roboto"


const theme = extendTheme({
    colors:{
      primary:'#2CAE8C',
      primaryLight:'#6BE1C2',
      primaryDark:'#548B71',
      dark:'#242424',
      dark_light:'#757575',
      secondary:'#FFFFFF',
      secondaryLight:'#e0e0e0',
      danger:'#EA4335',
      danger_dark:'#db4335',
      success:'#5CA95F',
      warning:'#FBBC05',
      warning_danger: '#e0a800'
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
          fontFamily:`'Roboto', sans-serif`,

        }
      }
    }
 })


//  { font-family:; }

export {theme}