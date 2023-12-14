from django.urls import path

from . import views

urlpatterns = [
    path('', views.index, name="index"),
    path('store', views.store, name="store"),
    path('handbook', views.handbook, name='handbook'),
    path('archive', views.archive, name='archive'),
    path('organization', views.organization, name='organization'),
    path('organization/<int:id>', views.edit_organization, name='edit_organization'),
    path('rawmaterial', views.rawmaterial, name='rawmaterial'),
    path('rawmaterial/<int:id>', views.edit_rawmaterial, name='edit_rawmaterial'),
    path('car', views.car, name='car'),
    path('car/<int:id>', views.edit_car, name='edit_car'),
    path('driver', views.driver, name='driver'),
    path('driver/<int:id>', views.edit_driver, name='edit_driver'),
    path('worker', views.worker, name='worker'),
    path('worker/<int:id>', views.edit_worker, name='edit_worker'),
    path('productfeature', views.productfeature, name='productfeature'),
    path('productfeature/<int:id>', views.edit_productfeature, name='edit_productfeature'),
    path('productnom', views.productnom, name='productnom'),
    path('productnom/<int:id>', views.edit_productnom, name='edit_productnom'),
    path('acceptanceact', views.acceptanceact, name='acceptanceact'),
    path('acceptanceact/<int:id>/init', views.acceptanceactinit, name='acceptanceactinit'),
    path('acceptanceact/<int:id>/weight', views.acceptanceactweight, name='acceptanceactweight'),
    path('acceptanceact/<int:id>/carweight', views.acceptanceactcarweight, name='acceptanceactcarweight'),
    path('acceptanceact/<int:id>/generate/<str:fn>', views.generate_acceptance_act, name='generate_acceptance_act'),
    path('penalspecification', views.penal_specification, name='penal_specification'),
    path('penalspecification/<int:id>/weight', views.penal_specification_weight, name='penal_specification_weight'),
    path('penalspecification/<int:id>/generate/<str:fn>', views.generate_penal_specification, name='generate_penal_specification'),
    path('waybill', views.waybill, name='waybill'),
    path('waybill/<int:id>/generate/<str:fn>', views.generate_waybill, name='generate_waybill'),
    path('acceptanceact/<int:id>/archive', views.acceptance_act_archive, name='acceptance_act_archive'),
    path('penalspecification/<int:id>/archive', views.penal_specification_archive, name='penal_specification_archive'),
    path('waybill/<int:id>/archive', views.waybill_archive, name='waybill_archive'),
    path('acceptanceact/<int:id>/delete', views.acceptance_act_delete, name='acceptance_act_delete'),
    path('penalspecification/<int:id>/delete', views.penal_specification_delete, name='penal_specification_delete'),
    path('waybill/<int:id>/delete', views.waybill_delete, name='waybill_delete'),
    path('transfer', views.transfer, name='transfer'),
    path('transfer/<str:fn>', views.generate_transfer, name='generate_transfer'),
    path('journal', views.journal, name='journal'),
    path('login', views.login_view, name='login'),
    path('logout', views.logout_view, name='login')
]