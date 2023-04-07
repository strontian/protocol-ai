import { parameterSpecKey, ParameterSpecOptionsPlus } from './ParameterDecorator.js'
import { RESPONSE_PROMPT } from './prompts.js'

export default class OutputSpec<T extends (new (...args: any[]) => any)[]> {
  private classConstructors: [...T]

  constructor(...classConstructors: T) {
    this.classConstructors = classConstructors
  }

  reponseToObjects(message: string): InstanceType<T[number]>[] {
    const parsedOutput: any[][] = JSON.parse(message)
    const instances: InstanceType<T[number]>[] = parsedOutput.map(item => {
      const [className, ...constructorArgs] = item
      const classConstructor = this.classConstructors.find(
        constructor => constructor.name === className
      )
      if (!classConstructor) {
        throw new Error(`Unknown class name: ${className}`)
      }
      return new (classConstructor as any)(...constructorArgs)
    })
    return instances
  }

  getInstructions(): string {
    const messageDefinitions: string[] = this.classConstructors.map(classConstructor => {
      // Extract metadata from the ParameterSpec decorator
      const fieldMetadataArray = (classConstructor.constructor as any)[parameterSpecKey] as ParameterSpecOptionsPlus[]
      
      //initialize fieldDefinition with an empty array of size parameterCount
      fieldMetadataArray.sort((a, b) => b.parameterIndex - a.parameterIndex)
      const fieldDefinitions = fieldMetadataArray.map(({ fieldType, instructions }) => {
        return `["${fieldType}", "${instructions}"]`
      })
      console.log(fieldMetadataArray)
      fieldMetadataArray.forEach(({ fieldType, instructions, parameterIndex }) => {
        fieldDefinitions[parameterIndex] = `["${fieldType}", "${instructions}"]`
      })
      // Create a message definition for the current class constructor
      return `["${classConstructor.name}", ${fieldDefinitions.join(', ')}]`
    });

    // Insert the message definitions into the overall instructions template
    const instructions = RESPONSE_PROMPT.replace('##MESSAGE DEFINITIONS##', messageDefinitions.join(', '))

    return instructions;
  }
}