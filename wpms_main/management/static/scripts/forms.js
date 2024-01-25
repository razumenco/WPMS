var translateLabelsDict = {
    'organization': {
        'type': 'Вид организации (напр. ООО)',
        'name': 'Наименование',
        'address': 'Адрес',
        'is_contragent': 'Является контрагентом',
        'is_default': 'Организация по умолчанию'
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
        'waybill_weight': 'Вес согласно накладной (в кг)',
        'in_weight': 'Вес автомобиля на въезде (в кг)',
        'car': 'Автомобиль',
        'driver': 'Водитель',
        'receiving_worker': 'Сотрудник получатель',
        'weight_list': 'Веса б/б (в кг)',
        'penal_count': 'Количество кип в б/б',
        'out_weight': 'Вес автомобиля на выезде (в кг)',
        'kip_count': 'Общее количество кип',
        'penal_count2': 'Количество кип в б/б',
        'raw_material2': 'Характеристика сырья',
        'kip_count2': 'Общее количество кип'
    },
    'penalspecification': {
        'specification_num': 'Номер спецификации',
        'receiver': 'Получатель',
        'sender': 'Отправитель',
        'product_feature': 'Характеристика продукции',
        'product_nom': 'Номенклатура продукции',
        'sending_worker': 'Сотрудник отправитель',
        'weight_list': 'Веса б/б (в кг)',
        'penal_count': 'Количество кип в б/б',
        'in_weight': 'Вес автомобиля на въезде (в кг)',
        'out_weight': 'Вес автомобиля на выезде (в кг)',
        'kip_count': 'Общее количество б/б'
    }, 
    'waybill': {
        'waybill_num': 'Номер накладной',
        'specification': 'Спецификация пенала',
        'car': 'Автомобиль',
        'driver': 'Водитель'
    },
    'transfer': {
        'shift_num': 'Номер смены',
        'act': 'Номер пенала',
        'transfer_weight': 'Вес выданной бутылки (в кг)',
        'transfer_count': 'Общее количество кип',
        'store_executive': 'Ответственный(склад)',
        'prod_executive': 'Ответственный(цех)'
    },
    'waste': {
        'black_metal': 'Черный металл (в кг)',
        'color_metal': 'Цветной металл (в кг)',
        'off_color_bottle': 'Бутылка нетоварных цветов (в кг)',
        'flex': 'Флекс (экономия) (в кг)',
        'pss': 'ПСС (в кг)',
        'paper': 'Бумага (в кг)',
        'other': 'Прочее (в кг)'
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

function addAcceptanceActFields(inputTextarea) {
    inputTextarea.parent().css('display', 'none');
    $(".form-submit-wrapper").before(
        $("<div>").addClass("form-group").append(
            $("<label>").attr("for", "bb_count").css("color", "white").html("Количество б/б")
        ).append(
            $("<input>").attr("type", "number").attr("name", "bb_count").attr("required", true).attr("id", "bb_count").addClass("form-control").css("max-width", "600px").on('change', function() {
                // if ($("#bb_count").val() && $("#bb_weight").val()) {
                //     let numList = [];
                //     let count = parseInt($("#bb_count").val());
                //     let weight = parseInt($("#bb_weight").val());
                //     for (let i = 0; i < count; i++) {
                //         numList.push(weight / count);
                //     }
                //     inputTextarea.html(JSON.stringify(numList));
                // }
            })
        )
    );
    // $(".form-submit-wrapper").before(
    //     $("<div>").addClass("form-group").append(
    //         $("<label>").attr("for", "bb_weight").css("color", "white").html("Общий вес")
    //     ).append(
    //         $("<input>").attr("type", "number").attr("name", "bb_weight").attr("required", true).attr("id", "bb_weight").addClass("form-control").css("max-width", "600px").on('change', function() {
    //             if ($("#bb_count").val() && $("#bb_weight").val()) {
    //                 let numList = [];
    //                 let count = parseInt($("#bb_count").val());
    //                 let weight = parseInt($("#bb_weight").val());
    //                 for (let i = 0; i < count; i++) {
    //                     numList.push(weight / count);
    //                 }
    //                 inputTextarea.html(JSON.stringify(numList));
    //             }
    //         })
    //     )
    // );
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
    checkLabel = $("label[for='id_is_default']");
    // checkLabel.remove();
    $("input:checkbox").css("position", "relative").css("margin", "10px").after(checkLabel);
    translateForm();
    let weightList = $("textarea[name='weight_list']");
    if (weightList.length) {
        let formId;
        if ($("form").attr("id").split('/')[0]) {
            formId = $("form").attr("id").split('/')[0];
        } else {
            formId = $("form").attr("id").split('/')[1];
        }
        if (formId == "acceptanceact") {
            addAcceptanceActFields(weightList);
        } else {
            addWeightInputs(weightList);
        }
    }
    $("label[for='id_weight_list']").css("margin-left", "20px").css("font-size", "25px");
});