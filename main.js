'use strict';

{
    const now = document.getElementById('now');
    const timer = document.getElementById('timer');
    const start = document.getElementById('start');
    const stop = document.getElementById('stop');
    const reset = document.getElementById('reset');
    const back = document.getElementById('back');
    const next = document.getElementById('next');
    const alert = document.getElementById('alert');

    let startTime;       // Startボタンクリック時の時刻
    let timeoutid;       // ID
    let elapsedTime = 0; // 経過時間

    var menu = 0;

    const last20 = new SpeechSynthesisUtterance("残り20秒です");
    const last10 = new SpeechSynthesisUtterance("残り10秒です");

    var last20flag = true;
    var last10flag = true;

    function countUp() {
        const d = new Date(Date.now() - startTime + elapsedTime);
        const m = String(d.getMinutes()).padStart(2, '0');
        const s = String(d.getSeconds()).padStart(2, '0');
        const ms = String(d.getMilliseconds()).padStart(3, '0');

        if ((data[menu][1] - (d.getMinutes() * 60 + d.getSeconds())) > 0) {
            timer.textContent = `${m}:${s}.${ms}`;
        }
        if ((data[menu][1] - (d.getMinutes() * 60 + d.getSeconds())) < 10) {
            alert.textContent = "残り10秒です！";
            if (last10flag) {
                speechSynthesis.speak(last10);
                last10flag = false;
            }
        } else if ((data[menu][1] - (d.getMinutes() * 60 + d.getSeconds())) < 20) {
            alert.textContent = "残り20秒です！";
            if (last20flag) {
                speechSynthesis.speak(last20);
                last20flag = false;
            }
        }
        timeoutid = setTimeout(() => {
            countUp();
        }, 10);
    }

    function setButtonStateInitial() {
        //分秒に直す
        now.textContent = data[menu][0] + " " + String(data[menu][1] / 60 | 0).padStart(2, '0') + ":" + String(data[menu][1] % 60).padStart(2, '0');
        start.classList.remove('inactive');
        stop.classList.add('inactive');
        reset.classList.add('inactive');
    }

    function setButtonStateRunning() {
        start.classList.add('inactive');
        stop.classList.remove('inactive');
        reset.classList.add('inactive');
    }

    function setButtonStateStopped() {
        start.classList.remove('inactive');
        stop.classList.add('inactive');
        reset.classList.remove('inactive');
    }

    var data = [
        ["test1", 126],
        ["test2", 148],
        ["test3", 266]
    ]
    console.log(data)

    setButtonStateInitial()

    start.addEventListener('click', () => {
        if (start.classList.contains('inactive') === true) {
            return;
        }
        setButtonStateRunning();
        startTime = Date.now();
        countUp();
    });

    stop.addEventListener('click', () => {
        if (stop.classList.contains('inactive') === true) {
            return;
        }
        setButtonStateStopped();
        clearTimeout(timeoutid);
        elapsedTime += Date.now() - startTime;
    });

    reset.addEventListener('click', () => {
        if (reset.classList.contains('inactive') === true) {
            return;
        }
        setButtonStateInitial()
        alert.textContent = "";
        last20flag = true;
        last10flag = true;
        timer.textContent = '00:00.000';
        elapsedTime = 0;
    });

    //Backボタンをクリック
    back.addEventListener('click', () => {
        if(menu != 0) menu--;
        setButtonStateInitial()
        alert.textContent = "";
        last20flag = true;
        last10flag = true;
        timer.textContent = '00:00.000';
        clearTimeout(timeoutid);
        elapsedTime = 0;
    });

    // Nextボタンをクリック
    next.addEventListener('click', () => {
        menu++;
        setButtonStateInitial()
        alert.textContent = "";
        last20flag = true;
        last10flag = true;
        timer.textContent = '00:00.000';
        clearTimeout(timeoutid);
        elapsedTime = 0;
    });
}
