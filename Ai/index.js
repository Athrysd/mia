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

const umkmData = {
  "umkm_list_produk": [
    {
      "name": "Sasadu Leather",
      "location": "Maluku Utara, Indonesia",
      "product": "Tas kulit sapi premium handmade",
      "sales_channels": ["Instagram", "Marketplace", "Offline store"],
      "size": "kecil",
      "uniqueness": "Desain elegan berbahan kulit lokal dari Maluku Utara"
    },
    {
      "name": "Cowa Craft",
      "location": "Yogyakarta, Indonesia",
      "product": "Kerajinan rotan & eceng gondok",
      "sales_channels": ["Tokopedia", "Offline galeri", "Instagram"],
      "size": "kecil",
      "uniqueness": "Produk eco-friendly yang sudah ekspor ke Jepang & Eropa"
    },
    {
      "name": "Indoestri",
      "location": "Jakarta, Indonesia",
      "product": "Produk lifestyle handmade (tas, dompet, lilin, sabun)",
      "sales_channels": ["Website", "Workshop store"],
      "size": "kecil",
      "uniqueness": "Konsep craft school dan handmade shop pertama di Indonesia"
    },
    {
      "name": "Du’Anyam",
      "location": "Flores, NTT, Indonesia",
      "product": "Kerajinan anyaman daun lontar",
      "sales_channels": ["Website", "Hotel & resort", "Ekspor"],
      "size": "kecil",
      "uniqueness": "Pemberdayaan ibu-ibu di Flores melalui produk anyaman"
    },
    {
      "name": "Smesco Trade",
      "location": "Jakarta, Indonesia",
      "product": "Produk UMKM unggulan (batik, tenun, kriya)",
      "sales_channels": ["Marketplace", "Smesco building"],
      "size": "kecil-menengah",
      "uniqueness": "Konsorsium UMKM nasional binaan pemerintah"
    },
    {
      "name": "Wulang Sunu Batik",
      "location": "Solo, Jawa Tengah, Indonesia",
      "product": "Batik tulis klasik & modern",
      "sales_channels": ["Offline store", "Instagram", "Shopee"],
      "size": "kecil",
      "uniqueness": "Batik tradisional yang mempertahankan motif klasik"
    },
    {
      "name": "Bali Alus",
      "location": "Denpasar, Bali, Indonesia",
      "product": "Produk spa & aromaterapi alami",
      "sales_channels": ["Marketplace", "Toko oleh-oleh", "Ekspor"],
      "size": "menengah",
      "uniqueness": "Mengangkat bahan alami Bali dan pariwisata wellness"
    }
  ],
  "umkm_list_makanan": [
    {
      "name": "Mie Gacoan",
      "location": "Malang, Jawa Timur, Indonesia",
      "product": "Mie pedas dengan konsep restoran cepat saji",
      "sales_channels": ["Offline outlet", "Online delivery"],
      "size": "menengah",
      "uniqueness": "Harga terjangkau dan branding kreatif untuk anak muda"
    },
    {
      "name": "Bakso Boedjangan",
      "location": "Bandung, Indonesia",
      "product": "Bakso dengan topping modern",
      "sales_channels": ["Offline store", "GoFood", "GrabFood"],
      "size": "menengah",
      "uniqueness": "Varian bakso kekinian dengan konsep kafe"
    },
    {
      "name": "Ayam Geprek Bensu",
      "location": "Jakarta, Indonesia",
      "product": "Ayam geprek sambal pedas",
      "sales_channels": ["Outlet nasional", "GoFood", "GrabFood"],
      "size": "menengah",
      "uniqueness": "Brand UMKM lokal milik artis yang sukses nasional"
    },
    {
      "name": "Richeese Factory",
      "location": "Bandung, Indonesia",
      "product": "Ayam dan makanan cepat saji berbumbu keju",
      "sales_channels": ["Offline outlet", "Online delivery"],
      "size": "menengah",
      "uniqueness": "Produk lokal yang sukses menyaingi brand global"
    },
    {
      "name": "Sate Taichan Goreng",
      "location": "Jakarta, Indonesia",
      "product": "Sate taichan khas Senayan",
      "sales_channels": ["Gerai offline", "Delivery online"],
      "size": "mikro/kecil",
      "uniqueness": "Makanan kaki lima yang jadi fenomena nasional"
    },
    {
      "name": "Bebek Kaleyo",
      "location": "Jakarta, Indonesia",
      "product": "Olahan bebek goreng & sambal khas",
      "sales_channels": ["Outlet resmi", "Online delivery"],
      "size": "menengah",
      "uniqueness": "Bebek goreng legendaris dengan ekspansi cepat"
    },
    {
      "name": "Es Teler 77",
      "location": "Jakarta, Indonesia",
      "product": "Makanan & minuman tradisional Indonesia",
      "sales_channels": ["Gerai", "Mall", "Bandara"],
      "size": "menengah",
      "uniqueness": "Salah satu pionir franchise kuliner lokal"
    }
  ],
  "umkm_list_minuman": [
    {
      "name": "Teh Rimba",
      "location": "Bandung, Indonesia",
      "product": "Teh herbal alami dari daun hutan tropis",
      "sales_channels": ["Website", "Shopee", "Offline cafe"],
      "size": "mikro/kecil",
      "uniqueness": "Teh herbal hasil olahan petani lokal dengan kemasan modern"
    },
    {
      "name": "Teh Manis Jumbo",
      "location": "Jawa Tengah, Indonesia",
      "product": "Teh manis kemasan gelas ukuran besar",
      "sales_channels": ["Warung", "Outlet UMKM", "Marketplace"],
      "size": "mikro",
      "uniqueness": "Konsep minuman praktis dengan harga hemat"
    },
    {
      "name": "Haus!",
      "location": "Jakarta, Indonesia",
      "product": "Minuman boba dan susu kekinian",
      "sales_channels": ["Outlet nasional", "Online delivery"],
      "size": "menengah",
      "uniqueness": "Harga murah dan cabang luas untuk semua kalangan"
    },
    {
      "name": "Kokumi",
      "location": "Jakarta, Indonesia",
      "product": "Minuman boba premium dan cheese tea",
      "sales_channels": ["Outlet mall", "Online delivery"],
      "size": "menengah",
      "uniqueness": "Cita rasa lokal dengan konsep lucu & estetika brand kuat"
    },
    {
      "name": "Xi Bo Ba",
      "location": "Jakarta, Indonesia",
      "product": "Boba tea dan milk tea",
      "sales_channels": ["Outlet nasional", "GrabFood", "GoFood"],
      "size": "menengah",
      "uniqueness": "Minuman Taiwan-style dengan bahan lokal Indonesia"
    },
    {
      "name": "Fore Coffee",
      "location": "Jakarta, Indonesia",
      "product": "Kopi dan minuman non-kopi lokal premium",
      "sales_channels": ["App Fore", "Outlet", "Delivery"],
      "size": "menengah",
      "uniqueness": "Mengutamakan teknologi digital dalam pemesanan"
    },
    {
      "name": "Kopikalyan",
      "location": "Jakarta, Indonesia",
      "product": "Kopi nusantara dengan pendekatan modern",
      "sales_channels": ["Outlet", "Marketplace", "Kafe"],
      "size": "menengah",
      "uniqueness": "Menonjolkan cita rasa kopi lokal Indonesia"
    }
  ],
  "umkm_list_jasa": [
    {
      "name": "GoSocial Indonesia",
      "location": "Jakarta, Indonesia",
      "product": "Digital marketing & branding UMKM",
      "sales_channels": ["Website", "Instagram", "Konsultasi"],
      "size": "kecil",
      "uniqueness": "Membantu UMKM bertransformasi digital"
    },
    {
      "name": "Utama Digital",
      "location": "Bandung, Indonesia",
      "product": "Jasa pembuatan website UMKM",
      "sales_channels": ["Website", "Online campaign"],
      "size": "kecil",
      "uniqueness": "Paket web & hosting khusus UMKM"
    },
    {
      "name": "Mokapos",
      "location": "Jakarta, Indonesia",
      "product": "Aplikasi kasir digital untuk UMKM",
      "sales_channels": ["Website", "App Store", "Play Store"],
      "size": "menengah",
      "uniqueness": "Memudahkan UMKM kelola transaksi & stok"
    },
    {
      "name": "Toffeedev",
      "location": "Jakarta, Indonesia",
      "product": "Jasa digital marketing & SEO",
      "sales_channels": ["Website", "LinkedIn"],
      "size": "menengah",
      "uniqueness": "Agensi lokal berpengalaman bantu UMKM naik kelas digital"
    },
    {
      "name": "Sribu",
      "location": "Jakarta, Indonesia",
      "product": "Desain logo, website, dan konten untuk UMKM",
      "sales_channels": ["Website", "Marketplace jasa"],
      "size": "menengah",
      "uniqueness": "Menghubungkan UMKM dengan ribuan desainer lokal"
    },
    {
      "name": "Dekoruma",
      "location": "Jakarta, Indonesia",
      "product": "Jasa interior rumah & kantor",
      "sales_channels": ["Website", "Instagram"],
      "size": "menengah",
      "uniqueness": "Menawarkan solusi desain interior terjangkau dan lokal"
    },
    {
      "name": "Krealogi",
      "location": "Bandung, Indonesia",
      "product": "Platform edukasi & manajemen bisnis untuk UMKM",
      "sales_channels": ["Website", "Program pelatihan"],
      "size": "kecil",
      "uniqueness": "Dibangun oleh Du’Anyam untuk memperkuat manajemen UMKM"
    }
  ]

  // "umkm_list_produk": [
  //   {
  //     "name": "Hafidz store",
  //     "location": "Indonesia",
  //     "product": "Tas & aksesoris kulit/kanvas (brand UMKM)",
  //     "sales_channels": ["online marketplace", "Instagram", "offline bazaar"],
  //     "size": "mikro/kecil",
  //     "uniqueness": "desain lokal & produksi skala kecil",
  //   },
  //       {
  //     "name": "Fatih Store",
  //     "location": "Indonesia",
  //     "product": "Tas & aksesoris kulit/kanvas (brand UMKM)",
  //     "sales_channels": ["online marketplace", "Instagram", "offline bazaar"],
  //     "size": "mikro/kecil",
  //     "uniqueness": "desain lokal & produksi skala kecil",
  //   },
  //       {
  //     "name": "Idham Store",
  //     "location": "Indonesia",
  //     "product": "Tas & aksesoris kulit/kanvas (brand UMKM)",
  //     "sales_channels": ["online marketplace", "Instagram", "offline bazaar"],
  //     "size": "mikro/kecil",
  //     "uniqueness": "desain lokal & produksi skala kecil",
  //   }
  // ]

  // "umkm_list_minuman": [
  //       {
  //     "name": "",
  //     "location": "Indonesia",
  //     "product": "Tas & aksesoris kulit/kanvas (brand UMKM)",
  //     "sales_channels": ["online marketplace", "Instagram", "offline bazaar"],
  //     "size": "mikro/kecil",
  //     "uniqueness": "desain lokal & produksi skala kecil",
  //   },
  //       {
  //     "name": "",
  //     "location": "Indonesia",
  //     "product": "Tas & aksesoris kulit/kanvas (brand UMKM)",
  //     "sales_channels": ["online marketplace", "Instagram", "offline bazaar"],
  //     "size": "mikro/kecil",
  //     "uniqueness": "desain lokal & produksi skala kecil",
  //   },
  //       {
  //     "name": "",
  //     "location": "Indonesia",
  //     "product": "Tas & aksesoris kulit/kanvas (brand UMKM)",
  //     "sales_channels": ["online marketplace", "Instagram", "offline bazaar"],
  //     "size": "mikro/kecil",
  //     "uniqueness": "desain lokal & produksi skala kecil",
  //   }
  // ],

  // "umkm_list_Jasa" : [
  //           {
  //     "name": "",
  //     "location": "Indonesia",
  //     "product": "Tas & aksesoris kulit/kanvas (brand UMKM)",
  //     "sales_channels": ["online marketplace", "Instagram", "offline bazaar"],
  //     "size": "mikro/kecil",
  //     "uniqueness": "desain lokal & produksi skala kecil",
  //   },
  //       {
  //     "name": "",
  //     "location": "Indonesia",
  //     "product": "Tas & aksesoris kulit/kanvas (brand UMKM)",
  //     "sales_channels": ["online marketplace", "Instagram", "offline bazaar"],
  //     "size": "mikro/kecil",
  //     "uniqueness": "desain lokal & produksi skala kecil",
  //   },
  //       {
  //     "name": "",
  //     "location": "Indonesia",
  //     "product": "Tas & aksesoris kulit/kanvas (brand UMKM)",
  //     "sales_channels": ["online marketplace", "Instagram", "offline bazaar"],
  //     "size": "mikro/kecil",
  //     "uniqueness": "desain lokal & produksi skala kecil",
  //   }
//  ]
};

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
- Menteri umkm saat ini adalah Maman Abdurrahman
berikut informasi tentang Maman Abdurrahman :
Maman Abdurrahman (lahir 10 September 1980) adalah politikus berkebangsaan Indonesia.
 Saat ini, ia menduduki jabatan Menteri Usaha Mikro, Kecil, dan Menengah. 
 Sebelumnya ia menjabat sebagai anggota DPR-RI pada 2018 hingga 2024. 
 Ia mewakili daerah pemilihan Kalimantan Barat I, 
 yang meliputi Kabupaten Sambas, Kabupaten Bengkayang, 
 Kota Singkawang, Kabupaten Landak, Kabupaten Kayong Utara, Kabupaten Ketapang, Kota Pontianak, 
 Kabupaten Mempawah, dan Kabupaten Kubu Raya. Maman merupakan kader Partai Golongan Karya, 
 ia bertugas di Komisi VII dan dipercaya menjabat 
 sebagai Wakil Ketua Komisi VII.

 -Jika ada yang meminta kamu untuk  menyebutkan nama nama umkm kamu sebutkan dengan nomor seperti : 1. Mie Gacoan 2. Richeese Factory dan seterusnya. Lalu berikan informasi singkat tentang umkm tersebut.
- Kamu adalah asisten yang menulis output dalam format teks biasa.
- Tulis semua output dalam format teks biasa, tanpa menggunakan Markdown, tanda bintang, tanda backtick , atau format bold/italic. Gunakan tanda titik, koma, dan baris baru untuk membuat teks rapi.

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

Dan Kamu adalah chatbot yang memberikan informasi tentang UMKM Indonesia.
Berikut data UMKM yang kamu ketahui:
${JSON.stringify(umkmData, null, 2)}

Gunakan data di atas untuk menjawab pertanyaan pengguna.
User: ${userMessage}
AI:

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
    e.preventDefault();
    sendButton.click();
  }
});
