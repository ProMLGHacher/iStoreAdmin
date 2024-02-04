export interface Product {
  productId: string
  description: string
  name: string
  filters: Filter[]
  productConfigurations: ProductConfiguration[]
}

export interface Filter {
  id: string
  name: string
  type: string
  elems: Elem[]
  selected: number
}

export interface Elem {
  color: string
  hex: string
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
