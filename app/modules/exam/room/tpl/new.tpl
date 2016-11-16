<div class="modal fade">
	<div class="modal-dialog">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
				<h4 class="modal-title"><%=type%>考场</h4>
			</div>
			<form class="form-horizontal examroom-form" data-mode="<%=mode%>" data-id="<%=id%>">
				<div class="modal-body">
					<div class="form-group">
						<label for="nameInput" class="col-sm-3">考场名称：</label>
						<div class="col-sm-9">
							<input type="text" class="form-control" id="nameInput" placeholder="" required="required" maxLength="50" value="<%=mode=='edit' ? model.get('name') : ''%>">
						</div>
					</div>
					<div class="form-group">
						<label class="col-sm-3">省份：</label>
						<div class="col-sm-9">
							<select type="text" class="form-control province-select location-select" data-role=".city-select" data-type="province">
								<option value="">--- 选择省份 ---</option>
								<%if(mode=='edit'){%>
									<%_.each(provinceList, function(item){%>
										<%if(item.id === model.get('province_dict').id){%>
										<option selected="selected" value="<%=item.id%>"><%=item.name%></option>
										<%}else{%>
										<option value="<%=item.id%>"><%=item.name%></option>
										<%}%>
									<%})%>
								<%}else{%>
									<%_.each(provinceList, function(item){%>
									<option value="<%=item.id%>"><%=item.name%></option>
									<%})%>
								<%}%>
							</select>
						</div>
					</div>
					<div class="form-group">
						<label class="col-sm-3">城市：</label>
						<div class="col-sm-9">
							<select type="text" class="form-control city-select location-select" data-role=".district-select" data-type="city">
								<option value="">--- 选择城市 ---</option>
								<optgroup>
								<%if(mode=='edit'){%>
									<%_.each(cityList, function(item){%>
										<%if(item.id === model.get('city_dict').id){%>
										<option selected="selected" value="<%=item.id%>"><%=item.name%></option>
										<%}else{%>
										<option value="<%=item.id%>"><%=item.name%></option>
										<%}%>
									<%})%>
									
								<%}%>
								</optgroup>
							</select>
						</div>
					</div>
					<div class="form-group">
						<label class="col-sm-3">区县：</label>
						<div class="col-sm-9">
							<select type="text" class="form-control district-select location-select" data-type="district">
								<option value="">--- 选择区县 ---</option>
								<optgroup>
								<%if(mode=='edit'){%>
									<%_.each(districtList, function(item){%>
										<%if(item.id === model.get('district_dict').id){%>
										<option selected="selected" value="<%=item.id%>"><%=item.name%></option>
										<%}else{%>
										<option value="<%=item.id%>"><%=item.name%></option>
										<%}%>
									<%})%>
								<%}%>
								</optgroup>
							</select>
						</div>
					</div>
					
					<div class="form-group">
						<label for="addressInput" class="col-sm-3">地址：</label>
						<div class="col-sm-9">
							<input type="text" class="form-control" id="addressInput" placeholder="" required="required" maxLength="50" value="<%=mode=='edit' ? model.get('address') : ''%>">
						</div>
					</div>
					<div class="form-group">
						<label for="addressInput" class="col-sm-3">考点名称：</label>
						<div class="col-sm-9">
							<input type="text" class="form-control" id="kaodiannameInput" placeholder="" required="required" maxLength="50" value="<%=mode=='edit' ? model.get('kaodian_name') : ''%>">
						</div>
					</div>
					<div class="form-group">
						<label for="capacityInput" class="col-sm-3">考生容量：</label>
						<div class="col-sm-9">
							<input type="text" class="form-control" id="capacityInput" placeholder="" required="required" pattern="^[1-9]\d{0,10}$" value="<%=mode=='edit' ? model.get('capacity') : ''%>">
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