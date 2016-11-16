<div class="row page-menu-buttons">
	<div class="col-sm-5">
		<a class="btn btn-primary new" href="javascript:;" role="button">新增一个学校</a> 
	</div>
	<div class="col-sm-7 text-right">
		<a class="btn btn-default download-template-btn" href="javascript:;" role="button" data-url="<%=ajaxurl.exportSchools%>">下载导入模板</a> 
		<button type="button" class="btn btn-primary fileupload-btn import-data-btn" data-url="<%=ajaxurl.importSchools%>">
			<span>导入学校信息</span>
			<input class="fileupload" type="file" name="file">
		</button>
		<a class="btn btn-primary export-data-btn" href="javascript:;" role="button" data-url="<%=ajaxurl.exportSchools%>">导出学校信息</a> 
	</div>
</div>

<div class="box">
	<div class="box-header with-border">
		<h3 class="box-title">搜索</h3>
	</div>

	<form class="form-inline search-form">
		<div class="box-body">
			<div class="form-group col-sm-6">
				<label for="exampleInputName2">学校分类:</label>
				<label class="radio-inline">
					<input type="radio" name="schollTypeRadio" value="1">中学
				</label>
				<label class="radio-inline">
					<input type="radio" name="schollTypeRadio" value="2">高校
				</label>  
			</div>
			<div class="form-group col-sm-3">
				<label for="provinceSelect">省份：</label>
				<select type="text" class="form-control province-select">
					<option value=""></option>
					<%_.each(provinceList, function(item){%>
					<option value="<%=item.id%>"><%=item.name%></option>
					<%})%>
				</select>
			</div>
			<div class="form-group col-sm-3">
				<label for="citySelect">城市：</label>
				<select type="text" class="form-control city-select">
					<option value=""></option>
				</select>
			</div>
			<div class="form-group col-sm-12">
				<label for="schoolNameInput">搜索：</label>
				<input type="text" class="form-control schoolNameInput" placeholder="学校名称">
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
				<th>学校分类</th>
				<th>省份</th>
				<th>城市</th>
				<th>学校</th>
				<th>地址</th>
				<th>联系人</th>
				<th>职务</th>
				<th>联系电话</th>
				<th>邮箱</th>
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