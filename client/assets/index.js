function revealPassword(){
    const x = document.getElementById("password")
    console.log(x)
    if (x.type === "password"){
        x.type = "text";
    }
    else{
        x.type = "password"
    }
}
const a = document.getElementById("mySidenav")
console.log(a)

function openNav() {
    document.getElementById("mySidenav").style.width = "250px";
  }
  
  function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
  }