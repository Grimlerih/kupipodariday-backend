import { HttpStatus } from '@nestjs/common';

export enum ErrorCode {
  LoginOrPasswordIncorrect = 100,
  UserAlreadyExists = 101,
  UserNotFound = 102,
  UpdateError = 103,
  WishNotFound = 104,
  SaveError = 105,
  WishesNotFound = 106,
  WishListError = 106,
  WishlistNotFound = 107,
}

export const code2message = new Map<ErrorCode, string>([
  [ErrorCode.LoginOrPasswordIncorrect, 'Неверный логин или пароль'],
  [ErrorCode.UserAlreadyExists, 'Такой пользователь уже существует'],
  [ErrorCode.UserNotFound, 'Такой пользователь не существует'],
  [ErrorCode.UpdateError, 'Ошибка при обновлении данных'],
  [ErrorCode.WishNotFound, 'Ошибка, подарок не найден'],
  [ErrorCode.SaveError, 'Ошибка при сохранении'],
  [ErrorCode.WishesNotFound, 'Ошибка подарки не найдены'],
  [ErrorCode.WishListError, 'Ошибка при запросе списка подарков'],
  [ErrorCode.WishlistNotFound, 'Список подарков не найден'],
]);

export const code2status = new Map<ErrorCode, HttpStatus>([
  [ErrorCode.LoginOrPasswordIncorrect, HttpStatus.BAD_REQUEST],
  [ErrorCode.UserAlreadyExists, HttpStatus.BAD_REQUEST],
  [ErrorCode.UserNotFound, HttpStatus.NOT_FOUND],
  [ErrorCode.UpdateError, HttpStatus.BAD_REQUEST],
  [ErrorCode.WishNotFound, HttpStatus.NOT_FOUND],
  [ErrorCode.SaveError, HttpStatus.BAD_REQUEST],
  [ErrorCode.WishesNotFound, HttpStatus.BAD_REQUEST],
  [ErrorCode.WishListError, HttpStatus.BAD_REQUEST],
  [ErrorCode.WishlistNotFound, HttpStatus.NOT_FOUND],
]);
