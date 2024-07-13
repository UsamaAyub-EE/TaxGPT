from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import FileModel
from .serializers import FileModelSerializer
from django.http import FileResponse, Http404

class FileUploadView(APIView):
    def post(self, request, *args, **kwargs):
        serializer = FileModelSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class FileListView(APIView):
    def get(self, request, *args, **kwargs):
        files = FileModel.objects.all()
        file_data = [{"id": file.id, "name": file.file.name.split('/')[-1]} for file in files]
        return Response(file_data, status=status.HTTP_200_OK)

class FileDetailView(APIView):
    def get(self, request, file_id, *args, **kwargs):
        try:
            file = FileModel.objects.get(id=file_id)
            return FileResponse(file.file.open(), content_type='application/octet-stream')
        except FileModel.DoesNotExist:
            raise Http404("File does not exist")
