// 实时时钟
function updateNowTime(){
    const t = new Date();
    document.getElementById("now-time").textContent = t.toLocaleString('zh-CN');
}
updateNowTime();
setInterval(updateNowTime, 1000);

// 加载进度条
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

// 30道测试题目
const questions = [
    {q:"荒野发现无主源石矿点，你的选择？",opt:["私自开采武装自己","上报罗德岛统一处置","留给贫苦感染者取用"]},
    {q:"确诊矿石病你会？",opt:["隐瞒身份躲避歧视","前往罗德岛接受治疗","加入整合运动反抗不公"]},
    {q:"遭遇乌萨斯纠察队盘查？",opt:["顺从配合避免麻烦","编造身份蒙混过关","掩护患病同伴撤离"]},
    {q:"强化源石技艺但加速病发？",opt:["拒绝保全性命","酌情少量使用","为守护他人甘愿承受代价"]},
    {q:"面对伤害过你的感染者对手？",opt:["永久戒备不信任","看处境放下隔阂","主动和解伸出援手"]},
    {q:"彻夜值守罗德岛医务室？",opt:["疲惫想换班","踏实完成本职","心疼病患主动陪护"]},
    {q:"旁人嘲讽萨卡兹是灾祸？",opt:["沉默旁观","委婉纠正偏见","当场驳斥歧视言论"]},
    {q:"仅有一剂矿石病抑制剂？",opt:["留给自己生存","分给挚友","送给陌生患病孩童"]},
    {q:"任务需要牺牲平民完成大局？",opt:["遵从指令完成任务","寻找两全方案","拒绝牺牲无辜者"]},
    {q:"被信任战友出卖后？",opt:["封闭内心不再信任他人","谨慎慢慢观察别人","依旧真诚待人"]},
    {q:"有机会移居无天灾和平国度？",opt:["立刻动身远离泰拉苦难","偶尔定居仍牵挂故土","拒绝离开坚守受苦民众"]},
    {q:"偶遇迷路萨卡兹流浪孩童？",opt:["绕道避开麻烦","简单指路后离开","一路护送帮其寻找去处"]},
    {q:"罗德岛与整合运动对峙，你的立场？",opt:["罗德岛：医治与秩序","中立同情双方苦难","整合运动：反抗不公"]},
    {q:"龙门币优先花销？",opt:["购置作战装备","补充全队医疗物资","捐助矿石病救助站"]},
    {q:"预知任务伤亡惨重还要执行？",opt:["找借口放弃高危任务","修改路线减少伤亡","牺牲自己完成使命"]},
    {q:"空闲休息更喜欢？",opt:["独自钻研源石技艺","和同事闲谈放松","病房陪伴患病干员"]},
    {q:"你如何看待源石？",opt:["纯粹灾祸应当远离","中性工具看人用法","承载文明苦难与希望"]},
    {q:"临时接管全队指挥？",opt:["推脱不愿担责","必要时统筹全局","主动扛起全队重担"]},
    {q:"市民厌恶感染者的目光？",opt:["刻意远离人群","无视旁人眼光","科普矿石病消除偏见"]},
    {q:"根治矿石病需抹杀所有感染者？",opt:["赞同换取无病痛世界","犹豫不愿抹杀生命","坚决拒绝，众生皆有生存权"]},
    {q:"翻看干员档案最关注？",opt:["作战战绩履历","坎坷身世经历","柔软内心与执念"]},
    {q:"天灾信使邀你同行预警灾害？",opt:["婉拒不愿奔波","短途体验一次","长期同行警示民众"]},
    {q:"挚友因矿石病走到末期？",opt:["刻意回避离别伤感","安静陪完最后时光","不顾一切尝试续命"]},
    {q:"你向往的泰拉势力秩序？",opt:["强者分级秩序","各国互不干涉","各族平等消除歧视"]},
    {q:"罗德岛高层首要目标？",opt:["扩张武装势力","批量研发治疗药剂","消除大众对感染者歧视"]},
    {q:"天灾废墟搜寻物资？",opt:["优先自保物资","顺带搜寻幸存者","优先救助普通百姓"]},
    {q:"他人向你灌输偏执教条？",opt:["礼貌回绝坚持自我","选择性接纳部分内容","完全遵从对方说教"]},
    {q:"队友失误导致任务崩盘？",opt:["疏远避开对方","复盘共同补救","主动揽责保护队友"]},
    {q:"面对背负仇恨的爱国者？",opt:["心存畏惧疏远","理解遭遇但不认同极端","共情耐心开导对方"]},
    {q:"长期驻守偏远枯燥边境？",opt:["消极度日申请调走","认真完成本职工作","帮扶周边村镇贫苦百姓"]}
];

let currentPage = 0;
let totalScore = 0;
let selected = false;

