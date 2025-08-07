const navBar = document.createElement('nav')
const body = document.querySelector('body')
navBar.innerHTML =``
navBar.innerHTML =`
<h1 > <a href="home.html"><span class="logo1">Simplon</span><span class="logo2">Code</span></a></h1>
  <div class="items">
            <ul >
            <li><a href="home.html">Accueil</a></li>
            <li><a href="home.html">A propos</a></li>
            <li><a href="contact.html">Contact</a></li>
            <li><a href="programs.html">Programmes</a></li>
        </ul>
        </div>
`
body.prepend(navBar)


