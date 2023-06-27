import { srfApi } from "services/apiService";

/**
 * Controller de validação de autenticação do usuário.
 * Usa a API / Backend para validar as credenciais, e retorna
 * a validação como um middleware.
 * @method authUser
 * @memberof module:Auth
 * @param {String} username nome de usuário
 * @param {String} password senha do usuário
 * @returns {Component} componente estilizado com máscara
 */
export const authUser = async (username, password) => {
  try {
    const { data: auth } = await srfApi.post(
      `/auth/login`,
      {
        username,
        password,
      },
      {
        headers: {
          "Content-Type": "application/json",
          origin: process.env.NEXT_PUBLIC_URL_SRF_FRONTEND,
        },
      }
    );
    return auth;
  } catch (error) {
    return exceptionHandler(error, 0);
  }
};
