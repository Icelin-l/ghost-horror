// 实时时钟
function updateNowTime(){
    const t = new Date();
    document.getElementById("now-time").textContent = t.toLocaleString('zh-CN');
}
updateNowTime();
setInterval(updateNowTime,1000);

// 加载进度动画
let progressNum = 5;
const pText = document.getElementById('progress');
const pFill = document.getElementById('progress-fill');
const loadTimer = setInterval(()=>{
    progressNum++;
    pText.textContent = progressNum + '%';
    pFill.style.width = progressNum + '%';
    if(progressNum >= 100){
        clearInterval(loadTimer);
        document.querySelector('.loading-box').classList.add('hidden');
        document.querySelector('.test-box').classList.remove('hidden');
    }
},80);

// 题库内容
const questions = [
    {q:"荒野发现无主源石矿点，你的选择？",opt:["私自开采武装自己","上报罗德岛统一处置","留给贫苦感染者取用"]},
    {q:"确诊矿石病你会？",opt:["隐瞒身份躲避歧视","前往罗德岛接受治疗","加入整合运动反抗不公"]},
    {q:"遭遇乌萨斯纠察队盘查？",opt:["顺从配合避免麻烦","编造身份蒙混过关","掩护患病同伴撤离"]},
    {q:"强化源石技艺但加速病情发作？",opt:["拒绝保全性命","酌情少量使用","为守护他人甘愿承受代价"]},
    {q:"面对伤害过你的感染者对手？",opt:["永久戒备不信任","看处境放下隔阂","主动和解伸出援手"]},
    {q:"彻夜值守罗德岛医务室？",opt:["疲惫想换班","踏实完成本职","心疼病患主动陪护"]},
    {q:"旁人嘲讽萨卡兹是灾祸？",opt:["沉默旁观","委婉纠正偏见","当场驳斥歧视言论"]},
    {q:"仅有一剂矿石病抑制剂？",opt:["留给自己生存","分给挚友","送给陌生患病孩童"]},
    {q:"任务需要牺牲平民完成大局？",opt:["遵从指令完成任务","寻找两全方案","拒绝牺牲无辜者"]},
    {q:"被信任战友出卖后？",opt:["封闭内心不再信任他人","谨慎慢慢观察别人","依旧真诚待人"]},
    {q:"有机会移居无天灾和平国度？",opt:["立刻动身远离泰拉的苦难","偶尔定居，仍牵挂泰拉故土","拒绝离开，坚守泰拉受苦的人们"]},
    {q:"偶遇迷路萨卡兹流浪孩童？",opt:["绕道走开省去多余麻烦","简单指路之后转身离开","一路护送帮其找寻亲人"]},
    {q:"罗德岛与整合运动对峙，你的立场偏向？",opt:["罗德岛：医治与秩序","保持中立，同情两边苦难","整合运动：反抗不公"]},
    {q:"赚到一笔可观龙门币优先花销？",opt:["购置作战装备提升自身战力","补充全队生存医疗物资","捐助矿石病救助站点"]},
    {q:"预知本次任务伤亡惨重还执行吗？",opt:["找借口放弃高风险任务","修改路线尽力减少伤亡","哪怕牺牲自己也要完成使命"]},
    {q:"空闲休息你更喜欢？",opt:["独自修炼源石技艺","和队友闲谈放松身心","去病房陪伴患病干员"]},
    {q:"你如何看待源石？",opt:["纯粹灾难应当远离","中性工具好坏看人使用","承载文明苦难与希望"]},
    {q:"临时接管全队指挥权？",opt:["推脱不愿担责","必要时统筹安排","主动扛起全队重担"]},
    {q:"市民投来厌恶感染者的目光？",opt:["刻意远离人群","无视他人眼光","科普矿石病消除偏见"]},
    {q:"消除矿石病代价是抹去所有感染者？",opt:["赞同换来无病痛世界","犹豫不愿抹杀生命","断然拒绝，众生皆有生存资格"]},
    {q:"翻看干员档案最关注？",opt:["作战实力履历","坎坷身世经历","柔软内心与执念"]},
    {q:"天灾信使邀你同行预警灾害？",opt:["婉拒不愿颠沛奔波","短途随行体验一次","长期结伴警示世人避险"]},
    {q:"挚友因矿石病走到生命尽头？",opt:["刻意回避离别伤感","安静陪伴走完最后时光","不顾一切寻找续命办法"]},
    {q:"多国势力纷争，你向往的秩序？",opt:["强者划分高低秩序","各国互不干涉安稳生活","各族平等消除歧视隔阂"]},
    {q:"身居罗德岛高层首要目标？",opt:["扩充武装稳固势力","批量研发缓解病痛药剂","彻底消除世人对感染者歧视"]},
    {q:"天灾废墟城镇探索你的举动？",opt:["优先搜寻自保物资","搜物资顺带寻找幸存者","优先救助普通幸存者"]},
    {q:"拉特兰修士向你灌输宗教教条？",opt:["礼貌回绝坚持自我","选择性认同部分教义","完全恪守全部教条"]},
    {q:"队友失误导致任务崩盘？",opt:["心生疏远刻意避开对方","复盘共同补救","主动揽责保护队友不受责罚"]},
    {q:"面对背负深重仇恨的爱国者？",opt:["心存畏惧保持戒备","理解遭遇但不认同极端做法","共情愿意静心倾听倾诉"]},
    {q:"长期驻守枯燥偏远边境据点？",opt:["消极度日申请调回主城","认真完成每日本职工作","主动帮扶周边村镇贫苦百姓"]}
];
let currentPage = 0;
let totalScore = 0;

