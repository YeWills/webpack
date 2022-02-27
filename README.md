## 调试

### 找到源码
去github上找到源码
fork，如果不fork，可能会受权限控制克隆不下来？
fork后，
git clone fork 后的源码地址；

切到 对应版本的tag，
然后基于tag 创建分支；

使用yarn 安装，
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

