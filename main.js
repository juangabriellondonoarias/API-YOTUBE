const webhookURL = 'https://discord.com/api/webhooks/1357051863869952233/LqoWppPYwTfQoLQrUOe1YKueFUdSnywN83tjhZKo4tnXeLCX_mkpPy-fovimlRX9cyhC';
const message = {
  content: "Hola Juan como estas, ya te funciono cierto"
};

fetch(webhookURL, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(message)
})
.then(response => {
  if (response.ok) {
    console.log("Mensaje enviado con éxito.");
  } else {
    console.log("Error al enviar el mensaje:", response.status);
  }
})
.catch(error => {
  console.log("Hubo un error:", error);
});

const { GoogleGenerativeAI } = require("@google/generative-ai");
const { API_KEY_GEMINI } = require('./config')

const genAI = new GoogleGenerativeAI(API_KEY_GEMINI);


async function classify_text(msg) {  
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro"});
    const result = await model.generateContent(msg);
    const response = await result.response;
    const text = response.text();
    console.log(text.length, text);
    
    if (text == "discord"){
      console.log(`enviar mensaje al ${webhookURL}`); }
      if (text == "discord"){
        console.log("El comentario no se pudo enviar"); }
  }  


// producto = "Gelatina"
prompt = `Si en el siguiente prompt te pido enviar un mensaje a discord, responde únciamente así: discord-mensaje, donde 
mensaje es el mensaje que redactaste`
comentario = "Envia un mensaje de navidad a mi canal de discord"
classify_text(`${prompt} ${comentario}`);
