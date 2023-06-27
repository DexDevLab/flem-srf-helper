/**
 * Componentes de Autenticação
 * @module auth
 */

import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  Stack,
  useColorModeValue as mode,
  useBreakpointValue,
  useToast,
} from "@chakra-ui/react";
import { InputBox } from "components/Inputs/InputBox";
import { PasswordInputBox } from "components/Inputs/PasswordInputBox";
import { Logo } from "components/Logo";
import { BrandBg } from "components/Logo/BrandBG";
import { useCustomForm } from "hooks";
import { toastData } from "messages/toasts/signInPage";
import { getCsrfToken, getSession, signIn } from "next-auth/react";
import Head from "next/head";
import { useRouter } from "next/router";
import { useState } from "react";
import { FiCheck } from "react-icons/fi";
import { PulseLoader } from "react-spinners";
import { exceptionHandler } from "utils/exceptionHandler";
import { maskCapitalize } from "utils/maskCapitalize";

/**
 * Componente que resolve a autenticação e devolve numa interface
 * para o usuário.
 * @method Signin
 * @memberof module:auth
 * @returns {Component} Componente estilizado.
 */
export default function Signin({ csrfToken, ...props }) {
  const [session, setSession] = useState({});
  const toast = useToast();
  const signInForm = useCustomForm();
  const router = useRouter();
  const position = useBreakpointValue({ base: "bottom", sm: "top-right" });

  const onSubmit = async (formData, e) => {
    e.preventDefault();
    signInForm.setLoading();
    // formData.callbackUrl = `${window.location.origin}/`;
    formData.redirect = false;
    signIn("flemCredentials", formData)
      .then(async ({ status, error, ...data }) => {
        if (status === 401) {
          toast({
            title: toastData[error].title,
            description: toastData[error].description,
            status: toastData[error].status,
            duration: 5000,
            isClosable: false,
            position,
          });
        }
        if (status === 200) {
          const session = await getSession();
          setSession(session);
          toast({
            title: `Olá, ${maskCapitalize(session.user.name)}`,
            description: "Autenticação efetuada com sucesso",
            status: "success",
            duration: 3000,
            isClosable: false,
            position,
          });
          router.push("/");
        }
      })
      .catch((error) => {
        toast(exceptionHandler(error));
      })
      .finally(signInForm.setLoaded);
  };

  return (
    <>
      <Head>
        <title>Login - SRF Helper</title>
      </Head>
      <Box
        bg={mode(
          useBreakpointValue({
            base: "white",
            sm: "transparent",
          }),
          "gray.800"
        )}
      >
        <Box
          position="fixed"
          bottom="350px"
          right="-350px"
          zIndex="hide"
          opacity={useBreakpointValue({
            base: "0.15",
            md: "0.4",
          })}
        >
          <BrandBg h="90vh" />
        </Box>
        <Container
          maxW="lg"
          py={{
            base: "12",
            md: "24",
          }}
          px={{
            base: "0",
            sm: "8",
          }}
          minH={["100vh", ""]}
        >
          <Stack spacing={4} mb={8}>
            <Flex h={[8, 16]} justifyContent="center">
              <Logo />
            </Flex>
            <Flex flexDir="column" alignContent="center">
              <Heading align="center" mb={6} color="gray.700">
                SRF Helper
              </Heading>
              <Heading
                align="center"
                color="gray.500"
                size={useBreakpointValue({
                  base: "sm",
                  md: "md",
                })}
                px={4}
              >
                Portal para aprovação e download de frequências em lote
              </Heading>

              <Heading
                align="center"
                size={useBreakpointValue({
                  base: "sm",
                  md: "md",
                })}
                mt={[3, 6]}
              >
                Faça o logon com suas credenciais
              </Heading>
            </Flex>
          </Stack>
          <Box
            py={{
              base: "0",
              sm: "8",
            }}
            px={{
              base: "4",
              sm: "10",
            }}
            bg={mode(
              "white",
              useBreakpointValue({
                base: "inherit",
                sm: "gray.700",
              })
            )}
            boxShadow={{
              base: "none",
              sm: "md",
            }}
            borderRadius={{
              base: "none",
              sm: "xl",
            }}
          >
            <Stack spacing="6">
              <form onSubmit={signInForm.handleSubmit(onSubmit)}>
                <Stack spacing="5">
                  <InputBox
                    id="username"
                    label="Usuário"
                    formControl={signInForm.control}
                  />
                  <PasswordInputBox
                    id="password"
                    formControl={signInForm.control}
                  />{" "}
                  <Button
                    colorScheme={session.user ? "green" : "primary"}
                    type="submit"
                    isLoading={signInForm.isLoading}
                    isDisabled={session.user}
                    spinner={<PulseLoader size={10} color="#fff" />}
                    _disabled={{
                      opacity: 0.8,
                      cursor: "not-allowed",
                    }}
                  >
                    {session.user ? <FiCheck size={26} /> : "Login"}
                  </Button>
                </Stack>
              </form>
            </Stack>
          </Box>
        </Container>
      </Box>
    </>
  );
}

export async function getServerSideProps(context) {
  return {
    props: {
      csrfToken: await getCsrfToken(context),
    },
  };
}
