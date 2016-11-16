<div class="modal fade">
	<div class="modal-dialog">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
				<h4 class="modal-title"><%=type%>考试</h4>
			</div>
			<form class="form-horizontal exam-form" data-mode="<%=mode%>" data-id="<%=id%>">
				<div class="modal-body">
					
					<div class="form-group">
						<label class="col-sm-3">年份：</label>
						<div class="col-sm-9">
							<select type="text" class="form-control term-select">
								<option value="">--- 选择年份 ---</option>
								<%if(mode=='edit'){%>
									<%_.each(termList, function(item){%>
										<%if(item.name === model.get('term_name')){%>
										<option selected="selected" value="<%=item.id%>"><%=item.name%></option>
										<%}else{%>
										<option value="<%=item.id%>"><%=item.name%></option>
										<%}%>
									<%})%>
								<%}else{%>
									<%_.each(termList, function(item){%>
									<option value="<%=item.id%>"><%=item.name%></option>
									<%})%>
								<%}%>
							</select>
						</div>
					</div>
					<div class="form-group">
						<label for="groupNameInput" class="col-sm-3">考试科目：</label>
						<div class="col-sm-9">
							<input type="text" class="form-control" id="nameInput" placeholder="" required="required" maxLength="50" value="<%=mode=='edit' ? model.get('name') : ''%>">
						</div>
					</div>
					<div class="form-group">
						<label for="groupNameInput" class="col-sm-3">考试报名时间：</label>
						<div class="col-sm-9">
							<div class="row">
								<div class="col-sm-5">
									<input type="text" class="form-control form_date form_date_start" id="enrollStartInput" placeholder="" required="required" value="<%=mode=='edit' ? model.get('enroll_start') : ''%>">
								</div>
								<div class="col-sm-1">至</div>
								<div class="col-sm-6">
									<input type="text" class="form-control form_date form_date_end" id="enrollEndInput" placeholder="" required="required" value="<%=mode=='edit' ? model.get('enroll_end') : ''%>">
								</div>
							</div>
						</div>
					</div>
					<div class="form-group">
						<label class="col-sm-3">考试补报名时间：</label>
						<div class="col-sm-9">
							<div class="row">
								<div class="col-sm-5">
									<input type="text" class="form-control form_date form_date_start" id="makeupEnrollStartInput" placeholder="" required="required" value="<%=mode=='edit' ? model.get('makeup_enroll_start') : ''%>">
								</div>
								<div class="col-sm-1">至</div>
								<div class="col-sm-6">
									<input type="text" class="form-control form_date form_date_end" id="makeupEnrollEndInput" placeholder="" required="required" value="<%=mode=='edit' ? model.get('makeup_enroll_end') : ''%>">
								</div>
							</div>
						</div>
					</div>
					<div class="form-group">
						<label class="col-sm-3">可申请退款时间：</label>
						<div class="col-sm-9">
							<div class="row">
								<div class="col-sm-5">
									<input type="text" class="form-control form_date form_date_start" id="applyRefundStartInput" placeholder="" required="required" value="<%=mode=='edit' ? model.get('apply_refund_start') : ''%>">
								</div>
								<div class="col-sm-1">至</div>
								<div class="col-sm-6">
									<input type="text" class="form-control form_date form_date_end" id="applyRefundEndInput" placeholder="" required="required" value="<%=mode=='edit' ? model.get('apply_refund_end') : ''%>">
								</div>
							</div>
						</div>
					</div>
					<div class="form-group">
						<label class="col-sm-3">打印准考证时间：</label>
						<div class="col-sm-9">
							<div class="row">
								<div class="col-sm-5">
									<input type="text" class="form-control form_date form_date_start" id="printCardStartInput" placeholder="" required="required" value="<%=mode=='edit' ? model.get('print_card_start') : ''%>">
								</div>
								<div class="col-sm-1">至</div>
								<div class="col-sm-6">
									<input type="text" class="form-control form_date form_date_end" id="printCardEndInput" placeholder="" required="required" value="<%=mode=='edit' ? model.get('print_card_end') : ''%>">
								</div>
							</div>
						</div>
					</div>
					<div class="form-group">
						<label class="col-sm-3">考试时间：</label>
						<div class="col-sm-9">
							<div class="row">
								<div class="col-sm-5">
									<input type="text" class="form-control form_date form_datetime_start" id="examStartInput" placeholder="" required="required" value="<%=mode=='edit' ? moment(model.get('exam_start')).format('YYYY-MM-DD HH:mm') : ''%>">
								</div>
								<div class="col-sm-1">至</div>
								<div class="col-sm-6">
									<input type="text" class="form-control form_date form_datetime_end" id="examEndInput" placeholder="" required="required" value="<%=mode=='edit' ? moment(model.get('exam_end')).format('YYYY-MM-DD HH:mm') : ''%>">
								</div>
							</div>
						</div>
					</div>
					<div class="form-group">
						<label class="col-sm-3">查询成绩时间\申请纸质成绩单时间：</label>
						<div class="col-sm-9">
							<div class="row">
								<div class="col-sm-5">
									<input type="text" class="form-control form_date form_date_start" id="scoreStartInput" placeholder="" required="required" value="<%=mode=='edit' ? model.get('score_start') : ''%>">
								</div>
								<div class="col-sm-1">至</div>
								<div class="col-sm-6">
									<input type="text" class="form-control form_date form_date_end" id="scoreEndInput" placeholder="" required="required" value="<%=mode=='edit' ? model.get('score_end') : ''%>">
								</div>
							</div>
						</div>
					</div>
					<div class="form-group">
						<label for="enrollFeeInput" class="col-sm-3">考试报名费用：</label>
						<div class="col-sm-9">
							<input type="text" class="form-control" id="enrollFeeInput" placeholder="" required="required" maxLength="10" pattern="^([0-9]+|[0-9]{1,3}(,[0-9]{3})*)(.[0-9]{1,2})?$" value="<%=mode=='edit' ? model.get('enroll_fee') : ''%>" <%= mode=='edit'&&(new Date() > new Date(model.get('enroll_start'))) ? 'readonly' : '' %>>
						</div>
					</div>
					<div class="form-group">
						<label for="makeupEnrollFeeInput" class="col-sm-3">考试补报名费用：</label>
						<div class="col-sm-9">
							<input type="text" class="form-control" id="makeupEnrollFeeInput" placeholder="" required="required" maxLength="10" pattern="^([0-9]+|[0-9]{1,3}(,[0-9]{3})*)(.[0-9]{1,2})?$" value="<%=mode=='edit' ? model.get('makeup_enroll_fee') : ''%>" <%= mode=='edit'&&(new Date() > new Date(model.get('makeup_enroll_start'))) ? 'readonly' : '' %>>
						</div>
					</div>
					<div class="form-group">
						<label for="applyPaperFeeInput" class="col-sm-3">申请纸质成绩单费用：</label>
						<div class="col-sm-9">
							<input type="text" class="form-control" id="applyPaperFeeInput" placeholder="" required="required" maxLength="10" pattern="^([0-9]+|[0-9]{1,3}(,[0-9]{3})*)(.[0-9]{1,2})?$" value="<%=mode=='edit' ? model.get('apply_paper_fee') : ''%>">
						</div>
					</div>
					<div class="form-group">
						<label class="col-sm-3">课程ID:</label>
						<div class="col-sm-9">
						<%if(mode=='edit' && model.get('related_xuetangx_courses').length > 0){%>
							<%_.each(model.get('related_xuetangx_courses'), function(one, index){%>
							<% if(index===0){%>
							<input type="text" class="form-control related-course" value="<%=one%>">
							<% }else{%>
							<div class="input-group">
								<input type="text" class="form-control related-course" value="<%=one%>">
								<span class="input-group-btn">
							        <button class="btn btn-default remove-course-id" type="button">
										<span class="glyphicon glyphicon-minus-sign" aria-hidden="true"></span>移除
							        </button>
							    </span>
							</div>
							<%}%>
							<%})%>
						<%}else{%>
							<input type="text" class="form-control related-course" value="">
						<%}%>
						</div>
						<div class="row">
							<span class="col-sm-3"></span>
							<span class="col-sm-9">
								<button class="btn btn-default add-course-id" type="button">
									<span class="glyphicon glyphicon-plus-sign" aria-hidden="true"></span> 添加
						        </button>
							</span>
						</div>
					</div>
				</div>
				<div class="modal-footer">
					<button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
					<button type="submit" class="btn btn-primary save">保存</button>
				</div>
			</form>
		</div>
	</div>
</div>