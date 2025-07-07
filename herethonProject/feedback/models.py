from django.db import models
from django.conf import settings

class Feedback(models.Model):
    title = models.CharField(max_length=128, verbose_name="제목")
    body = models.TextField(default="", verbose_name="내용")
    email = models.EmailField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True, verbose_name="작성일")
    writer = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, verbose_name="작성자")
    is_edited = models.BooleanField(default=False)

    def __str__(self):
        return self.title
