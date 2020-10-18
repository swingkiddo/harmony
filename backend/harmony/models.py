from django.db import models

class Subject:
    HARMONY = 'HM'
    MUSLIT = 'ML'
    SUBJECT_CHOICES = [
        (HARMONY, 'Гармония'),
        (MUSLIT, 'Музыкальная литература')
    ]

class Nationality:
    FRANCE = 'FR'
    ENGLAND = 'EN'
    GERMANY = 'GR'
    POLAND = 'PL'
    ITALY = 'IL'
    RUSSIA = 'RU'
    NATIONALITY_CHOICES = [
        (FRANCE, 'Франция'),
        (ENGLAND, 'Англия'),
        (GERMANY, 'Германия'),
        (POLAND, 'Польша'),
        (ITALY, 'Италия'),
        (RUSSIA, 'Россия')
    ]

class Composer(models.Model):
    name = models.CharField(max_length=40)
    era = models.CharField(max_length=20)
    article = models.TextField()
    photo = models.ImageField()
    date_of_birth = models.CharField(max_length=11, null=True)
    nationality = models.CharField(max_length=2, choices=Nationality.NATIONALITY_CHOICES, null=True)

    def __str__(self):
        return self.name

class Textbook(models.Model):
    name = models.CharField(max_length=50)
    description = models.TextField()
    textbook = models.FileField(upload_to='textbooks/')
    subject = models.CharField(max_length=2, choices=Subject.SUBJECT_CHOICES, null=True)

    def __str__(self):
        return self.name