from django.db import models

class BookingDetailsTable(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField(max_length=200)
    phone = models.CharField(max_length=15)
    city = models.CharField(max_length=100)
    topic = models.CharField(max_length=100)
    calendar = models.DateField()
    duration = models.CharField(max_length=10)
    timeslot = models.CharField(max_length=50, null=True, blank=True)

    def __str__(self):
        return f"{self.name} - {self.time_slot}"
