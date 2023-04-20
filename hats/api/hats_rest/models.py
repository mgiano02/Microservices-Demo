from django.db import models

# Create your models here.

# Model used to access Location model via wardrobe microservice via api poll
class LocationVO(models.Model):
    closet_name = models.CharField(max_length=100)
    section_number = models.PositiveSmallIntegerField()
    shelf_number = models.PositiveSmallIntegerField()
    import_href = models.CharField(max_length=200, unique=True)

class Hat(models.Model):
    fabric = models.CharField(max_length=100)
    style_name = models.CharField(max_length=100)
    color = models.CharField(max_length=100)
    picture_url = models.URLField(max_length=200)

    location = models.ForeignKey(
        LocationVO,
        related_name="location",
        on_delete=models.CASCADE
    )
