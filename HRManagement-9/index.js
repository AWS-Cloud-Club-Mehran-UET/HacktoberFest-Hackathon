let submitBtn = document.querySelector("#offBoarding #offBoardingForm button") ;
let reason = document.querySelector("#offBoarding #offBoardingForm textarea") ;

function offBoarded(){
    if(reason.value == ""){
        alert("Fill all the fields");
    }else{
        alert("Resignation Submission");
        alert("All Rights and Access Denied") ;
        window.location.href = "./index.html" ;
        console.log("Working?");
    }
}

let empType = document.querySelector("#offBoardingForm #empType") ;
document.querySelector("#offBoarding .options select #hrManager").onclick = displayEmployeeForm ;
document.querySelector("#offBoarding .options select #employee").onclick = displayHRForm ;

// document.querySelector("#offBoarding .options select #hrManager").addEventListener("click", function(){
//     empType.classList.remove("hidden") ;
//     empType.classList.add("flex") ;
//     empType.value = "Employee" ;
// });


// document.querySelector("#offBoarding .options select #employee").add("click", function(){
//     empType.classList.remove("hidden") ;
//     empType.classList.add("flex") ;
//     empType.value = "HR Manager" ;
// });

function displayEmployeeForm(){
    empType.classList.remove("hidden") ;
    empType.classList.add("flex") ;
    empType.value = "Employee" ;
}

function displayHRForm(){
    empType.classList.remove("hidden") ;
    empType.classList.add("flex") ;
    empType.value = "HR Manager" ;
}