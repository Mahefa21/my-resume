import $ from 'jquery';
import printJS from 'print-js'


$(document).ready(function() {
    $('.print-cv').on('click', function() {
        printJS('public/documents/CV-RAOELIMAHEFA-Charly.pdf');
    })
})