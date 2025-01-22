from articles.models import Article
from serializers import ArticleSerializer
from rest_framework.decorators import api_view
from django.http import HttpResponse
from rest_framework import Response


@api_view(["GET"])
def getArticles(request):
    articles = Article.objects.all() 
    page = request.GET.get('page', 1) 
    serializer = ArticleSerializer(articles, many=True)
    return Response(serializer.data)