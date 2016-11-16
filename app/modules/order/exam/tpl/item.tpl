<td><%=number%></td>
<td><%=cost%></td>
<td><%=paid%></td>
<td><%=allStatus[status]%></td>
<td><%=payway%><%=cyber_bank ? '-' + cyber_bank : ''%></td>
<td><%=serial_number%></td>
<td><%=exam_name%></td>
<td><%=student_name%></td>
<td><%=identity_type%></td>
<td><%=identity%></td>
<td><%=(new Date(purchase_time)).toLocaleString()%></td>
<td>
	<%if(status === 'refund-applied'){%>
	<a href="javascript:;" class="refund">退款</a>
	<%}%>
</td>