# 买好车活动页面脚手架

快速搭建活动页面的骨架，减少复制粘贴的重复劳动！

## 用法

先安装 [Yeoman](http://yeoman.io)，

```bash
npm install -g yo
```

然后安装脚手架，

```bash
npm install -g generator-mhc-activity
```

接下来在活动页面目录中执行以下命令，就可以生成页面啦！

### PC 端页面

```bash
yo mhc-activity
```

### 移动端页面

```bash
yo mhc-activity --mobile=true
```

页面生成之后，在 `index.html` 中特定的注释之间写入自己的代码。

```html
<!-- 活动页面代码 begin -->
<div>你自己的代码</div>
<!-- 活动页面代码 end -->
```
