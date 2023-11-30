var translateLabelsDict = {
    'organization': {
        'type': 'Вид организации (напр. ООО)',
        'name': 'Наименование',
        'address': 'Адрес',
        'is_contragent': 'Является контрагентом'
    },
    'rawmaterial': {
        'feature': 'Характеристика сырья'
    },
    'car': {
        'mark': 'Марка',
        'reg_num': 'Регистрационный номер'
    },
    'driver': {
        'name': 'Имя',
        'surname': 'Фамилия',
        'patronymic': 'Отчество'
    },
    'worker': {
        'name': 'Имя',
        'surname': 'Фамилия',
        'patronymic': 'Отчество',
        'organization': 'Организация'
    },
    'productfeature': {
        'product_feature': 'Характеристика продукции'
    },
    'productnom': {
        'nom': 'Номенклатура продукции'
    },
    'acceptanceact': {
        'act_num': 'Номер акта',
        'receiver': 'Получатель',
        'sender': 'Отправитель',
        'platform': 'Площадка',
        'raw_material': 'Характеристика сырья',
        'waybill_num': 'Номер накладной (напр. Н1324)',
        'waybill_weight': 'Вес согласно накладной',
        'in_weight': 'Вес автомобиля на въезде (в кг)',
        'car': 'Автомобиль',
        'driver': 'Водитель',
        'receiving_worker': 'Сотрудник получатель',
        'weight_list': 'Веса б/б',
        'penal_count': 'Количество кип в б/б',
        'out_weight': 'Вес автомобиля на выезде'
    },
    'penalspecification': {
        'specification_num': 'Номер спецификации',
        'receiver': 'Получатель',
        'sender': 'Отправитель',
        'product_feature': 'Характеристика продукции',
        'product_nom': 'Номенклатура продукции',
        'sending_worker': 'Сотрудник отправитель',
        'weight_list': 'Веса б/б'
    }, 
    'waybill': {
        'waybill_num': 'Номер накладной',
        'specification': 'Спецификация пенала',
        'car': 'Автомобиль',
        'driver': 'Водитель'
    }
};

function translateForm() {
    $("input:submit").attr("value", "Сохранить");
    let formId;
    if ($("form").attr("id").split('/')[0]) {
        formId = $("form").attr("id").split('/')[0];
    } else {
        formId = $("form").attr("id").split('/')[1];
    }
    if (translateLabelsDict[formId]) {
        let labels = $("form label");
        labels.each(function(index) {
            let labelId = $(this).attr("for");
            let translation = translateLabelsDict[formId][labelId];
            if (translation){
                $(this).html(translation);
            } else {
                translation = translateLabelsDict[formId][labelId.slice(3)];
                if (translation){
                    $(this).html(translation);
                }
            }
        });
    }
}

function addWeightInputs(inputTextarea) {
    let i;
    for (i = 4; i > 0; i--) {
        inputTextarea.after(
            $("<div>").addClass("weight-input-box").append(
                $('<label>').html(i).addClass("weight-input-label")
            ).append(
                $("<input>").attr('type', 'number').attr('style', 'max-width: 33%;').addClass('form-control').addClass('num-list-input').on('change', () => {
                    let numInputs = inputTextarea.parent().children('.weight-input-box').children("input[type='number']");
                    let numList = [];
                    numInputs.each((i) => {
                        if (numInputs.eq(i).val()) {
                            numList.push(parseInt(numInputs.eq(i).val()));
                        }
                    });
                    inputTextarea.html(JSON.stringify(numList));
                })
            )
        );
    }
    i = 5;
    inputTextarea.parent().append(
        $("<a>").attr('id', 'add-list-input').addClass("btn").addClass("btn-primary").html("Добавить").attr('style', 'max-width: 33%; cursor: pointer; margin-left: 20px;').click(() => {
            $('#add-list-input').before(
                $("<div>").addClass("weight-input-box").append(
                    $('<label>').html(i).addClass("weight-input-label")
                ).append(
                    $("<input>").attr('type', 'number').attr('style', 'max-width: 33%;').addClass('form-control').addClass('num-list-input').on('change', () => {
                        let numInputs = inputTextarea.parent().children('.weight-input-box').children("input[type='number']");
                        let numList = [];
                        numInputs.each((i) => {
                            if (numInputs.eq(i).val()) {
                                numList.push(parseInt(numInputs.eq(i).val()));
                            }
                        });
                        inputTextarea.html(JSON.stringify(numList));
                    })
                )
            );
            i += 1;
        })
    );
    inputTextarea.css('display', 'none');
}


$(document).ready(function() {
    $(window).keydown(function(event){
        if(event.keyCode == 13) {
          event.preventDefault();
          return false;
        }
      });
    // $("html, body, #content").css("background-color", "white");
    $("label").css("color", "white");
    $("input").addClass("form-control");
    $("input:submit").removeClass("form-control");
    $("input:submit").addClass("btn");
    $("input:submit").addClass("btn-primary");
    $("select, textarea").addClass("form-control");
    $("input, select, textarea").css("max-width", "600px");
    $("input:checkbox").removeClass("form-control");
    $("input:checkbox").addClass("form-check-input");
    checkLabel = $("label[for='id_is_default']").addClass("form-check-label");
    checkLabel.remove();
    $("input:checkbox").css("position", "relative").css("margin", "10px").after(checkLabel);
    translateForm();
    let weightList = $("textarea[name='weight_list']");
    if (weightList) {
        addWeightInputs(weightList);
    }
    $("label[for='id_weight_list']").css("margin-left", "20px").css("font-size", "25px");
});