// 实时页面时钟
function updateNowTime(){
    const t = new Date();
    document.getElementById("now-time").textContent = t.toLocaleString('zh-CN');
}
updateNowTime();
setInterval(updateNowTime, 1000);

// 页面加载进度条动画
let progressNum = 5;
const progressText = document.getElementById('progress');
const progressBar = document.getElementById('progress-fill');
const loadInterval = setInterval(()=>{
    progressNum++;
    progressText.textContent = progressNum + '%';
    progressBar.style.width = progressNum + '%';
    if(progressNum >= 100){
        clearInterval(loadInterval);
        document.querySelector('.loading-box').classList.add('hidden');
        document.querySelector('.test-box').classList.remove('hidden');
    }
},80);

// 30道测试题目题库
const questions = [
    {q:"荒野发现无主源石矿点，你的选择？",opt:["私自开采武装自己","上报罗德岛统一处置","留给贫苦感染者取用"]},
    {q:"患上矿石病之后你会怎么做？",opt:["隐瞒身份躲避排查","前往罗德岛接受治疗","加入整合运动反抗不公"]},
    {q:"遭遇乌萨斯纠察队盘查时",opt:["顺从配合例行检查","编造身份蒙混过关","掩护患病同伴撤离"]},
    {q:"修炼源石技艺会加速病情，你是否坚持",opt:["拒绝使用保全性命","酌情少量运用技艺","为守护他人甘愿承受代价"]},
    {q:"面对曾经伤害过你的感染者对手",opt:["时刻戒备不再信任","处境合适便放下隔阂","主动和解伸出援手"]},
    {q:"通宵值守罗德岛医务室",opt:["疲惫想要换班休息","踏实完成本职排班","心疼病患主动留下来陪护"]},
    {q:"旁人嘲讽萨卡兹族群皆是灾祸",opt:["沉默不予争辩","委婉纠正对方偏见","当场驳斥歧视言论"]},
    {q:"仅剩一剂矿石病抑制药剂",opt:["留给自身续命使用","分给关系要好的挚友","赠予陌生患病的普通人"]},
    {q:"任务需要牺牲平民换取大局胜利",opt:["遵照命令执行任务","寻找两全的折中办法","坚决拒绝牺牲无辜民众"]},
    {q:"被信任的战友出卖过后",opt:["封闭内心不再轻信他人","往后谨慎观察身边之人","依旧待人真诚保持本心"]},
    {q:"有机会前往无天灾的和平国度定居",opt:["立刻动身远离泰拉苦难","偶尔定居仍牵挂故土","拒绝离开坚守受苦的民众"]},
    {q:"遇见迷路的萨卡兹流浪孩童",opt:["绕道避开省去麻烦","简单指路转身离开","一路护送帮其寻找去处"]},
    {q:"罗德岛与整合运动对峙，你的立场",opt:["罗德岛：秩序与医疗庇护","保持中立同情双方苦难","整合运动：反抗种族压迫"]},
    {q:"获得一笔可观龙门币优先开销",opt:["采购作战装备提升战力","补充全队生存医疗物资","捐助矿石病救助站点"]},
    {q:"预知本次作战伤亡惨重还要执行吗",opt:["找借口放弃高危任务","修改方案尽量降低伤亡","哪怕牺牲自己也要完成任务"]},
    {q:"空闲休息日更喜欢",opt:["独自钻研源石技艺","和同事闲聊放松身心","前往病房陪伴患病干员"]},
    {q:"你如何看待源石这种物质",opt:["灾祸之源应当远离","利弊看人本身的用法","承载文明苦难与前进希望"]},
    {q:"临时接手团队指挥权限",opt:["推脱不愿承担压力","必要时统筹安排全局","主动扛起全队责任"]},
    {q:"旁人投来厌恶感染者的目光",opt:["刻意躲开避免冲突","无视旁人眼光照常生活","科普矿石病破除偏见"]},
    {q:"根治矿石病的代价是抹杀所有感染者",opt:["赞同换取世界无病痛","犹豫不愿抹杀生命","坚决反对，众生皆有生存权利"]},
    {q:"翻看干员档案你最关注",opt:["作战战绩与实战履历","坎坷的身世过往经历","柔软的内心与执念羁绊"]},
    {q:"天灾信使邀请你一同预警灾害",opt:["推脱不愿奔波吃苦","短途结伴体验一番","长期同行警示各地民众"]},
    {q:"挚友因矿石病走到生命末期",opt:["刻意回避离别伤感","安静陪伴走完最后时光","想尽一切办法尝试续命"]},
    {q:"各大势力纷争割据的理想秩序",opt:["强者主导的等级秩序","各方互不干涉安稳度日","各族平等消除歧视隔阂"]},
    {q:"身居罗德岛高层首要目标",opt:["扩张势力稳固话语权","批量研发矿石病治疗药剂","消除世人对感染者的偏见"]},
    {q:"在天灾废墟之中搜寻物资",opt:["优先搜集自身保命物资","顺带搜寻救助幸存者","优先救助普通受灾百姓"]},
    {q:"他人向你灌输偏执教条思想",opt:["礼貌回绝坚持自我","选择性采纳部分内容","完全遵从对方的说教"]},
    {q:"队友操作失误导致任务崩盘",opt:["心生疏远刻意避开对方","复盘问题共同补救残局","主动揽下责任保护队友"]},
    {q:"面对身负深重仇恨的爱国者干员",opt:["心存畏惧刻意疏远","理解遭遇但不认同极端做法","共情过往耐心开导对方"]},
    {q:"长期驻守枯燥偏远的边境站点",opt:["消极度日申请调走","认真完成每日本职工作","主动帮扶周边村镇贫苦民众"]}
];

