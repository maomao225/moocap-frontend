<div class="row page-menu-buttons">
	<div class="col-sm-5">
	</div>
	<div class="col-sm-7 text-right">
		<a class="btn btn-primary export-data-btn" href="javascript:;" role="button" data-url="<%=ajaxurl.exportScoreReportOrder%>">导出考试订单信息</a>
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
					<label for="purchaseTimeStartInput">下单时间：</label>
					<div class="row input-group">
						<div class="col-sm-5">
							<input type="text" readonly="readonly" class="form-control form_datetime" id="purchaseTimeStartInput" placeholder="下单开始时间">
						</div>
						<div class="col-sm-1">至</div>
						<div class="col-sm-6">
							<input type="text" readonly="readonly" class="form-control form_datetime" id="purchaseTimeEndInput" placeholder="下单开始时间">
						</div>
					</div>
				</div>
			</div>
			<div class="form-group col-sm-3">
				<label>配送状态：</label>
				<select type="text" class="form-control status-select">
					<option value="">全部</option>
					<%_.each(allDeliverStatus, function(item, i){%>
					<option value="<%=i%>"><%=item%></option>
					<%})%>
				</select>
			</div>
			<div class="form-group col-sm-7">
				<label for="keywordInput">搜索：</label>
				<input type="text" class="form-control" id="keywordInput" placeholder="订单编号\考试科目\证件号\学生姓名" style="width: 300px;">
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
				<th>订单金额</th>
				<th>支付方式</th>
				<th>支付流水号</th>
				<th>配送状态</th>
				<th>考试科目</th>
				<th>学生姓名</th>
				<th>证件类型</th>
				<th>证件号</th>
				<th>下单时间</th>
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