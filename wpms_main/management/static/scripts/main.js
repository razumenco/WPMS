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
    });
    $("#date-search").on('keyup', function() {
        let s = $("#date-search").val();
        $('.date-search:not(:icontains('+ s +'))').parent().hide();
        $('.date-search:icontains('+ s +')').parent().show(); 
    });
    $("#sender-search").on('keyup', function() {
        let s = $("#sender-search").val();
        $('.sender-search:not(:icontains('+ s +'))').parent().hide();
        $('.sender-search:icontains('+ s +')').parent().show(); 
    });
    $("#receiver-search").on('keyup', function() {
        let s = $("#receiver-search").val();
        $('.receiver-search:not(:icontains('+ s +'))').parent().hide();
        $('.receiver-search:icontains('+ s +')').parent().show(); 
    });

    $("#num-search").on('keyup', function() {
        let s = $("#num-search").val();
        $('.num-search:not(:icontains('+ s +'))').parent().hide();
        $('.num-search:icontains('+ s +')').parent().show(); 
    });
    $("#material-search").on('keyup', function() {
        let s = $("#material-search").val();
        $('.material-search:not(:icontains('+ s +'))').parent().hide();
        $('.material-search:icontains('+ s +')').parent().show(); 
    });
});

function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}
