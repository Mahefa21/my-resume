import '../handlers/activeNavbar'
import crLogo from './../../src/images/logos/cr-logo.png'

document.querySelector('#navbar').innerHTML = `
    <nav class="navbar navbar-expand-lg fixed-top">
        <div class="container-fluid">
            <a class="navbar-brand" href="#"><img width="37px" src="${crLogo}"></a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse justify-content-end" id="navbarSupportedContent">
                <ul class="navbar-nav mx-5 mb-2 mb-lg-0">
                    <li class="nav-item">
                        <a class="nav-link active" aria-current="page" href="#banner">Accueil</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" aria-current="page" href="#about">À propos</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#experience">Mes expériences</a>
                    </li>   
                    <li class="nav-item">
                        <a class="nav-link" href="#skill">Mes compétences</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#achievement">Mes réalisations</a>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
`