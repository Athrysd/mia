const tombolNav = document.getElementById('bars');
const navMenu = document.getElementById('navMenu');

tombolNav.addEventListener("click", function () {
  navMenu.classList.toggle('active');
  tombolNav.classList.toggle('active'); // animasi tombol
});


document.addEventListener("click", function (e) {
  const klikDiLuarMenu = !navMenu.contains(e.target) && !tombolNav.contains(e.target);
  if (klikDiLuarMenu) {
    navMenu.classList.remove('active');
    tombolNav.classList.remove('active');
  }
});