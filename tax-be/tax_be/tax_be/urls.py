from django.contrib import admin
from django.urls import include, path

urlpatterns = [
    path("file_uploads/", include("file_uploads.urls")),
    path("admin/", admin.site.urls),
    path('api/auth/', include('accounts.urls')),
]