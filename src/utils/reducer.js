/**
 * @module reducer
 */

/**
 * 创建一个新的对象
 * 并将oldObject及newValues中的值拷贝至新对象中
 *
 * @param  {Object} oldObject 旧对象
 * @param  {Object} newValues 新的值
 * @return {Object}
 */
export function updateObject(oldObject, newValues) {
  // Encapsulate the idea of passing a new object as the first parameter
  // to Object.assign to ensure we correctly copy data instead of mutating
  return Object.assign({}, oldObject, newValues);
}

/**
 * 根据传入的Handler映射表创建对象的reducer处理器
 * 每个handler对应一个actionType
 * 并根据触发时传入的actionType进行调用对应的handler
 *
 * @param {Object}                   initState    - 初始化时的state值内容
 * @param {Object<String, Function>} handlers     - 每个actionType所对应的handler
 * @param {String}                   handlers.key - action的type类型
 * @param {Function}                 handlers.val - action所对应的处理器
 *
 * @return {Object} 处理后的state结果
 */
export function createReducer(initState, handlers) {
  return function reducer(state = initState, action) {
    if (action.type && Object.prototype.hasOwnProperty.call(handlers, action.type)) {
      return handlers[action.type](state, action);
    }
    return state;
  };
}
