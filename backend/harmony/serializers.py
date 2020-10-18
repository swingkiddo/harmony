from rest_framework import serializers
from .models import Composer, Textbook


class ComposerSerializer(serializers.ModelSerializer):
    nationality = serializers.CharField(source="get_nationality_display")

    class Meta:
        model = Composer
        fields = ('pk', 'name', 'era', 'article', 'photo', 'date_of_birth', 'nationality')

class TextbookSerializer(serializers.ModelSerializer):
    subject = serializers.CharField(source="get_subject_display")

    class Meta:
        model = Textbook
        fields = ('pk', 'name', 'description', 'subject','textbook')
        