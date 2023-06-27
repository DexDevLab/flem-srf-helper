/**
 * Notificações de toast padrão.
 * @constant toastData
 * @returns {Object} mensagens de toast.
 */
export const toastData = {
  Signin: "Try signing with a different account.",
  OAuthSignin: "Try signing with a different account.",
  OAuthCallback: "Try signing with a different account.",
  OAuthCreateAccount: "Try signing with a different account.",
  EmailCreateAccount: "Try signing with a different account.",
  Callback: "Try signing with a different account.",
  OAuthAccountNotLinked:
    "To confirm your identity, sign in with the same account you used originally.",
  EmailSignin: "Check your email address.",
  CredentialsSignin: {
    title: "Falha na autenticação",
    description: "Usuário e/ou senha inválidos",
    status: "error",
  },
  default: "Unable to sign in.",
};
