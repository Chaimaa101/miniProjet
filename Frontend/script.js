const navBar = document.createElement('nav')
const body = document.querySelector('body')
navBar.innerHTML = ``
navBar.innerHTML = `
<h1 > <a href="home.html">  &lt;&gt; SimplonCode <i class="fa-solid fa-code"></i></a></h1>
  <div class="items">
            <ul >
            <li><a href="home.html"><i class="fa-solid fa-house"></i> Home</a></li>
            <li><a href="programs.html"><i class="fa-solid fa-list-ul"></i> Programs</a></li>
            <li><a href="contact.html"><i class="fa-solid fa-envelope"></i> Contact</a></li>
            <li><a href="#about"></i> About Us</a></li>
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
                    : "<li>No skills available</li>";

                card.innerHTML = `
                    <h3>${program.title}</h3>
                    <p>${program.desc}</p>
                    <span>Duration: ${program.duration}</span> <br>
                    <span>Skills:</span>
                    <ul class="skills">
                        ${skillsList}
                    </ul>
                    <button class="delete" onClick="supprimerProgram('${program.id}')"><i class="fa-solid fa-trash"></i></button>
                `;
                programs_container.prepend(card);

            });
        })
        .catch(err => {
            console.error(err);
        });
};


supprimerProgram = function (id) {
    if (confirm("Are you sure you want to delete this program? This action cannot be undone.")) {
        axios.delete(`http://localhost:4000/programs/${id}`)
            .then(res => {
                affichePrograms();
            })
            .catch(err => {
                console.error(err);
            });
    }
}

const form = document.getElementById('program-form');
form.addEventListener("submit", function (event) {
    event.preventDefault();

    const title = document.getElementById("title").value.trim();
    const description = document.getElementById("description").value.trim();
    const duration = document.getElementById("duration").value.trim();
    const skillsInput = document.getElementById("skills").value.trim();
    const skillsArray = skillsInput.split(",").map(skill => skill.trim());

    axios.post("http://localhost:4000/programs", {
        title: title,
        desc: description,
        duration: duration,
        skills: skillsArray
    })
        .then(res => {
            form.reset();
            document.getElementById("program-form").style.display = "none";
            affichePrograms();
            alert("Program added successfully!");
        })
        .catch(err => {
            console.error(err);
        });
});

affichePrograms();