(function(){
if(!window.THREE)return;
var cs=getComputedStyle(document.documentElement);
function col(n){return cs.getPropertyValue(n).trim()||'#ffb547'}
var canvas=document.getElementById('bg');
var r=new THREE.WebGLRenderer({canvas:canvas,alpha:true,antialias:true});
r.setPixelRatio(Math.min(devicePixelRatio,2));
var scene=new THREE.Scene(),cam=new THREE.PerspectiveCamera(55,1,.1,200);
cam.position.set(0,0,14);
var acc=new THREE.Color(col('--acc')),acc2=new THREE.Color(col('--acc2'));
var core=new THREE.Mesh(new THREE.IcosahedronGeometry(2.4,1),new THREE.MeshBasicMaterial({color:acc,wireframe:true}));
scene.add(core);
var orbit=new THREE.Group();scene.add(orbit);
var cubes=[];
for(var i=0;i<3;i++){
 var m=new THREE.Mesh(new THREE.BoxGeometry(1.2,1.2,1.2),new THREE.MeshBasicMaterial({color:acc2,wireframe:true}));
 var a=i/3*Math.PI*2;m.position.set(Math.cos(a)*5,Math.sin(a*2)*1.5,Math.sin(a)*5);
 orbit.add(m);cubes.push(m);
}
var pg=new THREE.BufferGeometry(),pts=[];
for(i=0;i<500;i++)pts.push((Math.random()-.5)*60,(Math.random()-.5)*60,(Math.random()-.5)*60);
pg.setAttribute('position',new THREE.Float32BufferAttribute(pts,3));
var stars=new THREE.Points(pg,new THREE.PointsMaterial({color:acc2,size:.08}));
scene.add(stars);
function size(){var w=innerWidth,h=innerHeight;r.setSize(w,h,false);cam.aspect=w/h;cam.position.x=w<700?0:4;cam.updateProjectionMatrix()}
size();addEventListener('resize',size);
var mx=0,my=0,prog=0,tp=0,calm=matchMedia('(prefers-reduced-motion: reduce)').matches;
addEventListener('pointermove',function(e){mx=e.clientX/innerWidth-.5;my=e.clientY/innerHeight-.5});
addEventListener('scroll',function(){var h=document.documentElement.scrollHeight-innerHeight;tp=h>0?scrollY/h:0});
function frame(t){
 prog+=(tp-prog)*.06;
 var s=calm?0:t*.0004;
 core.rotation.set(s+prog*4,s*1.3+prog*6,0);
 core.scale.setScalar(1+prog*.6);
 orbit.rotation.y=s*.8+prog*Math.PI*4;
 cubes.forEach(function(c){c.rotation.x=s*2;c.rotation.y=s*2})
 stars.rotation.y=prog*1.5;
 cam.position.y+=(-my*2-cam.position.y)*.05;
 cam.lookAt(0,0,0);
 r.render(scene,cam);
 requestAnimationFrame(frame);
}
requestAnimationFrame(frame);
})();
