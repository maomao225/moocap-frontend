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
						<label for="nameInput" class="col-sm-3">准考证号：</label>
						<div class="col-sm-9">
							<input type="text" class="form-control" id="examCardNumInput" placeholder="" required="required" readonly="readonly" value="<%=model.get('exam_card_num')%>">
						</div>
					</div>

					<div class="form-group">
						<label for="category" class="col-sm-3">成绩：</label>
						<div class="col-sm-9">
							<input type="text" class="form-control" id="scoreInput" placeholder="" required="required" pattern="100|[1-9][0-9]|[0-9]" value="<%=model.get('score')%>">
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