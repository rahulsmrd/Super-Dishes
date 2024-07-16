import json

from django.shortcuts import render
from rest_framework import generics

from dashboard.models import Dish
from dashboard.serializers import DishSerializer

# Create your views here.

def PopulateDishes():
    with open('dish-assignment.json', 'r') as file:
        json_data = file.read()
    data = json.loads(json_data)
    for dish in data:
        dish_create = Dish.objects.create(**dish)
        dish_create.save()

if Dish.objects.all().count() == 0:
    PopulateDishes()

class ListofDishesAPI(generics.ListAPIView):
    model = Dish
    serializer_class = DishSerializer
    queryset = Dish.objects.all()

class UpdateDishAPI(generics.UpdateAPIView):
    model = Dish
    serializer_class = DishSerializer
    queryset = Dish.objects.all()

    def patch(self, request, pk, *args, **kwargs):
        data = request.data
        data.update({"isPublished": False if self.get_object().isPublished else True})
        return super().patch(request, pk, *args, **kwargs)




