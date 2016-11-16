<div class="modal fade">
	<div class="modal-dialog">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
				<h4 class="modal-title"><%=type%>学校</h4>
			</div>
			<form class="form-horizontal user-form" data-mode="<%=mode%>" data-id="<%=id%>">
				<div class="modal-body">
					<div class="form-group">
						<label for="category" class="col-sm-3">学校分类：</label>
						<div class="col-sm-9 checkbox">
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
						<label for="groupNameInput" class="col-sm-3">省份\城市：</label>
						<div class="col-sm-9">
							<select type="text" class="form-control province-select">
								<option value=""></option>
								<%if(mode=='edit'){%>
									<%_.each(provinces, function(item){%>
										<%if(item.id === model.get('province').id){%>
										<option selected="selected" value="<%=item.id%>"><%=item.name%></option>
										<%}else{%>
										<option value="<%=item.id%>"><%=item.name%></option>
										<%}%>
									<%})%>
								<%}else{%>
									<%_.each(provinces, function(item){%>
									<option value="<%=item.id%>"><%=item.name%></option>
									<%})%>
								<%}%>
							</select>

							<select type="text" class="form-control city-select">
								<option value=""></option>
								<%if(mode=='edit'){%>
								<%_.each(cities, function(city){%>
								<%if(city.id === model.get('city').id){%>
								<option value="<%=city.id%>" selected="selected"><%=city.name%></option>
								<%}else{%>
								<option value="<%=city.id%>"><%=city.name%></option>
								<%}%>
								<%});%>
								<%}%>
							</select>
						</div>
					</div>
					<div class="form-group">
						<label for="groupNameInput" class="col-sm-3">学校：</label>
						<div class="col-sm-9">
							<input type="text" class="form-control" id="nameInput" placeholder="" required="required" maxLength="50" value="<%=mode=='edit' ? model.get('name') : ''%>">
						</div>
					</div>
					<div class="form-group">
						<label for="groupNameInput" class="col-sm-3">地址：</label>
						<div class="col-sm-9">
							<input type="text" class="form-control" id="addressInput" placeholder="" required="required" maxLength="50" value="<%=mode=='edit' ? model.get('address') : ''%>">
						</div>
					</div>
					<div class="form-group">
						<label for="groupNameInput" class="col-sm-3">联系人：</label>
						<div class="col-sm-9">
							<input type="text" class="form-control" id="contactInput" placeholder="" required="required" maxLength="20" value="<%=mode=='edit' ? model.get('contact') : ''%>">
						</div>
					</div>
					<div class="form-group">
						<label for="groupNameInput" class="col-sm-3">职务：</label>
						<div class="col-sm-9">
							<input type="text" class="form-control" id="positionInput" placeholder="" required="required" maxLength="20" value="<%=mode=='edit' ? model.get('position') : ''%>">
						</div>
					</div>
					<div class="form-group">
						<label for="groupNameInput" class="col-sm-3">联系电话：</label>
						<div class="col-sm-9">
							<input type="text" class="form-control" id="phoneInput" placeholder="" required="required" pattern="^(\d{3,4}-)?\d{6,8}$|^1[0-9]{10}$" value="<%=mode=='edit' ? model.get('phone') : ''%>">
						</div>
					</div>
					
					<div class="form-group">
						<label for="groupNameInput" class="col-sm-3">邮箱：</label>
						<div class="col-sm-9">
							<input type="email" class="form-control" id="emailInput" placeholder="" required="required" value="<%=mode=='edit' ? model.get('email') : ''%>">
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