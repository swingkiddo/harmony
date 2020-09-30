from django.db import models

class Composer(models.Model):
    name = models.CharField(max_length=40)
    era = models.CharField(max_length=20)
    article = models.TextField()
    photo = models.ImageField()

    def __str__(self):
        return self.name