// 渲染题目与选项
function renderQuestion(){
    selected = false;
    const item = questions[currentPage];
    document.querySelector('.question').textContent = item.q;
    const optWrap = document.querySelector('.options');
    optWrap.innerHTML = "";

    item.opt.forEach((opt, idx)=>{
        const div = document.createElement("div");
        div.className = "opt-item";
        div.textContent = opt;
        div.onclick = function(){
            document.querySelectorAll(".opt-item").forEach(ele=>{
                ele.classList.remove("active");
            });
            this.classList.add("active");
            selected = true;
            totalScore += idx;
        };
        optWrap.appendChild(div);
    });
    document.getElementById('page-num').textContent = `第${currentPage+1}题 / 共${questions.length}题`;
}
renderQuestion();

// 下一题按钮逻辑
document.querySelector('.next-btn').onclick = function(){
    if(!selected){
        alert("请先选择一项答案");
        return;
    }
    currentPage++;
    if(currentPage >= questions.length){
        document.querySelector('.test-box').classList.add('hidden');
        const resultBox = document.querySelector('.result-box');
        resultBox.classList.remove('hidden');
        let resText = "";
        if(totalScore <= 20){
            resText = `<h3>荒野独行求生者</h3><p>乱世之中优先保全自身，习惯独来独往，给自己筑起一道坚固的心墙。</p>`;
        }else if(totalScore <= 40){
            resText = `<h3>罗德岛中坚干员</h3><p>理智与善良互相平衡，认同罗德岛的理念，是队伍中可靠的支柱。</p>`;
        }else{
            resText = `<h3>泰拉悲悯理想者</h3><p>共情世间种种苦难，愿意牺牲自身利益，追求各族平等、没有歧视的世界。</p>`;
        }
        const inputHtml = `
            <button class="restart-btn" onclick="location.reload()">重新测试</button>
            <div class="ask-wrap">
                <p class="ask-title">你是谁？</p>
                <input type="text" id="answerInput" placeholder="输入身份">
                <button id="submitAnswer">提交</button>
            </div>`;
        resultBox.innerHTML = resText + inputHtml;
        setTimeout(()=>{
            document.getElementById('submitAnswer').onclick = handleAnswerSubmit;
        },100);
        return;
    }
    renderQuestion();
};

// 身份提交判断
function handleAnswerSubmit(){
    const rawVal = document.getElementById('answerInput').value.trim().replace(/\s/g,"");
    if(rawVal.includes("博士")){
        alert("你仍在逃避");
    }else if(rawVal.includes("预言家")){
        openOraclePage();
    }else{
        alert("PRTS无响应");
    }
}

// 延时函数
function sleep(ms){
    return new Promise(resolve=>setTimeout(resolve, ms));
}

// 预言家诗句动画页面
async function openOraclePage(){
    document.getElementById("redWrap").style.display = "none";
    document.querySelector('.result-box').classList.add('hidden');
    const oracleBox = document.getElementById("oraclePage");
    oracleBox.style.display = "block";
    const messLayer = document.getElementById("messTextLayer");
    const textContainer = document.getElementById("textContainer");
    textContainer.innerHTML = "";

    const symbolArr = ['，','！','。','-','（','）','/','■',':','_','~','░','▒','▓','█'];
    let messStr = "";
    for(let i=0;i<12000;i++) messStr += symbolArr[Math.floor(Math.random()*symbolArr.length)];
    messLayer.textContent = messStr;
    messLayer.style.opacity = "1";
    await sleep(3500);
    messLayer.style.opacity = "0";

    const textList = [
        {en:"Even if the ocean boils away, and the atmosphere vanishes.",cn:"就算是海洋沸腾、大气消失"},
        {en:"Even if all moons are pulled into the planet's gravitational vortex.",cn:"就算所有卫星坠入星球的引力漩涡"},
        {en:"At the end of our civilization, I firmly believe we will meet again.",cn:"在文明的尽头，我们终将重逢"},
        {en:"I promise this will come true.",cn:"我向你许下这份约定"},
        {en:"Wait for me. Please wait for me always.",cn:"等着我，请一直等候我"},
        {en:"Don't ever forget me.",cn:"不准忘记我"},
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
    oracleBox.style.display = "none";
    showEndPage();
}

// 结尾动画页面（修复变量错误）
async function showEndPage(){
    const wrapDom = document.getElementById("redWrap");
    wrapDom.style.display = "grid";
    const imgEl = wrapDom.querySelector('.end-img');

    // 图片加载失败兜底执行文字渲染
    imgEl.onerror = ()=>{
        renderText(wrapDom);
    };

    // 图片淡入停留再淡出
    imgEl.style.opacity = "1";
    await sleep(2800);
    imgEl.style.opacity = "0";
    await sleep(1500);
    renderText(wrapDom);
}

// 生成铺满屏幕小字
function renderText(wrapDom){
    let textHtml = "";
    for(let i = 0; i < 120; i++){
        textHtml += `<div class="red-text-item">不准忘记我！</div>`;
    }
    wrapDom.innerHTML = `<img class="end-img" src="./oracle_img.png" alt="">` + textHtml;
}
