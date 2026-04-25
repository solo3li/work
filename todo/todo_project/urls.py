from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.admin_site.urls if hasattr(admin.site, 'admin_site') else admin.site.urls),
    path('', include('tasks.urls')),
]
