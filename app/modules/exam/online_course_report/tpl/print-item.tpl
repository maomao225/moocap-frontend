<article>
	<div class="item-header">
		<div class="logo">
			<div class="logo-main">
				<img src="//storage.xuetangx.com/public_assets/xuetangx/images/e1add10bbaedfe4708adeb59a1f64a42.moocap.jpg" />
				<aside>
					<p>大学先修课在线学习绩效评价单</p>
					<p>由教育部在线教育研究中心指导</p>
					<p>学堂在线慕课平台提供数据和技术支持</p>
				</aside>
			</div>
			<div class="logo-des">
				<p>编号:  <%= unique_code%></p>
				<p><img src="//storage.xuetangx.com/public_assets/xuetangx/images/e3ba08abcf0275d31c63833af262cfec.zizhu.png"></p>
			</div>
		</div>

		<table class="table-summary">
			<tr>
				<th width="11%">
					<img src="<%= student.avatar%>" style="width:100%;height:138px;">
				</th>
				<th width="32.3%">
					<p class="person-info">准考证&emsp;<%=  exam_card_num%></p>
					<p class="person-info">地&emsp;区&emsp;<%= student.province.name + ' ' + student.city.name%></p>
					<p class="person-info">学&emsp;校&emsp;<%= student.school.name%></p>
				</th>
				<th>
					<h6>学习偏好</h6>
					<div class="bar">
						<dl>
							<dt><img src="//storage.xuetangx.com/public_assets/xuetangx/images/b2da79cd695ae7aa207efbe0a9eb4e77.red.png"><em><%= habbit.SJ.name%></em><span><%= habbit.SJ.value%></span></dt>
							<dd>占 <%= habbit.SJ.percent%>%</dd>
						</dl>
						<dl>
							<dt><img src="//storage.xuetangx.com/public_assets/xuetangx/images/e70722954e3992f63d7fe85f8ebdbc91.orange.png"><em><%= habbit.TR.name%></em><span><%= habbit.TR.value%></span></dt>
							<dd>占 <%= habbit.TR.percent%>%</dd>
						</dl>
						<dl>
							<dt><img src="//storage.xuetangx.com/public_assets/xuetangx/images/eb652613d61bf3df9d864124dbd699db.yellow.png"><em><%= habbit.JL.name%></em><span><%= habbit.JL.value%></span></dt>
							<dd>占 <%= habbit.JL.percent%>%</dd>
						</dl>
						<dl>
							<dt><img src="//storage.xuetangx.com/public_assets/xuetangx/images/f787090af421c14b58044302f05bebab.green.png"><em><%= habbit.XL.name%></em><span><%= habbit.XL.value%></span></dt>
							<dd>占 <%= habbit.XL.percent%>%</dd>
						</dl>
						<dl>
							<dt><img src="//storage.xuetangx.com/public_assets/xuetangx/images/5d74e1b2a21e909bbd3c24ab55c62e36.blue.png"><em><%= habbit.JZ.name%></em><span><%= habbit.JZ.value%></span></dt>
							<dd>占 <%= habbit.JZ.percent%>%</dd>
						</dl>
					</div>
				</th>
				<th width="15%">
					<h6>学习成绩</h6>
					<span class="score"><%=summary.grade%></span>
					<div class="des">前 <%=summary.rank%></div>
				</th>
			</tr>
			<tr>
				<td>姓名&nbsp;&nbsp;<strong><%= student.name%></strong></td>
				<td><%= student.identity_type%>&nbsp;&nbsp;<strong><%= student.identity%></strong></td>
				<td>课程&nbsp;&nbsp;<strong><%= online_course.name%></strong></td>
				<td>认证年份&nbsp;&nbsp;<strong><%= authentication%></strong></td>
			</tr>
		</table>

		<table class="table-content">
			<tr>
				<th width="11%">学习偏好</th>
				<th width="32%">类型</th>
				<th colspan="2">说明</th>
			</tr>
			<tr>
				<td><%= habbit.SJ.name%></td>
				<td><div class="chart-sj" style="width:<%= canvas.width%>px;height:<%= canvas.height%>px;"></div></td>
				<td colspan="2"><%= habbit.SJ.desc %></td>
			</tr>
			<tr>
				<td><%= habbit.TR.name%></td>
				<td><div class="chart-tr" style="width:<%= canvas.width%>px;height:<%= canvas.height%>px;"></div></td>
				<td colspan="2"><%= habbit.TR.desc %></td>
			</tr>
			<tr>
				<td><%= habbit.JL.name%></td>
				<td><div class="chart-jl" style="width:<%= canvas.width%>px;height:<%= canvas.height%>px;"></div></td>
				<td colspan="2"><%= habbit.JL.desc %></td>
			</tr>
			<tr>
				<td><%= habbit.XL.name%></td>
				<td><div class="chart-xl" style="width:<%= canvas.width%>px;height:<%= canvas.height%>px;"></div></td>
				<td colspan="2"><%= habbit.XL.desc %></td>
			</tr>
			<tr>
				<td><%= habbit.JZ.name%></td>
				<td><div class="chart-jz" style="width:<%= canvas.width%>px;height:<%= canvas.height%>px;"></div></td>
				<td colspan="2"><%= habbit.JZ.desc %></td>
			</tr>
			<tr>
				<th>学习成绩<sup>[1]</sup></th>
				<th>得分</th>
				<th colspan="2">说明</th>
			</tr>
			<tr>
				<td><p><%= grade.result.name%></p><p> ( 0 - 50 分 )</p></td>
				<td><div class="chart-result" style="width:<%= canvas.width%>px;height:<%= canvas.height%>px;"></div><span class="count"><%= grade.result.value%></span></td>
				<td colspan="2"><%= grade.result.desc %></td>
			</tr>
			<tr>
				<td><p><%= grade.exam.name%></p><p> ( 0 - 20 分 )</p></td>
				<td><div class="chart-exam" style="width:<%= canvas.width%>px;height:<%= canvas.height%>px;"></div><span class="count"><%= grade.exam.value%></span></td>
				<td colspan="2"><%= grade.exam.desc %></td>
			</tr>
			<tr>
				<td><p><%= grade.homework.name%></p><p> ( 0 - 30 分 )</p></td>
				<td><div class="chart-homework" style="width:<%= canvas.width%>px;height:<%= canvas.height%>px;"></div><span class="count"><%= grade.homework.value%></span></td>
				<td colspan="2"><%= grade.homework.desc %></td>
			</tr>
			<tr>
				<th>其他参考</th>
				<th>得分</th>
				<th colspan="2">说明</th>
			</tr>
			<tr>
				<td><p><%= ref.speed.name%></p><p> ( 0 - 10 分 )</p></td>
				<td><div class="chart-speed" style="width:<%= canvas.width%>px;height:<%= canvas.height%>px;"></div><span class="count"><%= ref.speed.value%></span></td>
				<td colspan="2"><%= ref.speed.desc %></td>
			</tr>
			<tr>
				<td><p><%= ref.effect.name%></p><p> ( 0 - 10 分 )</p></td>
				<td><div class="chart-effect" style="width:<%= canvas.width%>px;height:<%= canvas.height%>px;"></div><span class="count"><%= ref.effect.value%></span></td>
				<td colspan="2"><%= ref.effect.desc %></td>
			</tr>
		</table>

		<aside>
			<em>注释</em>
			<ul>
				<li>[1]学习成绩，由结果性成绩、测试行为和作业行为三部分成绩综合得出。学习成绩总分为100分，其中结果性成绩占50分；测试行为占20分；作业行为占30分。</li>
				<li>[2]效能，即“正确率/花费时间”。具体计算逻辑为：每次作业效能满分100，与平均作业正确率/花费时间进行比较，划入五个等级，最终的作业效能成绩为每次作业效能成绩的平均分。</li>
			</ul>
		</aside>
	</div>
</article>