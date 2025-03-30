import navigatorImage from './../../src/images/navigator.png'
import ekitiaImage from './../../src/images/ekitia.png'
import topImage from './../../src/images/nounoutop.png'
import emitSite from './../../src/images/emit.png'

document.querySelector('#achievement').innerHTML = `
    <div class="container">
        <h2 class="display-6 text-center title">Mes réalisations</h2>
        <div class="container d-flex justify-content-around flex-wrap mt-4">
            <div class="card text-center mt-4" style="width: 18rem;">
                <div class="card-image">
                    <img src="${navigatorImage}" class="card-img-top" alt="...">
                </div>
                <div class="card-body">
                    <h5 class="card-title">Développement du site Navigateur des Tiers-Lieux</h5>
                    <p class="card-text">De chez Communecter (Open Atlas)</p>
                    <div class="my-2">
                        <span class="badge my-2 text-bg-primary">Yii</span>
                        <span class="badge my-2 text-bg-secondary">Javascript</span>
                        <span class="badge my-2 text-bg-info">jQuery</span>
                        <span class="badge my-2 text-bg-dark">MongoDB</span>
                    </div>
                    <a target="_blank" href="https://navigateur.tiers-lieux.org/" class="btn btn-outline-dark">Voir le site</a>
                </div>
            </div>

            <div class="card text-center mt-4" style="width: 18rem;">
                <div class="card-image">
                    <img src="${ekitiaImage}" class="card-img-top" alt="...">
                </div>
                <div class="card-body">
                    <h5 class="card-title">Développement du site Ekisphère</h5>
                    <p class="card-text">De chez Communecter (Open Atlas)</p>
                    <div class="my-2">
                        <span class="badge my-2 text-bg-primary">Yii</span>
                        <span class="badge my-2 text-bg-secondary">Javascript</span>
                        <span class="badge my-2 text-bg-info">jQuery</span>
                        <span class="badge my-2 text-bg-dark">MongoDB</span>
                    </div>
                    <a target="_blank" href="https://www.communecter.org/costum/co/index/slug/ekisphere" class="btn btn-outline-dark">Voir le site</a>
                </div>
            </div>

            <div class="card mt-4 text-center" style="width: 18rem;">
                <div class="card-image">
                    <img src="${topImage}" class="card-img-top" alt="...">
                </div>
                <div class="card-body">
                    <h5 class="card-title">Maintenance des sites de top-webgroup</h5>
                    <p class="card-text">De chez Ineland LTD</p>
                    <div class="my-2">
                        <span class="badge my-2 text-bg-primary">Ruby on Rails</span>
                        <span class="badge my-2 text-bg-secondary">Stimulus/Vue</span>
                        <span class="badge my-2 text-bg-info">Turbo</span>
                        <span class="badge my-2 text-bg-dark">MySql</span>
                    </div>
                    <a target="_blank" href="https://top-webgroup.com/" class="btn btn-outline-dark">Voir le site</a>
                </div>
            </div>

            <div class="card mt-4 text-center" style="width: 18rem;">
                <div class="card-image">
                    <img src="${emitSite}" class="card-img-top" alt="...">
                </div>
                <div class="card-body">
                    <h5 class="card-title">Contribution au développement du site de mon école</h5>
                    <p class="card-text">De chez EMIT</p>
                    <div class="my-2">
                        <span class="badge my-2 text-bg-primary">Strapi</span>
                        <span class="badge my-2 text-bg-secondary">Drag and Drop</span>
                        <span class="badge my-2 text-bg-info">Javascript</span>
                        <span class="badge my-2 text-bg-dark">PostgreSQL</span>
                    </div>
                    <a target="_blank" href="https://www.emit.mg/accueil" class="btn btn-outline-dark">Voir le site</a>
                </div>
            </div>
        </div>
    </div>
`