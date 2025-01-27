from django.urls import path
from . import views

urlpatterns = [
    path('articles/', views.getArticles),
      path('snippets/', views.getArticleSnippets),
    path('articles/article/<slug:slug>/', views.getArticle)
]

