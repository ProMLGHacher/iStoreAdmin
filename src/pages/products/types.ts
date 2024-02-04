export interface Product {
    productId: string
    description: string
    name: string
    filters: Filter[]
    productConfigurations: ProductConfiguration[]
  }
  
  export interface Filter {
    name: string
    type: string
    elems: Elem[]
    selected: number
  }
  
  export interface Elem {
    color: any
    hex: any
    values: string[]
  }
  
  export interface ProductConfiguration {
    configurationId: string
    characteristics: Characteristic[]
    totalPrice: number
  }
  
  export interface Characteristic {
    type: string
    name: string
    value: string
  }
  