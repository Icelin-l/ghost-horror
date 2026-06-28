// 实时更新页面时间函数
function updateNowTime() {
    const timeBox = document.getElementById("now-time");
    const currentTime = new Date();
    // 格式化年月日 时分秒
    timeBox.textContent = currentTime.toLocaleString('zh-CN', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    });
}

// 页面一加载立刻执行一次时间
updateNowTime();
// 每1000毫秒(1秒)刷新一次，永久实时走时
setInterval(updateNowTime, 1000);

// 加载进度逻辑
let progressNum = 5;
const progressDom = document.getElementById('progress');
const loadTimer = setInterval(() => {
    progressNum++;
    progressDom.textContent = progressNum + '%';
    if (progressNum >= 100) {
        clearInterval(loadTimer);
        document.querySelector('.loading-box').classList.add('hidden');
        document.querySelector('.test-box').classList.remove('hidden');
    }
}, 80);

// 测试题目题库
const questions = [
    {q:"深夜独处会胡思乱想吗？",opt:["完全不会","偶尔会","控制不住"]},
    {q:"你相信灵异事物存在吗？",opt:["完全不信","半信半疑","深信不疑"]},
    {q:"关灯后会害怕黑暗吗？",opt:["完全不怕","有点在意","极度恐惧"]}
];
let currentPage = 0;
let totalScore = 0;

// 渲染题目
function renderQuestion(){
    const item = questions[currentPage];
    document.querySelector('.question').textContent = item.q;
    const optionWrap = document.querySelector('.options');
    optionWrap.innerHTML = "";

    item.opt.forEach((option,idx)=>{
        const div = document.createElement("div");
        div.className = "opt-item";
        div.textContent = option;
        div.onclick = ()=>{
            totalScore += idx;
            document.querySelector('.next-btn').dataset.canNext = "1";
        }
        optionWrap.appendChild(div);
    })
    document.getElementById('page-num').textContent = `第${currentPage+1}题 / 共${questions.length}题`;
}
renderQuestion();

// 下一题按钮逻辑
document.querySelector('.next-btn').onclick = function(){
    if(this.dataset.canNext !== "1"){
        alert("请先选择一个答案");
        return;
    }
    currentPage++;
    if(currentPage >= questions.length){
        document.querySelector('.test-box').classList.add('hidden');
        const resultBox = document.querySelector('.result-box');
        resultBox.classList.remove('hidden');
        if(totalScore <= 2){
            resultBox.innerHTML = `<h3>结局一</h3><p>恭喜你干员，成功通过心理测试</p>`;
        }else if(totalScore <= 5){
            resultBox.innerHTML = `<h3>结局二</h3><p>是你？预言家</p>`;
        }else{
            resultBox.innerHTML = `<h3>结局三</h3><p>她仍在等待</p>`;
        }
        return;
    }
    renderQuestion();
}
