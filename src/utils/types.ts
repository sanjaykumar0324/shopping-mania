import { IconType } from "react-icons";

export type HeaderData_type = {
  id: number;
  name: string;
  path: string;
};
export type HeaderIcon_type = {
  id: number;
  icon: IconType;
  name: string;
  path: string;
};
export type Cart_type = {
  _id: string;
  productName: string;
  image: string;
  quantity : number;
  price : number;
};

export type Product_type ={
    _id:string,
    title: string;
    price: number;
    isFavourite: boolean;
    isDiscount: boolean;
    discountPer: number;
    image: string;
    company :string,
    categoryId : string,
    color : string
}


