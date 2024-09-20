from rest_framework import serializers
from .models import BookingDetailsTable


class BookingDetailsSerial(serializers.ModelSerializer):
    class Meta:
        model = BookingDetailsTable
        fields = '__all__'
        read_only = ["id"]