# Reverse Polish Notation Calculator

## Requirements

1) It can parse variable sized reverse polish notation inputs
2) It can perform the 4 basic operators (addition, subtraction, multiplication, division)
3) It will spit back the result of the input
4) It can handle malformed RPC strings
5) Use this as an opportunity to show off your talents in structure code and your knowledge of data structures
6) Please provide instructions to run the application

## Examples

    (2 3 + 5 + 10 -) = 0
    (2 2 2 * * 3 +) = 11

## Implementation

This is an implementation of a Reverse Polish Notation Calculator as an  Angular Directive. Once built with broccoli, the result is a fully minified javascript application, with associated css built from sass. The angular templates are added directly to the template cache rather than being loaded by ajax calls.

## Setup

This application is managed by [Node.js][node] [broccoli][broccoli] and can be setup locally by cloning this repository and running `npm install`. This command will download the Node.js dependencies and run `bower install && npm install -g broccoli-cli ` to download the application dependencies and globally install the broccoli-cli.

## Running the development application

The development application can be run with `broccoli serve`. This command will serve the application at http://localhost:4200 and rebuild it when the source files are modified.

## Building a deployable application

To build the application for development, `npm run build` . This will use broccoli to build the application to the *build* folder for inspection during development. 

For a production quality build, use `npm run build-dist`. This will build a fully uglified version of the application into *dist/*. The contents of that folder may then be served as static web content to serve the application.

## Tests

Tests can be run with [Node.js][node], [Karma][karma] and [Protractor][protractor] by running `npm test`

[node]: http://nodejs.org/
[broccoli]: https://github.com/broccolijs/broccoli
[karma]: http://karma-runner.github.io/
[protractor]: http://angular.github.io/protractor/
