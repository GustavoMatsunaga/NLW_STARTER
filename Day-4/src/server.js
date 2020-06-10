const express = require("express");
const server = express();

// Public folder config
server.use(express.static("public"))

// Using Engine Templates (Nunjucks)
const nuncjucks = require("nunjucks")
nuncjucks.configure("src/views", {
    express: server,
    noCache: true
})


// Config the paths for the aplication
// Home page
// req : requisition 
// res : response
server.get("/", (req, res) => {
    return res.render("index.html", {title: "Um Título"});

})

server.get("/create-point", (req, res) => {
    return res.render("create-point.html");
})

server.get("/search", (req, res) => {
    return res.render("search-results.html");
})


// Turn on Server
server.listen(3000);