export default class OutputSpec {
  fieldInfos: Map<string, any> = new Map();

  processClass<T>(classObj: new (...args: any[]) => T): void {
    //console.log(`Processing class: ${classObj.name}`);

    const fieldNames = Object.getOwnPropertyNames(classObj.prototype);

    //console.log(fieldNames)
    for (const fieldName of fieldNames) {
      if (fieldName !== 'constructor') {
        const fieldInfo = Reflect.getMetadata('custom:info', classObj.prototype, fieldName);
        this.fieldInfos.set(fieldName, fieldInfo);
        console.log(`Field "${fieldName}" has info:`, fieldInfo);
      }
    }
  }
}

