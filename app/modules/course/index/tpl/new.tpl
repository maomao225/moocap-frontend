<div class="modal fade">
	<div class="modal-dialog">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
				<h4 class="modal-title"><%=type%>课程</h4>
			</div>
			<form class="form-horizontal course-form" data-mode="<%=mode%>" data-id="<%=id%>">
				<div class="modal-body">
					<div class="form-group">
						<label for="category" class="col-sm-3">年份：</label>
						<div class="col-sm-9 checkbox">
							<select type="text" class="form-control term-select">
								<option value="">--- 选择年份 ---</option>
								<%if(mode=='edit'){%>
									<%_.each(termList, function(item){%>
										<%if(item.name === model.get('term')){%>
										<option selected="selected" value="<%=item.id%>"><%=item.name%></option>
										<%}else{%>
										<option value="<%=item.id%>"><%=item.name%></option>
										<%}%>
									<%})%>
								<%}else{%>
									<%_.each(termList, function(item){%>
									<option value="<%=item.id%>"><%=item.name%></option>
									<%})%>
								<%}%>
							</select>
						</div>
					</div>
					<div class="form-group">
						<label for="nameInput" class="col-sm-3">开课科目：</label>
						<div class="col-sm-9">
							<select class="form-control" name="nameInput" id="nameInput">
								<option value="">--- 选择科目 ---</option>
							<%_.each(courses, function(item, index){%>
								<%if(mode=='edit'){%>
								<option value="<%=item%>" <%if(item==model.get('name')){%>selected<%}%>><%=item%></option>
								<%}else{%>
								<option value="<%=item%>"><%=item%></option>
								<%}%>
							<%})%>
							</select>
						</div>
					</div>
					<div class="form-group">
						<label for="schoolInput" class="col-sm-3">学校：</label>
						<div class="col-sm-9">
							<select class="form-control" id="schoolInput" required="required">
								<%if(mode=='edit'){%>
									<%_.each(schools, function(item){%>
										<%if(item.id === model.get('school').id){%>
										<option selected="selected" value="<%=item.id%>"><%=item.name%></option>
										<%}else{%>
										<option value="<%=item.id%>"><%=item.name%></option>
										<%}%>
									<%})%>
								<%}else{%>
									<%_.each(schools, function(item){%>
									<option value="<%=item.id%>"><%=item.name%></option>
									<%})%>
								<%}%>
							</select>
							
						</div>
					</div>
					<div class="form-group">
						<label for="teacherInput" class="col-sm-3">教师姓名：</label>
						<div class="col-sm-9">
							<input type="text" class="form-control" id="teacherInput" placeholder="" required="required" maxLength="20" value="<%=mode=='edit' ? model.get('teacher') : ''%>">
						</div>
					</div>
					<div class="form-group">
						<label for="IDNumberInput" class="col-sm-3">身份证号：</label>
						<div class="col-sm-9">
							<input type="text" class="form-control" id="IDNumberInput" pattern="\d{17}X|\d{18}" placeholder="" required="required" value="<%=mode=='edit' ? model.get('ID_number') : ''%>">
						</div>
					</div>
					<div class="form-group">
						<label for="phoneInput" class="col-sm-3">联系方式：</label>
						<div class="col-sm-9">
							<input type="text" class="form-control" id="phoneInput" placeholder="" required="required" pattern="^(\d{3,4}-)?\d{6,8}$|^1[0-9]{10}$" value="<%=mode=='edit' ? model.get('phone') : ''%>">
						</div>
					</div>
					<div class="form-group">
						<label for="emailInput" class="col-sm-3">邮箱：</label>
						<div class="col-sm-9">
							<input type="text" class="form-control" id="emailInput" placeholder="" required="required" value="<%=mode=='edit' ? model.get('email') : ''%>">
						</div>
					</div>
					
					<div class="form-group">
						<label class="col-sm-3">教师认证状态：</label>
						<div class="col-sm-9">
							<%_.each(authenticationStatus, function(item, index){%>
							<label>
								<input type="radio" name="isAuthenticationInput" <%if(mode=='edit' && model.get('authentication_status') === item){%>checked="checked"<%}%> value="<%=index%>"><%=item%>
							</label>
							<%})%>
						</div>
					</div>
					<div class="form-group">
						<label for="enrollmentInput" class="col-sm-3">班级规模：</label>
						<div class="col-sm-9">
							<input type="text" class="form-control" id="enrollmentInput" placeholder="" required="required" maxLength="10" pattern="\d{1,10}" value="<%=mode=='edit' ? model.get('enrollment') : ''%>">
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