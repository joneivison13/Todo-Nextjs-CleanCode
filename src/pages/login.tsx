"use client";
import { signIn } from "next-auth/react";
import { Roboto } from "next/font/google";
import { useRouter } from "next/router";
import { useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import "../app/globals.css";
import { toast, ToastContainer } from "react-toastify";

const roboto = Roboto({
  weight: ["400", "700"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  display: "swap",
});

export default function Login() {
  const router = useRouter();
  const [mostSignIn, setMostSignin] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: any | undefined) => {
    e.preventDefault();
    try {
      const res = await signIn("credentials", {
        redirect: false,
        username: e.target.email.value,
        password: e.target.password.value,
      });
      if (!res?.ok) {
        toast.error(res?.error);
      } else {
        router.push("/");
      }
    } catch (error: any) {
      toast.error(error.message);
    }
  };
  function showRegister() {}

  return (
    <main className="login_page h-screen w-full flex items-center justify-center">
      <style jsx global>{`
        html {
          font-family: ${roboto.style.fontFamily};
        }
      `}</style>
      <div
        className={`auth_form flex relative ${
          mostSignIn ? "auth_form-show" : ""
        }`}
      >
        <div
          className={`flex justify-between items-center w-[550px] bg-stone-700  overflow-hidden relative login_form`}
          // onClick={() => alert("klsdf")}
        >
          {mostSignIn && (
            <button
              className="opener opener_login absolute top-0 left-0 p-2 flex justify-around w-[35px]"
              type="button"
              onClick={() => setMostSignin((mostSignIn) => !mostSignIn)}
            >
              <div className="bars bg-white"></div>
              <div className="bars bg-white"></div>
            </button>
          )}
          <div
            onClick={() => {
              if (mostSignIn) {
                setMostSignin(false);
              }
            }}
            className="p-10 pr-20 w-[550px] login_form"
          >
            <form
              className="flex  flex-col items-start   w-full"
              autoComplete="off"
              onSubmit={handleSubmit}
            >
              <h1 className="text-[#4285F4] mb-4 text-2xl font-semibold">
                ENTRE EM SUA CONTA
              </h1>
              <label
                className="text-left text-[#e8e6e380] my-2"
                htmlFor="username"
              >
                E-mail
              </label>
              <input
                className="w-full bg-zinc-700 text-xl text-white"
                name="email"
                type="email"
                autoComplete="off"
                required
                autoFocus
                onFocus={(e) => e.target.select()}
              />
              <label className="text-[#e8e6e380] my-2 " htmlFor="password">
                Senha
              </label>
              <input
                className="w-full text-white"
                name="password"
                type="password"
                required
                onFocus={(e) => e.target.select()}
              />
              <div className="flex justify-between w-full my-6">
                <div className="flex items-center ">
                  <input
                    type="checkbox"
                    className="w-4 h-4 mr-2 bg-gray-200 text-gray-50 border-gray-300 rounded  "
                  />
                  <p className="text-[#e8e6e380]">Lembre de min</p>
                </div>
                <a className="text-[#4285F4]">Esqueci minha senha</a>
              </div>

              <button
                className="bg-blue-600 w-full text-white  h-11 rounded-lg"
                type="submit"
              >
                Entrar
              </button>
            </form>
          </div>
          {/* <div className="w-2 bg-blue-500 h-full "></div> */}

          <div
            id="register"
            className={`sign_in-form bg-blue-600 h-full ${
              mostSignIn ? "sign_in-form-show" : ""
            } w-[520px] p-10 absolute`}
            onClick={() => setMostSignin(true)}
          >
            <button
              className="opener absolute top-0 left-0 p-2 flex justify-around w-[35px]"
              type="button"
              onClick={() => setMostSignin((mostSignIn) => !mostSignIn)}
            >
              <div className="bars bg-slate-700"></div>
              <div className="bars bg-slate-700"></div>
            </button>
            <div className="flex justify-between">
              <h1 className="my-4 text-3xl text-white font-semibold">
                REGISTRAR
              </h1>
              {/* <button
                className="sign_in-form_close-button bg-slate-800 rounded-full w-[60px] h-[60px] flex items-center justify-center"
                // onClick={() => {
                //   setMostSignin(true);
                //   alert("klsfg");
                // }}
                onClick={() => setMostSignin((mostSignIn) => !mostSignIn)}
              >
                <Image
                  src={"/assets/cancel.png"}
                  alt="close.png"
                  width={30}
                  height={30}
                />
              </button> */}
            </div>
            <label className="text-left text-white my-2" htmlFor="username">
              Nome de usuário
            </label>
            <input
              className="w-full bg-blue-700 text-xl my-2"
              name="username"
              type="text"
            />
            <label className="text-left text-white my-2" htmlFor="username">
              E-mail
            </label>
            <input
              className="w-full bg-blue-700 text-xl my-2"
              name="e-mail"
              type="email"
            />
            <label className="text-white my-4 " htmlFor="password">
              Senha
            </label>
            <input
              className="w-full bg-blue-700 my-2"
              name="confirm_password"
              type="password"
            />
            <label
              className="text-left text-white my-4"
              htmlFor="confirm_password"
            >
              Confirme sua senha
            </label>
            <input
              className="w-full bg-blue-700 text-xl"
              name="confirm_password"
              type="password"
            />
            <button className="w-full font-semibold bg-slate-800 h-11 text-[#4285F4] mt-5">
              REGISTER
            </button>
          </div>
        </div>
      </div>
      <div className="mancha mancha1"></div>
      <div className="mancha mancha2"></div>
      <div className="mancha mancha3"></div>
      <div className="mancha mancha4"></div>
      <div className="mancha mancha5"></div>
      <ToastContainer
        position="top-left"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </main>
  );
}
