<div class="row page-menu-buttons">
	<div class="col-sm-5">
		<a class="btn btn-primary new" href="javascript:;" role="button">新建一个考场</a> 
	</div>
	<div class="col-sm-7 text-right">
		<a class="btn btn-default download-template-btn" href="javascript:;" role="button" data-url="<%=ajaxurl.exportExamrooms%>">下载导入模板</a>
		<button type="button" class="btn btn-primary fileupload-btn import-data-btn" data-url="<%=ajaxurl.importExamrooms%>">
			<span>导入考场信息</span>
			<input class="fileupload" type="file" name="file">
		</button>
		<a class="btn btn-primary export-data-btn" href="javascript:;" role="button" data-url="<%=ajaxurl.exportExamrooms%>">导出考场信息</a> 
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
					<label>省份：</label>
					<select type="text" class="form-control province-select location-select" data-role=".city-select" data-type="province">
						<option value=""> --- 全部 --- </option>
						<%_.each(provinceList, function(item){%>
						<option value="<%=item.id%>"><%=item.name%></option>
						<%})%>
					</select>
				</div>
				<div class="form-group col-sm-4">
					<label>城市：</label>
					<select type="text" class="form-control term-select location-select city-select" data-role=".district-select" data-type="city">
						<option value=""> --- 全部 --- </option>
						<optgroup></optgroup>
					</select>
				</div>
				<div class="form-group col-sm-4">
					<label>区县：</label>
					<select type="text" class="form-control term-select location-select district-select" data-type="district">
						<option value=""> --- 全部 --- </option>
						<optgroup></optgroup>
					</select>
				</div>
			</div>
			<div class="form-group col-sm-8">
				<label for="schoolNameInput">搜索：</label>
				<input type="text" class="form-control" id="keyword" placeholder="" style="width:300px;">
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
				<th>考场名称</th>
				<th>省份</th>
				<th>城市</th>
				<th>区县</th>
				<th>地址</th>
				<th>考点名称</th>
				<th>考生容量</th>
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