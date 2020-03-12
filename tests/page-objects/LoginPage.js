/*******************************************************************************
 * Licensed Materials - Property of IBM
 * (c) Copyright IBM Corporation 2017, 2019. All Rights Reserved.
 *
 * Note to U.S. Government Users Restricted Rights:
 * Use, duplication or disclosure restricted by GSA ADP Schedule
 * Contract with IBM Corp.
 *******************************************************************************/

const config = require("../../config");

module.exports = {
  url: function() {
    return `${this.api.launchUrl}${config.get("contextPath")}`;
  },
  elements: {
    header: ".app-header"
  },
  commands: [
    {
      inputUsername,
      inputPassword,
      submit,
      authenticate,
      waitForLoginSuccess,
      waitForLoginPageLoad
    }
  ]
};

// Detect if we are OCP login (default) or ICP login for backwards compatibility (temp)
function authenticate(user, password) {
  let loginPage = "html.login-pf";
  let userNameField = "#inputUsername";
  let passwordField = "#inputPassword";
  let submitBtn = 'button[type="submit"]';
  this.api.element("css selector", loginPage, res => {
    if (res.value !== 0) {
      // OCP
      console.log("Logging into OCP");
    } else {
      // ICP
      console.log("Logging into ICP");
      loginPage = ".login-container";
      userNameField = "#username";
      passwordField = "#password";
      submitBtn = 'button[name="loginButton"]';
    }
    this.waitForLoginPageLoad(loginPage);
    this.waitForElementPresent(userNameField);
    this.inputUsername(user, userNameField);
    this.inputPassword(password, passwordField);
    this.submit(submitBtn);
    this.waitForLoginSuccess(loginPage);
  });
}

function inputUsername(user, userNameField) {
  this.waitForElementPresent(userNameField).setValue(
    userNameField,
    user || process.env.K8S_CLUSTER_USER
  );
}

function inputPassword(password, passwordField) {
  this.waitForElementPresent(passwordField).setValue(
    passwordField,
    password || process.env.K8S_CLUSTER_PASSWORD
  );
}

function submit(submitBtn) {
  this.waitForElementPresent(submitBtn).press(submitBtn);
}

function waitForLoginSuccess() {
  this.waitForElementPresent("@header", 20000);
}

function waitForLoginPageLoad(loginPage) {
  // const { browserName } = this.api.options.desiredCapabilities
  // if (browserName === 'firefox') {
  //   this.api.element('css selector', '#errorPageContainer', res => {
  //     if (res.status !== -1) {
  //       this.waitForElementPresent('#advancedButton').press('#advancedButton')
  //       this.waitForElementPresent('#exceptionDialogButton').click('#exceptionDialogButton')
  //       this.waitForElementNotPresent('#errorPageContainer')
  //     }
  //   })
  // }

  // if (browserName === 'chrome') {
  //   this.api.element('css selector', '.ssl', res => {
  //     if (res.status !== -1) {
  //       this.waitForElementPresent('#details-button').press('#details-button')
  //       this.waitForElementPresent('#proceed-link').click('#proceed-link')
  //       this.waitForElementNotPresent('#body.ssl')
  //     }
  //   })
  // }

  // if (browserName === 'safari') {
  //   this.api.element('css selector', '#alert', res => {
  //     if (res.status !== -1) {
  //       this.waitForElementPresent('#detailsButton').press('#detailsButton')
  //       this.waitForElementPresent('#detailsText p:last-child a:last-child').press('#detailsText p:last-child a:last-child')
  //       this.acceptAlert() // this is causing issues
  //       this.waitForElementNotPresent('#alert')
  //     }
  //   })
  // }

  this.waitForElementPresent(loginPage, 20000);
}
