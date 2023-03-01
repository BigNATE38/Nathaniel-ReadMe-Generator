// TODO: Include packages needed for this application
const inquirer = require("inquirer");
const generateMarkdown = require("./utilis/generateMarkdown");
const fs = require("fs");


// TODO: Create an array of questions for user input
const questions = () => {
    return inquirer.prompt([
        {
            type: "input",
            name: "github",
            message: "Please enter your Github Username (Required)",
            validate: (inputGit) => {
                if (inputGit) {
                    return true;
                } else {
                    console.log("Please enter your Github username!");
                    return false;
                }
            },
        },
        {
            type: "input",
            name: "title",
            message: "Please enter project title (Required)",
            validate: (inputTitle) => {
                if (inputTitle) {
                    return true;
                } else {
                    console.log("Try Again. Please enter your project title!")
                    return false;
                }
            },
        },
        {
            type: "input",
            name: "description",
            message: "Please enter a description of your project (Required)",
            validate: (describeProject) => {
                if (describeProject) {
                    return true;
                } else {
                    console.log("Please enter project description!");
                    return false;
                }
            },
        },
        {
            type: "checkbox",
            name: "languages",
            message: "What did you build the project with? (Check all that apply)",
            choices: [
                "Javascript",
                "HTML",
                "CSS",
                "ES6",
                "jQuery",
                "Bootstrap",
                "Node.js",
            ],
        },
        {
            type: "list",
            name: "license",
            message: "Please select a license for the project (Required)",
            choices: ["MIT", "APACHE(2.0)", "GPL(3.0)", "BSD(3)", "MPL(2.0)", "CDDL(1.0)", "EPL(2.0)", "None"],
            validate: (licenseProject) => {
                if (licenseProject) {
                    return true;
                } else {
                    console.log("Please pick a project license type!");
                    return false;
                }
            },
        },
        {
            type: "input",
            name: "test",
            message: "What command(s) should be run to run tests?",
            default: "npm test"
        },
        {
            type: "input",
            name: "usage",
            message: "What should the user know about using the repo?",
        },
        {
            type: "input",
            name: "website",
            message: "Please enter the project website (Required)",
            validate: (websiteProject) => {
                if (websiteProject) {
                    return true;
                } else {
                    console.log("Please enter the project website!");
                }
            },
        },
        {
            type: "input",
            name: "email",
            message: "What is your email address? (Required)",
            validate: (inputEmail) => {
                if (inputEmail) {
                    return true;
                } else {
                    console.log("Please enter email!");
                    return false;
                }
            },
        },
        {
            type: "input",
            name: "contributing",
            message: "Please enter the contributor name(s) for the project",
            validate: (namesContributor) => {
                if (namesContributor) {
                    return true;
                } else {
                    console.log("Please enter contributor names!");
                    return false;
                }
            },
        },
    ])
};

// TODO: Create a function to write README file
const writeToFile = data => {
    return new Promise((resolve, reject) => {
        fs.writeFile("./generatedREADME.md", data, err => {
            if (err) {
            reject(err);
            return;
            }

            resolve({
            ok: true,
            message: "File created!",
            });
        });
    });
};

// TODO: Create a function to initialize app
function init() {
    questions()
        .then((response) => generateMarkdown(response))

        .then((res) => {
            writeToFile(res);
            console.log("Success!!! Check out your generatedREADME.md")
        });
}

// Function call to initialize app
init();
