import { FetchStatus } from 'src/app/shared/enums/status.enum';
import { Product } from '../../models/product.model';
import { productsReducer } from './products.reducer';
import * as productsActions from './products.actions';

describe('Test products reducer', () => {

  const mockedItems = [
    { id: 1, name: 'Toaster', description: 'A regular toaster', img: '../../assets/img/toaster.png' },
    { id: 2, name: 'TV', description: 'A big ass TV', img: '../../assets/img/tv.png' },
    { id: 3, name: 'Electric guitar', description: 'A device used to impress people or annoy neighbours', img: '../../assets/img/electric-guitar.png' },
    { id: 4, name: 'PS5', description: "If you have the money we won't have it" },
    { id: 5, name: 'Crappy office notebook', description: 'Expensive as f*ck, cant run sh*t in it' },
    { id: 6, name: 'Gaming mouse', description: "It won't improve your aim", img: '../../assets/img/gaming-mouse.png' },
    { id: 7, name: 'Gaming keyboard', description: 'Because it has the word gaming in it' },
    { id: 8, name: 'Gaming waifu', description: 'Instructions not included', img: '../../assets/img/gaming-waifu.png' },
  ] as Product[];

  it('should have a default initial state', () => {
    const initialState = {
      items: [],
      status: FetchStatus.Pending,
      error: undefined,
    };

    expect(productsReducer(undefined, {type: ''})).toEqual(initialState);
  });

  it('should change status to in progress', () => {
    const state = {
      items: [],
      status: FetchStatus.InProgress,
      error: undefined,
    };

    expect(productsReducer(undefined, productsActions.fetchProducts)).toEqual(state);
  });

  it('should return a list of products', () => {
    const state = {
      items: [],
      status: FetchStatus.Completed,
      error: '',
    };

    const expected = {
      items: mockedItems,
      status: FetchStatus.Completed,
      error: '',
    };

    expect(productsReducer(state, productsActions.fetchProductsSuccess({items: mockedItems}))).toEqual(expected);
  });

  it('should return an error', () => {
    const state = {
      items: [],
      status: FetchStatus.Completed,
      error: '',
    };

    const expected = {
      items: [],
      status: FetchStatus.Completed,
      error: 'Error',
    };

    expect(productsReducer(state, productsActions.fetchProductsError({ payload: 'Error' }))).toEqual(expected);
  });

  it('should delete a product', () => {
    const id = 1;
    const expectedItems = mockedItems.filter(p => p.id !== id);
    const state = {
      items: expectedItems,
      status: FetchStatus.Completed,
      error: '',
    };

    const expected = {
      items: mockedItems.filter(p => p.id !== id),
      status: FetchStatus.Completed,
      error: '',
    }

    expect(productsReducer(state, productsActions.deleteProduct({ id }))).toEqual(expected)
  });


});
