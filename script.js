const result = document.getElementById("result");

const resultUppercase = document.querySelector("#resultUpper");
const resultFirstLetterToUpper = document.querySelector("#resultFirstLetter");

const input = document.querySelector("#inputConvert");
const buttonConvert = document.querySelector("#buttonConvert");

const tooltip = document.getElementById("myTooltip");
const tooltip2 = document.getElementById("myTooltip2");

function ConvertFirstLetterToUppercase(text) {
  let words = text.toLowerCase().split(" ");
  for (let letter = 0; letter < words.length; letter++) {
    let word = words[letter];
    words[letter] = word[0].toUpperCase() + word.slice(1);
  }
  return words.join(" ");
}

function handleConvert() {
  if (input.value === "") {
    return result.classList.add("show");
  }

  resultUppercase.innerHTML = input.value.toUpperCase();

  resultFirstLetterToUpper.innerHTML = ConvertFirstLetterToUppercase(
    input.value
  );

  result.classList.remove("show");
}

function copiarTexto(type) {
  if (type === "first") {
    let copyText = ConvertFirstLetterToUppercase(input.value);

    navigator.clipboard.writeText(copyText).then(() => {
      tooltip.innerHTML = "Copiado!";
    });
  }

  if (type === "upper") {
    let copyText = input.value.toUpperCase();
    navigator.clipboard.writeText(copyText).then(() => {
      tooltip2.innerHTML = "Copiado!";
    });
  }
}

function handleTooltip() {
  tooltip.style.backgroundColor = "#09090a";
  tooltip2.style.backgroundColor = "#09090a";

  tooltip.innerHTML = "Clique para copiar";
  tooltip2.innerHTML = "Clique para copiar";
}
