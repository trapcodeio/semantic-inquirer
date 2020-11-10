# semantic-inquirer
**NOTE** This package is currently for personal usage

A semantic version for [inquirer](https://npmjs.com/package/inquirer) npm package

```sh
npm i semantic-inquirer 
# or 
yarn add semantic-inquirer
```

## Usage
```javascript
const {Q} = require('semantic-inquirer');

async function main(){
   const isReady = await Q.yesOrNo('Are you ready to eat?')
   console.log(isReady ? 'You are ready to eat!' : 'I will ask some other time.')

   const isVegetarian = await Q.trueOrFalse('Vegeteran?');
   if(isVegetarian){
        // Hide the beefs and chicken
   }
}

main().catch(console.log);
```