let currentPage = 0;
let totalScore = 0;
let isSelected = false;

// 渲染当前题目
function renderQuestion(){
    isSelected = false;
    const item = questions[currentPage];
    document.querySelector('.question').textContent = item.q;
    const optionBox = document.querySelector('.options');
    optionBox.innerHTML = "";

    item.opt.forEach((option,index)=>{
        let div = document.createElement('div');
        div.className = "opt-item";
        div.textContent = option;
        div.onclick = function(){
            // 清除其他选中样式
            document.querySelectorAll('.opt-item').forEach(el=>el.classList.remove('active'));
            div.classList.add('active');
            isSelected = true;
            totalScore = totalScore + index;
        }
        optionBox.appendChild(div);
    });
    document.getElementById('page-num').textContent = `第${currentPage+1}题 / 共${questions.length}题`;
}
renderQuestion();

// 下一题点击逻辑
document.querySelector('.next-btn').onclick = function(){
    if(!isSelected){
        alert("请先选择一个答案");
        return;
    }
    currentPage++;
    if(currentPage >= questions.length){
        // 答题结束，展示结果页面
        document.querySelector('.test-box').classList.add('hidden');
        const resultWrap = document.querySelector('.result-box');
        resultWrap.classList.remove('hidden');
        let resultHtml = "";
        if(totalScore <= 20){
            resultHtml = `<h3>荒野独行求生者</h3><p>乱世之中优先保全自身，习惯独自承受风雨，为自己筑起坚固的内心高墙。</p>`;
        }else if(totalScore <= 40){
            resultHtml = `<h3>罗德岛中坚干员</h3><p>理智与善良相互平衡，认同罗德岛的医者理念，是队伍之中可靠坚实的支柱。</p>`;
        }else{
            resultHtml = `<h3>泰拉悲悯理想者</h3><p>共情世间所有苦难，愿意牺牲自身利益，奋力追寻一个平等、无歧视的泰拉世界。</p>`;
        }
        const inputArea = `
        <button class="restart-btn" onclick="location.reload()">重新测试</button>
        <div class="ask-wrap">
            <p class="ask-title">你是谁？</p>
            <input type="text" id="answerInput" placeholder="输入身份">
            <button id="submitAnswer">提交</button>
        </div>`;
        resultWrap.innerHTML = resultHtml + inputArea;
        setTimeout(()=>{
            document.getElementById('submitAnswer').onclick = handleSubmit;
        },120);
        return;
    }
    renderQuestion();
}

