const main = document.querySelector('#main');
const qna = document.querySelector('#qna');

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
    }, 450);
}
