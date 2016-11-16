<div class="row page-menu-buttons">
	<div class="col-sm-5">
		<a class="btn btn-primary new" href="javascript:;" role="button">新建一个用户</a>
	</div>
	<div class="col-sm-7 text-right">
		<a class="btn btn-default download-template-btn" href="javascript:;" role="button" data-url="<%=ajaxurl.exportUser%>">下载导入模板</a> 
		<button type="button" class="btn btn-primary fileupload-btn import-data-btn" data-url="<%=ajaxurl.importUser%>">
			<span>导入用户信息</span>
			<input class="fileupload" type="file" name="file">
		</button>
		<a class="btn btn-primary export-data-btn" href="javascript:;" role="button" data-url="<%=ajaxurl.exportUser%>">导出用户信息</a> 
	</div>
</div>

<div class="box">
	<div class="box-header with-border">
		<h3 class="box-title">搜索</h3>
	</div>
	<form class="form-inline search-form">
		<div class="box-body">
			<div class="form-group col-sm-4">
				<label for="isActiveSelect">开通状态：</label>
				<select required="required" id="isActiveSelect" class="form-control" style="width: 100px;">
					<option value="1">全部</option>
					<option value="2">开通</option>
					<option value="3">关闭</option>
				</select>
			</div>
			<div class="form-group col-sm-8">
				<label for="keyword">关键字：</label>
				<input type="text" class="form-control" id="keyword" placeholder="输入关键字" style="width: 300px;">
			</div>
		</div>
		<div class="box-footer">
			<button type="submit" class="btn btn-info pull-right search">查询</button>
		</div>
	</form>
</div>

<div class="box">
	<div class="box-header">
		<h3 class="box-title">用户列表</h3>
	</div>
	<div class="box-body no-padding list-box">
		<table class="table">
			<tr>
				<th>用户名</th>
				<th>用户姓名</th>
				<th>邮箱</th>
				<th>手机号</th>
				<th>角色</th>
				<th>菜单权限</th>
				<th>开通状态</th>
				<th>操作</th>
			</tr>
			<tbody class="data-list"></tbody>
		</table>
		<div class="row">
			<div class="col-sm-4">共<span class="list-count"></span>条，每页显示<span class="list-limit"></span>条</div>
			<div class="col-sm-8 text-right">
				<nav>
					<ul class="pagination">
					</ul>
				</nav>
			</div>
		</div>
	</div>
</div>