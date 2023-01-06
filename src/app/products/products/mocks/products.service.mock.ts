import { Product } from "../../models/product.model";

export const mockedItems = [
  { id: 1, name: 'Toaster', description: 'A regular toaster', img: '../../assets/img/toaster.png' },
  { id: 2, name: 'TV', description: 'A big ass TV', img: '../../assets/img/tv.png' },
  { id: 3, name: 'Electric guitar', description: 'A device used to impress people or annoy neighbours', img: '../../assets/img/electric-guitar.png' },
  { id: 4, name: 'PS5', description: "If you have the money we won't have it" },
  { id: 5, name: 'Crappy office notebook', description: 'Expensive as f*ck, cant run sh*t in it' },
  { id: 6, name: 'Gaming mouse', description: "It won't improve your aim", img: '../../assets/img/gaming-mouse.png' },
  { id: 7, name: 'Gaming keyboard', description: 'Because it has the word gaming in it' },
  { id: 8, name: 'Gaming waifu', description: 'Instructions not included', img: '../../assets/img/gaming-waifu.png' },
] as Product[];

export const MockService = {
  getProducts: jasmine.createSpy('getProducts'),
  deleteProduct: jasmine.createSpy('getProducts'),
}
