# Generated by Django 4.2.6 on 2024-01-17 12:45

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('management', '0012_waste'),
    ]

    operations = [
        migrations.AddField(
            model_name='acceptanceact',
            name='kip_count2',
            field=models.IntegerField(null=True),
        ),
        migrations.AddField(
            model_name='acceptanceact',
            name='penal_count2',
            field=models.IntegerField(null=True),
        ),
        migrations.AddField(
            model_name='acceptanceact',
            name='raw_material2',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='raw_material2', to='management.rawmaterial'),
        ),
    ]
