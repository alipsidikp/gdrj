'use strict';

vm.currentMenu('Administration');
vm.currentTitle("Session");
vm.breadcrumb([{ title: 'Godrej', href: '#' }, { title: 'Administration', href: '#' }, { title: 'Session', href: '/session' }]);

viewModel.Session = new Object();
var ss = viewModel.Session;

ss.templateFilter = {
    search: ""
};

ss.TableColumns = ko.observableArray([{ field: "status", title: "" }, { field: "loginid", title: "Username" }, { field: "created", title: "Created", template: '# if (created == "0001-01-01T00:00:00Z") {#-#} else {# #:moment(created).utc().format("DD-MMM-YYYY HH:mm:ss")# #}#' }, { field: "expired", title: "Expired", template: '# if (expired == "0001-01-01T00:00:00Z") {#-#} else {# #:moment(expired).utc().format("DD-MMM-YYYY HH:mm:ss")# #}#' }, { field: "duration", title: "Active In", template: '#= kendo.toString(duration, "n2")# H' }, { title: "Action", width: 80, attributes: { class: "align-center" }, template: "#if(status=='ACTIVE'){# <button data-value='#:_id #' onclick='ses.setexpired(\"#: _id #\", \"#: loginid #\")' name='expired' type='button' class='btn btn-sm btn-default btn-text-danger btn-stop tooltipster' title='Set Expired'><span class='fa fa-times'></span></button> #}else{# #}#" }]);

ss.selectedTableID = ko.observable("");
ss.filter = ko.mapping.fromJS(ss.templateFilter);

ss.refreshData = function () {
    $('.grid-session').data('kendoGrid').dataSource.read();
};

ss.setexpired = function (_id, username) {
    var param = { _id: _id,
        username: username };
    app.ajaxPost("/session/setexpired", param, function (res) {
        if (!app.isFine(res)) {
            return;
        }

        ss.refreshData();
        location.reload();
    });
};

ss.generateGrid = function () {
    $(".grid-session").html("");
    $('.grid-session').kendoGrid({
        dataSource: {
            transport: {
                read: {
                    url: "/session/getsession",
                    dataType: "json",
                    data: ko.mapping.toJS(ss.filter),
                    type: "POST",
                    success: function success(data) {
                        $(".grid-group>.k-grid-content-locked").css("height", $(".grid-group").data("kendoGrid").table.height());
                    }
                }
            },
            schema: {
                data: function data(res) {
                    ss.selectedTableID("show");
                    app.loader(false);
                    return res.data.Datas;
                },
                total: "data.total"
            },

            pageSize: 10,
            serverPaging: true, // enable server paging
            serverSorting: true
        },
        // selectable: "multiple, row",
        // change: ac.selectGridAccess,
        resizable: true,
        scrollable: true,
        // sortable: true,
        // filterable: true,
        pageable: {
            refresh: false,
            pageSizes: 10,
            buttonCount: 5
        },
        columns: ss.TableColumns()
    });
};

$(function () {
    ss.generateGrid();
});