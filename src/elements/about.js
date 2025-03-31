import charlyImage from './../../src/assets/images/charly.png'
import linkedinImage from './../../src/assets/images/logos/linkedin.png'
import facebookImage from './../../src/assets/images/logos/facebook.png'

import whatsappImage from './../../src/assets/images/logos/whatsapp.png'
import mailImage from './../../src/assets/images/logos/mail.png'


document.querySelector('#about').innerHTML = `
    <div class="m-5 ">
        <div class="row">
            <div class="col-md-4 text-center d-flex justify-content-center align-items-center">
                <img class="profile" src="${charlyImage}" alt="">
            </div>
            <div class="col-md-7 my-2 text-center">
              <div class="about-text">
                <h2 class="display-5 title my-4">À propos</h2>
                <p class="fs-5"> L'informatique n'est pas simplement un métier pour moi, c'est une véritable passion.
                Je considère chaque projet comme une œuvre à part entière, où l'innovation et la créativité se rencontrent pour donner vie à des solutions uniques.
                <br><br>
                Que ce soit pour le développement d'un site web, la conception d'une application ou la mise en place d'une architecture technique complexe, je mets un point d'honneur à travailler avec soin, rigueur et professionnalisme. </p>
                <div class="mt-5">
                    <a class="mt-5 mx-2" target="_blank" href="https://wa.me/261343926527"><img class="logo" src="${whatsappImage}" alt=""></a>
                    <a class="mt-5 mx-2" target="_blank" href="https://linkedin.com/in/raoelimahefa-charly-31759a239"><img class="logo" src="${linkedinImage}" alt=""></a>
                    <a class="mt-5 mx-2" target="_blank" href="https://facebook.com/raoel.mahefa"><img class="logo" src="${facebookImage}" alt=""></a>
                    <a class="mt-5 mx-2" href="mailto:raoelimahefacharly@gmail.com"><img class="logo" src="${mailImage}" alt=""></a>
                </div>
              </div>
            </div>
        </div>
    </div>
`