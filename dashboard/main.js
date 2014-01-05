if (!window.JSON) {
	window.JSON = {
		parse: function (sJSON) { return eval("(" + sJSON + ")"); },
		stringify: function (vContent) {
			if (vContent instanceof Object) {
				var sOutput = "";
				if (vContent.constructor === Array) {
					for (var nId = 0; nId < vContent.length; sOutput += this.stringify(vContent[nId]) + ",", nId++);
					return "[" + sOutput.substr(0, sOutput.length - 1) + "]";
				}
				if (vContent.toString !== Object.prototype.toString) { return "\"" + vContent.toString().replace(/"/g, "\\$&") + "\""; }
				for (var sProp in vContent) { sOutput += "\"" + sProp.replace(/"/g, "\\$&") + "\":" + this.stringify(vContent[sProp]) + ","; }
				return "{" + sOutput.substr(0, sOutput.length - 1) + "}";
			}
			return typeof vContent === "string" ? "\"" + vContent.replace(/"/g, "\\$&") + "\"" : String(vContent);
		}
	};
}
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
	$.fn.serializeObject = function() {
		var o = {},
			webtags = [],
			webtag = {},
			v = '',
			a = this.serializeArray();
		$.each(a, function() {
			if(this.name === 'label') {
				v = $.trim(this.value);
				if (v) {
					webtag['label'] = v;
				}
			}
			else if (webtag['label']) {
				v = $.trim(this.value);
				if (v) {
					webtag['url'] = v;
					webtags.push(webtag);
					webtag = {};
				}
			}
		});
		if (webtags.length > 0) {
			o['webtags'] = webtags;
			o['type'] = $('.panel input[name="type"]:checked').val();
			o['border'] = $('.panel :checkbox[value="border"]').prop('checked');
		}
		return o;
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
			$($(this).closest('.col-md-8').children('.row:not(:first-child)')).each(function() {
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
		$('#modalExport .modal-title').text(
				$(':checkbox[value="exportType"]').prop('checked') ? 'Export as full code' : 'Export JSON'
		);
		$('#modalExport textarea').text( 
				JSON.stringify($('.col-xs-10 input').serializeObject()) 
		);
		$('#modalExport').modal();
	});
});
