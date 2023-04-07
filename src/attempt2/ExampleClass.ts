import { Field } from "./Field.js"

export default class ExampleClass {
  @Field({ fieldType: "boolean", instructions: "Parse boolean value" })
  public booleanField: boolean

  @Field({ fieldType: "number", instructions: "Parse number value" })
  public numberField: number

  @Field({ fieldType: "string", instructions: "Parse string value" })
  public stringField: string

  constructor(booleanField: boolean, numberField: number, stringField: string) {
    this.booleanField = booleanField
    this.numberField = numberField
    this.stringField = stringField
  }

}