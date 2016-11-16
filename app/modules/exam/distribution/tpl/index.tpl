<div class="row page-menu-buttons">
	<div class="col-sm-5">
	</div>
	<div class="col-sm-7 text-right">
		<a class="btn btn-default download-template-btn" href="javascript:;" role="button" data-url="<%=ajaxurl.exportAllocations%>">下载导入模板</a>
		<button type="button" class="btn btn-primary fileupload-btn import-data-btn" data-url="<%=ajaxurl.importAllocations%>">
			<span>导入考场分配信息</span>
			<input class="fileupload" type="file" name="file">
		</button>
		<a class="btn btn-primary export-data-btn" href="javascript:;" role="button" data-url="<%=ajaxurl.exportAllocations%>">导出考场分配信息</a> 
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
					<label for="term">年份：</label>
					<select type="text" class="form-control term-select">
						<option value="">--- 全部 ---</option>
						<%_.each(termList, function(item){%>
						<option value="<%=item.id%>"><%=item.name%></option>
						<%})%>
					</select>
				</div>
				<div class="form-group col-sm-4">
					<label for="term">参加考试省份：</label>
					<select type="text" class="form-control province-select location-select" data-role=".city-select" data-type="province">
						<option value="">--- 全部 ---</option>
						<%_.each(provinceList, function(item){%>
						<option value="<%=item.id%>"><%=item.name%></option>
						<%})%>
					</select>
				</div>
				<div class="form-group col-sm-4">
					<label for="term">参加考试城市：</label>
					<select type="text" class="form-control city-select location-select" data-type="city">
						<option value="">--- 全部 ---</option>
						<optgroup></optgroup>
					</select>
				</div>
			</div>
			<div class="form-group col-sm-12">
				<label for="keywordInput">搜索：</label>
				<input type="text" class="form-control" id="keywordInput" placeholder="请输入考场名称\学校\学生姓名\证件号\准考证号的关键字" style="width:400px;">
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
				<th>考场名称</th>
				<th>考场地址</th>
				<th>考点名称</th>
				<th>座位号</th>
				<th>考试科目</th>
				<th>参加考试省份</th>
				<th>参加考试城市</th>
				<th>学校</th>
				<th>学生姓名</th>
				<th>性别</th>
				<th>证件类型</th>
				<th>证件号</th>
				<th>准考证号</th>
				<th>考试开始时间</th>
				<th>考试结束时间</th>
				<th width="60px">操作</th>
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