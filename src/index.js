"use strict";

import '@babel/polyfill';
import 'nodelist-foreach-polyfill';
import elementClosest from 'element-closest';
elementClosest(window);
import 'formdata-polyfill';
import 'es6-promise';
import 'fetch-polyfill';

import counterTimer from './modules/counterTimer';
import toggleMenu from './modules/toggleMenu';
import togglePopUp from './modules/togglePopUp';
import scrollToSection from './modules/scrollToSection';
import tabs from './modules/tabs';
import slider from './modules/slider';
import changeImage from './modules/changeImage';
import calc from './modules/calc';
import valid from './modules/valid';
import sendForm from './modules/sendForm';

//Timer
counterTimer("21 october 2020");
//Menu
toggleMenu();
//popup
togglePopUp();
// scrolling through menu items
scrollToSection();
//Tabs
tabs();
//Slider
slider();
// Our team section (data attributes)
changeImage();
// calculator
calc(100);
// Validation
valid();
// Send-ajax-form
sendForm();