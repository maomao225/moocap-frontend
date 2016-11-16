<div class="row page-menu-buttons">
	<div class="col-sm-5">
	</div>
	<div class="col-sm-7 text-right">
		<%_.each(selfMenu, function(item){%>
			<%if(item.codename === 'exam.score.import'){%>
			<!--  -->
			<button type="button" class="btn btn-primary fileupload-btn import-ata-data-btn" data-url="<%=ajaxurl.importATAScores%>">
				<span>批量导入电子版分析单</span>
				<input class="fileupload" type="file" name="file">
			</button>
			<!--  -->
			<button type="button" class="btn btn-primary fileupload-btn import-data-btn" data-url="<%=ajaxurl.importScores%>">
				<span>导入成绩单信息</span>
				<input class="fileupload" type="file" name="file">
			</button>
			<%}else if(item.codename === 'exam.score.export'){%>
			<a class="btn btn-primary export-data-btn" href="javascript:;" role="button" data-url="<%=ajaxurl.exportScores%>">导出成绩单信息</a>
			<%}%>
		<%})%>
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
				<div class="form-group col-sm-8">
					<label>百分比等级：</label>
					<div class="row input-group">
						<div class="input-group">
							<input type="text" class="form-control" id="gradeStartInput" placeholder="0-100的数值" pattern="100|[1-9][0-9]|[1-9]"/><div class="input-group-addon">% 至 </div>
							<input type="text" class="form-control" id="gradeEndInput" placeholder="0-100的数值" pattern="100|[1-9][0-9]|[1-9]"/>
							<div class="input-group-addon">%</div>
						</div>
					</div>
				</div>
			</div>
			<div class="form-group col-sm-12">
				<label for="keywordInput">搜索：</label>
				<input type="text" class="form-control" id="keywordInput" placeholder="请输入学生姓名\成绩单编号\学校\准考证号\考试科目的关键字" style="width:500px;">
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
				<th>学员姓名</th>
				<th>年份</th>
				<th>成绩单编号</th>
				<th>学校</th>
				<th>准号证号</th>
				<th>证件类型</th>
				<th>证件号</th>
				<th>考试科目</th>
				<th>成绩</th>
				<th>百分等级</th>
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