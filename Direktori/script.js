const search = document.getElementById('searchInput');
const list = document.querySelectorAll('main[id^="UMKM_"]')
const titleMakanan = document.getElementById('kategoriMakanan')
const titleMinuman = document.getElementById('kategoriMinuman')
const titleJasa = document.getElementById('kategoriJasa')

search.addEventListener("input", (e) => searchData(e.target.value));

function searchData(filter) {
    // Jika search kosong, tampilkan semua
    if (filter === '') {
        list.forEach((item) => {
            item.classList.remove("hidden");
        });
        titleMakanan.classList.remove("hidden")
        titleMinuman.classList.remove("hidden")
        titleJasa.classList.remove("hidden")
    } else {
        // Jika ada search, hide title kategori dan filter UMKM
        titleMakanan.classList.add("hidden")
        titleMinuman.classList.add("hidden")
        titleJasa.classList.add("hidden")

        list.forEach((item) => {
            if (item.innerHTML.toLowerCase().includes(filter.toLowerCase())) {
                item.classList.remove("hidden");
            } else {
                item.classList.add("hidden")
            }
        });
    }
}
// if(search.focus){
//     document.addEventListener("keydown", function(){
//         const target = 'makanan';
//         if(Event.key === 'enter'){
//             window.location.hash = '#' + target;
//         }
//     })
// }


search.addEventListener("keydown", function (e) {
    if (e.key === 'Enter') {
        e.preventDefault();
        const target = document.getElementById('makanan');
        if(target){
            target.scrollIntoView({behavior: 'smooth'})
        }
    }
});
