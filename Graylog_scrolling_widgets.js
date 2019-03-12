// ==UserScript==
// @name         Graylog scrolling widgets
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        http://GRAYLOG-DASHBOARD-URL/*
// @grant        unsafeWindow
// @run-at       document-idle
// ==/UserScript==

var ROTATION_TIME;

//Проверяем наличие параметра "ROTATION_TIME" в cookie
if (+getCookie("ROTATION_TIME")) {
	ROTATION_TIME = +getCookie("ROTATION_TIME");
} else {
	//Если не найдено, присваиваем значение по умолчанию
	ROTATION_TIME = 60; //sec
	document.cookie = "ROTATION_TIME=" + ROTATION_TIME;
}

 //Время прокрутки одного виджета по умолчанию
 //Влияет только на первую итерацию, в дальнейшем расчитывается как ROTATION_TIME (общее время ротации одного дашборда) / elem_list (количество виджетов)
var SCROLL_TIME = 15; //sec

var elem_list;
var elem_list_title;
var elementIndex = 0;

//Задержка запуска на 5 секунд - ожидание полной прогрузки страницы
//Расчет SCROLL_TIME
//Первая итерация прокрутки
setTimeout(function (){

	//Получаем коллекции элементов
	elem_list = document.getElementsByClassName("react-grid-item");
	elem_list_title = document.getElementsByClassName('widget-title');
	document.getElementsByTagName('html')[0].style.scrollBehavior = "smooth";

	//Определение времени на отображение одного виджета на дашборде
	SCROLL_TIME = ROTATION_TIME / elem_list.length; //sec

	//Переопределение ширины и высоты виджетов (масштаб по размеру видимой части окна, минус высота панели меню)
	for(let i = 0; i < elem_list.length; i++) {
		elem_list[i].style.width = window.innerWidth - 20 + "px";
		elem_list[i].style.height = window.innerHeight - document.getElementsByClassName('navbar')[0].clientHeight + "px";
		elem_list[i].style.transform = "translate(10px," + (10 * (i + 1) + parseInt(elem_list[i].style.height) * i) +"px)";
	}
	//Переопределение высоты "body"
	document.body.style.height = (elem_list[0].getBoundingClientRect().height * elem_list.length) + (10 * elem_list.length) + 150 + "px";

	//console.log("scrolling to: "+elem_list_title[elementIndex].innerText+", "+"elementIndex: "+elementIndex+" of "+(elem_list.length-1));

	//Прокручиваем страницу (ось Х) на высоту текущей прокрутки + положение 0-го элемента относительно верхней границы видимой области - высота панели меню
	window.scrollTo(0, document.documentElement.scrollTop + elem_list[elementIndex].getBoundingClientRect().y - document.getElementsByClassName('navbar')[0].clientHeight);
	elementIndex++;

}, SCROLL_TIME/2*1000);

//Последующие итерации прокрутки
var viewId = setTimeout( function elementView() {

	//если конец коллекции
	if(elementIndex === elem_list.length) {
		elementIndex = 0;
		//console.log("elementIndex = 0");
	}

	//console.log("scrolling to: "+elem_list_title[elementIndex].innerText+", "+"elementIndex: "+elementIndex+" of "+(elem_list.length-1));

	//Прокручиваем страницу (ось Х) на высоту текущей прокрутки + положение i-го элемента относительно верхней границы видимой области - высота панели меню
	window.scrollTo(0, document.documentElement.scrollTop + elem_list[elementIndex].getBoundingClientRect().y - document.getElementsByClassName('navbar')[0].clientHeight);

	elementIndex++;

	viewId = setTimeout(elementView, SCROLL_TIME*1000);
}, SCROLL_TIME*1000);


function getCookie(name) {
    var matches = document.cookie.match( new RegExp(
        "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ));
    return matches ? decodeURIComponent(matches[1]) : undefined;
}


