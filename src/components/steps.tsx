import {  Flex, Heading, Box  } from "@chakra-ui/react";
import {Step,Stepper, useSteps ,StepIndicator,StepStatus,StepSeparator,StepTitle} from '@chakra-ui/stepper'
import { GrInProgress } from "react-icons/gr";
import { BiDonateHeart } from "react-icons/bi";
import { FaCheck } from "react-icons/fa";
import { useEffect } from "react";

const steps = [
  { title: "Em processo", },
  { title: "Doado", },
  { title: "Completo" },
];

interface stepProps{
  state: number
}

export function StepsMain({state}:stepProps){
 
  const { activeStep,setActiveStep  } = useSteps({
    index: state,
    count: steps.length, 
  })

  useEffect(()=>{
    setActiveStep(state)
  },[state])
  
  return (
    <Flex flexDir="column" width="100%">
      <Stepper
        index={activeStep}
        colorScheme="green"
        height='200px'
        orientation='vertical'
        gap='0'
      >
        {steps.map((v,k) =>{
         return  <Step key={k} >
            <StepIndicator>
              <StepStatus
                  complete={<GrInProgress />}
                  incomplete={<BiDonateHeart />}
                  active={<FaCheck />}
              />
            </StepIndicator>
            <Box flexShrink='0'>
              <StepTitle>{v.title}</StepTitle>
            </Box>
            <StepSeparator/>
          </Step>
        })}
      </Stepper>
    </Flex>
  );
};