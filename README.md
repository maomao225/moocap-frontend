# moocap CMS项目

## 基础架构
* 以backbone（underscore、jquery） 为js基础框架进行的开发。
* 以bootstrap 为css基础进行开发（sass）。
* 使用x-editable作为快速就地编辑功能插件。
* 使用jquery.fileupload插件实现上传功能。
* 使用jQuery Bootstrap Pagination进行分页操作。
* 手动编写了button插件实现了按钮loading功能。

## 项目架构

### 基础
由于项目内的页面（模块）相似度较高，因此编写了 以下几个基类，用以复用。
* 'common/models/itemBaseModel' 列表单条数据的基础model
* 'common/models/listCollectionBase' 列表页的基础model
* 'common/ui/listBaseView' 列表页的基础View
* 'common/ui/listItemBaseView' 列表页单条数据的基础View
* 'common/userModel' 用户数据模型，保存用户状态，负责登录等功能
* 'common/ajaxURI' 全局的url配置表，方便复用以及更改。


### 入口
* 项目以'common/main' 为入口（requirejs）。
* 以'common/app' 为项目app启动。
* 以 'common/router' 为项目的总路由控制。

## 构建
使用grunt 进行开发测试上线等持续开发继承环境。 项目根目录下的mock目录以及mockfile.json，为项目提供开发时的模拟数据。
* 开发： grunt server，如果需要模拟本地测试，grunt server:mock
* 虚拟机联调：grunt server --dev-type=coupling ，需要绑定www.moocap.org.cn的host到联调的虚拟机上
* 发布： grunt build --deploy-type=prod ，可选的为dev、beta、prod、 prepare。

## 页面模块
页面模块在modules下，每一个目录为一个模块，每个模块下，都有一个Action文件和一个router文件。
* action文件记录了当前模块的子页面（模块）。
* 调用action，配置当前模块的路由（router文件会被编译进核心文件）。# moocap-frontend
