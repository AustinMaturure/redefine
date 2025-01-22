from articles.models import Article
from .serializers import ArticleSerializer
from rest_framework.decorators import api_view
from django.shortcuts import get_object_or_404
from rest_framework.response import Response


@api_view(["GET"])
def getArticles(request):
    articles = Article.objects.all() 
    page = request.GET.get('page', 1) 
    serializer = ArticleSerializer(articles, many=True)
    return Response(serializer.data)

@api_view(["GET"])
def getArticle(request,id):

    article = get_object_or_404(Article, id=id)   
  
    article.views += 1
    article.save()  

    serializer = ArticleSerializer(article)
    return Response(serializer.data)
