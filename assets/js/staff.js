//url contains applink share through app script deployment
const url = 'https://script.google.com/macros/s/AKfycbwIDnqEJGg5_c_68b4lVWTyEewRCN_Zo03KAEmXK3xNB1RAnScQJO8tcoaocvK-oZ07/exec';
const loading = document.getElementById("loader");
const courseTitle = "OOP";
const semester = "Spring 2021 - OOP - CE101";
const newURL = url;
loadData();

function loadData() {
    fetch(newURL).then((rep) => rep.json()).then((data) => {
        const listData = data.data;
        loading.remove();
        mapThroughData(listData)
    })
}

function mapThroughData(data) {
    data.map(item => {
        if(item.Semester == semester && item.Subject == courseTitle){
            if(item.Role == "Instructor" && item.Staff_Name !== "n"){ 
                createContent(item, "instructors_list")
            }
            else if(item.Staff_Name !== "n"){
                createContent(item, "assistants_list")
            }else{}
        }
    })
}

function createContent(item, container) {
    let parentDiv = document.getElementById(container);
    let stafferDiv = document.createElement("div");
    stafferDiv.classList.add("staffer");

    const divContainer = 
    `<img class="staffer-image" src="/assets/images/staff/${item.Staff_Image ? item.Staff_Image : "placeholder.jpeg"}" alt="staff-image">
    <div>
        <h3 class="staffer-name">
            ${item.Staff_Name}
        </h3>
        ${item.Staff_Email !== "" || item.Staff_Email !== "n" ? `<p><a href="mailto:${item.Staff_Email}">${item.Staff_Email}</a></p>` : ""}
    </div>`

    stafferDiv.innerHTML = divContainer;
    parentDiv.appendChild(stafferDiv);
}
