<td><%=term%></td>
<td><%=examroom_name%></td>
<td><%=examroom_address%></td>
<td><%=examroom_kaodian_name%></td>
<td><%=place%></td>
<td><%=exam%></td>
<td><%=province%></td>
<td><%=city%></td>
<td><%=school%></td>
<td><%=student%></td>
<td><%= gender === '2' ? '女' : '男'%></td>
<td><%=identity_type%></td>
<td><%=identity%></td>
<td><%=exam_card_num%></td>
<td><%=exam_start ? moment(exam_start).format('YYYY-MM-DD HH:mm') : ''%></td>
<td><%=exam_end ? moment(exam_end).format('YYYY-MM-DD HH:mm') : ''%></td>
<td><a href="javascript:;" class="edit">编辑</a></td>