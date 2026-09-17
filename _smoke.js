const fs=require('fs'),path=require('path');
class Chart{constructor(ctx){Chart.instances.push(ctx);}destroy(){}} Chart.defaults={font:{family:''},color:'',borderColor:''}; Chart.instances=[];
function makeEl(id){const sub={};return{id,_html:'',value:'',disabled:false,textContent:'',style:{},dataset:{},onclick:null,classList:{add(){},remove(){},toggle(){}},addEventListener(){},querySelector(s){if(!sub[s])sub[s]=makeEl(id+':'+s);return sub[s];},querySelectorAll(){return[];},getContext(){return{canvas:{id}};},set innerHTML(v){this._html=v;},get innerHTML(){return this._html;}};}
const els={};const getElementById=id=>els[id]||(els[id]=makeEl(id));
global.document={getElementById,querySelector:s=>makeEl(s),querySelectorAll:()=>[],addEventListener(){},documentElement:{setAttribute(){},style:{}},body:makeEl('body'),createElement:()=>({href:'',download:'',click(){}})};
global.window={innerWidth:1600,addEventListener(){}};
global.getComputedStyle=()=>({getPropertyValue:()=>''});
global.localStorage={getItem:()=>null,setItem(){}}; global.Blob=class{}; global.URL={createObjectURL:()=>'',revokeObjectURL(){}}; global.Chart=Chart;
eval(fs.readFileSync('data/data.js','utf8'));
const probe=`;(function(){
  console.log('Charts:', Chart.instances.map(c=>c.id).join(','));
  console.log('KPIs:', (document.getElementById('kpis').innerHTML.match(/class="kpi/g)||[]).length);
  console.log('Attention:', (document.getElementById('attention').innerHTML.match(/class="att"/g)||[]).length);
  console.log('Detail rows:', (document.getElementById('detail-table').querySelector('tbody').innerHTML.match(/<tr>/g)||[]).length);
  console.log('Methodology el exists:', !!document.getElementById('methodology'));
})();`;
eval(fs.readFileSync('app.js','utf8')+'\n'+probe);
