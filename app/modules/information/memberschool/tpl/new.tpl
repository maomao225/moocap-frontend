<div class="modal fade">
	<div class="modal-dialog">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
				<h4 class="modal-title"><%=type%>会员学校</h4>
			</div>
			<form class="form-horizontal memberschool-form" data-mode="<%=mode%>" data-id="<%=id%>">
				<div class="modal-body">
					<div class="form-group">
						<label class="col-sm-3">学校分类：</label>
						<div class="col-sm-9">
							<%if(mode=='edit'){%>
							<label>
								<input type="radio" name="category" <%if(model.get('category') === 1){%>checked="checked"<%}%> value="1">中学
							</label>
							<label>
								<input type="radio" name="category" <%if(model.get('category') === 2){%>checked="checked"<%}%> value="2">高校
							</label>
							<%}else{%>
							<label>
								<input type="radio" name="category" checked="checked" value="1">中学
							</label>
							<label>
								<input type="radio" name="category" value="2">高校
							</label>
							<%}%>
						</div>
					</div>
					<div class="form-group">
						<label class="col-sm-3">学校名称：</label>
						<div class="col-sm-9">
							<input type="text" class="form-control" name="name" placeholder="" required="required" value="<%=mode=='edit' ? model.get('name') : ''%>">
						</div>
					</div>
					<div class="form-group">
						<label class="col-sm-3">顺序：</label>
						<div class="col-sm-9">
							<input type="number" class="form-control" name="order" placeholder="" required="required" value="<%=mode=='edit' ? model.get('order') : ''%>">
						</div>
					</div>
					<div class="form-group">
						<label class="col-sm-3">学校图片：</label>
						<div class="col-sm-9">
							<input type="hidden" name="image_url" required="required" value="<%=mode=='edit' ? model.get('image_url') : ''%>">
							<img src="<%=mode=='edit' ? model.get('image_url') : ''%>" alt="" class="modal-img"/>
							<br/>
							<button type="button" class="btn btn-primary fileupload-btn">
								<span>更换学校图片</span>
								<input class="fileupload" type="file" name="file">
							</button>
						</div>
					</div>
					<div class="form-group">
						<div class="col-sm-12 hint text-danger"></div>
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