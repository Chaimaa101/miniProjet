const navBar = document.createElement('nav')
const body = document.querySelector('body')
navBar.innerHTML =``
navBar.innerHTML =`
<h1 > <a href="home.html"> SimplonCode &lt;/&gt;</a></h1>
  <div class="items">
            <ul >
            <li><a href="home.html">Home</a></li>
            <li><a href="#about">About Us</a></li>
            <li><a href="contact.html">Contact</a></li>
            <li><a href="programs.html">Programs</a></li>
        </ul>
        </div>
`
body.prepend(navBar)

const btnShowForm = document.getElementById("show-form");
btnShowForm.addEventListener('click', () => {
  const formAjout = document.getElementById("program-form")
  if (formAjout.style.display === "block") {
    formAjout.style.display = "none"; 
  } else {
    formAjout.style.display = "block"; 
  }
});

const programs_container = document.getElementById("programs-container")
const affichePrograms = () => {
  programs_container.innerHTML = ``;  

  axios.get(`http://localhost:4000/programs`)
    .then(res => {
      res.data.forEach(program => {
        const card = document.createElement("div");
        card.classList.add("value-card");

   const skillsList = Array.isArray(program.skills) 
  ? program.skills.map(comp => `<li>${comp}</li>`).join("")
  : "<li>Aucune compétence disponible</li>";
        card.innerHTML = `
          <h3>${program.title}</h3>
          <p>${program.desc}</p>
          <span>${program.duration}</span> <br>
          <span> Les compétences </span>
          <ul>
            ${skillsList}
          </ul>
          <button class="delete" onClick="supprimerProjet('${program.id}')">🗑️</button>
        `;
        programs_container.appendChild(card);
      });
    })
    .catch(err => {
      console.error(err);
    });
};

affichePrograms();


const form = document.getElementById('program-form');
form.addEventListener("submit", function (event) {
  event.preventDefault(); 

   const title = document.getElementById("title").value.trim();
  const description = document.getElementById("description").value.trim();
  const duration = document.getElementById("duration").value.trim();
  const skillsInput = document.getElementById("skills").value.trim();
  const skillsArray = skillsInput.split(",").map(skill => skill.trim());

  // Example: send to server with axios
  axios.post("http://localhost:4000/programs", {
    title: title,
    desc: description,
    duration: duration,
    skills: skillsArray
  })
  .then(res => {
    form.rese
   affichePrograms()
  })
  .catch(err => {
    console.error("Error adding program:", err);
  });
});
