$(function() {
	$('.btn-primary:first').click(function() {
		var row = $('.col-md-8 .row:first').clone(true);
		$('input', row).val('');
		row.appendTo('.col-md-8');
		$('.form-group', row).removeClass('hidden');
	});
	$('.btn-danger').on('click', function() {
		if($('.btn-danger').size() > 1) {
			$(this).parents('.row:eq(1)').remove();
		}
	});
});
