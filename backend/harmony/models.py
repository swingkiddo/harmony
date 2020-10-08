from django.db import models

class Subject:
    HARMONY = 'HM'
    MUSLIT = 'ML'
    SUBJECT_CHOICES = [
        (HARMONY, 'Гармония'),
        (MUSLIT, 'Музыкальная литература')
    ]

class Composer(models.Model):
    name = models.CharField(max_length=40)
    era = models.CharField(max_length=20)
    article = models.TextField()
    photo = models.ImageField()

    def __str__(self):
        return self.name

class Textbook(models.Model):
    name = models.CharField(max_length=50)
    description = models.TextField()
    textbook = models.FileField(upload_to='textbooks/')
    subject = models.CharField(max_length=2, choices=Subject.SUBJECT_CHOICES, null=True)

    def __str__(self):
        return self.name