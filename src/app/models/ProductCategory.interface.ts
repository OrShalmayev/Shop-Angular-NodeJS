import { Product } from './Product.interface';

export interface ProductCategory {
    _id:string,
    name?:string,
    description?:string,
    slug?:string,
    images?:string,
    products?: [Product],
    created_at?:string,
    updated_at?:string
}
