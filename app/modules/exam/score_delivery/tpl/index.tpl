<div class="row page-menu-buttons">
	<div class="col-sm-5">
		<a class="btn btn-primary export-data-btn" href="javascript:;" role="button" data-url="<%=ajaxurl.exportScoreDeliveriesCertificate%>">批量下载电子版成绩单</a> 
	</div>
	<div class="col-sm-7 text-right">
		<a class="btn btn-default download-template-btn" href="javascript:;" role="button" data-url="<%=ajaxurl.exportScoreReportDelivery%>">下载导入模板</a> 
		<button type="button" class="btn btn-primary fileupload-btn import-data-btn" data-url="<%=ajaxurl.importScoreReportDelivery%>">
			<span>导入配送成绩单信息</span>
			<input class="fileupload" type="file" name="file">
		</button>
		<a class="btn btn-primary export-data-btn" href="javascript:;" role="button" data-url="<%=ajaxurl.exportScoreReportDelivery%>">导出配送成绩单信息</a>
	</div>
</div>

<div class="box">
	<div class="box-header with-border">
		<h3 class="box-title">搜索</h3>
	</div>

	<form class="form-inline search-form">
		<div class="box-body">
			<div class="form-group-line clearfix">
				<div class="form-group col-sm-12">
					<label for="term">年份：</label>
					<div class="input-group">
						<label class="checkbox-inline">
						  <input type="radio" name="deliverRadio" value="" checked="checked"> 全部
						</label>
						<label class="checkbox-inline">
						  <input type="radio" name="deliverRadio" value="not_deliver"> 未配送
						</label>
						<label class="checkbox-inline">
						  <input type="radio" name="deliverRadio" value="delivering"> 已配送
						</label>
					</div>
				</div>
			</div>
			<div class="form-group col-sm-12">
				<label for="keywordInput">搜索：</label>
				<input type="text" class="form-control" id="keywordInput" placeholder="请输入订单编号\学校\准考证号\学生姓名\运单编号的关键字" style="width:500px;">
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
				<th>订单编号</th>
				<th>学校</th>
				<th>准考证号</th>
				<th>收件人姓名</th>
				<th>手机号</th>
				<th>配送地址</th>
				<th>邮政编码</th>
				<th>配送状态</th>
				<th>物流公司</th>
				<th>运单编号</th>
				<th>下单时间</th>
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