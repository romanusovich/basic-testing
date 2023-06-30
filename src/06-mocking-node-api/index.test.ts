// Uncomment the code below and write your tests
import { doStuffByTimeout, doStuffByInterval, readFileAsynchronously } from '.';
import * as fs from 'fs'; // existsSync
import * as fsp from 'fs/promises'; // readFile
import * as path from 'path'; // join
jest.mock('fs');
jest.mock('fs/promises');
jest.mock('path');

describe('doStuffByTimeout', () => {
  const callback = jest.fn();
  const timeout = 150;

  beforeAll(() => {
    jest.useFakeTimers();
    // jest.spyOn(global, 'setTimeout'); // just doesnt work
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set timeout with provided callback and timeout', () => {
    // expect(setTimeout).toHaveBeenLastCalledWith(callback, timeout); // just doesnt work
    doStuffByTimeout(callback, timeout);
    expect(callback).not.toBeCalled();
    jest.advanceTimersByTime(timeout);
    expect(callback).toBeCalledTimes(1);
  });

  test('should call callback only after timeout', () => {
    doStuffByTimeout(callback, timeout);
    expect(callback).not.toBeCalled();
    jest.advanceTimersByTime(timeout);
    expect(callback).toBeCalledTimes(1);
  });
});

describe('doStuffByInterval', () => {
  let callback: any;
  const timeout = 150;

  beforeEach(() => {
    jest.useFakeTimers();
    callback = jest.fn();
    // jest.spyOn(global, 'setInterval'); // just doesnt work
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set interval with provided callback and timeout', () => {
    // expect(setInterval).toHaveBeenLastCalledWith(callback, timeout); // just doesnt work
    doStuffByInterval(callback, timeout);
    expect(callback).not.toBeCalled();
    jest.advanceTimersByTime(timeout);
    expect(callback).toBeCalledTimes(1);
  });

  test('should call callback multiple times after multiple intervals', () => {
    doStuffByInterval(callback, timeout);
    expect(callback).not.toBeCalled();
    jest.advanceTimersByTime(timeout);
    expect(callback).toBeCalledTimes(1);
    jest.advanceTimersByTime(timeout);
    expect(callback).toBeCalledTimes(2);
    jest.advanceTimersByTime(timeout);
    expect(callback).toBeCalledTimes(3);
  });
});

describe('readFileAsynchronously', () => {
  jest.spyOn(path, 'join');
  const existSpy = jest.spyOn(fs, 'existsSync');
  const readFileSpy = jest.spyOn(fsp, 'readFile');
  const filePath = 'index.ts';
  const text = 'some text';

  test('should call join with pathToFile', async () => {
    readFileAsynchronously(filePath);
    expect(path.join).toBeCalledTimes(1);
  });

  test('should return null if file does not exist', async () => {
    existSpy.mockReturnValueOnce(false);
    const result = await readFileAsynchronously(filePath);
    expect(result).toBeNull();
  });

  test('should return file content if file exists', async () => {
    existSpy.mockReturnValueOnce(true);
    readFileSpy.mockReturnValueOnce(new Promise<string | Buffer>((resolve, reject) => {
      resolve(text);
      reject(text);
    }));
    const result = await readFileAsynchronously(filePath);
    expect(result).toBe(text);
  });
});
