from django.db import models

# Create your models here.
class Organization(models.Model):

    type = models.CharField(max_length=20, null=True)
    name = models.CharField(max_length=50, null=True)
    address = models.TextField(null=True)
    is_default = models.BooleanField(null=True)
    is_contragent = models.BooleanField(null=True, default=False)

    def __str__(self):
        if self.is_contragent:
            return f'Контрагент {self.type}"{self.name}"'
        else:
            return f'Организация {self.type}"{self.name}"'

class RawMaterial(models.Model):

    feature = models.CharField(max_length=50, null=True)

    def __str__(self):
        return str(self.feature)

class Car(models.Model):

    mark = models.CharField(max_length=50, null=True)
    reg_num = models.CharField(max_length=20, null=True)

    def __str__(self):
        return f"{self.mark} {self.reg_num}"

class Driver(models.Model):

    name = models.CharField(max_length=50, null=True)
    surname = models.CharField(max_length=50, null=True)
    patronymic = models.CharField(max_length=50, null=True)

    def __str__(self):
        return f'{self.surname} {str(self.name)[0]}.{str(self.patronymic)[0]}.'

class Worker(models.Model):

    name = models.CharField(max_length=50, null=True)
    surname = models.CharField(max_length=50, null=True)
    patronymic = models.CharField(max_length=50, null=True)
    organization = models.ForeignKey(Organization, on_delete=models.SET_NULL, null=True)

    def __str__(self):
        return f'{self.surname} {str(self.name)[0]}.{str(self.patronymic)[0]}.'

class ProductFeature(models.Model):

    product_feature = models.CharField(max_length=20, null=True)

    def __str__(self):
        return f'{self.product_feature}'

class ProductNom(models.Model):

    nom = models.CharField(max_length=50, null=True)

    def __str__(self):
        return f'{self.nom}'

class AcceptanceAct(models.Model):

    act_num = models.IntegerField(null=True, unique=True)
    date = models.DateTimeField(auto_now_add=True, blank=True)
    receiver = models.ForeignKey(Organization, on_delete=models.SET_NULL, null=True, related_name='aa_receiver')
    sender = models.ForeignKey(Organization, on_delete=models.SET_NULL, null=True, related_name='aa_sender')
    platform = models.ForeignKey(Organization, on_delete=models.SET_NULL, null=True, related_name='platform')
    raw_material = models.ForeignKey(RawMaterial, on_delete=models.SET_NULL, null=True)
    waybill_num = models.CharField(max_length=50, null=True)
    waybill_weight = models.IntegerField(null=True)
    in_weight = models.IntegerField(null=True)
    out_weight = models.IntegerField(null=True)
    penal_count = models.IntegerField(null=True)
    kip_count = models.IntegerField(null=True)
    car = models.ForeignKey(Car, on_delete=models.SET_NULL, null=True)
    driver = models.ForeignKey(Driver, on_delete=models.SET_NULL, null=True)
    receiving_worker = models.ForeignKey(Worker, on_delete=models.SET_NULL, null=True)
    weight_list = models.JSONField(null=True)
    status = models.CharField(max_length=20, null=True)

    raw_material2 = models.ForeignKey(RawMaterial, on_delete=models.SET_NULL, null=True, related_name='raw_material2')
    penal_count2 = models.IntegerField(null=True)
    kip_count2 = models.IntegerField(null=True)

    def __str__(self):
        return f'Акт приема сырья № {self.act_num} от {self.date.strftime("%d.%m.%Y")}'

class PenalSpecification(models.Model):

    specification_num = models.IntegerField(null=True, unique=True)
    date = models.DateTimeField(auto_now_add=True, blank=True)
    receiver = models.ForeignKey(Organization, on_delete=models.SET_NULL, null=True, related_name='ps_receiver')
    sender = models.ForeignKey(Organization, on_delete=models.SET_NULL, null=True, related_name='ps_sender')
    product_feature = models.ForeignKey(ProductFeature, on_delete=models.SET_NULL, null=True)
    product_nom = models.ForeignKey(ProductNom, on_delete=models.SET_NULL, null=True)
    sending_worker = models.ForeignKey(Worker, on_delete=models.SET_NULL, null=True)
    weight_list = models.JSONField(null=True)
    status = models.CharField(max_length=20, null=True)

    in_weight = models.IntegerField(null=True)
    out_weight = models.IntegerField(null=True)
    penal_count = models.IntegerField(null=True)
    kip_count = models.IntegerField(null=True)

    def __str__(self):
        return f'Спецификация пенала № {self.specification_num} от {self.date.strftime("%d.%m.%Y")}'

class Waybill(models.Model):

    waybill_num = models.IntegerField(null=True, unique=True)
    date = models.DateTimeField(auto_now_add=True, blank=True)
    specification = models.ForeignKey(PenalSpecification, on_delete=models.SET_NULL, null=True)
    car = models.ForeignKey(Car, on_delete=models.SET_NULL, null=True)
    driver = models.ForeignKey(Driver, on_delete=models.SET_NULL, null=True)
    status = models.CharField(max_length=50, default="done", null=True)

    def __str__(self):
        return f'Транспортная накладная № {self.waybill_num} от {self.date.strftime("%d.%m.%Y")}'

class TransferToProd(models.Model):

    shift_num = models.IntegerField(null=True)
    date = models.DateTimeField(auto_now_add=True, blank=True)
    act = models.ForeignKey(AcceptanceAct, on_delete=models.SET_NULL, null=True)
    transfer_count = models.IntegerField(null=True)
    store_executive = models.ForeignKey(Worker, on_delete=models.SET_NULL, null=True, related_name='store_executive')
    prod_executive = models.ForeignKey(Worker, on_delete=models.SET_NULL, null=True, related_name='prod_executive')

    def __str__(self):
        return f'Передано в производство {self.transfer_count} кип общим весом {self.transfer_weight} кг'

class Users(models.Model):

    username = models.CharField(max_length=20, null=True)
    role = models.CharField(max_length=20, null=True)

    def __str__(self):
        return f'{self.role} {self.username}'

class Waste(models.Model):

    black_metal = models.FloatField(null=True)
    color_metal = models.FloatField(null=True)
    off_color_bottle = models.FloatField(null=True)
    flex = models.FloatField(null=True)
    pss = models.FloatField(null=True)
    paper = models.FloatField(null=True)
    other = models.FloatField(null=True)
    brigade_num = models.IntegerField(null=True)
    date = models.DateTimeField(auto_now_add=True, blank=True)

    def __str__(self):
        return f"Возвратные отходы от {self.date.strftime('%d.%m.%Y')}"