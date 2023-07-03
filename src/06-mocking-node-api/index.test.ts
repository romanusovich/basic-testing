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

  afterEach(() => {
    jest.clearAllTimers();
  });

  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set timeout with provided callback and timeout', () => {
    const setTimeoutSpy = jest.spyOn(global, 'setTimeout');
    doStuffByTimeout(callback, timeout);
    expect(setTimeoutSpy).toBeCalledWith(callback, timeout);
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

  afterEach(() => {
    jest.clearAllTimers();
  });

  beforeEach(() => {
    callback = jest.fn();
  });

  beforeAll(() => {
    jest.useFakeTimers();
  });
  
  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set interval with provided callback and timeout', () => {
    const setIntervalSpy = jest.spyOn(global, 'setInterval');
    doStuffByInterval(callback, timeout);
    expect(setIntervalSpy).toBeCalledWith(callback, timeout);
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
  const filePath = 'asd.ts';
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
    readFileSpy.mockReturnValueOnce(new Promise<string | Buffer>((resolve) => {
      resolve(text);
    }));
    const result = await readFileAsynchronously(filePath);
    expect(result).toBe(text);
  });
});
