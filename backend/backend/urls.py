from django.contrib import admin
from django.urls import path, re_path, include
from django.views.static import serve
from django.conf import settings 

from rest_framework import routers
from harmony import views

router = routers.DefaultRouter()
#router.register(r'composers', views.ComposerView, 'composer')

urlpatterns = [
    path('admin/', admin.site.urls),
    #path('api/', include(router.urls)),
   path('api/composers/', views.ComposerView.as_view()),
   re_path(r'^api/composers/(?P<pk>[0-9]+)$', views.composers_detail),
   path('api/textbooks/', views.TextbookView.as_view()),
]

if settings.DEBUG:
    urlpatterns += [
        re_path(r"^media/(?P<path>.*)$", serve, {'document_root': settings.MEDIA_ROOT, }),
    ]