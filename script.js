function updateDate(){
 const n=new Date();
 document.getElementById('date').innerText=n.toLocaleString('id-ID',{
  weekday:'long',year:'numeric',month:'long',day:'numeric',
  hour:'2-digit',minute:'2-digit',second:'2-digit'
 });
}
setInterval(updateDate,1000); updateDate();

const c=document.getElementById('clock');
const ctx=c.getContext('2d');
let r=c.height/2;
ctx.translate(r,r);

function drawClock(){ drawFace(); drawNums(); drawTime(); }
setInterval(drawClock,1000);

function drawFace(){
 ctx.beginPath();
 ctx.arc(0,0,r,0,2*Math.PI);
 ctx.fillStyle='white';
 ctx.fill();
}

function drawNums(){
 ctx.font=r*0.15+'px arial';
 ctx.textBaseline='middle';
 ctx.textAlign='center';
 for(let n=1;n<=12;n++){
  let ang=n*Math.PI/6;
  ctx.rotate(ang);
  ctx.translate(0,-r*0.85);
  ctx.rotate(-ang);
  ctx.fillText(n,0,0);
  ctx.rotate(ang);
  ctx.translate(0,r*0.85);
  ctx.rotate(-ang);
 }
}

function drawTime(){
 const now=new Date();
 let h=now.getHours(), m=now.getMinutes(), s=now.getSeconds();
 h=h%12;
 h=(h*Math.PI/6)+(m*Math.PI/(6*60));
 hand(h,r*0.5,r*0.05);
 m=m*Math.PI/30 + s*Math.PI/(30*60);
 hand(m,r*0.8,r*0.05);
 s=s*Math.PI/30;
 hand(s,r*0.9,r*0.02);
}

function hand(pos,len,width){
 ctx.beginPath();
 ctx.lineWidth=width;
 ctx.lineCap='round';
 ctx.moveTo(0,0);
 ctx.rotate(pos);
 ctx.lineTo(0,-len);
 ctx.stroke();
 ctx.rotate(-pos);
}

// Weather API
if(navigator.geolocation){
 navigator.geolocation.getCurrentPosition(pos=>{
  const {latitude,longitude}=pos.coords;
  fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`)
   .then(r=>r.json())
   .then(d=>{
    let w=d.current_weather;
    document.getElementById('weather').innerText=
      `Cuaca: ${w.temperature}°C • Angin ${w.windspeed} km/j`;
   });
 });
}else{
 document.getElementById('weather').innerText='Lokasi tidak didukung.';
}

// Ayat random
const ayat=[
 "“Maka ingatlah kamu kepada-Ku, niscaya Aku ingat kepadamu.” (Al-Baqarah: 152)",
 "“Sesungguhnya bersama kesulitan ada kemudahan.” (Al-Insyirah: 6)",
 "“Dan hanya kepada Allah hendaknya kamu bertawakal.” (At-Taghabun: 13)",
 "“Allah tidak membebani seseorang melainkan sesuai kesanggupannya.” (Al-Baqarah: 286)"
];

function randomAyat(){
 document.getElementById('ayat').innerText =
  ayat[Math.floor(Math.random()*ayat.length)];
}
