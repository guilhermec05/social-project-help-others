// import { useColorModeValue } from "@chakra-ui/color-mode";
// import { Box } from "@chakra-ui/layout";
import { Button, Flex, Heading } from "@chakra-ui/react";
import { Step, Steps, useSteps } from "chakra-ui-steps";
import { GrInProgress } from "react-icons/gr";
import { BiDonateHeart } from "react-icons/bi";
import { FaCheck } from "react-icons/fa";
// GrInProgress

const steps = [
  { label: "Em processo", icon: GrInProgress },
  { label: "Doado", icon: BiDonateHeart },
  { label: "Completo", icon: FaCheck },
];

interface stepProps{
  variant: "circles" | "circles-alt" | "simple" | undefined;
  state: number
}

export function StepsMain({variant,state}:stepProps){

  const { activeStep, setStep } = useSteps({
    initialStep: state,
  });
 
  return (
    <Flex flexDir="column" width="100%">
      <Steps
        variant={variant}
        // orientation={'vertical'}
        colorScheme="green"
        activeStep={activeStep}
      >
        {steps.map(({ label, icon }, index) => (
          <Step label={label} key={label} icon={icon}>
          </Step>
        ))}
      </Steps>
    </Flex>
  );
};