# Project Name Athene: Open Source Wireframing Tool

Test it out at: https://athene.sstehle.com (Work in progress)

The goal of this project is to create an open source wireframing tool. As a developer I have to create wireframes from time to time and there are great commercial tool in the market. But most of them cost more than a full Office suite per month. I think there is a need for a good and free solutions.

![Version 01](/screenshots/v1.png?raw=true "V1")

## What is the tech stack?

* Ant design (https://ant.design/)
* Canvas
* React
* Redux
* Paper.js (http://paperjs.org/)
* Typescript
* Webpack

## How to run the application?

Just install node.js and run the following commands in your terminal:

    npm i
    npm rebuild node-sass --force
    npm start

Go to `http://localhost:3000`

## How to build the application?

    npm i
    npm rebuild node-sass --force
    npm run build

Copy the files from the `build` folder to your webserver.

## What are the milestones?

* **0.7**: First working editor.
* **0.8**: Manage pages within a project with background pages. 
* **0.9**: Save and load files using electron API and add usability features like recent projects.
* **1.0**: Finalize the version and make small improvements and bugfixes.
* **1.1**: Presentation mode.
* **1.2**: Dark theme
* **1.3**: Link UI elements to external sources or other pages.

## How can I contribute?

The issues that are easy to start with are marked. Write a comment to the issue if you want to know more.

Read the [Readme about shapes](src/wireframes/shapes/README.md) to understand how to create new shapes.

## Why another open source tool? There is pencil

There is a great open source tool: http://pencil.evolus.vn/

We see some issue with this project:

1. It uses outdated technology and therefore it is hard to contribute.
2. It is mainly maintained by a small company and few people.
3. It is missing advanced features.
4. The UI design is really oldschool ;)

## Contributors

* Sebastian Stehle (https://github.com/SebastianStehle, https://sstehle.com, https://squidex.io)