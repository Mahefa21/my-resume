import cDown from './../../src/assets/images/illustrations/chevron-down.png'
import charlyCvPdf from './../../src/assets/documents/CV-RAOELIMAHEFA-Charly.pdf'

document.querySelector('#banner').innerHTML = `
    <div class="container text-center text-lg-start">
        <h4>Bonjour, je suis<h4>
        <h4 class="display-4">RAOELIMAHEFA Charly</h4>
        <h5>Développeur web Full Stack Ruby/PHP</h5>
        <a href="${charlyCvPdf}" class="btn btn-outline-dark p-2 my-2"> Telecharger mon CV</a>
        <a class="btn btn-outline-dark p-2 ms-2 my-2" href="mailto:raoelimahefacharly@gmail.com" > Intéressé(e) par mon profil ?</a>
    </div>
    <div class="container-fluid text-center c-btn">
      <a href="#about">
        <img width="40" src="${cDown}">
      </a>
    </div>
`