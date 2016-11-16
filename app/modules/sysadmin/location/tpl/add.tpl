<div class="modal fade">
	<div class="modal-dialog">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
				<h4 class="modal-title">添加 <%=name%></h4>
			</div>
			<form class="form-inline" id="addLocationForm">
				<div class="modal-body">
					<div class="form-group">
						<label for="locationInput">
							<%
							var lable = '';
							_.each(parentsData, function(item){
								label = item.label + '(' + item.name  + ') - '
							%>

							<%=label%>
							<input class="hiddenLocationInput" type="hidden" value="<%=item.value%>" name="<%=item.type%>">
							<%})%>

						</label>
						<input type="text" data-type="<%=type%>" class="form-control" id="locationInput" placeholder="" required="required">
					</div>
				</div>
				<div class="modal-footer">
					<button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
					<button type="submit" class="btn btn-primary add createLocation">保存</button>
				</div>
			</form>
		</div>
	</div>
</div>