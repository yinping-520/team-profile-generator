const inquirer = require("inquirer");
const Manager = require("../lib/manager");
const Engineer = require("../lib/engineer")
const Intern = require("../lib/intern")
const fs = require("fs");
const prettify = require('html-prettify');
const workers = []

const writeHtml = (cardTemp) => {
  fs.writeFile("team.html", prettify(cardTemp), (err)=>{
    if (err) console,log(err)
    console.log("Success")
  })
  
}

const renderList = () => {
  let html = `<!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.0/dist/css/bootstrap.min.css" integrity="sha384-B0vP5xmATw1+K9KRQjQERJvTumQW0nPEzvF6L/Z6nronJ3oUOFUFpCjEUQouq2+l" crossorigin="anonymous">
      <title>Team Profile</title>
  </head>
  <body>
      <div class="jumbotron jumbotron-fluid bg-danger">
          <div class="container">
            <h1 class="display-4 text-center text-white font-weight-bold">My Team</h1>
          </div>
      </div>
  
      <section class="row row-cols-md-3 mx-auto justify-content-center">`

  for (let worker of workers){
    if (worker instanceof Manager){
        html += `<div class="col mb-4">
    <div class="card w-40 m-2 text-white bg-info" style="width: 18rem;">
        <div class="card-body">
            <h5 class="card-title">${worker.name}</h5>
            <h5 class="card-text">☕ Manager</h5>
        </div>
        <ul class="list-group list-group-flush m-2">
            <li class="list-group-item text-secondary">ID: ${worker.id}</li>
            <li class="list-group-item text-secondary">E-mail: <a href="mailto:${worker.email}">${worker.email}</a></li>
            <li class="list-group-item text-secondary">Office Number: ${worker.officeNumber}</li>
        </ul>
      </div>
    </div>`
    }
    if(worker instanceof Intern){
      html += `<div class="col mb-4">
    <div class="card w-40 m-2 text-white bg-info" style="width: 18rem;">
        <div class="card-body">
            <h5 class="card-title">${worker.name}</h5>
            <h5 class="card-text">🎓 Intern</h5>
        </div>
        <ul class="list-group list-group-flush m-2">
            <li class="list-group-item text-secondary">ID: ${worker.id}</li>
            <li class="list-group-item text-secondary">E-mail: <a href="mailto:${worker.email}">${worker.email}</a></li>
            <li class="list-group-item text-secondary">School; ${worker.school}</li>
        </ul>
      </div>
</div>`
    }
    if(worker instanceof Engineer){
      html += `<div class="col mb-4">
    <div class="card w-40 m-2 text-white bg-info" style="width: 18rem;">
        <div class="card-body">
            <h5 class="card-title">${worker.name}</h5>
            <h5 class="card-text">👓 Engineer</h5>
        </div>
        <ul class="list-group list-group-flush m-2">
            <li class="list-group-item text-secondary">ID: ${worker.id}</li>
            <li class="list-group-item text-secondary">E-mail: <a href="mailto:${worker.email}">${worker.email}</a></li>
            <li class="list-group-item text-secondary">GitHub: <a href="https://github.com/${worker.github}">https://github.com/${worker.github}</a></li>
        </ul>
      </div>
</div>`
    }
  }
  return html + `</section>
   
  </body>
  </html>`;
}
    

const engineerOrIntern = (role) => {
  const engineerQ = [
    {
    type: "input",
    message: `What is the engineer's name?`,
    name: "name",
    },
    {
    type: "input",
    message: `What is the engineer's ID? `,
    name: "id",
    },
    {
    type: "input",
    message: `What is the engineer's email address?`,
    name: "email",
    },
    {
    type: "input",
    message: `What is the engineer's github username?`,
    name: "github",
    }, 
  ]
  const internQ = [
    {
      type: "input",
      message: `What is the intern's name?`,
      name: "name",
    },
    {
      type: "input",
      message: `What is the intern's ID? `,
      name: "id",
    },
    {
      type: "input",
      message: `What is the intern's email address?`,
      name: "email",
    },
    {
      type: "input",
      message: `Which university did the intern graduate from?`,
      name: "university",
    },
  ]
    if(role)
      if (role === "engineer") {
        inquirer
          .prompt(engineerQ)
          .then(({name, id, email, github}) => {
            
            const engineer = new Engineer(name, id, email, github)
            
            workers.push(engineer)
            
            //const engineerTem = renderEngineerData(name, id, email, github)
            engineerOrIntern();
            checkRole()
          });
      }
      if (role === "intern") {
        inquirer
          .prompt(internQ)
          .then(({name, id, email, university}) => {
           
            const intern = new Intern(name, id, email, university)
           
            workers.push(intern)
            
            //const internTem = renderInternData(name, id, email, university)
            engineerOrIntern();
            checkRole()
          
          });
      }
    }

    const checkRole = () => {
      inquirer
        .prompt([
          {
            type: "rawlist",
            message: "What is the role of this employee?",
            choices: ["engineer", "intern", "exit"],
            name: "role",
          },
        ])
        .then(({role}) => {
          
          if (role === "engineer" || role === "intern"){
            engineerOrIntern(role)
          }else{
            process.exit
            const cardTemp = renderList()
           
            writeHtml(cardTemp)
            
          }
    })};

const init = () => {
  const questions = [
    {
      type: "input",
      message: "What is your manager's name?",
      name: "name",
    },
    {
      type: "input",
      message: "What is your manager's ID? ",
      name: "id",
    },
    {
      type: "input",
      message: "What is your manager's email address? ",
      name: "email",
    },
    {
      type: "number",
      message: "What is your manager's office number? ",
      name: "officeNumber",
    }   
  ];

  inquirer.prompt(questions).then(({ name, id, email, officeNumber }) => {
    
    const manager = new Manager(name, id, email, officeNumber);
    
    workers.push(manager)
    
    checkRole()
  });

}

init()