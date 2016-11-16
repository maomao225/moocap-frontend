<div class="row page-menu-buttons">
	<div class="col-sm-5">
		<a class="btn btn-primary new" href="javascript:window.history.go(-1);" role="button">返回</a>
	</div>
	<div class="col-sm-7 text-right">
		
	</div>
</div>
<div class="box">
	<div class="box-header with-border">
		<h3 class="box-title">编辑</h3>
	</div>
	<form class="form-horizontal user-form" method="post">
		<div class="box-body">
			<div class="form-group">
				<label for="groupNameInput" class="col-sm-3">姓名：</label>
				<div class="col-sm-9">
					<input type="text" class="form-control" id="nameInput" name="nameInput" placeholder="" value="<%=model.get('name')%>" maxLength="20">
				</div>
			</div>
			<div class="form-group">
				<label for="groupNameInput" class="col-sm-3">头像：</label>
				<div class="col-sm-9">
					<input type="hidden" id="avatarInput" name="avatarInput" value="<%=model.get('avatar')%>">
					<img width="200" class="avatar-img" src="<%=model.get('avatar')%>" alt="<%=model.get('name')%>">
					<button type="button" class="btn btn-primary fileupload-btn import-data-btn">
						<span>上传新头像</span>
						<input class="upload-avatar fileupload" type="file" name="file">
					</button>
				</div>
			</div>
			<div class="form-group">
				<label class="col-sm-3">性别：</label>
				<div class="col-sm-9 checkbox">
					<label>
						<input type="radio" name="genderRadio" <%if(model.get('gender') === '男'){%>checked="checked"<%}%> value="1">男
					</label>
					<label>
						<input type="radio" name="genderRadio" <%if(model.get('gender') === '女'){%>checked="checked"<%}%> value="2">女
					</label>
				</div>
			</div>
			<div class="form-group">
				<label for="groupNameInput" class="col-sm-3">所属省份：</label>
				<div class="col-sm-9">
					<select type="text" class="form-control province-select" name="provinceSelect" data-role=".city-select">
						<option value="">--- 选择省 ---</option>
						<%_.each(provinceList, function(item){%>
						<%if(item.id === model.get('province').id){%>
						<option selected="selected" value="<%=item.id%>"><%=item.name%></option>
						<%}else{%>
						<option value="<%=item.id%>"><%=item.name%></option>
						<%}%>
						<%})%>
					</select>
				</div>
			</div>
			<div class="form-group">
				<label for="groupNameInput" class="col-sm-3">所属城市：</label>
				<div class="col-sm-9">
					<select type="text" class="form-control city-select" name="citySelect">
						<option value="">--- 选择城市 ---</option>
						<optgroup>
							<%_.each(cityList, function(item){%>
							<%if(item.id === model.get('city').id){%>
							<option selected="selected" value="<%=item.id%>"><%=item.name%></option>
							<%}else{%>
							<option value="<%=item.id%>"><%=item.name%></option>
							<%}%>
							<%})%>
						</optgroup>
					</select>
				</div>
			</div>
			<div class="form-group">
				<label for="groupNameInput" class="col-sm-3">参加考试省份：</label>
				<div class="col-sm-9">
					<select type="text" class="form-control exam-province-select" name="examProvinceSelect" data-role=".exam-city-select">
						<option value="">--- 选择参加考试省份 ---</option>
						<%_.each(provinceList, function(item){%>
						<%if(item.id === model.get('exam_province').id){%>
						<option selected="selected" value="<%=item.id%>"><%=item.name%></option>
						<%}else{%>
						<option value="<%=item.id%>"><%=item.name%></option>
						<%}%>
						<%})%>
					</select>
				</div>
			</div>
			<div class="form-group">
				<label for="groupNameInput" class="col-sm-3">参加考试城市：</label>
				<div class="col-sm-9">
					<select type="text" class="form-control exam-city-select" name="examCitySelect">
						<option value="">--- 选择参加考试城市 ---</option>
						<optgroup>
							<%_.each(examCityList, function(item){%>
							<%if(item.id === model.get('exam_city').id){%>
							<option selected="selected" value="<%=item.id%>"><%=item.name%></option>
							<%}else{%>
							<option value="<%=item.id%>"><%=item.name%></option>
							<%}%>
							<%})%>
						</optgroup>
					</select>
				</div>
			</div>
			<div class="form-group">
				<label class="col-sm-3">学校：</label>
				<div class="col-sm-9">
					<select type="text" class="form-control school-select" name="schoolSelect">
						<option value="">--- 选择学校 ---</option>
						<%_.each(schoolList, function(item){%>
						<%if(item.id === model.get('school').id){%>
						<option selected="selected" value="<%=item.id%>"><%=item.name%></option>
						<%}else{%>
						<option value="<%=item.id%>"><%=item.name%></option>
						<%}%>
						<%})%>
					</select>
				</div>
			</div>
			<div class="form-group">
				<label for="gaokaoYearInput" class="col-sm-3">高考年份：</label>
				<div class="col-sm-9">
					<input type="text" readonly="readonly" class="form-control date-time-picker" id="gaokaoYearInput" name="gaokaoYearInput" required="required" value="<%=model.get('gaokao_year')%>">
				</div>
			</div>
			<div class="form-group">
				<label class="col-sm-3">证件类型：</label>
				<div class="col-sm-9">
					<%
						var identityType = model.get('identity_type'),
							isOther = (identityType != null && identityType.length > 0 && identityType !== '身份证' && identityType !== '护照');
					%>
					<label>
						<input type="radio" name="identityTypeRadio" <%if(identityType === '身份证'){%>checked="checked"<%}%> value="身份证">身份证
					</label>
					<label>
						<input type="radio" name="identityTypeRadio" <%if(identityType === '护照'){%>checked="checked"<%}%> value="护照">护照
					</label>
					<label>
						<input type="radio" class="other-type-radio" name="identityTypeRadio" <%if(isOther){%>checked="checked"<%}%> value="<%= isOther ? identityType : '' %>">其他证件
					</label>
					<input type="text" class="form-control other-type-input" name="otherTypeInput" style="display: inline;width: auto;" value="<%= isOther ? identityType : '' %>">
					<span class="hint text-danger"></span>
				</div>
			</div>
			<div class="form-group">
				<label for="identityInput" class="col-sm-3">证件号：</label>
				<div class="col-sm-9">
					<input type="text" class="form-control" id="identityInput" name="identityInput" value="<%=model.get('identity')%>">
				</div>
			</div>
			<div class="form-group">
				<label for="phoneInput" class="col-sm-3">手机号：</label>
				<div class="col-sm-9">
					<input type="text" class="form-control" id="phoneInput" name="phoneInput" value="<%=model.get('phone')%>">
				</div>
			</div>
			
			<div class="form-group">
				<label for="parentPhoneInput" class="col-sm-3">家长电话：</label>
				<div class="col-sm-9">
					<input type="text" class="form-control" id="parentPhoneInput" name="parentPhoneInput" value="<%=model.get('parent_phone')%>">
				</div>
			</div>
			<div class="form-group">
				<label for="emailInput" class="col-sm-3">邮箱：</label>
				<div class="col-sm-9">
					<input type="text" class="form-control" id="emailInput" name="emailInput" value="<%=model.get('email')%>">
				</div>
			</div>
		</div>
		<div class="box-footer">
			<button type="submit" class="btn btn-primary save pull-right">保存</button>
		</div>
	</form>
</div>