from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import FileModel
from .serializers import FileModelSerializer
from django.http import FileResponse, Http404
from rest_framework.permissions import IsAuthenticated


class FileUploadView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        data = request.data.copy()
        serializer = FileModelSerializer(data=data)
        if serializer.is_valid():
            serializer.save(user=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class FileListView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
        files = FileModel.objects.filter(user=request.user)
        file_data = [
            {"id": file.id, "name": file.file.name.split('/')[-1]} for file in files]
        return Response(file_data, status=status.HTTP_200_OK)


class FileDetailView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, file_id, *args, **kwargs):
        try:
            file = FileModel.objects.get(id=file_id, user=request.user)
            return FileResponse(file.file.open(), content_type='application/octet-stream')
        except FileModel.DoesNotExist:
            raise Http404("File does not exist")
