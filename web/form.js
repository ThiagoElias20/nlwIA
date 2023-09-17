import {server} from "./server.js";

const form = document.querySelector("#form");
const input = document.querySelector("#url");
const conteudores = document.querySelector('#content');

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  content.classList.add("placeholder");

  const videoURL = input.value;

  if (!videoURL.includes("shorts")) {
   return conteudores.innerText = "Esse vídeo não é um short. Envie novamente sendo um short.";
  }

  const [_, params] = videoURL.split("/shorts/");
  const [videoID] = params.split("?si");
  
  
  conteudores.textContent = "Obtendo o texto do áudio...";

  const transcription =  await server.get("/summary/" + videoID);

  content.textContent = "Realizando o resumo...";

  const summary = await server.post("/summary", {
    text: transcription.data.result,
  })

  content.textContent = transcription.data.result
  content.classList.remove("placeholder");
})