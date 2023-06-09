

console.log("From External JS File");

document.querySelectorAll(".image-slider > img").forEach(images => {
    images.onclick = () => {
        var src = images.getAttribute("src");
        document.querySelector(".main-home-image").src = src;
    };
});

var swiper = new Swiper(".review-slider",{
    spaceBetween: 20,
    pagination:{
        el:".swiper-pagination",
        clickable: true
    },
    loop:true,
    grabCursor: true,
    autoplay:{
        delay : 7500,
        disableOnInteraction: false,
    },
    breakpoints : {
        0:{
            slidesPerView:1,
        },
        768:{
            slidesPerView:1

        },
    },
});
// Get a reference to the update button element
const updateButton = document.getElementById('update-button');

// Add an event listener to the button
updateButton.addEventListener('click', async () => {
  // Retrieve the edited field value
  const updatedField = document.getElementById('edited-field').value;

  // Send an update request to the server
  try {
    const response = await fetch('/update', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ field: updatedField })
    });

    if (response.ok) {
      // Update successful, refresh the page
      location.reload();
    } else {
      console.error('Update failed:', response.statusText);
    }
  } catch (error) {
    console.error('Update failed:', error);
  }
});

let menu = document.querySelector('#menu_btn');
let NavBar = document.querySelector('.NavBar');

menu.onclick = () =>{
    menu.classList.toggle('fa-times');
    NavBar.classList.toggle('active');
}
Window.onscroll = () =>{
    menu.classList.remove('fa-times');
    NavBar.classList.remove('active');
}