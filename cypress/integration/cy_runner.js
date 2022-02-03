/// <reference types="cypress" />

const cypress = require('cypress');

cypress
  .run({
    browser: 'electron',
    spec: 'cypress//integration//firstPromoter.spec.js',
  })
  .then((result) => {
    if (result.totalFailed > 0) {
      console.log(result.totalFailed);
      process.exit(1);
    }

    // print test results and exit
    // with the number of failed tests as exit code
    process.exit(result.totalFailed);
  })
  .catch((err) => {
    console.error('errors: ', err);
    process.exit(1);
  });
