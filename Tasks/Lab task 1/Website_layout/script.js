console.log("From External JS File");

document.querySelectorAll(".image-slider > img").forEach(images => {
    images.onclick = () => {
        var src = images.getAttribute("src");
        document.querySelector(".main-home-image").src = src;
    };
});

