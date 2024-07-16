from django.db import models

# Create your models here.

class Dish(models.Model):
    dishId = models.PositiveBigIntegerField(unique=True)
    dishName = models.CharField(max_length=255)
    imageUrl = models.CharField(max_length=511, null=True, blank=True)
    isPublished = models.BooleanField(default=False)
