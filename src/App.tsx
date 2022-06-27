import { useState } from "react";

import LogoImg from "./logo.svg";

function App() {
  const [convertText, setConvertText] = useState("");
  const [copied, setCopied] = useState(false);

  function handleConvertTitleCase(text: string) {
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

  function handleConvertUpperCase(text: string) {
    const result = text.toUpperCase();
    setConvertText(result);
  }

  function handleConverLowerCase(text: string) {
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
    <div className="bg-neutral-950 text-gray-100 flex justify-center w-screen h-screen ">
      <div className="flex flex-col items-center">
        <header className="mt-10 flex flex-row items-center">
          <img
            src={LogoImg}
            className="w-8 mr-2"
            alt="Logo representada pela letra C"
          />
          <p className="text-3xl text-purple-500">CONVERSOR DE TEXTOS</p>
        </header>

        <div className="mt-10 w-[30rem] xl:w-[50rem] lg:w-[45rem] md:w-[40rem] sm:w-[30rem]">
          <label className="block">
            <span className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-gray-500">
              Texto
            </span>
            <textarea
              name="text"
              rows={8}
              className="mt-1 px-3 py-2 bg-neutral-1000 border shadow-sm border-neutral-800 placeholder-slate-400 focus:outline-none focus:border-violet-500 focus:ring-violet-500 block w-full rounded-[0.31rem] sm:text-sm focus:ring-1 resize-none"
              placeholder="Insira o texto a ser convertido..."
              onChange={(e) => setConvertText(e.target.value)}
              value={convertText}
            />
          </label>

          <span className="text-sm text-neutral-700 flex justify-end">
            Total de caracteres: {convertText.length}
          </span>
        </div>

        <div className="flex flex-row gap-2 mt-2">
          <button
            onClick={() => handleConvertUpperCase(convertText)}
            className="bg-neutral-800 hover:bg-neutral-700 p-5 w-auto h-5 flex items-center rounded-[0.31rem] focus:ring-4 focus:outline-none focus:ring-neutral-600 font-medium"
          >
            MAIÚSCULAS
          </button>
          <button
            onClick={() => handleConverLowerCase(convertText)}
            className="bg-neutral-800 hover:bg-neutral-700 p-5 w-auto h-5 flex items-center rounded-[0.31rem] focus:ring-4 focus:outline-none focus:ring-neutral-600 font-medium"
          >
            minúsculas
          </button>
          <button
            onClick={() => handleConvertTitleCase(convertText)}
            className="bg-neutral-800 hover:bg-neutral-700 p-5 w-auto h-5 flex items-center rounded-[0.31rem] focus:ring-4 focus:outline-none focus:ring-neutral-600 font-medium"
          >
            Estilo Título
          </button>
        </div>

        <button
          onClick={() => handleCopyText(convertText)}
          className="mt-10 bg-violet-500 hover:bg-violet-600 p-5 max-w-sm w-full h-5 flex justify-center items-center rounded-[0.31rem] font-bold disabled:bg-green-600 disabled:cursor-disabled focus:ring-4 focus:outline-none focus:ring-violet-900 disabled:focus:ring-green-900"
          disabled={copied}
        >
          {copied ? "Copiado!" : "Copiar"}
        </button>

        <footer className="mt-[6rem]">
          <p>
            Made with 💜 by{" "}
            <a
              className="text-violet-500 hover:text-violet-600 focus:ring-2 focus:outline-none focus:ring-violet-900"
              href="https://rodrigocelvo.dev"
            >
              Rodrigo Celvo
            </a>
          </p>
        </footer>
      </div>
    </div>
  );
}

export default App;
