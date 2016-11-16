<div class="row page-menu-buttons">
	<div class="col-sm-5">
	</div>
	<div class="col-sm-7 text-right">
		<a class="btn btn-primary collect" href="javascript:;" role="button" data-url="<%=ajaxurl.exportExams%>">批量查看评价单</a> 
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
						<label>考试年份：</label>
						<select type="text" class="form-control term-select">
							<option value=""> --- 全部 --- </option>
							<%_.each(termList, function(item){%>
							<option value="<%=item.id%>"><%=item.name%></option>
							<%})%>
						</select>
					</div>
					<div class="form-group col-sm-8">
						<label for="schoolNameInput">搜&emsp;&emsp;索：</label>
						<input type="text" class="form-control schoolNameInput" id="schoolNameInput" placeholder="评价单编号\学生姓名\学校\证件号\准考证号的关键字" style="width:400px">
					</div>
			</div>

			<div class="form-group-line clearfix">
				<div class="form-group col-sm-4">
					<label>在线科目：</label>
					<select type="text" class="form-control course-select">
						<option value=""> --- 全部 --- </option>
						<%_.each(courseList, function(item){%>
						<option value="<%=item.id%>"><%=item.name%></option>
						<%})%>
					</select>
				</div>
				<!-- <div class="form-group col-sm-8">
					<label for="purchaseTimeStartInput">开课时段：</label>
					<div class="row input-group">
						<div class="col-sm-5">
							<input type="text" class="form-control form_datetime" id="purchaseTimeStartInput" placeholder="开始时间">
						</div>
						<div class="col-sm-1">至</div>
						<div class="col-sm-6">
							<input type="text" class="form-control form_datetime" id="purchaseTimeEndInput" placeholder="结束时间">
						</div>
					</div>
				</div> -->
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
				<th>考试年份</th>
				<th>评价单编号</th>
				<th>在线科目</th>
				<th>开课时段</th>
				<th>学生姓名</th>
				<th>地区</th>
				<th>学校</th>
				<th>证件类型</th>
				<th>证件号</th>
				<th>准考证号</th>
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