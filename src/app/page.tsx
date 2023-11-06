"use client";
import { useEffect } from "react";
import Buttons from "@/components/Buttons";
import Header from "@/components/Header";
import useKeyboardShortcut from "@/hooks/useKeyboardShortcut";
import Image from "next/image";
import type { GetServerSidePropsContext } from "next";
import { useAuth } from "@/hooks/useAuth";

export default function Home() {
  useKeyboardShortcut("n", "Shift", () => alert("lçslfg"));
  useAuth();

  useEffect(() => {}, []);
  return (
    <>
      <Header />
      <main className="max-w-[1400px] w-full h-full mx-auto relative ">
        <div className="content h-full">
          <div className="no-data h-full flex items-center justify-center flex-col">
            <div className="not_found-todo w-full max-w-[600px] mx-auto">
              <Image
                src="/assets/todo_notfound.jpg"
                alt="todo not found"
                width={1153}
                height={1920}
                layout="responsive"
              />
            </div>
            <h1 className="text-center mt-8 font-medium leading-7 px-3">
              Não encontramos nenhum <span>ToDo List</span> criado por você.{" "}
              <br />
              Para criar um novo, clique no botão{" "}
              <span className="whitespace-nowrap bg-blue-800 py-1 px-2 rounded-xl text-white">
                Criar nova pendência
              </span>{" "}
              ou se o comand{" "}
              <code className="whitespace-nowrap bg-slate-700 py-1 px-2 rounded-xl text-white">
                Shift + N
              </code>
            </h1>
          </div>
        </div>
        <Buttons
          variants="base"
          icon={{
            icon: "/assets/add.png",
            description: "sd",
            height: 20,
            width: 20,
          }}
          text="Criar nova pendência"
          badge={{
            content: "Shift + N",
            position: "top-left",
            activity: ["hideon-mobile"],
          }}
          style={{ position: "absolute", bottom: "0", right: "0" }}
          className="pulse"
        />
      </main>
    </>
  );
}
