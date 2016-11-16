<ul class="list-group" data-parent="<%=parent%>"  data-type="<%=type%>" data-role="<%=role%>">
	<%_.each(dataList, function(item){%>
	<li class="list-group-item" data-id="<%=item.id%>">
		<div class="pull-right">
			<div class="btn-group">
				<button type="button" class="btn btn-default btn-xs edit">编辑</button>
				<button type="button" class="btn btn-default btn-xs delete">删除</button>
			</div>
		</div>
		<span  data-pk="<%=item.id%>" data-url="<%=url%><%=item.id%>/" id="<%=type%>_<%=item.id%>"><%=item.name%></span>
	</li>
	<%})%>
</ul>