<div class="row page-menu-buttons">
	<div class="col-sm-5">
		<a class="btn btn-primary new" href="javascript:;" role="button">新增一门课程</a> 
	</div>
	<div class="col-sm-7 text-right">
		<a class="btn btn-default download-template-btn" href="javascript:;" role="button" data-url="<%=ajaxurl.exportCourses%>">下载导入模板</a>

		<button type="button" class="btn btn-primary fileupload-btn import-data-btn" data-url="<%=ajaxurl.importCourses%>">
			<span>导入课程信息</span>
			<input class="fileupload" type="file" name="file">
		</button>
		<a class="btn btn-primary export-data-btn" href="javascript:;" role="button" data-url="<%=ajaxurl.exportCourses%>">导出课程信息</a> 
	</div>
</div>

<div class="box">
	<div class="box-header with-border">
		<h3 class="box-title">搜索</h3>
	</div>

	<form class="form-inline search-form">
		<div class="box-body">
			<div class="form-group col-sm-4">
				<label for="term">年份：</label>
				<select type="text" class="form-control term-select">
					<option value="">--- 全部 ---</option>
					<%_.each(termList, function(item){%>
					<option value="<%=item.id%>"><%=item.name%></option>
					<%})%>
				</select>
			</div>
			<div class="form-group col-sm-8">
				<label for="keywordInput">搜索：</label>
				<input type="text" class="form-control" id="keywordInput" placeholder="请输入开课科目\学校\教师的名字关键字" style="width:300px;">
			</div>
		</div>
		<div class="box-footer">
			<button type="submit" class="btn btn-info pull-right">查询</button>
		</div>
	</form>
</div>
<div class="box">
	<div class="box-body">
		<table class="table table-bordered table-striped">
			<tr>
				<th>年份</th>
				<th>开课科目</th>
				<th>学校</th>
				<th>教师姓名</th>
				<th>身份证号</th>
				<th>联系方式</th>
				<th>邮箱</th>
				<th>教师认证状态</th>
				<th>班级规模</th>
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