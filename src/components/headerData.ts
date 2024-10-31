import { HeaderData_type, HeaderIcon_type } from "@/utils/types";
import { CiHeart } from "react-icons/ci";
import { CiShoppingCart } from "react-icons/ci";
import { CiUser } from "react-icons/ci";


export const headerData: HeaderData_type[] = [
  {
    id: 1,
    name: "Home",
    path: "/",
  },
  {
    id: 2,
    name: "Contact",
    path: "/contact",
  },
  {
    id: 3,
    name: "About",
    path: "/about",
  },
  {
    id: 4,
    name: "Sign Up",
    path: "/sign-up",
  },
];

export const headerIconData: HeaderIcon_type[] = [
  {
    id: 1,
    icon: CiHeart,
    name:'Favourites',
    path: "/my-account/favourites",
  },
  {
    id: 2,
    icon: CiShoppingCart,
    name: 'Cart',
    path: "/my-account/cart",
  },
  {
    id: 3,
    icon: CiUser,
    name:'My account',
    path: "/my-account",
  },
];
