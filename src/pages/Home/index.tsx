import React, { useState } from "react";
import { RiHeartFill } from "react-icons/ri";
import { FiCopy, FiMoon, FiSun } from "react-icons/fi";

import LogoImg from "../../assets/logo.svg";

import { useTheme } from "../../contexts/ThemeContext";

function App() {
  const [convertText, setConvertText] = useState("");
  const [convertCPF, setConvertCPF] = useState("");
  const [cpfMode, setCpfMode] = useState(false);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState("");

  const { theme, setTheme } = useTheme();

  function handleToggleTheme() {
    setTheme(!theme);
  }

  function handleConvertToTitleCase(text: string) {
    let words = text.toLowerCase().split(" ");
    for (let i = 0; i < words.length; i++) {
      let word = words[i];

      if (word === "") {
        continue;
      }
      words[i] = word[0].toUpperCase() + word.slice(1);
    }

    const result = words.join(" ");
    setConvertText(result);
  }

  function handleConvertToUpperCase(text: string) {
    const result = text.toUpperCase();
    setConvertText(result);
  }

  function handleConvertToLowerCase(text: string) {
    const result = text.toLowerCase();
    setConvertText(result);
  }

  function handleFormatCPF(cpf: string) {
    if (cpf.length !== 11) {
      setError("ERRO: CPF inválido deve ter 11 dígitos.");

      setTimeout(() => {
        setError("");
      }, 2000);
    }

    cpf = cpf.replace(/[^\d]/g, "");

    const result = cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");

    setConvertCPF(result);
  }

  function handleRemoveFormatCPF(cpf: string) {
    const cpfFormated = cpf.split(".").join("").split("-").join("");

    const result = cpfFormated;

    setConvertCPF(result);
  }

  async function handleCopyText(text: string) {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 700);
    } catch (err) {
      console.error("Erro ao copíar o texto: ", err);
    }
  }

  return (
    <div className="bg-gray-100 dark:bg-neutral-950  flex justify-center w-screen h-screen md:mt-0 mt-10">
      <div className="text-neutral-700 dark:text-gray-100 flex justify-center items-center">
        <div className="flex flex-col items-center">
          <header className="mt-10 flex flex-row items-center">
            <img
              src={LogoImg}
              className="w-6 md:w-8 mr-2"
              alt="Logo representada pela letra C"
            />
            <p className="text-2xl md:text-3xl text-purple-900 dark:text-purple-100">
              CONVERSOR DE{" "}
              <button
                type="button"
                className="text-violet-500 hover:text-violet-600 focus:outline-none hover:underline focus:ring-2 focus:ring-violet-900"
                onClick={() => setCpfMode(!cpfMode)}
              >
                <span className="text-purple-500 dark:text-purple-500 underline">
                  {cpfMode ? "CPF" : "TEXTOS"}
                </span>
              </button>
            </p>
          </header>

          {error && <span className="text-red-500 mt-2">{error}</span>}

          {cpfMode ? (
            <div className="mt-10 w-[300px]">
              <div className="flex flex-col items-center">
                <label className="block">
                  <span className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-gray-500">
                    CPF
                  </span>
                  <input
                    placeholder="000.000.000-00"
                    type="string"
                    onChange={(e) => setConvertCPF(e.target.value)}
                    value={convertCPF}
                    className="w-[300px] px-3 py-2 bg-white dark:bg-neutral-1000 border shadow-sm  border-stone-200 dark:border-neutral-800 placeholder-slate-500 dark:placeholder-slate-400 focus:outline-none focus:border-violet-500 focus:ring-violet-500 block rounded-[0.31rem] sm:text-sm focus:ring-1 resize-none"
                  />
                </label>

                <div className="flex flex-col lg:flex-col gap-2 mt-3 items-center justify-between ">
                  <div className="flex flex-col md:flex-col gap-2 md:mt-0 sm:mt-2  items-center justify-between">
                    <button
                      onClick={() => handleFormatCPF(convertCPF)}
                      className="text-neutral-700 dark:text-gray-100  bg-white dark:bg-neutral-800 hover:bg-slate-200 dark:hover:bg-neutral-700 p-[20px] w-[300px] h-[20px] flex items-center justify-center rounded-[0.31rem] focus:ring-4 focus:outline-non focus:ring-stone-300 e dark:focus:ring-neutral-600 font-medium focus:outline-none"
                    >
                      Colocar pontuação
                    </button>
                    <button
                      onClick={() => handleRemoveFormatCPF(convertCPF)}
                      className="text-neutral-700 dark:text-gray-100  bg-white dark:bg-neutral-800 hover:bg-slate-200 dark:hover:bg-neutral-700 p-[20px] w-[300px] h-[20px] flex items-center justify-center rounded-[0.31rem] focus:ring-4 focus:outline-non focus:ring-stone-300 e dark:focus:ring-neutral-600 font-medium focus:outline-none"
                    >
                      Tirar pontuação
                    </button>

                    <button
                      onClick={() => handleCopyText(convertCPF)}
                      className="text-white bg-violet-500 hover:bg-violet-600 p-[20px] w-[300px]  h-[30px] flex justify-center items-center rounded-[0.31rem] font-bold disabled:bg-green-600 disabled:cursor-not-allowed active:ring-4 focus:ring-4 focus:outline-none focus:ring-violet-500 active:ring-violet-500 dark:focus:ring-violet-900 dark:active:ring-violet-900 dark:active:disabled:ring-green-900 active:disabled:ring-green-500 disabled:opacity-70"
                      disabled={copied}
                    >
                      {copied ? "Copiado!" : "Copiar"}
                      {!copied && <FiCopy className="mx-1" stroke-width={3} />}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <>
              <div className="mt-10 w-[300px] xl:w-[800px] lg:w-[800px] md:w-[600px] sm:w-[300px]">
                <label className="block">
                  <span className="flex md:flex-row flex-col justify-between">
                    <span className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-gray-500">
                      Texto
                    </span>
                    <span className="text-sm text-neutral-400 dark:text-neutral-500  flex justify-end ">
                      Total de caracteres: {convertText.length} | Total de
                      palavras:
                      {convertText.length == 0
                        ? 0
                        : convertText.split(/\s+/).length}{" "}
                      | Total de Linhas:{" "}
                      {convertText.length == 0
                        ? 0
                        : convertText.split(/\n/).length}
                    </span>
                  </span>
                  <textarea
                    name="text"
                    rows={8}
                    className="w-full mt-1 px-3 py-2 bg-white dark:bg-neutral-1000 border shadow-sm  border-stone-200 dark:border-neutral-800 placeholder-slate-500 dark:placeholder-slate-400 focus:outline-none focus:border-violet-500 focus:ring-violet-500 block rounded-[0.31rem] sm:text-sm focus:ring-1 resize-none"
                    placeholder="Insira o texto a ser convertido..."
                    onChange={(e) => setConvertText(e.target.value)}
                    value={convertText}
                  />
                </label>
              </div>

              <div className="flex flex-col lg:flex-row gap-2 mt-3 items-center justify-between w-full ">
                <div className="flex flex-col md:flex-row gap-2 md:mt-0 sm:mt-2  items-center justify-between">
                  <button
                    onClick={() => handleConvertToUpperCase(convertText)}
                    className="text-neutral-700 dark:text-gray-100  bg-white dark:bg-neutral-800 hover:bg-slate-200 dark:hover:bg-neutral-700 p-[20px] w-[300px] sm:w-[300px] md:w-auto lg:w-[150px] h-[30px] flex items-center justify-center rounded-[0.31rem] focus:ring-4 focus:outline-non focus:ring-stone-300 e dark:focus:ring-neutral-600 font-medium focus:outline-none"
                  >
                    MAIÚSCULAS
                  </button>
                  <button
                    onClick={() => handleConvertToLowerCase(convertText)}
                    className="text-neutral-700 dark:text-gray-100  bg-white dark:bg-neutral-800 hover:bg-slate-200 dark:hover:bg-neutral-700 p-[20px] w-[300px] sm:w-[300px] md:w-auto lg:w-[150px] h-[30px] flex items-center justify-center rounded-[0.31rem] focus:ring-4 focus:outline-non focus:ring-stone-300 e dark:focus:ring-neutral-600 font-medium focus:outline-none"
                  >
                    minúsculas
                  </button>
                  <button
                    onClick={() => handleConvertToTitleCase(convertText)}
                    className="text-neutral-700 dark:text-gray-100  bg-white dark:bg-neutral-800 hover:bg-slate-200 dark:hover:bg-neutral-700 p-[20px] w-[300px] sm:w-[300px] md:w-auto lg:w-[150px] h-[30px] flex items-center justify-center rounded-[0.31rem] focus:ring-4 focus:outline-non focus:ring-stone-300 e dark:focus:ring-neutral-600 font-medium focus:outline-none"
                  >
                    Estilo Título
                  </button>
                </div>

                <button
                  onClick={() => handleCopyText(convertText)}
                  className="text-white bg-violet-500 hover:bg-violet-600 p-[20px] w-[300px] sm:w-[300px] md:w-[410px] lg:w-[150px] h-[30px] flex justify-center items-center rounded-[0.31rem] font-bold disabled:bg-green-600 disabled:cursor-not-allowed active:ring-4 focus:ring-4 focus:outline-none focus:ring-violet-500 active:ring-violet-500 dark:focus:ring-violet-900 dark:active:ring-violet-900 dark:active:disabled:ring-green-900 active:disabled:ring-green-500 disabled:opacity-70"
                  disabled={copied}
                >
                  {copied ? "Copiado!" : "Copiar"}
                  {!copied && <FiCopy className="mx-1" stroke-width={3} />}
                </button>
              </div>
            </>
          )}

          <footer className="mt-[80px] mb-[50px] flex flex-row">
            <div className="flex flex-row items-center ">
              <p>Made with</p>
              <RiHeartFill className="mx-1 text-violet-500" />
              <p>by</p>
              <div>
                <a
                  className="mx-1 text-violet-500 hover:text-violet-600 focus:outline-none hover:underline focus:ring-2 focus:ring-violet-900"
                  href="https://rodrigocelvo.dev"
                  target="_blank"
                >
                  Rodrigo Celvo
                </a>{" "}
                |{" "}
                <a
                  className="mx-1 text-violet-500 hover:text-violet-600 focus:outline-none hover:underline focus:ring-2 focus:ring-violet-900"
                  href="https://github.com/rodrigocelvo/convertex"
                  target="_blank"
                >
                  Source
                </a>
              </div>

              <button
                type="button"
                className="md:absolute md:right-48 lg:right-52 xl:right-72 flex items-center focus:ring-2 rounded-[0.31rem] dark:focus:ring-violet-900 focus:ring-violet-500 focus:outline-none"
              >
                {theme ? (
                  <FiMoon
                    size={16}
                    className="cursor-pointer text-slate-500 hover:bg-white hover:dark:bg-neutral-900 rounded-[0.31rem] justify-center p-3 h-10 w-10"
                    onClick={handleToggleTheme}
                  />
                ) : (
                  <FiSun
                    size={16}
                    className="cursor-pointer text-yellow-300 hover:bg-white hover:dark:bg-neutral-900 rounded-[0.31rem] justify-center p-3 h-10 w-10"
                    onClick={handleToggleTheme}
                  />
                )}
              </button>
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
}

export default App;
