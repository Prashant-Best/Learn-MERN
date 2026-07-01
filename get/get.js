function login(){
    console.log("1.logging in ....")
    setTimeout(() => {
        console.log("2.logged in")
    }, 5000);
}
function getuser(){
    console.log("3.getting user");
    setTimeout(() => {
        console.log("4.user id logged");
    }, 2000);
}
function getOrder(){
    console.log("5.getting order");
    setTimeout(() => {
        console.log("6.order data logged");
    }, 1000);
}
function grtOrderDetails(){
    console.log("7.getting order details");
    setTimeout(() => {
        console.log("8.order details logged");
    }, 3000);
}
 login();
 getuser();
 getOrder();
 grtOrderDetails();
