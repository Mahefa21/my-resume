import laptopImage from './../../src/assets/images/logos/laptop.png'
import tropheeImage from './../../src/assets/images/logos/trophee.png'
import diplomImage from './../../src/assets/images/logos/diplom.png'

document.querySelector('#experience').innerHTML = `
  <div class="container mb-5">
      <div class="row">
          <div class="col-12 col-lg-4 pb-4 pb-md-none pe-5 text-center">
              <h3 class="display-6 title">EXPÉRIENCES PROFESSIONNELLES</h3>
          </div>
          <div class="col-12 col-lg-8 px-5 exp-content">
              <div class="exp-logo-container d-none d-lg-flex " style="top: 0px;">
                  <img class="exp-logo" src="${laptopImage}">
              </div>
              <div class="mx-4">
                  <h5><b>Mars 2024 - Mars 2025 -> Top-Webgroup</b> (Remote - Maurice)</h5>
                  <ul class="fs-5">
                      <li>Développement et optimisation d’une plateforme avec Ruby on Rails, JavaScript: Vue/Stimulus, Turbo et MySQL.</li>
                      <li>Amélioration des performances, debugging et refactoring du code.</li>
                      <li>Intégration de nouvelles fonctionnalités et mise en place de tests unitaires.</li>
                  </ul>
              </div>
              <div class="mt-3 mx-4">
                  <h5><b>Juin 2022 - Février 2024 -> Open Atlas</b> (Remote - La Réunion)</h5>
                  <ul class="fs-5">
                      <li>Développement du site web Communecter en PHP (Yii), JavaScript/jQuery et MongoDB.</li>
                      <li>Amélioration UI/UX et ajout de nouvelles fonctionnalités.</li>
                      <li>Debugging, refactoring et recherche de solutions d’optimisation.</li>
                  </ul>
              </div>
          </div>
      </div>
      <div class="row">
          <div class="col-12 col-lg-4 pe-5 py-4 text-center">
              <h3 class="display-6 title">Formations et diplômes</h3>
          </div>
          <div class="col-12 col-lg-8 px-5 py-4 exp-content">
              <div class="exp-logo-container d-none d-lg-flex ">
                  <img class="exp-logo" src="${diplomImage}">
              </div>
              <div class="mx-4">
                  <h5><b>2020 - 2023 -> Master 2 - Modélisation et Ingénierie Informatique (M2I)</b></h5>
                  <div class="ms-2">
                      <p>École de Management et d’Innovation Technologique (EMIT) / Université de Fianarantsoa</p>
                  </div>
              </div>
              <div class="mt-3 mx-4">
                  <h5><b>2017 - 2020 -> Licence - Développement d’Application Intranet et Internet (DA2I)</b></h5>
                  <div class="ms-2">
                      <p>École de Management et d’Innovation Technologique (EMIT) / Université de Fianarantsoa</p>
                  </div>
              </div>
              <div class="mt-3 mx-4">
                  <h5><b>2016 - 2017 -> Baccalauréat Scientifique (Série C)</b></h5>
                  <div class="ms-2">
                      <p>Lycée Saint François Xavier Antanimena, Antananarivo</p>
                  </div>
              </div>
          </div>
      </div>
      <div class="row">
          <div class="col-12 col-lg-4 pe-5 py-4 text-center">
              <h3 class="display-6 title">Prix obtenus</h3>
          </div>
          <div class="col-12 col-lg-8 px-5 py-4 exp-content">
              <div class="exp-logo-container d-none d-lg-flex ">
                  <img class="exp-logo" src="${tropheeImage}">
              </div>
              <div class="mx-4">
                  <h5><b>2023 -> 1èr place EMIHACK</b> <a target="_blank" href="https://www.facebook.com/photo/?fbid=205224772104396&set=pcb.205225922104281"><i class="mx-2 fa fa-link"></i></a></h5>
                  <div class="ms-2">
                      <p class="m-0">hackathon interne au sein de l'Ecole de Management et d'Innovation Technologique (EMIT), j'etais dans l'equipe "NET-BUILDER".</b></p>
                      <p class="m-0"><b>Thème :</b> Création d'un site de gestion pour la vente de vin.</p>
                  </div>
              </div>
              <div class="mt-3 mx-4">
                  <h5><b>2022 -> 3ème place hackathon inter-universitaire</b> <a target="_blank" href="https://www.facebook.com/photo/?fbid=1098813744010976&set=pcb.1098817400677277"><i class="mx-2 fa fa-link"></i></a></h5>
                  <div class="ms-2">
                      <p class="m-0">Organiser par TechZara, j'etais dans l'equipe 'KAODY-BUILDER'.</b></p>
                      <p class="m-0"><b>Thème :</b> Développement d’un outil de partage de fichiers.</p>
                  </div>
              </div>
          </div>
      </div>
  </div>
  <div class="container text-center mt-5">
    <p>Intéressé(e) par mon profil ? <a class="btn btn-secondary fw-bold p-2" href="mailto:raoelimahefacharly@gmail.com" >Entrons en contact !</a></p>
  </div>
`