# Generated by Django 4.2.6 on 2024-02-04 22:21

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('management', '0018_waste_brigade_num_alter_waste_black_metal_and_more'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='transfertoprod',
            name='transfer_weight',
        ),
    ]
