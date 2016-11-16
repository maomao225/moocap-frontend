<div class="modal fade">
	<div class="modal-dialog">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
				<h4 class="modal-title"><%=type%>用户</h4>
			</div>
			<form class="form-horizontal group-form" data-mode="<%=mode%>" data-id="<%=id%>">
				<div class="modal-body">
					<div class="form-group">
						<label for="groupNameInput" class="col-sm-3">开通状态：</label>
						<div class="col-sm-9 checkbox">
							<%if(mode=='edit'){%>
							<label>
								<input type="radio" name="isActive" <%if(model.get('is_active')){%>checked="checked"<%}%> value="true">开通
							</label>
							<label>
								<input type="radio" name="isActive" <%if(!model.get('is_active')){%>checked="checked"<%}%> value="false">关闭
							</label>
							<%}else{%>
							<label>
								<input type="radio" name="isActive" checked="checked" value="true">开通
							</label>
							<label>
								<input type="radio" name="isActive" value="false">关闭
							</label>
							<%}%>

							<%if(mode=='edit'){%>
							<div class="pull-right">
								<button class="reset-password btn btn-default" type="button">重置密码</button>
							</div>
							<%}%>
						</div>
					</div>
					<div class="form-group">
						<label for="groupNameInput" class="col-sm-3">用户姓名：</label>
						<div class="col-sm-9">
							<input type="text" class="form-control" id="nameInput" placeholder="" required="required" value="<%= mode=='edit' ? model.get('name') : ''%>">
						</div>
					</div>
					<div class="form-group">
						<label for="groupNameInput" class="col-sm-3">用户名：</label>
						<div class="col-sm-9">
							<input type="text" <%if(mode=='edit'){%>readonly="readonly"<%}%> class="form-control" id="usernameInput" placeholder="" required="required" value="<%=mode=='edit' ? model.get('username') : ''%>">
						</div>
					</div>
					<div class="form-group">
						<label for="groupNameInput" class="col-sm-3">邮箱：</label>
						<div class="col-sm-9">
							<input type="email" class="form-control" id="emailInput" placeholder="" required="required" value="<%=mode=='edit' ? model.get('email') : ''%>">
						</div>
					</div>
					<div class="form-group">
						<label for="groupNameInput" class="col-sm-3">手机：</label>
						<div class="col-sm-9">
							<input type="text" class="form-control" id="phoneInput" placeholder="" required="required" pattern="[\d]{11}" value="<%=mode=='edit' ? model.get('phone') : ''%>">
						</div>
					</div>
					<div class="form-group">
						<label for="groupNameInput" class="col-sm-3">角色：</label>
						<div class="col-sm-9">
							<table class="table table-bordered">
								<tr>
									<th>角色</th>
									<th>菜单权限</th>
									<th>开通</th>
								</tr>
								<%_.each(groups, function(group){%>
								<tr>
									<td><%=group.name%></td>
									<td>
										<ul>
											<%
											function makeMenu(item){
												var html = "<li><span data-codename=\"" + item.codename + "\">" + item.name+"</span>";
												if(_.isArray(item.menu) && item.menu.length > 0){
													html += "<ul>";
													for(var i=0; i<item.menu.length; i++){
														html += makeMenu(item.menu[i]);
													}
													html += "</ul>";
												}
												html += "</li>";
												return html;
											}
											_.each(group.menus, function(item){%>
												<%= makeMenu(item)%>
											<%})%>
										</ul>
									</td>
									<td>
										<%if (group.checked){%>
										<input type="checkbox" class="group-radio" value="<%=group.id%>" checked="checked" />
										<%}else{%>
										<input type="checkbox" class="group-radio" value="<%=group.id%>" />
										<%}%>
									</td>
								</tr>
								<%})%>
							</table>
						</div>
					</div>
					<% if(mode==='new'){%>
					<div class="form-group">
						<label for="password" class="col-sm-3">密码：</label>
						<div class="col-sm-9">
							<input type="text" value="000000" name="password" id="password" maxlength="20" />
						</div>
					</div>
					<%}%>
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