// 1. 加载进度模拟
let p = 5;
const progressEl = document.getElementById('progress');
setInterval(()=>{
  if(p<100){
    p+=1;
    progressEl.innerText = p+'%';
  }else{
    // 加载完成，切换页面
    document.querySelector('.loading-box').classList.add('hidden');
    document.querySelector('.test-box').classList.remove('hidden');
  }
},100);

// 2. 题库（30题，可自行修改）
const questions = [
  {q:"深夜独处时你会忍不住胡思乱想吗？",opt:["完全不会","偶尔会","经常控制不住"]},
  // 此处补齐剩余29道题目
];
let current = 0; // 当前题号
let score = 0; // 得分

// 渲染题目
function render(){
  const item = questions[current];
  document.querySelector('.question').innerText = item.q;
  const optWrap = document.querySelector('.options');
  optWrap.innerHTML = '';
  item.opt.forEach((o,i)=>{
    const div = document.createElement('div');
    div.className = 'opt-item';
    div.innerText = o;
    div.onclick = ()=>{
      score += i; // 按选项计分
      document.querySelector('.next-btn').dataset.canNext = 1;
    }
    optWrap.appendChild(div);
  })
  document.getElementById('page-num').innerText = `第${current+1}题 / 共${questions.length}题`;
}
render();

// 下一题按钮逻辑
document.querySelector('.next-btn').onclick = ()=>{
  if(!document.querySelector('.next-btn').dataset.canNext){
    alert("请选择一项答案");
    return;
  }
  current++;
  if(current >= questions.length){
    // 全部答完，跳转结果页
    document.querySelector('.test-box').classList.add('hidden');
    const resBox = document.querySelector('.result-box');
    resBox.classList.remove('hidden');
    // 根据总分输出不同恐怖结局
    if(score < 30) resBox.innerHTML = `<h3>结局A</h3><p>你内心藏着温柔，鬼魂不忍靠近你</p>`;
    else if(score <60) resBox.innerHTML = `<h3>结局B</h3><p>你能感知到暗处的视线，却无法逃离</p>`;
    else resBox.innerHTML = `<h3>结局C</h3><p>你的精神早已和另一个世界相连...</p>`;
    return;
  }
  render();
}
