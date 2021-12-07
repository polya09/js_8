let $box = document.querySelector('.box');
let $area = document.querySelector('.area');
let $btn = document.querySelector('#add-btn');

let action = false;
let distanceX = 0;
let distanceY = 0;
let x1 = 0;
let y1 = 0;
let x2 = 0;
let y2 = 0;
let $selectedBox = 0;
let selectedBoxIndex = 0;

let list = [];

if (localStorage.getItem('boxes')) {
    list = JSON.parse(localStorage.getItem('boxes'));
    boxGenerator();
}

function boxController(x, y) {
    $selectedBox.style.cssText = 'transform: translate(' + x + 'px, ' + y + 'px)';
}

function boxGenerator() {
    let template = '';
    for (let i = 0; i < list.length; i++) {
        template += '<div class="box" data-index="' + i + '" style="transform: translate(' + list[i].x + 'px, ' + 
        list[i].y + 'px)"><textarea rows="13" cols="23" data-index="' + i + '"> ' + list[i].text + '</textarea></div>';
    }
    console.log(template);
    $area.innerHTML = template;
}


window.addEventListener('mousedown', function(e) {
    $selectedBox = e.target;
    if ($selectedBox.classList.contains('box')) {
        selectedBoxIndex = parseFloat($selectedBox.getAttribute('data-index'));
        action = true;
        x1 = e.clientX;
        y1 = e.clientY;
    }
});

$area.addEventListener('input', function(e) {
    $selectedBox = e.target;
    let sBoxIndex = parseFloat($selectedBox.getAttribute('data-index'));
    list[sBoxIndex] = {
        x: list[sBoxIndex].x,
        y: list[sBoxIndex].y,
        text: e.target.value
    };
});


window.addEventListener('mouseup', function(e) {
    if (action) {
        list[selectedBoxIndex] = {
            x: distanceX,
            y: distanceY,
            text: list[selectedBoxIndex].text
        };
    }
    localStorage.setItem('boxes', JSON.stringify(list));
    action = false;
});

window.addEventListener('mousemove', function(e) {
    if (action) {
        x2 = e.clientX;
        y2 = e.clientY;
        distanceX = list[selectedBoxIndex].x + (x2 - x1);
        distanceY = list[selectedBoxIndex].y + (y2 - y1);
        boxController(distanceX, distanceY);
    }
});

$btn.addEventListener('click', function() {
    list.push({
        x: 0,
        y: 0,
        text: "Заметка №" + (list.length + 1)
    });
    boxGenerator();
});