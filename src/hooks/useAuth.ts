"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { parseCookies } from "nookies";
import { useSession } from "next-auth/react";

export function useAuth() {
  const session = useSession();
  const router = useRouter();

  useEffect(() => {
    console.log(session.status, session.status === "unauthenticated");
    if (session.status === "unauthenticated") {
      router.push("/login");
    }
  }, [session, router]);
}
