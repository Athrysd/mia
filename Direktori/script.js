const search = document.getElementById('searchInput');
const list = document.querySelectorAll('main[id^="UMKM_"]')
const titleMakanan = document.getElementById('kategoriMakanan')
const titleMinuman = document.getElementById('kategoriMinuman')
const titleJasa = document.getElementById('kategoriJasa')

// Simpan data-aos asli untuk restore nanti
const aosElements = document.querySelectorAll('[data-aos]');
const aosOriginalData = [];

// Simpan data-aos asli
aosElements.forEach((el, index) => {
    aosOriginalData[index] = {
        element: el,
        aos: el.getAttribute('data-aos'),
        aosDuration: el.getAttribute('data-aos-duration'),
        aosDelay: el.getAttribute('data-aos-delay')
    };
});

search.addEventListener("input", (e) => searchData(e.target.value));

function searchData(filter) {
    // Jika search kosong, tampilkan semua dan aktifkan AOS
    if (filter === '') {
        list.forEach((item) => {
            item.classList.remove("hidden");
        });
        titleMakanan.classList.remove("hidden")
        titleMinuman.classList.remove("hidden")
        titleJasa.classList.remove("hidden")
        
        // Restore semua atribut data-aos
        aosOriginalData.forEach(data => {
            if (data.aos) data.element.setAttribute('data-aos', data.aos);
            if (data.aosDuration) data.element.setAttribute('data-aos-duration', data.aosDuration);
            if (data.aosDelay) data.element.setAttribute('data-aos-delay', data.aosDelay);
        });
        
        // Refresh AOS
        if (typeof AOS !== 'undefined') {
            AOS.refresh();
        }
    } else {
        // Jika ada search, hide title kategori dan filter UMKM
        titleMakanan.classList.add("hidden")
        titleMinuman.classList.add("hidden")
        titleJasa.classList.add("hidden")
        
        // Hapus semua atribut data-aos untuk nonaktifkan animasi
        aosElements.forEach(el => {
            el.removeAttribute('data-aos');
            el.removeAttribute('data-aos-duration');
            el.removeAttribute('data-aos-delay');
        });

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
