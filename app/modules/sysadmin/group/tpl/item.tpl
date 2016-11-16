<td><%=name%></td>
<td>
	<ul>
		<%
		function makeMenu(item){
			var html = "<li><span data-codename=\"" + item.codename + "\">" + item.name+"</span>";
			if(_.isArray(item.menu)&&item.menu.length > 0){
				html += "<ul>";
				for(var i=0; i<item.menu.length; i++){
					html += makeMenu(item.menu[i]);
				}
				html += "</ul>";
			}
			html += "</li>";
			return html;
		}
		_.each(menus, function(item){%>
			<%= makeMenu(item)%>
		<%})%>
	</ul>
</td>
<td data-codename="<%=school_permissions.codename%>"><%=school_permissions.name%></td>
<td>
	<button type="button" class="btn btn-default btn-sm edit">编辑</button>
	<button type="button" class="btn btn-default btn-sm delete">删除</button>
</td>