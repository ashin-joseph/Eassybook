# Generated by Django 5.1.1 on 2024-09-07 09:04

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('appointments', '0002_alter_bookingdetailstable_time_slot'),
    ]

    operations = [
        migrations.RenameField(
            model_name='bookingdetailstable',
            old_name='time_slot',
            new_name='timeslot',
        ),
    ]
