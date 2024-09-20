from django.http import JsonResponse
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .serializer import BookingDetailsSerial
from .models import BookingDetailsTable


@api_view(['POST'])
def booking_create(request):
    if request.method == 'POST':
        serializer = BookingDetailsSerial(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# @api_view(['GET'])
# def booked_slots(request):
#     calendar = request.query_params.get('calendar', None)
#
#     if calendar:
#         bookings = BookingDetailsTable.objects.filter(calendar=calendar)
#     else:
#         bookings = BookingDetailsTable.objects.all()
#
#     booked_slots = bookings.values_list('timeslot', flat=True)
#     return Response(list(booked_slots))

@api_view(['GET'])
def check_booking_availability(request):
    calendar = request.GET.get('calendar')
    timeslot = request.GET.get('timeslot')
    is_booked = BookingDetailsTable.objects.filter(calendar=calendar, timeslot=timeslot).exists()
    return JsonResponse({'is_booked': is_booked})

# @api_view(['GET'])
# def booked_slots(request):
#     calendar = request.query_params.get('calendar')
#     timeslot = request.query_params.get('timeslot')
#
#     if calendar and timeslot:
#         bookings = BookingDetailsTable.objects.filter(calendar=calendar, timeslot=timeslot).exists()
#     return JsonResponse({'bookings': bookings})