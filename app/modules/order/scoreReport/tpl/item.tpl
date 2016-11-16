<td><%=number%></td>
<td><%=cost%></td>
<td><%=payway%><%=cyber_bank ? '-' + cyber_bank : ''%></td>
<td><%=serial_number%></td>
<td><%=allDeliverStatus[deliver_status]%></td>
<td><%=exam_name%></td>
<td><%=student_name%></td>
<td><%=identity_type%></td>
<td><%=identity%></td>
<td><%=(new Date(purchase_time)).toLocaleString()%></td>