// 渲染题目
function renderQuestion(){
    const item = questions[currentPage];
    document.querySelector('.question').textContent = item.q;
    const optWrap = document.querySelector('.options');
    optWrap.innerHTML = "";
    item.opt.forEach((opt,idx)=>{
        const div = document.createElement("div");
        div.className = "opt-item";
        div.textContent = opt;
        div.onclick = ()=>{
            totalScore += idx;
            document.querySelector('.next-btn').dataset.canNext = "1";
            document.querySelectorAll(".opt-item").forEach(d=>d.classList.remove("active"));
            div.classList.add("active");
        }
        optWrap.appendChild(div);
    });
    document.getElementById('page-num').textContent = `第${currentPage+1}题 / 共${questions.length}`;
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
        const inputHtml = `
            <button class="restart-btn" onclick="location.reload()">重新测试</button>
            <div class="ask-wrap">
                <p class="ask-title">你是谁？</p>
                <input type="text" id="answerInput" placeholder="输入身份">
                <button id="submitAnswer">提交</button>
            </div>
        `;
        if(totalScore <= 20){
            resultBox.innerHTML = `<h3>荒野独行求生者</h3><p>乱世优先保全自身，习惯独善其身，为自己筑起内心高墙。</p>` + inputHtml;
        }else if(totalScore <= 40){
            resultBox.innerHTML = `<h3>罗德岛中坚干员</h3><p>理智与善良平衡，认可罗德岛理念，团队可靠支柱。</p>` + inputHtml;
        }else{
            resultBox.innerHTML = `<h3>泰拉悲悯理想者</h3><p>共情所有苦难，愿意牺牲自我追求平等无歧视的世界。</p>` + inputHtml;
        }
        setTimeout(()=>document.getElementById('submitAnswer').onclick = handleAnswerSubmit,100);
        return;
    }
    renderQuestion();
}

// 提交判断：精准匹配「预言家」，修复文字BUG
function handleAnswerSubmit(){
    const val = document.getElementById('answerInput').value.trim();
    // 统一小写，忽略空格容错
    const input = val.toLowerCase().replace(/\s/g,'');
    if(input.includes("博士")){
        alert("你仍在逃避");
    }else if(input.includes("预言家")){
        openOraclePage();
    }else{
        alert("PRTS无响应");
    }
}

// 延时封装函数
function sleep(ms){
    return new Promise(resolve=>setTimeout(resolve,ms));
}

// 预言家动画流程
async function openOraclePage(){
    // 强制关闭结尾页面，防止两层遮罩叠加
    document.getElementById("redWrap").style.display = "none";
    const page = document.getElementById("oraclePage");
    page.style.display = "block";
    const messLayer = document.getElementById("messTextLayer");
    const textContainer = document.getElementById("textContainer");
    textContainer.innerHTML = "";

    // 生成乱码图层
    const sym = ['，','！','。','-','（','）','/','■',':','_','~','░','▒','▓','█'];
    let messStr = "";
    for(let i=0;i<12000;i++) messStr += sym[Math.floor(Math.random()*sym.length)];
    messLayer.textContent = messStr;
    messLayer.style.opacity = "1";
    await sleep(3500);
    messLayer.style.opacity = "0";

    // 逐行浮现文案
    const textList = [
        {en:"Even if the ocean boils away, and the atmosphere vanishes.",cn:"就算是海洋沸腾、大气消失"},
        {en:"Even if all the moons in the sky are pulled into the vortex of our planet's gravity.",cn:"就算我们的卫星接连坠入重力的漩涡"},
        {en:"At the far end of our civilization, I am sure we will meet again.",cn:"在那用黑暗与星点光芒装饰过的文明尽头，我们也一样会再见面。"},
        {en:"I promise you I will.",cn:"一定。"},
        {en:"Wait for me. You must wait for me too.",cn:"等我。你也要等我。"},
        {en:"Don't ever forget about me.",cn:"不准忘记我"},
        {en:"Oracle",cn:"预言家"}
    ];
    textList.forEach(item=>{
        let enDiv = document.createElement("div");
        enDiv.className = "text-line en";
        enDiv.textContent = item.en;
        let cnDiv = document.createElement("div");
        cnDiv.className = "text-line cn";
        cnDiv.textContent = item.cn;
        textContainer.appendChild(enDiv);
        textContainer.appendChild(cnDiv);
    });
    const lines = document.querySelectorAll(".text-line");
    for(let i=0;i<lines.length;i++){
        await sleep(1100);
        lines[i].style.opacity = "1";
    }
    await sleep(3000);
    lines.forEach(li=>li.style.opacity = "0");
    await sleep(2200);
    // 隐藏文字弹窗，再展示最终背景页面
    page.style.display = "none";
    showFullRed();
}

// 生成5列文字铺满背景图
function showFullRed(){
    const wrap = document.getElementById("redWrap");
    wrap.style.display = "grid";
    let html = "";
    for(let i = 0; i < 70; i++){
        html += `<div class="red-text-item" style="animation-delay:${i*0.05}s">不准忘记我！</div>`;
    }
    wrap.innerHTML = html;
}
