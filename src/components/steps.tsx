import { useColorModeValue } from "@chakra-ui/color-mode";
import { Box } from "@chakra-ui/layout";
import { Button, Flex, Heading } from "@chakra-ui/react";
import { Step, Steps, useSteps } from "chakra-ui-steps";
import { FiClipboard, FiDollarSign, FiUser } from "react-icons/fi";

const steps = [
  { label: "Login", icon: FiUser },
  { label: "Verification", icon: FiDollarSign },
  { label: "Pay", icon: FiClipboard },
];

interface stepProps{
  variant: "circles" | "circles-alt" | "simple" | undefined;
  state: 0 | 1 | 2| 3
}

export function StepsMain({variant,state}:stepProps){

  const { activeStep, setStep } = useSteps({
    initialStep: state,
  });
 
  return (
    <Flex flexDir="column" width="100%">
      <Steps
        variant={variant}
        orientation={'vertical'}
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