import { ParameterSpec } from "./ParameterDecorator.js"

class ExampleClass {

  constructor(
    @ParameterSpec({ fieldType: "string", instructions: "Provide a string value" })
    public stringValue: string,
    @ParameterSpec({ fieldType: "boolean", instructions: "Provide a boolean value" })
    public booleanValue: boolean
  ) {
    this.booleanValue = booleanValue
    this.stringValue = stringValue
  }

}