// 实时更新页面时间函数
function updateNowTime() {
    const timeBox = document.getElementById("now-time");
    const currentTime = new Date();
    timeBox.textContent = currentTime.toLocaleString('zh-CN', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    });
}
updateNowTime();
setInterval(updateNowTime, 1000);

// 加载进度逻辑 同步进度条宽度
let progressNum = 5;
const progressDom = document.getElementById('progress');
const progressFill = document.getElementById('progress-fill');
const loadTimer = setInterval(() => {
    progressNum++;
    progressDom.textContent = progressNum + '%';
    progressFill.style.width = progressNum + '%';
    if (progressNum >= 100) {
        clearInterval(loadTimer);
        document.querySelector('.loading-box').classList.add('hidden');
        document.querySelector('.test-box').classList.remove('hidden');
    }
}, 80);

// 30道明日方舟泰拉测试题库
const questions = [
    {q:"偶然在荒野发现无人看管的源石矿点，你的第一想法是？",opt:["悄悄开采用来武装自己","上报罗德岛统一处理","留给附近穷苦的平民取用"]},
    {q:"确诊矿石病之后，你最先打算做何种选择？",opt:["隐藏身份躲避世人排挤","前往罗德岛接受正规治疗","加入整合运动反抗世俗偏见"]},
    {q:"小队遭遇乌萨斯纠察队的盘查，你会如何应对？",opt:["顺从配合避免惹上麻烦","编造身份蒙混过关","掩护患病同伴先行撤离"]},
    {q:"拥有一次大幅强化源石技艺的机会，但会加速矿石病恶化，你？",opt:["直接拒绝，爱惜自身性命","斟酌利弊偶尔使用","为守护旁人甘愿承受代价"]},
    {q:"面对曾经伤害过你的感染者对手，你态度是？",opt:["保持戒备永远不予信任","看当下处境放下过往隔阂","主动和解并伸出援助之手"]},
    {q:"深夜值守罗德岛医务室照看重症病患，内心感受是？",opt:["枯燥疲惫只想尽快换班","坦然履行自身本职工作","心疼病患愿意彻夜陪伴照料"]},
    {q:"旁人当众嘲讽萨卡兹族群生来灾祸，你会？",opt:["沉默围观不愿掺和争辩","委婉指出对方的片面看法","站出来严厉驳斥这种偏见"]},
    {q:"仅有最后一剂矿石病抑制剂，你会分配给谁？",opt:["留给自己保障生存","分给关系要好的队友","赠予素不相识的患病孩童"]},
    {q:"执行任务必须牺牲部分平民才能完成大局目标，你？",opt:["遵照指令优先完成任务","拖延时间寻找两全之策","坚决拒绝牺牲无辜民众"]},
    {q:"被信任的战友背后出卖，往后与人相处你会？",opt:["封闭内心不再轻易信任他人","相处谨慎慢慢观察试探","依旧愿意真诚对待身边之人"]},
    {q:"有机会迁居到无天灾、无源石病痛的和平国度，你？",opt:["立刻动身远离泰拉的苦难","偶尔定居，仍牵挂泰拉故土","拒绝离开，坚守泰拉受苦的人们"]},
    {q:"偶遇独自迷路的萨卡兹流浪孩童，你怎么做？",opt:["绕道走开省去多余麻烦","简单指路之后转身离开","一路护送帮其找寻亲人"]},
    {q:"罗德岛与整合运动对峙僵持，你的立场偏向？",opt:["罗德岛：秩序与医治病患","保持中立，同情两边的苦难","整合运动：为不公奋起反抗"]},
    {q:"赚到一笔数额可观的龙门币，你会优先花销在？",opt:["购置装备提升自身战力","补充全队的生存与医疗物资","无偿捐助矿石病救助站点"]},
    {q:"预知本次任务伤亡会十分惨重，你还会执行吗？",opt:["找借口放弃高风险任务","修改路线尽力减少伤亡","哪怕牺牲自己也要完成使命"]},
    {q:"空闲的休息时间，你更喜欢？",opt:["独自修炼打磨源石技艺","和队友闲谈放松身心","去病房陪伴患病的干员们"]},
    {q:"看待源石这种物质，你的观点是？",opt:["灾难之源，应当尽量远离","中性工具，好坏取决于使用者","承载文明，苦难与希望并存"]},
    {q:"需要你临时扛起整支小队的指挥权，你？",opt:["推脱不愿承担决策压力","必要时接手统筹安排","主动站出来扛起全队重担"]},
    {q:"普通市民投来厌恶感染者的目光，你会？",opt:["心生不悦刻意远离人群","淡然无视旁人的眼光","主动科普矿石病消除偏见"]},
    {q:"可以抹去矿石病、代价是彻底抹去所有感染者，你？",opt:["赞同，换来没有病痛的世界","犹豫，不愿抹杀任何生命","断然拒绝，众生皆有存活资格"]},
    {q:"翻看罗德岛干员档案，你最关注哪部分内容？",opt:["作战战力与实战履历","坎坷的身世过往经历","内心柔软的情感与执念"]},
    {q:"天灾信使邀约你一同奔走各地预警灾害，你？",opt:["婉拒，不想长期颠沛奔波","体验一次短途的随行旅程","答应长期结伴警示世人避险"]},
    {q:"挚友因矿石病走到生命尽头，你会？",opt:["刻意回避离别的伤感氛围","安静陪伴走完最后的时光","不顾一切寻找续命的办法"]},
    {q:"乌萨斯、炎国、拉特兰多方势力纷争不断，你向往的秩序是？",opt:["强者制定规则划分高低","各国互不干涉各自安稳生活","各族平等共处消解歧视隔阂"]},
    {q:"假如身居罗德岛高层，你的首要目标是？",opt:["扩充武装力量稳固势力","大批量研发缓解病痛的药剂","彻底消除世人对感染者的歧视"]},
    {q:"在天灾过后的废墟城镇中探索，你的举动是？",opt:["抓紧搜寻自保的物资装备","一边搜集物资一边留意幸存者","优先搜寻救助幸存的普通民众"]},
    {q:"拉特兰修士向你灌输宗教教条，你的态度？",opt:["礼貌回绝坚持自我想法","部分认同选择性遵从教义","完全信服恪守全部的教条规矩"]},
    {q:"队友操作失误导致整体任务崩盘，你会？",opt:["暗自失望刻意疏远对方","冷静复盘一起补救失误","主动揽下责任保护队友不受责罚"]},
    {q:"面对背负深重仇恨的爱国者这类长者，你？",opt:["畏惧战力时刻保持戒备","理解遭遇但不认可极端做法","共情过往愿意静心倾听倾诉"]},
    {q:"长期驻守偏远的边境据点，日复一日枯燥乏味，你？",opt:["消极度日只想申请调回主城","坚守岗位认真完成每日职责","主动帮扶周边村镇的贫苦百姓"]}
];

