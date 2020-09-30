from rest_framework import serializers
from .models import Composer


class ComposerSerializer(serializers.ModelSerializer):

    class Meta:
        model = Composer
        fields = ('pk', 'name', 'era', 'article', 'photo')