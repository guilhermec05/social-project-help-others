import { Box, Flex, Text,Icon } from "@chakra-ui/react";
import { ButtonMain } from "../components/button";
import { Logo } from "../components/logo";
import { InputMain } from "../components/input";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { FaUser } from "react-icons/fa";




export function FirstAccess() {
  const navigate = useNavigate();


  const schema = yup.object({
    password: yup
      .string()
      .required("A senha é obrigatória")
      .min(8, "A senha deve ter no mínimo 8 caracteres")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/,
        "A senha deve conter pelo menos uma letra maiúscula, uma letra minúscula, um número e um caractere especial"
      ),
    confirmPassword: yup
      .string()
      .required("Confirme a senha")
      .oneOf([yup.ref("password")], "As senhas devem coincidir"),
  });
  type FormData = yup.InferType<typeof schema>;
  const { handleSubmit, control } = useForm<FormData>({
    resolver: yupResolver(schema),
  });
  function onSubmit(data: FormData) {
    console.log(data);
    navigate("/home");
  }
  // Simula o nome do usuário elevado a administrador
  const userName = "Admin User";
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Box
        bg={"primary"}
        minHeight={"100vh"}
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
        p={5}
        px={2}
      >
        <Box
          bg={"secondary"}
          display={"flex"}
          flexDirection={"column"}
          borderRadius={5}
          py={"100px"}
          w={"100%"}
          maxW={"700px"}
          gap={7}
          p={12}
          px={2}
        >
          <Flex justifyContent={"center"} alignItems={"center"} flexDirection={"column"}>
            <Logo width={"100px"} />
            <Text fontSize={"h5"}>Primeiro Acesso</Text>
          </Flex>
          <Flex flexDirection={"column"} w={"100%"}  gap={5} transition={"all 1s"} alignItems={"center"} justifyContent={"center"}>
            <Text fontSize={'h6'}><Icon as={FaUser}/> {userName}</Text>
            <InputMain placeholder="Nova senha" name={"password"} useControl={control} type={"password"} maxW={"400px"} w={"100%"} h={"50px"}  />
            <InputMain placeholder="Confirme a nova senha" name={"confirmPassword"} useControl={control} type={"password"} maxW={"400px"} w={"100%"} h={"50px"} marginBottom={"2"} />
          </Flex>
          <Flex justifyContent={"center"}>
            <ButtonMain title="Confirmar" bg={"primaryDark"} p={"25px"} w={"100%"} maxW={"200px"} type={"submit"} />
          </Flex>
        </Box>
      </Box>
    </form>
  )
}