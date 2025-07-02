from django.db import models
from django.conf import settings

class Feedback(models.Model):
    title = models.CharField(max_length=128)
    body = models.TextField(default="")
    email = models.EmailField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    writer = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    is_edited = models.BooleanField(default=False)

    def __str__(self):
        return self.title
