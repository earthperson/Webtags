$(function() {
	$('.btn-primary:first').click(function() {
		var row = $('.col-md-8 .row:first').clone(true);
		$('.btn-group', row).remove();
		$('input', row).val('');
		$('input', row).removeProp('checked');
		$('.row:first', row).removeClass('hidden');
		row.appendTo('.col-md-8');
	});
	$('.btn-danger:not(.dropdown-toggle)').on('click', function() {
		if($('.btn-danger').size() > 1) {
			$(this).parents('.row:eq(1)').remove();
		}
	});
	$('.btn-group .dropdown-menu a').click(function(event) {
		event.preventDefault();
		var index = $(this).parent().index();
		var checkboxes = $(this).closest('.col-md-8').find(':checkbox');
		if (index == 0) { // Check all
			checkboxes.prop('checked', true);
		}
		else if (index == 1) { // Uncheck all
			checkboxes.prop('checked', false);
		}
		else if (index == 3) { // Remove checked
			$($(this).closest('.col-md-8').children('.row:not(:first-child)')).each(function(index, Element) {
				if ($(this).has(':checked').length > 0) {
					$(this).remove();
				}
			});
		}
	});
});
