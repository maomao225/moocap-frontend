<div class="row page-menu-buttons">
	<div class="col-sm-5">
		<a class="btn btn-default download-template-btn" href="javascript:;" role="button" data-url="<%=ajaxurl.exportDistricts%>">下载导入模板</a>
	</div>
	<div class="col-sm-7 text-right">
		<button type="button" class="btn btn-primary fileupload-btn import-data-btn" data-url="<%=ajaxurl.importDistricts%>">
			<span>导入地区信息</span>
			<input class="fileupload" type="file" name="file">
		</button>
	</div>
</div>

<div class="row">
	<div class="province-list col-sm-4">
		<div class="box"  data-name="省">
			<div class="box-header with-border">
				<h3 class="box-title">省</h3>
				<div class="box-tools pull-right">
					<a class="btn btn-sm export-all-data-btn btn-info" href="javascript:;" role="button" data-url="<%=ajaxurl.exportDistricts%>">导出全部</a> 
	                <button type="button" class="btn btn-info btn-sm add" data-widget="collapse">
	                	<i class="glyphicon glyphicon-plus"></i>增加一个
	                </button>
	            </div>
			</div>
			<div class="box-body" id="province-list"></div>
		</div>
	</div>
	<div class="city-list col-sm-4">
		<div class="box" data-name="市">
			<div class="box-header with-border">
				<h3 class="box-title">市</h3>
				<div class="box-tools pull-right">
					<a class="btn btn-sm export-data-btn btn-info" href="javascript:;" role="button" data-url="<%=ajaxurl.exportDistricts%>">导出</a> 
	                <button type="button" class="btn btn-info btn-sm add" data-widget="collapse">
	                	<i class="glyphicon glyphicon-plus"></i>增加一个
	                </button>
	            </div>
			</div>
			<div class="box-body" id="city-list">
				
			</div>
		</div>
	</div>
	<div class="district-list col-sm-4">
		<div class="box" data-name="区县">
			<div class="box-header with-border">
				<h3 class="box-title">区县</h3>
				<div class="box-tools pull-right">
					<a class="btn btn-sm export-data-btn btn-info" href="javascript:;" role="button" data-url="<%=ajaxurl.exportDistricts%>">导出</a> 
	                <button type="button" class="btn btn-info btn-sm add" data-widget="collapse">
	                	<i class="glyphicon glyphicon-plus"></i>增加一个
	                </button>
	            </div>
			</div>
			<div class="box-body" id="district-list">
				
			</div>
		</div>
	</div>
</div>