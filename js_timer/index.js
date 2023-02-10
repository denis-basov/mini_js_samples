const durationInput = document.querySelector('#duration'); // время для отсчета
const startButton = document.querySelector('#start'); // кнопка старт
const pauseButton = document.querySelector('#pause'); // кнопка паузы
const circle = document.querySelector('circle'); // анимированный круг

const perimeter = circle.getAttribute('r') * 2 * Math.PI; // считаем длину окружности
circle.setAttribute('stroke-dasharray', perimeter); // задаем черточку в окружности длиной в периметр самой окружности


let duration; // переменная для длительности таймера


/**
 * создаем объект тайймера, передаем в конструктор длительность таймера, кнопку старт, кнопку паузы
 * а также объект с методами для работы с svg-элементом
 */
const timer = new Timer(durationInput, startButton, pauseButton, {
    onStart(totalDuration){ // когда таймер стартует, получаем начальное значение таймера
        duration = totalDuration; // присваиваем начальное значение таймера в переменную duration
    },
    onTick(timeRemaining){ // при каждом тике таймера устанавливаем новое значение атрибуту 'stroke-dashoffset', что позволяет уменьшать круговую диаграмму пропорционально уменьшению времени
        circle.setAttribute('stroke-dashoffset', perimeter * timeRemaining / duration - perimeter);
    },
    onComplete(){
        console.log('Timer finished');
    }
});
