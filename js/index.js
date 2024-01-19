var bookmarkName= document.getElementById("bookmarkName");
var bookmarkUrl= document.getElementById("bookmarkUrl");
var table=document.getElementById("table");
var searchInput=document.getElementById("searchInput");
var submitbtn=document.getElementById("submitbtn");
var Update=document.getElementById("updatebtn");
var indexupdate= 0;
var alartName=document.getElementById("alartName");
var alartUrl=document.getElementById("alartUrl")

var bookMarklist=[];

if(localStorage.getItem("bookMarklist") != null){
  
    bookMarklist=JSON.parse(localStorage.getItem("bookMarklist"))
    display();
}

function bookMark(){
   if(validationName==true &&validationUrl==true){
    var bookMarkobject ={
        name:bookmarkName.value,
        bookmarkUrl: bookmarkUrl.value,
        }
         bookMarklist.push(bookMarkobject)
         localStorage.setItem(" bookMarklist",JSON.stringify( bookMarklist))
         clear();
         display();
    }
   }

function clear(){
    bookmarkName.value="";
    bookmarkUrl.value="";

}
function display(){
    var bokmarkcartona="";
    for(var i=0 ;i<bookMarklist.length;i++)
    bokmarkcartona+=`
    <tr>
        <td>${[i]} </td>
        <td>${bookMarklist[i].name} </td>
        <td> <a href="${bookMarklist[i].bookmarkUrl}"> <button  class="btn btn-info">visit</button></a></td>
        <td><button onclick="setDate(${[i]})" class="btn btn-info">Update</button></td>
        <td>  <button onclick="deleteMark(${[i]})" class="btn btn-danger"> delete</button> </td>
    </tr>
`;
document.getElementById("table").innerHTML=bokmarkcartona;

}

function deleteMark(index){
    bookMarklist.splice(index,1)
    localStorage.setItem(" bookMarklist",JSON.stringify( bookMarklist))
    display()
   
}

function search(){
    var term = searchInput.value ;
    var bokmarkcartona="";
    for(var i=0 ;i<bookMarklist.length;i++)
     if ( bookMarklist[i].name.toLowerCase().includes(term.toLowerCase())
     ){
      
        
        bokmarkcartona+=`
        <tr>
            <td>${[i]} </td>
            <td>${bookMarklist[i].name} </td>
            <td><button onclick="visit(${[i]})" class="btn btn-info">visit</button></td>
            <td>  <button onclick="deleteMark(${[i]})" class="btn btn-danger"> delete</button> </td>
        </tr>
    `;
    document.getElementById("table").innerHTML=bokmarkcartona;
    
     }



}

function setDate(index){
    indexupdate= index;
    var bookmarkupdate= bookMarklist[index]
    bookmarkName.value =bookmarkupdate.name
    bookmarkUrl.value=bookmarkupdate.bookmarkUrl

    submitbtn.classList.add("d-none")
    Update.classList.remove("d-none")
}



function UpdateBookmark(){

var bookMarkobject ={
    name:bookmarkName.value,
    bookmarkUrl: bookmarkUrl.value,
    }
    bookMarklist.splice(indexupdate,1,bookMarkobject)
    localStorage.setItem(" bookMarklist",JSON.stringify( bookMarklist))
    display()
    submitbtn.classList.remove("d-none")
    Update.classList.add("d-none")
}

function validationName(){

var text=bookmarkName.value;
var regexName= /^[A-Z][a-z]{3,15}$/;
if(regexName.test(text)==true){
bookmarkName.classList.add("is-valid");
bookmarkName.classList.remove("is-invalid");

return true;
}else{

    bookmarkName.classList.remove("is-valid");
    bookmarkName.classList.add("is-invalid");
    alartName.classList.remove("d-none")
    return false;

}

}
function validationUrl(){

var url= bookmarkUrl.value;
var regexUrl=/[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)$/;
if(regexUrl.test(url)==true){

    bookmarkUrl.classList.add("is-valid");
    bookmarkUrl.classList.remove("is-invalid");
    return true;
}else{

    bookmarkUrl.classList.remove("is-valid");
    bookmarkUrl.classList.add("is-invalid");
    alartUrl.classList.remove("d-none")
    return false;
}
}