from rest_framework import serializers
from .models import Composer, Textbook


class ComposerSerializer(serializers.ModelSerializer):

    class Meta:
        model = Composer
        fields = ('pk', 'name', 'era', 'article', 'photo')

class TextbookSerializer(serializers.ModelSerializer):
    subject = serializers.CharField(source="get_subject_display")

    class Meta:
        model = Textbook
        fields = ('pk', 'name', 'description', 'subject','textbook')
        