// 身份输入提交判断
function handleSubmit(){
    let inputVal = document.getElementById('answerInput').value.trim().replace(/\s+/g,"");
    if(inputVal.includes("博士")){
        alert("你仍在逃避");
    }else if(inputVal.includes("预言家")){
        openAnimationPage();
    }else{
        alert("PRTS无响应");
    }
}

// 延时等待函数
function sleep(ms){
    return new Promise(resolve=>setTimeout(resolve,ms));
}

// 黑屏乱码+诗句过渡动画页面
async function openAnimationPage(){
    // 预先隐藏结尾页面
    document.getElementById("redWrap").style.display = "none";
    const oraclePage = document.getElementById("oraclePage");
    oraclePage.style.display = "block";
    const messLayer = document.getElementById("messTextLayer");
    const textContainer = document.getElementById("textContainer");
    textContainer.innerHTML = "";

    // 生成乱码字符
    const symbolList = ['，','！','。','-','（','）','/','■',':','_','~','░','▒','▓','█'];
    let messText = "";
    for(let i = 0; i < 12000; i++){
        messText += symbolList[Math.floor(Math.random() * symbolList.length)];
    }
    messLayer.textContent = messText;
    messLayer.style.opacity = "1";

    await sleep(3500);
    messLayer.style.opacity = "0";

    // 中英诗句内容
    const verseList = [
        {en:"Even if the ocean boils away, and the atmosphere vanishes.",cn:"就算是海洋沸腾、大气消失"},
        {en:"Even if all the moons in the sky are pulled into the vortex of our planet's gravity.",cn:"就算我们的卫星接连坠入重力的漩涡"},
        {en:"At the far end of our civilization, I am sure we will meet again.",cn:"在那黑暗与星光点缀的文明尽头，我们终将再会"},
        {en:"I promise you I will.",cn:"我向你保证一定会"},
        {en:"Wait for me. You must wait for me too.",cn:"请等着我，你一定要等我"},
        {en:"Don't ever forget about me.",cn:"不准忘记我"},
        {en:"Oracle",cn:"预言家"}
    ];

    verseList.forEach(item=>{
        let enDiv = document.createElement("div");
        enDiv.className = "text-line en";
        enDiv.textContent = item.en;
        let cnDiv = document.createElement("div");
        cnDiv.className = "text-line cn";
        cnDiv.textContent = item.cn;
        textContainer.appendChild(enDiv);
        textContainer.appendChild(cnDiv);
    });

    const allTextLines = document.querySelectorAll(".text-line");
    for(let i = 0; i < allTextLines.length; i++){
        await sleep(1100);
        allTextLines[i].style.opacity = "1";
    }

    await sleep(3000);
    allTextLines.forEach(elem=>elem.style.opacity = "0");
    await sleep(2200);

    // 关闭黑色诗句页面，调出最终结算页
    oraclePage.style.display = "none";
    showFinalEndPage();
}

// 渲染最终结尾页面（图片正常加载+深红色文字）
function showFinalEndPage(){
    const endWrap = document.getElementById("redWrap");
    endWrap.style.display = "grid";
    let textHtml = "";
    // 循环生成70个文字模块
    for(let i = 0; i < 70; i++){
        textHtml += `<div class="red-text-item">不准忘记我！</div>`;
    }
    // 组合图片+文字，图片放在底层
    endWrap.innerHTML = `
    <img class="end-img" src="https://p3-flow-image-sign.byteimg.com/tos-cn-i-a9rns2rl98/30112130399b41389d4d44d4224d3031~tplv-a9rns2rl98-image.image" alt="预言家插画">
    ` + textHtml;
}
