<td><%=student%></td>
<td><%=term%></td>
<td><%=score_num%></td>
<td><%=school%></td>
<td><%=exam_card_num%></td>
<td><%=identity_type%></td>
<td><%=identity%></td>
<td><%=exam%></td>
<td><%=score%></td>
<td><%=grade%></td>
<td>
	<div class="disblock">
	<%if(editable){%>
	<a href="javascript:;" class="edit">编辑</a>
	<%}%>
	
	<% if(certificate){ %>
		<a href="<%=certificate%>" target="_blank">电子版成绩单</a>
	<% } %>
		
	<% if(ATA_certificate){ %>
		<a href="<%=ATA_certificate%>" target="_blank">电子版分析单</a>
	<% } %>
	</div>
</td>