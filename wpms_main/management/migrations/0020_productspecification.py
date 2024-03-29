# Generated by Django 4.2.6 on 2024-02-13 10:57

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('management', '0019_remove_transfertoprod_transfer_weight'),
    ]

    operations = [
        migrations.CreateModel(
            name='ProductSpecification',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('date', models.DateTimeField(auto_now_add=True)),
                ('brigade_num', models.IntegerField(null=True)),
                ('weight', models.IntegerField(null=True)),
                ('kip_count', models.IntegerField(null=True)),
                ('product_feature', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='management.productfeature')),
                ('product_nom', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='management.productnom')),
                ('sender', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='management.organization')),
            ],
        ),
    ]
