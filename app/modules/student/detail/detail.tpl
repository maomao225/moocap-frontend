<div class="row page-menu-buttons">
	<div class="col-sm-5">
		<a class="btn btn-primary back" href="javascript:;" role="button">返回学生列表页</a>
	</div>
	<div class="col-sm-7 text-right">
		<a class="btn btn-primary edit" href="javascript:;" role="button">编辑学生信息</a>
	</div>
</div>
<div class="box">
	<div class="box-header with-border">
		<h3 class="box-title">详细</h3>
	</div>
	<div class="box-body">
		<div class="pull-right">
			<img width="200" src="<%=model.get('avatar')%>" />
		</div>
		<dl class="dl-horizontal">
			<dt>学生姓名：</dt>
			<dd><%=model.get('name')%></dd>
			<dt>性别：</dt>
			<dd><%=model.get('gender')%></dd>
			<dt>所属省份：</dt>
			<dd><%=model.get('province').name%></dd>
			<dt>所属城市：</dt>
			<dd><%=model.get('city').name%></dd>
			<dt>参加考试省份：</dt>
			<dd><%=model.get('exam_province').name%></dd>
			<dt>参加考试城市：</dt>
			<dd><%=model.get('exam_city').name%></dd>
			<dt>学校：</dt>
			<dd><%=model.get('school').name%></dd>
			<dt>高考年份：</dt>
			<dd><%=model.get('gaokao_year')%></dd>
			<dt>证件类型：</dt>
			<dd><%=model.get('identity_type')%></dd>
			<dt>证件号：</dt>
			<dd><%=model.get('identity')%></dd>
			<dt>手机号：</dt>
			<dd><%=model.get('phone')%></dd>
			<dt>家长电话：</dt>
			<dd><%=model.get('parent_phone')%></dd>
			<dt>邮箱：</dt>
			<dd><%=model.get('email')%></dd>
			<dt>注册时间</dt>
			<dd><%=model.get('date_joined')%></dd>
		</dl>
	</div>
	<div class="box-footer">
	</div>
</div>