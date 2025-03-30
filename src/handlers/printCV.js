import $ from 'jquery';
import printJS from 'print-js'
import charlyCvPdf from './../../src/assets/documents/CV-RAOELIMAHEFA-Charly.pdf'


$(document).ready(function() {
    $('.print-cv').on('click', function() {
        printJS(charlyCvPdf);
    })
})