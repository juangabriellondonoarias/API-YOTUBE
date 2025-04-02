const axios = require('axios');

// Tu API Key de YouTube
const youtubeApiKey = 'AIzaSyAUgUgPuyiSwsp-KeflxSUZ_CwePDgvS9Y'; // Sustituye con tu propia clave

// Función para obtener videos populares (categoría de música)
async function getPopularSongs() {
    try {
    const response = await axios.get('https://www.googleapis.com/youtube/v3/videos', {
    params: {
        part: 'snippet,statistics', // Queremos obtener el título y las estadísticas de los videos
        chart: 'mostPopular', // Esto obtiene los videos más populares
        videoCategoryId: '10',  // La categoría 10 corresponde a Música
        regionCode: 'CO', // Aquí se puede especificar la región
        key: youtubeApiKey, // Tu clave de API de YouTube
    },
    });

    // Extraer los títulos de las canciones populares
    const songs = response.data.items.map(item => item.snippet.title);
    console.log("Canciones populares en YouTube:", songs);
    return songs;
} catch (error) {
    console.error('Error al obtener los videos de YouTube:', error);
}
}


const { GoogleGenerativeAI } = require('@google/generative-ai');

// Tu clave de API de Google Gemini
const apiKeyGemini = 'AIzaSyC04fA-Yu9C-cqcE2qG6WaBS06yeeT4wm8'; // Sustituye con tu propia clave

const genAI = new GoogleGenerativeAI(apiKeyGemini);

// Función para generar un mensaje con las canciones usando Google Gemini
async function generateMessage(songs) {
try {
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-pro' });

    // Crear un prompt para el modelo (este es el mensaje que le damos a la IA)
    const prompt = `Genera un mensaje sobre las canciones populares de YouTube: ${songs.join(', ')}.`;

    // Enviar el prompt al modelo y obtener la respuesta
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const message = response.text();

    console.log('Mensaje generado por Google Gemini:', message);
    return message;
} catch (error) {
    console.error('Error generando mensaje con Google Gemini:', error);
}
}


async function main() {
    try {
      // Obtener las canciones populares de YouTube
    const songs = await getPopularSongs();

      // Generar el mensaje con IA usando Google Gemini
    const message = await generateMessage(songs);

    console.log('Mensaje final:', message);
    } catch (error) {
    console.error('Error en el proceso:', error);
    }
}

main();
