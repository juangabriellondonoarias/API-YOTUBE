const { GoogleGenerativeAI } = require("@google/generative-ai");
const { API_KEY_GEMINI } = require('./config')

const genAI = new GoogleGenerativeAI(API_KEY_GEMINI);


async function classify_text(msg) {  
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro"});
    const result = await model.generateContent(msg);
    const response = await result.response;
    const text = response.text();
    console.log(text.length, text);
    
    if (text == "Afavor "){
      console.log("El comentario es a favor"); }
      if (text == "Encontra "){
        console.log("El comentario es en contra"); }
  }  


producto = "Gelatina"
prompt = `Clasifica el siguiente comentario como A favor o En contra del producto ${producto}. No incluyas signos de puntuación en la respuesta y tampoco espacios:`
comentario = "Es una gelatina con buen sabor"
classify_text(`${prompt} ${comentario}`);
