const main = document.querySelector('#main');
const qna = document.querySelector('#qna');
const result = document.querySelector('#result');

const endPoint = 12; //12개 질문//
const select = [];

function calResult () {
    var pointArray = [
        { name: 'mouse', value: 0, key: 0},
        { name: 'cow', value: 0, key: 1},
        { name: 'tiger', value: 0, key: 2},
        { name: 'rabbit', value: 0, key: 3},
        { name: 'dragon', value: 0, key: 4},
        { name: 'snake', value: 0, key: 5},
        { name: 'horse', value: 0, key: 6},
        { name: 'sheep', value: 0, key: 7},
        { name: 'monkey', value: 0, key: 8},
        { name: 'chick', value: 0, key: 9},
        { name: 'dog', value: 0, key: 10},
        { name: 'pig', value: 0, key: 11},
    ]

    for(let i = 0; i < endPoint; i++) {
        var target = qnaList[i].a[select[i]];
        for(let j = 0;  j < target.type.length; j++) {
            for(let k = 0; k < pointArray.length; k++) {
                if(target.type[j] === pointArray[k].name) {
                    pointArray[k].value += 1;
                }
            }
        }

    }

    var resultArray = pointArray.sort(function (a, b){
        if(a.value > b.value) {
            return -1;
        }
        if(a.value < b.value) {
            return 1;
        }
        return 0;
    });
    console.log(resultArray)
    let resultword = resultArray[0].key;
    return resultword;
}

function setResult() {
    let point = calResult();
    const resultName = document.querySelector('.resultname');
    resultName.innerHTML = infoList[point].name;

    var resultImg = document.createElement('img');
    const imgDiv = document.querySelector('#resultImg');
    var imgURL = 'img/image-' + point + '.png';
    resultImg.src = imgURL;
    resultImg.alt = point;
    resultImg.classList.add('img-fluid');
    imgDiv.appendChild(resultImg);

    const resultDesc = document.querySelector('.resultDesc');
    resultDesc.innerHTML = infoList[point].desc;
}

function goResult() {
    qna.style.WebkitAnimation = 'fadeOut 1s'; //애니메이션 1초동안 지속//
    qna.style.animation = 'fadeOut 1s';
    setTimeout(() => {  //애니메이션이 실행되고 메인페이지를 none으로 바꿈//
        result.style.WebkitAnimation = 'fadeIn 1s';
        result.style.animation = 'fadeIn 1s';
        setTimeout(() => {  
            qna.style.display = 'none';
            result.style.display = 'block';
        }, 450)})
        setResult();
        console.log(select);
        calResult();
    }


function addAnswer(answerText, qIdx, idx){
    var a = document.querySelector('.answerBox');
    var answer = document.createElement('button'); //answer변수에 버튼 만들기//
    answer.classList.add('answerList'); //answerList 클래스 추가//
    answer.classList.add('my-3');
    answer.classList.add('py-3');
    answer.classList.add('mx-auto');
    answer.classList.add('fadeIn');
    
    a.appendChild(answer); //answer버튼 a에 소속//
    answer.innerHTML = answerText;
    answer.addEventListener("click", function(){
        var children = document.querySelectorAll('.answerList'); //버튼 모두 선택//
        for(let i = 0; i < children.length; i++){
            children[i].disabled = true;
            children[i].style.WebkitAnimation = 'fadeOut 0.5s'; 
            children[i].style.animation = 'fadeOut 0.5s';        
        }
        setTimeout(() => {
            select[qIdx] = idx; //몇번째 질문에서 몇번째 버튼 클릭//
            for(let i = 0; i < children.length; i++){
                children[i].style.display = 'none';
            }
            goNext(++qIdx); //반복문 끝난 뒤 다음질문 호출//
        },450)
    }, false);
}
function goNext(qIdx){
    if(qIdx === endPoint) {
        goResult();
        return;
    }

    var q = document.querySelector('.qBox');
    q.innerHTML = qnaList[qIdx].q; //innerHTML : 요소 내 html 가져옴,설정//
    for(let i in qnaList[qIdx].a){
        addAnswer(qnaList[qIdx].a[i].answer, qIdx, i);
    }
    var status = document.querySelector('.statusBar')
    status.style.width = (100/endPoint) * (qIdx+1) + '%';
}

function begin(){ //시작하기 버튼 눌렀을 때 qna 페이지로 넘어가는 함수//
    main.style.WebkitAnimation = 'fadeOut 1s'; //애니메이션 1초동안 지속//
    main.style.animation = 'fadeOut 1s';
    setTimeout(() => {  //애니메이션이 실행되고 메인페이지를 none으로 바꿈//
        qna.style.WebkitAnimation = 'fadeIn 1s';
        qna.style.animation = 'fadeIn 1s';
        setTimeout(() => {  
            main.style.display = 'none';
            qna.style.display = 'block';
        }, 450)
        let qIdx = 0;
        goNext(qIdx);
    }, 450);
}
