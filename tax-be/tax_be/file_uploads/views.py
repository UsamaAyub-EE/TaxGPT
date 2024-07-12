from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import FileModel
from .serializers import FileModelSerializer
import ipdb

class FileUploadView(APIView):
    def post(self, request, *args, **kwargs):
        ipdb.set_trace()
        serializer = FileModelSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class FileListView(APIView):
    def get(self, request, *args, **kwargs):
        files = FileModel.objects.all()
        serializer = FileModelSerializer(files, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
