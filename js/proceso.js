/* La Pampa Teje — Proceso: una sola escena que se transforma (lana → pieza terminada).
   Paleta neutra; el único color es el bordó. */

(function(){
"use strict";
var ETAPAS=[
 ["Lana","De los campos donde habitan las familias artesanas parten los vellones de lana mestiza del oeste pampeano.",""],
 ["Preparación","Una vez obtenida la lana, se inicia su minuciosa preparación, que consiste en la limpieza del vellón.",""],
 ["Hilado","Las manos desgrasan la lana, la hilan y la retuercen, más gruesa, más fina.",""],
 ["Teñido","Los hilos de color natural se tiñen con jarillas, piquillín, molle, chañar, algarrobo y hollín o anilinas.",""],
 ["Telar","Armar el telar (generalmente simple y vertical), diseñar el modelo y realizar el tejido.",""],
 ["Pieza terminada","Estos textiles comparten una cualidad excepcional: reúnen utilidad y abrigo, calidad y belleza.",""]
];
var PREGUNTA="";
var NAT=[[251,247,240],[239,230,216],[226,213,193],[203,184,157],[168,145,111],[122,100,78],[75,58,51]], PES=[2,3.2,3.6,3,2,1.3,.8];

var BORDO="#5D1328",TIERRA="#4B3A33",NATURAL="#A8916F",HILO="#9C8A74";
var CRUDO="#EFE6D8";
/* Diseño de la pieza: listado en los laterales y rombos escalonados en el campo central,
   como en los ponchos pampa del catálogo (guarda atada, listado). */
var LADO=[CRUDO,TIERRA,CRUDO,NATURAL,NATURAL,CRUDO,BORDO,TIERRA];
var NW=33, NF=48, MED=(NW-1)/2;
function base(w){var l=Math.min(w,NW-1-w);return l<LADO.length?LADO[l]:TIERRA;}
function celda(w,f){
  var l=Math.min(w,NW-1-w); if(l<LADO.length)return LADO[l];
  var per=16, dy=Math.abs((f%per)-(per-1)/2), dx=Math.abs(w-MED), d=Math.round(dx+dy*1.1);
  if(d<=1)return BORDO; if(d<=3)return CRUDO; if(d===4)return TIERRA; if(d===5)return NATURAL; if(d===6)return CRUDO;
  return TIERRA;
}
function mezcla(a,b,k){var A=parseInt(a.slice(1),16),B=parseInt(b.slice(1),16);function c(s){return Math.round(lerp((A>>s)&255,(B>>s)&255,k));}return "rgb("+c(16)+","+c(8)+","+c(0)+")";}
var quieto=window.matchMedia("(prefers-reduced-motion: reduce)").matches;
function ss(a,b,x){var k=Math.min(1,Math.max(0,(x-a)/(b-a)));return k*k*(3-2*k);}
function lerp(a,b,k){return a+(b-a)*k;}
function campana(x,c,w){return Math.pow(Math.max(0,1-Math.abs(x-c)/w),1.6);}

function crear(root){
  root.innerHTML='<div class="proceso__hoja">'+
   '<ol class="etapas">'+ETAPAS.map(function(e,i){return '<li><button type="button" data-e="'+i+'"><span class="etapas__n">0'+(i+1)+'</span><span class="etapas__t">'+e[0]+'</span></button></li>';}).join("")+'</ol>'+
   '<div class="proceso__cuerpo">'+
    '<div class="info"><p class="cuenta" aria-live="polite">01 / 06</p><p class="palabra">Lana</p><p class="frase"></p><p class="fuente"></p>'+
     '<div class="ctrl"><button type="button" data-ant aria-label="Etapa anterior">←</button><button type="button" data-sig aria-label="Etapa siguiente">→</button><span class="ayuda">Hacé clic en la escena o arrastrá de lado a lado</span></div>'+
    '</div>'+
    '<div class="escena"><canvas aria-label="Escena del proceso textil: la lana se transforma en una pieza tejida" role="img"></canvas><span class="flotante" aria-hidden="true"></span>'+
     '<p class="pista" aria-hidden="true"><span class="punto"></span><span class="pista-t">Hacé clic para ver el proceso</span></p>'+
     '<p class="pregunta" aria-live="polite">'+PREGUNTA.split(" ").map(function(w,i){return '<span style="--i:'+i+'">'+w+'</span>';}).join(" ")+'</p></div>'+
   '</div></div>';
  var cv=root.querySelector("canvas"),ctx=cv.getContext("2d"),flot=root.querySelector(".flotante"),pista=root.querySelector(".pista"),preg=root.querySelector(".pregunta");
  var palabra=root.querySelector(".palabra"),frase=root.querySelector(".frase"),fuente=root.querySelector(".fuente"),cuenta=root.querySelector(".cuenta");
  var botones=[].slice.call(root.querySelectorAll(".etapas button")),ant=root.querySelector("[data-ant]"),sig=root.querySelector("[data-sig]");
  if(window.matchMedia("(pointer: coarse)").matches){root.querySelector(".pista-t").textContent="Tocá para ver el proceso";var ay=root.querySelector(".ayuda");if(ay)ay.textContent="Tocá la escena o deslizá de lado a lado";}

  var semilla=7;function rnd(){semilla|=0;semilla=semilla+0x6D2B79F5|0;var x=Math.imul(semilla^semilla>>>15,1|semilla);x=x+Math.imul(x^x>>>7,61|x)^x;return((x^x>>>14)>>>0)/4294967296;}
  function elegir(){var s=0,i;for(i=0;i<PES.length;i++)s+=PES[i];var r=rnd()*s;for(i=0;i<PES.length;i++){r-=PES[i];if(r<=0)return NAT[i];}return NAT[0];}
  var N=420,fib=[],i;for(i=0;i<N;i++)fib.push({r:Math.sqrt(rnd()),th:rnd()*6.283,l:.5+rnd()*.9,rizo:rnd()*2-1,fase:rnd()*6.283,col:elegir(),ancho:.7+rnd()*1.3,u:rnd(),v:rnd()*2-1,t:rnd()});

  var W=0,H=0,dpr=1;
  function medir(){var r=cv.getBoundingClientRect();if(!r.width)return;dpr=Math.min(2,window.devicePixelRatio||1);W=r.width;H=r.height;cv.width=Math.round(W*dpr);cv.height=Math.round(H*dpr);ctx.setTransform(dpr,0,0,dpr,0,0);}
  new ResizeObserver(function(){medir();animar();}).observe(cv);

  var p=0,meta=0,giro=0,ultimo=0,raton=null,arr=null,pedido=0,mostrada=-1,fx=0,fy=0;
  function rgba(c,a,k){k=k||1;return "rgba("+(c[0]*k|0)+","+(c[1]*k|0)+","+(c[2]*k|0)+","+a+")";}

  function dibujar(t){
    var dt=Math.min(50,t-(ultimo||t));ultimo=t;
    if(!arr)p+=(meta-p)*(quieto?1:Math.min(1,dt*.004));if(Math.abs(meta-p)<.001)p=meta;
    var tt=quieto?0:t, cx=W/2, cy=H/2, R=Math.min(W,H)*.4, w, k, f, q, xf, lf;
    ctx.clearRect(0,0,W,H);
    var g=ctx.createRadialGradient(cx,cy,R*.2,cx,cy,R*1.15);g.addColorStop(0,"rgba(75,58,51,.07)");g.addColorStop(1,"rgba(75,58,51,0)");ctx.fillStyle=g;ctx.beginPath();ctx.arc(cx,cy,R*1.15,0,7);ctx.fill();

    var limpio=ss(.3,.95,p), hilo=ss(1.4,2.3,p), tinte=ss(2.5,3.3,p), telar=ss(3.4,4.2,p), pieza=ss(4.4,5,p);
    var fibVis=(1-ss(1.45,1.95,p))*ss(.25,.85,p), ovA=1-ss(.2,.8,p);
    giro+=quieto?0:dt*.0016*campana(p,2,1.1);

    // ---- huso (signo mínimo) y el hilo en espiral
    var husoA=ss(1.5,2.1,p)*(1-ss(3.3,3.8,p)), hx=cx, hTop=cy-R*.92, hBot=cy+R*.98, hW=cy+R*.72;
    var hiloA=hilo*(1-ss(3.4,3.9,p));
    if(hiloA>.01){
      var vueltas=7, amp=R*lerp(.55,.16,ss(1.5,2.6,p)), y0=hTop+R*.12, y1=hW-R*.12, pasos=220;
      ctx.lineCap="round";
      for(var capa=0;capa<2;capa++){
        if(capa===1&&husoA>.01){ctx.globalAlpha=husoA;ctx.strokeStyle=TIERRA;ctx.lineWidth=2;ctx.beginPath();ctx.moveTo(hx,hTop);ctx.lineTo(hx,hBot);ctx.stroke();
          ctx.fillStyle=TIERRA;ctx.beginPath();ctx.ellipse(hx,hW,R*.24,R*.06,0,0,7);ctx.fill();ctx.fillStyle="#FAF6F0";ctx.beginPath();ctx.ellipse(hx,hW-R*.012,R*.2,R*.042,0,0,7);ctx.fill();
          ctx.strokeStyle=TIERRA;ctx.lineWidth=1;for(var m=0;m<4;m++){var aa=giro*3+m*1.57;ctx.beginPath();ctx.moveTo(hx,hW-R*.012);ctx.lineTo(hx+Math.cos(aa)*R*.2,hW-R*.012+Math.sin(aa)*R*.042);ctx.stroke();}}
        for(k=0;k<pasos;k++){
          var a0=k/pasos,a1=(k+1)/pasos,ang0=a0*vueltas*6.283+giro,ang1=a1*vueltas*6.283+giro;
          var frente=Math.cos(ang0)>0;if((capa===1)!==frente)continue;
          var col=HILO;
          if(tinte>.01){var corte=1-tinte*1.05;if(a0>corte)col=BORDO;}
          ctx.strokeStyle=col;ctx.globalAlpha=hiloA*(frente?1:.35);ctx.lineWidth=frente?2.4:1.4;
          ctx.beginPath();ctx.moveTo(hx+Math.sin(ang0)*amp,lerp(y0,y1,a0));ctx.lineTo(hx+Math.sin(ang1)*amp,lerp(y0,y1,a1));ctx.stroke();
        }
      }
      ctx.globalAlpha=1;
    }

    // ---- etapa Preparación (genérica): el vellón se abre y se limpia; caen tierra y ramitas
    var prep=ss(.35,.85,p)*(1-ss(1.2,1.6,p));
    if(prep>.01){
      ctx.save();
      for(var g=0;g<26;g++){
        var fg=((tt*.00045)+g*.0385)%1, gx=cx+Math.sin(g*1.7)*R*.8+Math.sin(fg*6+g)*R*.02, gy=lerp(cy+R*.12,cy+R*.85,fg);
        ctx.globalAlpha=prep*(1-fg)*.85;
        if(g%5===0){ctx.strokeStyle="rgba(110,88,66,.9)";ctx.lineWidth=1.2;ctx.beginPath();ctx.moveTo(gx,gy);ctx.lineTo(gx+R*.035*Math.cos(g),gy+R*.02*Math.sin(g));ctx.stroke();}
        else{ctx.fillStyle=g%2?"rgba(122,100,78,.9)":"rgba(168,145,111,.9)";ctx.beginPath();ctx.arc(gx,gy,R*(.006+.004*(g%3)),0,7);ctx.fill();}
      }
      ctx.restore();
    }

    // ---- etapa Lana: un gran ovillo de lana natural que respira y gira despacio
    if(ovA>.01)ovilloGrande(cx,cy,R*.72*(1+.04*ss(.2,.8,p)),ovA,tt);

    // ---- ovillos: el hilo se enrolla (hilado) y se tiñe (teñido); luego pasan al telar
    var crece=ss(1.6,2.5,p), salen=1-ss(3.3,3.75,p);
    if(crece*salen>.01){
      var oy=cy+R*.66;
      ovillo(cx+R*.66,oy,R*lerp(.06,.2,crece),mezcla(HILO,BORDO,tinte),crece*salen,giro);
      if(tinte>.01){
        ovillo(cx-R*.68,oy+R*.04,R*.17*tinte,mezcla(HILO,TIERRA,tinte),tinte*salen,-giro*.7+1);
        ovillo(cx-R*.32,oy+R*.18,R*.12*tinte,mezcla(HILO,NATURAL,tinte),tinte*salen,giro*.5+2);
      }
    }

    // ---- telar: dos palos y la urdimbre; la trama crece desde abajo
    var x0=cx-R*.7,x1=cx+R*.7,yT=cy-R*.95,yB=cy+R*.62,nW=NW,sp=(x1-x0)/(nW-1);
    if(telar>.01){
      var palos=telar*(1-pieza);
      ctx.globalAlpha=palos;ctx.strokeStyle=TIERRA;ctx.lineWidth=5;ctx.lineCap="round";
      ctx.beginPath();ctx.moveTo(x0-R*.12,yT);ctx.lineTo(x1+R*.12,yT);ctx.moveTo(x0-R*.12,yB);ctx.lineTo(x1+R*.12,yB);ctx.stroke();ctx.lineWidth=6;ctx.beginPath();ctx.moveTo(x0-R*.2,yT-R*.12);ctx.lineTo(x0-R*.2,yB+R*.22);ctx.moveTo(x1+R*.2,yT-R*.12);ctx.lineTo(x1+R*.2,yB+R*.22);ctx.stroke();
      ctx.globalAlpha=1;
      var tejido=ss(3.7,4.75,p), filas=Math.round(lerp(0,NF,tejido)), rowH=(yB-yT-R*.12)/NF, yFell=yB-R*.06-filas*rowH;
      for(w=0;w<nW;w++){var xw=x0+w*sp,reveal=ss(3.35+w*.006,3.7+w*.006,p);ctx.globalAlpha=reveal;ctx.strokeStyle=base(w);ctx.lineWidth=Math.max(2,sp*.55);ctx.beginPath();ctx.moveTo(xw,yT+R*.05);ctx.lineTo(xw,lerp(yT+R*.05,yB-R*.05,reveal));ctx.stroke();ctx.strokeStyle="rgba(75,58,51,.45)";ctx.lineWidth=.7;ctx.beginPath();ctx.moveTo(xw-sp*.25,yT+R*.05);ctx.lineTo(xw-sp*.25,lerp(yT+R*.05,yB-R*.05,reveal));ctx.stroke();}
      ctx.globalAlpha=1;
      for(f=0;f<filas;f++){var yy=yB-R*.06-(f+1)*rowH;for(w=0;w<nW;w++){var xx=x0+w*sp;ctx.fillStyle=celda(w,f);ctx.fillRect(xx-sp*.5,yy,sp+.5,rowH+.5);ctx.strokeStyle="rgba(75,58,51,"+((w+f)%2?.16:.38)+")";ctx.lineWidth=.6;ctx.beginPath();if((w+f)%2){ctx.moveTo(xx-sp*.5,yy+rowH*.5);ctx.lineTo(xx+sp*.5,yy+rowH*.5);}else{ctx.moveTo(xx-sp*.38,yy+rowH*.2);ctx.quadraticCurveTo(xx,yy-rowH*.15,xx+sp*.38,yy+rowH*.2);}ctx.stroke();}}
      if(filas>0&&filas<NF&&pieza<.01){var tx=x0-sp+((tt*.0009)%1)*(x1-x0+sp*2);ctx.strokeStyle=TIERRA;ctx.lineWidth=1.6;ctx.beginPath();ctx.moveTo(x0-sp,yFell-rowH*.5);ctx.lineTo(Math.min(tx,x1+sp),yFell-rowH*.5);ctx.stroke();}
      if(pieza>.01){ctx.globalAlpha=pieza;ctx.strokeStyle=TIERRA;ctx.lineWidth=1.2;ctx.strokeRect(x0-sp*.5,yB-R*.06-NF*rowH,x1-x0+sp,NF*rowH);
        var yF0=yB-R*.06,yF1=yB-R*.06-NF*rowH;
        for(w=0;w<nW;w++){xf=x0+w*sp;var cf=base(w)===CRUDO?"#c9b9a2":base(w);ctx.strokeStyle=cf;ctx.lineWidth=1.6;
          lf=R*.13*(.85+.15*Math.sin(w*2.3));ctx.beginPath();ctx.moveTo(xf,yF0);for(q=1;q<=8;q++)ctx.lineTo(xf+Math.sin(q*1.6+w)*sp*.18,yF0+lf*.75*q/8);ctx.stroke();
          lf=R*.1*(.85+.15*Math.cos(w*1.7));ctx.beginPath();ctx.moveTo(xf,yF1);for(q=1;q<=8;q++)ctx.lineTo(xf+Math.sin(q*1.6+w)*sp*.18,yF1-lf*q/8);ctx.stroke();}
        ctx.globalAlpha=1;}
    }

    // ---- fibras: nube de vellón → peinadas en una franja → convergen en el hilo
    if(fibVis>.01){
      var pasosF=7, conv=ss(1.5,2.2,p);
      for(i=0;i<N;i++){var fb=fib[i];
        var ang=fb.th+(quieto?0:Math.sin(tt*.00025+fb.fase)*.04);
        var nubeX=cx+Math.cos(ang)*fb.r*R*1.02, nubeY=cy+Math.sin(ang)*fb.r*R*.8;
        var franX=cx+(fb.u-.5)*R*1.7, franY=cy+fb.v*R*.16;
        var hilX=hx+Math.sin(fb.t*7*6.283+giro)*R*.18, hilY=lerp(hTop+R*.12,hW-R*.12,fb.t);
        var x=lerp(lerp(nubeX,franX,limpio),hilX,conv), y=lerp(lerp(nubeY,franY,limpio),hilY,conv);
        if(raton&&p<2.4){var dx=x-raton.x,dy=y-raton.y,d=Math.hypot(dx,dy)||1,al=R*.36;if(d<al){var kk=Math.pow(1-d/al,2)*R*.12;x+=dx/d*kk;y+=dy/d*kk;}}
        var dir=lerp(fb.th+1.57,-.12+fb.v*.05,limpio), largo=R*lerp(.2,.26,limpio)*fb.l*(1-.6*conv), seg=largo/pasosF, rz=lerp(.32,.03,limpio);
        var px=x-Math.cos(dir)*largo/2, py=y-Math.sin(dir)*largo/2, c=fb.col;
        if(limpio>0)c=[lerp(c[0],236,limpio*.5),lerp(c[1],226,limpio*.5),lerp(c[2],210,limpio*.5)];
        ctx.strokeStyle=rgba(c,.9*fibVis,.92);ctx.lineWidth=fb.ancho;ctx.beginPath();ctx.moveTo(px,py);
        for(var s2=0;s2<pasosF;s2++){dir+=fb.rizo*rz+Math.sin(fb.fase+s2*.9+tt*.001)*.05*(1-limpio);px+=Math.cos(dir)*seg;py+=Math.sin(dir)*seg;ctx.lineTo(px,py);}
        ctx.stroke();
        if(i%3===0){ctx.strokeStyle="rgba(75,58,51,"+(.16*fibVis)+")";ctx.lineWidth=.5;ctx.stroke();}
      }
    }

    texto(Math.round(p));
    if(raton){fx+=(raton.x+16-fx)*(quieto?1:.15);fy+=(raton.y-24-fy)*(quieto?1:.15);flot.style.transform="translate("+fx+"px,"+fy+"px)";}
    if(!quieto||Math.abs(meta-p)>.001||arr)pedido=requestAnimationFrame(dibujar);else pedido=0;
  }
  /* Ovillo grande: muchas vueltas de hebra cruzadas, pelusa en el borde y una punta suelta */
  var VUELTAS=[],PELUSA=[];(function(){for(var b=0;b<6;b++){var ab=b*.524+rnd()*.15,ry0=.3+rnd()*.5;for(var j=0;j<9;j++)VUELTAS.push({a:ab,ry:Math.min(.98,ry0+(j-4)*.045),c:NAT[1+((b+j)%3)],w:1});}for(j=0;j<160;j++)PELUSA.push({a:rnd()*6.283,l:.03+rnd()*.07,d:rnd()*.6-.3});})();
  function ovilloGrande(x,y,r,a,t){
    var rot=t*.00008, resp=1+Math.sin(t*.0012)*.012; r*=resp;
    ctx.save();ctx.globalAlpha=a;
    ctx.fillStyle="rgba(75,58,51,.10)";ctx.beginPath();ctx.ellipse(x+r*.08,y+r*1.02,r*.9,r*.12,0,0,7);ctx.fill();
    var g=ctx.createRadialGradient(x-r*.3,y-r*.35,r*.1,x,y,r);g.addColorStop(0,"#F7F1E6");g.addColorStop(.7,"#E6D9C4");g.addColorStop(1,"#CDBBA0");
    ctx.fillStyle=g;ctx.beginPath();ctx.arc(x,y,r,0,7);ctx.fill();
    ctx.save();ctx.beginPath();ctx.arc(x,y,r*.995,0,7);ctx.clip();ctx.lineCap="round";
    for(var j=0;j<VUELTAS.length;j++){var v=VUELTAS[j],ang=v.a+rot*((j/9|0)%2?1:-1);
      ctx.strokeStyle="rgba(120,96,74,.38)";ctx.lineWidth=r*.034;
      ctx.beginPath();ctx.ellipse(x,y,r*.99,r*v.ry,ang,0,6.2832);ctx.stroke();
      ctx.strokeStyle=rgba(v.c,.95,1.03);ctx.lineWidth=r*.024;
      ctx.beginPath();ctx.ellipse(x,y,r*.99,r*v.ry,ang,0,6.2832);ctx.stroke();
      ctx.strokeStyle="rgba(255,252,245,.55)";ctx.lineWidth=r*.006;ctx.setLineDash([r*.02,r*.025]);
      ctx.beginPath();ctx.ellipse(x,y,r*.99,r*v.ry,ang,0,6.2832);ctx.stroke();ctx.setLineDash([]);}
    var sh=ctx.createRadialGradient(x-r*.35,y-r*.4,r*.2,x,y,r*1.02);sh.addColorStop(0,"rgba(255,252,245,0)");sh.addColorStop(1,"rgba(75,58,51,.28)");
    ctx.fillStyle=sh;ctx.fillRect(x-r,y-r,r*2,r*2);ctx.restore();
    ctx.strokeStyle="rgba(203,184,157,.7)";ctx.lineWidth=.7;
    for(j=0;j<PELUSA.length;j++){var pf=PELUSA[j],an=pf.a+rot*2,px=x+Math.cos(an)*r*.985,py=y+Math.sin(an)*r*.985;
      ctx.beginPath();ctx.moveTo(px,py);ctx.quadraticCurveTo(px+Math.cos(an+pf.d)*r*pf.l*.6,py+Math.sin(an+pf.d)*r*pf.l*.6,px+Math.cos(an+pf.d*2)*r*pf.l,py+Math.sin(an+pf.d*2)*r*pf.l);ctx.stroke();}
    ctx.strokeStyle="#D9CAB2";ctx.lineWidth=Math.max(1.6,r*.022);ctx.lineCap="round";
    ctx.beginPath();ctx.moveTo(x+r*.62,y+r*.76);ctx.bezierCurveTo(x+r*.95,y+r*1.05,x+r*1.15,y+r*.7,x+r*1.35,y+r*.98+Math.sin(t*.0015)*r*.03);ctx.stroke();
    ctx.restore();
  }
  /* Ovillo: esfera con vueltas de hilo cruzadas y una punta suelta */
  function ovillo(x,y,r,col,a,rot){
    if(r<1)return;
    ctx.save();ctx.globalAlpha=a;
    ctx.fillStyle="rgba(75,58,51,.12)";ctx.beginPath();ctx.ellipse(x+r*.1,y+r*.98,r*.95,r*.18,0,0,7);ctx.fill();
    ctx.fillStyle=col;ctx.beginPath();ctx.arc(x,y,r,0,7);ctx.fill();
    ctx.save();ctx.beginPath();ctx.arc(x,y,r,0,7);ctx.clip();
    ctx.lineWidth=Math.max(.8,r*.045);
    for(var j=0;j<9;j++){
      var ang=rot*.35+j*.7, oscuro=j%3===0;
      ctx.strokeStyle=oscuro?"rgba(40,25,20,.28)":"rgba(255,250,240,.32)";
      ctx.beginPath();ctx.ellipse(x,y,r*1.02,r*(.25+.08*(j%4)),ang,0,7);ctx.stroke();
    }
    var sh=ctx.createRadialGradient(x-r*.35,y-r*.4,r*.1,x,y,r*1.05);sh.addColorStop(0,"rgba(255,250,240,.28)");sh.addColorStop(1,"rgba(40,25,20,.22)");
    ctx.fillStyle=sh;ctx.fillRect(x-r,y-r,r*2,r*2);
    ctx.restore();
    ctx.strokeStyle=col;ctx.lineWidth=Math.max(1.2,r*.06);ctx.lineCap="round";
    ctx.beginPath();ctx.moveTo(x+r*.7,y+r*.7);ctx.bezierCurveTo(x+r*1.2,y+r*1.1,x+r*1.5,y+r*.6,x+r*1.9,y+r*.95);ctx.stroke();
    ctx.restore();
  }
  function animar(){if(!pedido){ultimo=0;pedido=requestAnimationFrame(dibujar);}}
  function texto(i){
    if(i===mostrada)return;var primera=mostrada===-1;mostrada=i;
    function poner(){palabra.textContent=ETAPAS[i][0];frase.textContent=ETAPAS[i][1];fuente.textContent=ETAPAS[i][2];[palabra,frase,fuente].forEach(function(e){e.classList.remove("cambia");});}
    flot.textContent=ETAPAS[i][0];preg.classList.toggle("on",i===5);if(i>0)pista.classList.add("off");
    if(primera||quieto)poner();else{[palabra,frase,fuente].forEach(function(e){e.classList.add("cambia");});setTimeout(poner,180);}
    cuenta.textContent="0"+(i+1)+" / 06";
    botones.forEach(function(b,k){if(k===i)b.setAttribute("aria-current","step");else b.removeAttribute("aria-current");b.classList.toggle("hecho",k<i);});var ol=botones[i]&&botones[i].closest("ol");if(ol&&ol.scrollWidth>ol.clientWidth){var li=botones[i].parentNode;ol.scrollTo({left:Math.max(0,li.offsetLeft-ol.offsetLeft-(ol.clientWidth-li.offsetWidth)/2),behavior:"smooth"});}
    ant.disabled=i===0;sig.disabled=i===5;
  }
  function ir(i){meta=Math.max(0,Math.min(5,i));animar();}
  botones.forEach(function(b,k){b.addEventListener("click",function(){ir(k);});});
  ant.addEventListener("click",function(){ir(Math.round(meta)-1);});sig.addEventListener("click",function(){ir(Math.round(meta)+1);});
  cv.tabIndex=0;cv.addEventListener("keydown",function(e){if(e.key==="ArrowRight"){e.preventDefault();ir(Math.round(meta)+1);}if(e.key==="ArrowLeft"){e.preventDefault();ir(Math.round(meta)-1);}});
  function local(e){var r=cv.getBoundingClientRect();return{x:e.clientX-r.left,y:e.clientY-r.top};}
  cv.addEventListener("pointermove",function(e){if(e.pointerType==="mouse"){if(!raton){var l=local(e);fx=l.x+16;fy=l.y-24;}raton=local(e);flot.classList.add("on");animar();}
    if(arr){if(Math.abs(e.clientX-arr.x)>6)arr.movio=true;if(arr.movio){p=Math.max(0,Math.min(5,arr.p+(e.clientX-arr.x)/Math.max(200,W)*5));meta=p;pista.classList.add("off");animar();}}});
  cv.addEventListener("pointerleave",function(){raton=null;flot.classList.remove("on");});
  cv.addEventListener("pointerdown",function(e){arr={x:e.clientX,p:p,movio:false};try{cv.setPointerCapture(e.pointerId);}catch(_){}});
  cv.addEventListener("pointerup",function(){if(arr&&!arr.movio)ir(Math.round(meta)>=5?0:Math.round(meta)+1);else if(arr)ir(Math.round(p));arr=null;});
  cv.addEventListener("pointercancel",function(){arr=null;ir(Math.round(p));});
  medir();texto(0);animar();
}
document.querySelectorAll("[data-proceso]").forEach(crear);
})();
