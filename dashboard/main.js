$(function() {
	$.fn.setCheckboxesIndex = function () {
		this.each(function(index) {
			$(this).parent().contents().filter(function() {
				return this.nodeType === 3;
			}).remove();
			$(this).after('#'+(++index));
		});
		return this;
	};
	$.fn.updateButtonValue = function(checked) {
		this.parent().contents().filter(function() {
			return this.nodeType === 3;
		}).remove();
		this.after(checked ? this.data('values')[0] : this.data('values')[1]);
	};
	$('.btn-primary:first').click(function() {
		var row = $('.col-md-8 .row:first').clone(true),
			index = $('.btn-danger').size(),
			checkbox = $(':checkbox', row);
		$('.btn-group', row).remove();
		$('input:not(:checkbox)', row).val('');
		checkbox.prop('checked', false);
		checkbox.parent().contents().filter(function() {
		    return this.nodeType === 3;
		}).remove();
		checkbox.after('#'+index);
		$('.row:first', row).removeClass('hidden');
		row.appendTo('.col-md-8');
		$(window).scrollTop(row.offset().top);
	});
	$('.btn-danger:not(.dropdown-toggle)').on('click', function() {
		if($('.btn-danger').size() > 1) {
			$(this).parents('.row:eq(1)').remove();
			$(':checkbox', $('.col-md-8')).setCheckboxesIndex();
		}
	});
	$('.btn-group .dropdown-menu a').click(function(event) {
		event.preventDefault();
		var index = $(this).parent().index(),
			checkboxes = $(this).closest('.col-md-8').find(':checkbox');
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
			$(':checkbox', $('.col-md-8')).setCheckboxesIndex();
		}
	});
	$('.glyphicon-export')
		.data('values', [' Export as full code', ' Export JSON'])
		.updateButtonValue($(':checkbox[value="exportType"]').prop('checked')); // F5 (page reload) fix
	$(':checkbox[value="exportType"]').click(function() {
		$('.glyphicon-export').updateButtonValue($(this).prop('checked'));
	});
	$('div[role="complementary"]').affix({
		offset: {
			top: 0
		}
	});
	$('.btn-primary:eq(1)').click(function() { // Import
		$('#modalImport').modal();
	});
	$('.btn-primary:eq(2)').click(function() { // Export
		if ($(':checkbox[value="exportType"]').prop('checked')) {
			$('#modalExport .modal-title').text('Export as full code');
		}
		else {
			$('#modalExport .modal-title').text('Export JSON');
		}
		$('#modalExport').modal();
	});
});
