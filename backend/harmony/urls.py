from django.urls import path
from . import views

urlpatterns = [
    path('api/composers', views.ComposerView.as_view()),
]