let currentPage = 0;
let totalScore = 0;

// 渲染题目函数
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

        // 结算页面新增输入模块
        let inputHtml = `
            <button class="restart-btn" onclick="location.reload()">重新进行测试</button>
            <div class="ask-wrap">
                <p class="ask-title">你是谁？</p>
                <input type="text" id="answerInput" placeholder="在此输入你的身份">
                <button id="submitAnswer">提交</button>
            </div>
        `;

        if(totalScore <= 20){
            resultBox.innerHTML=`<h3>结局：荒野独行的求生者</h3><p>在残酷的泰拉大地里，你习惯优先保全自身，行事冷静克制，很少主动卷入纷争。你看透世间的苦难，选择独善其身，如同独行于天灾荒野的旅人，给自己筑起一道保护内心的高墙。</p>`+inputHtml;
        }else if(totalScore <= 40){
            resultBox.innerHTML=`<h3>结局：罗德岛中坚干员</h3><p>你有着恰到好处的善良与理智，懂得自保也愿意伸出援手，认可罗德岛治病、消解偏见的理念。处事稳重平衡，是队伍里可靠的支柱，既能在乱世生存，也不忘善待身边的人。</p>`+inputHtml;
        }else{
            resultBox.innerHTML=`<h3>结局：泰拉的悲悯理想者</h3><p>你的胸怀装下了整片泰拉的苦难，深切共情感染者、弱势种族遭受的不公。愿意为弱者让步、甚至牺牲自身利益，怀揣各族平等、终结病痛与歧视的远大理想，是这片灰暗土地里难得的温柔火种。</p>`+inputHtml;
        }

        // 绑定提交按钮事件
        setTimeout(()=>{
            const submitBtn = document.getElementById('submitAnswer');
            submitBtn.onclick = handleAnswerSubmit;
        },100);
        return;
    }
    renderQuestion();
}

