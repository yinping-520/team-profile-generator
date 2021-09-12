const inquirer = require("inquirer");
const Manager = require("../lib/manager");


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
  },
];

const renderInternData = (name, id, email, university) => {
    return `<div class="col mb-4">
    <div class="card w-40 m-2 text-white bg-info" style="width: 18rem;">
        <div class="card-body">
            <h5 class="card-title">${name}</h5>
            <h5 class="card-text">Intern</h5>
        </div>
        <ul class="list-group list-group-flush m-2">
            <li class="list-group-item">${id}</li>
            <li class="list-group-item">${email}</li>
            <li class="list-group-item">${university}</li>
        </ul>
      </div>
</div>`
}

const renderEngineerData = (name, id, email, github) => {
    return `<div class="col mb-4">
    <div class="card w-40 m-2 text-white bg-info" style="width: 18rem;">
        <div class="card-body">
            <h5 class="card-title">${name}</h5>
            <h5 class="card-text">Engineer</h5>
        </div>
        <ul class="list-group list-group-flush m-2">
            <li class="list-group-item">${id}</li>
            <li class="list-group-item">${email}</li>
            <li class="list-group-item">${github}</li>
        </ul>
      </div>
</div>`

}

const renderManager = (name, id, email, officeNumber) => {
  return `<div class="col mb-4">
    <div class="card w-40 m-2 text-white bg-info" style="width: 18rem;">
        <div class="card-body">
            <h5 class="card-title">${name}</h5>
            <h5 class="card-text">Manager</h5>
        </div>
        <ul class="list-group list-group-flush m-2">
            <li class="list-group-item">${id}</li>
            <li class="list-group-item">${email}</li>
            <li class="list-group-item">${officeNumber}</li>
        </ul>
      </div>
</div>
`
};


const engineerOrIntern = () => {
  inquirer
    .prompt([
      {
        type: "rawlist",
        message: "What is the role of this employee?",
        choices: ["engineer", "intern", "exit"],
        name: "role",
      },
    ])
    .then((role) => {
      console.log(role);
      //renderRole()
      if (role.role === "engineer") {
        inquirer
          .prompt([
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
          ])
          .then(({name, id, email, github}) => {
            console.log(name, id, email, github);
            renderEngineerData(name, id, email, github)
            engineerOrIntern();
            engineerOrIntern();
            engineerOrIntern();
            engineerOrIntern();
            engineerOrIntern();
          });
      }
      if (role.role === "intern") {
        inquirer
          .prompt([
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
          ])
          .then(({name, id, email, university}) => {
            console.log(name, id, email, university);
            renderInternData(name, id, email, university)
            engineerOrIntern();
            engineerOrIntern();
            engineerOrIntern();
            engineerOrIntern();
            engineerOrIntern();
            engineerOrIntern();
          });
      }
      if (role.role === "exit") {
        return;
      }
    });
};

inquirer.prompt(questions).then(({ name, id, email, officeNumber }) => {
  console.log(name, id, email, officeNumber);
  //renderManager(name, id, email, officeNumber);
  engineerOrIntern();
});
