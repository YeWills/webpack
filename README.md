## 调试

### 步骤
- 去github上找到源码
fork，如果不fork，可能会受权限控制克隆不下来？
fork后，
git clone fork 后的源码地址；

- 切到 对应版本的tag，
然后基于tag 创建分支；

- 使用yarn 安装，
因为webpack官方有yarn.lock 文件
那就用yarn来安装吧，
不然用npm安装会报错，比如报错 pug依赖，项目下依赖 pug@3.00, 
但是 `npm ERR! peer pug@"^2.0.0" from pug-loader@2.4.0`， 具体报错如下：
```s
npm ERR! code ERESOLVE
npm ERR! ERESOLVE unable to resolve dependency tree
npm ERR!
npm ERR! While resolving: webpack@5.69.1
npm ERR! Found: pug@3.0.2
npm ERR! node_modules/pug
npm ERR!   dev pug@"^3.0.0" from the root project
npm ERR!
npm ERR! Could not resolve dependency:
npm ERR! peer pug@"^2.0.0" from pug-loader@2.4.0
npm ERR! node_modules/pug-loader
npm ERR!   dev pug-loader@"^2.4.0" from the root project
npm ERR!
npm ERR! Fix the upstream dependency conflict, or retry
npm ERR! this command with --force, or --legacy-peer-deps
npm ERR! to accept an incorrect (and potentially broken) dependency resolut
```
为此，请使用yarn来安装。

- 创建 文件夹demo debug 用于调试源码

- 修改 .eslintrc 为module方式
webpack的 eslint 项目为  `plugin:node/recommended` 模式，要改成 非node 方式 才可以在 debug demo 上面的 写业务代码；


根目录下执行

```
$ node ./debug/run.js
```

### 参考

关于webpack5 的源码 调试与分析的视频，[点击这里](https://www.bilibili.com/video/av462922583?from=search&seid=14121423744670771391&spm_id_from=333.337.0.0)


### 源码阅读
#### 介绍
- 如果我们想实现一个 webpack ，那么我们首先发现的现象就是 它是一个函数
- 关于webpack 函数，不论我们是否传入了 callback 它都会调用 create方法 然后返回 compiler
- compiler 是 create内部调用了 createCompiler 方法获取的
- 在 createCompiler 内部执行了 new Compiler ， 很明显 compiler 的创建时在另外一个模块当中实现，在我们创建了 compiler 之后，后续还有很多代码。 这些后续的代码其实就是在挂载插件，在webpack 打包过程中， 插件时在 compiler 声明了之后 进行的挂载 并不代表着执行
【createCompiler 做了两件事情 ，创建 compiler对象； 挂载所有插件new WebpackOptionsApply().process(options, compiler);注意挂载并不意味着执行，只有被触发调用才执行；
webpack 的所有配置项，最后都会华为插件进行处理
】

- 通过源码的阅读我们发现 webpack 内部再挂载插件的时候其实就是将所有的配置属性转为插件进行处理，例如我们配置当中写 `entry： ./src/index.js`,它内部其实是转为了 new EntryOptionsPlugin.apply()
【webpack 很多配置，最后都化为插件进行处理 例如 EntryOptionPlugin 插件】

#### new Compiler 做了什么
定义了几个方法 finalCallback onCompiled run
在它的内部最终会执行 run 方法
在run的内部执行 compile 方法

#### compile 做了什么
在它的内部包含了一个相对完整的打包流程
其中具体的模块打包操作是在make 环节完成的
在分析代码是发现此处只是触发了之前订阅一个事件监听，所以难点是找到 make 这个钩子的注册 （call-> tap）

找make 钩子在哪定义的：
webpack 打包一定需要先明确入口，而我们又知道 compiler 对象声明了之后就做了插件的挂载
entry 这个属性在挂载插件的时候就被处理了
定位到了 process 方法调用的模块当中 entryoptionsplugin.apply
这个apply方法的回调中执行了一个静态方法，在这个静态方法当中最终执行了 new entryplugin 
最终在这个插件内部我们找到了 compiler.hooks.make.tapAsync 操作， 它定义了相应的回调
这个钩子的监听里具体做了什么： compilation.addentry
seal 方法 将处理好的内容 写入磁盘文件；
