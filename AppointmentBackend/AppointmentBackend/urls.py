"""AppointmentBackend URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from appointments.views import booking_create, check_booking_availability

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/bookings/', booking_create, name='booking-create'),
    path('api/booking_availability/', check_booking_availability, name='check_booking_availability'),
    # path('api/booked-slots/', booked_slots, name='booked-slots'),
]
