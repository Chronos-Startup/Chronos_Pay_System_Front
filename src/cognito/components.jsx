import { useTheme, View, Text, Heading, useAuthenticator, Button, Divider } from "@aws-amplify/ui-react";

const components = {
  Footer() {
    const { tokens } = useTheme();

    return (
      <View textAlign="center" padding={tokens.space.large}>
        <Text color={tokens.colors.neutral[80]}>&copy; Chronos Pay. Todos os direitos reservados.</Text>
      </View>
    );
  },

  SignIn: {
    Header() {
      const { tokens } = useTheme();

      return (
        <Heading padding={`${tokens.space.xl} 0 0 ${tokens.space.xl}`} fontSize={24} level={3}>
          Bem-vindo de volta
          <Text
            style={{
              fontSize: "14",
              marginTop: "10px",
              fontWeight: 400,
              color: "#9CA3AF",
            }}
            fontSize={14}
          >
            Acesse sua conta para gerenciar pagamentos e integrações.
          </Text>
        </Heading>
      );
    },

    Footer() {
      const { toForgotPassword, toSignUp } = useAuthenticator();

      return (
        <View
          textAlign="center"
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "16px",
          }}
          marginTop="0.25rem"
        >
          <Text
            className="forgotPassword"
            textAlign="right"
            fontSize={12}
            color="#D9B341"
            style={{ cursor: "pointer" }}
            onClick={toForgotPassword}
          >
            Esqueci minha senha
          </Text>

          <View
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
            }}
          >
            <Divider />
            <Text
              style={{
                color: "#6B7280",
                fontSize: 12,
                textWrap: "nowrap",
              }}
            >
              NOVO POR AQUI?
            </Text>
            <Divider />
          </View>

          <Button
            style={{
              border: "#1F2937 1px solid",
              borderRadius: "8px",
              padding: "16px 14px",
              width: "100%",
              fontWeight: 400,
            }}
            size="small"
            onClick={toSignUp}
          >
            Criar uma conta
          </Button>
        </View>
      );
    },
  },

  SignUp: {
    Header() {
      const { tokens } = useTheme();

      return (
        <Heading padding={`${tokens.space.xl} 0 0 ${tokens.space.xl}`} level={3}>
          Criar sua conta
          <Text
            style={{
              fontSize: "14",
              marginTop: "10px",
              fontWeight: 400,
              color: "#9CA3AF",
            }}
            fontSize={14}
          >
            Preencha os dados abaixo para começar a usar o Chronos Pay
          </Text>
        </Heading>
      );
    },
    Footer() {
      const { toSignIn } = useAuthenticator();

      return (
        <View
          textAlign="center"
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "16px",
          }}
          marginTop="1rem"
        >
          <View
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
            }}
          >
            <Divider />
            <Text
              style={{
                color: "#6B7280",
                fontSize: 12,
                textWrap: "nowrap",
              }}
            >
              JÁ TEM UMA CONTA?
            </Text>
            <Divider />
          </View>

          <Button
            style={{
              border: "#1F2937 1px solid",
              borderRadius: "8px",
              padding: "16px 14px",
              width: "100%",
              fontWeight: 400,
            }}
            size="small"
            onClick={toSignIn}
          >
            FAZER LOGIN
          </Button>
        </View>
      );
    },
  },

  ConfirmSignUp: {
    Header() {
      return <Heading level={3}>Confirme suas informações</Heading>;
    },
  },

  SetupTotp: {
    Header() {
      const { tokens } = useTheme();
      return (
        <Heading padding={`${tokens.space.xl} 0 0 ${tokens.space.xl}`} level={3}>
          Configuração do TOTP
        </Heading>
      );
    },
  },

  ConfirmSignIn: {
    Header() {
      const { tokens } = useTheme();
      return (
        <Heading padding={`${tokens.space.xl} 0 0 ${tokens.space.xl}`} level={3}>
          Confirme seu login
        </Heading>
      );
    },
    Footer() {
      return <Text>Informações do rodapé</Text>;
    },
  },

  ForgotPassword: {
    Header() {
      return (
        <>
          <Heading level={3}>Recuperar senha</Heading>
        </>
      );
    },
  },

  ConfirmResetPassword: {
    Header() {
      const { tokens } = useTheme();
      return (
        <Heading padding={`${tokens.space.xl} 0 0 ${tokens.space.xl}`} level={3}>
          Confirme nova senha
        </Heading>
      );
    },
    Footer() {
      return <Text>Informações do rodapé</Text>;
    },
  },

  SelectMfaType: {
    Header() {
      return <Heading level={3}>Selecione o tipo de MFA desejado</Heading>;
    },
    Footer() {
      return <Text>Informações do rodapé</Text>;
    },
  },

  SetupEmail: {
    Header() {
      return <Heading level={3}>Configuração de MFA por e-mail</Heading>;
    },
    Footer() {
      return <Text>Informações do rodapé</Text>;
    },
  },
};

export default components;
