const password=document.getElementById("password");

const generate=document.getElementById("generate");

const copy=document.getElementById("copy");

const length=document.getElementById("length");

const lengthValue=document.getElementById("lengthValue");

const progress=document.getElementById("progress");

const strengthText=document.getElementById("strengthText");

length.oninput=()=>{

lengthValue.innerHTML=length.value;

}

generate.onclick=()=>{

const upper="ABCDEFGHIJKLMNOPQRSTUVWXYZ";

const lower="abcdefghijklmnopqrstuvwxyz";

const numbers="0123456789";

const symbols="!@#$%&*()-_=+?><{}[]";

let chars="";

if(uppercase.checked)

chars+=upper;

if(lowercase.checked)

chars+=lower;

if(numbers.checked)

chars+=numbers;

if(symbols.checked)

chars+=symbols;

if(chars===""){

alert("Selecione uma opção.");

return;

}

let pass="";

for(let i=0;i<length.value;i++){

pass+=chars[Math.floor(Math.random()*chars.length)];

}

password.value=pass;

checkStrength(pass);

}

copy.onclick=()=>{

navigator.clipboard.writeText(password.value);

copy.innerHTML="✔";

setTimeout(()=>{

copy.innerHTML="📋";

},1000);

}

function checkStrength(pass){

let score=0;

if(pass.match(/[A-Z]/))score++;

if(pass.match(/[a-z]/))score++;

if(pass.match(/[0-9]/))score++;

if(pass.match(/[^A-Za-z0-9]/))score++;

if(pass.length>=12)score++;

if(score<=2){

progress.style.width="30%";

progress.style.background="red";

strengthText.innerHTML="Força: Fraca";

}

else if(score<=4){

progress.style.width="70%";

progress.style.background="orange";

strengthText.innerHTML="Força: Média";

}

else{

progress.style.width="100%";

progress.style.background="#00ff99";

strengthText.innerHTML="Força: Muito Forte";

}

}

generate.click();