//psuedo code
//read the source file
//split it up into facts that need to be verified
//call wikipedia on each fact
//evalute the truth of each fact
//write the results to a file

import { Configuration, OpenAIApi } from "openai"
import ExampleClass from './attempt1/ExampleClass.js'
import OutputSpec from './attempt1/OutputSpec.js'

const OPENAI_API_KEY="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"

async function main() {

  const configuration = new Configuration({
    apiKey: OPENAI_API_KEY
  })

  const openai = new OpenAIApi(configuration)
  //responseType = Fact
  /*
  const response = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: "example prompt",
    stop: ["You:"], //this needed?
  })
  */
}

main()

let os = new OutputSpec()
os.processClass(ExampleClass)


import 'reflect-metadata'

// The field decorator function
function FieldMetadata(metadataKey: string, metadataValue: any) {
  return function (target: any, propertyKey: string) {
    // Store metadata on the class constructor
    target.constructor[metadataKey] = metadataValue;
  };
}

// Using the field decorator in a class
class MyClass2 {
  @FieldMetadata('numFieldInfo', 'This is a number field')
  public numField: number

  @FieldMetadata('strFieldInfo', 'This is a string field')
  public strField: string

  constructor(numField: number, strField: string) {
    this.numField = numField
    this.strField = strField
  }
}

// Accessing the metadata from a reference to the class
function getDecoratorMetadata(clazz: any, metadataKey: string) {
  return clazz[metadataKey]
}


const myClassRef = MyClass2
console.log(getDecoratorMetadata(myClassRef, 'numFieldInfo')) // Logs: 'This is a number field'
console.log(getDecoratorMetadata(myClassRef, 'strFieldInfo')) // Logs: 'This is a string field'