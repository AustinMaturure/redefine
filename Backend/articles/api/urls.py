from django.urls import path
from . import views

urlpatterns = [
    path('articles/', views.getArticles),
    path('articles/article/<int:id>/', views.getArticle)
]

