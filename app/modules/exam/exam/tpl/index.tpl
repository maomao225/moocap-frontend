<div class="row page-menu-buttons">
	<div class="col-sm-5">
		<a class="btn btn-primary new" href="javascript:;" role="button">新增一场考试</a> 
	</div>
	<div class="col-sm-7 text-right">
		<a class="btn btn-primary export-data-btn" href="javascript:;" role="button" data-url="<%=ajaxurl.exportExams%>">导出考试信息</a> 
	</div>
</div>

<div class="box">
	<div class="box-header with-border">
		<h3 class="box-title">搜索</h3>
	</div>

	<form class="form-inline search-form">
		<div class="box-body">
			<div class="form-group col-sm-4">
				<label>年份：</label>
				<select type="text" class="form-control term-select">
					<option value=""> --- 全部 --- </option>
					<%_.each(termList, function(item){%>
					<option value="<%=item.id%>"><%=item.name%></option>
					<%})%>
				</select>
			</div>
			<div class="form-group col-sm-8">
				<label for="schoolNameInput">搜索：</label>
				<input type="text" class="form-control schoolNameInput" id="schoolNameInput" placeholder="请输入考试科目">
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
				<th>考试科目</th>
				<th>考试报名时间</th>
				<th>考试补报名时间</th>
				<th>可申请退款时间</th>
				<th>打印准考证时间</th>
				<th>线下考试时间</th>
				<th>查询考试成绩\申请纸质成绩单时间</th>
				<th>考试报名费用</th>
				<th>考试补报名费用</th>
				<th>申请纸质成绩单费用</th>
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