let crauser = document.querySelector('.crauser');
let wrapper = document.querySelector('.wrapper');

let firstcardwidth = crauser.querySelector('.card').offsetWidth;
let arrowbtn = document.querySelectorAll('.wrapper i');
const crauserchindren=[...crauser.children];
let timeoutid;

let isdragging = false , startx , startscorling;
let cardperview=Math.round(crauser.offsetWidth/firstcardwidth);
crauserchindren.slice(-cardperview).reverse().forEach(cards=>{
    crauser.insertAdjacentHTML("afterbegin",cards.outerHTML)
});

crauserchindren.slice(0,cardperview).forEach(cards=>{
    crauser.insertAdjacentHTML("beforeend",cards.outerHTML)
});
arrowbtn.forEach((btn)=>{
    
    btn.addEventListener('click',()=>{
        crauser.scrollLeft += btn.id === "left" ? -firstcardwidth : firstcardwidth;
    })
})
const startdrag = (e) => {
    isdragging = true;
    crauser.classList.add('dragging');
    startx = e.pageX;
    startscorling = crauser.scrollLeft;
}
const dragging = (e) => {
    if (!isdragging) return;
    crauser.scrollLeft = startscorling - (e.pageX -startx);
}
const dragstop= () => {
    isdragging = false;
    crauser.classList.remove('dragging');
}
const autoplay=()=>{
if(window.innerWidth<800)return;
timeoutid=setTimeout(()=>crauser.scrollLeft +=firstcardwidth ,2500)
}
autoplay();
const infinitscrol=()=>{
    if(crauser.scrollLeft === 0){
        crauser.classList.add("notranslet");
       crauser.scrollLeft =crauser.scrollWidth -(2* crauser.offsetWidth);
       crauser.classList.remove("notranslet");

    }else if(Math.ceil(crauser.scrollLeft)===crauser.scrollWidth -crauser.offsetWidth){
        crauser.classList.add("notranslet");
        crauser.scrollLeft=crauser.offsetWidth;
        crauser.classList.remove("notranslet")

    }
    clearTimeout(timeoutid);
    if(!wrapper.matches(":hover"))autoplay();
}
crauser.addEventListener('mousedown', startdrag);
crauser.addEventListener('mousemove', dragging);
document.addEventListener('mouseup', dragstop);
crauser.addEventListener('scroll', infinitscrol);
wrapper.addEventListener('mouseenter', ()=>clearTimeout(timeoutid));
wrapper.addEventListener('mouseleave',autoplay)