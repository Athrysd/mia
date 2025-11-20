import { API_KEY } from "./config.js";  
const chatbot = document.getElementById("chat-box");
const userInput = document.getElementById("user-input");
const sendButton = document.getElementById("send-btn");
let chatHistory = [];

function addMessage(message, className, typingEffect = false) {
  const msgdiv = document.createElement("div");
  msgdiv.classList.add("Message", className);
  chatbot.appendChild(msgdiv);
  chatbot.scrollTop = chatbot.scrollHeight;

if (typingEffect) {
  let index = 0;
  const speed = 20;

  const typingInterval = setInterval(() => {
    msgdiv.innerHTML =
      message.slice(0, index) + `<span class="cursor">|</span>`;
    chatbot.scrollTop = chatbot.scrollHeight;
    index++;

    if (index > message.length) {
      clearInterval(typingInterval);

      setTimeout(() => {
        msgdiv.innerHTML = message.replace(/\n/g, "<br>");
      }, 500);
    }
  }, speed);
} else {
  msgdiv.innerHTML = message.replace(/\n/g, "<br>");
  }
}

async function sendMessage() {
  const input = document.getElementById("user-input");
  const userMessage = input.value;
  input.value = "";
  document.getElementById("chat-box").innerHTML += `
      <div class="user-message">${userMessage}</div>
    `;
  const reply = await getBotReply(userMessage);
  document.getElementById("chat-box").innerHTML += `
      <div class="bot-message">${reply}</div>
    `;
}

function showtyping() {
  const typingdiv = document.createElement("div");
  typingdiv.classList.add("Message", "bot-message");
  typingdiv.id = "typing";
  typingdiv.innerHTML = "<em>MOVE.AI is typing...</em>";
  chatbot.appendChild(typingdiv);
  chatbot.scrollTop = chatbot.scrollHeight;
  return typingdiv;
}


//
async function getBotReply(userMessage) {
  const url = "https://api.groq.com/openai/v1/chat/completions";

  const systemPrompt = `
Kamu adalah chatbot AI bernama MOVE.AI
Dibuat oleh: Lutfi Idham Puro, Alif Athaullah Rasyad, dan Khuzaefah Hauna dari SMKN 26 Jakarta jurusan SIJA.
Fokus: UMKM Indonesia
Tambahkan emoji yang menarik, bukan emoji ID.
Jawab dengan format teks biasa tanpa markdown.
Jawab dengan tidak menggunakan tanda bintang "*".
Gunakan data UMKM berikut untuk menjawab pertanyaan pengguna tentang UMKM yang ada didalam website UMKMove:
${JSON.stringify(
    await import("./umkmData.js").then((module) => module.umkmData)
  )}
`;

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${API_KEY}`,
      },
      body: JSON.stringify({
        model: "openai/gpt-oss-20b",
        messages: [
          { role: "system", content: systemPrompt },
          ...chatHistory,
          { role: "user", content: userMessage },
        ],
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("API Error:", data);
      return data?.error?.message || "Error fetching response";
    }

    const botText =
      data.choices?.[0]?.message?.content ||
      "Maaf, tidak dapat menghasilkan respons.";

    return botText.replace(/\n/g, "<br>");
  } catch (error) {
    console.error("Fetch Error:", error);
    return "Terjadi kesalahan saat menghubungi server.";
  }
}
sendButton.onclick = async () => {
  const userMessage = userInput.value.trim();
  if (userMessage === "") return;
  addMessage(userMessage, "user-message");
  userInput.value = "";

  const typingdiv = showtyping();

  const botReply = await getBotReply(userMessage);
  typingdiv.remove();
  addMessage(botReply, "bot-message", true);

  localStorage.setItem("chatHistory", chatbot.innerHTML);
};

userInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    e.preventDefault(); // biar gak bikin newline di input
    sendButton.click(); // trigger tombol kirim
  }
})
