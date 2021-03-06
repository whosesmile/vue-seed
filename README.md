#运行方法
1. npm install yarn -g
2. yarn install
3. yarn mock
4. yarn start // 新开窗口

#一些说明
1. 全局使用vux做数据缓存，可以在需要时使用，例如频繁创建/销毁的组件中的可以保留上一步的数据；不需要时可以当它不存在；唯一的特殊点是必须在每个module内部建立一个ducks目录，不需要vuex功能时仅需返回一个modules空定义；
2. 不使用zepto/jquery，强化采用原生DOM的习惯，ajax使用axios替换；
3. 抽离ajax的提示为全局吐司，避免每次异步请求要处理三层提示:开始、成功、失败；
4. ajax结果现在不再拆包，既回调方法会获得包含code在内的数据结构，可以使用es6语法的参数解构来简化data的获取
4. 基于webpack4构建，分割代码等功能也许需要进一步优化；
5. 使用css-loader中的局部命名功能 :local(.class) 来规避多模块打包在一起可能造成样式冲突的问题；
6. 拆分mock为单独的服务，便于扩展；同时防止总有人混淆MOCK接口服务、NODE代理服务、API接口服务的关系；

#几点注意
1. 在vuex中进行赋值时，尽量做替换操作，防止误操作写入新值无法刷新UI;
