// Uncomment the code below and write your tests
import { getBankAccount, BankAccount, InsufficientFundsError, TransferFailedError, SynchronizationFailedError } from '.';

import * as lodash from 'lodash';
jest.mock('lodash');

describe('BankAccount', () => {
  let balance: number;
  let bankAcc: BankAccount;
  let anotherBankAcc: BankAccount;
  let fetchBalance: number;
  let spyLodashRandom = jest.spyOn(lodash, 'random');

  beforeEach(() => {
    jest.clearAllMocks();

    balance = 1000;
    bankAcc = getBankAccount(balance);
    anotherBankAcc = getBankAccount(balance);

    fetchBalance = 99;
    spyLodashRandom.mockReturnValueOnce(fetchBalance);
  });

  test('should create account with initial balance', () => {
    expect(bankAcc).toBeInstanceOf(BankAccount);
    expect(bankAcc.getBalance()).toBe(balance);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    expect(() => { bankAcc.withdraw(balance ** 2) }).toThrow(InsufficientFundsError);
  });

  test('should throw error when transferring more than balance', () => {
    expect(() => { bankAcc.transfer(balance ** 2, anotherBankAcc) }).toThrow(InsufficientFundsError);
  });

  test('should throw error when transferring to the same account', () => {
    expect(() => { bankAcc.transfer(balance, bankAcc) }).toThrow(TransferFailedError);
  });

  test('should deposit money', () => {
    bankAcc.deposit(balance);
    expect(bankAcc.getBalance()).toBe(balance + balance);
  });

  test('should withdraw money', () => {
    bankAcc.withdraw(balance);
    expect(bankAcc.getBalance()).toBe(balance - balance);
  });

  test('should transfer money', () => {
    bankAcc.transfer(balance, anotherBankAcc);
    expect(bankAcc.getBalance()).toBe(balance - balance);
    expect(anotherBankAcc.getBalance()).toBe(balance + balance);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    spyLodashRandom.mockReturnValueOnce(1);
    const result = await bankAcc.fetchBalance()
    expect(result).toBe(fetchBalance);
  });

  test('should set new balance if fetchBalance returned number', async () => {
    spyLodashRandom.mockReturnValueOnce(1);
    await bankAcc.synchronizeBalance();
    expect(bankAcc.getBalance()).toBe(fetchBalance);
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    spyLodashRandom.mockReturnValueOnce(0);
    try {
      await bankAcc.synchronizeBalance();
    } catch (e) {
      expect(e).toBeInstanceOf(SynchronizationFailedError);
    }
  });
});
