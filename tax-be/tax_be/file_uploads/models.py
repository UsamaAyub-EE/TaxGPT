from django.db import models
from django.contrib.auth.models import User


class FileModel(models.Model):
    file = models.FileField(upload_to='uploads/')
    user = models.ForeignKey(
        User, on_delete=models.CASCADE, blank=True, null=True)

    def __str__(self):
        return self.file.name
