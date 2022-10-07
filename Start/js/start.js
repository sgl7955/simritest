const main = document.querySelector('#main');
const qna = document.querySelector('#qna');
const endPoint = 12; //12개 질문//

function addAnswer(answerText, qIdx){
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
            for(let i = 0; i < children.length; i++){
                children[i].style.display = 'none';
            }
            goNext(++qIdx); //반복문 끝난 뒤 다음질문 호출//
        },450)
    }, false);
}
function goNext(qIdx){
    var q = document.querySelector('.qBox');
    q.innerHTML = qnaList[qIdx].q; //innerHTML : 요소 내 html 가져옴,설정//
    for(let i in qnaList[qIdx].a){
        addAnswer(qnaList[qIdx].a[i].answer, qIdx);
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
