# Generated by Django 4.0.3 on 2023-04-19 22:13

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='BinVO',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('closet_name', models.CharField(max_length=100)),
                ('bin_number', models.PositiveSmallIntegerField()),
                ('bin_size', models.PositiveSmallIntegerField()),
            ],
        ),
        migrations.CreateModel(
            name='Shoe',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('manufacturer', models.CharField(max_length=200)),
                ('model_name', models.CharField(max_length=200)),
                ('color', models.CharField(max_length=200)),
                ('picture', models.URLField()),
                ('bin', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='shoe', to='shoes_rest.binvo')),
            ],
        ),
    ]