<div class="modal fade">
	<div class="modal-dialog">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
				<h4 class="modal-title">录入考试成绩</h4>
			</div>
			<form class="form-horizontal score-form" data-id="<%=id%>">
				<div class="modal-body">
					<div class="form-group">
						<label for="nameInput" class="col-sm-3">订单编号：</label>
						<div class="col-sm-9">
							<input type="text" class="form-control" id="numberInput" required="required" readonly="readonly" value="<%=model.get('number')%>">
						</div>
					</div>
					<div class="form-group">
						<label for="nameInput" class="col-sm-3">物流公司：</label>
						<div class="col-sm-9">
							<input type="text" class="form-control" id="logisticsCompanyInput" placeholder="" required="required" maxlength="20" value="<%=model.get('logistics_company')%>">
						</div>
					</div>

					<div class="form-group">
						<label for="category" class="col-sm-3">运单编号：</label>
						<div class="col-sm-9">
							<input type="text" class="form-control" id="trackingNumberInput" placeholder="" required="required" maxlength="20" value="<%=model.get('tracking_number')%>">
						</div>
					</div>

				</div>
				<div class="modal-footer">
					<button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
					<button type="submit" class="btn btn-primary save">保存</button>
				</div>
			</form>
		</div>
	</div>
</div>