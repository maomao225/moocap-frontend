<div class="modal fade">
	<div class="modal-dialog">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
				<h4 class="modal-title"><%=type%>角色</h4>
			</div>
			<form class="form-horizontal group-form" data-mode="<%=mode%>" data-id="<%=id%>">
				<div class="modal-body">
					<div class="form-group">
						<label for="groupNameInput" class="col-sm-3">角色：</label>
						<div class="col-sm-9">
							<input type="text" class="form-control" id="groupNameInput" placeholder="" required="required" value="<%=name%>" maxLength="20">
						</div>
					</div>
					<div class="form-group">
						<label for="groupNameInput" class="col-sm-3">菜单权限：</label>
						<div class="col-sm-9">
							<div class="input-group user-group-table">
								<ul>
									<li class="bg-info">
										<span >菜单</span>
										<ul><li>权限</li></ul>	
									</li>
									<%
									function makeMenu(item, isFisrtLevel){
										var html = "<li><span data-codename=\"" + item.codename + "\">" + item.name+"</span>";

										if(!isFisrtLevel){
											if(item.checked){
												html += "<input type=\"checkbox\" class=\"codename\" checked=\"checked\" value=\""+ item.codename + "\" />"
											}else{
												html += "<input type=\"checkbox\" class=\"codename\" value=\""+ item.codename + "\" />"
											}
										}

										if(_.isArray(item.menu) && item.menu.length > 0){
											html += "<ul>";
											for(var i=0; i<item.menu.length; i++){
												html += makeMenu(item.menu[i], false);
											}
											html += "</ul>";
										}
										
										html += "</li>";
										return html;
									}
									_.each(menus, function(item){%>
										<%= makeMenu(item, true)%>
									<%})%>
								</ul>
							</div>
						</div>
					</div>
					<div class="form-group">
						<label for="school_permission_codename" class="col-sm-3">学校权限：</label>
						<div class="col-sm-9">
							<select id="school_permission_codename" name="school_permission_codename" required="required" class="form-control">
								<%if(mode === 'new'){%>
								<option value="">请选择学校</option>
								<%}%>
								<%_.each(schools, function(item){%>
								<%if(school.codename === item.codename){%>
								<option value="<%=item.codename%>" selected="selected"><%=item.name%></option>
								<%}else{%>
								<option value="<%=item.codename%>"><%=item.name%></option>
								<%}%>
								<%})%>
							</select>
						</div>
					</div>
					<p class="text-danger">只有 课程管理、学生管理、考务管理-考试成绩管理-导出 这三个菜单会受到学校权限设置的影响。</br> 如果学校权限选择某一学校，该角色将仅拥有这一所学校的数据权限；</br>如果学校权限选择全部学校，该角色将拥有所有学校的数据权限。</p>

				</div>
				<div class="modal-footer">
					<button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
					<button type="submit" class="btn btn-primary save">保存</button>
				</div>
			</form>
		</div>
	</div>
</div>