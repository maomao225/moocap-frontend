<div class="row page-menu-buttons">
	<div class="col-sm-5">
	</div>
	<div class="col-sm-7 text-right">
		<a class="btn btn-primary export-data-btn" href="javascript:;" role="button" data-url="<%=ajaxurl.exportStudents%>">导出学生信息</a> 
	</div>
</div>
<div class="box">
	<div class="box-header with-border">
		<h3 class="box-title">搜索</h3>
	</div>

	<form class="form-inline search-form">
		<div class="box-body">
			<div class="form-group-line clearfix">
				<div class="form-group col-sm-4">
					<label for="provinceSelect">所属省份：</label>
					<select type="text" class="form-control province-select">
						<option value="">--- 选择省 ---</option>
						<%_.each(provinceList, function(item){%>
						<option value="<%=item.id%>"><%=item.name%></option>
						<%})%>
					</select>
				</div>
				<div class="form-group col-sm-8">
					<label for="provinceSelect">参加考试省份：</label>
					<select type="text" class="form-control exam-province-select">
						<option value="">--- 选择省 ---</option>
						<%_.each(provinceList, function(item){%>
						<option value="<%=item.id%>"><%=item.name%></option>
						<%})%>
					</select>
				</div>
			</div>
			<div class="form-group col-sm-12">
				<label for="keywordInput">搜索：</label>
				<input type="text" class="form-control" id="keywordInput" placeholder="输入学校\学生姓名\证件号的关键字" style="width: 300px;">
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
				<th>所属省份</th>
				<th>所属城市</th>
				<th>参加考试的省份</th>
				<th>参加考试城市</th>
				<th>学校</th>
				<th>高考年份</th>
				<th>学生姓名</th>
				<th>证件类型</th>
				<th>证件号</th>
				<th>手机号</th>
				<th>邮箱</th>
				<th>家长电话</th>
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