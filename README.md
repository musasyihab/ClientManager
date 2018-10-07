#  ClientManager
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat)](http://standardjs.com/)

* This app built using React Native for managing client data containing name, email address, phone number, and also whatsapp number. User can create, update, or delete client data. User can also view their client data and initiate phone call or whatsapp chat.

## Library Used

* For React Native boilerplate, I use [Ignite](https://github.com/infinitered/ignite)
* For Image Picker library, I use [React Native Image Picker](https://github.com/react-community/react-native-image-picker)
* For Toast component, I use [React Native Simple Toast](https://github.com/vonovak/react-native-simple-toast)

## How to Run App

1. cd to the repo
2. Run Build for either OS
  * for iOS
    * run `react-native run-ios`
  * for Android
    * Run Genymotion
    * run `react-native run-android`

## Standard Compliant

[![js-standard-style](https://cdn.rawgit.com/feross/standard/master/badge.svg)](https://github.com/feross/standard)
This project adheres to Standard.  Our CI enforces this, so we suggest you enable linting to keep your project compliant during development.

**To Lint on Commit**

This is implemented using [husky](https://github.com/typicode/husky). There is no additional setup needed.

**Bypass Lint**

If you have to bypass lint for a special commit that you will come back and clean (pushing something to a branch etc.) then you can bypass git hooks with adding `--no-verify` to your commit command.

**Understanding Linting Errors**

The linting rules are from JS Standard and React-Standard.  [Regular JS errors can be found with descriptions here](http://eslint.org/docs/rules/), while [React errors and descriptions can be found here](https://github.com/yannickcr/eslint-plugin-react).

