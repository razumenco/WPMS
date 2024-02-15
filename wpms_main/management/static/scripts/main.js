$(document).ready(function() {
    let token = $("input[name='csrfmiddlewaretoken']").attr('value');
    $(".date-range-picker").daterangepicker({
        "locale": {
            "format": "DD.MM.YYYY"
        }
    });
    $(".drp-buttons .cancelBtn").html("Назад");
    $(".drp-buttons .applyBtn").html("Применить");
    if ($(".archive-button")) {
        $(".archive-button").each(function() {
            $(this).click(function(e) {
                url = $(this).attr("archive-link");
                $.ajax({
                    type: 'GET',
                    url: url
                });
                $(this).parent().parent().parent().remove();
            });
        });
    }
    if ($(".delete-btn")) {
        $(".delete-btn").each(function() {
            $(this).click(function(e) {
                url = $(this).attr("delete-link");
                $.ajax({
                    type: 'GET',
                    url: url
                });
                $(this).parent().parent().parent().remove();
            });
        });
    }

    jQuery.expr[':'].icontains = function(a, i, m) {
        return jQuery(a).text().toUpperCase()
            .indexOf(m[3].toUpperCase()) >= 0;
    };
    $("#type-search").on('keyup', function() {
        let s = $("#type-search").val();
        $('.type-search:not(:icontains('+ s +'))').parent().hide();
        $('.type-search:icontains('+ s +')').parent().show(); 
        updateSum();
    });
    $("#date-search").on('keyup', function() {
        let s = $("#date-search").val();
        if (s.includes("-")) {
            let splitted = s.split("-");
            if (isDate(splitted[0]) && isDate(splitted[1])) {
                let date1 = parseDate(splitted[0]), date2 = parseDate(splitted[1]);
                $('.date-search').each(function() {
                    let s = $(this).html();
                    if (s.includes(" ")) {
                        s = s.split(" ")[0];
                    }
                    if (isDate(s)) {
                        let date = parseDate(s);
                        if (date1 <= date && date <= date2) {
                            $(this).parent().show();
                        } else {
                            $(this).parent().hide();
                        }
                    }
                });
            }
        } else {
            $('.date-search:not(:icontains('+ s +'))').parent().hide();
            $('.date-search:icontains('+ s +')').parent().show();
        } 
        updateSum(); 
    });
    $("#sender-search").on('keyup', function() {
        let s = $("#sender-search").val();
        $('.sender-search:not(:icontains('+ s +'))').parent().hide();
        $('.sender-search:icontains('+ s +')').parent().show();  
        updateSum();
    });
    $("#receiver-search").on('keyup', function() {
        let s = $("#receiver-search").val();
        $('.receiver-search:not(:icontains('+ s +'))').parent().hide();
        $('.receiver-search:icontains('+ s +')').parent().show();  
        updateSum();
    });

    $("#num-search").on('keyup', function() {
        let s = $("#num-search").val();
        $('.num-search:not(:icontains('+ s +'))').parent().hide();
        $('.num-search:icontains('+ s +')').parent().show();  
        updateSum();
    });
    $("#material-search").on('keyup', function() {
        let s = $("#material-search").val();
        $('.material-search:not(:icontains('+ s +'))').parent().hide();
        $('.material-search:icontains('+ s +')').parent().show();  
        updateSum();
    });
});

function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

function updateSum() {
    let sum = 0;
    $( ".weight" ).each(function() {
        if ($(this).is(":visible")) {
            sum += parseInt($( this ).html());
        }
    });
    $("#table-total").html(sum);
}

function isDate(date) {
    let splitted = date.split(".");
    if (splitted.length != 3)
        return false;
    let day = parseInt(splitted[0]), month = parseInt(splitted[1]), year = parseInt(splitted[2]);
    if (!(1 <= day <= 31)) {
        return false;
    }
    if (!(1 <= month <= 12)) {
        return false;
    }
    if (!(1 <= year <= 9999999)) {
        return false;
    }
    return true;
}

function parseDate(date) {
    let splitted = date.split(".");
    let day = parseInt(splitted[0]), month = parseInt(splitted[1]), year = parseInt(splitted[2]);
    return new Date(year, month - 1, day)
}