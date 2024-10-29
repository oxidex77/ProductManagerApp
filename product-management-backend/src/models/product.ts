export interface Product {
  id?: string | number;
  name: string;
  brand: string;
  type: string;
  warranty_period: number;
  start_date: string;
  price: number;
    createdAt: Date;
    updatedAt: Date;
  }

  export interface CreateProductDTO {
    name: string;
    brand: string;
    type: string;
    warranty_period: number;
    start_date: string;
    price: number;
  }
  