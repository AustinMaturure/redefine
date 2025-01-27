from articles.models import Article
from .serializers import ArticleSerializer, ArticleSnippetSerializer
from rest_framework.decorators import api_view
from django.shortcuts import get_object_or_404
from rest_framework.response import Response
from rest_framework.pagination import PageNumberPagination

@api_view(["GET"])
def getArticles(request):
    articles = Article.objects.all() 
    paginator = PageNumberPagination()   
    paginated_articles = paginator.paginate_queryset(articles, request)  
    serializer = ArticleSerializer(paginated_articles, many=True)
    
    return paginator.get_paginated_response(serializer.data)  
    

@api_view(["GET"])
def getArticle(request,slug):

    article = get_object_or_404(Article, slug=slug)   
  
    article.views += 1
    article.save()  

    serializer = ArticleSerializer(article)
    return Response(serializer.data)

@api_view(["GET"])
def getArticleSnippets(request):
    snippets = Article.objects.all()
    serializer = ArticleSnippetSerializer(snippets, many=True)
    return Response(serializer.data)

