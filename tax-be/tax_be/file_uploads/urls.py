from django.urls import path
from .views import FileUploadView, FileListView, FileDetailView

urlpatterns = [
    path('upload/', FileUploadView.as_view(), name='file-upload'),
    path('files/', FileListView.as_view(), name='file-list'),
    path('files/<int:file_id>/', FileDetailView.as_view(), name='file-detail'), 
]
