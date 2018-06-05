// 目录起名为ducks是沿用了redux的习惯
// https://github.com/erikras/ducks-modular-redux

import category from './category';

export default {
  namespaced: true,
  modules: { category },
};
