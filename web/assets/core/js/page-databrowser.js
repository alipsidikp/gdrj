'use strict';

vm.pageTitle("Data Browser");
vm.breadcrumb([{ title: 'Godrej', href: '#' }, { title: 'Data Browser', href: '/databrowser' }]);

viewModel.dataBrowser = new Object();
var db = viewModel.dataBrowser;

db.masterDataBrowser = ko.observableArray([]);
db.metaData = ko.observableArray([]);
db.indexMetaData = ko.observable(0);
db.titleData = ko.observable("");
db.configData = ko.mapping.fromJS({});

db.getMasterDataBrowser = function () {
	db.masterDataBrowser([]);

	app.ajaxPost('/databrowser/getdatabrowsers', {}, function (res) {
		if (!app.isFine(res)) {
			return;
		}

		db.masterDataBrowser(res.data);
	}, function (err) {
		app.showError(err.responseText);
	}, {
		timeout: 5000
	});
};
db.createDataBrowser = function (dataItem) {
	// let table = dataItem._id

	app.ajaxPost("/databrowser/getdatabrowser", { tablename: dataItem }, function (res) {
		if (!app.isFine(res)) {
			return;
		}

		if (!res.data) {
			res.data = [];
		}

		$('#grid-databrowser-decription').ecDataBrowser({
			title: "",
			widthPerColumn: 6,
			showFilter: "Simple",
			dataSource: {
				url: "/databrowser/getdatabrowser",
				type: "post",
				callData: { tablename: dataItem },
				fieldTotal: "DataCount",
				fieldData: "DataValue",
				serverPaging: true,
				pageSize: 10,
				serverSorting: true,
				callOK: function callOK(res) {
					// console.log(res)
				}
			},
			metadata: res.data.dataresult.MetaData
		});
		var metadata = res.data.dataresult.MetaData;
		for (var i in metadata) {
			metadata[i]['value'] = '';
			db.metaData.push(ko.mapping.fromJS(metadata[i]));
		}
		db.titleData(res.data.dataresult.TableNames);

		// hack the position
		db.cleanLeftFilter();
		db.renderLeftFilter();
	}, {
		timeout: 10 * 1000
	});
};

db.selectEditData = function (data) {
	$('#modalUpdate').modal('show');
	$.each(data, function (key, value) {
		for (var a in db.metaData()) {
			if (db.metaData()[a].Field() == key) db.metaData()[a].value(value);
		}
	});
	ko.mapping.fromJS(data, db.configData);
};

db.editDataBrowser = function () {
	var postdata = {};
	postdata['tablename'] = db.titleData();
	for (var a in db.metaData()) {
		postdata[db.metaData()[a].Field()] = db.metaData()[a].value();
	}
	app.ajaxPost("/databrowser/editdatabrowser", postdata, function (res) {
		if (!app.isFine(res)) {
			return;
		}
		$('#modalUpdate').modal('hide');
		db.createDataBrowser(db.titleData());
	});
};
db.cleanRightGrid = function () {
	$('#grid-databrowser-decription').replaceWith('<div id="grid-databrowser-decription"></div>');
};
db.cleanLeftFilter = function () {
	$('.panel-filter .ecdatabrowser-filtersimple').remove();
};
db.renderLeftFilter = function () {
	$("#from-filter").find(".ecdatabrowser-filtersimple").remove();
	var $filter = $('.ecdatabrowser-filtersimple');
	$filter.insertAfter($('.form-group-table-name')).removeClass('col-md-12').addClass('form-group on-left').children().each(function (i, e) {
		var $inputGroup = $(e).removeClass('col-md-6').addClass('input-group input-group-sm ez width-full');

		var $label = $inputGroup.find('.ecdatabrowser-filter');
		var $newLabel = $('<span />').addClass('input-group-addon ecdatabrowser-filter align-right width-100').html($label.text());

		$label.replaceWith($newLabel);

		$(e).find('.filter-form').removeClass('col-md-9');
	});

	$('<p />').text('Filter shown data.').prependTo($filter);
	$('<div />').addClass('clearfix').appendTo($filter);
};
db.renderRightFilter = function () {};

db.selectedTableName = ko.computed(function () {
	if (db.masterDataBrowser().length == 0) {
		return '';
	}

	var row = db.masterDataBrowser().find(function (d) {
		return d._id == db.selectedTableID();
	});
	if (row == undefined) {
		return '';
	}

	return row.TableNames;
}, db);
db.selectedTableID = ko.observable('');
db.selectTable = function (e) {
	db.cleanLeftFilter();
	var dataItem = this.dataItem(e.item);

	if (dataItem._id == '') {
		db.cleanLeftFilter();
		db.cleanRightGrid();
	} else {
		db.cleanRightGrid();
		db.createDataBrowser(dataItem._id);
	}
};

db.refreshDataBrowser = function () {
	$('#grid-databrowser-decription').ecDataBrowser("postDataFilter");
};

$(function () {
	db.getMasterDataBrowser();
	$("#modalUpdate").insertAfter("body");
});