import { Center, Spinner } from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import { PulseLoader } from "react-spinners";

/**
 * Componente de transição para autenticação.
 * @method Auth
 * @memberof module:components
 * @param {Component} children o componente-filho que este irá compor.
 * @returns {Component} componente de botão
 */
const Auth = ({ children }) => {
  const { data: session, status } = useSession({ required: true });
  const isUser = !!session?.user;

  if (isUser) {
    return children;
  }

  return (
    <Center h="100vh">
      <PulseLoader color="var(--chakra-colors-primary-600)" size={20} />
    </Center>
  );
};

export default Auth;
