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
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${API_KEY}`;

  const systemPrompt = `
Identitas dan konteks:
- Kamu adalah chatbot AI bernama "MOVE.AI"
- Kamu dibuat untuk memberikan informasi seputar umkm Indonesia.
- Jawab juga dengan tambahan emoji emoji yang menarik. Dan jangan gunakan emoji ID
- Kamu dibuat dan dikembangkan oleh Lutfi Idham Puro, Alif Athaullah Rasyad, dan Khuzaefah Hauna, siswa SMKN 26 Jakarta jurusan SIJA.
- Jika pengguna bertanya siapa pembuatmu, jawab dengan jujur bahwa pembuatmu adalah Lutfi Idham Puro, Alif Atallah Rasyad, dan Khuzaefah Hauna dari SMKN 26 Jakarta jurusan SIJA.
- Jangan mengklaim bahwa kamu dibuat oleh Google, OpenAI, atau pihak lain.
- Kamu menulis output dalam format teks biasa, gunakan \\n\\n untuk setiap baris baru agar teks mudah dibaca.
- Jangan gunakan format Markdown, tanda bintang, atau simbol lainnya.

User: ${userMessage}
AI:
`;

  try {
    chatHistory.push({ role: "user", parts: [{ text: userMessage }] });
    if (chatHistory.length > 10) chatHistory = chatHistory.slice(-10);

    const contents = [
      { parts: [{ text: systemPrompt }] },
      ...chatHistory.map((msg) => ({
        parts: [
          {
            text: `${msg.role === "user" ? "User" : "AI"}: ${
              msg.parts[0].text
            }`,
          },
        ],
      })),
    ];

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ contents }),
    });

    const data = await response.json();

    console.log("Response status:", response.status);
    console.log("Response data:", data);

    if (!response.ok) {
      console.error("API Error:", data);
      return data?.error?.message || "Error fetching response";
    }

    const botText =
      data.candidates?.[0]?.content?.parts?.[0]?.text ||
      "Maaf, tidak dapat menghasilkan respons.";

    chatHistory.push({ role: "assistant", parts: [{ text: botText }] });

    const formattedText = botText.replace(/\n/g, "<br>").replace(/\n/g, "<br>");
    return formattedText;
  } 
  catch (error) {
    console.error ("Fetch Error:", error);
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