// 处理身份提交逻辑
function handleAnswerSubmit(){
    const inputVal = document.getElementById('answerInput').value.trim();
    if(inputVal.includes("博士")){
        alert("你仍在逃避");
    }else if(inputVal.includes("预言家")){
        openOraclePage();
    }else{
        alert("PRTS无响应");
    }
}

// 打开预言家专属页面，点阵绘图+文字动画
function openOraclePage(){
    const oraclePage = document.getElementById("oraclePage");
    oraclePage.style.display = "block";
    // 点阵绘制图片
    drawDotImage();
    // 逐行浮现文字
    showTextLines();
}

// 点阵画布绘制传入的预言家图片
function drawDotImage(){
    const canvas = document.getElementById("dotCanvas");
    const ctx = canvas.getContext("2d");
    const img = new Image();
    img.crossOrigin = "anonymous";
    // 图片直链（你提供的预言家插画）
    img.src = "https://p3-flow-image-sign.byteimg.com/tos-cn-i-a9rns2rl98/3002f00f9394401892442f34d24d0311~tplv-a9rns2rl98-image.image";
    img.onload = ()=>{
        // 画布尺寸适配图片
        canvas.width = img.width / 4;
        canvas.height = img.height / 4;
        ctx.fillStyle = "#000";
        ctx.fillRect(0,0,canvas.width,canvas.height);
        // 缩小绘制原图
        ctx.drawImage(img,0,0,canvas.width,canvas.height);
        const imgData = ctx.getImageData(0,0,canvas.width,canvas.height);
        ctx.fillStyle = "#fff";
        ctx.fillRect(0,0,canvas.width,canvas.height);
        ctx.fillStyle = "#000";
        // 点阵采样绘制
        const dotSize = 2;
        for(let y=0;y<imgData.height;y+=dotSize){
            for(let x=0;x<imgData.width;x+=dotSize){
                const idx = (y * imgData.width + x) * 4;
                const r = imgData.data[idx];
                const g = imgData.data[idx+1];
                const b = imgData.data[idx+2];
                const brightness = (r+g+b)/3;
                if(brightness < 120){
                    ctx.fillRect(x,y,dotSize-0.5,dotSize-0.5);
                }
            }
        }
    }
}

// 需要逐行展示的文案
const textList = [
    {en:"Even if the ocean boils away, and the atmosphere vanishes.",cn:"就算是海洋沸腾、大气消失"},
    {en:"Even if all the moons in the sky are pulled into the vortex of our planet's gravity.",cn:"就算我们的卫星接连坠入重力的漩涡"},
    {en:"At the far end of our civilization, I am sure we will meet again.",cn:"在那用黑暗与星点光芒装饰过的文明尽头，我们也一样会再见面。"},
    {en:"I promise you I will.",cn:"一定。"},
    {en:"Wait for me. You must wait for me too.",cn:"等我。你也要等我。"},
    {en:"Don't ever forget about me.",cn:"不准忘记我"},
    {en:"Oracle",cn:"预言家"}
];

// 文字逐行浮现、整体淡出，最后切全屏红字
async function showTextLines(){
    const container = document.getElementById("textContainer");
    container.innerHTML = "";
    // 创建所有文字行
    textList.forEach(item=>{
        const enDiv = document.createElement("div");
        enDiv.className = "text-line en";
        enDiv.textContent = item.en;
        const cnDiv = document.createElement("div");
        cnDiv.className = "text-line cn";
        cnDiv.textContent = item.cn;
        container.appendChild(enDiv);
        container.appendChild(cnDiv);
    });
    const lines = document.querySelectorAll(".text-line");
    // 逐行淡入
    for(let i=0;i<lines.length;i++){
        await sleep(1100);
        lines[i].style.opacity = "1";
    }
    // 全部显示完成，等待3秒后整体淡出
    await sleep(3000);
    lines.forEach(line=>{
        line.style.transition = "opacity 2s ease";
        line.style.opacity = "0";
    });
    await sleep(2200);
    // 跳转全屏红字页面
    showFullRedText();
}

// 生成满屏重复“不准忘记我”红字
function showFullRedText(){
    const redWrap = document.getElementById("redWrap");
    redWrap.style.display = "block";
    // 生成多行重复文字
    let html = "";
    for(let i=0;i<40;i++){
        html += `<div class="red-text-item" style="animation-delay:${i*0.08}s">不准忘记我</div>`;
    }
    redWrap.innerHTML = html;
}

// 延时工具函数
function sleep(ms){
    return new Promise(res=>setTimeout(res,ms));
}
