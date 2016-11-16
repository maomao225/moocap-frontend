<div class="modal fade">
	<div class="modal-dialog">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
				<h4 class="modal-title"><%=type%>通知公告</h4>
			</div>
			<form class="form-horizontal announcement-form" data-mode="<%=mode%>" data-id="<%=id%>">
				<div class="modal-body">
					<div class="form-group">
						<label class="col-sm-3">资讯分类：</label>
						<div class="col-sm-9">
							<%if(mode=='edit'){%>
							<label>
								<input type="radio" name="category" <%if(model.get('category') === 1){%>checked="checked"<%}%> value="1">通知
							</label>
							<label>
								<input type="radio" name="category" <%if(model.get('category') === 2){%>checked="checked"<%}%> value="2">公告
							</label>
							<%}else{%>
							<label>
								<input type="radio" name="category" checked="checked" value="1">通知
							</label>
							<label>
								<input type="radio" name="category" value="2">公告
							</label>
							<%}%>
						</div>
					</div>
					<div class="form-group">
						<label class="col-sm-3">资讯标题：</label>
						<div class="col-sm-9">
							<input type="text" class="form-control" name="edit_title" placeholder="" required="required" value="<%=mode=='edit' ? model.get('edit_title') : ''%>">
						</div>
					</div>
					<div class="form-group">
						<label class="col-sm-12">资讯正文：</label>
						<div class="col-sm-12">
							<textarea class="form-control editor" name="edit_content"><%=mode=='edit' ? model.get('edit_content') : ''%></textarea>
						</div>
					</div>
					<div class="form-group">
                        <div class="col-sm-8 hint text-danger"></div>
                        <div class="col-sm-4 text-right">
                            <button type="button" class="btn btn-primary fileupload-btn">
                                <span>上传附件</span>
                                <input class="fileupload" type="file" name="file">
                            </button>
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