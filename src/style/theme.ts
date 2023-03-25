import {extendBaseTheme } from '@chakra-ui/react'
import chakraTheme from '@chakra-ui/theme'

const { Button, Input } = chakraTheme.components


const theme = extendBaseTheme({
    components: {
      Button,
      Input
    },
  })


export {theme}