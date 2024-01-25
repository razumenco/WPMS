from django.db.models import Q
from django.forms import ModelForm

from .models import *

class WaybillForm(ModelForm):

    def __init__(self, *args, **kwargs):
        super(WaybillForm, self).__init__(*args, **kwargs)
        self.fields['specification'].queryset = PenalSpecification.objects.filter(~Q(status="archive"))

    class Meta:
        model = Waybill
        fields = "__all__"
        exclude = ["status"]

class PenalSpecificationFormInit(ModelForm):

    class Meta:
        model = PenalSpecification
        fields = [
            'specification_num',
            'receiver',
            'sender',
            'product_feature',
            'product_nom',
            'sending_worker'
        ]

class PenalSpecificationForm(ModelForm):

    class Meta:
        model = PenalSpecification
        fields = ['in_weight']

class PenalSpecificationWeightsForm(ModelForm):

    class Meta:
        model = PenalSpecification
        fields = ['weight_list']

class PenalSpecificationCountForm(ModelForm):

    class Meta:
        model = PenalSpecification
        fields = ['kip_count']

class PenalSpecificationCarWeightForm(ModelForm):

    class Meta:
        model = PenalSpecification
        fields = ['out_weight']

class AcceptanceActForm(ModelForm):

    class Meta:
        model = AcceptanceAct
        fields = [
            'in_weight'
        ]

class AcceptanceActFormInit(ModelForm):

    class Meta:
        model = AcceptanceAct
        fields = [
            'act_num',
            'receiver',
            'sender',
            'platform',
            'raw_material',
            'waybill_num',
            'waybill_weight',
            'receiving_worker',
            'car',
            'driver'
        ]

class AcceptanceActWeightsForm(ModelForm):

    class Meta:
        model = AcceptanceAct
        fields = [
            'kip_count'
        ]

class AcceptanceActCarWeightsForm(ModelForm):

    class Meta:
        model = AcceptanceAct
        fields = [
            'out_weight'
        ]

class AcceptanceActSecondMaterialForm(ModelForm):

    class Meta:
        model = AcceptanceAct
        fields = [
            'raw_material2',
            'kip_count2'
        ]

class TransferToProdForm(ModelForm):

    class Meta:
        model = TransferToProd
        fields = "__all__"
        exclude = ["store_executive", "prod_executive"]

class OrganizationForm(ModelForm):

    class Meta:
        model = Organization
        fields = "__all__"

class RawMaterialForm(ModelForm):

    class Meta:
        model = RawMaterial
        fields = "__all__"

class CarForm(ModelForm):

    class Meta:
        model = Car
        fields = "__all__"

class DriverForm(ModelForm):

    class Meta:
        model = Driver
        fields = ['surname', 'name', 'patronymic']

class WorkerForm(ModelForm):

    class Meta:
        model = Worker
        fields = ['surname', 'name', 'patronymic', 'organization']

class ProductFeatureForm(ModelForm):

    class Meta:
        model = ProductFeature
        fields = "__all__"

class ProductNomForm(ModelForm):

    class Meta:
        model = ProductNom
        fields = "__all__"

class WasteForm(ModelForm):

    class Meta:
        model = Waste
        fields = "__all__"