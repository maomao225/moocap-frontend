<td><%=term%></td>
<td><%=unique_code%></td>
<td><%= online_course.name%></td>
<td><%= online_course.start ? moment(online_course.start).format('YYYY-MM-DD HH:mm') : '' %> - <%= online_course.end ? moment(online_course.end).format('YYYY-MM-DD HH:mm') : '' %></td>
<td><%= student.name%></td>
<td><%= student.province.name + ' ' + student.city.name%></td>
<td><%= student.school.name%></td>
<td><%= student.identity_type%></td>
<td><%= student.identity%></td>
<td><%= exam_card_num%></td>
<td><a href="#exam/online_course_report/print/<%=id%>" target="_blank" data-print-id="<%=id%>">评价单</a></td>