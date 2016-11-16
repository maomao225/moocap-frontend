<div class="modal fade">
	<div class="modal-dialog">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
				<h4 class="modal-title">编辑考场分配</h4>
			</div>
			<form class="form-horizontal distribution-form" data-id="<%=id%>">
				<div class="modal-body">

					<div class="form-group">
						<label for="category" class="col-sm-3">考场名称：</label>
						<div class="col-sm-9 checkbox">
							<select type="text" class="form-control examroom-select">
								<option>--- 选择考场 ---</option>
									<%_.each(examroomList, function(item){%>
										<%if(item.id === model.get('examroom')){%>
										<option selected="selected" value="<%=item.id%>"><%=item.name%></option>
										<%}else{%>
										<option value="<%=item.id%>"><%=item.name%></option>
										<%}%>
									<%})%>
							</select>
						</div>
					</div>
					<div class="form-group">
						<label for="nameInput" class="col-sm-3">座位号：</label>
						<div class="col-sm-9">
							<input type="text" class="form-control" id="placeInput" placeholder="" required="required" pattern="[\d]{1,10}" maxLength="10" value="<%=model.get('place')%>">
						</div>
					</div>

					<div class="form-group">
						<label for="category" class="col-sm-3">考试科目：</label>
						<div class="col-sm-9 checkbox">
							
							<input type="text" class="form-control" id="placeInput" readonly="readonly" placeholder="" required="required" value="<%=model.get('exam')%>">
						</div>
					</div>

					<div class="form-group">
						<label for="examCardNumInput" class="col-sm-3">准考证号：</label>
						<div class="col-sm-9">
							<input type="text" class="form-control" id="examCardNumInput" placeholder="" required="required" readonly="readonly" value="<%=model.get('exam_card_num')%>">
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