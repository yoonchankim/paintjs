const canvas=document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName("jsColor");
const range=document.getElementById("jsRange"); 
const mode = document.getElementById("jsMode");
const saveBtn = document.getElementById("jsSave");

canvas.width = 700;
canvas.height = 700;
ctx.fillStyle="white";
ctx.fillRect(0, 0, 700, 700);
ctx.strokeStyle = "#2c2c2c";

ctx.lineWidth = 2.5;
let painting=false;
let filling = false;
function onMouseMove(event) {
    const x = event.offsetX;
    const y = event.offsetY;
    if (!painting) {
        ctx.beginPath();
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
        ctx.stroke();
      }


    }
    const startPainting = (event) => {
      if (filling === false) {
      painting = true;
      }
      };
function onMouseDown(event) {
    painting=true;
}
function stopPainting() {
    painting = false;
  }
  function handleColorClick(event) {
    const color = event.target.style.backgroundColor;
    ctx.strokeStyle = color;
    ctx.fillStyle=color;
  }
  function handleRangeChange(event) {
    const size = event.target.value;
    ctx.lineWidth = size;
  }
  function handleModeClick(){
      if(filling===false){
        filling=true;
        mode.innerText="Paint"; 
      }
      else{
       filling=false;
       mode.innerText = "Fill";
      }
  }
  function handleCanvasClick(){
    if(filling){
      ctx.fillRect(0, 0, 700, 700);
    }
  }
  function handleCM(event){
    event.preventDefault();
  }
  function handleSaveClick(){
    const image=canvas.toDataURL();
    const link=document.createElement("a");
    link.href=image
    link.download="PaintJS";
    link.click();
  }
if(canvas){
    canvas.addEventListener("mousemove",onMouseMove);
    canvas.addEventListener("mousedown",startPainting);
    canvas.addEventListener("mouseup",stopPainting);
    canvas.addEventListener("mouseleave", stopPainting);
    canvas.addEventListener("click", handleCanvasClick);
    canvas.addEventListener("contextmenu", handleCM);
  }

Array.from(colors).forEach(color =>
  color.addEventListener("click", handleColorClick)
);
if(range){
  range.addEventListener("input", handleRangeChange);
}
if(mode){
  mode.addEventListener("click",handleModeClick);
}
if (saveBtn) {
  saveBtn.addEventListener("click", handleSaveClick);
}