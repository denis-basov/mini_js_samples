class Timer{

    constructor(durationInput, startButton, pauseButton, callbacks){
        // присваиваем переданные данные в конструктор свойствам объекта
        this.durationInput = durationInput;
        this.startButton = startButton;
        this.pauseButton = pauseButton;
        // если передан соъект с методами, присваиваем в методы текущего объекта
        if(callbacks){
            this.onStart = callbacks.onStart;
            this.onTick = callbacks.onTick;
            this.onComplete = callbacks.onComplete;
        }

        // назначаем обработчики событий
        this.startButton.addEventListener('click', this.start);
        this.pauseButton.addEventListener('click', this.pause); 
    }

    start = () => { // старт таймера
        if(this.onStart){ // если передан метод onStart
            this.onStart(this.timeRemaining); // запускаем метод, передаем стартовое значение таймера
        }
        this.interval = setInterval(this.tick, 10); // вызываем метод tick через указанный интервал, кладем id в свойство interval
    }

    pause = () => { // пауза
        clearInterval(this.interval); // останавливаем таймер
    }

    tick = () => { // выполняется при каждом тике таймера
        if(this.timeRemaining <= 0){ // если время таймера истекло
            this.pause(); // останавливаем таймер
            if(this.onComplete){ // если передан метод onComplete, вызываем
                this.onComplete();
            }
        }else{ // если время таймера еще не истекло
            this.timeRemaining = this.timeRemaining - 0.01; // уменьшаем оставшееся время и записываем в инпут
            if(this.onTick){ // если передан метод onTick, вызываем, передаем оставшееся время
                this.onTick(this.timeRemaining);
            }
        }
        
    }


    get timeRemaining(){ // геттер для получения значения инпута с оставшимся временем
        return parseFloat(this.durationInput.value);
    }

    set timeRemaining(time){ // сеттер для установки значения инпута с оставшимся временем
        this.durationInput.value = time.toFixed(2);
    }
}