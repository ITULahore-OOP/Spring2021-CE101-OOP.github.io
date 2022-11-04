
//url contains applink share through app script deployment
const url = 'https://script.google.com/macros/s/AKfycbwIDnqEJGg5_c_68b4lVWTyEewRCN_Zo03KAEmXK3xNB1RAnScQJO8tcoaocvK-oZ07/exec';
const loading = document.getElementById("loader"); 
const courseTitle = "OOP";
const semester = "Spring 2021 - OOP - CE101";
loadData();
// console.log("newURL",newURL)
function loadData() {
    const sheet = "topStudents";
    const newURL = url;
    fetch(newURL).then((rep) => rep.json()).then((data) => {
        loading.remove();
        const overall_top_std = data.data;
        mapThroughData(overall_top_std, "overall_top_std")
    })
}

function mapThroughData(data, container) {

    data.map(item => {
        // semester courseTitle
        if(item.Semester == semester && item.Subject == courseTitle){
            createContent(item, container)
        }
    })
}

function createContent(item, container) {
    // console.log("item::", item.student_name)
    let parentDiv = document.getElementById(container);
        let fameDiv = document.createElement("div");
        fameDiv.classList.add("staffer");
        fameDiv.classList.add("fame-responsive");
        const divContainer =
            `<div class="fame-std-container">
            <img class="staffer-image" style="width: 100px" src="/assets/images/students/${item.Image ? item.Image : "placeholder.jpeg"}" alt="user-image">
            <div class="fame-detailContainer">
                <h3 class="staffer-name">
                    ${item.Name}
                </h3>
                ${item.Email ? `<p><a href="mailto:${item.Email}">${item.Email}</a></p>` : ""}
                <p>${ item.Position ? item.Position : "" }</p>
            </div>
            </div>
            ${item.Position ? `<div class="fame-position-image"><img class="staffer-image fame-badge-image"src="/assets/images/positions/${item.Position && item.Position+".jpeg"}" alt="user-image"></div>` : ""}`
            fameDiv.innerHTML = divContainer;
        parentDiv.appendChild(fameDiv);
}