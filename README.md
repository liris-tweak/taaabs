# taaabs
Interactive visualisation of traces

## Developpers infos:
This project use `gulp` as Task-Runner/build tool, `npm` and `bower` for dependency management, and a lot of thingss. 

Please be sure to have node, npm, and grunt installed on your operating system. node and npm should be installed with your distribution package manager (apt-get, yum, pacman [...]) if possible and if the version packaged for your distribution is the actual stable Node.js version. If not, no problem, you can download and install node (since v0.12, npm is packaged inside node, so you don't need to install it separatly) here.

Assuming now you have node, npm, grunt properly installed.

Then, install gulp, as a global executable.
```[sudo] npm install -g gulp```

Then, you must fetch the developers dependencies of the project:
```npm install -d```

And now the client-side dependencies:
```bower install```

#### Build
`gulp`

### Run the simple webserver
`gulp simpleserver`

Then open `http://localhost:8080/dist/` in your favorite web browser

### Run the webserver with livereload and some 'bells and whistles'
If you are not sure to need this one, use the simpleserver instead.

`gulp serve`
Then open `http://localhost:3000/` in your favorite web browser
