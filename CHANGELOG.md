#### 0.0.17 (2016-9-5)

##### Documentation Changes

* **readme:**
  * Update import. ([7406f96d](https://github.com/AncientSouls/Graph/commit/7406f96d96769feb63a6a45d3fc064ae1bd247af))
  * Fix readme and logic ([092920c8](https://github.com/AncientSouls/Graph/commit/092920c8e004773996a4bfb4350b256d66d7f145))
  * new syntax fix ([c2c53f5a](https://github.com/AncientSouls/Graph/commit/c2c53f5ac16b21f1d35906aef9ffe9dae8e2f3e5))
  * new beautifuls ([ad11882c](https://github.com/AncientSouls/Graph/commit/ad11882c9ecd4ae7e7ff2f5600f8c03425f3c91f))
  * little console.log fix ([7490e13d](https://github.com/AncientSouls/Graph/commit/7490e13d081764965f508353ec16e9c02ad86bb0))
  * new format for code and comments ([8ebebed3](https://github.com/AncientSouls/Graph/commit/8ebebed35690e18e9e1f90eb6b9f09a93a6d7126))
* **jsdoc:**
  * Import description. ([36500b82](https://github.com/AncientSouls/Graph/commit/36500b82ce3eb3ec544409c14523e90f9893aab2))
  * ObjectGraph is inherited class. ([d9ca0859](https://github.com/AncientSouls/Graph/commit/d9ca08592226dcb216af2cccd4489385f785c9cf))
  * ObjectGraph support and jsdoc.json enhanced ([137cb3fd](https://github.com/AncientSouls/Graph/commit/137cb3fd7b00104bbfc22f2b1a04ce78ad84b1bc))

##### New Features

* **adapter:** idGenerator for custom ids in links ([84e0e60e](https://github.com/AncientSouls/Graph/commit/84e0e60eb8f71a6da60384694e8ae47e48e9d5a5))
* **git:** Move doc into submodule ([451b6420](https://github.com/AncientSouls/Graph/commit/451b6420bd5c1a29f6ad0b4f204c7b9ad5898c97))
* **scripts:** npm run compile && npm test && npm publish && npm run cleaning && git push ([2fb0c6cb](https://github.com/AncientSouls/Graph/commit/2fb0c6cbf453bee859b30cfe616f402b91520b36))
* **tests:** Separate complete, imcomplete and empty links tests. ([b3c06f9c](https://github.com/AncientSouls/Graph/commit/b3c06f9cad9b2832c8f13b39c25393a143d3dde7))

##### Bug Fixes

* **adapter:**
  * remove event only after removing ([b3c96e78](https://github.com/AncientSouls/Graph/commit/b3c96e786e0c74855c340f822117eebea26db7c7))
  * Catch undefined doc in array. ([9e9029ec](https://github.com/AncientSouls/Graph/commit/9e9029ecbbce38d94d042f90fdec8788a8b63e6e))
  * Callback optional call ([ef09f31d](https://github.com/AncientSouls/Graph/commit/ef09f31d6261ed576f523528628021c482ef36b5))
  * Move callback out from try/catch This led to catching the error inside the callback. ([56ee556c](https://github.com/AncientSouls/Graph/commit/56ee556c429cd0ad3b6914c9b2b46ff2528f0a36))
  * Cleaning and fix query by id result. ([4abf1129](https://github.com/AncientSouls/Graph/commit/4abf1129c8b28dc219b5da0b48936f4ee4eb760b))
  * Fix document to link generation. ([da90f46d](https://github.com/AncientSouls/Graph/commit/da90f46d762f9662036e56676e24ab44571d63b3))
* **scripts:**
  * submodule branch checkout ([05aa2dac](https://github.com/AncientSouls/Graph/commit/05aa2dacb316cd2b812ac64b451bfa872dcaa410))
  * Add to jsdoc script submodule update. ([b662e463](https://github.com/AncientSouls/Graph/commit/b662e463dcf5835bdba2595191972fdf41ef9a75))
  * from path to bin names ([59f4b469](https://github.com/AncientSouls/Graph/commit/59f4b469377140ead35112d359b750e61182d573))
* **jsdoc:**
  * Restore jsdoc.conf.json file. ([7e358b54](https://github.com/AncientSouls/Graph/commit/7e358b540f384d19be8e414eac6437352a50e75d))
  * Move jsdoc settings into gh-pages branch. ([a479f12c](https://github.com/AncientSouls/Graph/commit/a479f12cc2c57dd26ee76030141b70b4fdc3d40c))
* **compile:** Remove old compiled files. Need to automate these processes... ([bf4a2fd8](https://github.com/AncientSouls/Graph/commit/bf4a2fd80936ce0befa6a3a0b9e3ab9fde978eed))
* **tests:** Added before preparation. ([ddc15d01](https://github.com/AncientSouls/Graph/commit/ddc15d014b711dcd6d53fd967d865270af00983b))
* **npm:** Move chai and mocha into main dependencies It is necessary to run tests from other packages. ([10021b6b](https://github.com/AncientSouls/Graph/commit/10021b6bdd03b27ebdfbcbd8a9b2cc11db72710b))

##### Refactors

* **export:** Export in separate line. ([007ba44f](https://github.com/AncientSouls/Graph/commit/007ba44f2fba8032eafc0b837910f4de2d15692e))

