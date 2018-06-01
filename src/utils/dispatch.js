// 快捷方式 兼容: store.dispatch
export default function dispatch(type) {
  return ({ commit }, payload = {}) => {
    commit({ type: type, ...payload });
  };
}
