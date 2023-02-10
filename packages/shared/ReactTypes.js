/*
 * @Author: 韦文耐
 * @Date: 2023-02-07 09:32:38
 * @Description: 保存react的数据类型
 */

export type ReactEmpty=null|void|boolean

export type ReactNodeList=ReactEmpty|React$Node

export type ReactContext<T>={
  $$typeof:symbol|number,
  Consumer:ReactContext<T>,
  Provider:ReactProviderType<T>,
  _currentValue:T,
  _currentValue2:T,
  _theadCount:number,
  _currentRenderer?:Object|null,
  _currentRenderer2?:Object|null,
  displayName?:string,
  _defaultValue:T,
  _globalName:string,
  ...
}
export type ReactProviderType<T>={
  $$typeof:symbol|number,
  _context:ReactContext<T>,
  ...
}