from rest_framework import serializers
from .models import FileModel

class FileModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = FileModel
        fields = ['file']
