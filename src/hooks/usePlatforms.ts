import { useState, useEffect } from "react";

export function usePlatformType() {
  const [platform, setPlatform] = useState("desktop");

  useEffect(() => {
    // Esta função verifica se o dispositivo é móvel
    const checkIfMobile = () => {
      return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      )
        ? "mobile"
        : "desktop";
    };

    // Definir a plataforma com base no dispositivo atual
    setPlatform(checkIfMobile());

    // Opcional: Adicionar um listener para mudanças de tamanho da janela, se necessário
    window.addEventListener("resize", () => setPlatform(checkIfMobile()));
    return () =>
      window.removeEventListener("resize", () => setPlatform(checkIfMobile()));
  }, []);

  return platform;
}
