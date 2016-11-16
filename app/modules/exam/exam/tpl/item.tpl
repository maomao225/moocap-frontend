<td><%=term_name%></td>
<td><%=name%></td>
<td><%=enroll_start%> - <%=enroll_end%></td>
<td><%=makeup_enroll_start%> - <%=makeup_enroll_end%></td>
<td><%=apply_refund_start%> - <%=apply_refund_end%></td>
<td><%=print_card_start%> - <%=print_card_end%></td>
<td><%= exam_start ? moment(exam_start).format('YYYY-MM-DD HH:mm') : '' %> - <%= exam_end ? moment(exam_end).format('YYYY-MM-DD HH:mm') : '' %></td>
<td><%=score_start%> - <%=score_end%></td>
<td><%=enroll_fee%></td>
<td><%=makeup_enroll_fee%></td>
<td><%=apply_paper_fee%></td>
<td><a href="javascript:;" class="edit">编辑</a> | <a href="javascript:;" class="delete">删除</a></td>