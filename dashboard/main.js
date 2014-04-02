/*
 * Webtags v0.1.3-alpha1, Dashboard for webtags v1.0.2-alpha1 
 * Webtags GitHub page: https://github.com/earthperson/Webtags
 * Dashboard for webtags: http://earthperson.github.io/Webtags/dashboard/
 * Author website: http://earthperson.info
 * 
 * Copyright (c) 2013 Dmitry Ponomarev (email: ponomarev.dev@gmail.com) 
 * Licensed under the MIT License: http://www.opensource.org/licenses/mit-license.php
 */
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
			items = [],
			item = {},
			v = '',
			a = this.serializeArray();
		$.each(a, function() {
			if(this.name === 'label') {
				v = $.trim(this.value);
				if (v) {
					item['label'] = v;
				}
			}
			else if (item['label']) {
				v = $.trim(this.value);
				if (v) {
					item['url'] = v;
					items.push(item);
					item = {};
				}
			}
		});
		if (items.length > 0) {
			o['items'] = items;
			o['type'] = $('.panel input[name="type"]:checked').val();
			o['border'] = $('.panel :checkbox[value="border"]').prop('checked');
		}
		return o;
	};
	$.fn.validate = function() {
		var re = $(this).attr('type') == 'text' ? /.{1,}/ : /\..{1,}$/;
		if (!re.test($(this).val())) {
			$(this).parent().addClass('has-error');
		}
		else {
			$(this).parent().removeClass('has-error');
		}
		return this;
	};
	function stripTags(str){
		return str.replace(/<\/?[^>]+>/gi, '');
	}
	$.fn.setLaunchAble = function() {
		var o = $('.col-xs-10 .form-group:not(.has-error)').children('input').serializeObject();
		if (o instanceof Object && o['items']) {
			$('.col-md-4 .btn-primary:last').removeAttr('disabled'); // Export
			$('.col-md-4 .btn-success:last').removeAttr('disabled'); // Launch
		}
		else {
			$('.col-md-4 .btn-primary:last').attr('disabled','disabled'); // Export
			$('.col-md-4 .btn-success:last').attr('disabled','disabled'); // Launch
		}
		return this;
	}
	$('.col-md-4 .btn-primary:first').click(function() {
		var row = $('.col-md-8 .row:first').clone(true),
			index = $('.btn-danger').size(),
			checkbox = $(':checkbox', row);
		$('.btn-group', row).remove();
		$('input:not(:checkbox)', row).val('').parent().removeClass('has-error');
		checkbox.prop('checked', false).parent().contents().filter(function() {
		    return this.nodeType === 3;
		}).remove();
		checkbox.after('#'+index);
		$('.row:first', row).removeClass('hidden');
		row.appendTo('.col-md-8');
		$(window).scrollTop(row.offset().top);
	});
	$('.btn-danger:not(.dropdown-toggle)').on('click', function() { // Remove
		if($('.btn-danger').size() > 1) {
			$(this).parents('.row:eq(1)').remove();
			$(':checkbox', $('.col-md-8')).setCheckboxesIndex().setLaunchAble();
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
			$(':checkbox', $('.col-md-8')).setCheckboxesIndex().setLaunchAble();
		}
		else if (index == 4) { // Empty checked
			$('.col-md-8 .row:has(:checked):not(:first) input:not(:checkbox)').val('').parent().removeClass('has-error').setLaunchAble();
		}
		else if (index == 6) { // Empty all
			$('.col-md-8 .row input:not(:checkbox)').val('').parent().removeClass('has-error').setLaunchAble();
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
	$('.col-xs-10 input').keyup(function() {
		$(this).validate().setLaunchAble();
	});
	$('.col-xs-10 input').change(function() {
		var v = $.trim($(this).val());
		$(this).val(v).validate().setLaunchAble();
	});
	$('.col-xs-10 input[type="url"]').change(function() {
		var v = $.trim($(this).val());
		if(v && !/^.*?:\/\//.test(v)) {
			$(this).val('http://'+v);
		}
	});
	var modalImportBody = $('#modalImport .modal-body').html();
	$('.col-md-4 .btn-primary:eq(1)').click(function() { // Import
		$('#modalImport .modal-body').html(modalImportBody);
		$('#modalImport').modal();
		$(this).addClass('active');
		$('#modalImport').on('hidden.bs.modal', function (e) {
			$('.col-md-4 .btn-primary:eq(1)').removeClass('active');
		});
	});
	$('.modal .btn-primary').click(function() {
		var data = $('#modalImport textarea').val();
		try {
			data = JSON.parse($.trim(stripTags(data).replace(/new Webtags\(((.*\s*)*)\);/i, '$1')));
			$('#modalImport').modal('hide');
			$('.btn-group .dropdown-menu li:eq(0) a').click();
			$('.btn-group .dropdown-menu li:eq(3) a').click();
			$('.panel input[name="type"]').filter('input[value="'+data.type+'"]').prop('checked', true);
			$('.panel :checkbox[value="border"]').prop('checked', data.border);
			var inputs = $('.col-md-8 .row:last input:not(:checkbox)'),
			    i = 0,
			    n = data.items.length;
			for(; i < n; i++) {
				if (i > 0) {
					$('.col-md-4 .btn-primary:first').click();
					inputs = $('.col-md-8 .row:last input:not(:checkbox)');
				}
				$(inputs).first().val(data.items[i].label).validate().setLaunchAble();
				$(inputs).last().val(data.items[i].url).validate().setLaunchAble();
			}
		}
		catch (e) {
			$('#modalImport .modal-body').html('<div class="alert alert-danger">Incorrect format.</div>');
		}
	});
	$('.col-md-4 .btn-primary:last').click(function() { // Export
		$('#modalExport .modal-title').text(
				$(':checkbox[value="exportType"]').prop('checked') ? 'Export as full code' : 'Export JSON'
		);
		var t = JSON.stringify($('.col-xs-10 .form-group:not(.has-error)').children('input').serializeObject());
		if($(':checkbox[value="exportType"]').prop('checked')) {
			t = "<script type=\"text/javascript\" src=\"render.min.js\"></script>\n"+
				"<script type=\"text/javascript\">\n"+
				"new Webtags("+t+");\n"+
				"</script>\n";
		}
		$('#modalExport textarea').text(t).focus(function() {
			var $this = $(this);
			$this.select();
			$this.mouseup(function(event) {
				event.preventDefault();
				// Prevent further mouseup intervention
				$this.unbind('mouseup');
			});
		});
		$('#modalExport').modal();
		$(this).addClass('active');
		$('#modalExport').on('hidden.bs.modal', function (e) {
			$('.col-md-4 .btn-primary:last').removeClass('active');
		});
	});
	$('.col-md-4 .btn-success:last').click(function() { // Launch
		var o = $('.col-xs-10 .form-group:not(.has-error)').children('input').serializeObject();
		if (o instanceof Object && o['items']) {
			$('#modalLaunch').modal();
			$(this).addClass('active');
			$('#modalLaunch').on('hidden.bs.modal', function (e) {
				$('.col-md-4 .btn-success:last').removeClass('active');
			});
			new Webtags(o);
		}
	});
});
