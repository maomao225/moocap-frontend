<div class="modal fade">
	<div class="modal-dialog">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
				<h4 class="modal-title">编辑考试信息</h4>
			</div>
			<form class="form-horizontal examinfo-form" data-mode="<%=mode%>" data-id="<%=id%>">
				<div class="modal-body">
					<div class="form-group">
						<div class="col-sm-12">
							<textarea class="form-control editor" name="content"><%= mode=='edit' ? model.content : '' %></textarea>
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