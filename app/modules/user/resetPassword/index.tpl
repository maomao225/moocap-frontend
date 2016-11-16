<div class="box box-primary">
	<div class="box-header with-border">
		<h3 class="box-title">修改密码</h3>
	</div>
	<!-- /.box-header -->
	<!-- form start -->
	<form role="form" class="reset-password-form">
		<div class="box-body">
			<div class="form-group">
				<label for="inputEmail">旧密码</label>
				<input type="password" class="form-control" id="password" name="password" autocomplete="off" maxLength="16" required>
			</div>
			<div class="form-group">
				<label for="inputEmail">新密码</label>
				<input type="password" class="form-control" id="newPassword" autocomplete="off" name="newPassword" maxLength="16" required>
			</div>
			<div class="form-group">
				<label for="inputPassword">确认密码</label>
				<input type="password" class="form-control" id="repeatNewPassword" autocomplete="off" name="repeatNewPassword" required maxLength="16">
			</div>
		</div>
		<!-- /.box-body -->
		<div class="box-footer">
			<button type="submit" class="btn btn-primary">Submit</button>
		</div>
	</form>
</div>