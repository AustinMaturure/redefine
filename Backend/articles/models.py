from django.db import models
from django.utils.text import slugify


# Create your models here.

class Article(models.Model):
    title = models.CharField(null=False , max_length=50)
    date = models.DateField(null=False, auto_now=False, auto_now_add=False)
    body = models.TextField(null=False )
    views = models.IntegerField(default=0)
    likes = models.IntegerField(default=0)
    slug = models.SlugField(max_length=255)

    def __str__(self):
        return self.title

    def save(self, *args, **kwargs):
        if self.slug == "slug":
            self.slug = slugify(self.title +'-'+ str(self.id)) 
        super().save(*args, **kwargs)
    
