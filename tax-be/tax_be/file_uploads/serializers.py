from rest_framework import serializers
from .models import FileModel


class FileModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = FileModel
        fields = ['id', 'file', 'user']
        read_only_fields = ['user']
