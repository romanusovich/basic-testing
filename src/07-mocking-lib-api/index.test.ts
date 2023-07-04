// Uncomment the code below and write your tests
import axios from 'axios';
import { throttledGetDataFromApi } from './index';

jest.mock('lodash', () => {
  const originalModule = jest.requireActual('lodash');

  return {
    __esModule: true,
    ...originalModule,
    throttle: jest.fn((fn) => fn),
  };
});

describe('throttledGetDataFromApi', () => {
  const relativePath = 'todos/1';
  const data = 'data';

  beforeEach(() => {
    jest.spyOn(axios.Axios.prototype, 'get').mockImplementation(
      () =>
        new Promise((resolve) => {
          resolve({ data });
        }),
    );
  });

  test('should create instance with provided base url', async () => {
    const axiosCreateSpy = jest.spyOn(axios, 'create');
    await throttledGetDataFromApi(relativePath);
    expect(axiosCreateSpy).toBeCalledWith({
      baseURL: 'https://jsonplaceholder.typicode.com',
    });
  });

  test('should perform request to correct provided url', async () => {
    const axiosGetSpy = jest.spyOn(axios.Axios.prototype, 'get');
    await throttledGetDataFromApi(relativePath);
    expect(axiosGetSpy).toHaveBeenCalledWith(relativePath);
  });

  test('should return response data', async () => {
    const result = await throttledGetDataFromApi(relativePath);
    expect(result).toBe(data);
  });
});
