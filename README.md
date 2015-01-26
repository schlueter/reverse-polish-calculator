# Reverse Polish Notation Calculator

In the language of your choice, please create a calculator capable of processing RPC with the following rules:

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

This is an an implementation of a Reverse Polish Notation Calculator in an  Angular Directive.

## Setup

This application is managed by [Node.js][node] [brocolli][brocolli] and can be setup locally by cloning this repository and running `npm install`. This command will download the Node.js dependencies and run `bower install && npm install -g broccoli-cli ` to download the application dependencies and globally install the broccoli-cli.

## Running the development application

The development application can be run with `broccoli serve`. This command will serve the application at http://localhost:4200 and rebuild it when the source files are modified.

## Tests

Tests can be run with Node.js and Mocha by running `npm test`
