const express = require("express")
const bodyParser = require("body-parser")
const { spawn, exec } = require("child_process")
const shell = require("shelljs")
const program = require("commander")
const { exit } = require("process")

var secret = "password"
var repo = "some_local_repo_location"
var github_repo = "some_github_repo_address"

var project_root = "/Users/shalomfriss/Desktop/QuickCI/root"
var logs_dir = project_root + "/logs"

var fastlane_test_lane = "all_tests_lane"
program
    .version("0.0.1")
    .option("-root, --root [root]", "location of the root directory ( this will store all the repos and logs")
    .parse(process.argv)

var dirTest = shell.test("-d", project_root)
if(dirTest == false) {
    shell.mkdir(project_root)
    shell.mkdir(logs_dir)
}

//init express and define port
const app = express()
const PORT = 3000

//tell express to use body-parsers JSON parsing
app.use(bodyParser.json())

//start 
app.listen(PORT, () => console.log("Server running on port ${PORT}"))
app.use(bodyParser.json())

app.post("main_hook", (req, res) => {
    res.status(200).end()
    var test = runTests()
    console.log(test)
})

function runTests() {
    shell.cd(repo)
    shell.exec("git pull")
    shell.exec("fastlane " + fastlane_test_lane)
}
