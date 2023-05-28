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
const skillsPro = document.querySelectorAll(".skills-pro");


//skills observer

let seenSkills = false;

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting && !seenSkills) {
            seenSkills = true;
            entry.target.classList.add('skillsProShow');
            entry.target.classList.remove("skillsProHide");
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
                loadProValue(element.classList.contains("skillsProShow"));
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
        }
    })
})

const hiddenElements = document.querySelectorAll('.skillsProHide');
hiddenElements.forEach((el) => observer.observe(el));

// head hover

const topSectionHeader = document.querySelector(".topSectionMain h1");

let topSectionInterval1;
let topSectionInterval2;

let headerStretched = false;
topSectionHeader.addEventListener("mouseover", () => {
    topSectionHeader.style.setProperty("scale", "1 2.2");
    headerStretched = true;
    if (headerStretched == true) {
        topSectionInterval1 = setInterval(() => {
            document.querySelectorAll(".light").forEach(i => i.style.setProperty("scale", "2"))
        }, 400)
        topSectionInterval2 = setInterval(() => {
            document.querySelectorAll(".light").forEach(i => i.style.setProperty("scale", "1"))
        }, 800);
    }
    console.log("mouse over");
    // document.querySelectorAll(".light").forEach(i => i.style.setProperty("scale", "2"))
})

topSectionHeader.addEventListener("mouseout", () => {
    topSectionHeader.style.setProperty("scale", "1 1.9");
    document.querySelectorAll(".light").forEach(i => i.style.setProperty("scale", "1"))
    clearInterval(topSectionInterval1);
    clearInterval(topSectionInterval2);
    headerStretched = false;
})

// send animation

// const sendButton = document.querySelector(".contactBottom button");
// let sendAnimationInterval;
// let isSendInAnimation = false;


// sendButton.addEventListener("mouseover", () => {
//     let sendAnimationValue = 0;
//     isSendInAnimation = true;
//     if (isSendInAnimation == true) {
//         sendAnimationInterval = setInterval(() => {
//             sendAnimationValue += 1;
//             sendButton.style.setProperty("background", "conic-gradient(var(--mainwb-color1)" + sendAnimationValue + "deg, var(--mainwb-color2) 0deg)")
//             // if (sendAnimationValue == 360) {
//             //     sendAnimationValue = 0;
//             // }

//         }, 2)
//     }
// })

// sendButton.addEventListener("mouseout", () => {
//     sendButton.style.setProperty("background", "conic-gradient(var(--mainwb-color1)" + 360 + "deg, var(--mainwb-color2) 0deg)")
//     clearInterval(sendAnimationInterval);
//     isSendInAnimation = false;
// })

//more click
let moreMenuToggled = false;
const moreMenuItemHeight = document.querySelector(".moreItem").clientHeight;
document.querySelector(".nav-right ul li:nth-child(3)").addEventListener("click", () => {
    if (!moreMenuToggled) {
        document.querySelector(".moreBlock").style.setProperty("display", "flex");
        // anime({
        //     targets: document.querySelector(".moreBlockMain"),
        //     height: moreMenuItemHeight * 3 + "px",
        //     duration: 2000,
        // })
        setTimeout(() => {
            document.querySelector(".moreBlockMain").style.setProperty("height", moreMenuItemHeight * 3 + "px");
        }, 200)


        moreMenuToggled = true;
    }
    else {
        document.querySelector(".moreBlockMain").style.setProperty("height", "0");
        // anime({
        //     targets: document.querySelector(".moreBlockMain"),
        //     height: "0px",
        //     duration: 2000,
        // })
        setTimeout(() => {
            document.querySelector(".moreBlock").style.setProperty("display", "none");
        }, 900)

        moreMenuToggled = false;
    }
})

// colours change

document.querySelectorAll(".redItem").forEach(i => i.addEventListener("click", redItem));
document.querySelectorAll(".purpleItem").forEach(i => i.addEventListener("click", purpleItem));
document.querySelectorAll(".blueItem").forEach(i => i.addEventListener("click", blueItem));

function onLoad() {
    const colour = JSON.parse(localStorage.getItem("mainwbColor"));
    document.querySelector(":root").style.setProperty('--mainwb-color', colour);
}

onLoad();

let mainwbColor = '';


function redItem() {
    console.log("red");
    mainwbColor = "rgba(170, 0 ,50, 1)";
    const root = document.querySelector(":root");
    root.style.setProperty('--mainwb-color1', mainwbColor);
    localStorage.setItem("mainwbColor", JSON.stringify(mainwbColor));
}

function purpleItem() {
    const root = document.querySelector(":root");
    mainwbColor = "rgba(100,20 ,255, 1)";
    localStorage.setItem("mainwbColor", JSON.stringify(mainwbColor));
    root.style.setProperty('--mainwb-color1', mainwbColor);
}

function blueItem() {
    const root = document.querySelector(":root");
    mainwbColor = 'rgba(0,75 ,255, 1)';
    localStorage.setItem("mainwbColor", JSON.stringify(mainwbColor));
    root.style.setProperty('--mainwb-color1', mainwbColor);
}

// nav show nav hide
let isNavBarLocked = false;
const nav = document.querySelector("nav");
let lastScrollY = window.scrollY;

window.addEventListener("scroll", () => {
    const scrollPosition = window.scrollY;

    if (lastScrollY > window.scrollY) {
        console.log("we are going up");
        document.querySelector("nav").classList.add("navshow")
        document.querySelector("nav").classList.remove("navhid");
    }

    if (scrollPosition > 800) {
        if (lastScrollY < window.scrollY && !isNavBarLocked) {
            console.log("we are going down");
            document.querySelector("nav").style.setProperty("position", "fixed");
            document.querySelector("nav").style.setProperty("display", "none");
            setTimeout(() => {
                document.querySelector("nav").style.setProperty("display", "block");
            }, 100)
            document.querySelector("nav").classList.add("navhid");
            document.querySelector("nav").classList.remove("navshow");
            document.querySelector(".nav-main").style.setProperty("background-color", "transparent");

        }
    }
    if (scrollPosition < 700) {
        document.querySelector("nav").style.setProperty("display", "block");
        document.querySelector(".nav-main").style.setProperty("background-color", "var(--mainwb-color4)");
        document.querySelector("nav").style.setProperty("position", "");
    }

    lastScrollY = window.scrollY;
})