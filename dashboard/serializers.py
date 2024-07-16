from rest_framework import serializers

from dashboard.models import Dish

class DishSerializer(serializers.ModelSerializer):
    class Meta:
        model = Dish
        fields = '__all__'
        writeonly_fields = ['isPublished']
