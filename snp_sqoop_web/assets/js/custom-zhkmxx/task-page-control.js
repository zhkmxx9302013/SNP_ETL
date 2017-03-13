/**
 * Created by zhao on 2017/3/12.
 */

$(document).ready(function () {

    dataTableControl();
    datePickControl();
    isIncreamentContorl();
    isDateIncreamentContorl();
    isColIncreamentContorl();
});

function dataTableControl() {
    $('#dataTables-example').dataTable({
        pagingType: 'full',
        "lengthMenu": [10,15,20],
        "autoWidth": true,
        scroller: false,
        "columnDefs": [
            { "width": "30px", "targets": 0 },
            { "width": "90px", "targets": 1 }
        ],
        "columns": [
            {
                "sClass": "text-center",
//                    "data": "ID",
                "render": function (data, type, full, meta) {
                    return '<input type="checkbox"  class="checkchild"  />';
                },
                "bSortable": false
            }
//                { "data": "ID" },
//                { "data": "tableName" }

        ],
        language: {
            "decimal":        "",
            "emptyTable":     "该数据库无任何表信息",
            "info":           "_START_ - _END_ 条，共 _TOTAL_ 条",
            "infoFiltered":   "",
            "infoPostFix":    "",
            "thousands":      ",",
            "lengthMenu":     "每页 _MENU_ 项",
            "loadingRecords": "正在加载数据...",
            "processing":     "正在处理...",
            "search":         "搜索:",
            "zeroRecords":    "没有找到该表",

            "paginate": {
                "first":      "<<",
                "last":       ">>",
                "next":       ">",
                "previous":   "<"
            },
            "aria": {
                "sortAscending":  ": activate to sort column ascending",
                "sortDescending": ": activate to sort column descending"
            }
        }
    });
}

function datePickControl(){
    $(".date_picker").flatpickr({
        enableTime: true,
        weekNumbers: true,
        altInput: true
    });
}

function isIncreamentContorl() {
    $('#increament_block').hide();
    $("#is_Increament").click(function() {
        if ($("#is_Increament").is(":checked")) {
            $("#increament_mode_date").active
            $('#increament_block').show();
        } else {
            $('#increament_block').hide();
        }
    });
}


function isDateIncreamentContorl() {
    $('#date-time-div').hide();
    $("#increament_mode_date").click(function() {
        if ($("#increament_mode_date").is(":checked")) {
            $("#increament_mode_colval").attr("checked", false);
            $('#date-time-div').show();
            $('#col-val-div').hide();
        } else {
            $('#date-time-div').hide();
        }
    });
}

function isColIncreamentContorl() {
    $('#col-val-div').hide();
    $("#increament_mode_colval").click(function() {
        if ($("#increament_mode_colval").is(":checked")) {
            $("#increament_mode_date").attr("checked", false);
            $('#col-val-div').show();
            $('#date-time-div').hide();
        } else {
            $('#col-val-div').hide();
        }
    });
}

