const saveFormBtn = document.getElementById("save-profile");
const profileForm  =document.getElementById("add-profile-form");
const empProfilesData = JSON.parse(localStorage.getItem("empProfilesData")) || [];
const viewAddEmpScreen = document.getElementById("view-Add-Emp");
const viewList = document.getElementById("View-Emp-list");
const addEmpBtn = document.getElementById("add-emp");
const viewListBtn = document.getElementById("view-list");
// const deleteBtn  = document.getElementById("delete-btn");
// const editBtn  = document.getElementById("edit-btn");

const gatheringData = (e) => {
    const id = document.getElementById("emp-id").value;
    const name = document.getElementById("emp-name").value;
    const desig = document.getElementById("emp-desig").value;
    const depart = document.getElementById("emp-depart").value;
    const salary = document.getElementById("emp-salary").value;
    const start_date = document.getElementById("emp-start-date").value;
    const p_email = document.getElementById("emp-p-email").value;
    const phone_no = document.getElementById("phone-no").value;
    const adddress = document.getElementById("address").value;
    const newEmp = {
        id: id, // Unique ID
        name: name,
        designation:desig,
        department :depart,
        salary :salary,
        startDate :start_date,
        pEmail :p_email,
        phoneNo:phone_no,
        adddress:adddress 
    };

// Add to the array
empProfilesData.push(newEmp);
// Save the updated array to localStorage
localStorage.setItem('empProfilesData', JSON.stringify(empProfilesData));
// Clear the form fields after submission
profileForm.reset();
}
profileForm.addEventListener("submit",(e)=>{
    e.preventDefault();
    gatheringData(e);
});

const renderingList = ()=>{
    viewList.classList.remove("hidden");
    viewList.innerHTML = "";
Array.from(empProfilesData).forEach(data => {
viewList.innerHTML+=`
<div class="flex relative flex-wrap max-w-80 gap-2 bg-white border-2 rounded-md p-2">
<h1 class="bg-purple-100 px-2 font-semibold rounded-sm">${data.name}</h1>
<p class="bg-purple-100 px-2 font-semibold rounded-sm">${data.designation}</p>
<p class="bg-purple-100 px-2 font-semibold rounded-sm">${data.department}</p>
<p class="bg-purple-100 px-2 font-semibold rounded-sm">${data.salary}</p>
<p class="bg-purple-100 px-2 font-semibold rounded-sm">${data.startDate}</p>
<p class="bg-purple-100 px-2 font-semibold rounded-sm">${data.pEmail}</p>
<p class="bg-purple-100 px-2 font-semibold rounded-sm">${data.phoneNo}</p>
<button  id="edit-btn" class="absolute -bottom-0 right-5" onclick="EditProfile(${data.id})"><i class="fa-solid fa-pencil"></i></button>
<button  id="delete-btn" class="absolute -bottom-0 right-1" onclick="DeleteProfile(${data.id})"><i class="fa-solid fa-trash"></i></button>

</div>








`
})

}

viewListBtn.addEventListener("click",()=>{
    viewList.classList.add("flex");
    viewList.classList.remove("hidden");
    viewAddEmpScreen.classList.add("hidden");
    viewAddEmpScreen.classList.remove("block");

    renderingList();

});
addEmpBtn.addEventListener("click",()=>{
    viewList.classList.remove("flex");
    viewList.classList.add("hidden");
    viewAddEmpScreen.classList.remove("hidden");
    viewAddEmpScreen.classList.add("block");
});

const EditProfile = (uniqueId) =>{

}

const DeleteProfile = (uniqueId) =>{


}





document.addEventListener("DOMContentLoaded",renderingList);







