("");
import type { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import { useEffect } from "react";
import { useSession, signIn } from "next-auth/react";
import { useRouter } from "next/router";

export async function getServerSideProps(context: any) {
  const session = await getSession({ req: context.req });

  if (!session) {
    // Redirecionar para a página de login se o usuário não estiver autenticado
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  // Se o usuário estiver autenticado, renderize a página com as props necessárias
  return {
    props: { session },
  };
}

const ProtectedPage = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    console.log(status, session);
    if (status !== "loading" && !session) {
      signIn("credentials", { callbackUrl: "/login" });
    }
  }, [session, status, router]);

  if (status === "loading") {
    return <div>Carregando...</div>;
  }

  // O conteúdo da sua página protegida aqui
  return <div>Página Protegida</div>;
};

export default ProtectedPage;
