# Generated by Django 4.2.6 on 2024-01-29 13:30

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('management', '0014_organization_is_default'),
    ]

    operations = [
        migrations.AlterField(
            model_name='organization',
            name='is_contragent',
            field=models.BooleanField(default=False, null=True),
        ),
    ]
