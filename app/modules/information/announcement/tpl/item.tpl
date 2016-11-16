<td><%=category==1 ? '通知' : '公告'%></td>
<td><%-edit_title%></td>
<td><%=publish_time ? moment(publish_time).format('YYYY-MM-DD HH:mm:ss') : ''%></td>
<td>
    <a href="javascript:;" class="edit">编辑</a> |
    <a href="javascript:;" class="delete">删除</a>
    <% if(publish_status == false) { %> | <a href="javascript:;" class="publish">发布</a><% } %>
</td>