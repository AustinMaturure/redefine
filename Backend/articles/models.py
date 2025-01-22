from django.db import models


# Create your models here.

class Article(models.Model):
    title = models.CharField(null=False , max_length=50)
    date = models.DateField(null=False, auto_now=False, auto_now_add=False)
    body = models.TextField(null=False )
    views = models.IntegerField(default=0)

    def __str__(self):
        return self.title
    
