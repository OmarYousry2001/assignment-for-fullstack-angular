export interface IProduct {
  id: string;
  category: string;
  productCode: string;
  name: string;
  price: number;
  minimumQuantity: number;
  discountRate: number;
  imagePath?: string;
  image?: File;
}
