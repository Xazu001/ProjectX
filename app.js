// tiles

const wrapper = document.querySelectorAll(".whyme-tiles");

let columns = 0,
    rows = 0;

const getToggled = (grid) => {
    return grid.getAttribute("data-toggled") == "true" ?? false;
};

const toggle = (grid) => {
    const toggled = getToggled(grid);

    grid.setAttribute("data-toggled", !toggled);

    console.log(wrapper);

    wrapper.forEach(i => i.classList.toggle("toggled"));
    // wrapper.forEach(i => i.parentElement.querySelector(".whyme-text").classList.toggle("hide"));
};

const handleOnClickTiles = (tile, index) => {
    // console.log(tile, tile.parentElement);

    const grid = tile.parentElement;

    toggle(grid);
    // grid.querySelectorAll(".whyme-text").forEach(i => i.classList.add("hide"));
    tile.parentElement.parentElement.children[2].classList.toggle("hide");
    // setTimeout(() => {
    //     tile.parentElement.parentElement.children[0].classList.toggle("hide");
    // }, 1000);
    tile.parentElement.parentElement.children[0].classList.toggle("hide");


    anime({
        targets: grid.children,
        opacity: getToggled(grid) ? 0 : 1,
        delay: anime.stagger(60, {
            grid: [columns, rows],
            from: index,
        }),
    });
};

const createTile = (index) => {
    const tile = document.createElement("div");

    tile.classList.add("tile");

    tile.style.opacity = 1;

    tile.onclick = () => handleOnClickTiles(tile, index);

    return tile;
};

const createTiles = (quantity) => {
    for (let i = 0; i < quantity; i++) {
        wrapper.forEach(e => e.appendChild(createTile(i)));
    };
};

const createGrid = () => {
    wrapper.innerHTML = "";

    const size = wrapper.clientWidth > 1000 ? 100 : 50;
    rows = 5;
    columns = Array.from(document.querySelectorAll(".whyme-item")).map(i => Math.floor(i.clientWidth / size + 1))[0];
    // rows = Array.from(document.querySelectorAll(".whyme-item")).map(i => Math.floor(i.clientHeight / size + 3))[0];

    wrapper.forEach(e => e.style.setProperty("--columns", columns));
    wrapper.forEach(e => e.style.setProperty("--rows", rows));

    console.log(columns, rows);

    createTiles(columns * rows);
};

createGrid();

window.onresize = () => createGrid();

// skills progress
// const skillsProValue = document.querySelectorAll(".skills-pro").forEach(i => { i.getAttribute("data-value") });
// const skillsProValue = document.querySelector(".skills-pro").dataset.value;
// const skillsProValue = document.querySelectorAll(".skills-pro")[0].getAttribute("data-value");
// const skillsProValue = document.querySelectorAll(".skills").getAttribute("data-value");
// document.querySelectorAll(".skills-pro")[1].style.setProperty("background", "conic-gradient(var(--mainwb-color1)" + deg, var(--mainwb - color2) 0deg) ")

const skillsPro = document.querySelectorAll(".skills-pro");
// setTimeout(() => {
//     skillsPro.forEach(i => i.style.setProperty("background", "conic-gradient(var(--mainwb-color1)" +
//         i.getAttribute("data-value") * 3.6 + "deg, var(--mainwb-color2) 0deg)"));
// }, 5000)
// skillsPro.forEach(i => i.style.setProperty("background", "conic-gradient(var(--mainwb-color1)" + i.getAttribute("data-value") * 3.6 + "deg, var(--mainwb-color2) 0deg)"));
// document.querySelectorAll(".skills-per").forEach(i => i.innerHTML = "<p>" + i.parentElement.getAttribute("data-value") + "%</p>");

// skillsPro.forEach(element => {
//     for (i = 0; i <= element.getAttribute("data-value"){
//         setTimeout(() => {
//             console.log("aaa");
//         }, 200)
//     }
// });
skillsPro.forEach(element => {
    const proMaxValue = element.getAttribute("data-value");
    let proValue = 0;
    const loadProValue = () => setTimeout(() => {
        if (proValue != proMaxValue) {
            proValue += 1;
            element.style.setProperty("background", "conic-gradient(var(--mainwb-color1)" + proValue * 3.6 + "deg, var(--mainwb-color2) 0deg)");
            loadProValue();
        }
    }, 20);
    loadProValue();
})

document.querySelectorAll(".skills-per").forEach(element => {
    const proMaxValue = element.parentElement.getAttribute("data-value");
    let proValue = 0;
    const loadPerValue = () => setTimeout(() => {
        if (proValue != proMaxValue) {
            proValue += 1;
            element.innerHTML = "<p>" + proValue + "%</p>";
            loadPerValue();
        }
    }, 20)
    loadPerValue();
})