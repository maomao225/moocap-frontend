<div class="row page-menu-buttons">
	<div class="col-sm-5">
		<a class="btn btn-primary new" href="javascript:;" role="button">新建一个角色</a>
	</div>
	<div class="col-sm-7 text-right">
		<a class="btn btn-default" target="_blank" role="button" href="<%=ajaxurl.exportAllGroup%>">下载菜单权限列表</a>
		<a class="btn btn-default download-template-btn" href="javascript:;" role="button" data-url="<%=ajaxurl.exportGroup%>">下载导入模板</a> 
		<button type="button" class="btn btn-primary fileupload-btn import-data-btn" data-url="<%=ajaxurl.importGroup%>">
			<span>导入系统角色信息</span>
			<input class="fileupload" type="file" name="file">
		</button>
		<a class="btn btn-primary export-data-btn" href="javascript:;" role="button" data-url="<%=ajaxurl.exportGroup%>">导出系统角色信息</a> 
	</div>
</div>

<div class="box">
	<div class="box-header with-border">
		<h3 class="box-title">搜索</h3>
	</div>
	<form class="form-inline search-form">
		<div class="box-body">
			<div class="form-group col-sm-3">
				<input type="text" class="form-control" id="keywordInput" placeholder="输入关键字">
			</div>
		</div>
		<div class="box-footer">
			<button type="submit" class="btn btn-info pull-right search">查询</button>
		</div>
	</form>
</div>

<div class="box">
	<div class="box-header">
		<h3 class="box-title">角色列表</h3>
	</div>
	<div class="box-body no-padding">
		<table class="table">
			<tr>
				<th>角色</th>
				<th>菜单权限</th>
				<th>学校权限</th>
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