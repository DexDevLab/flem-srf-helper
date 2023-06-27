import { ChakraProvider } from "@chakra-ui/react";
import { SidebarWrapper } from "components/Wrappers";
import { SessionProvider } from "next-auth/react";
import Auth from "components/Auth";
import theme from "styles/theme";


/**
 * Função de Caller da aplicação.
 * @method MyApp
 * @param {Object} session componente de sessão de login
 * @returns Renderização da página e da aplicação
 */
function MyApp({ Component, pageProps: { session, ...pageProps }, router }) {
  return (
    <ChakraProvider theme={theme}>
      <SessionProvider session={session}>
        {Component.auth && (
          <Auth>
            {Component.dashboard ? (
              <SidebarWrapper {...pageProps}>
                <Component {...pageProps} />
              </SidebarWrapper>
            ) : (
              <Component {...pageProps} />
            )}
          </Auth>
        )}
        {!Component.auth && Component.dashboard && (
          <SidebarWrapper {...pageProps}>
            <Component {...pageProps} />
          </SidebarWrapper>
        )}
        {!Component.auth && !Component.dashboard && (
          <Component {...pageProps} />
        )}
      </SessionProvider>
    </ChakraProvider>
  );
}

export default MyApp;
