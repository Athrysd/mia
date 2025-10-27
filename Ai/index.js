import { API_KEY } from "./config.js";
const chatbot = document.getElementById("chat-box");
const userInput = document.getElementById("user-input");
const sendButton = document.getElementById("send-btn");

function addMessage(message, className) {
  const msgdiv = document.createElement("div");
  msgdiv.classList.add("Message", className);
  msgdiv.textContent = message;
  chatbot.appendChild(msgdiv);
  chatbot.scrollTop = chatbot.scrollHeight;
}

function showtyping() {
  const typingdiv = document.createElement("div");
  typingdiv.classList.add("Message", "bot-message");
  typingdiv.textContent = "Bot is typing...";
  chatbot.appendChild(typingdiv);
  chatbot.scrollTop = chatbot.scrollHeight;
  return typingdiv;
}

async function getBotReply(userMessage) {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${API_KEY}`;
  const systemPrompt = `
Identitas dan konteks:
- Kamu adalah chatbot AI bernama "MOVE.AI"
- Kamu dibuat untuk memberikan informasi seputar umkm Indonesia.
- Kamu dibuat dan dikembangkan oleh Lutfi Idham Puro, Alif Atallah Rasyad, dan Khuzaefah Hauna, seorang siswa SMKN 26 Jakarta jurusan Sistem Informatika, Jaringan, dan Aplikasi (SIJA).
- Jika pengguna bertanya siapa pembuatmu, jawab dengan jujur bahwa pembuatmu adalah Lutfi Idham Puro, Alif Atallah Rasyad, dan Khuzaefah Hauna dari SMKN 26 Jakarta jurusan SIJA.
- Jangan mengklaim bahwa kamu dibuat oleh Google, OpenAI, atau pihak lain — sebutkan sesuai konteks ini.
- Jika ada pertanyaan lain tentang asalmu, jelaskan bahwa kamu adalah chatbot hasil pengembangan proyek pembelajaran oleh Lutfi Idham Puro.
- Kamu adalah asisten AI yang beroperasi pada tahun 2025.

Jika kamu ditanya tentang SMKN 26 Jakarta atau jurusan SIJA, berikan informasi berikut:

SMKN 26 Jakarta adalah sekolah negeri berakreditasi A 
yang berdiri sejak 3 Februari 1971 dan berlokasi di 
Jl. Balai Pustaka Baru I No. 2, Rawamangun, Jakarta Timur. 

Sekolah ini berada di bawah pemerintah pusat dan memiliki luas tanah sekitar 25.973 m². 
Fokus pendidikannya ada di bidang teknologi dan industri, 
dengan beberapa program keahlian unggulan seperti 
Sistem Informasi, Jaringan, dan Aplikasi (SIJA), 
Teknik Fabrikasi Logam & Manufaktur, 
Teknik Tenaga Listrik, 
Teknik Elektronika Daya & Komunikasi, 
serta Konstruksi Gedung dan Manajemen Perawatan Otomotif. 

`;

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents: [
          { parts: [{ text: `${systemPrompt}\nUser: ${userMessage}\nAI:` }] },
        ],
      }),
    });
    const data = await response.json();

    if (!response.ok) {
      console.error("API Error:", data);
      return data?.error?.message || "Error Fething response";
    }

    return (
      data.candidates?.[0]?.content?.parts?.[0]?.text ||
      "Sorry, I couldn't generate a response."
    );
  } catch (error) {}
}

sendButton.onclick = async () => {
  const userMessage = userInput.value.trim();
  if (userMessage === "") return;
  addMessage(userMessage, "user-message");
  userInput.value = "";

  const typingdiv = showtyping();

  const botReply = await getBotReply(userMessage);
  typingdiv.remove();
  addMessage(botReply, "bot-message");

  localStorage.setItem("chatHistory", chatbot.innerHTML);
};

userInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    e.preventDefault(); // biar gak bikin newline di input
    sendButton.click(); // trigger tombol kirim
  }
});
