<div class="modal fade">
	<div class="modal-dialog">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
				<h4 class="modal-title">添加年份</h4>
			</div>
			<form class="form-horizontal" id="addTermForm">
				<div class="modal-body">
					<div class="form-group">
						<label class="col-sm-3" for="termInput">年份：</label>
						<div class="col-sm-9">
							<input type="text" class="form-control" id="termInput" placeholder="输入年份 例如：2015-2016第一学期" required="required" pattern="\d{4}-\d{4}第(一|二|三|四|五|六|七|八|九)学期">
						</div>
					</div>
				</div>
				<div class="modal-footer">
					<button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
					<button type="submit" class="btn btn-primary">保存</button>
				</div>
			</form>
		</div>
	</div>
</div>