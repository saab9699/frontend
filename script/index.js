
let A = document.querySelectorAll('a');
A.forEach(a => {
    a.addEventListener('click', (event) =>{
        event.preventDefault();
    })
})

// ====================== ctrl-banner and bar ==============================

let bannerBars = document.querySelectorAll('.banner_bars > .bar');
let innerBars = document.querySelectorAll('.banner_bars > .bar span')
let bannerCtrl = document.querySelector('.ctrl')

let bar = innerBars[0]
let bannerIndex = 0;
let activeNum = 0;
function bannerCtrls(index) {
    let bannerImg = document.querySelector('.header_banner')
        // let bannerImgs = [
        //     'url("./images/original (4).jfif")',
        //     'url("./images/original (5).jfif")',
        //     'url("./images/original (6).jfif")',
        //     'url("./images/original (7).jfif")']
        let bannerContent = document.querySelector('.bars_content');
        let bannerContents = [
            '무빙<br>모든 에피소드 스트리밍 중',
            '엘리멘탈<br>지금 스트리밍 중',
            '최악의 악<br>9월 27일 스트리밍',
            '로키 시즌 2<br>10월 6일 스트리밍']

        // bannerImg.style.backgroundImage = bannerImgs[index];
        bannerImg.classList.remove(`active${activeNum}`)
        bannerImg.classList.add(`active${index}`)
        bar.classList.remove('active');
        innerBars[index].classList.add('active');
        bannerContent.innerHTML = bannerContents[index]
        bar = innerBars[index];
        bannerIndex = index;
        activeNum = index;
};

// ============================= timer ==================================

let Timer
function bannerTimer(){
    Timer = setInterval(() => {   
        bannerIndex += 1;
        if (bannerIndex >= 4) bannerIndex = 0
        bannerCtrls(bannerIndex);
    }, 4000);
};
bannerTimer();

//============================ timer ctrl ===============================

let ctrls = 1;
function playStop(){
    if (ctrls == 1) {
        bannerCtrl.innerHTML = '▶';
        clearInterval(Timer)
        ctrls = 0;
    }else{
        bannerCtrl.innerHTML = '■';
        bannerTimer();
        ctrls = 1;
    };
};

// ============================= play ==================================

bannerBars.forEach((bannerBar, index) => {
    bannerBar.addEventListener('click', () => {
        bannerCtrls(index);
        ctrls = 1;
        playStop();
    });
});

bannerCtrl.addEventListener('click', () => {
    playStop();    
});

// =========================== join-login ==================================

let fixedheader = document.querySelector('.fixed_header');
let fixedJoin = document.querySelector('.join');
let fixedimg = document.querySelector('.fixed_header > img');
let header = document.querySelector('header > .header_banner');
let advertisement = document.querySelector('.advertisement');

window.addEventListener('scroll', () => {
    let advertisementHeight = advertisement.offsetHeight;
    let headerHeight = header.offsetHeight;
    let headerposition = (headerHeight / 10 * 8.5) + advertisementHeight;
    let windowScroll = window.scrollY;
    if (windowScroll > headerposition){
        fixedheader.classList.add('active');
        fixedJoin.classList.add('active');
        fixedimg.classList.add('active');
    }else{
        fixedheader.classList.remove('active');
        fixedJoin.classList.remove('active');
        fixedimg.classList.remove('active');
    };
});

// =========================== questions ================================

let questions = document.querySelectorAll('.question .title');
let questionContainers = document.querySelectorAll('.question > .question_container');
let pushMinus = document.querySelectorAll('.question span');
let questionContents = document.querySelectorAll('.question .content');
let heights = [];

// heights 각 questionContainers의 높이 저장
function contentsHight(){
    heights = [];
    questionContents.forEach((questionContent) => {
        let height = questionContent.offsetHeight;
        heights.push(height);
    });
};
contentsHight();

// main 동작 코드
let FAQ = [];
questions.forEach((question, index) => {
    question.addEventListener('click', () => {
        if(!FAQ[index]){
            questionContainers[index].style.height = `${75 + heights[index]}px`;
            pushMinus[index].innerHTML = '+';
            pushMinus[index].style.fontSize = '35px';
            FAQ[index] = 1;
        }else{
            questionContainers[index].style.height = '75px';
            pushMinus[index].innerHTML = '-';
            pushMinus[index].style.fontSize = '50px';
            FAQ[index] = 0;
        };
    });
});

// 화면의 넓이에 따라 heights의 높이 갱신 및 questionContainers높이 조절
window.addEventListener('resize', () => {
    contentsHight();
    for(let index = 0; index < questionContainers.length; index++){
        if(FAQ[index]) {
            questionContainers[index].style.height = `${75 + heights[index]}px`;
        };
    };
});
