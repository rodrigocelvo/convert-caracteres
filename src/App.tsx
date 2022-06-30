import { useState } from "react";

import LogoImg from "./logo.svg";
import CopyImg from "./copy.svg";

function App() {
  const [convertText, setConvertText] = useState("");
  const [copied, setCopied] = useState(false);

  function handleConvertToTitleCase(text: string) {
    let words = text.toLowerCase().split(" ");
    for (let letter = 0; letter < words.length; letter++) {
      let word = words[letter];

      if (word === "") {
        continue;
      }
      words[letter] = word[0].toUpperCase() + word.slice(1);
    }

    const result = words.join(" ");
    setConvertText(result);
  }

  function handleConvertToUpperCase(text: string) {
    const result = text.toUpperCase();
    setConvertText(result);
  }

  function handleConvertToLowercase(text: string) {
    const result = text.toLowerCase();
    setConvertText(result);
  }

  async function handleCopyText(text: string) {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 500);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  }

  return (
    <div className="text-gray-100 flex justify-center items-center w-screen h-screen mt-5 md:mt-0">
      <div className="flex flex-col items-center">
        <header className="mt-10 flex flex-row items-center">
          <img
            src={LogoImg}
            className="w-8 mr-2"
            alt="Logo representada pela letra C"
          />
          <p className="text-3xl text-purple-500">CONVERSOR DE TEXTOS</p>
        </header>

        {
          //w-[20rem] sm:w-[30rem] md:w-[40rem] lg:w-[45rem] xl:w-[50rem]
        }

        <div className="mt-10 w-full xl:w-[800px] lg:w-[800px] md:w-[600px] sm:w-[300px]">
          <label className="block">
            <span className="flex flex-row justify-between">
              <span className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-gray-500">
                Texto
              </span>
              <span className="text-sm text-neutral-700 flex justify-end ">
                Total de caracteres: {convertText.length}
              </span>
            </span>
            <textarea
              name="text"
              rows={8}
              className="w-full mt-1 px-3 py-2 bg-neutral-1000 border shadow-sm border-neutral-800 placeholder-slate-400 focus:outline-none focus:border-violet-500 focus:ring-violet-500 block rounded-[0.31rem] sm:text-sm focus:ring-1 resize-none"
              placeholder="Insira o texto a ser convertido..."
              onChange={(e) => setConvertText(e.target.value)}
              value={convertText}
            />
          </label>
        </div>

        <div className="flex flex-col lg:flex-row gap-2 mt-3 items-center justify-between w-full ">
          <div className="flex flex-col md:flex-row gap-2 mt-2  items-center justify-between">
            <button
              onClick={() => handleConvertToUpperCase(convertText)}
              className="bg-neutral-800 hover:bg-neutral-700 p-[20px] w-[400px] sm:w-[300px] md:w-auto lg:w-[150px] h-[30px] flex items-center rounded-[0.31rem] focus:ring-4 focus:outline-none focus:ring-neutral-600 font-medium"
            >
              MAIÚSCULAS
            </button>
            <button
              onClick={() => handleConvertToLowercase(convertText)}
              className="bg-neutral-800 hover:bg-neutral-700 p-[20px] w-[400px] sm:w-[300px] md:w-auto lg:w-[150px] h-[30px] flex items-center rounded-[0.31rem] focus:ring-4 focus:outline-none focus:ring-neutral-600 font-medium"
            >
              minúsculas
            </button>
            <button
              onClick={() => handleConvertToTitleCase(convertText)}
              className="bg-neutral-800 hover:bg-neutral-700 p-[20px] w-[400px] sm:w-[300px] md:w-auto lg:w-[150px] h-[30px] flex items-center rounded-[0.31rem] focus:ring-4 focus:outline-none focus:ring-neutral-600 font-medium"
            >
              Estilo Título
            </button>
          </div>

          <button
            onClick={() => handleCopyText(convertText)}
            className="bg-violet-500 hover:bg-violet-600 p-[20px] w-[400px] sm:w-[300px] md:w-[410px] lg:w-[150px] h-[30px] flex justify-center items-center rounded-[0.31rem] font-bold disabled:bg-green-600 disabled:cursor-not-allowed active:ring-4 focus:ring-4 focus:outline-none focus:ring-violet-900 active:ring-violet-900 active:disabled:ring-green-900 disabled:opacity-70"
            disabled={copied}
          >
            {copied ? "Copiado!" : "Copiar"}
            {!copied && (
              <img
                src={CopyImg}
                className="ml-2 w-4 h-4"
                alt="Ícone de cópia"
              />
            )}
          </button>
        </div>

        <footer className="mt-[80px] mb-[50px]">
          <p>
            Made with 💜 by{" "}
            <a
              className="text-violet-500 hover:text-violet-600 focus:outline-none hover:underline focus:ring-2 focus:ring-violet-900"
              href="https://rodrigocelvo.dev"
              target="_blank"
            >
              Rodrigo Celvo
            </a>{" "}
            |{" "}
            <a
              className="text-violet-500 hover:text-violet-600 focus:outline-none hover:underline focus:ring-2 focus:ring-violet-900"
              href="https://github.com/rodrigocelvo/convertex"
              target="_blank"
            >
              Source
            </a>
          </p>
        </footer>
      </div>
    </div>
  );
}

export default App;
