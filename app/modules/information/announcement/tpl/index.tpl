<div class="row page-menu-buttons">
    <div class="col-sm-5">
        <a class="btn btn-primary new" href="javascript:;" role="button">新增通知公告</a>
    </div>
</div>

<div class="box">
	<div class="box-header with-border">
		<h3 class="box-title">搜索</h3>
	</div>

	<form class="form-inline search-form">
		<div class="box-body">
			<div class="form-group col-sm-6">
				<label>资讯分类:</label>
				<label class="radio-inline">
					<input type="radio" name="category" value="" checked>全部
				</label>
				<label class="radio-inline">
					<input type="radio" name="category" value="1">通知
				</label>
				<label class="radio-inline">
					<input type="radio" name="category" value="2">公告
				</label>
			</div>
			<div class="form-group col-sm-6">
				<label>关键字：</label>
				<input type="text" class="form-control" name="search" placeholder="输入关键字">
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
		        <th>资讯分类</th>
		        <th>资讯标题</th>
		        <th>发布时间</th>
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