export default class MyClass {
  static fields = {
    numField: { type: Number, additionalInfo: 'Some info about numField' },
    strField: { type: String, additionalInfo: 'Some info about strField' },
  }

  numField: number
  strField: string

  constructor(numField: number, strField: string) {
    this.numField = numField
    this.strField = strField
  }

}

