from rest_framework import serializers
from articles.models import Article

class ArticleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Article
        fields = '__all__'

class ArticleSnippetSerializer(serializers.ModelSerializer):
    class Meta:
        model = Article
        fields = ['id','slug','title']
        